# Fixed upstream comparison

Source: alex-shpak/hugo-book at f221265b113c6e2b93cbdd98b7b63e3503d5a3aa,
built with Hugo 0.169.0 extended. Synthetic Engineering Handbook content is in
test/fixtures/book-hugo. Original defaults, light palette, menu and TOC enabled.
Chromium comparison at 1280×900 and 390×900, 2026-10-28.

The desktop and mobile screenshots were inspected. Browser checks assert equal
main-column x/width and heading x/y between the built reference and native port.
The original 256px fixed side panels, responsive 56rem breakpoint, text wrapping,
heading typography and table geometry are retained. No entire-page pixel identity
is claimed. The port adds Archives/Categories menu items and native attribution.
The explicit accessible Copy button adds 24px to code-block height, shifting the
table and blockquote below it. TOC indentation is generated from native headings
rather than Hugo's prebuilt nested list.

- [Port desktop](screenshot.png) / [source desktop](preview/upstream-desktop.png)
- [Port mobile](preview/mobile.png) / [source mobile](preview/upstream-mobile.png)
- [Native article desktop](preview/post-desktop.png) / [mobile](preview/post-mobile.png)

Interactive verification covers nested section expansion, mobile drawer and TOC,
Escape and focus return, TOC links, exact copied code, and CSS-only navigation with
JavaScript disabled. General checks cover 8 page types at each viewport, long
unbroken titles, dark palette, search encoding and absent resource/console errors.
This uses actual core rendering classes with synthetic rows, not a live database.
