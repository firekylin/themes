# Fixed upstream visual check

Starter 698fbb2d6828cb2dd6a71901b8b686b48143ab27 with its actual blox module
61f41d3667f1; local Hugo 0.169.0 extended build. System font pack and default theme
palette are upstream configuration choices. Synthetic profile, education, portrait,
publications/events/news replace all sample content. No upstream demo image copied.

Chromium 1280x900 and 390x900, 2026-10-28. Desktop/mobile home and article screenshots
were inspected. Biography dimensions closely match the running fixed source:

| Measurement | Upstream | Firekylin |
|---|---:|---:|
| Desktop header height |73.59|73.59|
| Desktop biography top/height |169.59 / 1018.50|169.59 / 1018.50|
| Desktop avatar x/y/size |113.33 / 297.59 / 200|113.33 / 297.59 / 200|
| Desktop education grid width/height |821.34 / 186|821.34 / 186|
| Mobile avatar x/y/size |95 / 181.59 / 200|95 / 180.59 / 200|
| Mobile biography height |1385.50|1385.50|
| Mobile education grid width/height |358 / 284|358 / 284|
| Featured card desktop/mobile width |210 / 278|210 / 278|

No whole-page pixel identity is claimed. Mobile header differs by 1px. Research
text spacing and native card metadata differ; no reading time/author portrait is
inferred from missing native data. Native citation controls are tested with supplied
BibTeX, whereas the reference sample has no citation attachment. Publication/event
metadata, footer/attribution and pagination reflect the native platform. The full
Hugo content/course sidebar tree is not implemented; detail reading/TOC columns are.

[Port desktop](screenshot.png) · [reference desktop](preview/upstream-desktop.png)
[Port mobile](preview/mobile.png) · [reference mobile](preview/upstream-mobile.png)
[Port article](preview/post-mobile.png) · [reference article](preview/upstream-post-mobile.png)

Reference project is under test/fixtures/academic-hugo. Build after restoring the
pinned Go modules and npm lockfile. Source CSS and source templates are retained;
no unlicensed image resources or external font download is required.
