# Fixed upstream comparison

luizdepra/hugo-coder at 58d956f41c056a12e15d5b6ee27c54fc98cd6e49, built directly
with Hugo 0.169.0 extended and the upstream libsass configuration. Port CSS uses
Dart Sass 1.106.1 on the same source. Synthetic Alex Chen profile and articles;
no copied demo photos. Chromium 1280×900 / 390×900, 2026-10-28.

Homepage and article screenshots were inspected on both viewport sizes. Browser
assertions compare exact profile/avatar/name/info rectangles against the source.

| Measurement | Source | Port |
|---|---:|---:|
| Desktop profile x/y/width/height |495.28 / 237.09 / 289.44 / 419.81|495.28 / 237.09 / 289.44 / 419.81|
| Desktop avatar x/y/size |540 / 237.09 / 200|540 / 237.09 / 200|
| Mobile profile x/y/width/height |74.39 / 254.41 / 241.20 / 375.19|74.39 / 254.41 / 241.20 / 375.19|
| Mobile avatar x/y/size |109.98 / 254.41 / 170|109.98 / 254.41 / 170|

Whole-page pixel identity is not claimed: native Search navigation and platform
attribution differ. Article dates use native numeric format and omit unavailable
reading time. TOCs are generated client-side from native headings; explicit code
copy controls increase code-block height. Native taxonomy/archive data differs
from Hugo's content organization. Raw geometry in preview/geometry.json.

- [Port desktop](screenshot.png) / [source desktop](preview/upstream-desktop.png)
- [Port mobile](preview/mobile.png) / [source mobile](preview/upstream-mobile.png)
- [Port article](preview/post-desktop.png) / [source article](preview/upstream-post-desktop.png)
- [Port mobile article](preview/post-mobile.png) / [source mobile article](preview/upstream-post-mobile.png)

Reference rebuild: test/fixtures/coder-hugo/README.md. Tests cover actual rendering
classes with synthetic rows, browser interactions and installation; not a live DB.
