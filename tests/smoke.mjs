import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const executablePath = process.env.CHROMIUM_PATH || "/usr/bin/chromium";
const routes = [
  "/",
  "/services/",
  "/services/residential/",
  "/services/commercial/",
  "/services/selective/",
  "/projects/",
  "/about/",
  "/contact/",
];
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  acceptDownloads: true,
});
const page = await context.newPage();
const failures = [];
const imageIssues = new Set();
const runtimeErrors = [];
const results = [];
page.on("pageerror", (error) => runtimeErrors.push(error.message));
await mkdir("test-results", { recursive: true });

async function check(name, action) {
  try {
    await action();
    results.push({ name, status: "passed" });
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, message: error.message });
    results.push({ name, status: "failed", error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
async function visit(route) {
  const response = await page.goto(new URL(route, baseURL).href, {
    waitUntil: "networkidle",
  });
  assert.ok(response.ok(), `${route} HTTP ${response.status()}`);
  await page.locator("main h1").waitFor();
}
async function loadImages() {
  return await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        image.loading = "eager";
        if (image.complete) return;
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
          setTimeout(resolve, 10000);
        });
      }),
    );
    return images
      .filter((image) => !image.complete || !image.naturalWidth)
      .map((image) => image.getAttribute("src"));
  });
}

