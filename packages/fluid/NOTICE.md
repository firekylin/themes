Fluid for Firekylin — modified 2026-10-28

Source: https://github.com/fluid-dev/hexo-theme-fluid
Fixed commit: bcfd8bfe79f0818306cec090237c330df5534b73
Original theme version: 1.9.9. Snapshot: 8,167 stars, 2026-10-28.

The original LICENSE explicitly grants GPL version 3 or any later version and
identifies Copyright (C) 2022 Fluid-dev. It is preserved unchanged. The upstream
package.json uses the nonstandard spelling GPL-V3; this port uses the explicit
LICENSE grant GPL-3.0-or-later, not an invented permission.

Original Stylus source (excluding Gitalk's embedded-font stylesheet) is included.
Compiled CSS and Eta markup adapt the original banner, Bootstrap grid, article
cards, reading panel and responsive geometry. New JavaScript uses native DOM
APIs in place of the original plugin stack. Corresponding source and build
script are distributed with the port; the license applies to modifications.

Bundled third-party styles:
- Bootstrap 4.6.1 CSS, MIT, BOOTSTRAP-LICENSE retained.
- github-markdown-css 4.0.0, MIT, GITHUB-MARKDOWN-LICENSE retained.
Exact npm dependencies are locked and the script copies their unmodified CSS.
Only CSS is shipped, not Bootstrap/jQuery/Popper runtime JavaScript.

Excluded: upstream img directory, external icon fonts, Gitalk embedded font,
all upstream/vendor JavaScript and CDN integrations. No inferred permission is
claimed for those images/fonts. Validation preview images are synthetic SVG
geometry authored for this comparison and contain no upstream photographs.
The empty upstream _pages/_tag/tag.styl placeholder receives a comment because
current core ZIP inspection rejects JSZip zero-byte entries. Styling is unchanged.
