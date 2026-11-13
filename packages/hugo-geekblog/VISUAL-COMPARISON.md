# Visual comparison

Reference: pinned Hugo Geekblog Sass and layouts at a7375a423cc034c351ba875c460b91d82e524c75. The original 60rem container, #205375 masthead, #112b3c nav/footer, outlined nav entries, 2rem article spacing, dashed list separators, font files and automatic/light/dark color variables are retained. See source/ and NOTICE.md.

Native differences: accessible button for palette cycling; details/summary mobile menu instead of hidden checkbox, native server search and taxonomy directories, text metadata/control symbols instead of third-party icon font, optional owner brand image instead of upstream SVG. Firekylin article content is not synthesized from Hugo shortcodes.

Actual Firekylin ZIP-install evidence is committed in verification/hugo-geekblog: report.json covers 22 desktop/mobile route checks, native search/navigation without JavaScript, palette persistence, visible audio controls, and protected post/page SECRET metadata regressions. supplemental-browser.json adds 24 viewport/page checks for real taxonomy/archive DOM containment and rich text. The evidence uses official core 6b7c95cf43e0c6af70c71ac1e537d75a982e407e and runtime source head f2a71d7407d88b717b2904beb58ce81dd387ca74. Packages screenshot.png is the actual installed native home at 1440px, not the upstream image.

Native mobile article, category and dark-home screenshots were visually reviewed: CJK labels render, the child category and counts remain in the main column, media fit, audio controls are visible at 54px, and the light/dark palettes are legible. Upstream images/screenshot.png was inspected only as a design reference. No live upstream demo or remote comment-provider submission was tested.
