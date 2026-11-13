# Radcliffe for Firekylin

Radcliffe’s full-width photographic story panels, centered Abril Fatface headlines, dark image overlays and Crimson Text article typography.

Source https://github.com/andersnoren/radcliffe, revision in NOTICE.md. Original editable CSS and theme-specific structure retained. GPL-2.0-only; fonts are OFL-1.1, licenses in LICENSES.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation works without JavaScript.

WordPress Customizer, arbitrary widgets, Gutenberg, WooCommerce, plugin shortcodes, post-format sliders and AJAX infinite scroll are unsupported. Native pagination replaces infinite scroll. Firekylin comments replace WordPress comments; external Waline login/submission untested. No demo photos or upstream scripts distributed. Local editable CSS/Eta sources included, no build step.

## Privacy and native media compatibility

Listing covers are hidden when Firekylin marks a post as password-protected, retains a password hash, or returns the redacted title `此内容被密码保护`. The title fallback protects compatibility with core list rows that remove the hash but retain `featuredImage`; a public article with exactly that title will also conservatively hide its listing cover. The native password form and successful unlock behavior are unchanged.

Native post and page video/audio now fit the reading column. Video keeps its aspect ratio, and audio retains its native controls. These adapter overrides leave the upstream stylesheet and licensing notices intact.

Fenced code resets nested inline-code padding, background and font sizing so wrapped lines do not obscure each other; standalone inline code keeps its upstream styling.
