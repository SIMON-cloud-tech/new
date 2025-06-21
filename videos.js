const videoSlider = document.getElementById("videoSlider");
const videoElements = videoSlider.querySelectorAll("video");
const scrollAmount = 300;
let direction = 1;
let isReversing = false;
let autoSlide;

// Initiate auto-slide after load
window.addEventListener("load", () => {
  startAutoSlide();
});

// Sliding logic
function slideVideos() {
  const maxScroll = videoSlider.scrollWidth - videoSlider.clientWidth;

  if (videoSlider.scrollLeft >= maxScroll && direction === 1 && !isReversing) {
    direction = -1;
    isReversing = true;
    pauseBeforeNext();
    return;
  } else if (videoSlider.scrollLeft <= 0 && direction === -1 && !isReversing) {
    direction = 1;
    isReversing = true;
    pauseBeforeNext();
    return;
  }

  videoSlider.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
  highlightCenterVideo();
}

function startAutoSlide() {
  autoSlide = setInterval(slideVideos, 100);
}

function pauseBeforeNext() {
  clearInterval(autoSlide);
  bounceScroll(direction);

  setTimeout(() => {
    startAutoSlide();
    isReversing = false;
  }, 1000);
}

function bounceScroll(dir) {
  const bounceSteps = [60, -30, 15, -8];
  let delay = 0;

  bounceSteps.forEach(step => {
    setTimeout(() => {
      videoSlider.scrollBy({ left: dir * step, behavior: "smooth" });
    }, delay += 100);
  });
}

function highlightCenterVideo() {
  const sliderCenter = videoSlider.scrollLeft + videoSlider.clientWidth / 2;
  let closest = null;
  let minDistance = Infinity;

  videoElements.forEach(video => {
    const videoCenter = video.offsetLeft + video.offsetWidth / 2;
    const distance = Math.abs(sliderCenter - videoCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closest = video;
    }

    video.style.transform = "scale(1)";
    video.pause();
    video.muted = true;
    video.classList.remove("active-video");
  });

  if (closest) {
    closest.style.transform = "scale(1.15)";
    closest.muted = true;

    if (window.innerWidth > 1024) {
      closest.play();
      closest.classList.add("active-video");
    }
  }
}

// Click-to-play & hover pause logic
videoElements.forEach((video, index) => {
  if (index === 0) {
    video.play();
    video.classList.add("active-video");
  }

  video.addEventListener("click", () => {
    videoElements.forEach(v => {
      if (v !== video) {
        v.pause();
        v.classList.remove("active-video");
      }
    });

    if (video.paused) {
      video.play();
      video.classList.add("active-video");
    } else {
      video.pause();
      video.classList.remove("active-video");
    }
  });

  video.addEventListener("mouseenter", () => clearInterval(autoSlide));
  video.addEventListener("mouseleave", () => startAutoSlide());
});

// Button Navigation
document.querySelector(".prev").onclick = () =>
  videoSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });

document.querySelector(".next").onclick = () =>
  videoSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });

// Swipe Navigation
let startX = 0;
videoSlider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  clearInterval(autoSlide);
});

videoSlider.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    videoSlider.scrollBy({ left: diff > 0 ? scrollAmount : -scrollAmount, behavior: "smooth" });
  }

  startAutoSlide();
});
