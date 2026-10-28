# Material for Firekylin

Port of [iblh/typecho-theme-material](https://github.com/iblh/typecho-theme-material/tree/c8bd35d1a05fc487b49fc1884e176077f33ae9f3), pinned at `c8bd35d1a05fc487b49fc1884e176077f33ae9f3` (465 stars observed 2026-10-28). Original theme by Viosey, maintained by iblh (formerly bollnh). Keep the PR in draft: the Waline client check is blocked as described below.

Modification notice: adapted to Firekylin/Eta on 2026-10-28. Templates, navigation and configuration integration are rewritten for Firekylin; original Material layout CSS is retained with targeted integration changes.

## Source and redistribution

The upstream README states GPL v3.0; its complete LICENSE is retained. The Eta templates and integration code use the same license. `res/upstream.css` retains upstream base/sidebar/burger rules; later icon/vendor sections and bundled avatar URL are removed, and repeated article IDs become classes. `res/material.css` is the identifiable Material Design Lite **1.3.0** distribution (Apache-2.0), with full LICENSE-MDL; it replaces upstream's unversioned MDL bundle.

Upstream photos, logo, avatar, icon fonts, analytics and remote theme scripts are not redistributed. The four SVG covers and avatar are newly authored geometric replacements under this package's GPL license; the default logo is a text mark. No permission for upstream artwork or trademarks is implied. Reference screenshots also use these replacement fixture images via upstream's supported configuration, leaving upstream PHP/CSS/JS unchanged.

## Implemented and configuration mapping

- Original two-card home header, 900px centered card stream, title media, split author/category rows, mobile stacking, article heading treatment and mobile full-width detail card. No shared theme skin.
- Home/detail/page/search/archive/category/tag routes, pagination, previous/next posts and error templates, using public Firekylin Widgets.
- Drawer with categories/navigation, keyboard dismissal/focus return, functional page/share menus, RSS, search FAB, social links, native share/copy-link and page tools.
- `slogan`, `dailypic`, `dailypicLink`, `logo`, `logoLink`, `avatarURL`, `favicon`, `ThemeColor`, `alinkcolor`, `ChromeThemeColor`, `bgcolor`, `customCSS` map to corresponding upstream concepts.
- `BGtype`: 0 solid, 1 `backgroundImage`, 2 one of ten `GradientType` presets. Multi-layer legacy gradients are simplified to CSS linear equivalents.
- `ThumbnailOption`: 1 featured image / first available summary-content image with fallback, 2 pure `TitleColor` quotation card, 3 replacement gallery. `randomPicURLs` accepts whitespace-separated HTTP(S) or root-relative images; selection is stable by post ID instead of changing on refresh. Four original SVGs are default fallbacks. List Widgets do not return full post content: when the image is outside the summary, set Firekylin's featured image.
- `stickyIds`: comma-separated IDs selected from the latest **50 public posts**. This deliberately cannot expose private/draft posts; IDs older than the window are not pinned.
- `socialLinks`: JSON array of `{label,url}` with HTTP(S) URLs, replacing per-provider settings. Core navigation supplies page links.
- `langis`: 0 English, 1 simplified Chinese, 2 traditional Chinese for principal navigation/list/search/taxonomy labels. Some accessibility/status labels remain bilingual or Chinese.
- Comments use Firekylin/Waline; no Typecho native or retired Duoshuo client is bundled.

## Actual verification

Upstream ran in **Typecho 1.2.1**, commit `206880ba714d80bfb0638aeacb49c58b8fb1b327`, on PHP 8.2 with SQLite. PHP display-errors was disabled because the legacy theme emits warnings that otherwise corrupt image URLs; errors were not patched out of theme source. Optional PJAX/loading/Pangu switches were off for the comparison. Requests outside localhost were blocked in reference capture to avoid analytics/avatar dependencies.

The port ran on an actual isolated Firekylin **2.16.0** SQLite site at core commit `99bbdcb919bae2133420dee214c5f8897b9ace25`. Repository ZIP builder and real `ThemeInstaller.install` were used. Desktop 1440px/mobile 390px screenshots compare home and detail pages. Measured home header cards, article card, article media and content-container rectangles match on both viewports; images, text/data, controls and fonts are not asserted pixel-identical.

`verification/material/live.cjs` exercises real routes, pagination/search, navigation/menus, 13 public posts plus a private post and draft, non-disclosure on listings/search/archive/direct links, sticky filtering, language/background/thumbnail configuration and comment enable/disable. Missing private/draft details follow Firekylin's native redirect to `/`. The dedicated CI job repeats this isolated-site test.

## Remaining differences and blocker

- **Waline full client/mount/login/submission check blocked:** default JS/CSS URLs at `https://cdn.jsdelivr.net/npm/@waline/client@3.16.0/dist/` fail with `net::ERR_CERT_AUTHORITY_INVALID` in this environment. No certificate bypass was used. Server-side gating and emitted configuration are verified; full client interaction is not.
- Persistent Typecho likes/views, Typecho plugin links page, bespoke Material/Voez timeline pages, PJAX/loading/Pangu effects, full user-profile sidebar, exact relative-date text and category child nesting are not implemented.
- Full localization and every legacy appearance toggle are not reproduced. Fallback artwork/fonts/icons, stable gallery selection, simplified gradients and native Firekylin comments differ as explained above.
- Admin form persistence through the browser is not claimed: configuration was persisted in the isolated test database and verified by real requests. Custom CSS is trusted administrator code.

No production changes, release, merge or deployment are part of this port.
