# VOID source comparison

Revision `a70bbc9a173b7f80ebf6dcd386e4286a8a7fbcb2`. The upstream screenshot is a
promotional logo photograph, not a page. To obtain a usable reference,
`includes/banner.php` was executed unmodified using PHP 8.3 WASM with synthetic
options/archive methods and rendered at 1280/390px using the source-derived index
CSS. `preview/upstream-banner-*` contains those component renders. Background art
is synthetic SVG, not the upstream stock photograph. A no-op jQuery class wrapper
satisfies the component's header-class script; no Typecho backend is running.

The page adaptation follows `index.php` (optional cover then date/title/excerpt),
`includes/banner.php` (separate image/title/meta) and `includes/main.php` (reading
body/tags/adjacent posts). Browser tests assert configured banner, narrow one-column
layout and banner-before-body geometry. Desktop/mobile screenshots were inspected,
and stale generic mobile width was fixed. No pixel equivalence is claimed.

Differences: system serif instead of bundled display font, fixed grid instead of
animated masonry, ordinary pagination/navigation instead of PJAX, no special
large-text post template, plugin votes, rewards or external share widgets.
