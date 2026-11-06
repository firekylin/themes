# Grid Side for Firekylin

Source https://github.com/chipsenkbeil/grid-side; pinned revision and original author in NOTICE.md. Includes theme/Materialize MIT licenses, Roboto Apache 2.0 license and original CSS sources.

Ports the actual blog list and single article layouts: blue-gray 70px navigation rail, three/two/one-column cards with optional featured images, teal read-more buttons and white reading panel. Original Materialize and theme CSS retained. Native flex rows replace Masonry balancing/infinite-scroll; explicit pagination is keyboard-accessible. Text navigation replaces icon hover menus and wraps above content on phones. Optional native featuredImage accepts http(s) or same-site absolute paths. The portfolio-cell/parallax homepage, galleries/projects, modal search, animation/lightbox and Hugo shortcode features are omitted. This is the blog section adaptation, not the portfolio homepage.

Supports Firekylin 2.17.1+ posts/pages/attachments, archive/taxonomy/search/pagination, configured navigation, authorName/footerText and gated comments. Remote comment authentication/submission is not tested. This is a light theme. No demo imagery, external scripts or font services bundled. Unmodified Roboto files are local.

Verification in verification/grid-side installs a real ZIP into a disposable SQLite site and checks 18 desktop/mobile routes, no-JavaScript navigation/search, privacy/comments, featured-image fallback and wide media. Screenshots are compared to pinned source layouts/CSS; no live-demo pixel parity claimed. Shipped CSS/Eta is editable directly.
