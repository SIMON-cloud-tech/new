document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("videoSlider");
  const videos = Array.from(container.querySelectorAll("video"));
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0;
  let autoplayDirection = 1;
  let autoplayInterval;

  /** Calculate how many videos are visible per view */
  function getVideosPerView() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 600) return 2;
    return 1;
  }

  let videosPerView = getVideosPerView();

  /** Scroll to a specific index and highlight it */
  function scrollToIndex(index) {
    const video = videos[index];
    if (!video) return;

    const offset = video.offsetLeft - (container.clientWidth - video.clientWidth) / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });

    videos.forEach((v, i) => {
      v.classList.toggle("active-video", i === index);
    });
  }

  /** Navigation logic */
  function goNext() {
    currentIndex = (currentIndex + 1) % videos.length;
    scrollToIndex(currentIndex);
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    scrollToIndex(currentIndex);
  }

  /** Autoplay carousel with directional awareness */
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (
        currentIndex + autoplayDirection >= videos.length ||
        currentIndex + autoplayDirection < 0
      ) {
        autoplayDirection *= -1;
      }
      currentIndex += autoplayDirection;
      scrollToIndex(currentIndex);
    }, 4000); // Adjust loop speed here
  }

  /** Manual navigation triggers */
  nextBtn.addEventListener("click", () => {
    goNext();
    startAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    goPrev();
    startAutoplay();
  });

  /** Handle swipe gestures for touch devices */
  let touchStartX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 50) goPrev();
    else if (deltaX < -50) goNext();
    startAutoplay();
  });

  /** Recompute layout on resize */
  window.addEventListener("resize", () => {
    videosPerView = getVideosPerView();
    scrollToIndex(currentIndex);
  });

  /** Initialize everything */
  scrollToIndex(currentIndex);
  startAutoplay();
});
