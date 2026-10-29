# Visual verification

Original reference: https://github.com/shiyiya/typecho-theme-sagiri/blob/e3cbd978b7038190274ba23e343e0bc83372f9e2/screenshot.png and component/header.php, component/post-card.php, component/sidebar.php, css/modules and css/mix.min.css at the same revision. The reference is a real article screenshot, not a promotional mockup. Upstream programs were not run.

Compared structural landmarks: 350px desktop banner (380px header space), translucent 50px top navigation, 1110px main area with 772px article and 315px sidebar, white rounded article cards, centered title/meta, orange heading hashes, category ribbon and two sidebar modes. Original compiled CSS is retained. Native adapter fixes intermediate-width overflow; mobile uses 200px banner, full-width content and hidden sidebar.

Actual Firekylin SQLite site and installed ZIP: verification/sagiri/live.cjs. Evidence is in verification/sagiri/{home,post}-{1440,390}.png and report.json. Package screenshot is the real desktop home page. Test content and artwork differ from the upstream author, intentionally: the copyrighted illustration and portrait are not included. This is source/screenshot-based structural comparison, not a pixel-identical original runtime comparison. Functional checks cover real routes, paging, TOC/overview, image dialog and Escape, no-JavaScript search, private/draft exclusion and comment gating.

Sidebar entry animation is disabled in the native adapter to avoid a Chromium compositing issue with the flex layout. Static appearance and interactions remain intact.
