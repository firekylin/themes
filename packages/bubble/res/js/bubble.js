/* Bubble Firekylin heading navigation, MIT. */
(() => {
  const menu = document.querySelector(".bubble-toc");
  if (!menu) return;
  const headings = document.querySelectorAll(
    ".post-content h2,.post-content h3",
  );
  for (const [i, heading] of headings.entries()) {
    if (!heading.id) heading.id = "bubble-section-" + i;
    const link = document.createElement("a");
    link.textContent = heading.textContent;
    link.href = "#" + encodeURIComponent(heading.id);
    menu.querySelector("nav").append(link);
  }
  menu.hidden = headings.length === 0;
})();
