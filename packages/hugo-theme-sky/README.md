# Sky for Firekylin

Chris Frome’s MIT Hugo Sky port retains the blue navigation bar, charcoal canvas, centered white profile panel, round portrait, bordered introduction and Bootstrap blog list with right-aligned date badges. Original default.css is bundled; Bootstrap 3.4.1 replaces 3.1.1. Open Sans is local with OFL.

Configure profileName, tagline, location, about and avatarUrl; text is escaped and avatar URLs allow only http(s) or site-absolute paths. Unlike the hardcoded upstream demo identity, defaults use site settings. The home page includes paginated posts beneath the profile card so Firekylin’s native home pagination remains usable. Category/tag pages omit the card and show the actual taxonomy title. At small widths navigation wraps and dates move below titles. The navigation uses normal document flow rather than overlaying content.

Native posts/pages, archives, categories/tags, attachments, search, comments and protected posts are supported. Footer author/text are configurable. Hugo nested menus, per-page hide-date, automatic RSS, Disqus/analytics and social icon services are not implemented. No demo image is bundled. No live upstream pixel comparison or external comment submission was performed.
