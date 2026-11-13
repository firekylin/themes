# Attribution and source

Hugo Geekblog by Robert Kaussow, MIT, pinned source:
https://github.com/thegeeklab/hugo-geekblog/tree/a7375a423cc034c351ba875c460b91d82e524c75

The original MIT license is retained in LICENSE. The source/ directory preserves upstream Sass; the port adds mobile and print modules to main.scss and removes the unused GeekblogIcons font-face and legacy WOFF fallbacks (WOFF2 is bundled), plus unused third-party shortcode icon masks; AsciiDoc-only styles are not compiled. res/css/upstream.css is compiled from that source using Dart Sass 1.93.2 (no source map). Native additions are separate in res/css/native.css. Eta templates adapt the upstream baseof, list, single, site-header, site-footer and metadata structure to Firekylin Widgets.

Bundled fonts come unchanged from that pinned upstream: Liberation Sans / Mono (Google Corporation, Red Hat Inc.; SIL OFL 1.1, res/css/fonts/LIBERATION-LICENSE.txt), and Metropolis (Chris Simpson, public domain Unlicense, res/css/fonts/METROPOLIS-UNLICENSE.txt). The Metropolis license is corroborated by https://github.com/dw5/Metropolis/blob/master/UNLICENSE. Font metadata was inspected before packaging. No upstream icon pack, icon font or brand SVG is redistributed, because these assets have separate provenance; native text controls and an optional owner-configured brand image replace them.
