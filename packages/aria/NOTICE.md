# Aria — source and license notice

Upstream: https://github.com/Siphils/Typecho-Theme-Aria
Revision: `d67dc49f3cccc236e2dca681944b75528d4a9750`
Attribution: Siphils and upstream contributors.
License of this theme and its adaptation: GPL-2.0-only (not the monorepo root license).

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

Only theme card/header/navigation/footer selectors are retained. Embedded normalize, progress-bar, syntax-highlighting and plugin selectors are excluded. The original source banner remains.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
