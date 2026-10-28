# VOID — source and license notice

Upstream: https://github.com/AlanDecode/Typecho-Theme-VOID
Revision: `a70bbc9a173b7f80ebf6dcd386e4286a8a7fbcb2`
Attribution: AlanDecode and upstream contributors.
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

Only the theme-owned variable/index/header/footer Sass parts are compiled. The embedded Monoton font is removed before compilation. Normalize, Yue, Prism, icon fonts and all vendor libraries are excluded. The adapted Sass source is included.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
