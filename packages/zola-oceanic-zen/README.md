# Oceanic Zen for Firekylin

Oceanic Zen’s original deep-blue palette, Iosevka typography, dotted list markers and dashed section rules.

Source https://github.com/barlog-m/oceanic-zen; pinned revision and original attribution in NOTICE.md. Full MIT license retained. Original four Iosevka font files are bundled with SIL OFL. Ports the blog section list, using Firekylin archive/taxonomy navigation instead of Zola nested content sections. Optional social icons and demonstration content are omitted.

Native posts/pages/attachments, archives, categories, tags, search, pagination, navigation, footer settings and gated comments require Firekylin 2.17.1+. Zola shortcodes and custom RSS generation are not ported; remote Waline authentication/submission is untested.

Editable Sass is in res/source/sass; compiled CSS ships ready to use. Compile its entry file with Dart Sass 1.108, then retain the appended native integration CSS. Screenshots and actual ZIP/SQLite verification: verification/zola-oceanic-zen. Compared pinned upstream templates/CSS, without a live upstream-demo pixel-parity claim.
