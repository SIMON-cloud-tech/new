(function () {
  const container = document.getElementById("videoSlider");
  const videos = [...container.querySelectorAll("video")];
  let currentIndex = 0;
  let direction = 1;
  let interval = null;

  // --- Utility: how many videos to show at a time based on screen width
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  // --- Highlight and autoplay the center video
  function highlightCenter() {
    const visible = getVisibleCount();
    const centerIndex = currentIndex + Math.floor(visible / 2);

    videos.forEach((video, i) => {
      video.style.transition = "transform 0.7s ease, opacity 0.7s ease, border 0.7s ease";
      video.style.transform = "scale(1)";
      video.style.opacity = "0.5";
      video.style.border = "none";
      video.muted = true;

      if (i === centerIndex) {
        video.style.transform = "scale(1.15)";
        video.style.opacity = "1";
        video.style.border = "4px solid #3399ff";
        if (video.paused) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  // --- Slide videos in direction (+1 or -1)
  function slide(forcedDirection = null) {
    if (forcedDirection !== null) direction = forcedDirection;

    currentIndex += direction;
    const maxIndex = videos.length - getVisibleCount();

    // Bounce back when reaching either end
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
      direction = -1;
    } else if (currentIndex < 0) {
      currentIndex = 0;
      direction = 1;
    }

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

