# icefox — source and license notice

Upstream: https://github.com/xiaopanglian/icefox
Revision: `797139b30e7b2f126d6bc5e5883c7f2b23cbcd47`
Attribution: 小胖脸 and upstream contributors.
License of this theme and its adaptation: GPL-3.0-only (not the monorepo root license).

The upstream README explicitly declares GPL-3.0 but its linked LICENSE is absent. The declaration and author section are retained in source/upstream-license-declaration.md. LICENSE supplies the unmodified GPL v3 text; this port conservatively declares GPL-3.0-only.

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

Only icefox.css is retained, with font faces and every URL declaration removed. Bulma, Alpine.js, Fancybox, DingTalk/HarmonyOS fonts, SVG icons, music and demo images are not bundled.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
