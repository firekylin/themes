# twentytwentyone privacy and native media regressions

The original list template emitted `options.featuredImage` after the native model
redacted a protected post's title, body and summary and removed its password hash.
The actual theme ZIP installed into a disposable SQLite site reproduced the
confidential cover leak on the home page before the fix. Locked detail pages were
already protected by core; no detail-page leak is claimed.

The listing guard checks `row.password_protected`, `row.options.postPasswordHash`,
and the native redacted title `此内容被密码保护`. This compatibility fallback is
intentionally conservative: a public post with that exact title also has no
listing thumbnail. Core still handles password forms and unlocking.

The native media override adds only `.prose` video/audio max-width and video
height:auto rules. Upstream stylesheet bytes remain an unchanged prefix. The
existing footer author setting and site-title fallback remain unchanged.

## Verification

Against unchanged core `6b7c95cf43e0c6af70c71ac1e537d75a982e407e`:

- Six privacy regressions and one media-rule regression fail before the fix.
  Afterward all 19 theme tests pass with real core Widgets. The real core model
  executes unchanged with its DB/dependency boundary stubbed, proving native list
  redaction removes the hash but retains `options.featuredImage`.
- Full Node suite: 992 passed, one optional real-core test skipped. That optional
  test passes in the focused real-core run. Python suite: 8 passed.
- `privacy.cjs` builds and installs the actual theme ZIP into a disposable SQLite
  site. HTTP checks pass for home, page 2, search, category, tag, archives, protected
  post/page, wrong and correct passwords, and a fresh GET after unlocking. Public
  list and detail covers remain visible. Each listing assertion requires HTTP 200
  and the protected record's link and redacted title inside the main content.
- `privacy-report.json` records the local HTTP-only run. Local Chromium was not run.
  The integration workflow runs the regression with mandatory Chromium at 1440px
  and 390px, captures list/locked/unlocked screenshots and verifies no protected
  cover requests occur. The full visual integration then verifies native post/page
  1280px video and audio fit the reading column, video keeps its aspect ratio, and
  audio controls remain visible. Current-head workflow artifacts contain fresh
  browser evidence when that CI run succeeds. Original committed screenshots and
  `report.json` remain historical evidence, not evidence for this correction.

## Source audit

Pinned upstream: https://github.com/WordPress/twentytwentyone/tree/ba9f20cad89163761185c0467b346ba42541ae22

GPL-2.0-or-later package metadata, complete LICENSE, original stylesheet headers,
upstream notices/readme and any bundled normalize.css MIT attribution are retained.
Font/icon URLs and demo photos remain excluded. No upstream stylesheet bytes or
source assets were changed by these fixes.
