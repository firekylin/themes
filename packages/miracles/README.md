# Miracles for Firekylin

Source-guided Miracles banner and split-card reading layout. Reference: BigCoke233/miracles `c4450ad83e57ee3165cbb73fcf05bb4a16ab1502`, by Eltrac (518 stars at selection).

**License: SATA-BNP, with additional conditions.** Preserve notices, star/like the source project and thank the author; political publication/advocacy using this software is prohibited by the upstream terms. Read LICENSE and NOTICE.md. This is not represented as an unrestricted MIT theme.

Install in `themes/miracles` or legacy `www/theme/miracles`, then select it. Requires Firekylin 2.16.0+. No build required. `bannerUrl`, `bannerTitle`, `bannerHeight` (25–90 vh, default 45), intro/footer, accent and dark palette configure appearance. A local accessible button persists the visitor's palette preference. Lists use featuredImage, escaped custom fields.excerpt or public summary. Article heading/metadata appears in the banner, with a separate body panel below.

Supports public list/taxonomy/author pages, article/page/attachment, search/pagination, archives, empty/error pages, core content/password forms and native comments. No theme-level login drawer, custom navigation HTML, Typecho PJAX/Ajax comments, saying/bangumi pages, reward/share APIs, shortcode library, view counters or reading-time estimates. No unknown original artwork/vendor bundles included.

Verification: `pnpm test`, `pnpm test:browser`, Python packaging tests and actual core Widgets/comments via `FIREKYLIN_CORE_PATH=/path/to/firekylin`. VISUAL-COMPARISON.md distinguishes real upstream component rendering from full Typecho runtime validation.
