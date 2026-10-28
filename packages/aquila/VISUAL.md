# Fixed upstream visual reference

Original Aquila `9989422c53ade3198608815fd40dae1f4a8a282d` ran unmodified in local WordPress 6.8.3, PHP 8.2.29, MariaDB 11.4 (127.0.0.1:8097 only). Seed: scripts/reference/aquila-seed.php sets separate Home/Blog pages, menu and sidebar widgets. Reuse six synthetic posts/featured SVG from the reference fixture before seeding. No passwords are included. Carousel autoplay was paused through its public slickPause method solely to obtain stable source screenshots.

| Page | WordPress | Core Widget fixture |
| --- | --- | --- |
| Blog desktop | screenshots/upstream-index-1280.png | screenshots/index-1280.png |
| Blog mobile | screenshots/upstream-index-390.png | screenshots/index-390.png |
| Front desktop | screenshots/upstream-front-1280.png | screenshots/front-1280.png |
| Front mobile | screenshots/upstream-front-390.png | screenshots/front-390.png |
| Detail desktop | screenshots/upstream-post-1280.png | screenshots/post-1280.png |
| Detail mobile | screenshots/upstream-post-390.png | screenshots/post-390.png |

Inspected 1280×900 and 390×900: column order, 16:9 crop, 2:1 content/sidebar proportions, Lato typography, responsive navbar and carousel. Pinned index.php groups three stories into each column: six posts produce two populated columns; this is deliberately retained. Native Firekylin page/search/archive routes are adaptations, not claims of identical WP behavior.

Differences: configured synthetic logo in port vs unset source logo; synthetic summary lengths/date locale; site intro/footer replace source placeholder copy/social links; source comments are a WordPress form, core comments delegated separately. The port's manual scroll carousel differs from Slick autoplay/dots; article adds TOC/image controls. Screenshots are layout references, not pixel-equality proof. Fixture screenshots disable remote comments. No actual Firekylin HTTP/database end-to-end claim.

Checks: 15 Node tests with actual v2.16.0 core Widgets and comment renderer (`a200d5887c702acb7c264776d9827f54e8389f09`) locally; 7 Python repository/build tests; Chromium all 8 routes at both widths, no overflow/errors/missing files. Specific browser checks verify column grouping, 16:9 image, 5-card carousel next/previous, local fonts, no-JS menu/cards, TOC, keyboard dialog/focus and saved mode. Core tests cover protected body, forced-login comments, escaping and filtered pagination. A discovered front-mode taxonomy bug was fixed using archive.is(cate/tag/author), because core archive.is(index) can also be true for filtered lists.

ZIP built using repository build_theme and installed through actual core ThemeInstaller into a temporary isolated directory. CI runs fixture Node/Python/browser tests and uploads screenshots; core Widget/installer tests are local, not part of CI. No merge, release or deployment.
