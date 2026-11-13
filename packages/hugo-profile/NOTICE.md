# Source and asset attribution

Hugo Profile by GURU SABARISH, MIT, copyright 2021. Source: https://github.com/gurusabarish/hugo-profile/tree/5fc40a91d6bab447e6e8685e05bbf47f39b214dd . The full notice is retained in `LICENSE`.

The port was made after inspecting `_default/list.html`, `_default/single.html`, `_default/baseof.html`, `partials/head.html`, `partials/sections/header.html`, `partials/sections/hero/index.html`, footer partials and `static/css/{theme,header,footer,list,single,index,font}.css`. The first six style files are concatenated in `res/css/upstream.css`. Native Eta/Widgets, safe setting URLs, wrapping navigation, TOC generation and media containment are Firekylin adaptations.

Bootstrap 5.1.3 CSS comes from the same theme pin's `static/bootstrap-5/css/bootstrap.min.css`. Only the absent source-map reference is removed. Copyright 2011–2021 Twitter, Inc. and The Bootstrap Authors; complete MIT notice is in `res/licenses/Bootstrap-MIT.txt`, retrieved from the official v5.1.3 tag. Bootstrap JavaScript is not bundled.

Alata and Lora font files come from https://github.com/google/fonts/tree/b78877b777ed3a18a1b431b0df7d8ee3f84c2e5f/ofl . Alata is copyright 2016 The Alata Project Authors; Lora is copyright 2011 The Lora Project Authors. Their complete SIL Open Font License 1.1 notices are in `res/licenses/Alata-OFL.txt` and `Lora-OFL.txt`. Local filenames are normalized, with original paths and SHA-256 hashes recorded in `SOURCE.json`. Font files are otherwise unchanged.

Excluded assets: upstream example photographs, portrait, screenshots, favicon and 404 image; Font Awesome; Viewer.js; Google font CSS requests; analytics; Hugo search/shortcode/gallery clients; Disqus and contact-form integrations. The native verification SVG is an original geometric test fixture created for these tests and is not shipped as a profile photo or article thumbnail.
