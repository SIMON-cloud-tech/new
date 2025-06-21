
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


//const videoSlider = document.getElementById("videoSlider");
const videoElements = videoSlider.querySelectorAll("video");
const scrollAmount = 300;
let direction = 1; // 1 = forward, -1 = backward

function slideVideos() {
  const maxScroll = videoSlider.scrollWidth - videoSlider.clientWidth;
  if (videoSlider.scrollLeft >= maxScroll) direction = -1;
  else if (videoSlider.scrollLeft <= 0) direction = 1;

  videoSlider.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
}

let autoSlide = setInterval(slideVideos, 100);

videoElements.forEach(video => {
  // Play/pause logic with active class toggle
  video.addEventListener("click", () => {
    videoElements.forEach(v => {
      if (v !== video) {
        v.pause();
        v.classList.remove("active-video");
      }
    });

    if (video.paused) {
      video.play();
      video.classList.add("active-video");
    } else {
      video.pause();
      video.classList.remove("active-video");
    }
  });

  // Pause/resume auto-slide on hover
  video.addEventListener("mouseenter", () => clearInterval(autoSlide));
  video.addEventListener("mouseleave", () => {
    autoSlide = setInterval(slideVideos, 100);
  });
});

// Manual scroll buttons
document.querySelector(".prev").onclick = () =>
  videoSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });

document.querySelector(".next").onclick = () =>
  videoSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });


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
