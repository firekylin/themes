# icefox for Firekylin

Narrow social timeline with author initials, timestamps and a profile cover.

Adapted from [xiaopanglian/icefox](https://github.com/xiaopanglian/icefox) at `797139b30e7b2f126d6bc5e5883c7f2b23cbcd47`.
Selected in descending GitHub popularity order on 2026-10-28 (1,016 stars).
See [NOTICE.md](NOTICE.md) for the individual license, source chain, modifications
and third-party resource audit. Original license/attribution materials are retained.

## Install

Copy this directory into `themes/icefox` (independent project) or
`www/theme/icefox` (legacy/core installation), then select it in Appearance.
Requires Firekylin >=2.16.0 with Eta/Widgets; verified against core `99bbdcb`.
No PHP, npm install or compilation is required at runtime. A small local script implements image preview, color switching and scroll navigation; reading, navigation and summary disclosure work without JavaScript.

## Supported

Home and category/tag/author lists; post, page and attachment detail; search and
query-preserving pagination; archives; category/tag directories; empty states;
404/500; configured site navigation; RSS; public recent-post sidebar where shown;
featuredImage where the layout has covers; core-rendered body/password forms;
native comments through `firekylin.comment()`, respecting core disabled/login rules.
Only public Widgets supply data; templates issue no database queries.

## icefox-specific layout and settings

Rebuilt against the pinned `components/head.php`, `components/post-list.php`,
`post.php` and CSS: 576px desktop/mobile timeline, 320px cover, overlapping profile
avatar, author-first posts, single/4/9-image layouts and author-aligned detail view.
See [VISUAL-COMPARISON.md](VISUAL-COMPARISON.md) for the source screenshot and checks.

- `topImage`: cover URL. `topVideo`: muted looping video, takes precedence over the
  image (used as poster); paused when the visitor requests reduced motion.
- `logoUrl`: site/timeline avatar. `avatarLink`: profile avatar destination.
  These accept HTTP(S) URLs or site-absolute paths; unsafe URLs are ignored.
- `autoCollapse`: default folds summaries after 100 characters; `0` shows the
  whole summary. Native disclosure works with JavaScript disabled.
- `colorMode=dark`: initial palette. Visitors can switch and persist their choice.
- `heroText` / `footerText`: plain-text introduction/footer.

Images come from the core featured image or summary HTML. One image keeps its
ratio, four form a 2×2 grid, other counts use three columns (up to nine). Image
links open a keyboard-dismissable preview; without JS they link to the image.

## Differences from Typecho

Firekylin's public list Widget returns **summary**, not full article HTML, so the
control says “展开摘要”; the full article remains one click away. Article titles
are retained as accessible permalinks although the original feed focuses on body
text. The core user relation exposes no avatar/email, so the configured site
avatar is used for the feed (initial fallback); per-author Gravatar is unavailable.

The original Typecho icefox plugin owns likes, inline replies, publishing/login
APIs and their database tables. This theme does not recreate those endpoints or
show fake like counts. The `···` link opens the article comments, provided by core
Waline. Infinite scroll becomes accessible pagination. Music shortcodes, dedicated
friend/game pages and location fields are not implemented; ordinary audio/video
in article content is preserved by core rendering. No unlicensed sample photos,
fonts or vendor runtimes are bundled; preview art is generated test SVG.

## Verify

`pnpm test` renders all eight page types with populated/empty fixtures and checks
pagination, escaping, settings and resources. `pnpm test:browser` exercises desktop
and mobile HTTP previews and writes screenshots. Use `CHROMIUM_PATH` for a local
Chromium or run `pnpm exec playwright-core install chromium` first.
`FIREKYLIN_CORE_PATH=/path/to/firekylin node --test test/ports.test.js` uses actual
core Widget classes and comment rendering. These are real Eta/Chromium renders
with synthetic data, not a live database installation; posting to a remote comment
service or authenticating a real user is not part of this check.

Selection exclusions: Pinghsu/Maupassant were already ported; Clarity is reserved
for the user. Miracles has additional custom-license restrictions, initial has no
explicit license, and Akina's referenced earlier WordPress source could not be
resolved for license-chain verification. They are not included in this batch.
