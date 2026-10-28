# Source and resource audit

Stack 4.0.3 by Jimmy Cai, repository https://github.com/CaiJimmy/hugo-theme-stack,
fixed commit 3e123a30b79b5d52a3a8e88a9dd678fcfd28e418, retrieved 2026-10-28.
The upstream theme.toml explicitly declares GPL-3.0-only. Original full LICENSE
is retained. Eta templates and adapter JS/CSS are modifications dated 2026-10-28,
distributed under GPL-3.0-only. Original SCSS sources are in source/scss; compile
with Dart Sass 1.106.1:

```
sass --no-source-map source/scss/style.scss res/css/upstream.css
```

The unused Disqus/Artalk SCSS is excluded. No upstream demo photographs, screenshot,
fonts, vendor JS or executable packages are redistributed. Avatar and landscape in
verification screenshots are locally generated synthetic SVGs. The adapter uses
system fonts; optional profile/cover URLs are supplied by the site owner. Comments
use the core Waline renderer and its configured remote resource URL.

Third-party components incorporated by the upstream and retained:

- Normalize CSS 8.0.1 — Nicolas Gallagher/Jonathan Neal, MIT. Original notice and
  full license in source/licenses/normalize-LICENSE.md, from tag 8.0.1.
- Hamburgers — Jonathan Suh, MIT. Original header and full license retained,
  from jonsuh/hamburgers v1.2.1.
- Tabler SVG icons — Paweł Kuna, MIT. Only icons listed in source/manifest.json
  copied from the pinned Stack source; full Tabler license from v3.34.1 retained.
- Splash/Chroma highlight styles referenced by original SCSS — Alexander F.
  Rødseth, BSD-3-Clause. Full source license retained in source/licenses.

These license texts were fetched from the named original repositories, not
fabricated. The Stack authorship/source chain remains separate from these notices.
No PhotoSwipe, Mermaid, KaTeX, analytics, remote fonts or client search libraries
are bundled. Original article-content license defaults are not applied to user
posts: code GPL does not claim that site authors license their content under GPL.
