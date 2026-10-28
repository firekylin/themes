# icefox source comparison

Reference revision: `797139b30e7b2f126d6bc5e5883c7f2b23cbcd47` (3.0.3).

- [Original screenshot](https://github.com/xiaopanglian/icefox/blob/797139b30e7b2f126d6bc5e5883c7f2b23cbcd47/screenshot.png)
  inspected directly: cover, overlapping lower-right avatar, author/avatar timeline,
  body-first text, media, timestamp and contextual action.
- [Header source](https://github.com/xiaopanglian/icefox/blob/797139b30e7b2f126d6bc5e5883c7f2b23cbcd47/components/head.php)
- [Layout CSS](https://github.com/xiaopanglian/icefox/blob/797139b30e7b2f126d6bc5e5883c7f2b23cbcd47/assets/css/icefox.css)

| Feature | Source | Port verification at 1280 / 390px |
|---|---|---|
| Main width | max-width 576px | 576 / 390px measured |
| Cover | 320px height, image/video | 320px measured; URL precedence tested |
| Profile | right aligned, overlaps cover bottom | overlap and configured link asserted |
| Feed | 36px avatar, 48px left column, author first | source classes retained; screenshots inspected |
| Media | one image / four cells / three columns | 4-image geometry and preview interaction checked |
| Detail | author/avatar aligned with content | distinct post template, full core body preserved |
| Controls | expanding text, color mode, media preview | disclosure, persistence, Escape/focus, no-JS tested |

`pnpm test:browser` produces `icefox-reference-layout-{1280,390}.png` and dark
variants in the CI artifact. `screenshot.png` shows the configured desktop layout;
`preview/mobile.png` shows mobile. Preview images are original synthetic SVGs,
not redistributed upstream car photos or avatars.

This is not a pixel-difference assertion or a running Typecho installation. The
upstream screenshot is a promotional mobile composition; desktop geometry is
checked against the pinned CSS. The linked upstream demo (`https://0ru.cn`) was
unreachable from this environment (`ERR_TUNNEL_CONNECTION_FAILED`, 2026-10-28).
No live Typecho plugin interactions were claimed or tested. Differences resulting
from the Firekylin data/API contract are documented in README.md.
