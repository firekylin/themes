/* Original Firekylin adapter controls, MIT. */
(() => {
  const button = document.querySelector("[data-single-dark]");
  function apply(dark) {
    document.body.classList.toggle("fk-dark", dark);
    document.body.classList.toggle("dark-theme", dark);
    button.setAttribute("aria-pressed", String(dark));
  }
  try {
    const saved = localStorage.getItem("single-color-mode");
    if (saved) apply(saved === "dark");
  } catch {}
  button.hidden = false;
  button.addEventListener("click", () => {
    const dark = !document.body.classList.contains("fk-dark");
    apply(dark);
    try {
      localStorage.setItem("single-color-mode", dark ? "dark" : "light");
    } catch {}
  });
})();
