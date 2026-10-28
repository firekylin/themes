# Missing theme previews

This change fills the 12 missing root `screenshot.png` files found among 43 themes:
Aquila, Diaspora, G, Green Park 2, Kratos, Matcha, Material, Nexmoe, OneBlog,
Paul, Puock and WP-Svbtle.

## Capture provenance

`capture.cjs` creates a disposable SQLite site with the actual Firekylin CLI,
packages and installs each theme with the actual ThemeInstaller, starts the
Firekylin server on a separate loopback port for each theme, and visits its real
HTTP routes with Chromium. It checks the active theme's resource URLs before
capturing. It does not serve pre-rendered fixtures, mock Widgets, replace the
rendered HTML/CSS, or reuse another theme's screenshot.

The screenshots are 1440 × 1000 PNGs at device scale 1, showing the top of each
homepage. Content is fictional Chinese demo writing. The local landscape/avatar
SVGs in `assets/` were authored for this fixture; no third-party photographs or
upstream demonstration artwork are used. Image-oriented themes are configured
with those local images. Exact per-theme settings, core revision, image sizes,
SHA-256 hashes and HTTP verification results are in `results.json`.

The capture scrolls through each page and back to the top to load lazy images,
waits for fonts, uses a light system palette/reduced-motion preference, and starts
a fresh browser context for each theme. It does not edit pixels after capture.
Diaspora's fullscreen cover and Paul's profile/diary homepage are deliberately
captured as those themes actually render them. Some existing WordPress ports
render their date format literally as `Y-m-d`; these screenshots preserve that
existing rendering issue rather than retouching it or changing theme templates.
Green Park 2 and WP-Svbtle use their supported `feedStyle: excerpt` setting: their
current full-feed mode displays `undefined` with the live archive query. This
pre-existing full-feed limitation is recorded here, not silently fixed or hidden
with a DOM override. Demo navigation adds only About, avoiding duplicate Home
links in themes that already provide their own navigation.

## Reproduce

Use Firekylin 2.16.0 at `a200d5887c702acb7c264776d9827f54e8389f09`, with its
normal dependencies installed (including the SQLite adapter). Install this
repository's dependencies with its pinned pnpm version. Chromium and CJK fonts
must be installed locally.

```sh
FIREKYLIN_CHECKOUT=/absolute/path/to/firekylin \
CHROMIUM_PATH=/usr/bin/chromium \
node verification/screenshots/capture.cjs
python3 -m unittest discover -s test -p 'test_*.py'
```

The script uses only a newly created temporary site/database and kills its own
server process groups. The temporary site path is printed for inspection; no
existing site, account or production database is used.

## Preview and publication contract

The admin theme list discovers root `screenshot.png` (then JPG/WebP) and serves
it from `/themes/<id>/screenshot.png` for project installations. Each new PNG
was copied into its installed theme directory, fetched through that real HTTP
endpoint, and decoded by Chromium. Home, post and mobile-home routes were also
checked, including missing images, browser errors and horizontal overflow.

The registry builder adds the `screenshot` field only when this exact PNG exists.
`test/test_screenshots.py` now checks all 43 themes for valid PNG chunks/checksums,
decodable pixel streams, dimensions and distinct hashes. It builds actual ZIPs
without publishing, checks the generated screenshot URL, and confirms the PNG
bytes are included in each archive.

The 12 packages move from 0.1.0 to 0.1.1 so the future release contains the PNG;
existing immutable release assets must not be overwritten. Related installer
checks now read the package's version instead of hardcoding 0.1.0. The six
WordPress suite workflows are allowed to run on this PR by their existing path
filters, rather than only on the original migration branch.

`registry.json` and publication state are intentionally left unchanged in this
Draft PR: after an approved merge, the existing release workflow publishes the
new ZIPs and writes their versions, integrity hashes and preview URLs together.
Until then, review images directly in this branch/PR; main's raw preview URLs
for these 12 images do not exist yet. No merge, release or deployment is performed
by the capture or validation commands.
