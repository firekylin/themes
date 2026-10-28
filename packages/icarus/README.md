# Icarus for Firekylin

A port of [PPOffice/Icarus](https://github.com/ppoffice/hexo-theme-icarus) at `4c0a463028c6e923815f561f15261b6c49ac056d` (7.0.1). Requires Firekylin 2.16.0+. MIT; upstream and Bulma notices are included. This package is a draft for review, not a published registry release.

The original Stylus designs are compiled for `default`, `cyberpunk`, and `m3e`. Eta templates retain the navbar, card articles, profile sidebar, recent posts, category/tag widgets, responsive three-column structure, archives and pagination. Original JSX/Hexo helpers are replaced with public Firekylin Widgets; no Hexo runtime is shipped.

Build an installable ZIP with `python3 scripts/package-icarus.py` and upload `dist/icarus-0.1.0.zip` through Firekylin's theme installer. Enable the installed theme in the administration interface. Compilation is unnecessary for users; developers can regenerate CSS with `node scripts/build-icarus-css.js` after `pnpm install --frozen-lockfile`.

Configuration fields are available in the theme settings:

- `variant`: default (fallback), cyberpunk, m3e; `appearance`: auto (fallback), light, dark. The visitor's appearance button persists a local preference.
- `columns`: 1, 2, 3 (fallback). Three columns collapse the right widgets into the left below 1280px. Upstream's generated default configuration uses two columns; this port defaults to the three-column showcase. `leftSticky` and `rightSticky` accept `true`.
- `profileName`, `profileBio`, `profileLocation`, `avatarUrl`, `followUrl`: profile card. Name/biography default to site title/description; no bundled portrait. `socialLinks` and `links` accept JSON arrays of `{ "name": "Example", "url": "https://example.org" }`.
- `defaultCover`: optional article cover, overridden by the content's featuredImage. No upstream demo photograph is distributed.
- `showUpdated`: `true` shows updated date; `showToc`: `false` disables the heading directory. `footerText` changes the footer text. Site navigation comes from Firekylin.

Main pages include home/list, post, page, attachment, search, archives, category and tag directories. Search uses Firekylin's endpoint; comments use its comment renderer, including disabled and protected-content behavior. Browser enhancements provide mobile navigation, TOC with Escape/return focus, clipboard and appearance selection. Navigation/content remain available without JavaScript.

## Differences and unfinished integrations

This is not complete parity with every Icarus plugin. Insight/Algolia, PJAX/prefetch, animation, analytics, donation providers, ShareThis, service workers, arbitrary widget ordering, hexo-specific shortcodes, mathematical rendering and syntax-highlight engines are not ported. Code remains readable and copyable. Third-party comments are replaced by native Firekylin comments. Profile global post/category/tag totals and read-time are omitted rather than invented. Article licensing/attribution panels require explicit site-owner license configuration and are not automatically asserted for their content. UI icons are text/Unicode; external font and icon libraries are not loaded. Category counts use only supplied public metadata. Empty comment output does not create an empty card.

Core tests instantiate pinned real Widget classes and the comment renderer with synthetic public records, and invoke the real ThemeInstaller on the generated ZIP. They do not launch a production database, submit live comments or test external providers. See `../../validation/icarus/VISUAL-COMPARISON.md` for original-reference screenshots and measured differences.
