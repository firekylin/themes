# Fixed-source visual and runtime checks

Pinned original v4.1.7 frontend at 13f1953c2aadbad76425c87d8f72d62f1805885d was run in local WordPress 6.8.3/PHP 8.2.29/MariaDB 11.4, bound to 127.0.0.1:8097. Desktop/mobile home and article reference screenshots at 1280x900 and 390x900 are in screenshots/upstream-*.png alongside port screenshots. Seeded article/image data is synthetic; external requests were blocked during capture. The upstream source screenshot and CSS/PHP were also inspected.

Browser assertions verify the fixed 26% rail, 200px desktop/114px mobile logo, mobile stacked flow, full/excerpt body rendering, native no-JS menu, heading directory, keyboard image/focus restoration and saved mode. Live comparison corrected navigation pill alignment, title scale, 657px image allowance and attribution position. Native dates/comment forms, absent Kudos and recommendation block, substituted configurable logo, optional enhanced reading controls and different content fixtures prevent pixel parity. Original commercial web fonts are not bundled. No numeric pixel-match score is claimed.

Local validation: 15 Node tests with actual Firekylin a200d5887c702acb7c264776d9827f54e8389f09 Widget/comment classes and synthetic rows/mocked access; 7 Python registry/build tests; 16 generic route/viewport browser checks plus theme-specific interactions; ZIP build and actual ThemeInstaller installation into an isolated temporary directory. This is not a live Firekylin database/HTTP integration test. CI runs the fixture/browser/build subset; actual-core/installer tests are local-only with FIREKYLIN_CORE_PATH.

Reference fixture: scripts/reference/svbtle-seed.php. Port checks: scripts/check-svbtle-browser.js. No public deployment or merge; unresolved backend features remain in README.md.
