# Pinned original comparison

Upstream: https://github.com/probberechts/hexo-theme-cactus
Commit: 7a6074d830ac5d524582f142ac524c041077aad7
Hexo: 7.3.0. Exact reference-site dependencies and synthetic content are in
reference-fixture. No upstream images, fonts or library binaries are committed.

1. Copy reference-fixture into a temporary directory and run `npm ci` there.
2. Clone the upstream into that directory's `themes/cactus`, and check out the
   exact commit above. Verify `git rev-parse HEAD` before generating.
3. Run `node node_modules/hexo/bin/hexo generate` in the temporary site.
4. From this repository, set `CACTUS_REFERENCE_PUBLIC` to that site's `public`
   directory and `FIREKYLIN_CORE_PATH` to a Firekylin core checkout; run
   `node scripts/compare-cactus.js`.

The local reference theme is unchanged. The synthetic site configuration hides
its logo, disables CDNs and external integrations and supplies the same main
headings and article content as the Firekylin fixture. Screenshots use upstream
local fonts/icons; the port uses system fonts and text controls. Content metadata
is not byte-identical: the reference uses tag 生活, while the core fixture supplies
category 随笔. Highlight output differs by renderer. These are not pixel-equality
tests. The reference is a real Hexo-generated site; the port renders actual core
Widget/comment classes over synthetic data, not a running database blog.
