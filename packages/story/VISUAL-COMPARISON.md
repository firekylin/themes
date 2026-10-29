# Story comparison

Reference: [original screenshot](https://github.com/txperl/Story-for-Typecho/blob/d51f5f731a82ccd1a1a4c176bbf57004cfb91f2b/screenshot.png) and the same revision's index.php, header.php, post.php, footer.php and assert/css/main.css. The image was downloaded and visually inspected without executing upstream PHP/JS. It is not a same-content pixel comparison or a running Typecho reference.

Real Firekylin 2.17.1 SQLite pages are captured under verification/story; report.json pins core/browser and tested routes. Actual repository ZIP builder and ThemeInstaller are used. Cards retain 300px height, 4px borders, lower-right date/title and 1280/960/640px grids. The 1440px capture has four columns; 390px has a single column. Reading layout is 728px with numbered menu, native h3/h4 TOC and image enlargement. Desktop/mobile screenshots were inspected.

Differences: the original screenshot's custom font is replaced by system fonts, dates use numeric YYYY-MM-DD, and the native list Widget does not provide category relations in this core version, so list category badges are omitted rather than fabricated. Badges still render when the archive provides categories. Seeded titles/content and post count differ. Pagination uses previous/next and current/total. Native navigation uses site navigation and semantic disclosures; fonts, animation timing, Typecho plugins and comment UI are not identical.

No image retouching or HTML overrides were applied to captures. Comment gating is verified, but external Waline authentication/submission is not. See README for unsupported Typecho features.
