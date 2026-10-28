# Nexmoe for Firekylin

A port of [Nexmoe for Typecho](https://github.com/theme-nexmoe/typecho-theme-nexmoe/tree/2f941bf3b98978e311a78e5362c74eea9214f1aa), pinned to `2f941bf3b98978e311a78e5362c74eea9214f1aa` (404 stars at selection, 2026-10-28). Apache-2.0; retained license and component attribution are in LICENSE and NOTICE. Tested with Firekylin 2.16.0, core commit `99bbdcb919bae2133420dee214c5f8897b9ace25`.

Retains the upstream stylesheet, 240px desktop drawer, blurred cover background, full-content post feed, large 12:7 covers with overlaid titles, colored metadata pills, archive timeline, and mobile toolbar. It is not a generic card template. Native controls implement keyboard-accessible mobile navigation, heading directory and image lightbox. Full-content feeds use the core public post query and its protected-content redaction.

Install the generated `nexmoe-0.1.0.zip` through Firekylin's theme installer. Theme options support avatar (`logoUrl`), fallback cover (`background`), ordered sidebar `widget` entries (`category,tagcloud,archive,social,search`), social URLs, game ID, TOC/lightbox toggles and custom CSS. Post featured images or `fields.Cover` override the fallback cover. Navigation comes from site navigation. Native routes cover posts, pages, search, categories, tags, archives and pagination.

## Differences and verification limits

- Typecho view counters, its comment backend, PHP plugin hooks, and the dedicated friends-links template are not implemented. Comments use Firekylin's native widget; server-side enable/disable gating was verified. Complete Waline login/submission remains unverified because the environment's default CDN request failed certificate validation; no certificate checks were bypassed.
- The optional MathJax, SmoothScroll, syntax highlighting, MDUI ripple and alternate dark stylesheet are not implemented. The lightbox uses a native dialog rather than Fancybox, and the directory is a native heading list. TOC is hidden below 1440px to avoid crowding.
- Unknown-license original imagery and iconfont are replaced by new SVGs and attributed Google Material Icons. Social icons use text initials. No upstream analytics/ad account is carried over.
- Article, category and tag counts reflect Firekylin's data. Public fixtures differ between CMSs; screenshots do not claim pixel identity. The pinned upstream and port were rendered at 1440px and 390px: cover position/size and content column match. Full-content feed typography retains the upstream serif face. Admin UI save flows were not browser-tested.

See `verification/nexmoe` for screenshots, bounding boxes, reference setup, and actual SQLite integration tests. The test builds the ZIP, installs it through ThemeInstaller, checks desktop/mobile pages, navigation/search, pagination, private/draft exclusion, sidebar order, TOC and lightbox. Tests operate on disposable local databases, never a production site.
