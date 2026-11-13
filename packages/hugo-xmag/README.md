# XMag for Firekylin

XMag’s newspaper masthead with double rules, responsive three-column story cards and floated thumbnails.

Source https://github.com/yihui/hugo-xmag; pinned revision, author and original license in NOTICE.md and LICENSE. Retains the original system font stack. Thumbnails use native featuredImage values; content-image extraction, R Markdown edit links and Hugo author profiles are not implemented. No demonstration photos or external scripts are included.

Native posts, pages, attachments, archives, categories, tags, search, pagination, navigation and gated comments; requires Firekylin 2.17.1+. Footer author/text settings are supported. Hugo shortcodes and RSS generation are not ported. External Waline authentication/submission is untested. Editable CSS and Eta ship without a build step.

Actual ZIP install and desktop/mobile route tests: verification/hugo-xmag. No live upstream demo comparison or pixel-parity claim.

Category badges appear only when the native archive row supplies category relations (for example a category-filtered list). The default index API omits these relations, so no fabricated “Uncategorized” label is shown there.
