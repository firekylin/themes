# Independent Publisher 2 protected-cover regression

The original list template emitted `options.featuredImage` after the native model
redacted a protected post's title, body and summary and removed its password hash.
The disposable SQLite site's home page reproduced the confidential cover leak
before the fix. Locked detail pages were already protected by core; no detail-page
leak is claimed.

The listing guard checks the native protection flag, a remaining password hash,
and the native title `此内容被密码保护`. This compatibility fallback is intentionally
conservative: a public post with that exact title also has no listing thumbnail.
The native detail password form, wrong-password response and successful unlocking
remain core-controlled.

## Verification

Against unchanged core `6b7c95cf43e0c6af70c71ac1e537d75a982e407e`:

- Six focused regressions fail before the fix. Afterward, all 18 theme tests pass
  with the real core Widgets enabled. The real core model is executed unchanged
  with its dependency/database boundary stubbed, proving that list redaction
  removes the hash while preserving `options.featuredImage`.
- Full Node suite: 991 passed, one optional real-core test skipped. That optional
  test passes in the separate 18-test focused run. Python suite: 8 passed.
- `privacy.cjs` builds and installs the actual theme ZIP into a disposable SQLite
  site. HTTP checks pass for home, page 2, search, category, tag, archives, protected
  post/page, wrong and correct passwords, and a fresh GET after unlocking. Public
  list and detail covers remain visible. Listing assertions require HTTP 200 and
  the protected record's link and redacted title inside the main content.
- `privacy-report.json` records the local HTTP-only run. Local Chromium was not run.
  The integration workflow runs the same regression with mandatory Chromium at
  1440px and 390px, captures locked/list/unlocked screenshots, checks that protected
  image requests never occur, then runs the existing full visual integration.
  Current-head workflow artifacts contain those fresh browser reports and images
  when that CI run succeeds. The committed original screenshots and `report.json`
  remain historical evidence, not evidence for this privacy correction.

## Source audit

The pinned Automattic source is
https://github.com/Automattic/themes/tree/75faa8a1e0367a37c2638250a3c9ed0a0f8c0b7f/independent-publisher-2.
Original stylesheet headers, complete GPL texts, upstream readme and normalize.css
MIT attribution are retained. Font/icon URLs and demo photographs remain excluded.
No upstream stylesheet or source assets were changed by this privacy fix.
