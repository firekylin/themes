<?php
$menu=wp_get_nav_menu_object('Reference');set_theme_mod('nav_menu_locations',['menu'=>$menu->term_id]);
$aid=wp_insert_attachment(['post_title'=>'Synthetic reference landscape','post_mime_type'=>'image/svg+xml','guid'=>'http://127.0.0.1:8097/cover.svg','post_status'=>'inherit'],'/var/www/html/cover.svg');
update_post_meta($aid,'_wp_attached_file','cover.svg');
wp_update_attachment_metadata($aid,['width'=>900,'height'=>500,'file'=>'cover.svg']);
foreach(get_posts(['numberposts'=>6]) as $p)set_post_thumbnail($p->ID,$aid);
