<?php
require __DIR__ . '/config.inc.php';
require __DIR__ . '/usr/themes/material/functions.php';
ob_start();$form=new Typecho_Widget_Helper_Form();themeConfig($form);ob_end_clean();
$settings=$form->getValues();
$settings['langis']='1';$settings['switch']=[];$settings['footersns']=[];
$settings['slogan']='一生想做自由极客';
$settings['BGtype']='0';$settings['bgcolor']='#f5f5f5';$settings['CustomFonts']='Arial, sans-serif';
$settings['dailypic']='http://127.0.0.1:8770/fixtures/cover-0.svg';$settings['logo']='http://127.0.0.1:8770/fixtures/logo.svg';$settings['avatarURL']='http://127.0.0.1:8770/fixtures/avatar.svg';

$db->query($db->update('table.options')->rows(['value'=>'material'])->where('name = ?', 'theme'));
$db->query($db->delete('table.options')->where('name = ?', 'theme:material'));
$db->query($db->insert('table.options')->rows(['name'=>'theme:material','value'=>serialize($settings),'user'=>0]));
$db->query($db->update('table.options')->rows(['value'=>'Material 测试博客'])->where('name = ?', 'title'));
$db->query($db->update('table.options')->rows(['value'=>'一生想做自由极客'])->where('name = ?', 'description'));
$db->query($db->update('table.contents')->rows(['title'=>'Material 的第一篇文章','text'=>"<!--markdown-->\n## 文章内容\n\n保留原主题的卡片、布局和导航。This is a long bilingual article excerpt.\n\n<img src=\"http://127.0.0.1:8770/fixtures/cover-1.svg\" alt=\"\">"])->where('type = ?', 'post'));
echo "Reference fixture seeded\n";
