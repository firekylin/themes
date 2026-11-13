/* Zzo Firekylin enhancements: no remote code; content/navigation work without JS. */
'use strict';
(() => {
  const palettes = ['dark', 'light', 'hacker', 'solarized', 'kimbie'];
  const selector = document.getElementById('palette');
  const apply = value => {
    if (!palettes.includes(value)) return;
    document.documentElement.dataset.palette = value;
    if (selector) selector.value = value;
  };
  try { apply(localStorage.getItem('firekylin-zzo-palette')); } catch (_) {}
  if (selector) {
    selector.closest('label').hidden = false;
    selector.addEventListener('change', () => {
      apply(selector.value);
      try { localStorage.setItem('firekylin-zzo-palette', selector.value); } catch (_) {}
    });
  }
  const toc = document.querySelector('.article-toc');
  const headings = [...document.querySelectorAll('.prose h2, .prose h3, .prose h4')];
  if (toc && headings.length) {
    const list = document.createElement('ul');
    headings.forEach((heading, index) => {
      if (!heading.id) {
        let id = 'zzo-section-' + index;
        while (document.getElementById(id)) id += '-';
        heading.id = id;
      }
      const item = document.createElement('li');
      item.className = 'toc-level-' + heading.tagName.toLowerCase();
      const link = document.createElement('a');
      link.href = '#' + encodeURIComponent(heading.id);
      link.textContent = heading.textContent;
      item.append(link); list.append(item);
    });
    toc.querySelector('nav').append(list);
    toc.hidden = false;
    toc.open = true;
  }
})();
