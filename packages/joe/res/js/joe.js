document.querySelectorAll(".joe-banner").forEach((banner) => {
  const slides = banner.querySelector(".joe-slides");
  const controls = banner.querySelector(".joe-slide-controls");
  if (slides.children.length < 2) return;
  controls.hidden = false;
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    slides.scrollBy({
      left: Number(button.dataset.direction) * slides.clientWidth,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  });
});
