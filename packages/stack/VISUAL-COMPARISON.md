# Stack fixed-version comparison

Original 3e123a30b79b5d52a3a8e88a9dd678fcfd28e418 built locally with Hugo
0.169.0 extended and synthetic posts/images. Port rendered using Firekylin Widget
fixtures. Reference config/content/SVGs are in test/fixtures/stack-hugo. Google
Fonts requests were blocked for the reference, so both use the same system fallback;
no upstream demo images or font files were copied.

Chromium at 1280x900 and 390x900, 2026-10-28. Both desktop and mobile home/article
screenshots visually inspected. Reference and port first-card geometry:

| viewport | main x / width | left width | right width | cover height | first card height |
|---|---|---|---|---|---|
|1280|243.75 / 655|183.75|306.25|250|422.08|
|390|15 / 345|345|hidden|150|325.08|

These measurements match between the two implementations. Avatar is 100x100;
mobile first card starts at y=239.48 in both. Source CSS and FNV32a category colors
are preserved. No pixel-identity claim: source has one page while the native test
fixture exposes three; pagination/footer differ. UI labels are Chinese in the port
and English in the reference. Source related-content recommendations are absent
rather than replaced with guessed relations. Mobile TOC uses the same source block.

[Port desktop](screenshot.png) · [reference desktop](preview/upstream-desktop.png)
[Port mobile](preview/mobile.png) · [reference mobile](preview/upstream-mobile.png)
[Port article](preview/post-mobile.png) · [reference article](preview/upstream-post-mobile.png)

Browser checks include console/resources, long-title overflow, 8 page types × 2
sizes, configured avatar/cover geometry, mobile menu and Escape focus, persistent
theme, TOC anchors, clipboard content, image dialog Escape/focus and no-JS navigation.
