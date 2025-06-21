const videoSlider = document.getElementById("videoSlider");
const videoElements = videoSlider.querySelectorAll("video");
const scrollAmount = 300;
let direction = 1;
let isReversing = false;
let autoSlide;

// Auto-start everything
window.addEventListener("load", () => {
  startAutoSlide();
  highlightCenterVideo();
});

// Autoslide logic
function startAutoSlide() {
  autoSlide = setInterval(slideVideos, 100);
}

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

function pauseBeforeNext() {
  clearInterval(autoSlide);
  bounceScroll(direction);
  setTimeout(() => {
    startAutoSlide();
    isReversing = false;
  }, 3000);
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

// Determine color from filename
function getGlowColor(src) {
  if (src.includes("warm")) return "rgba(255, 200, 80, 0.7)";
  if (src.includes("cool")) return "rgba(80, 180, 255, 0.5)";
  if (src.includes("dark")) return "rgba(0, 0, 0, 0.5)";
  if (src.includes("earth")) return "rgba(100, 70, 50, 0.5)";
  return "rgba(0, 0, 0, 0.4)";
}

// Center video detection + focus
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

    // Reset all
    video.style.transform = "scale(1)";
    video.style.boxShadow = "none";
    video.pause();
    video.muted = true;
    video.classList.remove("active-video");
  });

  if (closest) {
    closest.style.transform = "scale(1.15)";
    closest.muted = true;
    closest.play();
    closest.classList.add("active-video");

    const glowColor = getGlowColor(closest.src);
    closest.style.boxShadow = `0 0 20px ${glowColor}`;
  }
}

// Manual interaction
videoElements.forEach((video, index) => {
  if (index === 0) {
    video.play();
    video.classList.add("active-video");
    video.style.transform = "scale(1.15)";
    video.style.boxShadow = `0 0 20px ${getGlowColor(video.src)}`;
  }

  video.addEventListener("click", () => {
    videoElements.forEach(v => {
      if (v !== video) {
        v.pause();
        v.classList.remove("active-video");
        v.style.boxShadow = "none";
        v.style.transform = "scale(1)";
      }
    });

    if (video.paused) {
      video.play();
      video.classList.add("active-video");
      video.style.transform = "scale(1.15)";
      video.style.boxShadow = `0 0 20px ${getGlowColor(video.src)}`;
    } else {
      video.pause();
      video.classList.remove("active-video");
      video.style.boxShadow = "none";
      video.style.transform = "scale(1)";
    }
  });

  video.addEventListener("mouseenter", () => clearInterval(autoSlide));
  video.addEventListener("mouseleave", () => startAutoSlide());
});

// Arrow nav
document.querySelector(".prev").onclick = () =>
  videoSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });

document.querySelector(".next").onclick = () =>
  videoSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });

// Swipe
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
