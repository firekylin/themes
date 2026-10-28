# Paul verification

Run npm ci --ignore-scripts here; set FIREKYLIN_CHECKOUT to the pinned core with its dependencies installed and optionally CHROMIUM_PATH, then run node live.cjs. It builds/installs the actual ZIP with ThemeInstaller into a disposable SQLite site. Tests cover routes, search/pagination, public-only output, mobile navigation/Escape, configured projects/quotes, directory/image dialog and comment gating.

Reference: Typecho v1.2.1 commit 206880ba714d80bfb0638aeacb49c58b8fb1b327, PHP 8.2; Paul 5b60576ce1bf774987bc73bc7bce4236165aa4db. Run seed-reference.php within an already installed disposable Typecho root, with source under usr/themes/Paul and new avatar under fixtures/paul-avatar.svg. Unmodified upstream PHP/CSS/JS; configuration uses new avatar/white background, no secret-key diary or external RSS service.

compare.cjs expects original on 127.0.0.1:8770 and Firekylin on 127.0.0.1:8789. All nonlocal browser requests are blocked; original external iconfont/PJAX/player/cursor scripts are consequently absent and can emit reference-only console errors. Captures inspect actual server output and styles, not full upstream interaction functionality. Original Kico stays only in local reference; the distributable port uses newly written base.css. Review screenshots/geometry at 1440 and 390px and declared differences in package README.
