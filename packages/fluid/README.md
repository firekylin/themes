# Fluid for Firekylin

Independent draft theme for Firekylin >=2.16.0, based on Fluid 1.9.9 at
`bcfd8bfe79f0818306cec090237c330df5534b73`. Retains original Stylus, Bootstrap grid,
full-width banner, raised white/dark reading panel, thumbnail/article lists,
responsive banner ratio, article typography and sidebar table of contents.

Supported: home/taxonomy/author lists; post/page/attachment; archives and category/
tag directories; server search and filter-preserving pagination; 404/500; native
Firekylin comments; mobile grid navigation; persisted color mode; code-copy; TOC;
back-to-top; supplied previous/next and taxonomy relations. `template/links.eta`
provides a configurable links page. Private/protected rendering is delegated to
core Widgets and content, not a new data query.

Settings expose banner and article banner URLs, default thumbnail, slogan,
viewport banner heights, mask opacity, auto/light/dark mode, footer, updated date,
TOC, optional article attribution box and links JSON. Site navigation provides
menu items. Images are optional: configure images you are entitled to publish;
no upstream default pictures/fonts are bundled. All visible labels are English.

Differences/unimplemented upstream features: Hexo tag plugins, gallery/Fancybox,
MathJax/KaTeX, Mermaid, client search XML, animated typing, parallax/random banner,
icon fonts, dropdown submenus, analytics/view counters, QR/reward/share plugins,
external comments/auth providers, scroll-spy active TOC tracking and nested TOC
collapse. Native server search replaces local search; core Waline replaces the
Hexo comment adapters. Core article content controls code highlighting. The
mobile grid uses text links in an expanded navbar instead of the upstream
full-screen icon overlay. No unsupported features are represented by fake data.

Licenses and source/resource exclusions: NOTICE.md, LICENSE,
BOOTSTRAP-LICENSE, GITHUB-MARKDOWN-LICENSE. The source and reproducible build
script accompany generated CSS to preserve GPL source availability.

Validation: pinned real Hexo reference screenshots and measurements in
VISUAL-COMPARISON.md; Node/actual core render tests; Chromium 1280/390px page,
menu, theme persistence, TOC, clipboard and no-JS checks; ZIP installed by actual
core ThemeInstaller. CI repeats core/render/install/browser tests. Fixtures use
synthetic data, not a live database or real remote comment authentication.

Build/check from repository root:

```
pnpm install --frozen-lockfile
node scripts/build-fluid-css.js
pnpm test
FIREKYLIN_CORE_PATH=/path/to/core node --test test/fluid.test.js
FIREKYLIN_CORE_PATH=/path/to/core pnpm test:browser
FIREKYLIN_CORE_PATH=/path/to/core pnpm test:install
```
