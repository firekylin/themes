# Fixed upstream reference

Clone dillonzq/LoveIt into themes/LoveIt and checkout
b224a0ecc0a8caaca425a71188f2ce4b805e883f. Use Hugo 0.169.0 extended and Dart Sass
embedded 1.106.1 (sass-embedded-linux-x64/dart-sass on PATH), then run hugo here.
This configuration uses local upstream assets (cdn.data empty), fixed headers and
synthetic text/avatar. It does not require the upstream example site assets.

Serve public/ locally, then from the themes repository run:
LOVEIT_REFERENCE_URL=http://127.0.0.1:4178/ CHROMIUM_PATH=/usr/bin/chromium
node scripts/check-loveit-browser.js

The source reference is built locally; CI renders the native implementation and
runs its browser checks, rather than rebuilding the Hugo reference.
