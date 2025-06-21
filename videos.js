const videoSlider = document.getElementById("videoSlider");
const videoElements = videoSlider.querySelectorAll("video");
const scrollAmount = 300;
let direction = 1;
let isReversing = false;

// Start auto sliding
let autoSlide = setInterval(slideVideos, 100);

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
}

function pauseBeforeNext() {
  clearInterval(autoSlide);
  bounceScroll(direction); // Add bounce effect

  setTimeout(() => {
    autoSlide = setInterval(slideVideos, 100);
    isReversing = false;
  }, 1000); // Match bounce timing
}

function bounceScroll(dir) {
  const bounceSteps = [60, -30, 15, -8]; // Directional bounce sequence
  let delay = 0;

  bounceSteps.forEach(step => {
    setTimeout(() => {
      videoSlider.scrollBy({ left: dir * step, behavior: "smooth" });
    }, delay += 100);
  });
}

// Click-to-play logic and hover pause/resume
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
  video.addEventListener("mouseleave", () => {
    autoSlide = setInterval(slideVideos, 100);
  });
});

// Navigation buttons
document.querySelector(".prev").onclick = () =>
  videoSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });

document.querySelector(".next").onclick = () =>
  videoSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });

// Swipe support
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

  autoSlide = setInterval(slideVideos, 100);
});
