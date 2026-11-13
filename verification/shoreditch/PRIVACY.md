# Shoreditch 0.1.1 protected-cover regression

The 0.1.0 list template read `options.featuredImage` after the native model had
redacted the protected title, summary and content and removed the password hash.
That model preserves unrelated options. The installed SQLite site's home page
therefore emitted `/themes/shoreditch/res/SECRET_PHOTO.svg` before this fix.

The correction suppresses list covers for the native protection flag, a remaining
password hash, or the native redacted title. The title fallback is intentionally
conservative: a public post with that exact title also has no listing thumbnail.
No core implementation or original upstream artwork, CSS, license or attribution
was changed. Native post/page protection and successful unlocking still work.

Local evidence against core `6b7c95cf43e0c6af70c71ac1e537d75a982e407e`:

- The installed core model source runs unchanged in the regression test, with only
  the database/dependency boundary stubbed. It proves that the hash is removed and
  the cover survives redaction before the template is rendered.
- Four list-variant regressions plus that real-core regression fail before the
  fix and all 17 theme tests pass afterward with real core Widgets enabled.
- `scripts/check-protected-covers.cjs shoreditch` builds and installs the 0.1.1 ZIP
  into a disposable real SQLite site. HTTP checks pass for home, page 2, search,
  category, tag, archives, protected post/page, incorrect passwords, successful
  passwords and fresh GETs after unlocking. Public covers remain visible.
- `privacy-report.json` explicitly records the local run as HTTP-only. No local
  browser verification is claimed. The integration workflow runs the same script
  with mandatory Chromium checks for DOM exposure, image requests, both password
  flows and 1440/390px layouts, then the existing visual integration suite. Its
  generated reports are uploaded as the run's evidence artifact.

The historical `report.json` and screenshots describe the earlier 0.1.0 visual
verification, not this privacy correction. Consult current-head CI for current
browser results.
