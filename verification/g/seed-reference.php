<?php
require __DIR__ . '/config.inc.php';
\Widget\Init::alloc();
require_once __DIR__ . '/usr/themes/G/functions.php';
ob_start();$form=new Typecho_Widget_Helper_Form();themeConfig($form);ob_end_clean();
$settings=$form->getValues();
$settings['cdn']='';$settings['enableKatex']='0';$settings['background']='#fff';$settings['articleStyle']='0';$settings['profileAvatar']='';$settings['profileBG']='';$settings['themeShadow']='1';
$db->query($db->update('table.options')->rows(['value'=>'G'])->where('name = ?', 'theme'));
$db->query($db->delete('table.options')->where('name = ?', 'theme:G'));
$db->query($db->insert('table.options')->rows(['name'=>'theme:G','value'=>serialize($settings),'user'=>0]));
$db->query($db->update('table.options')->rows(['value'=>'G 测试博客'])->where('name = ?', 'title'));
$db->query($db->update('table.contents')->rows(['title'=>'G article','text'=>"<!--markdown-->\n## Content\n\nPublic content"])->where('type = ?', 'post'));
echo "G reference seeded\n";
