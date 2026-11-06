# DeepThought for Firekylin

Source https://github.com/RatanShreshtha/DeepThought; pinned revision and attribution in NOTICE.md. Includes MIT licenses for theme and Bulma, original Sass, unmodified Jost fonts and SIL OFL license.

Preserves the centered profile heading, rounded/shadowed Bulma post cards, Jost typography, red Read More links, blue taxonomy chips and article box. The profile homepage and original blog section are combined for Firekylin. Native wrapping navigation replaces the upstream JS burger. Manual dark mode retains the original inversion technique, with counter-inversion for images/video/code/iframes; preference persists locally. HTML explicitly pins Bulma light variables as upstream does, avoiding double-darkening. Without JavaScript it remains light.

Supports Firekylin 2.17.1+ posts/pages/attachments, archives/categories/tags/search/pagination, configured navigation, optional profileImage/authorName/footerText and gated comments. Zola TOC, shortcodes, multilingual builds, reading-time, previous/next article navigation, icon social services, search modal, galleries, maps, KaTeX and chart integrations are omitted. Remote comment authentication/submission is not tested. No upstream demo media, analytics or remote scripts included.

Actual ZIP/SQLite route and responsive media checks plus screenshots are in verification/zola-deepthought. Tests cover no-JavaScript navigation/search, comment/privacy gating, local font loading and manual palette persistence. Visual comparison uses pinned source templates and Sass, not live-demo pixel parity. Shipped CSS/Eta requires no build to edit.
