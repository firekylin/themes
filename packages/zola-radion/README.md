# Radion for Firekylin

Port of Micah Kepe’s MIT Radion using its original vendor/theme Sass, pink underline links, 800 px monospace column, dated summaries, light/dark palettes and collapsible article contents. JetBrains Mono is bundled locally with OFL. The text toggle persists a chosen palette; initial mode follows the operating system. Without JavaScript the light theme remains readable and the empty TOC/toggle stay hidden. Mobile text is 16 px instead of upstream 13 px.

Native posts/pages, attachments, archive/taxonomy/search, pagination, private content and comments are supported. Footer author and text are configurable. The safe DOM-generated TOC includes h2/h3 headings and preserves existing IDs; it does not parse Zola’s full heading tree.

Zola search index, reading estimates, icon set, feed generation, MathJax, Giallo highlighting, copy-code controls, Giscus synchronization and specialized media shortcodes are omitted. Native search and standard HTML media are supported. No live upstream pixel comparison or remote comment submission was performed. Source licenses and acknowledged theme lineage are preserved in NOTICE.md and res/licenses.
