# Rocinante for Firekylin

Port of mavidser/hugo-rocinante by Sid Verma, exact revision in NOTICE.md. Original MIT license and Sass retained, including Eric Meyer’s public-domain reset notice. Native compile entry selects original light/dark palettes with CSS OS preference and excludes optional Monokai syntax imports. Uses original system fonts; no external assets or runtime JavaScript.

Preserves the small left-aligned site header, 740px reading column, title/date/summary feed, dotted intro divider, blue links and shaded full-width footer. Original pale-gray/light and near-black/dark palettes follow the OS even without JavaScript. First-page introduction uses the site description; later pages show the current page number. Native menus wrap visibly.

Native Firekylin posts/pages, attachments, archives, taxonomy, server-side search, pagination, protected content and comment gating are implemented. Footer author/text settings are escaped. Native blog posts use the upstream text-only listing; images in article content remain available. Hugo photo albums/location metadata, separate photoblog collection, custom Markdown about text/link matrices, email-reveal script, custom syntax highlighting and forced per-site color modes are not implemented. Native remote comment login/submission is untested.

Actual ZIP installation in Firekylin2.17.1 SQLite verifies18desktop/mobile routes, content privacy, comments, pagination, native attachments/media and no-JS navigation/search. Theme assertions check740pxgeometry, first-page intro, dated summary rows and light/dark colors including no-JS dark. Screenshots compared against pinned templates/Sass, not a live upstream demo.
