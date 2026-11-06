# Dose for Firekylin

Dose’s monospace summary feed, slash separators, underlined headings and persistent light/dark switch.

Source https://github.com/oltdaniel/dose; pinned revision and original attribution in NOTICE.md. Full MIT license retained. Retains original Sass and dark palette. Uses real links instead of clickable article containers. Replaces upstream personal avatar/biography with site title/description and uses text buttons instead of third-party SVG icons. Translation controls are not ported. Index rows only show tags when the native API provides relations.

Native posts/pages/attachments, archives, categories, tags, search, pagination, navigation, footer settings and gated comments require Firekylin 2.17.1+. Zola shortcodes and custom RSS generation are not ported; remote Waline authentication/submission is untested.

Editable Sass is in res/source/sass; compiled CSS ships ready to use. Compile its entry file with Dart Sass 1.108, then retain the appended native integration CSS. Screenshots and actual ZIP/SQLite verification: verification/zola-dose. Compared pinned upstream templates/CSS, without a live upstream-demo pixel-parity claim.
