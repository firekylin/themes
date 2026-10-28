# Verification

Run npm ci --ignore-scripts here, set FIREKYLIN_CHECKOUT to the pinned core with dependencies installed, and optionally CHROMIUM_PATH. Run node live.cjs. It builds the real registry ZIP and installs it through ThemeInstaller into a disposable local SQLite site, then exercises routes, privacy, actual load-more, menu/search, persisted night mode, public banner IDs, detail-menu focus return, lightbox and comment gating.

Reference: Typecho v1.2.1 commit 206880ba714d80bfb0638aeacb49c58b8fb1b327, PHP 8.2 and OneBlog e151a0c702e8e46671cfad5cad8e929f2e196c6f. seed-reference.php configures a disposable installed Typecho root with source in usr/themes/OneBlog; source code unmodified. Text logo, default system font, no banners/captcha, texture disabled through custom CSS. All external requests blocked during capture, so original remote iconfont is absent. Upstream initialization logs a SQLite sitemap query syntax warning but pages render.

Run compare.cjs against Typecho at 127.0.0.1:8770 and Firekylin at 127.0.0.1:8787. It waits for the original first-load animation to finish before capturing visible home/post at 1440/390px. Comparison fixtures differ in public-post count, summaries/categories/comments and quote. Review the images with comparison.json; not pixel equality or complete feature parity.
