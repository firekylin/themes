const headings = [
  ...document.querySelectorAll(".post-content h2,.post-content h3"),
];
headings.forEach((h, i) => {
  if (!h.id) h.id = "jj-heading-" + i;
});
document.querySelectorAll(".jj-toc,.jj-mobile-toc").forEach((toc) => {
  for (const h of headings) {
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    toc.querySelector("nav").append(a);
  }
  toc.hidden = !headings.length;
});
