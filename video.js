document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("videoSlider");
  const videos = Array.from(container.querySelectorAll("video"));
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0;
  let autoplayInterval;
  let userTouched = false;

  /** Get how many videos per screen width */
  function getVideosPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 600) return 2;
    return 1;
  }

  /** Scroll and highlight center */
  function scrollToIndex(index) {
    const video = videos[index];
    if (!video) return;

    const offset = video.offsetLeft - (container.clientWidth - video.clientWidth) / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });

    videos.forEach((v, i) => {
      v.classList.toggle("active-video", i === index);
    });
  }

  /** Manual navigation */
  function goNext() {
    currentIndex = (currentIndex + 1) % videos.length;
    scrollToIndex(currentIndex);
    resetAutoplay();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    scrollToIndex(currentIndex);
    resetAutoplay();
  }

  /** Start autoplay forward only */
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!userTouched) {
        currentIndex = (currentIndex + 1) % videos.length;
        scrollToIndex(currentIndex);
      } else {
        userTouched = false;
      }
    }, 4000); // adjust autoplay speed
  }

  /** Pause + restart autoplay if user touches */
  function resetAutoplay() {
    userTouched = true;
    startAutoplay();
  }

  /** Event Bindings */
  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  /** Swipe Gesture Support */
  let startX = 0;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) goPrev();
    else if (dx < -50) goNext();
  });

  /** Resize Recalculation */
  window.addEventListener("resize", () => {
    scrollToIndex(currentIndex);
  });

  /** Kick things off */
  scrollToIndex(currentIndex);
  startAutoplay();
});
    
