# Matery for Firekylin

Port of blinkfox/hexo-theme-matery at `86ad429e24d0b002c1feb245e510ea93f82e3395`. Requires Firekylin 2.16.0+. Matery's Apache-2.0 license and Materialize 1.2.1's MIT notice are included separately. Draft theme, not a registry release.

Retains original Materialize/Matery styles, full-height cover and gradient overlay, rounded image-title article cards, responsive three/two/one-column grid, dream card, article cover and overlapping detail panel, dark styling and footer. Templates use public Firekylin Widgets and native comment rendering. No Hexo or jQuery runtime is shipped.

Build `dist/matery-0.1.0.zip` using `python3 scripts/package-matery.py`, upload through Firekylin's theme installer, then activate in administration. Prebuilt original CSS needs no compile step.

Settings:

- `coverUrl`, `defaultThumbnail`: owner-provided image URLs; featuredImage on a post overrides the article/default image. Without images, a gradient remains. No upstream photos are bundled.
- `slogan`: cover title, falling back to site title; description comes from the site. `buttonLabel` and `buttonUrl` add a second cover button.
- `slides`: JSON array of `{ "title": "", "description": "", "image": "/image.jpg", "url": "/post/example.html" }`. Native previous/next controls switch slides; autoplay and swipe physics are not implemented.
- `dreamTitle`, `dreamText`: optional homepage introduction card.
- `showToc`: false disables the native collapsible heading directory. `showUpdated`: true displays the updated date. `footerText`: footer text.

All eight page types are supported, with search and filtered pagination, taxonomy directories, grouped archive, native comments and protected article HTML. Mobile navigation, dark preference persistence, cover switching, TOC and code clipboard use native JS. Content/navigation remain usable without JS; additional cover slides require JS.

## Differences and unfinished features

Original masonry is adapted to a responsive equal-row grid. The native TOC is a collapsible article directory rather than Tocbot's sticky sidebar. Provider comments/search, music/video players, donations, reward QR codes, galleries/lightbox, statistics, dynamic typing, AOS animation, wallpaper rotation, translation, calendar/about charts, social icon libraries, math/mermaid rendering and syntax-highlighting runtimes are not ported. No automatic copyright/license statement is asserted for site-owner articles. Native Firekylin handles comments, search and password protection; upstream browser-only password checking is not reproduced.

Two demo-photo background URLs in dark.css were removed, marked in that file; no unverified remote fonts or photograph resources are included. Original Materialize CSS is retained with its MIT notice. The README/NOTICE and validation evidence identify sources and differences.

Tests instantiate real core Widget/comment classes and install the ZIP with the real ThemeInstaller using synthetic records. They do not test production database routing or live external comment submission. See `validation/matery/VISUAL-COMPARISON.md` for reference normalization and measurements.
