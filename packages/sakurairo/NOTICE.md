# Source and resource audit

Source: [mirai-mamori/Sakurairo](https://github.com/mirai-mamori/Sakurairo/tree/21534bb86cfe061718842ea45c33449ff1331732), commit `21534bb86cfe061718842ea45c33449ff1331732`, version 3.1.0. Authors: Fuukei and contributors. Based on Sakura by Mashiro and contributors. style.css explicitly declares GPL v2 or later; original GPLv2 LICENSE retained. Modified 2026-10-28 for Firekylin.

README.md lines 54–56 explicitly warns that some Internet effects have unclear copyright/open-source terms. **Those effects are not authorized by this port.** No upstream JS, animation.css, wave.css, shortcodes, social icon packs, web fonts, photos, avatars, stickers, AI integrations, updater or third-party PHP dependencies are copied or executed.

The visual source file combines only style.css, css/responsive.css and css/dark.css for theme layout/reading styles. All URL assets, imports, animation declarations and keyframe blocks are removed. New plain JavaScript implements navigation-independent color modes, heading directory, progress and image dialog. No upstream effect algorithm is carried over. Synthetic preview images originate in the repository test server. User-configured image URLs require the user's own rights. Unknown upstream effects remain excluded, not relicensed.

Templates specifically map header.php, layouts/imgbox.php, tpl/content-thumbcard.php, tpl/content-single.php and tpl/single-entry-header.php. Source metadata/post view count APIs are not fabricated.

Sakurairo 3.1.0 is a Sakura derivative, but its current full-cover card composition and floating segmented navigation differ from Sakura 3.4.0's alternating image/text layout. This branch preserves those differences rather than duplicating a Sakura port. The ancestor attribution remains in the footer and this notice.
