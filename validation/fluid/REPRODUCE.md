# Reproduce the pinned Fluid reference

Upstream: https://github.com/fluid-dev/hexo-theme-fluid
Commit: bcfd8bfe79f0818306cec090237c330df5534b73 (version 1.9.9)

Create a temporary Hexo site with reference-fixture/package.json, package-lock.json
and _config.yml. Put its `_posts` under `source/_posts` and cover.svg under
`source/fixture/cover.svg`. Run `npm ci`. Clone the unmodified upstream into
`themes/fluid` and check out the exact commit above; verify its HEAD.

Copy locally installed Bootstrap CSS and bootstrap.bundle.min.js into
source/vendor/bootstrap/css and source/vendor/bootstrap/js/bootstrap.min.js.
Copy jquery/dist/jquery.min.js to source/vendor/jquery/jquery.min.js, and
copy github-markdown-css/github-markdown.css to
source/vendor/github-markdown/github-markdown.min.css. These are local reference
runtime assets only and are not committed as theme assets.

Run `node node_modules/hexo/bin/hexo generate` in that site. Then from this repo:

```
FLUID_REFERENCE_PUBLIC=/path/to/site/public \
FIREKYLIN_CORE_PATH=/path/to/core node scripts/compare-fluid.js
```

The script serves the generated original and core-rendered Firekylin fixture,
blocks external browser requests, and captures home/post at 1280×900 and 390×900.
Optional original external icon/plugin resources therefore do not load. The
reference's own layout/CSS remains unchanged. Synthetic SVG geometry is used for
both banners and thumbnails; no upstream photos are copied. Typing/parallax and
external comments are disabled in the reference config to compare static layout.
Content metadata and excerpt length differ across engines; these are not
pixel-equality tests. Original and port images and measurement JSON are retained.
