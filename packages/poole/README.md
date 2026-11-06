# Poole for Firekylin

A native port of Mark Otto’s Poole blog: 45rem reading column, compact title/tagline masthead, large linked post titles, muted dates, spacious articles, bordered pagination and automatic system dark palette. The original SCSS is compiled locally into the shipped stylesheet.

Requires Firekylin 2.17.1+. Install the release ZIP through the theme market. Site title, description and navigation come from Firekylin; footer text and author can be configured in theme settings. All assets are local.

Supports home/taxonomy/author feeds, archives, categories, tags, native GET search, article/page/attachment routes, pagination, protected content and core comment gating. Native summary excerpts replace Poole’s full-content home feed because Firekylin list widgets do not load full bodies; unpublished/private posts remain governed by core widgets.

Adaptations: native navigation added below the masthead for Firekylin routes; numeric dates avoid locale dependencies. Jekyll related-post ranking, Liquid plugins, RSS generation, analytics, and Rouge tokenization are not ported. Core produces content and highlighting. System dark mode is automatic, without a manual selector. Remote comment submission is outside local verification.

See NOTICE.md for pinned source and LICENSE for the upstream MIT notice.
