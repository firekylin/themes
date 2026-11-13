# Coast for Firekylin

Source https://github.com/Myxogastria0808/coast; exact revision in NOTICE.md. MIT license and original Sass retained. Unmodified local Zen Kurenaido font with SIL OFL license and hash included.

Preserves the large image/title intro, gray embossed post cards, date/author/tag metadata, article panel and sticky desktop table of contents. `heroImage` accepts an http(s) or site-absolute image URL. No demo photograph is distributed; without a configured image the intro uses a plain muted background. The hero is 75vh below always-visible native navigation; list height is content-driven so pagination/footer cannot overlap longer lists. Article heading TOC is built progressively; mobile hides it as upstream.

Native Firekylin 2.17.1+ posts/pages/attachments, archives/taxonomies/search/pagination, navigation and gated comments. Page content remains visible without JavaScript. Remote KaTeX/Mermaid, Zola shortcodes, loading overlay, social metadata and demo logos/photos are omitted. Core controls private/draft visibility. Remote comment login/submission untested. No remote fonts or scripts.

Actual ZIP/SQLite verification covers 18 desktop/mobile routes, no-JS search/navigation, privacy/comments, attachments, media containment, hero image and progressive TOC. Screenshots compare pinned source styles/templates, not live-demo pixel parity. Source Sass and appended native CSS are editable; preserve integration rules when recompiling base.scss.
