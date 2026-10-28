# Bubble — source and license notice

Upstream: https://github.com/trinitrotofu/Bubble
Revision: `e5ac03db4176914736939b56f6cf8679ce4303b9`
Attribution: trinitrotofu and upstream contributors.
License of this theme and its adaptation: MIT (not the monorepo root license).

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

Upstream main.css is a modified Argon Design System stylesheet containing Bootstrap styles. Their MIT license texts are retained under licenses/ (Creative Tim and Bootstrap authors). No Argon fonts/icons/images or Bootstrap JavaScript are bundled.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
