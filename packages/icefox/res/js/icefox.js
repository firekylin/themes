/* Firekylin icefox adaptation, GPL-3.0-only. No Typecho API requests. */
(() => {
  const root = document.documentElement,
    toggle = document.querySelector("[data-theme-toggle]");
  function apply(dark) {
    root.classList.toggle("dark", dark);
    document.body.classList.toggle("fk-dark", dark);
    toggle.setAttribute("aria-pressed", String(dark));
  }
  try {
    const saved = localStorage.getItem("icefox-color-mode");
    if (saved) apply(saved === "dark");
  } catch {}
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const dark = !root.classList.contains("dark");
    apply(dark);
    try {
      localStorage.setItem("icefox-color-mode", dark ? "dark" : "light");
    } catch {}
  });
  const nav = document.querySelector(".top-container");
  const update = () => nav.classList.toggle("scrolled", scrollY > 240);
  addEventListener("scroll", update, { passive: true });
  update();
  const video = document.querySelector(".header-container video");
  if (video && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.autoplay = false;
    video.pause();
  }
  const dialog = document.querySelector(".icefox-lightbox");
  let origin;
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-preview-image]");
    if (!link || !dialog.showModal) return;
    event.preventDefault();
    origin = link;
    dialog.querySelector("img").src = link.href;
    dialog.showModal();
  });
  document
    .querySelector("[data-close-image]")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    dialog.querySelector("img").removeAttribute("src");
    origin?.focus();
  });
})();
