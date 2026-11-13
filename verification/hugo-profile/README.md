# Native Hugo Profile verification

The PNGs and `report.json` are unmodified output from [native integration run 43452387354](https://github.com/firekylin/themes/actions/runs/43452387354), at source commit `98a9657f7b9661422a7d92f2fc569fe27d2bd60e`. `provenance.json` records the GitHub artifact digest, each captured-file hash and the verified runtime file hashes. The package preview is byte-identical to `home-1440.png`.

The runner installs the actual theme ZIP with Firekylin's ThemeInstaller into a disposable SQLite site pinned to core `6b7c95cf43e0c6af70c71ac1e537d75a982e407e`. It uses local fonts plus installed Noto CJK fonts, blocks external page requests, and does not modify screenshots afterward.

Verified: 12 HTTP routes and 36 browser route/viewport combinations at 1440/768/390; three/two/one card columns; proper category nesting; bold/italic; long code/table containment; local image decoding; audio controls and video aspect ratio; native comments gating; private/draft exclusion; protected post/list/page metadata; wrong/correct native post and page passwords; public cover survival; optional hero excluded from author/taxonomy/page-two routes; light/dark persistence and storage failure; TOC anchors; navigation/search without JavaScript.

Pixel review covered desktop/tablet/mobile home and post, optional desktop/mobile profile, corrected dark home/post, category directories and mobile no-JavaScript search. An initial dark-surface cascade defect was fixed before this capture; current tests assert sidebar, code and card backgrounds in dark mode.

Limitations: no live upstream demo/pixel-diff comparison and no remote Waline authentication/submission. Local browser launch was unavailable, so all native browser evidence comes from the recorded CI run. The local HTTP-only runner is a separate, explicitly named subset. Later commits that add these screenshots/documentation do not change the recorded runtime files; final-head CI reruns the complete suite and native integration.
