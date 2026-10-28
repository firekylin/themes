# Source audit

[Sakura 3.4.0](https://github.com/mashirozx/sakura/tree/9a7a597ac18219bf4202b76c150bec6c16664b7c), commit `9a7a597ac18219bf4202b76c150bec6c16664b7c`. Authors: Mashiro, Spirit, Louie, Fuzzz, upstream contributors; theme descends from Akina. style.css declares GPL v2 or later; complete original GPLv2 LICENSE preserved. Modified 2026-10-28 for Firekylin.

Original style.css supplies the theme's layout/reading styles. URL resources, imports, animation declarations and keyframes are removed. No upstream artwork, avatars, CDN assets, icon/web fonts, character models, vendor JavaScript, PHP libraries or updater are bundled. Native JavaScript controls are separately implemented. Test-server images are synthetic. Configured images must be supplied under the operator's own authorization.

Header/hero mapping follows header.php and layouts/imgbox.php; the article feed follows tpl/content-thumb.php's image/text composition. Article mapping follows tpl/content-single.php. Existing rendered core content is trusted; labels/settings are escaped and image URL schemes constrained. Upstream's hardcoded article CC BY-NC-SA statement is not imposed on user content: the optional contentLicense text is empty by default.

Sakura and Sakurairo share ancestry. The pinned Sakura version uses an 800px column, 55% image side, alternating text/image composition and full-width top bar; Sakurairo 3.1.0 uses an 860px column, overlaid cover cards and segmented navigation. This port does not copy the latter's visual template. Shared platform validation and native reading helpers are reused.
