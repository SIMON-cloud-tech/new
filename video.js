// 🎞️ Infinite Auto-Sliding Bidirectional Video Carousel (Final JS with Pause on Click)
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#videoSlider");
  let currentIndex = 0;
  let direction = 1;
  let visibleCount = getVisibleCount();
  let videos = Array.from(container.children);
  let auto = null;

  // Duplicate videos to allow infinite loop
  function duplicateVideos() {
    const clones = videos.map(v => v.cloneNode(true));
    clones.forEach(clone => container.appendChild(clone));
    videos = Array.from(container.children);
  }

  // Determine how many videos to show based on screen width
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 600) return 2;
    return 1;
  }

  // Move the carousel and zoom the central video
  function slide() {
    currentIndex += direction;
    if (currentIndex + visibleCount >= videos.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = videos.length - visibleCount;

    const slideWidth = videos[0].offsetWidth + 20; // includes gap
    container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    videos.forEach(v => v.classList.remove("active"));
    const center = currentIndex + Math.floor(visibleCount / 2);
    if (videos[center]) videos[center].classList.add("active");
  }

  // Start auto-slide
  function startAutoSlide() {
    if (auto) clearInterval(auto);
    auto = setInterval(slide, 3500);
  }

  // Stop auto-slide
  function stopAutoSlide() {
    if (auto) clearInterval(auto);
    auto = null;
  }

  // Handle swipe gestures
  let startX = 0;
  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });
  container.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    direction = dx < 0 ? 1 : -1;
    stopAutoSlide();
    slide();
    startAutoSlide();
  });

  // Pause auto-slide when a video is clicked
  container.addEventListener("click", e => {
    if (e.target.tagName === "VIDEO") {
      stopAutoSlide();
    }
  });

  // Update visible count and re-render on resize
  window.addEventListener("resize", () => {
    visibleCount = getVisibleCount();
    slide();
  });

  // Initialize
  duplicateVideos();
  slide();
  startAutoSlide();
});

  
