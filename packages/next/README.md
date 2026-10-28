# Historical NexT for Firekylin

Port of iissnan/hexo-theme-next **5.1.4**, pinned to `9c8cea69bf0d4f91c07779d71b01814b27bbb6a1`. This historical MIT version is distinct from modern NexT releases and their licenses. Requires Firekylin 2.16.0+. Draft package, not a registry release.

The original four Stylus schemes are compiled individually: Muse's centered typography, Mist's horizontal header, Pisces' sidebar and continuous content panel, and Gemini's separated cards. Eta templates preserve the brand/header structure, post typography and separators, archive timeline, navigation and sidebar overview/TOC. Firekylin provides public content Widgets, metadata, search endpoint, filtered pagination and native comments.

Build `dist/next-0.1.0.zip` with `python3 scripts/package-next.py`, upload via Firekylin's theme installer, then activate in administration. CSS is prebuilt; developers can use `pnpm install --frozen-lockfile` and `node scripts/build-next-css.js` to regenerate it.

Settings:

- `scheme`: Muse (default), Mist, Pisces, Gemini.
- `sidebarPosition`: left (default) or right for Pisces/Gemini. Muse/Mist use the original right drawer.
- `subtitle`, `authorName`, `description`, `avatarUrl`: branding/profile; no bundled avatar photo.
- `socialLinks`, `links`: JSON arrays, e.g. `[{"name":"Example","url":"https://example.org"}]`.
- `showToc`: false disables the heading directory; `showUpdated`: true shows the updated date.
- `footerText`: footer text. Navigation comes from site settings.

All eight entry pages are implemented. Native JS controls mobile navigation, sidebar opening/closing, TOC/overview tabs, scroll percentage and code copying; Escape closes the sidebar and returns focus. Without JS, navigation/content remain available; mobile overview is inline. Original animation is disabled. Metadata/settings are escaped while trusted core article HTML and comment markup are preserved.

## Differences and limitations

Not implemented: Hexo local/Algolia/Swiftype search plugins, third-party comment providers, analytics, reward/QR panels, ratings, calendar/schedule page, auto math rendering, lazy loading/gallery lightbox, syntax highlighting runtime, animation, automatic content-license claims, global profile statistics and arbitrary Hexo tag plugins. Firekylin search/comments replace their counterparts. Recent posts are supplied by a public Widget; global totals are omitted rather than guessed. Original drawer push animation is replaced by an accessible explicit overlay on mobile. No focus trap is claimed.

Fancybox and bundled vendor scripts/fonts were not redistributed. Icons use text/Unicode, so typography can differ. Five empty upstream Stylus hook files contain a comment to avoid the current ThemeInstaller's zero-length archive-entry rejection; stylesheet behavior is unchanged. Test-generated screenshots use synthetic prose and a geometric avatar.

Validation uses actual pinned core classes, comment rendering and ThemeInstaller with synthetic data, plus Chromium desktop/mobile interaction checks. It does not launch a production database or test live comment submission. Paired original screenshots, all four scheme geometry measurements and fixture lockfiles are under `validation/next`; residual differences are documented there.
