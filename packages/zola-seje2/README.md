# Seje2 for Firekylin

Adapted from https://github.com/eatradish/seje2. Exact commit and author are recorded in NOTICE.md. MIT license, Normalize.css MIT license and original Sass included.

Preserves the default horizontal serif layout, centered title/navigation, thin rules around summary articles, original automatic light/dark palette and Chinese numeral dates. System serif fallbacks replace upstream Google-hosted fonts, so typography depends on installed fonts. Mobile article padding is reduced and native media is constrained to the column.

Supports Firekylin 2.17.1+ posts/pages/attachments, taxonomy/archive/search, pagination, configured navigation, authorName/footerText and gated comments. The Zola vertical writing mode, multilingual builds, full-content homepage option, configurable font mirrors, MathJax and previous/next post service are not ported. Remote comment authentication/submission is not tested. Dates follow Firekylin's server date formatting.

Verification uses an actual installed ZIP and disposable SQLite site, desktop/mobile routes, no-JavaScript search/navigation, private-content and comment gating, media containment, Chinese date output and automatic dark palette. Evidence is in verification/zola-seje2. Comparison is with pinned source templates/Sass, not a live-demo pixel-parity claim. Shipped CSS and Eta can be edited directly.
