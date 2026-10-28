# Visual and runtime verification

Reference: Kratos 4.3.4 at 6be10d3a97c125f612e0b7ab9f29e9b72828283a, upstream screenshot.png and PHP/CSS source. The pinned theme was also run unchanged in an isolated local WordPress 6.8.3 / PHP 8.2.29 / MariaDB 11.4 instance, bound to 127.0.0.1:8097. Desktop/mobile home and article reference screenshots are in screenshots/upstream-*.png; they were inspected alongside the port. Seeded public content/media is synthetic. scripts/reference/kratos-seed.php records the fixture and theme options; a local MU filter substitutes a synthetic avatar. External requests were blocked in the reference browser. No pixel-diff score or complete visual parity is claimed.

At 1280px the browser asserts a 300px banner, 256x144px thumbnails, non-overlapping article text and adjacent sidebar. At 390px it asserts a 290px banner, thumbnail above text, hidden sidebar and usable menu. Metadata follows the thumbnail. Screenshots are in screenshots/ and use synthetic content/media, not upstream artwork.

Local verification: 15 Node tests against real core Widget classes and comment renderer (Firekylin a200d5887c702acb7c264776d9827f54e8389f09), plus 7 registry/build Python tests. Browser checks cover 16 route/viewport combinations, overflow, resource errors, menu, carousel previous/next, directory, keyboard image dialog and focus restoration, saved dark mode and no-JavaScript behavior. Core widgets run with synthetic rows and mocked data access; this is not a live database or HTTP integration test.

The repository ZIP builder and actual core ThemeInstaller are exercised against an isolated temporary directory. CI runs fixture rendering, registry and browser checks; local actual-core and installer checks require FIREKYLIN_CORE_PATH and are not claimed as CI coverage. Nothing is deployed or merged.

Commands: node --test test/*.test.js; python3 -m unittest discover -s test -p 'test_*.py'; CHROMIUM_PATH=/usr/bin/chromium FIREKYLIN_CORE_PATH=/workspace/firekylin node scripts/check-ports-browser.js; same environment node scripts/check-kratos-browser.js; FIREKYLIN_CORE_PATH=/workspace/firekylin node scripts/check-port-install.js after ZIP generation.

Live-reference findings: restored the original translucent navigation background and 100px avatar/120px profile cover. The port keeps readable wrapping for long mobile titles and subtitle, unlike upstream clipping. Public recent/category/tag widgets replace the original newest/hottest/random tabbed widget; absent view/like metrics and the reference-only login/reward controls remain disclosed gaps. Dates and excerpt lengths differ with the platform and fixture; English upstream labels reflect the reference WordPress locale.

Reference Docker digests: wordpress sha256:1e6215749283955d5c9ffea6c297651ed23cdfdbb91677ad7abd705b2682f2cf; mariadb sha256:d1891ede5a559f1086f55053bb8cc1569b0298338c4d72d71725a7f74f6ba620. Reference dependencies remain outside the theme ZIP.
