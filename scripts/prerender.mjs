import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
import { services } from "../src/content.js";
import { loadEnv } from "vite";
const routes = [
  "/",
  "/services/",
  ...services.map((s) => `/services/${s.slug}/`),
  "/projects/",
  "/about/",
  "/contact/",
];
const template = await readFile("dist/index.html", "utf8");
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const configuredSiteUrl =
  process.env.SITE_URL || loadEnv("production", process.cwd(), "").SITE_URL;
const siteUrl = configuredSiteUrl?.replace(/\/$/, "");
if (siteUrl) {
  const parsed = new URL(siteUrl);
  if (parsed.protocol !== "https:" || parsed.origin !== siteUrl)
    throw new Error(
      "SITE_URL must be an HTTPS origin with no path, query or fragment.",
    );
}
for (const route of [...routes, "/404/"]) {
  const { html, page } = render(route);
  let head = `<meta property="og:title" content="${escape(page.title)} | Delta Demolition" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:type" content="website" /><meta property="og:locale" content="en_CA" />`;
  if (siteUrl)
    head += `<link rel="canonical" href="${escape(siteUrl + route)}" /><meta property="og:url" content="${escape(siteUrl + route)}" /><meta property="og:image" content="${escape(siteUrl + "/images/hero.webp")}" />`;
  if (route === "/")
    head +=
      '<link rel="preload" as="image" href="/images/hero.webp" imagesrcset="/images/hero-960.webp 960w, /images/hero.webp 1920w" imagesizes="100vw" fetchpriority="high" />';
  if (route === "/404/") head += '<meta name="robots" content="noindex" />';
  const output = template
    .replace("<!--app-html-->", html)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(page.title)} | Delta Demolition</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(page.description)}" />`,
    )
    .replace("<!--page-head-->", head);
  if (route === "/404/") await writeFile("dist/404.html", output);
  else {
    await mkdir("dist" + route, { recursive: true });
    await writeFile("dist" + route + "index.html", output);
  }
}
if (siteUrl) {
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escape(siteUrl + route)}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
} else await writeFile("dist/robots.txt", "User-agent: *\nDisallow: /\n");
console.log(
  `Prerendered ${routes.length} pages and a 404 page. ${siteUrl ? "Canonical URLs and sitemap enabled." : "Preview is excluded from indexing; set SITE_URL for launch."}`,
);
