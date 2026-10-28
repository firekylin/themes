# Jasmine — source and license notice

Upstream: https://github.com/liaocp666/Jasmine
Revision: `d8744a44a53af88fc6be2daf84a30e595b605870`
Attribution: liaocp666 and upstream contributors.
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

Only the theme-owned main.css is retained. Bootstrap, Tabler icons, MiSans fonts and highlight assets are excluded; the layout uses local CSS primitives instead.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
