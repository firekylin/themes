# Kratos for Firekylin (draft)

Port of Kratos 4.3.4 to Firekylin 2.16+. Preserves its 300px landscape banner, transparent navigation, left thumbnail article feed, category labels, metadata strip and profile/recent/category/tag sidebar. Mobile uses stacked thumbnail cards and an expandable navigation menu.

Install the generated kratos-0.1.0.zip through Firekylin's theme installer. Configure banner title/subtitle/image, banner visibility, profile avatar/cover/name/text, thumbnails/default thumbnail, optional first-three-post carousel, light/dark/auto mode, accent and footer in the theme settings. Boolean text fields accept true/false. Images must be URLs you are authorized to use. Without images the layout uses plain color placeholders.

Includes home, article, page, attachment, search, archive/category/tag and error templates, native comments, filtered pagination, keyboard image dialog, heading directory, reading progress and manual carousel. Content/navigation work without JavaScript; all carousel entries remain visible. Mode preference is stored locally.

Not yet implemented: WordPress widget administration and arbitrary widget ordering, WordPress email/user center, view/like/reward systems, advertisements, WordPress-specific shortcodes/blocks, related/hot/random query widgets, social share services, and plugin-specific comment features. These omissions are not equivalent implementations. No database migration or WordPress compatibility layer is included. Core comments and public taxonomy/recent Widgets replace their platform-specific counterparts.

See NOTICE.md for provenance and VISUAL.md for the exact verification scope. This is a reviewable draft, not a claim of full upstream parity.
