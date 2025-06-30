// === Responsive Video Carousel by Prestige Web Room ===

const track = document.querySelector('.slider-track');
const videos = track.querySelectorAll('video');
const nextBtn = document.querySelector('.nav.next');
const prevBtn = document.querySelector('.nav.prev');

let index = 0;
let direction = 1;
const total = videos.length;
let swipeStartX = 0;

// Get # of visible videos based on screen width
function getVisibleCount() {
  if (window.innerWidth >= 900) return 3;
  if (window.innerWidth >= 700) return 2;
  return 1;
}

// Update position and center zoom
function updateSlider() {
  const visible = getVisibleCount();
  index = Math.max(0, Math.min(index, total - visible)); // clamp
  const offset = index * (100 / visible);
  track.style.transform = `translateX(-${offset}%)`;

  videos.forEach(v => v.classList.remove('center'));
  const centerIndex = index + Math.floor(visible / 2);
  const centerVideo = videos[centerIndex];
  if (centerVideo) {
    centerVideo.classList.add('center');
    centerVideo.play().catch(() => {});
  }
}

// Autoplay with direction awareness
function autoSlide() {
  const visible = getVisibleCount();

  if (index >= total - visible) direction = -1;
  if (index <= 0) direction = 1;

  index += direction;
  updateSlider();
}

// Manual navigation (next/prev)
function manualSlide(newDirection) {
  const visible = getVisibleCount();
  direction = newDirection;
 index += direction;

  index = Math.max(0, Math.min(index, total - visible));
  updateSlider();
}

// Touch swipe handler
function handleSwipeStart(e) {
  swipeStartX = e.touches[0].clientX;
}

function handleSwipeEnd(e) {
  const endX = e.changedTouches[0].clientX;
  const delta = endX - swipeStartX;
  if (Math.abs(delta) > 50) {
    const swipeDir = delta > 0 ? -1 : 1;
    manualSlide(swipeDir); // ⬅️ ➡️ respected
  }
}

// Event bindings
nextBtn.addEventListener('click', () => manualSlide(1));
prevBtn.addEventListener('click', () => manualSlide(-1));
track.addEventListener('touchstart', handleSwipeStart);
track.addEventListener('touchend', handleSwipeEnd);
window.addEventListener('resize', updateSlider);

// Start carousel
updateSlider();
setInterval(autoSlide, 6000);