# Embedded native media regression

PRs #275 and #277 identified unconstrained videos in ordinary post/page bodies.
The same gap affected all 38 themes in this batch when tested with a 1280 × 720
video and an audio element with an explicit 1280px width. The 36 previously
published themes listed in themes.json receive patch version increments here;
Detox (#284) and Frais (#285) receive the same fix in their migration PRs.

Each theme's live.cjs now installs its actual ZIP in an isolated Firekylin 2.17.1
SQLite site and checks post and page media at desktop/mobile viewport widths,
including the video's aspect ratio. All 38 live runs passed. Updated per-theme
reports and post screenshots record those runs. The poster is a generated SVG;
no external media is fetched and playback/network delivery is not claimed.

Run the fast template/browser regression with:

    CHROMIUM_PATH=/usr/bin/chromium node scripts/check-embedded-media.js

This check is also wired into the Test workflow with the runner's Chrome.
The full repository passed 1,557 Node tests and 8 Python tests locally.
