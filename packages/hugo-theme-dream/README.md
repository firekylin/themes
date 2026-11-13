# Dream for Firekylin

Yue Yang’s MIT Dream v3 design is adapted with its original Tailwind/DaisyUI CSS, emerald/forest palettes, rounded shadow cards, optional avatar and flippable About panel. Native CSS columns provide the 4/3/2/1-column masonry-like feed; reading order is down each column, unlike upstream JavaScript masonry. Missing/unsafe covers are omitted rather than using random demo photos. Title and cover links avoid an overlay on the entire card.

The About button flips between articles and escaped configurable About text/navigation cards. Hidden faces are inert, focus follows the visible face, the control supports keyboard activation, and reduced-motion disables rotation. Without JavaScript the article face remains readable and controls are hidden. A persistent light/dark toggle and safe DOM article TOC are included.

Native posts/pages, archive/taxonomy/search, pagination, protected content, comments and attachments are supported. Footer text/author and avatar URL are configurable. The port does not implement arbitrary Hugo About bundles, Zen mode, image processing/zoom, scroll-spy, reading-time estimates, service comments, math/diagram rendering, ads, or feed generation. Default images, icons and service scripts are omitted. No live upstream pixel comparison or remote comment submission is claimed.
