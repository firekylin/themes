# Aria visual and behavior comparison

Pinned source: `d67dc49f3cccc236e2dca681944b75528d4a9750`.
[Original multi-device screenshot](https://github.com/Siphils/Typecho-Theme-Aria/blob/d67dc49f3cccc236e2dca681944b75528d4a9750/screenshot.png)
was directly inspected alongside `header.php`, `index.php`, `post.php` and CSS.
It shows image-led full-width hero, avatar navigation and a centered card column.
The port uses synthetic SVG instead of redistributing the screenshot's artwork.

| Source feature | Desktop and mobile verification |
|---|---|
| Home vs detail image hero | 80/50vh and 70/40vh measured at 1280/390px |
| Title, category/date, cover sequence | bounding boxes assert the original order |
| Article card metadata | real category links and comment_num tests, absent data hidden |
| Post header/body/update/tags | separate source-derived structure, rendered screenshots |
| Background/avatar/default cover | safe configuration URLs and fallback tests |
| Search and navigation | existing form/pagination checks retained; normal links replace PJAX |

`pnpm test:browser` uploads `aria-source-layout-*` and `aria-source-post-*` screenshots.
The comparison is manual/source-guided, not pixel equality or a live Typecho run.
Source fonts, icon assets, animation libraries, view/like APIs, PJAX and TOC remain
unported; the original title/date/cover order was already correct and is retained.
Core homepage category availability differs from Typecho; see README.md.
