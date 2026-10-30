# Visual verification

Original references: screenshot/home-page.png, screenshot/small.png and screenshot/dark-mode.png at https://github.com/changbin1997/MWordStar/tree/c931cd26f406c1afcbd68e2cb291cf2a4e77babb plus components/header.php, post-list.php, sidebar.php and assets/css/style.css. Upstream PHP/JS was not run.

Preserved landmarks: centered Bootstrap container, 8/4 desktop columns, sticky top navigation, 30px card spacing, gray background, full-width 8:3 featured image, title/body/metadata dividers, bold sidebar headings and profile block. Theme-owned compiled styles and original Bootstrap CSS retained. Native adapters replace runtime-dependent menu, image viewer, color persistence and TOC. Mobile stacks sidebar beneath content.

Actual ZIP-installed Firekylin 2.17.1 SQLite site: verification/mwordstar/live.cjs, report.json, {home,post}-{1440,390}.png and dark-390.png. Content/avatar differ from the author's screenshots; no pixel-identical claim. Checks cover 16 routes, directory links, image dialog/Escape, persistent light/dark mode, mobile menu, no-JS search, private/draft exclusion and comment gating. Platform omissions are listed in README.md.
