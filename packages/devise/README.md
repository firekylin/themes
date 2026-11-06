# Devise for Firekylin

Ports Austin Gebauer’s MIT Devise using its original Sass and Bootstrap 4.5.2. Preserves the 650 px pale reading column, optional 120 px circular portrait, title/subtitle, gradient separator, dark category badges and compact date/title lists. The avatar is optional and configurable; no upstream demo avatar is bundled.

Homepage groups the current native page by each post’s first category and shows its first seven posts under “最近发布”. Unlike Hugo’s complete taxonomy collection, this keeps Firekylin pagination bounded and avoids duplicating posts across several category groups. Filtered category/tag/search pages retain their actual headings.

Native posts/pages, attachments, archive/taxonomy/search, pagination, private content and comments are supported. Footer text and author are configurable. Social icons, analytics, arbitrary Hugo homepage HTML, post subtitles, arbitrary color/font variables and Hugo-specific configuration are omitted. No remote libraries are required. Live upstream pixel comparison and remote comment submission are untested.

The original MIT license is retained verbatim, including its placeholder copyright name; upstream package metadata identifies Austin Gebauer as author and MIT as the license. Bootstrap’s separate MIT notice and all source Sass are included.
