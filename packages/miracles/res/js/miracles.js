const button = document.querySelector(".miracles-palette");
try {
  const mode = localStorage.getItem("miracles-color");
  if (mode) document.body.classList.toggle("fk-dark", mode === "dark");
} catch {}
if (button) {
  button.hidden = false;
  const sync = () =>
    button.setAttribute(
      "aria-pressed",
      String(document.body.classList.contains("fk-dark")),
    );
  sync();
  button.addEventListener("click", () => {
    document.body.classList.toggle("fk-dark");
    sync();
    try {
      localStorage.setItem(
        "miracles-color",
        document.body.classList.contains("fk-dark") ? "dark" : "light",
      );
    } catch {}
  });
}
