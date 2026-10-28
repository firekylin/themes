# Argon for Firekylin

Independent draft port of Argon 1.3.5, requiring Firekylin >=2.16.0. See [source audit](NOTICE.md) and [visual comparison](VISUAL-COMPARISON.md).

Preserves the original purple shaped banner, overlapping 1200px content region, 280px left sidebar, centered article headers, featured-image overlays, white cards and original reading styles. Supports home/category/tag/author lists, post/page/attachment, search with keyword-preserving pagination, monthly archive, category/tag directories, 404/500 and native Firekylin Waline comments. Categories are shown when the core provides those relations; views and WordPress metrics are not fabricated.

Interactive features: automatic/system, light, dark and black modes with persistence; article heading directory; reading progress and reading-time estimate; keyboard-accessible image dialog with Escape and focus restoration; mobile menu and no-JavaScript reading/navigation. Native password forms from core are preserved.

Configuration is exposed in the Firekylin appearance form: banner title/subtitle/image, sidebar title/subtitle/avatar, announcement, double/reverse/single column, color mode, serif/sans font, accent color, excerpt length and footer text. Footer attribution cannot be disabled by these settings. Images accept only HTTP(S) or site-relative URLs.

## Scope differences and unfinished upstream features

This is not complete WordPress compatibility. The three-column/right-widget layout, alternate/masonry list styles, fullscreen/minimal banner modes, cover-placement variants, typing animation, PJAX, lazyload transitions, shortcode/Gutenberg blocks, WordPress link-manager pages, shuoshuo post type and mixed timeline, reading counters, share/reward overlays and out-of-date notices are not ported. WordPress-specific comment editing, private comments, email subscriptions, CAPTCHA and UA history use no imitation endpoints; comments use Firekylin Waline. Automatic time-based dark scheduling, advanced custom CSS/JS and independent top/sidebar menus are not yet supported. Site navigation is shared in the two locations. System fonts replace unaudited fonts; text controls replace icon fonts. Math rendering remains the core content renderer's responsibility.

Mobile uses a native disclosure navigation and hides the desktop sidebar; this differs from the upstream off-canvas sidebar. The heading directory currently appears only in a visible desktop sidebar. Reading time is a local estimate of rendered text, not a WordPress value. Native comments were rendered with actual core code, but live database, login and remote comment submission are not exercised by the synthetic fixture.

## Verify and install

Run `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm test:browser` (install Playwright Chromium or set CHROMIUM_PATH), and the Python tests from the repository root. Set `FIREKYLIN_CORE_PATH` to the pinned Firekylin source for real Widget/comment tests. CI runs those portable checks and uploads desktop/mobile screenshots. ZIP build uses scripts/build-registry.py's build_theme; real installation uses scripts/check-port-install.js in an isolated temporary directory. No registry entry or release is published by this branch.
