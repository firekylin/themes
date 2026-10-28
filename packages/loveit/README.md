# LoveIt for Firekylin

Native port of LoveIt b224a0ecc0a8caaca425a71188f2ce4b805e883f, for Firekylin
>=2.16.0. Preserves original Sass styles, centered avatar/profile, text summaries,
fixed/normal desktop and mobile headers, article typography, responsive sidebar
TOC, archive rows, tags, dark palette and animated article headings. Original
source and license notices are in source/ and NOTICE.md.

## Settings

profileTitle/profileSubtitle default to site title/description. avatarUrl and
avatarLink accept HTTP(S) or root-relative URLs. profileEnabled/postsEnabled can
be false; hiding posts retains the original centered profile-only layout. Profile
appears on the first unfiltered home page. socialJSON is an array of {label,url};
labels are escaped text, not injected markup. Invalid JSON safely falls back.

colorMode: light (default), dark, auto. A visitor's light/dark choice persists in
localStorage; auto follows the OS. headerMode: fixed (default) or normal.
tocEnabled: false disables generated TOCs. codeMaxLines: 5–100, default20, controls
code collapse; users can expand the complete code. footerText is plain text.

Native navigation supplies menus. Native Widgets supply public lists, filtered
pagination, server search, post/page/attachment bodies, categories/tags and archives.
The post footer shows native update_time and prev/next only when supplied. Featured
images use native options.featuredImage. Native Waline rendering respects disabled
comments and login settings; no separate comment client is bundled.

Mobile menu supports Escape/focus return. TOC links and heading anchors are generated
from rendered h2–h4. Explicit code-copy buttons preserve exact text (secure context
required). Long code expands/collapses. Unlinked article/featured images open in an
accessible native dialog via click, Enter or Space; Escape closes and restores
focus. Linked images retain their original destination. This is independently
implemented and does not bundle GPLv3 LightGallery.

## Differences and unfinished features

Native server search replaces upstream Lunr/Fuse/Algolia/Pagefind search. No Hugo
shortcode parser, multilingual content graph, TypeIt animation, Gravatar service,
comment-provider selector, automatic reading-time/word-count display, content
license insertion, Git history, Markdown source download, social-share-provider
menu, analytics/counters, cookie consent, offline/PWA behavior, Mermaid/KaTeX,
map/chart/music/video widgets, or LightGallery zoom/slideshow is implemented.
Social profile links use text labels rather than the full social-icon catalogue.
Automatic scrolling-header hide/show is not implemented; fixed and normal modes
are. Native monthly archives replace Hugo's year groups. No external CDN is needed.

Without JS, navigation, full code and content remain usable; desktop/mobile TOCs,
copy controls, color preference switching and image dialogs require JS. OS-auto
color resolution also requires JS (light is the no-JS fallback). Metadata omits
unavailable word counts/reading time instead of inventing them. Copy controls add
24px to the fixture code block. Native footer attribution/search links differ.

## Verification

14 Node tests; 12 additional tests using actual Firekylin 2.16.0 Widget/comment
classes; 7 Python tests; 16 browser pages at 1280/390px. Configured homepage geometry
matches fixed source for profile/avatar/first summary/title. Further checks cover
mobile menu/Escape, persisted scheme, TOC, exact clipboard, long-code expansion,
keyboard image dialog/focus, and no-JS navigation/full code. Synthetic rows are
used; this is not a live database/login or remote Waline end-to-end test.
See VISUAL-COMPARISON.md. The ZIP is installed with the actual core ThemeInstaller.

Run pnpm test; Python unittest discovery; FIREKYLIN_CORE_PATH=/path/to/core node
--test test/loveit.test.js; CHROMIUM_PATH=/usr/bin/chromium pnpm test:browser.
Install loveit-0.1.0.zip through the native theme installer, then select LoveIt.
