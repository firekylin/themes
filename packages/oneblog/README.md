# OneBlog for Firekylin

Port of [OneBlog 3.7.2](https://github.com/cnxcdn/OneBlog/tree/e151a0c702e8e46671cfad5cad8e929f2e196c6f), by [彼岸临窗](https://023.me), pinned `e151a0c702e8e46671cfad5cad8e929f2e196c6f` (368 stars at selection, 2026-10-28).

**Distribution terms:** upstream includes GPL-2.0 plus a README prohibition on selling and a requirement to keep the author name and source link. The README explicitly permits modified sources to be used personally or shared free/open source. This port preserves both LICENSE and the complete declaration in UPSTREAM-TERMS.md, including the author's copyright/patent assertions; these assertions are recorded, not independently verified. No additional permission or unrestricted relicensing is claimed. The metadata points to the retained terms rather than silently labeling the combined terms standard GPL.

Retains the actual main/mobile CSS, 800px desktop writing column, restrained typography/spacing, title badge, responsive article previews, large post covers, menu/search layers and night palette. Native JavaScript implements keyboard-accessible menus/search, persisted night mode (optional automatic 19:00–05:00), incremental public-post loading and image dialog. No generic layout shared with other ports.

Install `oneblog-0.1.0.zip` through the Firekylin theme installer. Tested with Firekylin 2.16.0 core `99bbdcb919bae2133420dee214c5f8897b9ace25`. Settings include text/image logos, light/dark logo URLs, slogan, accent, featured banner switch/IDs, automatic night, year/ICP, email/GitHub and optional article copyright text. Featured IDs are selected only from the latest 50 public posts, at most three. Site navigation replaces Typecho's custom menu syntax. Featured images or `fields.thumb` supply article covers. Mobile featured cards use horizontal scroll snapping; desktop retains the main/side collage.

## Differences and limits

No Typecho microblog frontend login/publishing, friends/album plugin, sitemap generator, persistent views/likes, comment pagination/emoji/captcha, poster plugin, or external font services are implemented. Dates are absolute; the random quote is replaced by configurable slogan. The upstream automatic mobile carousel is a manual swipeable strip. Load-more is click-driven, not automatic scrolling. Native dialog replaces Fancybox; syntax highlighting and loading skeletons are omitted. Upstream third-party texture/images/iconfont/quotes are excluded; controls use text glyphs. Article copyright text is opt-in rather than asserting rights and image provenance on the owner's behalf.

Comments use Firekylin's native widget. Server-side enable/disable gating was tested; full Waline login/submission remains unverified after the environment's default CDN certificate failure, with no bypass. Admin browser-save flow not verified. The Typecho reference logs a sitemap SQLite syntax warning in its initialization; homepage/post rendering still succeeds. That sitemap code is not ported.

`verification/oneblog` contains installed-ZIP SQLite/browser tests, original/port desktop/mobile screenshots and geometry. Tests cover routes, private/draft exclusion, public-only banners, actual load-more, menu/search layers, persisted night mode and lightbox. Fixtures differ in count/categories/comments; these are visual comparisons, not claims of complete parity.
