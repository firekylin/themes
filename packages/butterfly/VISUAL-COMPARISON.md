# Butterfly comparison

Pinned Typecho source: wehaox/Typecho-Butterfly bb5fb5922a4b2d74a7829005a2a507027fe08ffa, adapted upstream from JerryC's Hexo Butterfly. Both attribution chains and Apache notices remain in NOTICE.md.

The repository screenshot is a promotional logo, not a running page. For a concrete reference, executed its actual header.php in PHP-WASM 8.3 with synthetic options (ShowTopimg, headerimg and description), then rendered the resulting header with the original stylesheet at 1280/390px. Included reference images isolate this header: includes/header_com.php and public/nav.php were stubbed, so they do not represent a complete Typecho deployment. Remaining list, detail and sidebar structures were checked against index.php, includes/post_header.php and post.php. No pixel-identical claim.

Restored full-viewport home image header, separate mobile cover, description heading and scroll-down anchor; configurable author avatar/follow link; alternating image/text cards where featured images exist, with plain reading cards otherwise. Detail uses a separate 400px image/title/date/author header (360px mobile) and a native body TOC. Source-derived reference and port screenshots accompany this package.

Differences: no fake reading/view counts, remote update checks, Typecho sticky SQL queries, frontend editing, custom photo/friend APIs, reward controls, PJAX, typed subtitles or vendor animation libraries. Coverless cards omit a placeholder image. Homepage category relations and modification dates are not guaranteed by public Widgets, so absent data is not fabricated. Comments use native Firekylin rendering. Images are user-configured, with no unlicensed upstream artwork bundled.

Validation covers media URL rejection, desktop/mobile header heights and overflow, scroll-to-reading, TOC links, empty/protected data, all eight routes, actual core Widgets/comments, packaging and ThemeInstaller. Reference images use local synthetic artwork. This is component/source comparison, not a full live Typecho test.
