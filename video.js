(function () {
  const container = document.getElementById("videoSlider");
  const videos = [...container.querySelectorAll("video")];

  let index = 0;
  let direction = 1;
  let interval = null;

  // Determine number of videos visible based on screen width
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  // Highlight center video with zoom, opacity, border, and autoplay
  function highlightCenter() {
    const visible = getVisibleCount();
    const center = index + Math.floor(visible / 2);
    videos.forEach((video, i) => {
      video.style.transition = "transform 0.8s ease, opacity 0.8s ease, border 0.8s ease";
      video.style.transform = "scale(1)";
      video.style.opacity = "0.5";
      video.style.border = "none";
      video.muted = true;
      if (i === center) {
        video.style.transform = "scale(1.15)";
        video.style.opacity = "1";
        video.style.border = "3px solid #00aaff";
        if (video.paused) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  // Slide carousel by direction
  function slide(dir = null) {
    if (dir !== null) direction = dir;

    index += direction;

    const maxIndex = videos.length - getVisibleCount();
    if (index > maxIndex) {
      index = maxIndex;
      direction = -1;
    } else if (index < 0) {
      index = 0;
      direction = 1;
    }

    const slideWidth = videos[0].offsetWidth + 20;
    container.style.transition = "transform 4.5s ease-in-out";
    container.style.transform = `translateX(-${index * slideWidth}px)`;

    highlightCenter();
  }

  function startAutoSlide() {
    clearInterval(interval);
    interval = setInterval(() => {
      slide();
    }, 9000); // Slow and non-jittery
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  // Touch-based swipe
  let touchX = 0;
  container.addEventListener("touchstart", e => {
    touchX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 50) {
      stopAutoSlide();
      slide(delta < 0 ? 1 : -1);
      startAutoSlide();
    }
  });

  // Pause auto on hover or playback
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);
  videos.forEach(v => v.addEventListener("play", stopAutoSlide));
  videos.forEach(v => v.addEventListener("pause", startAutoSlide));

  window.addEventListener("resize", () => {
    highlightCenter();
    slide(0);
  });

  highlightCenter();
  slide(0);
  startAutoSlide();
})();
