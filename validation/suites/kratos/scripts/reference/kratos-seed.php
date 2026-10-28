<?php
update_option('siteurl','http://127.0.0.1:8097'); update_option('home','http://127.0.0.1:8097');update_option('posts_per_page',6);
foreach(get_posts(['numberposts'=>-1,'post_status'=>'any']) as $p) wp_delete_post($p->ID,true);
$cat=wp_insert_term('随笔','category',['slug'=>'notes']);$cid=is_wp_error($cat)?get_term_by('slug','notes','category')->term_id:$cat['term_id'];
$titles=['山间来信 · Letters from the mountains','让文字回到阅读本身','A small notebook of everyday things','城市漫步与一些想法','代码、设计与生活','把时间留给值得的事'];
foreach($titles as $i=>$title){$body='<p>在忙碌的日常中，留一点时间记录观察与思考。</p><h2>阅读与记录</h2><p>A quiet place for words, ideas and stories.</p><pre><code>const greeting = "Hello, Firekylin";</code></pre><p><img src="/cover.svg" alt="Synthetic landscape"></p>';wp_insert_post(['post_title'=>$title,'post_name'=>'article-'.($i+1),'post_content'=>$body,'post_excerpt'=>'在忙碌的日常中，留一点时间记录观察与思考。A quiet place for words, ideas and stories.','post_status'=>'publish','post_date'=>'2026-10-28 08:00:0'.(6-$i),'post_author'=>1,'post_category'=>[$cid],'tags_input'=>['生活']]);}
wp_update_user(['ID'=>1,'display_name'=>'纸上时光','description'=>'记录生活，分享想法 · Notes on a slower life']);
update_option('kratos_options',['top_img_switch'=>true,'top_img'=>'/cover.svg','top_title'=>'纸上时光','top_describe'=>'记录生活，分享想法 · Notes on a slower life','g_thumbnail'=>true,'g_postthumbnail'=>'/cover.svg','g_login'=>false]);
update_option('widget_about',[2=>['background'=>'/cover.svg'],'_multiwidget'=>1]);update_option('widget_posts',[2=>['number'=>5,'order'=>'new'],'_multiwidget'=>1]);update_option('widget_tags',[2=>['number'=>8],'_multiwidget'=>1]);update_option('sidebars_widgets',['home_sidebar'=>['about-2','posts-2','tags-2'],'single_sidebar'=>['about-2','posts-2','tags-2'],'wp_inactive_widgets'=>[],'array_version'=>3]);
$menu=wp_create_nav_menu('Reference'); if(is_wp_error($menu)) $menu=wp_get_nav_menu_object('Reference')->term_id;
foreach(wp_get_nav_menu_items($menu)?:[] as $item)wp_delete_post($item->ID,true);
foreach(['首页'=>'/','归档'=>'/?year=2026','分类'=>'/?cat='.$cid,'关于'=>'/?page_id=2'] as $label=>$url){wp_update_nav_menu_item($menu,0,['menu-item-title'=>$label,'menu-item-url'=>$url,'menu-item-type'=>'custom','menu-item-status'=>'publish']);}set_theme_mod('nav_menu_locations',['header_menu'=>$menu]);echo 'Seeded reference';
