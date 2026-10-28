# Material verification

Core: Firekylin `99bbdcb919bae2133420dee214c5f8897b9ace25` (2.16.0). Source: Material `c8bd35d1a05fc487b49fc1884e176077f33ae9f3`. Reference runtime: Typecho 1.2.1 `206880ba714d80bfb0638aeacb49c58b8fb1b327`, PHP image `php@sha256:01176101b67743801164503341b6a70493814838185bc542b7272e718c5da7be`, SQLite.

## Automated real-site check

Install the pinned core's dependencies, `npm ci --prefix verification/material`, and use an installed Chromium/Chrome:

```sh
FIREKYLIN_CHECKOUT=/path/to/firekylin CHROMIUM_PATH=/usr/bin/chromium node verification/material/live.cjs
```

This creates a fresh temporary site/database, builds the ZIP with the repository builder, installs it with the actual ThemeInstaller, starts Firekylin on loopback port 8781, exercises it and stops the process. It does not connect to any existing site. `MATERIAL_TEST_PORT` changes the port. `PLAYWRIGHT_MODULE` can point to an external tooling installation.

Local result: PASS for ZIP installation; real SQLite home/post/page/archive/search/taxonomy routes; pagination; drawer/menus/Escape/search; no horizontal overflow at 1440/390px; private/draft exclusion including sticky selection; thumbnail/background/language configuration; enabled/disabled comment HTML. Workspace Node tests 2/2, Python tests 7/7. The Material integration workflow repeats the live-site check.

## Reference comparison

The original Typecho theme ran unmodified on local Typecho; `seed-reference.php` records fixture data and supported theme settings. Local fixture SVGs (the port's new geometric covers/avatar plus a plain text M) replace uncertain artwork in the screenshots. Copy these to Typecho's `/fixtures/` when reproducing. The reference used Arial, a solid background, simplified-Chinese labels, and disabled optional effects; PHP `display_errors=0` prevents legacy warnings from corrupting URLs. No certificate verification was disabled.

The reference server ran at 127.0.0.1:8770 and a real Firekylin site at :8771. `compare.cjs` records home geometry and screenshots; `EVIDENCE_DIR` selects the output directory (create it first). Reference capture blocks requests to non-local hosts. The old render/browser fixture scripts remain as lower-level diagnostics; they are not the real-site acceptance test.

`material-comparison.json` records **identical rectangles** for the two header cards, article card, article media and main container at 1440px and 390px. This is geometry evidence, not a pixel-equivalence assertion. Detail headings/body/mobile card treatment were also inspected and corrected.

| View | Typecho reference | Firekylin |
|---|---|---|
| Home desktop | [Screenshot](comparison-upstream-1440.png) | [Screenshot](comparison-firekylin-1440.png) |
| Home mobile | [Screenshot](comparison-upstream-390.png) | [Screenshot](comparison-firekylin-390.png) |
| Detail desktop | [Screenshot](comparison-upstream-post-1440.png) | [Screenshot](comparison-firekylin-post-1440.png) |
| Detail mobile | [Screenshot](comparison-upstream-post-390.png) | [Screenshot](comparison-firekylin-post-390.png) |

## Outstanding validation

Waline's default CDN JS/CSS failed certificate verification (`ERR_CERT_AUTHORITY_INVALID`); no bypass was attempted. Full client mount/login/submission remains blocked. Server comment gating/configuration checks pass. Browser-based admin setting persistence and omitted Typecho-specific features are not claimed; see the theme README for complete differences.
