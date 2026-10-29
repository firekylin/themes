# Story for Firekylin

A port of Story's tiled lettermark, 300px bordered square story grid, lower-right date/title, faint cover images, 728px reading column and numbered 1/2/3 controls. Desktop breakpoints retain the original 4/3/2-column layout and single-column mobile feed. Attribution remains visible.

Requires Firekylin >=2.16.0. Install the theme ZIP and select Story. logoText, backgroundUrl, iconNav and showToc are native theme settings. Covers use the native featured image. Pages navigation uses the site's navigation setting. Search and pagination are server-rendered. Posts/pages preserve protected content forms. Native comments respect the content/site permissions, inside a disclosure. Native JS adds h3/h4 anchors, desktop TOC, active section highlighting and keyboard image enlargement; navigation/search/comments remain usable without JS.

## Differences

Original Typecho PHP and vendor JavaScript are not run or bundled. System fonts replace Josefin/PT Sans downloads; Unicode symbols replace Twemoji. Navigation uses semantic details/summary rather than jQuery fades; it wraps long titles. No Prism syntax highlighting or exact zoom animation. Typecho custom field names, HTML-comment TOC directives, custom links plugin and alternate IndexII template are not implemented. Use native featured images and theme-level TOC setting. No fake counts, likes or plugin APIs. Comments use Firekylin's configured provider, not Typecho comment storage. Typography and native comment UI differ.

## License

Custom noncommercial permission, reproduced verbatim in LICENSE; not MIT. See NOTICE.md for provenance and excluded assets.

## Verification

See verification/story and VISUAL-COMPARISON.md. Validation status must be read from the recorded report; do not infer full parity from this port.
