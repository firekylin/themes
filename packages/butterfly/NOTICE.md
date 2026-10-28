# Butterfly — source and license notice

Upstream: https://github.com/wehaox/Typecho-Butterfly
Revision: `bb5fb5922a4b2d74a7829005a2a507027fe08ffa`
Attribution: wehaox / JerryC and upstream contributors.
License of this theme and its adaptation: Apache-2.0 (not the monorepo root license).

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

The Typecho port derives from JerryC’s hexo-theme-butterfly, which also declares Apache-2.0. Its license is retained under licenses/. Theme selectors are extracted from index.css and css/style.css; embedded reset, syntax highlighting and plugin styling are not selected. Both wehaox and JerryC are credited. No upstream NOTICE file was present in the Typecho checkout.

No original screenshots, photography, avatars, emoji packs, font files, third-party
client scripts or remote resource references in CSS are redistributed. Screenshots
are newly rendered from synthetic data. Native comments may load Waline resources
through Firekylin's own renderer and site configuration; these are not theme assets.
