<script>
  const slider = document.getElementById('videoSlider');
  const videos = slider.querySelectorAll('video');
  let currentIndex = 0;
  let interval;
  let isPaused = false;

  function updateCenterVideo() {
    videos.forEach((video, i) => {
      video.classList.toggle('center', i === currentIndex);
    });
  }

  function slideTo(index) {
    const videoWidth = videos[index].offsetWidth + 10; // Include margin
    slider.style.transform = `translateX(-${videoWidth * index}px)`;
    currentIndex = index % videos.length;
    updateCenterVideo();
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      if (!isPaused) {
        currentIndex = (currentIndex + 1) % videos.length;
        slideTo(currentIndex);
      }
    }, 3000); // Adjust speed here
  }

  function pauseSlider() {
    isPaused = true;
    clearInterval(interval);
  }

  videos.forEach(video => {
    video.addEventListener('click', pauseSlider);
  });

  // Optional: add arrow buttons and attach pauseSlider to them

  startAutoSlide();
  updateCenterVideo();
</script>
