# Delta Demolition

A responsive, statically rendered React website for residential, commercial and selective demolition in Toronto and the GTA. Built with Vite, Oswald and Source Sans 3. Fonts and optimised photographs are served locally.

## Develop

Use the existing `/workspace/deltademo` checkout; each cloud task is isolated. Do not create a worktree unless explicitly requested.

Node 22+ is required (validated on Node 24).

```sh
cd /workspace/deltademo
npm ci --cache /workspace/.npm-cache
npm run dev
```

The server listens on port 3000. For production output:

```sh
npm run build
npm run preview
```

The build prerenders all eight routes plus `404.html`, so content and page metadata are present before JavaScript executes. Deploy `dist/` to a static host with directory-index support. Configure the host's 404 handling to use `404.html`; do not redirect unknown routes to the homepage. `public/_headers` and `public/_redirects` provide Netlify-compatible defaults.

## Edit content

`src/content.js` contains the proposed service offerings, descriptions, FAQs, service area and business details. Confirm those details with Delta before publication. No company credentials, testimonials, trading history or project results are invented. Telephone and email are deliberately unset and render only after a verified value is added.

The project journal is intentionally **Project stories coming soon**, as requested. Only add genuine, approved Delta work to the `projects` array. Each entry supports `slug`, `title`, `location`, `category`, `description`, `image`, `imageAlt`, and an optional `scope` array. The current layout automatically shows project photographs and scope information when genuine records are supplied. All current service imagery is representative stock photography, never presented as Delta work. See `PHOTOGRAPHY.md` for sources and licensing.

`public/delta-logo.svg` is a vector interpretation of the supplied triangular Delta logo 02, using the blue mark, DELTA wordmark, charcoal divider and DEMOLITION lettering. Replace it with an original vector brand asset if available. No circular logo or circular enclosure is used.

## Enquiry form

The default form is a **demo**. It validates required fields, prepares a project brief and offers a text-file download. It sends nothing and does not persist form data to a server or local storage. The preview notice, submit button, consent and confirmation all make this explicit.

To connect delivery, set `VITE_ENQUIRY_ENDPOINT` in the build environment or the `formEndpoint` field in `src/content.js`. Never put a secret into a `VITE_` variable: those values are public browser code. The endpoint must accept an HTTPS JSON POST and allow your site's origin via CORS if hosted elsewhere. A successful 2xx response must mean the enquiry was durably accepted. Non-2xx responses and timeouts show an error and retain the entries. The client cannot provide email delivery on its own.

Payload:

```json
{
  "projectType": "Residential Demolition",
  "location": "Toronto",
  "name": "Customer name",
  "email": "customer@example.com",
  "phone": "",
  "description": "Customer's project description",
  "consent": true
}
```

Before enabling delivery, configure server-side validation, spam/rate controls, notification delivery, retention and the business's privacy policy. Verify an actual enquiry reaches the designated recipient. The client includes a honeypot, but it is not a replacement for server controls. No endpoint or delivery credentials are supplied with this project.

## Metadata and launch

Set `SITE_URL` to the verified production origin when running `npm run build`. This adds canonical URLs, Open Graph URLs and `sitemap.xml`. Without it, `robots.txt` disallows indexing of the preview. No public domain, street address or phone number is invented. Each page has a local Toronto/GTA title and description. No structured data makes unsupported review, rating or certification claims.

Before launch: confirm service offerings and coverage, supply verified contact information, connect and test enquiry delivery, review the logo against the original vector, and set the production origin. Project stories can remain coming soon.

## Validation

With the development or preview server running:

```sh
npm test
```

Browser checks use system Chromium at `/usr/bin/chromium` (override with `CHROMIUM_PATH`). Set `BASE_URL` if the server is running on another port. Tests cover routes, mobile navigation, overflow, FAQs, form validation and demo download, plus automated accessibility checks. Review the screenshot outputs in `test-results/` alongside automated results.

The reference contractor website was studied for its service organisation, service detail/FAQ pattern and estimate-focused navigation. Its brand, assets, testimonials and business claims are not reused.
