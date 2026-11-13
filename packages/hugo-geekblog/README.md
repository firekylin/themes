# Hugo Geekblog for Firekylin

Native Eta/Widget migration of [Hugo Geekblog](https://github.com/thegeeklab/hugo-geekblog), pinned at a7375a423cc034c351ba875c460b91d82e524c75. MIT source and separate font licenses are retained; see NOTICE.md.

## Design and behavior

Preserves the original centered blue masthead, dark navy outlined navigation, 60rem content container, wide dashed-separated summaries, metadata beneath excerpts, full-width reading layout, optional article feature image, dark navy footer, Liberation/Metropolis typography and original light/dark palettes. Native light/dark/automatic control persists locally and tolerates blocked storage. The mobile navigation uses native details/summary and works without JavaScript. OS dark mode also works without JavaScript.

Firekylin >=2.17.1: index and taxonomy results, full articles, pages, grouped archives, category/tag indexes, GET search with preserved pagination filters, attachment image/audio/video/download and native comments. Body rendering uses archive.content(), preserving core password forms; excerpts and labels are escaped. Core Widget queries own draft/private filtering. All assets and fonts are local, and the theme has no analytics or remote JavaScript. Owner content and configured images may still reference remote resources. Comments use the site's configured provider only when core allows them.

Settings: brandImage (HTTP(S) or same-site path; blank shows text identity) and footerText. Site title, description, navigation and article featuredImage come from native options. Long code, tables and media stay within the content column. Keyboard focus, skip link, semantic landmarks and reduced motion are supported.

## Explicit migration differences

This is not a Hugo runtime: Hugo shortcodes, build-time image processing, Mermaid/KaTeX generation, multilingual content routing, Hugo RSS/Atom output, JSON client search, edit-on-Git links, microformats and source-repository metadata are not reproduced. Use Firekylin-rendered article content and native server-side search. Hugo's tag-derived menu is replaced with native category/tag directories and configured site navigation. Upstream third-party icons/brand are not copied; text controls replace them. Featured images use the original wide layout with CSS cropping rather than Hugo's generated derivative. Upstream Disqus/other remote integrations are replaced by native comments. No upstream demo screenshot is used as installation evidence.

## Verification

node --test test/hugo-geekblog.test.js
FIREKYLIN_CORE_PATH=/path/to/core node --test test/hugo-geekblog.test.js
FIREKYLIN_CHECKOUT=/path/to/core PLAYWRIGHT_MODULE=/path/to/playwright-core CHROMIUM_PATH=/path/to/chrome node verification/hugo-geekblog/live.cjs

The live harness creates a disposable SQLite site, builds and installs the marketplace ZIP with ThemeInstaller, seeds public/private/draft and attachment fixtures, and tests native routes at desktop/mobile sizes, no-JS search/navigation, palette persistence, long media containment and comment gating. Integration CI pins official core 6b7c95cf43e0c6af70c71ac1e537d75a982e407e. The report and screenshots are generated evidence, not upstream screenshots. Remote comment-provider submission is outside this test.
