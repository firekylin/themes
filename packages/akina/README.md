# Akina for Firekylin

Akina's profile landscape, slanted lower edge, narrow reading column and circular article icons, adapted from Zisbusy/Akina-for-Typecho `0608252ffb5f263c7f88b3985a1f6645928fb1fa` (541 stars at selection). Credit: Fuzzz (earlier WordPress theme), 子虚之人 (Typecho port). GPL-2.0 retained; earlier-source uncertainty and asset exclusions are recorded in NOTICE.md.

Install in `themes/akina` or legacy `www/theme/akina`, then select it in Appearance. Requires Firekylin 2.16.0+. No build step. Configure `headimg`, `avatar`, `socialUrl`, plain-text `notice`, intro/footer, accent or dark palette. Desktop profile cover is intentionally hidden below 860px as in the reference. Article featuredImage becomes the circular list icon; no unlicensed random photo fallback is shipped.

Supports public lists/taxonomies/authors, article/page/attachment, search/pagination, archives, empty/error states, core content/password forms and native comments. Native TOC links are generated locally. No raw database queries. No Typecho dynamic-post plugin, sticky SQL query, OwO/Ajax comments, reward/QQ integrations, random articles, visitor heat counters, custom standalone home.php or featured-by-ID plugin behavior. Normal navigation remains available without JS.

Run `pnpm test`, `pnpm test:browser`, Python packaging tests and actual core tests with `FIREKYLIN_CORE_PATH=/path/to/firekylin`. See VISUAL-COMPARISON.md for reference scope.
