# Stack for Firekylin

Independent port of Stack 4.0.3 at 3e123a30b79b5d52a3a8e88a9dd678fcfd28e418.
Requires Firekylin >=2.16.0. GPL-3.0-only; full source and third-party notices are
included. See NOTICE.md and source/manifest.json.

Preserves Stack's left avatar/navigation sidebar, right search/taxonomy widgets,
large cover cards, deterministic FNV32a category colors, compact archive rows,
article typography, desktop TOC sidebar and mobile TOC disclosure. The original
SCSS is compiled, with a separate small Firekylin adaptation stylesheet. This is
not the PaperMod layout with different colors.

Native Widgets supply home/category/tag/author lists, post/page/attachment, archives,
search and filter-preserving pagination, and taxonomy directories. Native Waline
handles comments. Featured images use native post options.featuredImage. A custom
post field `subtitle` (where supplied by the core) maps to Stack's description.
Core home lists may omit category relations; those labels only render when supplied,
never fabricated from a separate query. Article tags use native core rendering.

Settings: avatarUrl (HTTP(S) or root-relative), emoji, subtitle, compact (true/false),
colorMode (auto/light/dark), showToc, showCopy (true/false), footerText. Site navigation
supplies menu entries. No custom HTML is accepted in these text settings. Without
JavaScript, the mobile menu stays open and reading/navigation remain usable.

Interactive behavior: mobile menu with Escape/focus return; persisted light/dark
switch; h2/h3 TOC with active section; code copying (secure context required); inline
image dialog with keyboard activation, Escape close and focus restoration. This
simple dialog does not implement PhotoSwipe gestures, zoom or a multi-image gallery.

## Differences and unfinished upstream features

Hugo build-time image processing, front matter/shortcodes, multilingual relations,
client search index, related-content scoring, reading time, Mermaid/KaTeX, Chroma
syntax token generation, cookie-consent/analytics integrations, social menu registry
and jump-to-page dialog are not ported. Search/pagination use the native server.
Taxonomy colors retain the upstream FNV32a scheme; per-term style overrides are not
exposed. Native monthly archive grouping replaces Hugo yearly groups. The TOC is
browser-generated; without JS the complete article remains readable. Lato remote
fonts are replaced with the upstream system fallback stack. No generic copyright
license is injected into the user's posts. Standalone 404/500 pages use Stack colors.

## Verification

Frozen pnpm 10.29.3 install, 13 Node tests, 11 additional tests with actual core
2.16.0 Widget/comment classes, 7 Python tests, 16 Chromium page renders, and
Stack-specific desktop/mobile configured-page, menu, focus, theme persistence,
TOC, actual clipboard, image dialog and no-JS tests. ZIP installed by the actual
core ThemeInstaller. CI uses pinned core a200d5887c702acb7c264776d9827f54e8389f09.

Commands: `pnpm test`, `python3 -m unittest discover -s test -p 'test_*.py'`,
`FIREKYLIN_CORE_PATH=/path/to/core node --test test/stack.test.js`, and
`CHROMIUM_PATH=/usr/bin/chromium pnpm test:browser`.
These are synthetic public rows, not a live database or comment-login end-to-end
test. See VISUAL-COMPARISON.md. Install generated stack-0.1.0.zip in the theme
installer and select Stack. No merge/release/deployment is part of this draft.
