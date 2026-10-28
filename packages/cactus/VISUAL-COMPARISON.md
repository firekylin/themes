# Cactus visual comparison

Original source fixed at `7a6074d830ac5d524582f142ac524c041077aad7`.
Actual Hexo 7.3.0 rendered the unmodified upstream theme using synthetic content;
Chromium captured both original and Firekylin at 1280×900 and 390×900.
See [reproduction instructions](../../validation/cactus/REPRODUCE.md),
[measurements](../../validation/cactus/measurements.json) and the eight
`reference-*` / `port-*` screenshots in that directory.

Reviewed: centered 48rem page; green title links; monospace reading; date/title
lists; About → Writing → Topics → Most recent → Projects ordering; article title
and metadata; footer; mobile stacked dates; desktop article menu and mobile
bottom Menu/TOC/Share/Top actions. The original missing Most recent section and
bottom toolbar in the first local draft were corrected before submission.

The content area is exactly 704px wide at x=288 on desktop and 358px at x=16 on
mobile for both. Article titles start at y=66 in both and wrap to the same number
of lines. Small section spacing and footer differences remain because the port
adds semantic main/navigation, uses system fonts without upstream icon/font
binaries, and supplies different taxonomy/footer text. Code markup is rendered
by Firekylin rather than Hexo's highlighter; native details controls replace
jQuery toggle menus, with text labels instead of icon font glyphs.

The browser test verifies all eight core page types at both widths; it exercises
mobile navigation, article TOC, no-JS navigation, long titles and all four color
schemes. Core content/metadata escaping, comment disable/login, password forms,
query-preserving pagination and unsafe configuration URLs have separate tests.
No claim of pixel identity, database visibility-query coverage or successful
remote comment authentication is made.
