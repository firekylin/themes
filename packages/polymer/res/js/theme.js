"use strict";
const drawer = document.querySelector('.mobile-drawer');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && drawer?.open) {
    drawer.open = false;
    drawer.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (drawer?.open && !drawer.contains(event.target)) drawer.open = false;
});
