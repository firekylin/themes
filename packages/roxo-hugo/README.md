# Roxo Hugo for Firekylin

Roxo's current Sitepins Tailwind blog design: original generated palette and typography CSS, Josefin Sans body/Montserrat headings, centered uppercase blog heading, two-column image cards, pale overlaid date/title/summary panels, expanding read-more on hover/focus, and mint footer. Local OFL fonts and original Tailwind CSS input are included. Cards without an image get a stable text panel; protected images are completely omitted. Keyboard focus reveals read-more, title links remain available, and touch devices show it directly.

Native posts/pages, categories/tags/archives/search, pagination, comments and attachments supported. Optional safe logo and footer text/author configurable. Blog replaces the agency landing page. Related posts, Hugo TOC/shortcodes, portfolio/services/team/contact/CTA sections, multilingual switcher, social sharing, icon sets and external analytics/services are omitted. Footer menus use native blog destinations; no demo assets included. Header remains visible and wraps without JavaScript.

StaticMania's original repository now redirects to Sitepins. This port pins the new Tailwind version; it is distinct from the Bootstrap Portio design. Original StaticMania and current Sitepins MIT notices, Tailwind/typography MIT and font OFL are retained.

upstream.css is compiled from retained generated-theme/base/components/navigation/buttons CSS using Tailwind4.1.16 and typography0.5.19. Unused Hugo-module imports and forms/grid plugins are omitted; native integration uses CSS grid. No dependency installation is required to use the ZIP.

Verified actual ZIP with 27 routes at1440/700/390, grid/overlay keyboard behavior, DOM containment, rich text/media, no-JS search/navigation and actual protected body/image HTML/network exclusion. Source and screenshots inspected; no remote comments submission or exact live-demo pixel comparison claim.

Image cards use intrinsic grid rows so long titles grow the panel/card instead of being clipped. Regression coverage includes a192-character CJK title, date, summary and focused read-more at1440/700/390px.
