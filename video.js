window.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('videoSlider');
    const originalVideos = Array.from(slider.children);
    const getVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    };
  
    let visible = getVisibleCount();
    let isPaused = false;
    let currentIndex = visible;
  
    // Clone edges
    const clonesBefore = originalVideos.slice(-visible).map(v => v.cloneNode(true));
    const clonesAfter = originalVideos.slice(0, visible).map(v => v.cloneNode(true));
  
    clonesBefore.forEach(clone => slider.prepend(clone));
    clonesAfter.forEach(clone => slider.append(clone));
  
    const allVideos = Array.from(slider.children);
  
    function setPosition(instant = false) {
      const videoWidth = allVideos[currentIndex].offsetWidth + 10;
      slider.style.transition = instant ? 'none' : 'transform 0.6s ease';
      slider.style.transform = `translateX(-${videoWidth * currentIndex}px)`;
  
      allVideos.forEach((vid, i) => {
        vid.classList.toggle('center', i === currentIndex);
      });
    }
  
    function loopSlide() {
      return setInterval(() => {
        if (isPaused) return;
  
        currentIndex++;
        setPosition();
  
        setTimeout(() => {
          if (currentIndex >= allVideos.length - visible) {
            currentIndex = visible;
            setPosition(true);
          }
        }, 2600);
      }, 3500);
    }
  
    function pauseSlider() {
      isPaused = true;
      clearInterval(interval);
    }
  
    let interval = loopSlide();
  
    allVideos.forEach(video => {
      video.addEventListener('click', pauseSlider);
    });
  
    window.addEventListener('resize', () => {
      clearInterval(interval);
      visible = getVisibleCount();
      currentIndex = visible;
      setPosition(true);
      interval = loopSlide();
    });
  
    setPosition(true);
  });
  