# Hoffman for Firekylin

Hoffman’s centered masthead, broad featured media, inset narrow post body, Raleway titles and Vollkorn reading face.

Port of https://github.com/andersnoren/hoffman; pinned revision in NOTICE.md. Retains upstream editable style.css and theme-specific header, article and feed structures. GPL-2.0-only theme; original local font files are OFL-1.1 with licenses in LICENSES.

Requires Firekylin 2.17.1+. Native site title/description/navigation, authorName/footerText, featuredImage, posts/pages/attachments, archives, taxonomy, search, pagination and comment gating. Navigation wraps and works without JavaScript.

WordPress Customizer, arbitrary widgets, Gutenberg blocks, WooCommerce, post-format sliders and plugin shortcodes are not implemented. WordPress comment storage is replaced by Firekylin comments. Theme uses a static header background; upstream demo photography is not distributed. External Waline login/submission is untested.

Editable CSS and Eta sources are included in the installed ZIP. No build step is required.

## 0.1.2 privacy correction

Password-protected list rows no longer expose `featuredImage` URLs. Firekylin's native redacted title is treated conservatively alongside the protection flag/hash because list redaction can retain other theme metadata. A public article literally titled `此内容被密码保护` also has its listing thumbnail suppressed. Public thumbnails and native post/page password unlocking remain available. No core or upstream assets were changed.
