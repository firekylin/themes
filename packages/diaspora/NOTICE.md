# Provenance and redistribution

Upstream: https://github.com/LoeiFy/Diaspora at `68d25eaad4caadaec14196fd5009a00684f4d3a8` (style header 1.3.0), checked 2026-10-28. Upstream root LICENSE is MIT, copyright LoeiFy@gmail.com. Full text retained in LICENSE.

`res/css/upstream.css` derives from assets/Diaspora.css; removed the embedded IcoMoon font section and external asset references. Layout templates translate the original index/post/single PHP structure to Eta and Firekylin Widgets. Browser controls are reimplemented. Common core route/verification adapters were reused from this migration work; they are not upstream Diaspora code.

No upstream default photos, logos, icons, font binaries, TimThumb, third-party plugin.js, analytics or social scripts ship. Supply images you have rights to use. Synthetic geometric screenshots were created for this port. Screenshots of the locally running original show its original branding for comparison only; those assets are not included as theme runtime files. MIT does not assert rights to third-party trademarks or user content.

The source README lists Hexo/Typecho/Hugo derivatives. No existing Diaspora PR or remote branch was found before starting this WordPress port; do not submit another port of the same design without checking this PR.
