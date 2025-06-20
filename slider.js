(function () {
  const track = document.querySelector(".card-track");
  const cards = [...document.querySelectorAll(".product-card")];
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");

  let cardIndex = 0;
  let direction = 1;
  let autoSlide;

  // --- Modal Viewer with Zoom and Fullscreen ---
  cards.forEach(card => {
    const img = card.querySelector("img");
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalImg.style.transform = "scale(0.8)";
      modalImg.style.opacity = "0";
      modalImg.style.transition = "transform 0.4s ease, opacity 0.3s ease";

      // Request fullscreen for modal
      if (modal.requestFullscreen) {
        modal.requestFullscreen();
      } else if (modal.webkitRequestFullscreen) {
        modal.webkitRequestFullscreen(); // Safari
      } else if (modal.msRequestFullscreen) {
        modal.msRequestFullscreen();
      }

      setTimeout(() => {
        modalImg.style.transform = "scale(1)";
        modalImg.style.opacity = "1";
      }, 10);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalImg.style.transform = "scale(1)";
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });

  // --- Visible Card Count ---
  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // --- Scale Center Card ---
  function scaleCenter() {
    const visible = getVisibleCount();
    const center = (cardIndex + Math.floor(visible / 2)) % cards.length;
    cards.forEach((card, i) => {
      card.style.transition = "transform 0.5s ease";
      card.style.transform = i === center ? "scale(1.08)" : "scale(1)";
      card.style.zIndex = i === center ? "1" : "0";
    });
  }

  function updateScroll() {
    const cardWidth = cards[0].offsetWidth;
    track.scrollTo({ left: cardWidth * cardIndex, behavior: "smooth" });
    scaleCenter();
    lazyLoad(cardIndex);
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      const maxIndex = cards.length - getVisibleCount();
      cardIndex += direction;
      if (cardIndex >= maxIndex || cardIndex <= 0) {
        direction *= -1;
        cardIndex = Math.max(0, Math.min(maxIndex, cardIndex));
      }
      updateScroll();
    }, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // --- Arrows ---
  leftBtn.addEventListener("click", () => {
    direction = -1;
    cardIndex = (cardIndex - 1 + cards.length) % cards.length;
    updateScroll();
    resetAutoSlide();
  });

  rightBtn.addEventListener("click", () => {
    direction = 1;
    cardIndex = (cardIndex + 1) % cards.length;
    updateScroll();
    resetAutoSlide();
  });

  // --- Swipe ---
  let startX = 0;
  track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  track.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      direction = diff < 0 ? 1 : -1;
      cardIndex = (cardIndex + direction + cards.length) % cards.length;
      updateScroll();
      resetAutoSlide();
    }
  });

  // --- Lazy Load Images ---
  function lazyLoad(index) {
    const visible = getVisibleCount();
    const range = 2;
    for (let i = index - range; i <= index + visible + range; i++) {
      const realIndex = (i + cards.length) % cards.length;
      const img = cards[realIndex].querySelector("img");
      if (!img.complete) {
        img.src = img.src;
      }
    }
  }

  // --- Pause on Hover ---
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", updateScroll);
  updateScroll();
  startAutoSlide();
})();
