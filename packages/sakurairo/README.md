# Sakurairo for Firekylin

Draft adaptation of Sakurairo 3.1.0 for Firekylin >=2.16.0. [Source/resource restrictions](NOTICE.md), [comparison](VISUAL-COMPARISON.md).

Preserves the full-screen home cover, compact 400px inner cover, centered avatar/information panel, floating brand/navigation, 860px content column and 300px cover cards with overlaid date/metadata/title and lower excerpt. Original structural/reading/dark CSS remains independently inspectable. Each homepage card uses the actual featuredImage, optional configured fallback, or a CSS placeholder. No remote image API is enabled.

Home/taxonomy/author lists, post/page/attachment, search/pagination, monthly archives, category/tag directories, errors, native Waline comments and protected core content are supported. Core-supplied category/comment metadata is displayed without inventing views. Interactions: persisted auto/light/dark mode, native mobile disclosure menu, article heading directory, text-based reading estimate, reading progress, keyboard image preview/Escape/focus restoration and no-JS navigation. Appearance controls expose cover, cover height, avatar, fallback thumbnail, intro, announcement, article section title, accent, reading font and footer.

## Explicit differences and remaining work

This is not full upstream parity. Unclear-rights visual effects and all their code/assets are excluded. No Sakura petals, wave/canvas animations, vendor image effects, icon packs or live character assets are shipped. Fonts use system equivalents. Native mobile disclosure replaces upstream animated off-canvas navigation; the footer is in document flow rather than upstream's scroll-revealed fixed footer. Site navigation is one shared menu.

The WordPress shuoshuo custom post type/mixed feed, AI excerpts/reading assistant, configurable homepage component reorder/static/exhibition sections, video/HLS card covers, random background service, custom social-slider/QR integrations, author login/user center, friends/galleries/media templates, shortcodes, PJAX/infinite load, reactions/rewards/share APIs and WordPress enhanced comment forms remain unported. Comments use Firekylin Waline. Existing rendered Markdown/content is used without executing PHP/Gutenberg. No live database/remote comment-login test is claimed.

## Validation

Root `pnpm install --frozen-lockfile`, `pnpm test`, Python tests and `pnpm test:browser`. Set CHROMIUM_PATH when using system Chromium. FIREKYLIN_CORE_PATH enables actual core Widget and comment rendering instead of the small fixture. Browser checks cover 1280px/390px geometry, footer placement, media, keyboard dialogs, color persistence and no-JS menu. Build through scripts/build-registry.py and test the ZIP with scripts/check-port-install.js. No registry publishing or deployment occurs on this branch.
