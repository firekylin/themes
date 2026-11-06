# m10c for Firekylin

Native port of vaga’s m10c: charcoal background, green links, 20rem fixed desktop profile sidebar, circular green-bordered optional avatar and compact dashed dated feed. Original SCSS is compiled using its default colors; native templates follow the upstream base/list/single structure.

Requires Firekylin 2.17.1+. Configure optional avatar URL in theme settings; site title/description/navigation and native footer settings supply personal information. Without an avatar the profile omits the image instead of copying an upstream identity. Sidebar becomes a centered header below 940px and scrolls independently for long menus on desktop.

Uses core public feeds, archives, taxonomy, GET search, pagination, protected articles and conditional comments. Hugo reading-time estimates, social icon collections, RSS, analytics and OpenGraph automation are omitted. Fixed default dark palette; no appearance switch. No upstream demo avatar, external font or runtime dependency bundled. Remote comment submission not tested. Source and MIT license are in NOTICE.md/LICENSE.
