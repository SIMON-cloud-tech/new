(function () {
  const track = document.querySelector(".videos-container"); // container holding all video slides
  const videos = [...track.querySelectorAll("video")]; // video elements
  const leftBtn = document.querySelector(".arrow.left"); // optional: left navigation arrow
  const rightBtn = document.querySelector(".arrow.right"); // optional: right navigation arrow

  let videoIndex = 0;
  let direction = 1;
  let autoSlide = null;

  // Get number of visible videos based on screen width
  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Highlight and zoom center video
  function scaleCenter() {
    const visible = getVisibleCount();
    const center = (videoIndex + Math.floor(visible / 2)) % videos.length;
    videos.forEach((video, i) => {
      video.style.transition = "transform 0.5s ease";
      video.style.transform = i === center ? "scale(1.19)" : "scale(1)";
      video.style.zIndex = i === center ? "1" : "0";
      video.style.opacity = i === center ? "1" : "0.5";
      video.muted = true;
      if (i === center) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  // Move the carousel to show videos at current index
  function updateScroll() {
    const videoWidth = videos[0].offsetWidth;
    track.scrollTo({ left: videoWidth * videoIndex, behavior: "smooth" });
    scaleCenter();
    lazyLoad(videoIndex);
  }

  // Start autoslide with bidirectional bounce
  function startAutoSlide() {
    autoSlide = setInterval(() => {
      const maxIndex = videos.length - getVisibleCount();
      videoIndex += direction;
      if (videoIndex >= maxIndex || videoIndex <= 0) {
        direction *= -1;
        videoIndex = Math.max(0, Math.min(maxIndex, videoIndex));
      }
      updateScroll();
    }, 4000); // slow and sleek
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // Arrows (if implemented in markup)
  leftBtn?.addEventListener("click", () => {
    direction = -1;
    videoIndex = (videoIndex - 1 + videos.length) % videos.length;
    updateScroll();
    resetAutoSlide();
  });

  rightBtn?.addEventListener("click", () => {
    direction = 1;
    videoIndex = (videoIndex + 1) % videos.length;
    updateScroll();
    resetAutoSlide();
  });

  // Swipe control for touch screens
  let startX = 0;
  track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  track.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      direction = diff < 0 ? 1 : -1;
      videoIndex = (videoIndex + direction + videos.length) % videos.length;
      updateScroll();
      resetAutoSlide();
    }
  });

  // Lazy load video sources ahead of scroll
  function lazyLoad(index) {
    const visible = getVisibleCount();
    const range = 2;
    for (let i = index - range; i <= index + visible + range; i++) {
      const realIndex = (i + videos.length) % videos.length;
      const video = videos[realIndex];
      if (video && !video.getAttribute("src")) {
        const dataSrc = video.getAttribute("data-src");
        if (dataSrc) {
          video.setAttribute("src", dataSrc);
        }
      }
    }
  }

  // Pause slide on hover or video interaction
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", startAutoSlide);
  videos.forEach(video => video.addEventListener("play", () => clearInterval(autoSlide)));

  window.addEventListener("resize", updateScroll);
  updateScroll();
  startAutoSlide();
})();
