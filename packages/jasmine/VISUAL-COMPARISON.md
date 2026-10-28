# Jasmine component and layout comparison

Pinned upstream: `d8744a44a53af88fc6be2daf84a30e595b605870`.
The repository screenshot is only a logo. For a usable reference, the unmodified
`theme/template-parts/index-default.php` and `post-default.php` were executed in
PHP 8.3 WASM with synthetic archive methods, then rendered in Chromium with the
upstream Bootstrap and main CSS at 1280 and 390px. References are in
`preview/upstream-components-{1280,390}.png`. No original media/font was used.

This is **component rendering**, not a complete Typecho server: header/sidebar
composition was checked against `left.php`, `navbar.php`, `right.php` source.
The fixture stubs editing/TOC includes and backend methods. It does not validate
upstream PHP plugins, database access or authentication. Original source revision
and file paths above make the comparison inputs explicit.

The port preserves title/excerpt/category/date order, right desktop thumbnail,
three-column desktop vs single-column mobile layout, article typography and
adjacent-post grouping. Its TOC uses native disclosure and local heading anchors.
Specific browser tests exercise the rail breakpoint, TOC/anchor and persisted
color mode. General tests exercise eight routes, long titles and search.

Known differences: system fonts and text navigation replace MiSans/Tabler; recent
posts/tags replace unavailable popularity/comment widgets; moment post types and
PJAX remain unported. Port tests use synthetic Firekylin data. The reference
component renders are manually inspected, not a pixel-equivalence test.
