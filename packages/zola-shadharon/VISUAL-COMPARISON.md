# Visual adaptation notes

The upstream `main.scss`, card and header partials, and section macros provide the reference: three-column summary cards, dates, tags, read-more links, monospace text, a `#29292e` canvas, `#222226` cards and navigation, and a red site title.

The port retains these elements and uses three, two and one columns as the viewport narrows. Roboto Mono is bundled locally. A text button replaces the upstream CodePen switch, and blockquote text uses the active foreground color for readability. Syntax highlighting and social icons are omitted.

Screenshots in `verification/zola-shadharon` show the installed Firekylin theme at 1440 px and 390 px. They were visually inspected; no live upstream pixel comparison was performed.
