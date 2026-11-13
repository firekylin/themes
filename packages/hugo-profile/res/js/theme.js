'use strict';

(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('#theme-toggle');
  let mode = '';
  try {
    mode = localStorage.getItem('hugo-profile-theme') || '';
  } catch {
    // The toggle remains usable when browser storage is unavailable.
  }
  const dark = mode === 'dark' || (!mode && matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', dark);
  if (toggle) {
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.addEventListener('click', () => {
      const next = !root.classList.contains('dark');
      root.classList.toggle('dark', next);
      toggle.setAttribute('aria-pressed', String(next));
      try {
        localStorage.setItem('hugo-profile-theme', next ? 'dark' : 'light');
      } catch {
        // Persistence is optional; applying the selected theme is not.
      }
    });
  }

  const toc = document.querySelector('aside.toc');
  const content = document.querySelector('#post-content');
  if (!toc || !content) return;
  const headings = content.querySelectorAll('h2,h3,h4');
  if (!headings.length) return;
  const list = document.createElement('ul');
  headings.forEach((heading, index) => {
    if (!heading.id) {
      let id = 'profile-section-' + index;
      while (document.getElementById(id)) id += '-';
      heading.id = id;
    }
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#' + encodeURIComponent(heading.id);
    link.textContent = heading.textContent;
    item.append(link);
    list.append(item);
  });
  toc.querySelector('nav').append(list);
  toc.hidden = false;
})();
