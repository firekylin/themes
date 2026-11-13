# Twenty Fifteen for Firekylin

Twenty Fifteen’s broad white sidebar and softly shadowed white reading cards on a pale-gray canvas.

Source https://github.com/WordPress/WordPress, revision in NOTICE.md. Original editable CSS and theme-specific structure retained. GPL-2.0-or-later; system font fallbacks are used; no external fonts are distributed.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation works without JavaScript.

WordPress Customizer, arbitrary widgets, Gutenberg, WooCommerce, plugin shortcodes, post-format sliders and AJAX infinite scroll are unsupported. Native pagination replaces infinite scroll. Firekylin comments replace WordPress comments; external Waline login/submission untested. No demo photos or upstream scripts distributed. Local editable CSS/Eta sources included, no build step.

Protected list records never render featured images. The current core removes the password hash while retaining `options.featuredImage`, so the theme also recognizes the core's redacted title `此内容被密码保护`. This conservative fallback also hides a cover on a public post deliberately using that exact title. Ordinary public covers are unchanged.
