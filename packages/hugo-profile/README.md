# Hugo Profile for Firekylin

Native Eta/Widget migration of [Hugo Profile](https://github.com/gurusabarish/hugo-profile), by GURU SABARISH. Upstream is pinned at `5fc40a91d6bab447e6e8685e05bbf47f39b214dd` under MIT. This is a blog-oriented port with an optional profile introduction, not a Hugo configuration interpreter.

## Preserved design

- Bootstrap 5.1.3 three/two/one-column cards at desktop/tablet/mobile sizes, 250px featured images, 12px rounded corners, broad blue-gray shadows and separate date/read footers.
- Original `#eaedf0` background, `#f8f9fa` cards, blue links, and light/dark colors.
- Alata headings and Lora body typography, served locally with normal, bold and italic Lora support.
- Centered article title/date, 9:3 article/sidebar proportions, rounded article image, styled quotes/code/tables, sticky TOC and taxonomy cards.
- Optional large-name profile hero based on upstream's homepage hero.

## Native features

Install the theme ZIP in Firekylin 2.17.1 or later. This package provides the eight native templates: home/filter list, post, page, attachment, search, archive, category directory and tag directory. Native Widgets own routes, escaping, pagination and access control. Comments use `firekylin.comment()` and native password forms are preserved.

Featured images use `post.options.featuredImage`. Protected rows do not render thumbnails, including core list rows that have lost the password hash but retain a cover URL. Detail content comes only from the native protected/unlocked Widget result. Attachment MIME types select a safe image/audio/video preview with a download fallback.

Navigation includes home, archive, categories, tags and search, plus deduplicated native site navigation. It wraps visibly on mobile and works without JavaScript. Search is the native server-side form, not an external JSON index. JavaScript only enhances the theme toggle and builds a TOC using text nodes from article headings. Both work without localStorage; without JavaScript, reading, links, pagination, search and native password submission remain usable.

## Homepage/profile mapping

Theme settings are plain text, not executable HTML:

- `profileTitle`: name/heading; enables the profile hero on homepage page one only. Leave blank for the upstream blog-list layout.
- `profileIntro`, `profileSubtitle`, `profileText`: introduction, large secondary heading and biography. The site description is the biography fallback.
- `profileImage`: your own licensed profile image, using a root-relative or HTTP(S) URL. No demo portrait is bundled.
- `profileLink`, `profileLinkLabel`: optional biography/contact/resume link. The link may point to a native page or a file you host.
- `footerText`: footer description; defaults to the site description.

The Hugo homepage's tabbed experience, education timelines, achievement/project galleries, contact-form service, social-icon data model, language switcher, gallery lightbox, Hugo shortcodes and JSON search index are **not migrated**. Use native Pages for biography/resume/project information and link them through Firekylin navigation. No structured profile records, translation routing, form submission service or downloadable resume is fabricated. Upstream automatic read-time, scroll progress and social-share clients are omitted. Site title, description and navigation use native site settings.

## Resource audit

See `NOTICE.md`, `SOURCE.json`, `LICENSE`, and `res/licenses/`. Exact upstream theme CSS is concatenated in `upstream.css`; Bootstrap is copied from the pinned upstream distribution with only its source-map reference removed. `theme.css` contains the native adaptations and accessibility/media overrides. No upstream demo photos, screenshots, favicon/404 illustration, Font Awesome, Viewer.js, Google Analytics, Google font requests or Disqus client are shipped. No runtime network dependency is required for theme rendering.

## Verification

`node --test test/hugo-profile.test.js` covers all templates, hostile text/URLs, protected cover suppression, homepage settings, filters, attachments and asset hashes. `verification/hugo-profile/live.cjs` installs the actual ZIP into a disposable SQLite Firekylin site and tests real routes, protected metadata and passwords, comment gating, 1440/768/390 widths, media controls, taxonomy DOM, typography, theme persistence, TOC, optional hero and no-JavaScript search. Set `HTTP_ONLY=1` for the server-only subset; this does not claim browser verification.

The workflow uses a pinned Firekylin core and publishes real browser screenshots and its report. Screenshots depict synthetic test content and an original geometric fixture, not upstream demo content. No live upstream demo comparison or remote Waline authentication/submission is claimed.
