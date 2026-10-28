# Reference and verification

Compared against unchanged upstream commit `68d25eaad4caadaec14196fd5009a00684f4d3a8` running in local WordPress 6.8.3 / PHP 8.2.29 / MariaDB 11.4 on 127.0.0.1:8097. Six synthetic posts and one generated landscape were used. `scripts/reference/diaspora-seed.php` sets menu and featured media; create the six posts using the common reference fixture before running it and place cover.svg in WordPress uploads. No credentials are committed. No public deployment.

The first capture showed the upstream loading animation: its asynchronous image initialization had not completed. Capture was corrected to await removal of `body.loading` (no source modification). Attachment paths were corrected in local fixture metadata. Upstream's own JavaScript and styles then rendered normally.

| View | Original WordPress | Firekylin core Widgets + synthetic data |
| --- | --- | --- |
| Desktop home | screenshots/upstream-index-1280.png | screenshots/index-1280.png |
| Mobile home | screenshots/upstream-index-390.png | screenshots/index-390.png |
| Desktop detail | screenshots/upstream-post-1280.png | screenshots/post-1280.png |
| Mobile detail | screenshots/upstream-post-390.png | screenshots/post-390.png |

Inspected both sizes: 100vh first story; original diagonal polygon; alternating image/text alignment and mobile stack; reading title/body/separator dimensions. Intentional differences: text menu instead of IcoMoon, site title instead of original logo, chosen rather than sampled overlay color, date locale/excerpts and footer, real core metadata rather than fake WP likes/views. Source fixture image proportions leave unused space in some image frames; this port uses object-fit cover. Original WP comments differ from Firekylin's delegated comments; browser screenshots disable comments to avoid fetching a remote comment service. Synthetic summaries differ, so this is a layout comparison, not a pixel equality claim.

Local validation:
- 15 Node tests, both contract fixtures and actual core Widget_Archive / comment renderer from Firekylin v2.16.0 (`a200d5887c702acb7c264776d9827f54e8389f09`); populated/empty data, escaping, password content, forced-login comments, taxonomy pagination, audio markup.
- 7 Python repository/build tests.
- Chromium: all 8 page types at 1280 and 390px (16 routes), no page errors/resource failures/horizontal overflow; long title, search encoding, dark mode.
- Specific test: 900px hero, 680×440 desktop card/20px overlap, mobile panel ordering, first story once, five cards, Escape/no-JS menu, keyboard image open/close/focus restoration, image toolbar and saved mode.
- ZIP built through repository build_theme and installed through real ThemeInstaller in an isolated temporary directory.

CI runs the Node fixture suite, Python and Chromium checks. It does not clone Firekylin core or run a live database/blog installation; core rendering and installer checks above are local. Neither synthetic browser server nor the core Widget test is a live Firekylin HTTP/database E2E test. Remaining functionality gaps are in README.
