# JJ comparison and verification

Pinned source: c953b3c06c32f89d32bd618f9416f6506230caa5. Inspected index.php, post.php, php_modules/article_card.php, article_content.php and article-card Sass. The upstream screenshot is a promotional graphic, not a page capture.

For concrete reference, executed actual article_card.php in PHP-WASM with synthetic author/title/date/excerpt/media, stubbed view/like helpers, then rendered its original compiled home/common CSS at 1280/390px. Removed the initial hidden class to show server markup without upstream JS. Header/sidebar and database were not executed; no live Typecho or pixel-difference claim. Original CSS is used only locally for comparison, not shipped.

Restored author/date/category row above title, right thumbnail, comment/tag footer, compact shared white feed, category navigation and latest label. Detail has larger heading, author/date, optional cover, body, desktop sidebar directory and mobile disclosure directory. No fabricated like/view metrics. Profile/recent-post sidebar uses available public Widgets; original recommendation/comment APIs are unsupported and explicitly labeled differently.

Chromium checks cover populated/empty routes, long text overflow, safe settings, right-side 120px/80px thumbnails and functional desktop/mobile directory links. Core tests cover native Widgets/password/comment rendering; packaging is verified with the actual ThemeInstaller. Screenshot captures and source references use synthetic content. No original promotional art, icon fonts or photography are bundled.
