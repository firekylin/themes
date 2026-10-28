/* Original Jasmine Firekylin controls, GPL-3.0-only. */
(() => {
  const b = document.querySelector("[data-jasmine-dark]");
  function apply(dark) {
    document.body.classList.toggle("fk-dark", dark);
    b.setAttribute("aria-pressed", String(dark));
  }
  try {
    const v = localStorage.getItem("jasmine-color-mode");
    if (v) apply(v === "dark");
  } catch {}
  b.hidden = false;
  b.addEventListener("click", () => {
    const dark = !document.body.classList.contains("fk-dark");
    apply(dark);
    try {
      localStorage.setItem("jasmine-color-mode", dark ? "dark" : "light");
    } catch {}
  });
  const toc = document.querySelector(".jasmine-toc");
  if (toc) {
    document
      .querySelectorAll("#post-content h2,#post-content h3")
      .forEach((h, i) => {
        if (!h.id) h.id = "jasmine-heading-" + i;
        const a = document.createElement("a");
        a.href = "#" + encodeURIComponent(h.id);
        a.textContent = h.textContent;
        toc.querySelector("nav").append(a);
      });
    toc.hidden = !toc.querySelector("a");
  }
})();
