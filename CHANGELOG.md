# CHANGELOG

## v1.0.0
- Initial adoption of Requirements-as-Prompts framework.
- Documented public IDs/behaviors, CSV schema, and viewer-mode contract.
- Added Playwright e2e and CI workflow scaffolds.

## v1.0.1
- Wired service worker registration and manifest link into index.html.
- Added Playwright tests: CSV round-trip, PDF report smoke, viewer read-only.

## v1.1.0
- Added GitHub Pages deployment workflow with test gate.
- Added `.nojekyll` and `404.html` fallback for project pages.
- Updated README with deployment instructions.

## v1.2.0
- Quality gate labels now render horizontally in front of the orange diamond.
- Validation warnings no longer flash and auto-dismiss when **Start Downtime** is pressed.
  (Additive patch via CSS/JS; no IDs or CSV headers changed.)
