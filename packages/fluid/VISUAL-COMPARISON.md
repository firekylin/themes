# Fluid original/port visual checks

The unmodified upstream commit `bcfd8bfe79f0818306cec090237c330df5534b73`
was rendered with real Hexo 7.3.0. Both engines received synthetic article text
and the same synthetic banner/thumbnail. Original and port home/post were
captured and inspected at 1280×900 and 390×900. See
[reproduction](../../validation/fluid/REPRODUCE.md) and
[measurements](../../validation/fluid/measurements.json).

After comparison, the mobile banner cap (1:1 width/height), article width and
nested article padding were corrected. Exact shared geometry:

| Element | Desktop original / port | Mobile original / port |
|---|---|---|
| Home banner height | 900px / 900px | 390px / 390px |
| Article banner height | 630px / 630px | 390px / 390px |
| Home board x / y / width | 85 / 868 / 1110px | 0 / 374 / 390px |
| First card x / y / width / height | 192.5 / 916 / 895 / 160px | 15 / 422 / 360 / 344.8px |
| Article board x / y / width | 243.33 / 598 / 793.33px | 0 / 374 / 390px |

The full board heights differ because core fixture pagination is present and
article metadata/attribution/previous-next settings differ. Original hero has
word-count/read-time rows; port shows author/date, so its title is about 18px
lower. These optional statistics are not fabricated. Copy-code uses a native
button, sidebar TOC uses native heading links, and mobile navigation uses a text
grid instead of an icon overlay. Missing external icon fonts in the local original
reference are documented; no claim is made of pixel equality or all upstream
plugin parity. Header/card/reading structure is derived from original Fluid
markup and CSS, not another theme with changed colors.

Chromium behavior checks cover 8 core page types × 2 widths, long titles, menu,
color-mode persistence, TOC anchor navigation, clipboard copy and no-JS navigation.
Actual core classes exercise escaping, disabled/required-login comments,
protected forms and filter-preserving pagination. No database or real remote
comment-authentication flow is claimed.
