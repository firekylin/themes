# Material Design for Firekylin

Port of pdevty’s Hugo Material-Design, using its original Materialize0.97.0 stylesheet and custom CSS. Retains three-column desktop / one-column mobile cards, teal links, broad banner, shadowed article panels and dark footer. Native text navigation replaces the original plugin-driven side drawer. Full license/provenance details are in NOTICE.md.

Supports posts/pages, attachments, archives, taxonomies, search, pagination, protected content and native comments. Header background image is optional and accepts HTTP(S) or root-relative URLs. With no image, a plain dark background is shown; no demo photos or social icons are copied. Footer text and author are configurable. Parallax motion, social icon links, Disqus, highlight.js and Hugo configuration/shortcodes are not implemented; no jQuery or Materialize JavaScript is required. Font family remains Roboto, using a current locally bundled OFL binary instead of the old upstream font revision.

Actual ZIP installation on pinned Firekylin2.17.1 SQLite covers18desktop/mobile routes, private/draft exclusion, comments, attachments, media sizing, code/tables/lists, no-JS search/navigation, card grid, banner, local font and footer settings. Screenshots are compared with upstream templates/CSS, not a live pixel-diff baseline. Remote comment login/submission is untested.
