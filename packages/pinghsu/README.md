# Pinghsu for Firekylin

Adapted from [chakhsu/pinghsu](https://github.com/chakhsu/pinghsu) at `ed2e5f5944ef7af69cd1138d038ffa50d455a605`.
Copyright remains with Chakhsu Lau; the upstream MIT license is included verbatim in LICENSE.
The Firekylin templates and integration CSS are also MIT licensed.

## Installation and compatibility

Copy this directory to `themes/pinghsu` in an independent Firekylin project (or
`www/theme/pinghsu` in a legacy/core installation), then select it in Appearance.
Requires the Eta + Widgets theme API; verified against Firekylin core `99bbdcb`
(package version 2.16.0). This is not a claim of compatibility with older EJS themes.
No build step, client JavaScript, remote font, or runtime dependency is required.

## Supported

Homepage; category/tag/author article lists; post/page/attachment; search with
keyword-preserving pagination; archives; category/tag directories; empty states;
404/500 templates; configured site navigation; RSS; responsive layout; featured
images (Pinghsu); Firekylin-rendered content including password forms; native
Waline comments through `firekylin.comment()`, including core disabled/login rules.
Only public Widgets supply lists; no database queries or visibility logic is duplicated.
Theme settings provide plain-text footer copy.

## Differences from Typecho

PHP widgets/options are replaced by Eta and Firekylin Widgets. Typecho comment
forms, recent-comment sidebar, admin links, plugin integrations, social-share
scripts, analytics snippets, legacy browser polyfills and Typecho custom page
selectors are not ported. Search uses Firekylin's `keyword`, not Typecho's `s`.
Site navigation is configured in Firekylin. There is no bundled syntax-highlighter;
content is rendered by the core. The three-column card layout uses featuredImage, with CSS gradient fallbacks; Typecho random thumbnails, custom icon fields and one-list mode are not implemented.

## Resource audit

`res/css/upstream.css` is derived from upstream style.min.css (unchanged), covered by the repository MIT license.
No upstream pictures, screenshots, icon sprites, fonts, third-party JavaScript,
CDN styles or demo content are redistributed. Their individual licensing was not
established. The integration stylesheet contains local accessibility/responsive
adjustments and no external assets. The included screenshot is generated from
our synthetic Firekylin render fixture, not copied from the upstream demo.

## Validation

Run `pnpm test` for Eta renders and packaging metadata checks, and
`pnpm exec playwright-core install chromium && pnpm test:browser` for desktop/mobile
HTTP previews and screenshots. `FIREKYLIN_CORE_PATH=/path/to/firekylin node --test
test/ports.test.js` uses the actual core Widget classes and comment renderer.
The fixture is synthetic: browser checks do not start a database-backed blog,
post comments to a live Waline service, or authenticate users. Core render checks
cover disabled comments and forced-login configuration; production credentials
and third-party comment network behavior are outside this test.

## Selection

Reviewed 2026-10-28: the upstream repository had 1,478 GitHub stars and an explicit
MIT license. The existing theme repository and PRs contained no Pinghsu port.
Clarity is outside this work. This theme is reviewed independently of other ports.
