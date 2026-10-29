# Sagiri for Firekylin

Port of Shiyi's Typecho Sagiri, based on DIYgod's Hexo Sagiri. Requires Firekylin 2.17.1 or newer. Install the generated theme ZIP through Firekylin, then select Sagiri.

Preserves the large banner and translucent navigation, centered article cards with category ribbon, orange heading markers, desktop sidebar with article directory/overview switches, list excerpt/read-more cards, pagination and mobile single-column reading. Uses native Firekylin search, archives, categories, tags, pages, protected content and comment renderer. Images open in a keyboard-dismissible native dialog. Navigation, reading, pagination and search work without JavaScript.

Configure headerImage and avatarUrl with HTTP(S) URLs or site-absolute paths, and profileName/profileText as plain text. No third-party artwork is supplied: the default banner is a plain gradient. Main navigation follows Firekylin's navigation settings; archive and search links are always present. Sidebar hides below 992px, matching upstream. Article TOC is a JavaScript enhancement.

Platform differences: no Typecho AJAX/PJAX, statistics endpoint, social login, shortcodes, reward QR service, music player, local-search index or bundled syntax highlighter. Views are not fabricated. List Widgets do not provide category relations, so ribbons appear on article detail pages only. Firekylin supplies comment policy and integrations; remote client login/submission was not exercised. Fonts use the local sans-serif fallback rather than the unbundled original Telefon font. See NOTICE.md for exact source and license and VISUAL-COMPARISON.md for verification limits.
