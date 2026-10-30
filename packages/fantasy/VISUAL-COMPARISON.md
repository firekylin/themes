# Visual verification

Original reference: https://github.com/Seevil/fantasy/blob/730c1a6d95f6f4115c733f95523ac797aea5092e/screenshot.png plus header.php, index.php, post.php, footer.php and css/style.css at that revision. The screenshot contains a readable theme page beside decorative promotional text; only the page is the design reference. Upstream programs were not executed.

Preserved: 820px maximum white wrapper, pale background/shadow, avatar left, site title/description/navigation right, list separators, title hashes, muted date/comments metadata and spacious text reading. Original CSS retained; native adapter uses flex in header/footer columns to prevent mobile overflow and preserves user zoom.

Actual installed Firekylin SQLite site screenshots and report: verification/fantasy/{home,post}-{1440,390}.png and report.json. Package screenshot is the actual desktop home page. Test content/logo differ from the original. Validation covers 16 routes, paging, search dialog submission, Escape/focus return, no-JS search, private/draft exclusion and comment gating. This is structural source/screenshot comparison, not an upstream runtime or pixel-identical comparison.
