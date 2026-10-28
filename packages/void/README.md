# VOID for Firekylin

Restrained typography, dark masthead and a two-column editorial card grid.

Adapted from [AlanDecode/Typecho-Theme-VOID](https://github.com/AlanDecode/Typecho-Theme-VOID) at `a70bbc9a173b7f80ebf6dcd386e4286a8a7fbcb2`.
Selected in descending GitHub popularity order on 2026-10-28 (878 stars).
See [NOTICE.md](NOTICE.md) for the individual license, source chain, modifications
and third-party resource audit. Original license/attribution materials are retained.

## Install

Copy this directory into `themes/void` (independent project) or
`www/theme/void` (legacy/core installation), then select it in Appearance.
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
layer. Unsupported upstream features: PJAX, masonry animation, Typecho custom page selectors, table of contents, share/reward UI and all optional vendor integrations.
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
