# Verification provenance

Refreshed against source commit `bb0216a59a0bf1419ac7c0cafef8ee2cb1afeb9f`
on 2026-11-13 using Firekylin 2.18.1, core revision
`6b7c95cf43e0c6af70c71ac1e537d75a982e407e`, and Chromium 154.0.8037.57.
The screenshots and reports in this directory supersede the historical capture
from source 532e70ec6c4d35398868eb4c481f1503117ada6d.

The unmodified `live.cjs` installed the actual theme ZIP in a disposable SQLite
site and passed 33 route/viewport checks at 1440, 768 and 390 pixels. It also
verified protected listing thumbnail omission, locked details, wrong-password
rejection and successful native password unlock; five palettes, persistence,
TOC folding, navigation without JavaScript and comment gating passed.

An independent browser supplement passed 30 route/viewport checks at the same
widths, including actual taxonomy results, directory DOM containment, header
and footer placement, home-only masthead, exactly five recent links, 40px/32px
article titles at weight 900, bold weight 700 and italic text, visible 54px audio
controls and contained 16:9 video. See `supplemental-browser.json`. This supplement
restored synthetic public content only in the disposable SQLite fixture after
the privacy test; it did not modify theme or core source. Screenshots were taken
by the original harness before that supplemental fixture modification.

All six refreshed home/article screenshots were visually inspected, including
768px and 390px layouts and visible audio controls. The package screenshot is the
1440px home capture. No live upstream demo comparison or remote comment-provider
login/submission was performed. This refresh changes only generated evidence,
the package screenshot and this provenance document.

A subsequent test/documentation-only refinement requires HTTP 200 responses
and positively asserts the redacted protected entry (and list permalink) inside
the main content region, preventing a blank/error response from passing the
privacy assertions. Theme templates, assets and the captured fixture are unchanged.
