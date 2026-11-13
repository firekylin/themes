# Basic Web Theme for Firekylin

Preserves Tom H. Fife / Tom Hyndman's intentionally minimal blog: a left-aligned 500px desktop reading column, full-width mobile content, plain linked header text or image, horizontal rules, title/date-link summaries, footer-only navigation and automatic dark preference. Original CSS and Hugo reference templates are included under MIT. No JavaScript or external font dependency is required.

Native posts/pages/attachments, archive, nested categories, tag results, search, pagination and comment gating are supported. Cards and featured images are not introduced; list excerpts never render custom fields or featuredImage, including protected content. Native password forms handle locked details. Tables and code scroll within the column; wide native video/audio stay contained. Dark table/code contrast is corrected.

Settings: headerText takes priority over a safe headerImage (HTTP(S) or site-absolute); otherwise the site title is shown. titleStyle=compact selects italic compact headings; showDate=hide uses the article path as the summary link and hides detail dates. Footer author/text are configurable. updatedText is an optional honest editor-supplied date, replacing Hugo's build-time timestamp.

The native paginated feed extends the unpaginated upstream list so posts remain reachable. Hugo random order/full-content previews, page front-matter overrides, author taxonomy, data-table/newsletter shortcodes and build-time timestamp generation are not ported. Native comments replace Hugo integrations; remote comment-provider login/submission untested. No live upstream pixel parity claim.
