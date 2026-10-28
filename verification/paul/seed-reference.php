<?php
require __DIR__ . '/config.inc.php';
\Widget\Init::alloc();
require_once __DIR__ . '/usr/themes/Paul/functions.php';
ob_start();$form=new Typecho_Widget_Helper_Form();themeConfig($form);ob_end_clean();
$settings=$form->getValues();
$settings['avatar']='http://127.0.0.1:8770/fixtures/paul-avatar.svg';$settings['background']='';$settings['custom_css']='body{background:#fff}body:before{background:none}';$settings['is_hidden_note']='0';
$db->query($db->update('table.options')->rows(['value'=>'Paul'])->where('name = ?', 'theme'));
$db->query($db->delete('table.options')->where('name = ?', 'theme:Paul'));
$db->query($db->insert('table.options')->rows(['name'=>'theme:Paul','value'=>serialize($settings),'user'=>0]));
$db->query($db->update('table.options')->rows(['value'=>'Paul 测试博客'])->where('name = ?', 'title'));
$db->query($db->update('table.contents')->rows(['title'=>'Paul article','text'=>"<!--markdown-->\n## Content\n\nPublic content"])->where('type = ?', 'post'));
echo "Paul reference seeded\n";
