# Joe — source and license notice

Upstream: https://github.com/HaoOuBa/Joe
Revision: `a00c73ff85a6b7eb957ba4b9977004b7e16a7480`
Attribution: Joe and upstream contributors.
License of this theme and its adaptation: ISC (not the monorepo root license).

The upstream package.json explicitly declares ISC and author Joe but has no root LICENSE. The declaration is preserved in source/upstream-package.json. LICENSE supplies the ISC text from SPDX with the declared author attribution; no upstream copyright year is invented.

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

Only theme-owned Joe CSS files are selected; Swiper, WOW, Normalize, Qmsg, Prism, Font Awesome, Fancybox, APlayer, avatars and thumbnails are excluded. No Typecho API, analytics or update-check code is executed.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
