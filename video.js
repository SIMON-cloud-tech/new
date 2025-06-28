(function () {

    const slideWidth = videos[0].offsetWidth + 20;
    container.style.transition = "transform 2.4s ease-in-out";
    container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    highlightCenter();
  }

  // --- Start auto sliding
  function startAutoSlide() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => slide(), 7000); // slow and smooth
  }

  // --- Stop sliding temporarily
  function stopAutoSlide() {
    clearInterval(interval);
    interval = null;
  }

  // --- Respond to swipe gestures
  let touchStartX = 0;
  container.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      stopAutoSlide();
      slide(delta < 0 ? 1 : -1); // left swipe = forward, right swipe = backward
      startAutoSlide();
    }
  });

  // --- On hover, pause autoplay
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);

  // --- On window resize, rescale and realign
  window.addEventListener("resize", () => {
    highlightCenter();
    slide(0);
  });

  // --- Init
  highlightCenter();
  slide(0);
  startAutoSlide();
})();

