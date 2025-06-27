(function () {
  const track = document.getElementById("videoSlider");
  const videos = [...track.querySelectorAll("video")];
  let videoIndex = 0;
  let direction = 1;
  let autoSlide;

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function scaleCenter() {
    const visible = getVisibleCount();
    const center = (videoIndex + Math.floor(visible / 2)) % videos.length;
    videos.forEach((video, i) => {
      video.style.transition = "transform 0.5s ease, opacity 0.4s ease";
      video.style.transform = i === center ? "scale(1.18)" : "scale(1)";
      video.style.opacity = i === center ? "1" : "0.5";
      video.style.zIndex = i === center ? "1" : "0";
    });
  }

  function updateScroll() {
    const cardWidth = videos[0].offsetWidth + 20;
    track.scrollTo({ left: cardWidth * videoIndex, behavior: "smooth" });
    scaleCenter();
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      const maxIndex = videos.length - getVisibleCount();
      videoIndex += direction;
      if (videoIndex >= maxIndex || videoIndex <= 0) {
        direction *= -1;
        videoIndex = Math.max(0, Math.min(maxIndex, videoIndex));
      }
      updateScroll();
    }, 3500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // Swipe detection
  let startX = 0;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      direction = diff < 0 ? 1 : -1;
      videoIndex = (videoIndex + direction + videos.length) % videos.length;
      updateScroll();
      resetAutoSlide();
    }
  });

  // Pause on hover or play
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", startAutoSlide);
  videos.forEach(video => video.addEventListener("play", () => clearInterval(autoSlide)));

  window.addEventListener("resize", updateScroll);
  updateScroll();
  startAutoSlide();
})();

    
