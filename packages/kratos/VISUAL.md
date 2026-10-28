# Visual and runtime verification

Reference: Kratos 4.3.4 at 6be10d3a97c125f612e0b7ab9f29e9b72828283a, upstream screenshot.png and PHP/CSS source. Source screenshot was inspected alongside generated desktop/mobile images. There is no live WordPress reference instance, mobile reference screenshot or pixel-diff result; mobile checks validate source-derived geometry and usability, not measured pixel parity.

At 1280px the browser asserts a 300px banner, 256x144px thumbnails, non-overlapping article text and adjacent sidebar. At 390px it asserts a 290px banner, thumbnail above text, hidden sidebar and usable menu. Metadata follows the thumbnail. Screenshots are in screenshots/ and use synthetic content/media, not upstream artwork.

Local verification: 15 Node tests against real core Widget classes and comment renderer (Firekylin a200d5887c702acb7c264776d9827f54e8389f09), plus 7 registry/build Python tests. Browser checks cover 16 route/viewport combinations, overflow, resource errors, menu, carousel previous/next, directory, keyboard image dialog and focus restoration, saved dark mode and no-JavaScript behavior. Core widgets run with synthetic rows and mocked data access; this is not a live database or HTTP integration test.

The repository ZIP builder and actual core ThemeInstaller are exercised against an isolated temporary directory. CI runs fixture rendering, registry and browser checks; local actual-core and installer checks require FIREKYLIN_CORE_PATH and are not claimed as CI coverage. Nothing is deployed or merged.

Commands: node --test test/*.test.js; python3 -m unittest discover -s test -p 'test_*.py'; CHROMIUM_PATH=/usr/bin/chromium FIREKYLIN_CORE_PATH=/workspace/firekylin node scripts/check-ports-browser.js; same environment node scripts/check-kratos-browser.js; FIREKYLIN_CORE_PATH=/workspace/firekylin node scripts/check-port-install.js after ZIP generation.
