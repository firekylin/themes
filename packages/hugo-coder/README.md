# Hugo Coder for Firekylin

Native port of Hugo Coder at 58d956f41c056a12e15d5b6ee27c54fc98cd6e49, for
Firekylin >=2.16.0. Keeps the centered personal homepage, original avatar/name/info
geometry, social icon row, uppercase navigation, large reading titles, date lists,
responsive menu, dark palette and original RTL stylesheet. Source and licenses are
retained. No upstream example content is copied.

## Settings

- author defaults to site title; info defaults to description, with newline-separated
  lines. Both are escaped text, not arbitrary Markdown/HTML.
- avatarUrl: HTTP(S) or root-relative image URL.
- socialJSON: array of {name,url,icon}; icon optionally contains Font Awesome classes,
  e.g. `[{"name":"GitHub","url":"https://github.com/example","icon":"fa-brands fa-github fa-2x"}]`.
  Malformed JSON falls back safely. URLs accept HTTP(S) or root-relative values.
- homeMode: profile (default), posts. Filtered/paginated requests always show lists.
- colorMode: auto (default), light, dark; visitor choice persists locally. OS changes
  apply while in auto mode. hideColorToggle: true hides the control.
- rtl: true enables original right-to-left CSS; language translation is not implied.
- tocEnabled: true enables article heading TOC; tocOpen: true starts it expanded.
  Both default false, matching the optional upstream TOC behavior.
- since: actual site start year, optional; footerText: optional plain text.

Native Widgets render lists, search, pagination, archives, categories/tags, pages,
posts and attachments. Native comments respect disabled/login settings. Featured
images use options.featuredImage. The mobile checkbox menu works without JS and
adds Escape/focus handling with JS. TOC and heading anchors come from rendered
h2–h4; explicit copy buttons preserve exact code in secure contexts.

## Differences and unfinished features

Hugo content/shortcode parsing, automatic multilingual translation links, Gravatar,
extra home template sections, content series, reading-time calculation, external
post redirects, arbitrary custom script injection, analytics, KaTeX/Mermaid, social
comment integrations and Mastodon/Telegram feeds are not implemented. Native Waline
replaces alternate comment-provider templates. Native server search adds a Search
navigation item. Dates use native YYYY-MM-DD, rather than the default long English
date; unavailable reading time is omitted. Native monthly archive groups replace
Hugo's generic section list. The profile defaults to actual site settings without
invented biography data. Content language/UI translations are not supplied.

No-JS content, navigation and CSS auto scheme remain usable; TOC generation,
copying, heading anchors and persistent scheme switching require JS. Native
metadata/footer text and explicit code buttons cause documented article differences.
No remote font or CDN resource is required.

## Verification

14 Node tests, 12 additional tests using actual Firekylin 2.16.0 Widget/comment
classes, 7 Python packaging tests, 16 browser pages at 1280/390px. Source comparison
asserts identical profile/avatar/name/info rectangles. Additional browser checks:
menu/Escape/focus, scheme persistence, TOC links, exact clipboard and no-JS menu.
Actual core ThemeInstaller installs the generated ZIP. These use synthetic rows,
not a live database/login or remote comments. See VISUAL-COMPARISON.md.

Run pnpm test; Python unittest discovery; FIREKYLIN_CORE_PATH=/path/to/core node
--test test/coder.test.js; CHROMIUM_PATH=/usr/bin/chromium pnpm test:browser.
Install hugo-coder-0.1.0.zip through the native installer and select Hugo Coder.
