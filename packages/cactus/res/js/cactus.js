'use strict';
const toggle=document.querySelector('#menu-toggle'), links=document.querySelector('#nav-links');
if(toggle&&links){toggle.hidden=false;links.classList.remove('responsive');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));links.classList.toggle('responsive',open);});}
const toc=document.querySelector('#toc');
if(toc){const list=document.createElement('ol');document.querySelectorAll('.e-content h2,.e-content h3').forEach((heading,i)=>{if(!heading.id)heading.id='cactus-section-'+i;const li=document.createElement('li'),a=document.createElement('a');a.href='#'+heading.id;a.textContent=heading.textContent;li.append(a);list.append(li);});toc.append(list);}
document.querySelectorAll('pre').forEach(pre=>{const button=document.createElement('button');button.className='copy-code';button.textContent='Copy';button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.querySelector('code')?.textContent||pre.textContent);button.textContent='Copied';}catch{button.textContent='Select code to copy';}});pre.after(button);});
