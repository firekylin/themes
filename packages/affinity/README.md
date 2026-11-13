# Affinity for Firekylin

Affinity’s warm dark identity band, elegant centered blog titles and large image-led single-column posts. This port implements its blog view; one-page wedding sections are not included.

Source https://github.com/Automattic/themes/tree/trunk/affinity, revision in NOTICE.md. Original editable CSS and theme-specific structure retained. GPL-2.0-or-later; system fallback fonts are used; no third-party fonts or icons are distributed.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation works without JavaScript.

Jetpack featured-content sliders, portfolio/testimonial custom post types, WordPress Customizer, arbitrary widgets, Gutenberg, WooCommerce, plugin shortcodes, post-format sliders and AJAX infinite scroll are unsupported. Native pagination replaces infinite scroll. Firekylin comments replace WordPress comments; external Waline login/submission untested. No demo photos or upstream scripts distributed. Local editable CSS/Eta sources included, no build step.

Protected listing thumbnails are suppressed when core exposes a protection flag,
a remaining password hash, or the redacted title `此内容被密码保护`. This last fallback
is deliberately conservative: a public post with that exact title also loses its
listing thumbnail. Native detail password handling remains core-controlled; valid
passwords still restore the article and cover. See the privacy verification notes.
