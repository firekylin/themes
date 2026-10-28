# Fixed-source visual comparison

Reference: PaperMod 118119693d8b5ac211b939775678310973bcb232, built locally with
Hugo v0.169.0 using six synthetic posts. Firekylin uses the same titles, summaries,
article body, dates, author and navigation. Both are Chromium renders at 1280x900
and 390x900, captured 2026-10-28; source screenshot files are generated references,
not screenshots taken from a live author's site.

| viewport | upstream/port main width | upstream/port card width | upstream/port first height | title |
|---|---|---|---|---|
|1280|768 / 768|720 / 720|320 / 320|40px / 40px|
|390|390 / 390|362 / 362|260 / 260|40px / 40px|

Desktop/mobile home and article screenshots were visually inspected. Header order,
first-post wrapping, card geometry, metadata, TOC block, article type and code block
match the original structure. This is not a claim of whole-page pixel identity:
Firekylin fixtures expose three pages while the reference contains one, so the port
shows pagination; the native footer attribution and Chinese labels differ. Current
navigation underline is not mapped. Native content/metadata and Waline differ by
platform. Core Widgets generate URLs, not Hugo permalinks.

[Port desktop](screenshot.png), [port mobile](preview/mobile.png),
[upstream desktop](preview/upstream-desktop.png),
[upstream mobile](preview/upstream-mobile.png),
[port article](preview/post-mobile.png),
[upstream article](preview/upstream-post-mobile.png).

Browser assertions additionally cover 8 page types at both sizes, long titles,
no overflow/resource failures/console errors, search form semantics, persisted
light/dark mode, TOC anchors, actual clipboard copying, and navigation without JS.
