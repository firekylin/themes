document.querySelectorAll(".butterfly-toc").forEach((toc) => {
  document
    .querySelectorAll(".post-content h2,.post-content h3")
    .forEach((heading, i) => {
      if (!heading.id) heading.id = "butterfly-heading-" + i;
      const link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      toc.querySelector("nav").append(link);
    });
  toc.hidden = !toc.querySelector("a");
});
