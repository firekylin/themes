# Aquila for Firekylin — draft

Port of [imranhsayed/aquila](https://github.com/imranhsayed/aquila/tree/9989422c53ade3198608815fd40dae1f4a8a282d), GPL-2.0-or-later. Requires Firekylin >=2.16.0. Install the locally built aquila-0.1.0.zip through the normal theme installer. No release or deployment is performed.

Preserved: original Bootstrap/main CSS and Lato, light spacious navbar/search, 16:9 featured media, title/date/author/excerpt/taxonomy cards, blog columns grouping three stories each exactly as the pinned PHP source, two-thirds article with one-third recent-post sidebar, three-part footer, front intro and five-post carousel (3/2/1 visible by viewport). Menu and scrollable cards work without JavaScript. Buttons scroll cards; autoplay is deliberately not added. Search, taxonomy, archives, pagination and comments use native Firekylin contracts. Additional dark mode, TOC, reading progress/time and keyboard image preview are supported.

Configuration: homeStyle `blog` (default) or `front`; heroText intro; logoUrl owned image (default site title); coverImage fallback; showSidebar `true`/`false`; colorMode `light`/`dark`/`auto`; footerText. A post's featuredImage takes priority. Front mode applies only to first-page home, not taxonomy/author routes.

Known gaps: WordPress Gutenberg custom blocks/InnerBlocks and editor style variations; arbitrary rich static front-page composition (this port exposes a plain intro); aquila-features REST search filters; AJAX author/load-more demo; hierarchical WP menus and arbitrary WP widgets; previous/next-post lookup. The carousel uses native scroll-snap/manual controls rather than Slick autoplay/infinite clones/dots. Original author social links are replaced by site RSS/attribution. Core comments replace the WP form. This draft is not complete feature parity.

See VISUAL.md for paired source/render screenshots and test boundaries, NOTICE.md for licenses. The educational repository has functioning frontend templates; its course-specific admin/backend features are not represented as working Firekylin features.
