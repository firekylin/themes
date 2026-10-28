# Sakura for Firekylin

Draft port of Sakura 3.4.0 for Firekylin >=2.16.0. Original 800px column, 300px alternating desktop cards (55% image), stacked 210px mobile images, full-width navigation, desktop cover/avatar/introduction, and reading typography are retained. Mobile cover is 300px with intro hidden following upstream CSS. The article page omits the home cover.

Supports native home/taxonomy/author feeds, details/pages/attachments, search with preserved keyword pagination, archive/directories, errors and Waline comments. Theme settings: cover, avatar, optional text logo, intro, fallback thumbnail, notice, section title, accent, reading font, auto/light/dark, footer and optional article-license text. Reading tools provide persistent color mode, TOC, reading progress/estimate, keyboard image dialog and no-JS navigation.

## Remaining differences

Not full upstream parity. WordPress enhanced comments, live avatars/Live2D, social icon/QR sliders, random cover service, video/HLS banner, music player, PJAX/infinite loading, animated reveal, rewards/likes/share APIs, friends/gallery templates and exhibition features remain unported. Font/icon/image assets with unreviewed provenance are excluded; system fonts and text controls replace them. Native disclosure replaces the mobile drawer. Color modes and lightbox are implemented without upstream vendor JS. Article views are not invented, and source default content-license claims are not applied automatically. Site owners may configure an accurate license text for their own content.

Source/resource audit: NOTICE.md. Visual checks and limitations: VISUAL-COMPARISON.md. All previews use synthetic data and original generated SVGs. Actual core Widget/comment rendering and installation do not imply a live database or remote comment-login test.

Validation from root: frozen pnpm install, Node/Python tests, browser checks; set FIREKYLIN_CORE_PATH for actual core classes and CHROMIUM_PATH for system Chromium. ZIP build uses scripts/build-registry.py and isolated installation uses scripts/check-port-install.js. No release/registry publication or deployment.
