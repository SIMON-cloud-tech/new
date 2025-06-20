
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

videoElements.forEach(video => {
  video.addEventListener("mouseenter", () => clearInterval(autoSlide));
  video.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => videoSlider.scrollBy({ left: 300, behavior: "smooth" }), 100);
  });
});

document.querySelector(".prev").onclick = () => videoSlider.scrollBy({ left: -300, behavior: "smooth" });
document.querySelector(".next").onclick = () => videoSlider.scrollBy({ left: 300, behavior: "smooth" });


//PRODUCTS///
document.querySelectorAll(".product-category").forEach(category => {
  const track = category.querySelector(".card-track");
  const leftArrow = category.querySelector(".arrow.left");
  const rightArrow = category.querySelector(".arrow.right");

  // Infinite Autoslide
  let scrollTimer = setInterval(() => {
    track.scrollBy({ left: track.clientWidth / 3, behavior: 'smooth' });
  }, 3000);

  // Pause on hover/touch
  const pause = () => clearInterval(scrollTimer);
  const resume = () => scrollTimer = setInterval(() => {
    track.scrollBy({ left: track.clientWidth / 3, behavior: 'smooth' });
  }, 3000);

  track.addEventListener("mouseenter", pause);
  track.addEventListener("mouseleave", resume);
  track.addEventListener("touchstart", pause, { passive: true });
  track.addEventListener("touchend", resume);

  // Manual navigation
  leftArrow.addEventListener("click", () =>
    track.scrollBy({ left: -track.clientWidth / 2, behavior: "smooth" })
  );
  rightArrow.addEventListener("click", () =>
    track.scrollBy({ left: track.clientWidth / 2, behavior: "smooth" })
  );
});

// Modal logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".product-card img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};


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
