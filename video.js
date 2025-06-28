(function () {
  const container = document.getElementById("videoSlider");
  const videos = [...container.querySelectorAll("video")];

  let index = 0;

  // Responsive visible count
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  // Smooth scroll to position
  function updateScroll() {
    const videoWidth = videos[0].offsetWidth + 20;
    container.style.transition = "transform 0.6s ease";
    container.style.transform = `translateX(-${index * videoWidth}px)`;
  }

  // Swipe gesture support
  let startX = 0;
  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 40) {
      const direction = delta < 0 ? 1 : -1;
      index += direction;

      const max = videos.length - getVisibleCount();
      if (index < 0) index = 0;
      if (index > max) index = max;

      updateScroll();
    }
  });

  // Recalculate on resize
  window.addEventListener("resize", () => {
    updateScroll();
  });

  // Initial position
  updateScroll();
})();
