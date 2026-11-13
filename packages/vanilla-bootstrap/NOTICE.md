# Source and attribution

- Original theme: Zachary Betz, [Vanilla Bootstrap Hugo theme](https://github.com/zwbetz-gh/vanilla-bootstrap-hugo-theme/tree/3f00947b65e6aa3d55388878d2872c2497ed1d93), MIT. The unmodified original license is `LICENSE`.
- `res/css/bootstrap.css` is the unmodified Bootstrap 4.3.1 asset from that source revision. Its header and independent MIT license are retained (`res/licenses/Bootstrap-MIT.txt`).
- `res/css/upstream.css` extracts `layouts/partials/style.html`, replacing the Hugo container-width parameter with its original 700px default.
- `inc/icon.eta` contains six Feather SVG icons extracted from the source revision’s bundled `static/js/feather.min.js`. Feather is Copyright (c) 2013–2017 Cole Bemis, MIT (`res/licenses/Feather-MIT.txt`). No Feather runtime JavaScript is shipped.
- Firekylin contributors adapted the Hugo templates to native Eta/widgets, added search, pagination, attachments, privacy/comment integration, accessible static navigation and responsive content containment.

No upstream demo content, screenshots, site identifiers, analytics scripts, credentials, jQuery or Bootstrap JavaScript are included. Any market screenshot is generated from this port’s actual installed Firekylin site, not the upstream demo.
