# Sources and licenses

Aquila upstream: https://github.com/imranhsayed/aquila at `9989422c53ade3198608815fd40dae1f4a8a282d`, version 1.0. `style.css` expressly licenses the theme under GPL v2 or later. That declaration is retained in licenses/UPSTREAM-STYLE.txt and the full GPL v2 text in LICENSE.

`res/css/upstream.css` retains the original Bootstrap 4.5.0 and Aquila main.css. Asset URLs and the original font declarations/source-map comments are removed; local fonts use fonts.css. Bootstrap MIT and embedded normalize.css v8.0.0 MIT notices/full texts are in licenses. Normalize text fetched from https://github.com/necolas/normalize.css/blob/8.0.0/LICENSE.md.

Six Lato v16 latin WOFF2 files are copied unchanged from upstream assets/src/library/fonts/lato-v16-latin. The matching upstream regular TTF name table says: Copyright (c) 2010-2011 by tyPoland Lukasz Dziedzic with Reserved Font Name Lato; licensed under SIL OFL 1.1. licenses/Lato-OFL.txt retains that copyright and OFL 1.1 text (obtained from google/fonts/ofl/lato/OFL.txt). Fonts are not renamed or modified.

Eta layouts translate header/navigation, blog entry components, front carousel, detail/sidebar and footer structures. Browser controls are reimplemented; shared route/testing adapters come from this migration work. Modified 2026-10-28. No upstream photos, social SVGs, external placeholder image, jQuery/Slick/Bootstrap JS, editor bundles, analytics or course artwork is bundled. Screenshots use synthetic media; they are verification artifacts. No third-party authorization beyond the cited licenses is asserted.
