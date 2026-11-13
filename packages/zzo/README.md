# Zzo for Firekylin

A native port of [Zzo](https://github.com/zzossig/hugo-theme-zzo) by zzossig,
pinned at 01f9e43e59b0efcc3d17d2d435834bb69c6e6668 (MIT).
Requires Firekylin 2.17.1 or newer. Install the theme ZIP through Firekylin's theme installer.

## Preserved design

The 960px boxed canvas, dark Monokai-style default, compact brand/navigation bar,
home-only centered text masthead, classic 130px thumbnail/summary rows, right 250px author
biography/search/recent-post column, and colored taxonomy chips follow upstream
layout Sass and templates. The five Dark, Light, Hacker, Solarized and Kimbie
palettes are selectable and saved locally. Small-screen summaries use 90px images;
sidebar moves below content and navigation wraps rather than hiding behind JS.
Kimbie headings/links are slightly brighter for legibility.

Native widgets provide public post lists, archive groups, categories/tags and their
filtered lists, search with preserved-query pagination, post/page content, protected
content, image/audio/video/file attachments and Firekylin's comment renderer.
Article headings gain a collapsible local TOC when JavaScript is available.
Compared with upstream single pages, the biography sidebar is retained beside
articles and the TOC stays inline; archive groups follow native monthly grouping.
Without JavaScript, all article content, links, pagination and search remain usable;
the default dark palette remains and enhancement-only controls are hidden.

## Settings

- authorName: sidebar name, defaults to site title.
- bioText: sidebar biography, defaults to site description.
- profileImage: optional photo, HTTP(S) or site-absolute path only.
- location: optional plain-text location.
- footerText: optional plain-text footer, defaults to site description.

Post option featuredImage supplies the optional summary thumbnail, with the same
URL policy. Empty/unsupported image URLs omit the image. All metadata is escaped;
article HTML and password forms remain under native Firekylin control.
The pinned core retains image metadata on redacted protected list rows, so this
port suppresses thumbnails for its native protected-title sentinel as well as
explicit password-protected flags/hash fields.

## Differences and resource audit

This is the classic-summary/text-header variant, not the entire Hugo feature suite.
Not ported: card/compact summary selection, slider/typewriter headers, language/RTL
switching, gallery/showcase/publication/resume/contact page types, series taxonomy,
pinned/related posts, social/share/donation services, Hugo shortcodes, diagram/math
engines, syntax highlighter, AJAX Fuse search, analytics, feed templates, or Hugo
image processing. Search is Firekylin's server-rendered search. Native comments
replace upstream comment providers; remote Waline authentication/submission is
not part of local verification. No external fonts/scripts or demo art are bundled.
See NOTICE.md for retained sources and licenses.

## Verification

node --test test/zzo.test.js runs 16 checks across all eight template types with populated,
empty, hostile and protected fixtures. FIREKYLIN_CORE_PATH can select real widget
classes. verification/zzo/http.cjs installs an actual built ZIP in a disposable
SQLite site and checks HTTP routes/privacy/comment gating, explicitly without a
browser. verification/zzo/live.cjs additionally verifies desktop/mobile layout,
media containment, no-JS navigation/search, all palettes and localStorage fallback,
TOC controls, and captures genuine installed-theme screenshots. The pinned-core
GitHub workflow runs that full harness. Browser evidence must be reviewed before
merging; passing HTTP tests alone does not establish visual correctness.
