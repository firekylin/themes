# Vanilla Bootstrap for Firekylin

A native port of Zachary Betz’s [Vanilla Bootstrap Hugo theme](https://github.com/zwbetz-gh/vanilla-bootstrap-hugo-theme), pinned at `3f00947b65e6aa3d55388878d2872c2497ed1d93`.

The original Bootstrap 4.3.1 CSS and default theme styles retain the 700px reading container, centered bold navigation with Feather icons, transparent home jumbotron, blue linked title/date listings, outlined taxonomy buttons, code blocks and bottom footer. Icons are static SVG and navigation works without JavaScript. System fonts and local CSS only.

Firekylin posts, pages, attachments, archive, categories and tags, search, query-preserving pagination, protected content and native comments use widgets. The homepage adds the native paginated post list below the upstream home jumbotron, because Firekylin has no separate Hugo `/post/` section index. Taxonomy and page-two listings omit the hero. `homeText` and `footerText` are configurable plain text, falling back to the site description. Native category links and search are added to navigation; duplicate site navigation destinations are suppressed.

## Differences and unsupported integrations

Hugo shortcodes, menu icon configuration, arbitrary container widths, active menu configuration, hide-footer setting, custom localized date formats, KaTeX, analytics, Bootstrap’s optional JS widgets and jQuery are not implemented. Paste standard HTML or Markdown rather than Hugo shortcodes into native content. Dates use YYYY-MM-DD. Footer and home text are escaped plain text, not Hugo Markdown. Theme assets do not load remote fonts, scripts or tracking. User-authored content and the site-configured native comment provider may load their own resources.

## Verification

Run `node --test test/vanilla-bootstrap.test.js`. The dedicated workflow runs the real ZIP installer against the pinned official Firekylin core, creates a disposable SQLite site and verifies desktop/mobile routes, media sizing, privacy, comments, pagination and no-JavaScript search. Browser screenshots and report are produced by `verification/vanilla-bootstrap/live.cjs`; see the PR workflow artifacts for current results. Remote comment submission and upstream live-demo pixel comparison are not covered.
