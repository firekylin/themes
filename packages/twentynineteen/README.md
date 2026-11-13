# Twenty Nineteen for Firekylin

Twenty Nineteen’s heavy sans-serif titles with short rules, blue links, wide images and serif single-column prose.

Source https://github.com/WordPress/twentynineteen, revision in NOTICE.md. Original editable CSS and theme-specific structure retained. GPL-2.0-or-later; system font fallbacks are used; no external fonts are distributed.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation works without JavaScript.

WordPress Customizer, arbitrary widgets, Gutenberg, WooCommerce, plugin shortcodes, post-format sliders and AJAX infinite scroll are unsupported. Native pagination replaces infinite scroll. Firekylin comments replace WordPress comments; external Waline login/submission untested. No demo photos or upstream scripts distributed. Local editable CSS/Eta sources included, no build step.

Password-protected listing covers are hidden using the native protection flag,
password hash when available, and the core redacted-title fallback. A public post
whose exact title is `此内容被密码保护` also conservatively hides its listing cover.
Native post/page video and audio fit their reading column without distorting video.
See `verification/twentynineteen/PRIVACY.md` for regression evidence and limitations.
