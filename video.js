document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#videoSlider");
  let currentIndex = 0;
  let direction = 1;
  let visibleCount = getVisibleCount();
  let videos = Array.from(container.children);
  let auto = null;

  function duplicateVideos() {
    const clones = videos.map(v => v.cloneNode(true));
    clones.forEach(clone => container.appendChild(clone));
    videos = Array.from(container.children);
  }

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 600) return 2;
    return 1;
  }

  function slide(forcedDir = null) {
    if (forcedDir !== null) direction = forcedDir;
    currentIndex += direction;
    if (currentIndex + visibleCount >= videos.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = videos.length - visibleCount;

    const slideWidth = videos[0].offsetWidth + 20;
    container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    videos.forEach(v => v.classList.remove("active"));
    const center = currentIndex + Math.floor(visibleCount / 2);
    if (videos[center]) videos[center].classList.add("active");
  }

  function startAutoSlide() {
    if (auto) clearInterval(auto);
    auto = setInterval(() => slide(), 3500);
  }

  function stopAutoSlide() {
    if (auto) clearInterval(auto);
    auto = null;
  }

  // Swipe detection with immediate directional slide
  let startX = 0;
  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 30) {
      const newDir = dx < 0 ? 1 : -1;
      stopAutoSlide();
      slide(newDir); // immediately apply direction
      startAutoSlide();
    }
  });

  // Pause auto-slide when video is interacted with
  container.addEventListener("click", e => {
    if (e.target.tagName === "VIDEO") stopAutoSlide();
  });

  window.addEventListener("resize", () => {
    visibleCount = getVisibleCount();
    slide();
  });

  duplicateVideos();
  slide();
  startAutoSlide();
});
