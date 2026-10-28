# Rebuild the fixed source reference

Use Hugo 0.169.0 extended. Clone alex-shpak/hugo-book into themes/hugo-book at
f221265b113c6e2b93cbdd98b7b63e3503d5a3aa, then run hugo in this fixture directory.
Serve public/ locally. This fixture contains only synthetic text created for this
port; do not substitute upstream example photos or sample content.

BOOK_REFERENCE_URL=http://127.0.0.1:4177/ CHROMIUM_PATH=/usr/bin/chromium
node scripts/check-book-browser.js (from repository root) compares geometry and
captures both implementations. The ordinary CI job does not rebuild upstream;
it exercises the native render and browser checks from the committed fixture.
