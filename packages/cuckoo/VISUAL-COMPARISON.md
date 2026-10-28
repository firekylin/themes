# Cuckoo source comparison

Pinned source `d84b8dfe22b3ff76742c5b047ccff846aa9bf8ab`.
The [original screenshot](https://github.com/bhaoo/Cuckoo/blob/d84b8dfe22b3ff76742c5b047ccff846aa9bf8ab/screenshot.jpg)
was inspected alongside `index.php`, `post.php` and `includes/sidebar.php`.
It demonstrates background imagery, image-title overlays and a cover/avatar
profile card. The port replaces the earlier image-above-text card accordingly.

Desktop (1280px) and mobile (390px) configured renders are inspected. Browser tests
assert title bounds inside the image and sidebar collapse. Unit tests cover
background/avatar/default-cover inputs, unsafe URLs and normal-card selection;
existing route/search/protected-body tests remain. The article heading is separate
from body content and overlays its cover. Screenshots use new synthetic SVG art.

This is manual/source-guided comparison, not a running Typecho site or pixel diff.
Daily cards, original artwork, MDUI runtime/dialogs, random image API, Typecho views,
reading-time counters and plugin-specific features are not implemented. No fake
statistics are shown. The full-page capture records a fixed background only in its
initial viewport; during normal scrolling the background remains fixed.
