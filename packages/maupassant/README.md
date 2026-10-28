# Maupassant for Firekylin

Adapted from [pagecho/maupassant](https://github.com/pagecho/maupassant) at `fca8edd742e1d3dbf62dde804dbd46378e886806`.
Copyright remains with cho; the upstream MIT license is included verbatim in LICENSE.
The Firekylin templates and integration CSS are also MIT licensed.

## Installation and compatibility

Copy this directory to `themes/maupassant` in an independent Firekylin project (or
`www/theme/maupassant` in a legacy/core installation), then select it in Appearance.
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
Theme settings provide plain-text footer copy, plus a sidebar heading.

## Differences from Typecho

PHP widgets/options are replaced by Eta and Firekylin Widgets. Typecho comment
forms, recent-comment sidebar, admin links, plugin integrations, social-share
scripts, analytics snippets, legacy browser polyfills and Typecho custom page
selectors are not ported. Search uses Firekylin's `keyword`, not Typecho's `s`.
Site navigation is configured in Firekylin. There is no bundled syntax-highlighter;
content is rendered by the core. The sidebar shows recent public articles and directory links; it collapses below 860px.

## Resource audit

`res/css/upstream.css` is derived from upstream style.css (icon-font declarations and the 404 image reference removed), covered by the repository MIT license.
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

Reviewed 2026-10-28: the upstream repository had 609 GitHub stars and an explicit
MIT license. The existing theme repository and PRs contained no Maupassant port.
Clarity is outside this work. This theme is reviewed independently of other ports.
