# Button 2 for Firekylin

Button 2’s playful craft-blog identity, orange accents, decorative ruled separators and large featured images.

Source https://github.com/Automattic/themes/tree/trunk/button-2, revision in NOTICE.md. Original editable CSS and theme-specific structure retained. GPL-2.0-or-later; system fallback fonts are used; no third-party fonts or icons are distributed.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation works without JavaScript.

Jetpack featured-content sliders, portfolio/testimonial custom post types, WordPress Customizer, arbitrary widgets, Gutenberg, WooCommerce, plugin shortcodes, post-format sliders and AJAX infinite scroll are unsupported. Native pagination replaces infinite scroll. Firekylin comments replace WordPress comments; external Waline login/submission untested. No demo photos or upstream scripts distributed. Local editable CSS/Eta sources included, no build step.

Protected post thumbnails are hidden when the native password flag/hash is present or the title is Firekylin’s redaction marker `此内容被密码保护`. The title check supports core list responses that remove the password hash but retain `options.featuredImage`. As a conservative privacy fallback, a public post with exactly that title also has no thumbnail. Successful native password unlocks restore the original title and thumbnail. The locked detail view already clears options in the core; its guard is defense in depth.
