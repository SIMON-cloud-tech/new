document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".videos-container");
  const videos = Array.from(container.querySelectorAll("video"));
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0;
  let autoplayDirection = 1;
  let autoplayInterval;
  let videoPerView = getVideosPerView();

  /** Get videos per screen size */
  function getVideosPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  /** Update the current center zoom */
  function updateCenterZoom(index) {
    videos.forEach((video, i) => {
      video.classList.toggle("active-video", i === index);
    });
  }

  /** Scroll to index */
  function scrollToIndex(index) {
    const target = videos[index];
    if (target) {
      const offsetLeft = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
      updateCenterZoom(index);
    }
  }

  /** Go to next video */
  function goNext() {
    currentIndex = (currentIndex + 1) % videos.length;
    scrollToIndex(currentIndex);
  }

  /** Go to previous video */
  function goPrev() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    scrollToIndex(currentIndex);
  }

  /** Start autoplay loop */
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (currentIndex + autoplayDirection >= videos.length || currentIndex + autoplayDirection < 0) {
        autoplayDirection *= -1; // reverse direction
      }
      currentIndex += autoplayDirection;
      scrollToIndex(currentIndex);
    }, 4000); // slow loop speed
  }

  /** Handle manual navigation */
  nextBtn.addEventListener("click", () => {
    goNext();
    startAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    goPrev();
    startAutoplay();
  });

  /** Swipe support */
  let touchStartX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) goPrev();
    if (dx < -50) goNext();
    startAutoplay();
  });

  /** Responsive recalculation */
  window.addEventListener("resize", () => {
    videoPerView = getVideosPerView();
    scrollToIndex(currentIndex);
  });

  /** Init */
  scrollToIndex(currentIndex);
  startAutoplay();
});
