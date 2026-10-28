# Pinned comparison

Reference: [Sakura screenshot.jpg](https://github.com/mashirozx/sakura/blob/9a7a597ac18219bf4202b76c150bec6c16664b7c/screenshot.jpg) and tpl/content-thumb.php/header.php/layouts/imgbox.php/style.css at the same commit. The presentation shows a full-screen introduction and separate image/text reading cards on desktop, with stacked cards on mobile. It is a presentation composite, not an identical-data screenshot.

Inspected generated home/detail at 1280×900 and 390×900. Tests assert 800px column, 55% image split and alternation, 300px desktop cards, 210px mobile images, 300px mobile cover per source responsive rules, and text below mobile media. Source styles are retained rather than replaced by the Sakurairo cover-card layout. Ancestor artwork is not copied. Preview images are synthetic; screenshots are screenshot.png and preview/{mobile,post-desktop,post-mobile}.png.

No live WordPress installation or pixel-diff reference has been run. This is source-guided visual checking, not full parity certification. See README for missing WordPress features. Actual core rendering uses Firekylin a200d5887c702acb7c264776d9827f54e8389f09 with synthetic data. Interactions include TOC, image keyboard/Escape/focus, dark persistence and no-JS mobile menu. ZIP was installed through the actual core ThemeInstaller in an isolated directory.
