/* Argon Firekylin interactions, GPL-3.0-only, 2026-10-28. */
'use strict';
(() => {
  const root=document.documentElement, modeButton=document.querySelector('[data-mode]');
  const modes=['auto','light','dark','black'],media=matchMedia('(prefers-color-scheme: dark)');
  let mode=root.dataset.colorMode;
  try {const saved=localStorage.getItem('argon-color-mode');if(modes.includes(saved))mode=saved;} catch {}
  function paint(){const dark=mode==='dark'||mode==='black'||mode==='auto'&&media.matches;root.classList.toggle('darkmode',dark);root.classList.toggle('amoled-dark',mode==='black');document.body.classList.toggle('fk-dark',dark);modeButton.textContent={auto:'◑',light:'☀',dark:'☾',black:'●'}[mode];modeButton.setAttribute('aria-label',`颜色模式：${mode}，点击切换`);root.dataset.activeMode=mode;}
  paint();media.addEventListener('change',paint);modeButton.hidden=false;modeButton.addEventListener('click',()=>{mode=modes[(modes.indexOf(mode)+1)%modes.length];try{localStorage.setItem('argon-color-mode',mode);}catch{}paint();});
  const article=document.querySelector('#post_content');if(!article)return;
  // Password-protected content must not reveal an invented reading estimate.
  if(!article.querySelector('[name="protectPassword"]')){const time=document.querySelector('.reading-time');time.textContent=`约 ${Math.max(1,Math.ceil((article.textContent||'').length/400))} 分钟`;time.hidden=false;}
  const catalog=document.querySelector('#leftbar_catalog');
  article.querySelectorAll('h2,h3,h4').forEach((heading,i)=>{if(!heading.id)heading.id=`argon-heading-${i}`;const li=document.createElement('li'),a=document.createElement('a');a.href='#'+encodeURIComponent(heading.id);a.textContent=heading.textContent;li.style.marginLeft=(Number(heading.tagName[1])-2)*10+'px';li.append(a);catalog.append(li);});
  document.querySelector('.catalog').hidden=!catalog.children.length;
  const progress=document.querySelector('#reading-progress');progress.hidden=false;
  function updateProgress(){const rect=article.getBoundingClientRect();progress.value=Math.min(100,Math.max(0,100*(innerHeight-rect.top)/Math.max(rect.height,1)));}
  addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
  const dialog=document.querySelector('.image-viewer');let trigger;
  article.querySelectorAll('img').forEach(img=>{if(img.closest('a'))return;img.classList.add('zoomable');img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','查看图片：'+(img.alt||'文章图片'));function open(){trigger=img;const shown=dialog.querySelector('img');shown.src=img.currentSrc||img.src;shown.alt=img.alt;dialog.showModal();}img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>trigger?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
})();
