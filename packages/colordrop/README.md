# Colordrop for Firekylin

Source https://github.com/humrochagf/colordrop; pinned revision in NOTICE.md. MIT license, Normalize MIT notice and local Montserrat/Inconsolata fonts with SIL OFL licenses and hashes included. Original Sass and compiled CSS are included.

Preserves the black/white palette, circular optional profile image, uppercase heavy title, ruled centered navigation, image/summary blog feed, publication metadata and black footer. Uses the blog section as homepage. Set `profileImage` to an http(s) or site-absolute image URL; optional native featuredImage fields show list covers. This adaptation uses the upstream default colors; custom colors require editing source Sass and recompiling.

Native Firekylin 2.17.1+ posts/pages/attachments, archive/taxonomy/search/pagination, navigation and gated comments. Native server-side search replaces Pagefind. Hugo curriculum/bits/multilingual pages, custom JSON-LD, social icons/sharing services, content-license badges, KaTeX and copy-code script are omitted. No upstream demo media, remote scripts or fonts. Remote comments login/submission untested.

Verification installs actual ZIP into a SQLite Firekylin site, checks 18 desktop/mobile routes, no-JS navigation/search, privacy/comments, attachments, wide media, local fonts and optional profile/cover images. Screenshots compare pinned source/templates, not live-demo pixel parity. Rebuild upstream base with `sass res/source/firekylin.scss`; retain appended local font/native CSS when replacing theme.css.
