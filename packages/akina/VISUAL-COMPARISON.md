# Akina comparison

Source: Zisbusy/Akina-for-Typecho 0608252ffb5f263c7f88b3985a1f6645928fb1fa. Inspected Akina-img/Akina.jpg (desktop, tablet and phone displayed in device mockups), Akina/index.php, header.php, post.php and css/style.css. Source desktop hero is 550px, avatar 80px, dark translucent description, two slanted white lower panels. Reading entries use 100px round icons, title/date/excerpt, subtle separators; smaller mobile icons and hidden hero follow responsive source rules.

The independently written implementation restores these features without the original images/fonts/vendor code. Detail uses the source's plain centered title/date and narrow body variant, native heading TOC and dashed separators. Optional large featured post background, featured-by-ID discovery cards and separate home.php route are not implemented. Default public Widgets do not expose Typecho views/dynamic types; none are invented.

Compared synthetic Firekylin Chromium captures at 1280px/390px to source CSS and the original desktop/mobile mockup. This is source-guided visual inspection, not a full live Typecho or pixel difference comparison. Included screenshots contain synthetic local artwork only. Tests cover header/hero responsiveness, round thumbnail geometry, safe settings, TOC navigation, all eight routes, overflow, protected/empty content, core Widgets/comments and ZIP installation.
