<?php
require __DIR__ . '/config.inc.php';
\Widget\Init::alloc();
require_once __DIR__ . '/usr/themes/OneBlog/functions.php';
ob_start();$form=new Typecho_Widget_Helper_Form();themeConfig($form);ob_end_clean();
$settings=$form->getValues();
$settings['logoStyle']='text';$settings['switch']='off';$settings['AutoNightMode']='off';$settings['fontFamily']='default';$settings['CSS']='html{background-image:none}';$settings['GeetestID']='';
$db->query($db->update('table.options')->rows(['value'=>'OneBlog'])->where('name = ?', 'theme'));
$db->query($db->delete('table.options')->where('name = ?', 'theme:OneBlog'));
$db->query($db->insert('table.options')->rows(['name'=>'theme:OneBlog','value'=>serialize($settings),'user'=>0]));
$db->query($db->update('table.options')->rows(['value'=>'OneBlog 测试博客'])->where('name = ?', 'title'));
$db->query($db->update('table.contents')->rows(['title'=>'OneBlog article','text'=>"<!--markdown-->\n## Content\n\nPublic content"])->where('type = ?', 'post'));
echo "OneBlog reference seeded\n";
