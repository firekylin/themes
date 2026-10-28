# PaperMod for Firekylin

Independent Eta port of PaperMod at 118119693d8b5ac211b939775678310973bcb232.
Requires Firekylin >=2.16.0. MIT; see LICENSE and NOTICE.md.

Preserves the upstream CSS, 720px reading column, 320/260px first-entry presentation,
rounded cards, metadata, archive/terms lists, profile and info home modes, responsive
navigation, light/dark colors, article typography, cover images and code blocks.
Includes native public Widgets for home/category/tag/author, post/page/attachment,
search with filter-preserving pagination, archives, category/tag directories and
native comments. Status templates are standalone. TOC disclosure, code-copy,
return-to-top and persisted theme switching are implemented; reading/navigation
work without JavaScript. The copy button requires a secure browser context.

Install the `papermod-0.1.0.zip` produced by the repository packager through
Firekylin's theme installer, then select PaperMod. Configure navigation through the
site's navigation settings. Featured images use the native post `featuredImage`
option. Theme settings: `homeMode` regular/info/profile, `homeTitle`, `homeContent`,
`profileImage`, `colorMode` auto/light/dark, `showToc`, `showCopy`, `hideSummary`,
`hideMeta`, `footerText`. Boolean settings use text true/false. Profile buttons use
site navigation; image URLs must be HTTP(S) or root-relative. No arbitrary HTML is
accepted in these theme settings.

## Platform differences / unfinished upstream features

Hugo front matter, shortcodes, multilingual content relations and build pipelines
are not executed. Hugo image resizing/resource fingerprinting, Fuse client index,
Chroma syntax coloring, author editing links, structured-data/OG generation,
reading-time/word-count, social icon registry/share links and Hugo post-next/previous
selection are not ported. Search uses native server results; metadata uses native
date/author. TOC is generated in the browser from h2/h3 and is absent without JS.
Archive grouping follows the core's monthly groups. Current-menu styling and
per-post theme front-matter controls are not yet mapped. Waline replaces the Hugo
comment partial. No theme-owned analytics or external update request is enabled.

## Verification

`pnpm install --frozen-lockfile`, `pnpm test`, Python repository tests,
`FIREKYLIN_CORE_PATH=/path/to/core node --test test/papermod.test.js`, and
`CHROMIUM_PATH=/usr/bin/chromium pnpm test:browser`.
Real core classes at a200d5887c702acb7c264776d9827f54e8389f09 (2.16.0) are exercised
with synthetic public rows. This is not a live database or comment-login end-to-end
test. ZIP installation is verified with the actual core ThemeInstaller. See
VISUAL-COMPARISON.md for fixed-version desktop/mobile evidence. CI uploads browser
screenshots; no release, merge or deployment is performed by this draft.
