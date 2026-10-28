# Aria for Firekylin

Centered reading cards with a violet hero and separated article metadata.

Adapted from [Siphils/Typecho-Theme-Aria](https://github.com/Siphils/Typecho-Theme-Aria) at `d67dc49f3cccc236e2dca681944b75528d4a9750`.
Selected in descending GitHub popularity order on 2026-10-28 (485 stars).
See [NOTICE.md](NOTICE.md) for the individual license, source chain, modifications
and third-party resource audit. Original license/attribution materials are retained.

## Install

Copy this directory into `themes/aria` (independent project) or
`www/theme/aria` (legacy/core installation), then select it in Appearance.
Requires Firekylin >=2.16.0 with Eta/Widgets; verified against core `99bbdcb`.
No PHP, npm install, compilation or theme JavaScript is required at runtime.

## Supported

Home and category/tag/author lists; post, page and attachment detail; search and
query-preserving pagination; archives; category/tag directories; empty states;
404/500; configured site navigation; RSS; public recent-post sidebar where shown;
featuredImage where the layout has covers; core-rendered body/password forms;
native comments through `firekylin.comment()`, respecting core disabled/login rules.
Only public Widgets supply data; templates issue no database queries.

Appearance settings: plain-text footer and introduction, validated hex accent
color, `colorMode=dark` for dark colors.
Missing covers use local CSS gradients, never unlicensed upstream photographs.
Navigation stays available without JavaScript. Mobile layouts collapse sidebars.

## Differences from Typecho

This is a first Firekylin adaptation of the reading layout, not a PHP compatibility
layer. Unsupported upstream features: AJAX/PJAX, likes/views, animated backgrounds, Fancybox, TOC and Typecho comment widgets.
Search uses Firekylin `keyword`; comments use native Waline instead of Typecho
comment forms. No analytics, paid feature, external update request, advertising
or credential-dependent integration is enabled by the theme.

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

## Source-specific comparison

The port restores Aria's image hero and avatar navigation, title/category/date/cover
card order, real comment-count links, and separate article header/body/update/tags
sections. Home hero is 80vh desktop / 50vh mobile; article hero is 70vh / 40vh.
`backgroundUrl` and `defaultThumbnail` use the first configured URL deterministically
rather than the original random selection. `featuredImage` overrides the default
card and article hero. Links use native navigation instead of PJAX.

Categories are shown when supplied by the public archive (including category
context). Core 2.16.0's default home-list query loads the user relation but omits
category relations; the theme cannot invent that data. Article categories and
comment_num are preserved when available, with no fake views/likes counters.
`update_time` is displayed on article detail when present.

See [VISUAL-COMPARISON.md](VISUAL-COMPARISON.md) for source and render checks.
