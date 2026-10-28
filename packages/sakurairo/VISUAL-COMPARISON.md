# Comparison and limits

Pinned source: [Sakurairo 3.1.0 at 21534bb86cfe061718842ea45c33449ff1331732](https://github.com/mirai-mamori/Sakurairo/tree/21534bb86cfe061718842ea45c33449ff1331732).

The upstream screenshot.jpg is a branding/presentation graphic, not a comparable rendered home page. It was inspected but not used to claim pixel equality. The reference is the pinned header.php/layouts/imgbox.php, tpl/content-thumbcard.php and original styles: 860px content; 300px cards; 68% cover region with hover extension; floating date/meta at the top; blurred title plate near the cover bottom; excerpt below. Mobile responsive rules place metadata vertically. This differs materially from ancestor Sakura's alternating cards.

Inspected local 1280×900 and 390×900 home/detail output with synthetic cover/avatar/card images and dark mode. Tests assert cover/card/content dimensions, title/excerpt separation, all six card visibility, footer following the final card, accessible mobile menu, TOC, image Enter/Escape/focus restoration, persisted dark mode and no-JS navigation. Fixed upstream CSS assumptions about JS reveal and fixed footer were replaced explicitly. No upstream photos are redistributed.

Screenshots: screenshot.png, preview/mobile.png, preview/post-desktop.png, preview/post-mobile.png. A live WordPress installation and an identical-data pixel diff have **not** been performed. Therefore this is a source-guided adaptation, not verified full visual parity. Unsupported features and intentional differences are listed in README.

Validation uses actual Firekylin core Widget/comment classes at `a200d5887c702acb7c264776d9827f54e8389f09` with synthetic data; no database/remote comment login. ZIP install uses the actual core ThemeInstaller in a temporary directory.
