# Source comparison

Reference: trinitrotofu/Bubble at e5ac03db4176914736939b56f6cf8679ce4303b9. Inspected its actual screenshot.jpg, index.php, post.php, functions.php printAricle(), and assets/css/main.css.

The source screenshot shows a full-height photographic landing, circular avatar, translucent bubbles and the first reading card overlapping its lower edge. The port now supports those elements through indexImage/avatarUrl/bubbleShow. Unlicensed source artwork is not bundled; the default remains a CSS gradient. Cards follow the source's single-column arrangement, title/date/category/author metadata and excerpt. Featured images occupy a 45vh cover region, matching list-card-bg; the HTML uses an accessible image instead of the source's background div. Detail pages use their own title/date/author hero and overlapping article body, with a native disclosure table of contents.

Compared Chromium desktop (1280px) and mobile (390px) output against source layout/CSS and screenshot. Mobile cards become full-width and lose the overlap. The original screenshot supplies a desktop landing reference only; mobile comparison is source-guided, not a claimed original live mobile capture. Screenshots are synthetic Firekylin data, not a live Typecho server or pixel-difference test.

Tests cover full viewport hero height, one-column cards, responsive overlap, TOC targets and navigation, disabled TOC/decorations, unsafe media settings, eight page types, empty/protected content, escaping and native comment rendering. Generic tests also check overflow and resource failures.

Differences: static bubble shapes; no Typecho widgets, PJAX, Argon JS plugins, reward/friend APIs or theme-specific shortcodes. Categories render only when supplied by the public archive Widget (default homepage query does not load category relations); no fake metadata is added. Native Firekylin comments replace Typecho comments. Configured night palette remains available, without an upstream-style settings modal.
