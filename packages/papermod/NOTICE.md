# Source and redistribution audit

PaperMod by nanxiaobei and adityatelange, https://github.com/adityatelange/hugo-PaperMod,
commit 118119693d8b5ac211b939775678310973bcb232, retrieved 2026-10-28.
The complete upstream MIT LICENSE is retained without rewriting its authorship.
`source/manifest.json` lists the original CSS files concatenated, unchanged, into
`res/css/upstream.css`. Eta markup translates list, single, archive, terms,
header/footer, home-info and profile structures. The header theme icons are from
upstream header.html. Firekylin adaptation code and changes are MIT.

No upstream demo photos, screenshots, fonts, third-party scripts or minified vendor
bundles are distributed. Screenshots in preview/ and screenshot.png were rendered
with synthetic text, locally on the pinned source/port; they contain no borrowed
artwork. System font stack and inline theme-owned SVG icons only. Fuse.js, highlight.js,
analytics, remote comments and external social integrations are not bundled.
Native comments are delegated to Firekylin's configured Waline renderer and may
load the core-configured Waline resource URL. User profile/cover URLs load only when
configured; their rights remain the site owner's responsibility.
