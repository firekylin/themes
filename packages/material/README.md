# Material for Firekylin — work in progress

Port of [iblh/typecho-theme-material](https://github.com/iblh/typecho-theme-material/tree/c8bd35d1a05fc487b49fc1884e176077f33ae9f3), pinned at `c8bd35d1a05fc487b49fc1884e176077f33ae9f3` (465 stars observed 2026-10-28). Original theme by Viosey, maintained by iblh (formerly bollnh). This is an independent draft; it is not ready for release.

Modification notice: adapted to Firekylin/Eta on 2026-10-28; changes are listed below.

## Source and redistribution

The upstream README explicitly states GPL v3.0, and its complete LICENSE is retained here. The Eta templates and integration code are modifications under the same license. `res/upstream.css` retains the upstream base, sidebar and burger rules; later icon/vendor sections and the bundled avatar URL were removed. `res/material.css` is the separately licensed Material Design Lite **1.3.0** distribution, Apache-2.0; its full terms are in LICENSE-MDL. The upstream unversioned MDL copy was replaced with this identifiable distribution.

No upstream photographs, illustration/logo files, avatar, icon fonts, analytics, remote CDN scripts, or third-party comment clients are redistributed. The CSS geometric background and text mark are replacement defaults; administrators can provide their own image URLs. No permission for upstream photographs or trademarks is implied.

## Implemented

- Original Material two-card header, 900px centered card stream, wide title media, author/date/category rows, desktop spacing and mobile stacking, using upstream CSS rather than a shared theme skin.
- Eta home/detail/page/search/archive/category/tag templates and error pages; public archive Widgets and standard Firekylin comment integration.
- Cover image from Firekylin `featuredImage`; date/author/category/comment metadata; pagination retaining query parameters.
- Accessible modal navigation, Escape dismissal and focus return; search FAB, RSS, archive and return-to-top links.
- Admin controls: slogan, daily picture, avatar, logo, theme/link/background colors and custom CSS.

## Differences and unfinished work

- No upstream Typecho runtime was started: the upstream desktop `screenshot.jpg`, PHP templates and responsive CSS were inspected. **Side-by-side actual upstream desktop/mobile runtime comparison remains pending.** Its linked Hexo demo is explicitly described upstream as different and is not used as proof of fidelity.
- Replacement artwork and updated MDL can differ visually; no pixel-equivalence claim. Mobile top offset is 56px to keep navigation accessible.
- Typecho sticky IDs, first-content-image/random thumbnail selection, view/like persistence, social share menus, PJAX, loading effects, Pangu, custom timeline/link pages, author profile details, three-language selector and Typecho-specific plugins are not implemented.
- Comment markup delegates to Firekylin; enabled Waline/login/server integration has not been exercised. Browser fixtures deliberately return no comment HTML.
- Category/tag entry pages are added for Firekylin; category child nesting remains unimplemented.
- Browser checks use real Eta and Firekylin Archive/Contents Widgets with fixture data, not a running database-backed Firekylin site. Full HTTP routing, private-post visibility, admin configuration persistence and configured site integration remain pending.

## Installation and verification

The repository ZIP builder and Firekylin's real `ThemeInstaller.install` were exercised against an isolated local directory with core commit `99bbdcb919bae2133420dee214c5f8897b9ace25`. No live site was modified. See `verification/material/README.md` in this repository for reproducible browser checks and screenshots. A successful ZIP installation is not a claim that all site-level integration is complete.
