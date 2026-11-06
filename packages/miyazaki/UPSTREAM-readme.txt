=== Miyazaki ===
Contributors: Anlino
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=anders%40andersnoren%2ese&lc=US&item_name=Free%20WordPress%20Themes%20from%20Anders%20Noren&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
Requires at least: 4.5
Requires PHP: 5.4
Tested up to: 7.1
Stable tag: trunk
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A stylish, contrast heavy theme for blogs, portfolios and magazines.


== Description ==

Miyazaki is a stylish, contrast heavy WordPress theme for blogs, portfolios and magazines. It features a masonry grid on the archive pages, a striking design, Block Editor/Gutenberg support, infinite scroll loading that can be set to load more posts on button click or when the visitor reaches the bottom of the page, threee widget areas in the footer, settings for what post meta to display on archive pages and on single posts, custom logo support, a search overlay that can be accessed from any page, and much more. Demo: https://miyazaki.andersnoren.se


== Installation ==

1. Upload the theme
2. Activate the theme


== Change pagination type ==

1. Log in to the administration panel of your site.
2. Go to Appearance → Customize.
3. Click the "Pagination" panel.
4. There are three options for the pagination:
	a. "Load more on button click": Displays a button that, when clicked, loads more posts without a hard reload.
	b. "Load more on scroll": When the visitor has reached the bottom of the page, more posts are loaded without a hard reload.
	c. "Previous and next page links": Displays links that, when clicked, takes the visitor to then next or previous archive page with a hard reload.
5. Select the type you want to use, and click the blue "Publish" button to save your changes.


== Frequently Asked Questions ==

= Where can I get support? =
Post your question in the Miyazaki support forum on WordPress.org: https://wordpress.org/support/theme/miyazaki/

= Where can I request a feature or report a bug? =
Open an issue in the Miyazaki GitHub repository: https://github.com/andersnoren/miyazaki


== Copyright ==

Miyazaki WordPress Theme, Copyright 2018-2026 Anders Norén
Miyazaki is distributed under the terms of the GNU GPL.


== Licenses ==

Charis SIL font
License: SIL Open Font License, 1.1, https://opensource.org/licenses/OFL-1.1
Source: https://fonts.google.com/specimen/Charis+SIL

Teko font
License: SIL Open Font License, 1.1, https://opensource.org/licenses/OFL-1.1
Source: https://fonts.google.com/specimen/Teko

Custom Made Icons and Fallback Image
License: GPLv2, https://www.gnu.org/licenses/gpl-2.0.html

Images in screenshot.jpg from P ixabay
NOTE: These assets were added while the site still featured a CC0 license, back in 2018. They are in the public domain.
License: Creative Commons Zero (CC0), https://creativecommons.org/publicdomain/zero/1.0/
Images (top left to bottom right):
- Polygon Rabbit: https://pix abay.com/sv/små-poly-djur-vektor-konst-polygon-3350170/
- Polygon Owl: https://www.pexels.com/photo/architecture-building-cars-pavement-169572/
- Polygon Deer: https://p ixabay.com/sv/hjort-polygoner-konst-design-natur-3275594/
- Polygon Dog: https://p ixabay.com/sv/hund-illustration-bakgrund-porträtt-3275593/


== Changelog ==

Version 2.3 (2026-11-03)
-------------------------
- Updated "Tested up to" in readme.txt to 7.1, to match style.css.
- Added a visible focus style to the menu and search toggles.
- Switched to the variable version of Teko, which replaces four font files with one smaller one.
- Trimmed the Charis SIL font files to Latin characters (including Latin Extended and Vietnamese), reducing their total size from 825 KB to 309 KB. Cyrillic characters are no longer included, and are displayed in a fallback font.
- Replaced deprecated jQuery methods (.keyup(), .resize() and .focus()) with .on() and .trigger().
- Fixed the block editor styles not loading in the iframed editor.
- Fixed the paths to the classic editor styles.
- Updated the demo URL in README.md.
- Added the Requires at least header to style.css.
- Added Description, FAQ, Copyright and Upgrade Notice sections to the readme.

Version 2.2.2 (2026-08-26)
-------------------------
- Fixed incorrect automated check notice for non-GPL assets.

Version 2.2.1 (2026-08-26)
-------------------------
- Bumped "Tested up to" to 7.1.
- Security: Fixed a broken access control vulnerability in the AJAX "load more" handler that could allow unauthenticated users to query and expose non-public content on archive pages.
- Security: Added nonce verification to the AJAX load more request to prevent forged cross-site requests to the endpoint.
- NEW: The lazy loading pagination is now limited to a whitelisted set of supported post types. It default to `post`, `page`, `product`, `jetpack-portfolio`, and `any` (search). It can be extended by hooking into the `miyazaki_allowed_post_types_for_lazy_loading` filter.
- Improved the styling of the links pagination.

