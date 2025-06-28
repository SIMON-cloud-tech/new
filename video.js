const slider = document.getElementById('videoSlider');
const videos = slider.querySelectorAll('video');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Swipe Start
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

// Swipe End
slider.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const deltaX = startX - endX;

  const threshold = 50; // Minimum distance for swipe
  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0 && currentIndex < videos.length - 1) {
      currentIndex++;
    } else if (deltaX < 0 && currentIndex > 0) {
      currentIndex--;
    }
    videos[currentIndex].scrollIntoView({ behavior: 'smooth' });
  }

  isDragging = false;
});
