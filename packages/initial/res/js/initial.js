document.querySelectorAll(".initial-toc").forEach((toc) => {
  document
    .querySelectorAll(".post-content h2,.post-content h3")
    .forEach((h, i) => {
      if (!h.id) h.id = "initial-heading-" + i;
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      toc.querySelector("nav").append(a);
    });
  toc.hidden = !toc.querySelector("a");
});
