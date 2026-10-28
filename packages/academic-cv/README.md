# Academic CV for Firekylin

Independent MIT port of HugoBlox Academic CV. Requires Firekylin >=2.16.0.
Pinned starter and actual module versions, retained licenses, source and build
versions are in NOTICE.md and source/manifest.json.

The homepage preserves the gradient biography, avatar/name/role column, summary,
CV link, education cards and interests. Separate featured publication cards, APA
citation rows, event cards and news cards use actual public post records. Article
pages retain the desktop reading column/TOC geometry and academic metadata grid;
search, archives, taxonomy/author lists, pages, attachments and status pages are
implemented with native Widgets. Comments use Waline.

## Configure

`profileJSON` is a JSON object with name, role, affiliation, bio, authorLogin, avatarUrl,
avatarSize (small/medium/large/xl/xxl), avatarShape (circle/square/rounded), emoji,
cvUrl, cvLabel, education (array of degree/institution/year or start/end), interests
(array), and links (array of label/url). Text is escaped, not treated as HTML.
Set authorLogin to the exact native account name to render its configured author card on matching articles; no profile is assigned to other authors. URL fields accept HTTP(S) or root-relative URLs. Malformed JSON safely falls back
to site title/description; no fictional degree or profile data is generated.

Other settings: researchTitle/researchText, collectionLimit (10–500, default 100),
colorMode (auto/light/dark), footerText. Site navigation supplies the header menu.
Theme colors use upstream default light/dark palettes and upstream's system font
pack; external academic fonts/theme pack selection are not included.

For academic content, use native post custom fields (`options.fields`):

- academicType: publication or event; other/unset records are news.
- featured: true/"true" for the featured publications collection.
- authors: display string; publication and publicationKind: venue/type strings.
- bibtex: exact supplied citation text, displayed/copyable/downloadable as .bib.
- pdfUrl, codeUrl, slidesUrl, videoUrl; doi beginning with 10.<registrant>/.
- eventStart, eventEnd, location: event metadata strings.

Native featuredImage supplies card images. Homepage collections are drawn from the
latest collectionLimit public posts via Widget_Contents_Post_Recent; older records
remain accessible through native archives/search. This is an explicit bounded
window, not a claim to query the whole publication database. No schema migration or
new database tables are required. Citation content is never fabricated. Citations
work as expandable text without JS, and with JS use a dialog with copy/download,
Escape and focus return. Clipboard requires a secure context. Mobile navigation,
TOC, code copy and persisted light/dark mode are supported.

## Differences / unfinished upstream functionality

This is not the full HugoBlox block builder. Arbitrary block YAML, Hugo shortcodes,
multilingual author graphs, Pagefind client index, CSL/MLA citation formatting,
ORCID/BibTeX import, publication filters across the entire database, image processing,
calendar subscription, social share providers, math/diagrams/slides rendering, theme/font pack picker,
analytics, newsletter/forms, recommendation logic and course tree navigation are
not ported. Native server search replaces Pagefind. Metadata shows native date,
supplied authors and event fields; reading time and author avatars are not guessed.
Cards omit upstream reading-time metadata; document link buttons live in citation
rows and details. Native monthly archive groups replace Hugo's content sections.
Author links use text labels rather than the full social icon registry. The
reference site's publication content license/footer is not imposed on user content.

## Verification and installation

Frozen pnpm 10.29.3; 14 Node tests; 12 additional tests with actual Firekylin 2.16.0
Widget/comment classes; 7 Python tests; 16 general browser page checks; configured
profile/collection geometry, mobile/Escape, theme persistence, citation clipboard
and downloaded file content, focus restoration, TOC, code copy and no-JS tests.
Core pinned at a200d5887c702acb7c264776d9827f54e8389f09. These use synthetic rows,
not live database/login/end-to-end remote comments. See VISUAL-COMPARISON.md.

Run pnpm test; Python unittest discovery; FIREKYLIN_CORE_PATH=/path/to/core
node --test test/academic.test.js; CHROMIUM_PATH=/usr/bin/chromium pnpm test:browser.
Install the generated academic-cv-0.1.0.zip through the theme installer and select
Academic CV. No release, merge or deployment is part of this draft.
