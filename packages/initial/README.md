# Initial for Firekylin

An independently implemented adaptation of JIElive's Initial 2.5.5 reading layout, referenced at `1c68cb95199e16c4b933dfdf2922e1fae27fc1c4` (499 GitHub stars at selection). Initial upstream has no explicit license located: see NOTICE.md. No original PHP, CSS/JS bundles, fonts or images are redistributed. LICENSE covers only this implementation and does not relicense upstream Initial.

Copy this directory to `themes/initial` (independent installation) or `www/theme/initial` (legacy), then select Initial. Requires Firekylin 2.16.0+. No npm build is required.

Supports home/category/tag/author lists, article/page/attachment, archives, taxonomy directories, search and pagination, empty/error pages, native content/password forms and comments. Uses only public Widgets. Set `oneColumn=1` for the 750px single-column variant, `fixedHeader=1` for sticky navigation, `logoUrl` for a safe local/HTTP(S) logo. Plain-text intro/footer, hex accent and configured night palette are supported. The article TOC is a small local progressive enhancement.

Does not implement Typecho PJAX/Ajax comments, whisper widgets, background music, reward QR codes, private view counters or author analytics. Recent posts replace popularity ranking without invented counts. Default list Widgets do not load categories; metadata appears only when supplied. No claim of live Typecho compatibility.

Validation: `pnpm test`, `pnpm test:browser`; `FIREKYLIN_CORE_PATH=/path/to/firekylin node --test test/ports.test.js test/initial.test.js` exercises actual core Widgets/comments. See VISUAL-COMPARISON.md for source component references and mobile checks.
