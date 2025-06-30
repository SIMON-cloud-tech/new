const slider = document.getElementById('videoSlider');
const videos = slider.querySelectorAll('video');
const nextBtn = document.querySelector('.nav.next');
const prevBtn = document.querySelector('.nav.prev');

let index = 0;
let direction = 1;
let autoScrollInterval;
let swipeStartX = 0;

// Determine videos per view
function getVisibleCount() {
  const w = window.innerWidth;
  if (w >= 900) return 3;
  if (w >= 700) return 2;
  return 1;
}

// Calculate scroll distance per swipe/step
function getScrollStep() {
  const videoWidth = slider.scrollWidth / videos.length;
  return videoWidth * getVisibleCount();
}

// Clamp index within limits
function clampIndex(i) {
  return Math.max(0, Math.min(i, videos.length - getVisibleCount()));
}

// Scroll to index position
function updateSlider() {
  const step = getScrollStep();
  slider.scrollTo({ left: index * step, behavior: 'smooth' });
  updateCenterVideo();
}

// Zoom and play center video
function updateCenterVideo() {
  const center = slider.offsetWidth / 2;
  videos.forEach(video => {
    const box = video.getBoundingClientRect();
    const mid = box.left + box.width / 2;
    const isCenter = Math.abs(center - mid) < box.width / 2;

    video.classList.toggle('center', isCenter);
    if (isCenter) video.play().catch(() => {});
    else video.pause();
  });
}

// Bidirectional autoplay logic
function autoSlide() {
  const visible = getVisibleCount();
  if (index >= videos.length - visible) direction = -1;
  if (index <= 0) direction = 1;
  index += direction;
  updateSlider();
}

// Manual controls
function manualSlide(dir) {
  direction = dir;
  index = clampIndex(index + dir);
  updateSlider();
  resetAuto();
}

// Swipe handler
slider.addEventListener('touchstart', e => swipeStartX = e.touches[0].clientX);
slider.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientX - swipeStartX;
  if (Math.abs(delta) > 50) {
    manualSlide(delta > 0 ? -1 : 1);
  }
});

// Button clicks
nextBtn.addEventListener('click', () => manualSlide(1));
prevBtn.addEventListener('click', () => manualSlide(-1));

// Resize awareness
window.addEventListener('resize', () => {
  updateSlider();
});

// Looping autoplay
function startAuto() {
  autoScrollInterval = setInterval(autoSlide, 5000);
}
function resetAuto() {
  clearInterval(autoScrollInterval);
  startAuto();
}

// Start everything
updateSlider();
startAuto();
