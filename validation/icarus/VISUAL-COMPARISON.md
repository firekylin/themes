# Icarus reference comparison

Upstream commit: `4c0a463028c6e923815f561f15261b6c49ac056d`; real Hexo 7.3.0 with its Inferno renderer. Captured original generated HTML and port at 1280×900 and 390×900 in Chromium. External network requests were blocked for both views; local system font fallbacks were used. The original CSS and layouts were not replaced by port templates.

Reference configuration, npm lockfile and synthetic content are adjacent. To reproduce: install the reference package dependencies, copy the pinned theme to themes/icarus, copy reference-site.yml to _config.yml and reference-theme.yml to _config.icarus.yml, put Markdown in source/_posts and cover.svg in source/fixture, then run Hexo generate **from that directory**. Run `ICARUS_REFERENCE_PUBLIC=/path/to/public node scripts/compare-icarus.js` here. Screenshots are named reference/port-index/post-width.png.

Reference uses three columns, a synthetic avatar, matching site navigation and excerpt text; animations/PJAX are disabled, unconfigured donation/share/comment services disabled. The port uses a public Widget fixture with additional category data and pagination; counts and metadata therefore differ. Article body fixtures differ in the first paragraph; original syntax highlighting and article license panels are visible only in the reference. These are not pixel-identical fixtures and no overall pixel-match claim is made.

| Source | Page | Width | Article x/y | Article width | Height |
|---|---|---:|---|---:|---:|
| reference | index | 1280 | 357.25/98 | 565.5 | 213.34375 |
| port | index | 1280 | 357.25/98 | 565.5 | 210.203125 |
| reference | post | 1280 | 357.25/98 | 565.5 | 511.8125 |
| port | post | 1280 | 357.25/98 | 565.5 | 391.578125 |
| reference | index | 390 | 14/133 | 362 | 252.203125 |
| port | index | 390 | 14/133 | 362 | 249.0625 |
| reference | post | 390 | 14/133 | 362 | 589.53125 |
| port | post | 390 | 14/133 | 362 | 430.4375 |

The desktop main/left/right column boundaries and mobile article width match. The homepage first-card height differs by roughly 3px due to metadata/button markup. Profile height differs because global counters are not fabricated; recent card spacing and footer markup also differ. The port uses an explicit mobile menu and native TOC control instead of external icon/script dependencies. Post height differs due to omitted license panels and highlighting, fixture content and native code-copy control. An empty comments card discovered during inspection was removed.

Local checks: 13 Node tests (11 theme plus 2 repository); 11 theme tests rerun with real core Widget/comment classes at `a200d5887c702acb7c264776d9827f54e8389f09`; 7 Python packaging tests; actual ThemeInstaller ZIP installation; 16 page/viewport renders and 18 variant/column/viewport renders, overflow, mobile navigation, no-JS navigation, persistent appearance, TOC Escape/focus-return and clipboard. All use synthetic records, not a production database. Browser screenshots cover variants; the pinned-original paired comparison covers default only. CI repeats core rendering, packaging/install and browser checks.
