'use strict';
(()=>{
 const toc=document.getElementById('article-toc'),overview=document.getElementById('site-overview'),tab=document.getElementById('toc-tab'),other=document.getElementById('overview-tab');
 const headings=[...document.querySelectorAll('.reading .post-content h2,.reading .post-content h3,.reading .post-content h4')];
 if(toc&&headings.length){headings.forEach((h,i)=>{if(!h.id){let id='sagiri-heading-'+i;while(document.getElementById(id))id+='-';h.id=id;}const a=document.createElement('a');a.textContent=h.textContent;a.href='#'+encodeURIComponent(h.id);if(h.tagName==='H4')a.className='subheading';toc.append(a)});tab.hidden=false;const select=active=>{toc.hidden=!active;overview.hidden=active;tab.setAttribute('aria-expanded',String(active));other.setAttribute('aria-expanded',String(!active))};tab.addEventListener('click',()=>select(true));other.addEventListener('click',()=>select(false));select(true);}
  document.querySelectorAll('.post-content img').forEach(img=>{
    if(img.closest('a,button'))return;const button=document.createElement('button');button.type='button';button.className='sagiri-image-button';button.setAttribute('aria-label','放大图片：'+(img.alt||'图片'));img.before(button);button.append(img);
    button.addEventListener('click',()=>{const dialog=document.createElement('dialog');dialog.className='sagiri-lightbox';const close=document.createElement('button');close.textContent='关闭';close.type='button';const image=img.cloneNode();dialog.append(close,image);document.body.append(dialog);close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{dialog.remove();button.focus();});dialog.showModal();close.focus();});
  });
})();
