# Design comparison

Reference: upstream revision `3f00947b65e6aa3d55388878d2872c2497ed1d93`, especially `layouts/partials/{nav,style,date-and-tags,footer}.html`, `layouts/index.html`, `layouts/_default/{list,terms}.html` and Bootstrap 4.3.1 CSS.

Preserved: 700px centered container; thin dark navigation border; bold centered icon links; transparent padded home jumbotron; blue 125% title links; calendar/tag SVG metadata; outlined dark tag/count buttons; system font stack; padded code blocks; bottom-centered muted footer. Original CSS is retained locally.

Adaptations: Firekylin’s home adds a native post list below the hero; taxonomy and pagination headings replace the hero outside home page one. Native search, categories, attachments, comment/protection UI and footer attribution are added. Overflow fixes contain long code, tables and embedded media. Mobile navigation wraps rather than requiring a script.

Validation screenshots must come from the actual installed native theme at 1440px and 390px. The live harness records measured 700px container width, navigation border, blue links, route/privacy/comment checks and no-JavaScript behavior. No upstream live pixel comparison or remote comment submission is claimed.
