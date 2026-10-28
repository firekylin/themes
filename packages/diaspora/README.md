# Diaspora for Firekylin — draft

Source: [LoeiFy/Diaspora](https://github.com/LoeiFy/Diaspora/tree/68d25eaad4caadaec14196fd5009a00684f4d3a8), MIT; Firekylin >=2.16.0. Install the built diaspora-0.1.0.zip using the normal theme installer. Nothing is released or deployed by this PR.

Preserved: full-viewport first-story cover, diagonal overlay, first story not repeated in the feed, alternating 680×440 desktop photo frames with overlapping outlined text panels, mobile stacked feed, full-screen navigation, 700px detail reading column, fixed reading toolbar, native content/audio, article images with keyboard previous/next preview, taxonomy/search/archive/pagination and core comments. Without JavaScript, navigation, content and page links work.

Settings: `coverImage` fallback (otherwise a neutral CSS surface), `logoUrl` optional logo in navigation, `heroText` optional first-story intro, `overlayColor` validated six-digit color replacing automatic image palette extraction, `colorMode` light/dark/auto (new), `footerText`. Per-post featuredImage comes first. Configuration labels explain expected values. Browser mode choice is saved locally.

Not implemented: upstream AJAX page transitions/load-more, parallax/Vibrant automatic palette extraction, persistent likes/views, related-post recommendations, WP attachment database/gallery ordering and downloadable wallpaper panel, music metadata/global player and WP custom comment form. The image viewer uses images already in the rendered article; it is not the original justified attachment gallery. Native audio controls remain available for audio embedded in the article. These gaps mean this draft is not full functional parity.

See [VISUAL.md](VISUAL.md) for fixed upstream references, desktop/mobile comparison and exact testing boundaries; [NOTICE.md](NOTICE.md) for asset decisions. No authorization is claimed beyond the recorded license.
