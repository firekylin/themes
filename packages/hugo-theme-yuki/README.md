# Yuki for Firekylin

Port of iCyris/hugo-theme-yuki, MIT Cyris2019, exact revision in NOTICE.md. Original layout Sass retained and compiled. Local unmodified EB Garamond variable font has OFL1.1 notice/hash; other fonts use system fallbacks. No upstream demo display/logo/avatar artwork, HighlightJS/Monokai, tracking or original JS bundled.

Preserves large optional85vhdesktop/28vhmobile hero, centered identity/navigation, gold section rule,50vw date/title list (90vwmobile),56vw reading column, gold heading markers and author profile. heroImage,logoImage,profileImage accept HTTP(S)/site-absolute URLs; missing/unsupported values omit artwork, logo falls back to site title. Native nav remains visible instead of a JS fullscreen menu. Article body is preserved; text-only list matches upstream. Native archive/taxonomy/search/pagination, attachments, protected content and comments are wired to Firekylin. Footer author/text are escaped. Fixed original white palette retained.

Omitted: social account buttons, generated related/previous-next content cards, sticky nav animation, custom shortcodes, custom HighlightJS, Google Analytics, demo artwork and custom RSS. Native comment remote login/submission unverified. User-configured images may be external; none is distributed by default.

Actual ZIP verification targets Firekylin2.17.1 SQLite with18desktop/mobile routes, no-JS menu/search, native media/privacy/comments and image URL fallbacks. Additional checks cover configured hero/profile,85/28vh sizing, local font and fixed light palette. Visual comparison against pinned source templates/Sass, not live-demo pixel equality.
