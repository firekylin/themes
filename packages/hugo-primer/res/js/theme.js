"use strict";
const target=document.getElementById('toc');
const headings=[...document.querySelectorAll('.prose h2,.prose h3,.prose h4')];
if(target&&headings.length){const label=document.createElement('strong');label.textContent='文章目录';target.append(label);const list=document.createElement('ul');headings.forEach((heading,index)=>{if(!heading.id){let id='primer-heading-'+(index+1);while(document.getElementById(id))id+='-';heading.id=id;}const row=document.createElement('li'),link=document.createElement('a');link.textContent=heading.textContent;link.href='#'+encodeURIComponent(heading.id);row.append(link);list.append(row);});target.append(list);target.hidden=false;}
