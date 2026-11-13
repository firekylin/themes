=== Iwata ===
Contributors: Anlino
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=anders%40andersnoren%2ese&lc=US&item_name=Free%20WordPress%20Themes%20from%20Anders%20Noren&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
Requires at least: 4.4
Requires PHP: 5.4
Tested up to: 7.1
Stable tag: trunk
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A clean, colorful and lightweight theme for bloggers.


== Description ==

Iwata is a clean, colorful and lightweight theme for bloggers. It features a responsive design, great typography, support for the aside, quote and image post formats, Block Editor support, editor styles, Jetpack Infinite Scroll, custom accent color, custom background color and custom header image. Demo: https://iwata.andersnoren.se


== Installation ==

1. Upload the theme
2. Activate the theme

All theme specific options are handled through the WordPress Customizer.


== Frequently Asked Questions ==

= Where can I get support? =
Post your question in the Iwata support forum on WordPress.org: https://wordpress.org/support/theme/iwata/

= Where can I request a feature or report a bug? =
Open an issue in the Iwata GitHub repository: https://github.com/andersnoren/iwata


== Copyright ==

Iwata WordPress Theme, Copyright 2015-2026 Anders Norén
Iwata is distributed under the terms of the GNU GPL.


== Licenses ==

Fira Sans
License: SIL Open Font License, 1.1 
Source: https://fonts.google.com/specimen/Fira+Sans

FontAwesome
License: SIL Open Font License, 1.1 
Source: https://fontawesome.io

DoubleTapToGo.js
License: MIT License
Source: https://github.com/dachcom-digital/jquery-doubletaptogo

Image in screenshot.jpg
Ladtjovagge i Kebnekaise, by SiriusA
License: Public Domain
Source: https://commons.wikimedia.org/wiki/File:Kebnekaise-3.jpg


== Changelog ==

Version 2.1.2 (2026-11-03)
-------------------------
- Tested with WordPress 7.1.
- Fixed Jetpack Infinite Scroll adding the contents of the page <head> to the page when loading more posts.
- Replaced deprecated jQuery methods (.resize(), .click(), .focus() and .blur()) with .on() and .trigger().
- Fixed the block editor styles not loading in the iframed editor.
- Fixed a JavaScript error on the blog and archive pages when Jetpack Infinite Scroll isn't active.
- Hid the "Archives" archive header on the first page of the blog.
- Updated the demo URL.
- Added the Requires at least header to style.css.
- Replaced the photo in screenshot.jpg with a public domain image, and added its license information to the readme.
- Added Description, FAQ, Copyright and Upgrade Notice sections to the readme.

Version 2.1.1 (2022-07-01)
-------------------------
- Improved fonts.css enqueue for child themes.

Version 2.1 (2022-06-29)
-------------------------
- Switched from the Google Fonts CDN to font files included in the theme folder.
- Bumped "Tested up to" to 6.0.
- Removed www prefix from andersnoren.se URLs.

Version 2.0.0 (2020-05-12)
-------------------------
- Added the new `/assets/` folder.
- Moved JavaScript, editor styles, and FontAwesome files to the new assets folder.
- Changed doubleTapToGo to be a dependency for `global.js`.
- Added the version to enqueues, for cache busting.
- Replaced the `post-image` size with use of the post thumbnail size, updated to match size.
- Removed a admin style fix for post thumbnail max width that is no longer needed.
- Moved the `Iwata_Customize` class to the new `/inc/classes/` folder.
- Made `Iwata_Customize` pluggable.
- Renamed functions in `Iwata_Customize` to not be prefixed.
- Removed live preview from the Customizer.
- Removed unused "Theme Options" section in the Customizer.
– Cleaned up Customizer code.
- Removed unused enqueue of Genericons from the block editor styles.
- Renamed the "Regular" Gutenberg font size to "Normal" to match expected naming scheme.
- Removed license.txt.
- Updated featured image wrapper to use the `figure` element.
- Added `edit_post_link()` to end of `the_content()` on singular.
- Changed archive titles to use the `h1` element.
- Removed output of "Comments are closed" message.
- Restructured CSS reset.
- Updated old post content styles to style all elements, and grouped them in the Element Base CSS section.
- Moved block styles to their own CSS section, above the Entry Content CSS section.
- Added pseudo clearing classes and replaced old element clearing.
- Moved pagination from a function in `functions.php` to the new `pagination.php` file, to better fit expected structure.
- Added output of archive description, updated structure of archive header.
- Moved adjustments of archive title and archive description to filters in `functions.php`.
- Better block styles.
- Overall CSS cleanup.
- Updated CSS table of contents.
- Only output the CSS for the custom accent color if it differs from the default.
- Added base block margins, improved block styles overall.
- Bumped "Tested up to" to 5.4.1.
- Changed the file format of `screenshot.png` to JPG, reducing file size by 300 KB.
- Updated theme description.
- Cleaned up block editor styles.

