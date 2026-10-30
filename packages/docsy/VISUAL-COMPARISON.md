# Docsy visual verification
Reference: upstream repository screenshot (blue navbar docs view), plus theme/layouts/docs/baseof.html, theme/layouts/_td-content.html, theme/layouts/blog/list.html and theme/assets/scss/td/_sidebar-tree.scss,_sidebar-toc.scss,_content.scss,_nav.scss at46ecd3ffedccf77fa769ca70646d1b533300d4ee.

Preserved:64px blue header; 2/12 left,8/12 reading,2/12 TOC desktop grid;48px content side padding; pale left tree;36px bold main heading; separated right TOC and active anchor; year-grouped blog list with250x125 desktop thumbnail. At<1200 TOC disappears; at<768 directory collapses and top navigation scrolls. Native category/navigation list replaces Hugo section hierarchy. Screenshot's edit/issue/version controls omitted because no equivalent configured service exists. Current upstream default header supports body-background colors; deliberately use screenshot's blue preset. Local system font avoids external font requests.

verification/docsy contains real installed-ZIP SQLite evidence at1440/390, routes and interaction report. No upstream software executed. Remote comment submission excluded.
