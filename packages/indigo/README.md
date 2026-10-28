# Indigo for Firekylin

Port of yscoder/hexo-theme-indigo 1.7.2 at `e4bc41a3b9404fa870899cb14b03062d72cb10c0`. Requires Firekylin 2.16.0+. Draft for review; not a registry release.

Original Less styles and theme-specific drawer/header/card structure are retained. The port uses public Widgets for home/list, post/page/attachment, search, archive and taxonomy directories, with filtered pagination and native comments. It is distinct from the MDL two-card Material theme being ported separately.

The upstream root LICENSE contains the **Unlicense**, while its package.json says **MIT**. Both files are retained (LICENSE and UPSTREAM-package.json); the port's license field follows the complete root license text. This discrepancy is disclosed, not represented as a matching declaration. See NOTICE.md for component exclusions.

Build `dist/indigo-0.1.0.zip` with `python3 scripts/package-indigo.py`, upload via the Firekylin theme installer and activate. CSS is prebuilt; developers may regenerate with `pnpm install --frozen-lockfile` and `node scripts/build-indigo-css.js`.

Settings: `authorName`, `profileText`, `avatarUrl`, `brandUrl`, `subtitle`, `footerText`; `hideMenu=true` starts detail pages with the desktop drawer closed; `showToc=false` omits the heading directory. `primaryColor`, `darkColor`, `accentColor` accept six-digit hex colors and override main header/footer/accent surfaces (not every original Less palette token). `links` is an array such as `[{"name":"Example","url":"https://example.org"}]`. Site navigation comes from Firekylin.

Native JS provides responsive drawer open/close, Escape and focus return on mobile, heading directory, code clipboard and Web Share (clipboard fallback). Navigation and content remain accessible without JS; the mobile drawer becomes inline. Original desktop menu width and mobile breakpoints are retained.

## Differences and unfinished features

No Waves ripple, external font/icon libraries, dynamic title, static full-text search index, provider comment systems, analytics, payment/reward images, math runtime, lightbox, automatic article-license declarations, view counters, floating sticky TOC or animation sequence. Search/comments/password handling come from Firekylin. TOC is a native details block inside the article card; original sticky TOC is not replicated. Sharing uses the browser's share sheet or clipboard instead of provider-specific panels. Original Roboto typography uses system fallback; image cropping and icons differ. Extra theme metadata/settings are escaped; article HTML remains trusted core output.

Local tests use actual pinned core Widget/comment and ThemeInstaller classes with synthetic records. They do not launch a production database or submit real external comments. Original-reference configuration, compatibility shim, screenshots and limitations are in validation/indigo.