Version 1.21 (2019-07-21)
-------------------------
- Added skip link
- Don't show comments if the post is password protected
- Don't show the post thumbnail if the post is password protected
- Fixed font issues in the block editor styles
- Better main menu display

Version 1.20 (2019-07-12)
-------------------------
- Fixed bug in the post meta conditional
- Added theme tags
- Updated "Tested up to"

Version 1.19 (2019-04-07)
-------------------------
- Added the new wp_body_open() function, along with a function_exists check

Version 1.18 (2018-12-20)
-------------------------
- Combined index.php, archive.php and search.php into index.php
- Combined single.php and page.php into singular.php
- Combined content-[format].php into content.php
- Removed CSS removing the outline on all links
- Changed search and nav toggle to button elements
- Removed old vendor prefixes

Version 1.17 (2018-12-07)
-------------------------
- Fixed Gutenberg style changes required due to changes in the block editor CSS and classes
- Fixed the Classic Block TinyMCE buttons being set to the wrong font

Version 1.16 (2018-11-30)
-------------------------
- Fixed Gutenberg editor styles font being overwritten

Version 1.15 (2018-10-28)
-------------------------
- Fixed incorrect colors being used in style.css for Gutenberg color settings
- Fixed the wrong default accent color being used in the Gutenberg editor styles

Version 1.14 (2018-10-27)
-------------------------
- Updated with Gutenberg support
	- Gutenberg editor styles
	- Styling of Gutenberg blocks
	- Custom Iwata Gutenberg palette
	- Custom Iwata Gutenberg typography styles
- Added option to disable Google Fonts with a translateable string
- Updated theme description
- Improved compatibility with < PHP 5.5
- Removed the languages sub folder, since that is handled by WordPress.org
- Adjustments to contrast

Version 1.13 (2018-05-24)
-------------------------
- Fixed output of cookie checkbox in comments

Version 1.12 (2017-12-03)
-------------------------
- Updated comments structure in functions.php
- Updated functions to be pluggable
- General code cleanup and readability improvements
- Updated closing element comments

Version 1.11 (2017-11-27)
-------------------------
- Fixed spelling error on 404.php

Version 1.10 (2017-11-25)
-------------------------
- Updated to the new readme.txt format, with changelog.txt incorporated into readme.txt
- Added demo link to the theme description in style.css
- Set the body elements in the theme to antialiased webkit font smoothing
- Improved the comment structure in functions.php
- Fixed closing element comments to appear next to the element in browser inspectors
- Updated title text on the 404 page
- Removed unneccessary rewind_posts() call in archive.php
- Fixed notices in comments.php
- General code cleanup to improve readability

Version 1.09 (2016-06-18)
-------------------------
- Added the new theme directory tags

Version 1.08 (2016-03-12)
-------------------------
- Removed wp_title() from header.php

Version 1.07 (2015-11-07)
-------------------------
- Replaced doubletaptogo.min.js (minified) with doubletaptogo.js (non-minifed) per theme review guidelines

Version 1.06 (2015-09-28)
-------------------------
- Added .screen-reader-text class

Version 1.05 (2015-07-19)
-------------------------
- Focus is now moved to the search field when clicking the search toggle
- Fixed a bug with the meta function
- Restructured the archive nav
- Restructured the Jetpack Infinite Scroll nav
- Added a function to change the text of the Infinite Scroll "Older posts" button
- Restructured the post nav
- Restructured the page title (on archive pages)
- Updated the Swedish translation
- Updated the editor styles to reflect styling changes
- Added a search form on mobile
- Minor styling tweaks

Version 1.04 (2015-07-16)
-------------------------
- Added post navigation to single posts
- Updated the Swedish translation
- Minor styling tweaks
- Updated screenshot.png

Version 1.03 (2015-07-16)
-------------------------
- Added DoubleTapToGo.js for touch devices
- Updated screenshot.png
- Updated the styling of tables
- Updated the styling of searches with no results
- Updated the styling of search fields in the post content
- Added the post meta function to pages
- Added post thumbnails to archive pages
- Added the aside, image and quote post formats

Version 1.02 (2015-07-14)
-------------------------
- Removed the page title link from single pages
- Made alterations to the design of the mobile menu

Version 1.01 (2015-07-14)
-------------------------
- Added licensing information for FontAwesome

Version 1.0 (2015-07-14)
-------------------------


== Upgrade Notice ==

= 2.1.2 =
Tested with WordPress 7.1. Fixes Jetpack Infinite Scroll and the block editor styles in the iframed editor.
