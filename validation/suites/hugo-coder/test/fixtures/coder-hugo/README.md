# Fixed Coder reference

Clone luizdepra/hugo-coder into themes/hugo-coder at
58d956f41c056a12e15d5b6ee27c54fc98cd6e49. Run Hugo 0.169.0 extended in this fixture.
Upstream uses libsass, which builds successfully with a deprecation notice. All
profile/article content and the SVG avatar are synthetic. Serve public/ locally.

From repository root, run:
CODER_REFERENCE_URL=http://127.0.0.1:4179/ CHROMIUM_PATH=/usr/bin/chromium
node scripts/check-coder-browser.js

CI verifies native render/browser behavior; the pinned source build and source
comparison are run locally and screenshots/measurements are committed.
