# TimePlus for Firekylin

Full-bleed photographic album theme based on TimePlus / Time / HTML5 UP Multiverse. Install the theme ZIP on Firekylin 2.17.1 or later and select TimePlus.

Uses each post's native featured image for the gallery cover, and its rendered body images for the album viewer. Set a featured image in Firekylin and insert normal Markdown images into the post; no Typecho custom field is required. The viewer fetches the native article page on demand and observes its password/access response. Photos can be browsed with previous/next buttons and arrow keys; Escape closes the viewer. Article links remain available inside the viewer and work directly without JavaScript. Posts without images remain readable as title cards. Native archive, search, taxonomy, comments and protected-content policy are retained.

The fixed desktop bottom bar moves to the top on mobile. Category/navigation menu, about panel and browser fullscreen controls use native browser APIs. aboutText is a plain-text theme setting. Upstream's image layout breakpoints and caption gradient are retained. Photography is not bundled; screenshots use our own simple SVG test fixtures.

Differences: no remote image transformations, Typecho img/device/location fields, analytics, automatic update checker, infinite loading or external icon font. Pagination uses Firekylin routes. Multi-image viewing uses native dialog controls instead of upstream Poptrox/swipe/hover dots. Detail pages are new native reading views because upstream post.php references header/sidebar/footer files absent from the pinned revision. Fullscreen depends on browser support. External comment-provider login/submission was not exercised. See NOTICE.md and VISUAL-COMPARISON.md.
