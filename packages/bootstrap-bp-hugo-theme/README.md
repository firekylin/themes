# Bootstrap-BP for Firekylin

Uses Sebastian Pech’s MIT theme Sass and original card structure: featured cover, category kicker, title, date/author, summary and tags. The gallery has three desktop columns and one mobile column; `layout=single` selects full-width rows. `palette` allowlists the four upstream compiled schemes: default, blue, light and dark. Native public-result IDs bound the category/tag lookup; unsafe or absent covers are omitted.

Native posts/pages, taxonomy/search/archive, pagination, attachments, protected content and comments are supported. Footer text/author are configurable. The navigation wraps visibly without JavaScript; no collapsed menu or Bootstrap JS is required. Title and cover links replace the upstream full-card link overlay.

Hugo media/quote/link front matter, automatic WebP/srcset, related/adjacent-post selection, reading-time estimates, social icons, analytics, feed generation, multilingual/SEO schema, code highlighting and YouTube/Spotify facades are not implemented. Firekylin content/search/comment services are used. No demo photos, fonts or remote scripts are shipped. No live upstream pixel comparison or remote comment submission is claimed.

Protected listing covers are suppressed when the core supplies a protection flag/hash or its redacted protected-title marker. This also covers core versions which retain featuredImage while removing the hash from list rows.
