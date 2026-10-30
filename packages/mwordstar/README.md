# MWordStar for Firekylin

Native port of Changbin's responsive two-column card theme. Requires Firekylin 2.17.1+. Install the generated ZIP and select MWordStar.

Preserves the sticky navigation, gray backdrop, white bordered cards, large/small featured-image styles, title/excerpt/metadata divisions, profile/taxonomy sidebar, reading directory and persistent light/dark switch. Native menu, image dialog and TOC work with keyboard controls. Search, archives, taxonomy, protected content and comments use Firekylin Widgets. Navigation/search still work without JavaScript.

Settings: avatarUrl accepts HTTP(S) or site-absolute image URLs; nickname is plain text; coverStyle=mini selects small list covers, otherwise large covers; rounded=rightAngle selects square corners. Featured images use Firekylin's featured-image setting. Defaults are neutral light and dark schemes; the port does not expose all 18 upstream color combinations.

Not ported: Typecho-specific stats/likes, latest-comments, calendar, Github API dashboard, partial-content/comment-to-unlock shortcodes, custom captcha, private-comment backend, multilingual message catalogs, PJAX, service worker, MathJax, emoji panel and syntax-highlighter runtime. Native comment integration owns comment policy; remote-provider login/submission was not tested. Sidebar omits unverifiable view/count statistics rather than inventing them. See NOTICE.md and VISUAL-COMPARISON.md.