try {
  await check(
    "Eight public pages render unique headings, titles and descriptions",
    async () => {
      const headings = new Set();
      const titles = new Set();
      const descriptions = new Set();
      for (const route of routes) {
        await visit(route);
        assert.equal(
          await page.locator("h1").count(),
          1,
          `${route} must have one h1`,
        );
        const heading = (await page.locator("h1").innerText())
          .replace(/\s+/g, " ")
          .trim();
        assert.ok(!headings.has(heading), `${route} duplicates h1 ${heading}`);
        headings.add(heading);
        const title = await page.title();
        assert.ok(title.includes("Delta Demolition"));
        assert.ok(!titles.has(title), `${route} duplicates title`);
        titles.add(title);
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");
        assert.ok(description.length > 50);
        assert.ok(
          !descriptions.has(description),
          `${route} duplicates description`,
        );
        descriptions.add(description);
        const missing = await loadImages();
        missing.forEach((source) => imageIssues.add(source));
      }
    },
  );

  await check(
    "Desktop navigation and service links reach their destinations",
    async () => {
      await visit("/");
      await page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Services", exact: true })
        .click();
      await page.waitForURL("**/services/");
      await page
        .getByRole("link", { name: "Residential Demolition", exact: true })
        .first()
        .click();
      await page.waitForURL("**/services/residential/");
      await page
        .getByRole("link", { name: "Request an estimate", exact: true })
        .first()
        .click();
      await page.waitForURL("**/contact/");
      await page.getByRole("combobox", { name: /Project type/ }).waitFor();
      assert.ok(
        await page.getByRole("combobox", { name: /Project type/ }).isVisible(),
      );
    },
  );

  await check("FAQ opens and closes with the keyboard", async () => {
    await visit("/");
    const detail = page.locator(".faq-list details").first();
    const summary = detail.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    assert.equal(await detail.getAttribute("open"), "");
    assert.ok(await detail.locator(".faq-answer").isVisible());
    await page.keyboard.press("Enter");
    assert.equal(await detail.getAttribute("open"), null);
  });

  await check("Keyboard skip link reaches main content", async () => {
    await visit("/");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").innerText(), "Skip to content");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"), "main");
  });

  await check(
    "Mobile navigation traps focus, closes with Escape and follows links",
    async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await visit("/");
      const toggle = page.getByRole("button", { name: "Open navigation" });
      await toggle.click();
      const dialog = page.locator("#mobile-menu");
      assert.ok(await dialog.isVisible());
      assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Tab");
        assert.ok(
          await page.evaluate(
            () =>
              document.activeElement === document.body ||
              Boolean(document.activeElement.closest("dialog")),
          ),
          "Focus entered the page behind the modal navigation",
        );
      }
      await page.keyboard.press("Escape");
      assert.ok(!(await dialog.isVisible()));
      assert.ok(
        await toggle.evaluate((node) => node === document.activeElement),
      );
      await toggle.click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Projects", exact: true })
        .click();
      await page.waitForURL("**/projects/");
      await page.getByRole("heading", { name: /EVERY SITE HAS/ }).waitFor();
      assert.ok(
        await page.getByRole("heading", { name: /EVERY SITE HAS/ }).isVisible(),
      );
      assert.ok(await page.locator(".mobile-estimate").isVisible());
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Our Process", exact: true })
        .click();
      await page.waitForURL("**/#process");
      await page.locator("#process").waitFor();
      assert.ok(await page.locator("#process").isVisible());
    },
  );

  await check(
    "Pages fit mobile, tablet and desktop viewports without horizontal overflow",
    async () => {
      for (const width of [375, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const route of routes) {
          await visit(route);
          const dimensions = await page.evaluate(() => ({
            content: document.documentElement.scrollWidth,
            viewport: window.innerWidth,
          }));
          assert.ok(
            dimensions.content <= dimensions.viewport + 1,
            `${route} overflows at ${width}px (${dimensions.content}px wide)`,
          );
        }
      }
    },
  );

  await check(
    "Demo form validates, prepares a brief and downloads it without submission",
    async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await visit("/contact/");
      const posts = [];
      const track = (request) => {
        if (request.method() === "POST") posts.push(request.url());
      };
      page.on("request", track);
      assert.ok(
        await page.getByText("PREVIEW FORM", { exact: true }).isVisible(),
      );
      await page
        .getByRole("button", { name: "Prepare project brief", exact: true })
        .click();
      assert.ok(
        (await page.locator("select:invalid").count()) > 0,
        "Missing project type should be invalid",
      );
      assert.equal(
        await page.locator(".form-result").count(),
        0,
        "Invalid form must not show a success result",
      );
      await page
        .getByRole("combobox", { name: /Project type/ })
        .selectOption("Residential Demolition");
      await page
        .getByLabel("Project location *", { exact: true })
        .fill("Toronto, near Queen and Bathurst");
      await page
        .getByLabel("Your name *", { exact: true })
        .fill("Test Homeowner");
      await page
        .getByLabel("Email address *", { exact: true })
        .fill("homeowner@example.com");
      await page
        .getByLabel("Tell us about the work *", { exact: true })
        .fill(
          "Remove kitchen cabinets and finishes for an upcoming renovation. Retain the existing exterior walls.",
        );
      await page.getByRole("checkbox").check();
      await page
        .getByRole("button", { name: "Prepare project brief", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "Your project brief is ready." })
        .waitFor();
      assert.ok(
        await page
          .getByText(
            "This is a demo. Nothing has been sent to Delta Demolition.",
          )
          .isVisible(),
      );
      assert.equal(await page.locator(":focus").getAttribute("role"), "status");
      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("button", { name: "Download your brief" }).click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), "delta-project-brief.txt");
      const file = await download.path();
      const contents = await readFile(file, "utf8");
      assert.ok(contents.includes("Not submitted."));
      assert.ok(contents.includes("Test Homeowner"));
      assert.ok(contents.includes("Toronto, near Queen and Bathurst"));
      assert.ok(contents.includes("Remove kitchen cabinets"));
      assert.deepEqual(posts, [], "Demo form must not make a POST request");
      page.off("request", track);
    },
  );

  await check(
    "Desktop home passes serious and critical accessibility checks",
    async () => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await visit("/");
      await loadImages();
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      await writeFile(
        "test-results/axe-home.json",
        JSON.stringify(audit, null, 2),
      );
      const violations = audit.violations.filter((issue) =>
        ["serious", "critical"].includes(issue.impact),
      );
      assert.deepEqual(
        violations.map((issue) => ({
          id: issue.id,
          impact: issue.impact,
          nodes: issue.nodes.map((node) => node.target),
        })),
        [],
      );
      await page.screenshot({
        path: "test-results/home-desktop.png",
        fullPage: true,
      });
    },
  );

  await check(
    "Mobile contact passes serious and critical accessibility checks",
    async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await visit("/contact/");
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      await writeFile(
        "test-results/axe-contact-mobile.json",
        JSON.stringify(audit, null, 2),
      );
      const violations = audit.violations.filter((issue) =>
        ["serious", "critical"].includes(issue.impact),
      );
      assert.deepEqual(
        violations.map((issue) => ({
          id: issue.id,
          impact: issue.impact,
          nodes: issue.nodes.map((node) => node.target),
        })),
        [],
      );
      await page.screenshot({
        path: "test-results/contact-mobile.png",
        fullPage: true,
      });
    },
  );

  await check("No uncaught browser runtime errors", async () =>
    assert.deepEqual(runtimeErrors, []),
  );
  await check("All page images load, including lazy images", async () =>
    assert.deepEqual([...imageIssues], []),
  );
} finally {
  await writeFile(
    "test-results/smoke-report.json",
    JSON.stringify(
      {
        baseURL,
        results,
        failures,
        imageIssues: [...imageIssues],
        runtimeErrors,
      },
      null,
      2,
    ),
  );
  await browser.close();
}
console.log(
  `${results.filter((item) => item.status === "passed").length} passed, ${failures.length} failed.`,
);
if (failures.length) process.exitCode = 1;
