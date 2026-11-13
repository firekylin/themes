# Upstream attribution and asset audit

Airspace Hugo by Themefisher: https://github.com/themefisher/airspace-hugo
Pinned revision: afb922683c1b8f7a4f6425ca83fbbd8655694532 (MIT).
The upstream MIT text is preserved in LICENSE.

The native Eta templates and CSS adapt layouts/_default/{list,single}.html,
partials/{header,page-title,blog-sidebar,footer}.html, partials/widgets/*,
assets/scss/{style,_common,_typography}.scss and templates/{_blog,_blog-sidebar,
_single-post,_navigation,_footer}.scss at that pin. Colors and sizing follow
exampleSite/hugo.toml, including #655e7a, 15px body, 40px banner heading,
70px wrapper, 55px article gaps, 65px widget gaps, 100px latest thumbnails.

Third-party audit: upstream bundles Bootstrap, jQuery, Slick, Shuffle,
Font Awesome, Webfont Loader and Google Maps integration. None is distributed
or executed by this port. No upstream demo photographs, logos, screenshots,
icon fonts or remote Google Fonts are bundled. The CSS uses a system sans-serif
fallback in place of externally hosted Roboto. Native text metadata replaces
font icons. The default banner is a solid dark violet instead of an unlicensed
demo photograph. Featured images come only from the user's post metadata.
Any geometric fixture image in verification screenshots is original test art,
created by the test runner, not an upstream demo asset.
