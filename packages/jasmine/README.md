# Jasmine for Firekylin

Three-column reading interface with a navigation rail and light article feed.

Adapted from [liaocp666/Jasmine](https://github.com/liaocp666/Jasmine) at `d8744a44a53af88fc6be2daf84a30e595b605870`.
Selected in descending GitHub popularity order on 2026-10-28 (826 stars).
See [NOTICE.md](NOTICE.md) for the individual license, source chain, modifications
and third-party resource audit. Original license/attribution materials are retained.

## Install

Copy this directory into `themes/jasmine` (independent project) or
`www/theme/jasmine` (legacy/core installation), then select it in Appearance.
Requires Firekylin >=2.16.0 with Eta/Widgets; verified against core `99bbdcb`.
No PHP, npm install or compilation is required. Local JavaScript adds persistent color switching and article heading navigation.

## Supported

Home and category/tag/author lists; post, page and attachment detail; search and
query-preserving pagination; archives; category/tag directories; empty states;
404/500; configured site navigation; RSS; public recent-post sidebar where shown;
featuredImage where the layout has covers; core-rendered body/password forms;
native comments through `firekylin.comment()`, respecting core disabled/login rules.
Only public Widgets supply data; templates issue no database queries.

Appearance settings: plain-text footer and introduction, validated hex accent
color, `colorMode=dark` for dark colors, and a sidebar heading.
Missing covers use local CSS gradients, never unlicensed upstream photographs.
Navigation stays available without JavaScript. Mobile layouts collapse sidebars.

## Differences from Typecho

This is a first Firekylin adaptation of the reading layout, not a PHP compatibility
layer. Unsupported upstream features: moments mode, PJAX, sticky feed logic, Typecho administration extensions and the original icon library.
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

## Jasmine source adaptation

The page follows the original narrow rail / middle feed / right widgets layout
with white surfaces and column borders. Category navigation uses public category
Widgets. Desktop feed thumbnails appear on the right and disappear below 992px.
Article pages have their own heading, collapsible heading directory, body and
adjacent-post block. The sidebar contains real recent posts and tags, not invented
hot-post or recent-comment statistics.

`logoUrl` sets the rail logo, `categoryNum` limits navigation (1–12), `showToc=0`
disables the default article directory. Dark-mode preference persists locally.
Author content and protected-body handling remain delegated to core. See
VISUAL-COMPARISON.md for the actual PHP component reference and limits.
