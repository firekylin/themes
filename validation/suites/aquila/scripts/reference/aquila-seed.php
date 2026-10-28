<?php
$menu=wp_get_nav_menu_object('Reference');set_theme_mod('nav_menu_locations',['aquila-header-menu'=>$menu->term_id]);
$home=wp_insert_post(['post_type'=>'page','post_title'=>'纸上时光','post_content'=>'<p>记录生活，分享想法 · Notes on a slower life</p>','post_status'=>'publish']);
$blog=wp_insert_post(['post_type'=>'page','post_title'=>'Blog','post_status'=>'publish']);update_option('show_on_front','page');update_option('page_on_front',$home);update_option('page_for_posts',$blog);
update_option('widget_recent-posts',[2=>['title'=>'最新文章','number'=>5,'show_date'=>false],'_multiwidget'=>1]);update_option('widget_categories',[2=>['title'=>'分类','count'=>false,'hierarchical'=>false,'dropdown'=>false],'_multiwidget'=>1]);update_option('sidebars_widgets',['sidebar-1'=>['recent-posts-2'],'sidebar-2'=>['categories-2'],'wp_inactive_widgets'=>[],'array_version'=>3]);
echo get_permalink($blog);
