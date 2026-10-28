# Single source comparison

Pinned revision: `9665079d39b21640a0121786769ce2c3de303155`.
[Upstream screenshot](https://github.com/Dreamer-Paul/Single/blob/9665079d39b21640a0121786769ce2c3de303155/screenshot.png)
was inspected but is deliberately blurred promotional artwork; it is insufficient
for pixel comparisons. Source `header.php`, `index.php`, `post.php` and
`static/single.css` establish centered home title, fixed light header, expandable
menu, title/excerpt/date feed, unboxed article content and optional author bio.

Desktop (1280px) and mobile (390px) renders were inspected. Tests cover the native
menu, persistent night switch, feed element order, safe background and escaped
bio, plus existing route/search/pagination/protected content checks. The first
mobile run found a stale fixed-width home intro; it was corrected before delivery.

No live Typecho instance or visual pixel-diff is claimed. Original Kico/icon
runtimes, automatic night schedule, copy notice, admin-edit links and arbitrary
social HTML are not ported. Reading/navigation retain no-JS fallbacks.
