<?php
update_option('svbtle_options',['color'=>'#ff0000','theme_username'=>'Writer','rss-link'=>true,'google_analytics'=>'']);$menu=wp_get_nav_menu_object('Reference');set_theme_mod('nav_menu_locations',['primary'=>$menu->term_id]);update_option('sidebars_widgets',['wp_inactive_widgets'=>[],'array_version'=>3]);
