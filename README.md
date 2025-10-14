# Technical Downtime Tracking — Static App

This repo wraps your existing single-file app in a **Requirements-as-Prompts** framework with tests and CI.

## Quick start
```bash
npm ci
npm run serve
# open http://localhost:8080
```

## Service Worker
Include `sw-register.js` in `index.html` before closing `</body>`:
```html
<script src="./sw-register.js"></script>
```
Ensure `service-worker.updated.js` is in the web root.

## Testing
```bash
npm run test:install
npm run test:e2e
```

## Files
- `docs/PROMPT.md` — canonical RaP contract
- `docs/TESTPLAN.md` — authoritative tests
- `docs/FEATURE_FLAGS.md` — feature toggles
- `.github/workflows/ci.yml` — CI for e2e tests
- `manifest.webmanifest` — PWA metadata
- `sw-register.js` — SW registration helper

## Deploy to GitHub Pages

This repo includes a **Pages** workflow that:
1. Runs Playwright e2e tests, then
2. Publishes the site to GitHub Pages.

### One-time setup
1. Push this repo to GitHub.
2. In **Settings → Pages**, set:
   - **Source**: **GitHub Actions** (not branch).
3. Ensure your default branch is **main** (or update the workflow `branches` list).

### Deploy
- Push to `main` or click **Actions → Deploy to GitHub Pages → Run workflow**.
- The workflow uploads the repository root (static site) to Pages.
- A `404.html` is included to redirect refreshes back to `index.html`.
- `.nojekyll` prevents Jekyll processing issues.

> Your service worker is registered at `./service-worker.updated.js` and will scope correctly under project pages.
