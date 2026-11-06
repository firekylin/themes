# Classic Moon for Firekylin

A port of Taylan Tatlı’s classic Jekyll Moon. The upstream now points to a separate Moonrise redesign; this package intentionally preserves classic Moon. Original MIT license, source revision and stylesheet sources are included. See NOTICE.md for asset provenance and font hashes.

Preserves the original coral-red desktop background, rounded white 850px panel and shadow, Fira Sans typography, Inconsolata code, centered headings, excerpt list and bordered read-more buttons. The original mobile breakpoint removes the colored surround and shadow. Uses the upstream post-list layout for the blog homepage rather than its personal profile landing screen. Original Sass is included; rebuild res/source/firekylin.scss with Dart Sass --no-source-map to res/css/moon.css.

Native Firekylin posts, pages, search, taxonomy, archives, pagination, attachments and comments are supported. Footer text and author use theme settings. Text navigation remains visible without JavaScript, replacing the original icon/dropdown plugin. Featured images are displayed as native inline covers, not background images. No demo logo, photos or favicon are distributed. Optional projects collection, social icons, background-image configuration, animations, lightbox, MathJax, Disqus and Jekyll-specific front matter are not implemented. Remote comment login/submission remains untested.

Actual ZIP installation on pinned Firekylin2.17.1 SQLite is checked at1440px and390px across18routes, including native media, tables, quotation contrast, code overflow, private/draft exclusion, comments and no-JS navigation/search. Source CSS/templates are the visual reference; no live upstream pixel comparison is claimed.
