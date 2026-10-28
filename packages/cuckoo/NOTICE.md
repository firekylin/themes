# Cuckoo — source and license notice

Upstream: https://github.com/bhaoo/Cuckoo
Revision: `d84b8dfe22b3ff76742c5b047ccff846aa9bf8ab`
Attribution: Bhao and upstream contributors.
License of this theme and its adaptation: GPL-3.0-only (not the monorepo root license).

Upstream LICENSE is retained verbatim.

Modified for Firekylin on 2026-10-28: PHP rendering is replaced by Eta and public
Widgets; CSS is filtered/formatted and adapted to semantic markup, keyboard focus,
responsive navigation, local pagination and optional dark colors. Modified files
carry a notice. `source/manifest.json` records the input files and transformations.
The editable CSS and Eta files shipped in this package are the corresponding
source of this adaptation; no minified JavaScript or executable binary is shipped.
For Sass-derived styles the adapted Sass is also included. No build is needed to
install or modify the delivered CSS. GPL ports remain under their stated GPL
version; they have not been relicensed to MIT.

## Third-party resource audit

Only theme-owned selectors from cuckoo.min.css are retained and formatted as editable CSS. MDUI framework/font, KaTeX, Fancybox, Tocbot and all JavaScript are excluded; local CSS provides the card/grid primitives.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
