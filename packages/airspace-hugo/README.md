# Airspace Hugo for Firekylin

Native Eta/Widget migration of Themefisher's MIT Airspace Hugo blog, pinned to
`afb922683c1b8f7a4f6425ca83fbbd8655694532`.

## Blog mapping

The white brand/navigation bar, wide dark centered title banner, 8/4 desktop
article/sidebar split, full-width article images, uppercase titles, muted date /
author / tag metadata, square violet read-more buttons, recent-post thumbnail
rows, ruled sidebar headings, rounded tag pills and light centered footer follow
the original blog templates. At tablet/mobile sizes, the sidebar stacks after
content and navigation wraps visibly without JavaScript. Body bold/italic,
nested lists, tables, code, images, audio and video retain native semantics.

Native post/page/attachment, search, pagination, archives, category/tag indexes
and taxonomy result routes are supported. Comments and password forms are
provided by Firekylin; no alternate authentication or third-party comment client
is added. Protected entries never use retained featuredImage options, including
core list redaction that removes the hash but retains other options.

## Configuration

`blogTitle` changes the home banner (default 博客). `footerText` changes footer
copy. Site title/description/navigation use core settings. Post options may use
`featuredImage` with a root-relative or HTTP(S) image URL.

## Intentional scope differences

This is the blog migration, not the upstream agency/business homepage. Portfolio
projects and filters, service/pricing tables, testimonials/carousels, maps,
contact-form delivery, checkout/shop pages, multilingual menus, Hugo shortcodes,
author-profile routes, lightboxes and Disqus are not migrated. Use native pages
for ordinary prose. Demo photos/logos are excluded; header defaults to a solid
color. System sans-serif replaces hosted Roboto, and metadata uses text instead
of icon fonts. Navigation stays visible rather than requiring Bootstrap JS.

## Verification

Run `node --test test/airspace-hugo.test.js`. Native core contract checks also
support `FIREKYLIN_CORE_PATH`. `verification/airspace-hugo/live.cjs` builds and
installs the actual theme ZIP in a disposable SQLite Firekylin site, checks native
routes, password and comments, responsive layout and media, then captures genuine
browser screenshots. CI installs CJK fonts before capture. See the report and
VISUAL-COMPARISON.md for evidence and limitations.
