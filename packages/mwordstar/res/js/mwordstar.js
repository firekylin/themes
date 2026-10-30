'use strict';
(()=>{
 const menu=document.querySelector('.native-menu'),desktop=matchMedia('(min-width:992px)');const resize=()=>{menu.open=desktop.matches};resize();desktop.addEventListener('change',resize);

 const toggle=document.getElementById('color-toggle');const apply=dark=>{document.body.classList.toggle('dark-color',dark);document.body.classList.toggle('light-color',!dark);toggle.setAttribute('aria-pressed',String(dark));toggle.textContent=dark?'浅色模式':'深色模式'};try{apply(localStorage.getItem('mwordstar-dark')==='true')}catch{}toggle.hidden=false;toggle.addEventListener('click',()=>{const dark=!document.body.classList.contains('dark-color');apply(dark);try{localStorage.setItem('mwordstar-dark',String(dark))}catch{}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.native-menu').forEach(d=>d.open=false)});
 const toc=document.getElementById('article-toc'),section=document.getElementById('toc-section');const headings=[...document.querySelectorAll('.post-content h2,.post-content h3,.post-content h4')];if(headings.length){section.hidden=false;headings.forEach((h,i)=>{if(!h.id){let id='mwordstar-heading-'+i;while(document.getElementById(id))id+='-';h.id=id;}const a=document.createElement('a');a.textContent=h.textContent;a.href='#'+encodeURIComponent(h.id);if(h.tagName==='H4')a.className='subheading';toc.append(a)})}
  document.querySelectorAll('.post-content img').forEach(img=>{
    if(img.closest('a,button'))return;const button=document.createElement('button');button.type='button';button.className='mwordstar-image-button';button.setAttribute('aria-label','放大图片：'+(img.alt||'图片'));img.before(button);button.append(img);
    button.addEventListener('click',()=>{const dialog=document.createElement('dialog');dialog.className='mwordstar-lightbox';const close=document.createElement('button');close.textContent='关闭';close.type='button';const image=img.cloneNode();dialog.append(close,image);document.body.append(dialog);close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{dialog.remove();button.focus();});dialog.showModal();close.focus();});
  });
})();
