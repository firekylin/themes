# Pinned visual comparison

Source: Argon 1.3.5 at `c88262a2dd0252d0ecd15f2a31d338fad7f19215`.
[Upstream presentation](https://raw.githubusercontent.com/solstice23/cdn/e737c7dc83d79fa54970de7159b4d07b28032658/argon-render-small-1.jpg), linked by the source README. The reference CDN repository was independently pinned to `e737c7dc83d79fa54970de7159b4d07b28032658`. The theme's screenshot.png is only a logo, so it was not treated as a page reference.

The reference shows shaped purple banner, content overlapping the banner, a compact colored sidebar masthead/menu, white article cards with centered colored titles and metadata, and gray canvas. We inspected the reference and our 1280px and 390px screenshots. Real source CSS is retained, with resource URLs removed; tests assert the original 71.8vh banner, 280px desktop sidebar, title→metadata→summary ordering and mobile sidebar collapse. Featured images use the original thumbnail/title overlay classes. Card reveal animation is disabled for deterministic screenshots, avoiding partially faded capture.

Artifacts: screenshot.png (desktop homepage), preview/mobile.png, preview/post-desktop.png, preview/post-mobile.png. All page content/images are synthetic. Source HTML/PHP and CSS provide the dimensional reference; the presentation image is not a pixel-perfect comparable fixture. A running WordPress installation and identical-data pixel diff have **not** been performed. Mobile is checked against source responsive rules, not an upstream mobile capture. See README for explicit remaining differences.

Validation: 15 Node tests, 13 additional actual core Widget/comment tests against Firekylin `a200d5887c702acb7c264776d9827f54e8389f09`, 7 Python tests, 16 general browser renders plus Argon-specific geometry/keyboard/mode-persistence/no-JS checks. Real ThemeInstaller ZIP verification is reproducible with the installer script. Tests use synthetic data and actual core classes, not a live blog database.
