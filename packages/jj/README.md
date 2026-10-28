# JJ for Firekylin

Source-guided recreation of JJ's compact developer reading layout: category navigation, author/date/category row, article title/excerpt, right thumbnail, comment/tag footer, and article directory. Reference: mulingyuer/Typecho_Theme_JJ c953b3c06c32f89d32bd618f9416f6506230caa5, by 木灵鱼儿.

**License caveat:** original root BSD-3-Clause and index.php noncommercial/24-hour deletion text conflict. Both are preserved/documented; user confirmed noncommercial scope. Revised implementation bundles no original source/styles/vendor assets. This does not claim original unrestricted rights; see NOTICE.md.

Install in `themes/jj` or legacy `www/theme/jj`; requires Firekylin >=2.16.0. No build step. Configure `avatar`, intro/footer, sidebar heading, accent and night palette. Images use safe HTTP(S) or local paths; no default third-party avatar requests.

Supports public list/taxonomy/author, post/page/attachment, search/query pagination, archives, empty/error pages, protected content and native comments. Actual public Widget data is used: no popularity sorting or invented view/like counters. The homepage tab is labeled latest; recent posts replace recommendation/comment APIs. Core list Widgets may omit category/tag relations; render them only when supplied.

Not ported: JJEditor, infinite/Ajax pagination, recommendation rankings, authenticated frontend edit, search history/docsearch, 24 markdown palettes, games, emoji packs and remote comment APIs. Native desktop/mobile TOC uses a small local script. See VISUAL-COMPARISON.md and run `pnpm test`, `pnpm test:browser`; actual core tests accept `FIREKYLIN_CORE_PATH`.
