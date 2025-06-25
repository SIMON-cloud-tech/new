window.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('videoSlider');
    const originalVideos = Array.from(slider.children);
    let visible = getVisibleCount();
    let isPaused = false;
    let resumeTimeout;
    let interval;
    let currentIndex = visible;
    let direction = 1; // 1 = forward, -1 = backward
  
    const clonesBefore = originalVideos.slice(-visible).map(v => v.cloneNode(true));
    const clonesAfter = originalVideos.slice(0, visible).map(v => v.cloneNode(true));
  
    clonesBefore.forEach(clone => slider.prepend(clone));
    clonesAfter.forEach(clone => slider.append(clone));
  
    const allVideos = Array.from(slider.children);
  
    function getVisibleCount() {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }
  
    function setPosition(instant = false) {
      const videoWidth = allVideos[currentIndex].offsetWidth + 10;
      slider.style.transition = instant ? 'none' : 'transform 1s ease-in-out';
      slider.style.transform = `translateX(-${videoWidth * currentIndex}px)`;
  
      allVideos.forEach((vid, i) => {
        vid.classList.toggle('center', i === currentIndex);
      });
    }
  
    function loopSlide() {
      return setInterval(() => {
        if (isPaused) return;
  
        currentIndex += direction;
        setPosition();
  
        setTimeout(() => {
          if (currentIndex >= allVideos.length - visible) {
            currentIndex = visible;
            setPosition(true);
          } else if (currentIndex <= 0) {
            currentIndex = allVideos.length - (2 * visible);
            setPosition(true);
          }
        }, 1000); // match transition
      }, 4000); // slower and smoother
    }
  
    function pauseSlider() {
      isPaused = true;
      clearInterval(interval);
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isPaused = false;
        interval = loopSlide();
      }, 10000);
    }
  
    allVideos.forEach((video, index) => {
      video.addEventListener('click', () => {
        pauseSlider();
        if (index !== currentIndex) {
          direction = index > currentIndex ? 1 : -1;
          currentIndex = index;
          setPosition();
        }
      });
    });
  
    window.addEventListener('resize', () => {
      clearInterval(interval);
      visible = getVisibleCount();
      currentIndex = visible;
      setTimeout(() => {
        setPosition(true);
        interval = loopSlide();
      }, 300);
    });
  
    setPosition(true);
    interval = loopSlide();
  });
  