# Edidor for Firekylin

Source https://github.com/jacobsun/edidor (upstream also references sfengyuan/edidor); pinned revision in NOTICE.md. MIT license and editable original base/light/dark/wild Sass and CSS generator included. System fonts only.

Preserves editor-like toolbar/sidebar/main/footer panes, month-grouped file list, original light/dark palettes and original wild color generator. Reader controls save theme and generated palette across pages. Wild palettes retain the upstream random color behavior and do not guarantee contrast. Sidebar lists 12 native recent posts and can be resized using the browser resize handle on desktop; mobile stacks it above content. Body scroll replaces nested viewport locking to support native long pages and navigation without JavaScript. Without JavaScript the light palette and navigation remain usable.

Native Firekylin 2.17.1+ posts/pages/attachments, archives/taxonomies/search/pagination and gated comments. Homepage uses the native month list rather than the original intro-only view. Complete static file tree, custom Hugo sidebar taxonomy tree, shortcut/drag persistence, palette export ZIP dialog, loaders, branding SVG/photos, syntax highlighting, social icons and remote services are omitted. No static private-post index. Remote comments login/submission untested.

Actual ZIP/SQLite verification covers 18 desktop/mobile routes, no-JS navigation/search, privacy/comments, attachments/media, sidebar geometry and persisted dark/wild modes. Screenshots compare pinned source styles/templates, not live-demo pixel parity. Source Sass and native integration overrides can be edited directly.