Version 2.2 (2022-10-05)
-------------------------
- JS: Updated the smoothScroll to make the mobile menu support anchor links on the same page.

Version 2.1.2 (2022-09-19)
-------------------------
- Fixed the site header overlapping the WordPress admin bar.

Version 2.1.1 (2022-07-01)
-------------------------
- Improved fonts.css enqueue for child themes.

Version 2.1 (2021-06-29)
-------------------------
- Switched from the Google Fonts CDN to font files included in the theme folder.
- Replaced Charis SIL font files with versions from Google Fonts for reduced file size.
- Fixed alignwide element width on large screens.
- Updated "Tested up to" to 6.0.
- Removed www prefix from andersnoren.se URLs.

Version 2.0.4 (2020-09-12)
-------------------------
- Fixed the post meta controls in the Customizer not working since WordPress 5.5.

Version 2.0.3 (2020-08-12)
-------------------------
- Added escaping of `get_template_directory_uri()`.
- JS: Fixed compatibility with WordPress 5.5 by replacing `live()` with `on()`.
- Updated "Tested up to".

Version 2.0.2 (2020-06-05)
-------------------------
- Removed a reference to Chaplin in a comment in `construct.js`. 
- Fixed incorrect HTML closing element comment in `pagination.php`.
- Fixed navigation toggle being misaglined on mobile in Chrome (thanks, @antomal).
- Bumped "Tested up to" to 5.4.1.
- Added "Requires PHP" to readme.txt.
- Added "Requires PHP" and "Tested up to" to style.css, per new theme requirements.

Version 2.0.1 (2020-04-30)
-------------------------
- CSS: Updated Block Editor font size class targeting to be consistent across media queries.

Version 2.0.0 (2020-04-08)
-------------------------
- Moved editor style files to the `/assets/css/` folder.
- Moved classes from `functions.php` to the `/inc/classes/` folder.
- Block editor styles: Fixed targeting of headings.
- Block editor styles: Fixed button links having the wrong font due to markup changes in core.
- Updated Firefox text antialiasing to better match styling in Webkit/Blink browsers.
- Added a hover effect to the load more button.
- Changed "Tested up to" to 5.4.
- Restructured block CSS, added base block margins.
- Added hover effect to post meta links.
- Updated Button: Style Outline to match the footprint of a regular button.
- 5.4 Updates: Fixed social block style.
- 5.4 Updates: Calendar widget styles.
- General cleanup in `style.css`.
- Updated `style.css` TOC with the correct numbers of the sections in the CSS.
- Condensed widget area registration code.
- Check if widget area has widgets before outputting widget area wrapper element in the footer.
- Removed the "Comments are closed" message previously displayed when comments are closed on a post.

Version 1.10 (2020-02-15)
-------------------------
- Fixed a layout issue with Masonry
- Updated sub menus so they can be navigated with focus only
- Added a clearing block to the CSS
- Updated register sidebar args to include the ID of the widgets, and to make widget titles H2 elements
- Changed screenshot.png to a JPG file, reducing file size by two thirds
- Compressed the default fallback image
- Updated translateable strings to not include special characters
- Updated "Tested up to" to 5.3.2

Version 1.09 (2019-07-17)
-------------------------
- Fixed the wrong text domain being used for the skip link

Version 1.08 (2019-07-17)
-------------------------
- Added theme URI to style.css
- Updated "Tested up to"
- Added theme tags
- Added skip link
- Removed removal of focus outline
- Don't show comments if the post is password protected
- Don't show the post thumbnail if the post is password protected
- Fixed font issues in the block editor styles

Version 1.07 (2019-06-08)
-------------------------
- Updated updateHistory() to work with permalink structure without an ending slash
- Explicitly set links inside figcaption/.wp-caption-text to inline
- Spelling error in readme docs
- Added demo link to theme description

Version 1.06 (2019-04-07)
-------------------------
- Added the new wp_body_open() function, along with a function_exists check

Version 1.05 (2019-03-22)
-------------------------
- Added a Customizer option for hiding the search output in the header/mobile menu

Version 1.04 (2019-01-08)
-------------------------
- Fixed alignright pullquotes having the wrong width on large displays

Version 1.03 (2019-01-08)
-------------------------
- Fixed the front page title preventing line breaks

Version 1.02 (2018-12-26)
-------------------------
- Adjusted styling of content elements
- Added a search form to the menu overlay

Version 1.01 (2018-12-23)
-------------------------
- Improved display of blocks following titles
- Fixed pagination being displayed on pages

Version 1.00 (2018-12-23)
-------------------------
- Initial version


== Upgrade Notice ==

= 2.3 =
The Charis SIL font files now only include Latin characters (including Latin Extended and Vietnamese), which cuts them from 825 KB to 309 KB. Cyrillic text is now displayed in a fallback font. Also fixes the block editor styles in the iframed editor, and improves keyboard accessibility.
