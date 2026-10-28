# Source and resource audit

Kratos 4.3.4 by Seaton Jiang, pinned at [6be10d3a97c125f612e0b7ab9f29e9b72828283a](https://github.com/seatonjiang/kratos/tree/6be10d3a97c125f612e0b7ab9f29e9b72828283a). Original GPL-3.0 license retained in LICENSE. Modified 2026-10-28 for Firekylin.

res/css/upstream.css contains upstream style.css and Bootstrap 4.5.0 CSS. Bootstrap's MIT license is retained in licenses/Bootstrap-MIT.txt. URL resources and imports are removed; no upstream image, icon font, JavaScript vendor, PHP library, remote analytics, advertising or updater is included. Synthetic preview images belong to the test server, not the installable theme. Operators supply their own authorized imagery.

The banner, grid, article thumbnail/text/meta regions and profile sidebar follow header.php, index.php, pages/page-content.php, single.php and the pinned screenshot.png. Templates use actual Firekylin Widgets and native comment rendering. Labels and settings are escaped; article content is trusted core-rendered HTML. Carousel entries are the first three actual archive rows; comments use actual comment_num. No invented view/like counters.

Kratos-PJAX is a related fork and must be separately compared before accepting it as another unique theme. This PR contains only Kratos 4.3.4.
