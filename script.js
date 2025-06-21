
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


//RESIZING SCREENS//
// === Layout Stability Script for Mobile Devices ===
function lockBodyLayout() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  document.body.style.overscrollBehavior = "none";     // Prevent scroll bounce
  document.body.style.position = "relative";           // Keep layout consistent
  document.body.style.width = "100vw";                 // Avoid horizontal scroll
  document.body.style.overflowX = "hidden";            // Lock horizontal overflow
  document.body.style.minHeight = `${window.innerHeight}px`;  // Fill full height
}

window.addEventListener("load", lockBodyLayout);
window.addEventListener("resize", lockBodyLayout);
