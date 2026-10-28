# G verification

Install dependencies here with `npm ci --ignore-scripts`; install the pinned Firekylin core's dependencies, set FIREKYLIN_CHECKOUT and optionally CHROMIUM_PATH, then run `node live.cjs`. This builds the registry ZIP, installs with ThemeInstaller, and starts a disposable local SQLite site. Tests include real routes, privacy exclusions, pagination clicks, all three list modes, persisted dark mode, sidebar, TOC, sponsor, image dialog and native comment gating.

Reference uses Typecho v1.2.1 commit 206880ba714d80bfb0638aeacb49c58b8fb1b327, PHP 8.2 and G commit 8f26a6e7962f11b085b2c1ad4f9b4a518a3e85d4. Run seed-reference.php from an installed disposable Typecho root with source under usr/themes/G. Upstream sources are unchanged; optional CDN/KaTeX and external imagery disabled through settings. Default white background and no cover images used for geometry comparison.

Start reference on 127.0.0.1:8770 and a Firekylin test site on 127.0.0.1:8784, then run compare.cjs. Browser blocks nonlocal requests. Captures include home/post at 1440/390px; geometry and actual images are retained. Reference has one article/default category/comment while the port fixture has 13 public articles and no comments, so content heights differ. Default header and first card bounds match. Native interactions are verified separately in live.cjs, not inferred from screenshots.
