# Protected-content regression evidence

The original PR head leaked `options.featuredImage` from core-redacted list records. Before the fix, both the actual core-redactor regression and the installed ZIP/SQLite HTTP harness failed on the protected cover. The template now suppresses covers for the explicit flag, retained password hash, or core redaction title. A public post with the exact sentinel title is conservatively covered too, as documented in the theme README.

Reproduce against Firekylin `6b7c95cf43e0c6af70c71ac1e537d75a982e407e`:

```sh
FIREKYLIN_CORE_PATH=/path/to/firekylin node --test test/twentyfourteen.test.js
FIREKYLIN_HTTP_ONLY=1 FIREKYLIN_CHECKOUT=/path/to/firekylin PLAYWRIGHT_MODULE="$PWD/node_modules/playwright-core" node verification/twentyfourteen/live.cjs
```

The HTTP helper installs the built ZIP in a disposable SQLite site, requires status 200 and the target record in main content, then checks home, page 2, search, category, tag, archives and locked detail. It verifies the confidential title, summary, body and cover are absent, rejects a wrong password, restores title/body/cover with the correct password, and retains ordinary public covers.

`protection-report.json` records the real local HTTP run. The integration workflow also runs this helper with Chromium at 1440px and 390px, submits both password attempts through the native form, and uploads fresh protection screenshots/reports. Local Chromium was not run; browser results must come from the current-head CI artifact. Existing screenshots/report.json predate this repair and are not evidence for it.

The current-head browser harness also puts 1280px video/audio in actual posts and pages, checks containment at both widths, preserves video aspect ratio, and checks visible audio controls. The new CSS only appends native media overrides; the pinned upstream CSS and license remain intact.
