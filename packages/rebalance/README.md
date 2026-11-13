# Rebalance for Firekylin

Rebalance’s oversized site identity, split description/navigation row and clean three-column photography portfolio with dated captions.

Source https://github.com/Automattic/themes/tree/trunk/rebalance, revision in NOTICE.md. Original editable CSS and theme-specific structure retained. GPL-2.0-or-later; system fallback fonts are used; no third-party fonts or icons are distributed.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation works without JavaScript.

Jetpack featured-content sliders, portfolio/testimonial custom post types, WordPress Customizer, arbitrary widgets, Gutenberg, WooCommerce, plugin shortcodes, post-format sliders and AJAX infinite scroll are unsupported. Native pagination replaces infinite scroll. Firekylin comments replace WordPress comments; external Waline login/submission untested. No demo photos or upstream scripts distributed. Local editable CSS/Eta sources included, no build step.

Protected list thumbnails are suppressed even on core versions that retain image
options after title/body redaction. The compatibility guard recognizes native
protection flags, password hashes, and the current core's Chinese protected-title
sentinel. Password entry and detail unlocking remain entirely core-controlled.

Native code panels retain the upstream gray background but use dark text for readable contrast.
