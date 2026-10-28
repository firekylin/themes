# Fixed upstream visual comparison

Source dillonzq/LoveIt b224a0ecc0a8caaca425a71188f2ce4b805e883f, Hugo 0.169.0
extended and embedded Dart Sass 1.106.1. Reference configuration uses local assets,
fixed headers, light palette and synthetic A Quiet Notebook content/avatar.
Chromium 1280×900 and 390×900, 2026-10-28. Both homepage and article screenshots
were inspected on desktop/mobile.

| Geometry | Source | Port |
|---|---:|---:|
| Desktop profile x / y / width / height |315.52 / 56 / 648.95 / 239|315.52 / 56 / 648.95 / 239|
| Desktop avatar x / y / size |591.98 / 96 / 96|591.98 / 96 / 96|
| Desktop first summary y / height |295 / 154.77|295 / 154.77|
| Mobile profile x / y / width / height |16 / 56 / 358 / 263|16 / 56 / 358 / 263|
| Mobile avatar x / y / size |147 / 96 / 96|147 / 96 / 96|
| Mobile first summary y / height |319 / 154.77|319 / 154.77|

The browser comparison asserts exact profile/avatar/summary/title rectangles;
raw measurements are in preview/geometry.json. No whole-page pixel identity is
claimed. The port has a native server-search link and separate attribution line.
Unavailable reading-time/word-count and share-service metadata are omitted. Code
buttons add 24px; article footer uses actual native update_time/prev/next. Native
TOC generation and active-heading tracking replace Hugo's build-time data.

- [Port desktop](screenshot.png) / [source desktop](preview/upstream-desktop.png)
- [Port mobile](preview/mobile.png) / [source mobile](preview/upstream-mobile.png)
- [Port article](preview/post-desktop.png) / [source article](preview/upstream-post-desktop.png)
- [Port mobile article](preview/post-mobile.png) / [source mobile article](preview/upstream-post-mobile.png)

Reference project is test/fixtures/loveit-hugo; its README gives rebuild commands.
Interaction tests cover persisted scheme, mobile menu/Escape, TOC anchors, exact
clipboard, code expansion, image-dialog keyboard/focus and no-JS reading/navigation.
