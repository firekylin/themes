# Amaze for Firekylin

Native port of spiritree's Amaze theme. Requires Firekylin 2.17.1+. Install the generated ZIP and select Amaze.

Preserves the expansive image/title header, overlay navigation, author/date-led text excerpts, open white layout, underlined sidebar headings, article-title banner and automatically generated reading directory. Uses native Firekylin search, archive, category/tag lists, protected content and comments.

Settings: backgroundImage and avatarUrl accept HTTP(S) URLs or site-absolute paths; backgroundText changes the home banner title. socialGithub/socialWeibo accept HTTPS profile links. No photograph is bundled; the default banner is a plain blue-gray background. Main navigation uses Firekylin navigation plus archive/search. On mobile it becomes a native disclosure menu with Escape handling; no-JavaScript navigation and search remain available.

Differences: independently written layout primitives replace the unbundled old AmazeUI framework. Text labels replace external icon fonts. No third-party scripts, dynamic Headroom behavior, syntax-highlighter runtime, Typecho comments or QQ protocol handler. The TOC is a native in-page navigation section, not the original floating script panel. Native archive replaces month-specific sidebar routes. List Widgets do not provide category relations, so list category labels are omitted; article categories remain in the banner. Remote comment login/submission was not tested. See NOTICE.md and VISUAL-COMPARISON.md.
