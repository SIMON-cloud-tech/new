
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("nav-links");
  const toggleBtn = document.getElementById("toggle-btn");
  const images = ["furniture.jpg", "furniture1.jpg", "bg3.jpg", "bg4.jpg", "bg8.jpg", "bg7.jpg","kitchen.jpg","store10wall.jpg", "bg6.jpg"];
  let currentImageIndex = 0;

  // Ensure menu icon always appears on mobile
  menuIcon.style.display = "block"; 

  // Toggle menu visibility on mobile devices
  menuIcon.addEventListener("click", function () {
      navLinks.classList.toggle("show");
  });

  // Toggle background image on button click
  toggleBtn.addEventListener("click", function () {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      document.querySelector(".background-container .image img").src = images[currentImageIndex];
  });

  // Auto-slide background images every 4 seconds
  setInterval(function () {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      document.querySelector(".background-container .image img").src = images[currentImageIndex];
  }, 2500);
});


// 
const videoSlider = document.getElementById("videoSlider");
const videoElements = videoSlider.querySelectorAll("video");

let autoSlide = setInterval(() => videoSlider.scrollBy({ left: 300, behavior: "smooth" }), 100);
s
videoElements.forEach(video => {
  video.addEventListener("mouseenter", () => clearInterval(autoSlide));
  video.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => videoSlider.scrollBy({ left: 300, behavior: "smooth" }), 100);
  });
});

document.querySelector(".prev").onclick = () => videoSlider.scrollBy({ left: -300, behavior: "smooth" });
document.querySelector(".next").onclick = () => videoSlider.scrollBy({ left: 300, behavior: "smooth" });

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

  // --- Modal Viewer with Zoom ---
  cards.forEach(card => {
    const img = card.querySelector("img");
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalImg.style.transform = "scale(0.8)";
      modalImg.style.opacity = "0";
      modalImg.style.transition = "transform 0.4s ease, opacity 0.3s ease";
      setTimeout(() => {
        modalImg.style.transform = "scale(1)";
        modalImg.style.opacity = "1";
      }, 10);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalImg.style.transform = "scale(1)";
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
        img.src = img.src; // Trigger load if not yet loaded
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

// form//

function sendToWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const enquiry = document.getElementById("enquiry").value.trim();

  const businessNumber = "254719508167"; // Replace with your business number, no "+" or spaces
  const message = `Hello, my name is ${name}. My number is ${phone}. Here is my enquiry:\n\n${enquiry}`;

  const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  return false; // prevent actual form submission
}
//form//
//RESIZING VIDEOS//
// Set videos to a fixed size
document.querySelectorAll('video').forEach(video => {
  video.style.width = '320px';
  video.style.height = '180px';
});

//mobile users//
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("img").forEach(function (img) {
    img.style.cursor = "pointer"; // Optional: gives a hint it's clickable

    img.addEventListener("click", function () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        if (img.requestFullscreen) {
          img.requestFullscreen();
        } else if (img.webkitRequestFullscreen) {
          img.webkitRequestFullscreen(); // Safari
        } else if (img.msRequestFullscreen) {
          img.msRequestFullscreen(); // IE/Edge
        }
      }
    });
  });
});
