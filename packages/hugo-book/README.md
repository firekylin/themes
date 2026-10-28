# Hugo Book for Firekylin

Native port of Hugo Book at f221265b113c6e2b93cbdd98b7b63e3503d5a3aa. Requires
Firekylin >=2.16.0. Retains upstream CSS, three-column documentation layout,
fixed scrollable navigation/TOC, nested collapsible menu, mobile drawer and TOC
controls, heading anchors, typography, tables, print rules and 12 light/dark/auto
palette variants. Source and dependency notices are retained; see NOTICE.md.

## Configuration

- homeMode: posts (default) or document. Document mode renders the newest public
  post in full on the first home page; it does not select a private page or guess
  a content identifier. Later pages and filtered lists retain native pagination.
- menuJSON: array of `{label,url,children,collapsed}`. Empty/malformed input uses
  native site navigation. Up to 8 nested levels, 100 siblings per level. Example:
  `[{"label":"Guide","url":"/page/guide.html","collapsed":true,"children":[{"label":"Install","url":"/page/install.html"}]}]`.
  Links accept HTTP(S) or root-relative URLs; labels remain escaped text. This
  explicit tree allows documentation order/sections independently of blog dates.
- colorMode: light/dark/auto, contrast-light/dark/auto,
  catppuccin-light/dark/auto, ayu-light/dark/auto. Default light; auto uses OS color.
- language: HTML language (default en); direction: ltr or rtl.
- showTOC: false to disable (default true); logoUrl: optional safe image URL;
  footerText: optional plain text.
- Per-document native custom field options.fields.bookEditUrl provides a real
  edit-source link. No Git history/date or edit target is fabricated.

Native article/page/attachment, archives, category/tag/author lists, pagination,
search and Waline comments retain Firekylin's visibility and protected-body APIs.
The navigation drawer and section expansion work without JavaScript. JS adds
Escape/focus return, active/ancestor links, scroll restoration, generated TOC,
heading links and explicit code-copy buttons. Clipboard requires a secure context.

## Platform differences and unfinished features

The Hugo filesystem section tree is configured explicitly as menuJSON; this is
not automatic synchronization with Hugo content. Native server search replaces
MiniSearch; there is no static full-text client index. There is no Hugo shortcode
parser, multilingual translation graph, portable source-link resolver, backlink
graph, Git revision metadata, automatic adjacent-section navigation, offline
service worker, Markdown source downloads, diagram/math renderer, terminal player
or arbitrary Hugo template injection. Rendered native HTML remains readable;
Hugo-only shortcodes must be converted when migrating content. Existing CSS for
shortcode HTML is retained but does not implement shortcode parsing.

The TOC/heading anchors require JS; body and navigation remain available without
it. The generated TOC includes native h1–h4 content headings, rather than Hugo's
build-time configurable range. Explicit copy buttons add 24px to code blocks.
Native archive/category links and platform attribution add footer/navigation items.
Theme UI strings are English; language config declares language, not translation.

## Validation

14 Node tests, 12 more with real Firekylin 2.16.0 Widget/comment classes, 7 Python
packaging tests, 16 browser pages at 1280/390px. Additional source/port geometry,
nested menu, mobile controls/Escape/focus, TOC anchors, clipboard text and no-JS
navigation checks. Synthetic records are used; this is not a live database/login
or remote comment service test. Source reference and screenshots documented in
VISUAL-COMPARISON.md. ZIP is tested with the real core ThemeInstaller.

Run pnpm test; Python unittest discovery; FIREKYLIN_CORE_PATH=/path/to/core node
--test test/book.test.js; CHROMIUM_PATH=/usr/bin/chromium pnpm test:browser.
Install hugo-book-0.1.0.zip through Firekylin's theme installer and select Hugo Book.
