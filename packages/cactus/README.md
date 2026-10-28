# Cactus for Firekylin

Independent draft port of the Hexo Cactus theme. No merge or deployment.

Fixed source: probberechts/hexo-theme-cactus at
7a6074d830ac5d524582f142ac524c041077aad7 (3,513 stars at 2026-10-28 audit).
The original MIT LICENSE, including all three copyright holders, is retained.

The adapter uses Cactus's original Stylus sources, compiled for dark, light,
classic and white. Eta templates adapt the actual source index layout (about,
date/title writing list, optional topics, projects), article typography, archive
list and header/footer. It is not shared recolored Typecho markup. Firekylin
Widgets supply public lists, taxonomy, search, archives and article content;
Firekylin supplies native comment rendering and protected-content forms.

Configuration: colorscheme, pageWidth, direction, logoUrl, postCount,
tagsOverview, projects/socialLinks JSON, showUpdated, showAllPosts, footerText. Navigation uses
site navigation. JS provides mobile navigation, heading links and code-copy
controls. Native details keeps article navigation available without JavaScript;
mobile site navigation remains expanded without JavaScript.

Differences and incomplete work:

- No Meslo/Vazir or Font Awesome binaries, upstream logo, screenshots or vendor
  JavaScript are redistributed. System monospace fonts and text controls replace
  them. Logo may be supplied by the site owner.
- Unused highlight schemes and their image assets are omitted; source subset
  retains the three schemes used by the four shipped palettes.
- The bottom mobile action bar is preserved with native Menu/TOC panels and
  share/copy-link actions; desktop controls use a native details menu.
- Gallery/justified-gallery, social icon rendering, Disqus/Utterances, Gravatar,
  analytics, MathJax, updated-date sorting, and local search index
  have not been ported. Search uses Firekylin's server search.
- Article taxonomy and previous/next links use supplied core relations.
  Translated interface labels are not implemented; site content supports Unicode.
- A real pinned Hexo reference was generated and compared on desktop/mobile;
  see VISUAL-COMPARISON.md for screenshots, measured geometry and differences.
- CI exercises core rendering, installation and Chromium behavior. Live database
  visibility queries and real remote comment login are not covered.

Local checks:

```
node scripts/build-cactus-css.js
FIREKYLIN_CORE_PATH=/workspace/firekylin node --test test/cactus.test.js
FIREKYLIN_CORE_PATH=/workspace/firekylin node scripts/check-cactus-browser.js
```

The second and third commands use actual core Widget/comment classes supplied
with synthetic public data. They do not test database filtering. ZIP built with
the repository builder was installed through core ThemeInstaller 2.16.0.

The generated CSS is reproducible with the exact dependencies in pnpm-lock.yaml.
The build excludes `_fonts` to avoid bundling upstream font binaries. Preserve
this source subset and LICENSE in any eventual distribution.
