"use strict";
// Native accessible equivalents of the upstream click-only drawer and TOC.
const menu = document.querySelector('.sk3-menu');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (menu?.open && !menu.contains(event.target)) menu.open = false;
});
const content = document.querySelector('.prose');
const headings = content ? [...content.querySelectorAll('h2,h3,h4')] : [];
if (headings.length) {
  const toc = document.createElement('details');
  toc.className = 'sk3-toc box';
  const summary = document.createElement('summary');
  summary.textContent = '☰ 文章目录';
  toc.append(summary);
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', '文章目录');
  headings.forEach((heading, index) => {
    if (!heading.id) {
      let id = 'sk3-heading-' + index;
      while (document.getElementById(id)) id += '-';
      heading.id = id;
    }
    const link = document.createElement('a');
    link.href = '#' + encodeURIComponent(heading.id);
    link.className = 'toc-' + heading.tagName.toLowerCase();
    link.textContent = heading.textContent;
    nav.append(link);
  });
  toc.append(nav);
  content.before(toc);
}
