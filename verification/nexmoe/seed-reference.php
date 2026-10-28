<?php
require __DIR__ . '/config.inc.php';
require __DIR__ . '/usr/themes/nexmoe/functions.php';
ob_start();$form=new Typecho_Widget_Helper_Form();themeConfig($form);ob_end_clean();
$settings=$form->getValues();
$settings['function']=[];$settings['tongji']='';
$settings['logoUrl']='http://127.0.0.1:8770/fixtures/avatar.svg';
$settings['background']='http://127.0.0.1:8770/fixtures/cover.svg';
$settings['mdui_css']='/fixtures/mdui/css/mdui.min.css';$settings['mdui_js']='/fixtures/mdui/js/mdui.min.js';$settings['jquery_js']='/fixtures/jquery.min.js';$settings['lazysizes_js']='/fixtures/lazysizes.min.js';$settings['highlight_js']='/usr/themes/nexmoe/source/js/highlight.pack.js';$settings['highlight_css']='';
$db->query($db->update('table.options')->rows(['value'=>'nexmoe'])->where('name = ?', 'theme'));
$db->query($db->delete('table.options')->where('name = ?', 'theme:nexmoe'));
$db->query($db->insert('table.options')->rows(['name'=>'theme:nexmoe','value'=>serialize($settings),'user'=>0]));
$db->query($db->update('table.options')->rows(['value'=>'Nexmoe 测试博客'])->where('name = ?', 'title'));
$db->query($db->update('table.contents')->rows(['title'=>'Nexmoe article','text'=>"<!--markdown-->\n## Content\n\nPublic content"])->where('type = ?', 'post'));
echo "Nexmoe reference seeded\n";
