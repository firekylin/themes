'use strict';
(() => {
  const menu=document.querySelector('.story-menu');
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && !document.querySelector('dialog[open]')){document.querySelectorAll('.story-tools details[open]').forEach(d=>d.open=false);if(menu?.open){menu.open=false;menu.querySelector('summary').focus();}}});
  const toc=document.getElementById('torTree'),toggle=document.querySelector('.story-toc-button');
  const headings=[...document.querySelectorAll('.post-content h3,.post-content h4')];
  if(toc && toggle && headings.length){
    const list=toc.querySelector('.torArcTile');
    headings.forEach((heading,index)=>{if(!heading.id){let id='story-heading-'+index;while(document.getElementById(id))id+='-';heading.id=id;}const link=document.createElement('a');link.href='#'+encodeURIComponent(heading.id);link.textContent=heading.textContent;link.className=heading.tagName==='H3'?'tori':'torii';list.append(link);});
    toggle.hidden=false;toc.hidden=toc.dataset.open!=='true';toggle.setAttribute('aria-expanded',String(!toc.hidden));
    toggle.addEventListener('click',()=>{toc.hidden=!toc.hidden;toggle.setAttribute('aria-expanded',String(!toc.hidden));});
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){list.querySelectorAll('a').forEach(link=>link.classList.toggle('on',decodeURIComponent(link.hash.slice(1))===entry.target.id));}})},{rootMargin:'-10% 0px -60% 0px'});headings.forEach(h=>observer.observe(h));
  }
  document.querySelectorAll('.story-comments').forEach(details=>{details.addEventListener('toggle',()=>{details.querySelector('summary').textContent=details.open?'hide comments':'show comments';});if(location.hash.startsWith('#comment'))details.open=true;});
  document.querySelectorAll('.post-content img').forEach(img=>{
    if(img.closest('a,button'))return;const button=document.createElement('button');button.type='button';button.className='story-image-button';button.setAttribute('aria-label','放大图片：'+(img.alt||'图片'));img.before(button);button.append(img);
    button.addEventListener('click',()=>{const dialog=document.createElement('dialog');dialog.className='story-lightbox';const close=document.createElement('button');close.textContent='关闭';close.type='button';const image=img.cloneNode();dialog.append(close,image);document.body.append(dialog);close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{dialog.remove();button.focus();});dialog.showModal();close.focus();});
  });
})();
