// === AMBIENT AUDIO WITH SOFT FADE-IN ===
const ambientAudio = new Audio("your-lounge-audio.mp3"); // Replace with your actual ambient track
ambientAudio.loop = true;
ambientAudio.volume = 0;

document.addEventListener("click", () => {
  if (ambientAudio.paused) {
    ambientAudio.play().then(() => {
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.02;
        if (vol >= 0.25) {
          ambientAudio.volume = 0.25;
          clearInterval(fade);
        } else {
          ambientAudio.volume = vol;
        }
      }, 100);
    }).catch(() => {});
  }
}, { once: true });

// === PROFESSIONAL VOICE NARRATION SETUP ===
const narrationText = "Welcome to AmandaaBuilds—where design meets craftsmanship. From ambient lighting to custom kitchens, from elegant ceilings to immersive media walls, we don’t just renovate spaces—we reimagine how you live in them. Whether it’s your home, office, or creative studio, we bring harmony, function, and beauty into every corner. Let’s build your dream, one detail at a time.";
let hasNarrated = false;
let selectedVoice = null;

function selectNarratorVoice() {
  const voices = speechSynthesis.getVoices();
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("windows")) {
    selectedVoice = voices.find(v => v.name.includes("Jenny")) || voices.find(v => v.name.includes("Aria"));
  } else if (ua.includes("mac")) {
    selectedVoice = voices.find(v => v.name.includes("Samantha"));
  } else if (ua.includes("android")) {
    selectedVoice = voices.find(v => v.name.includes("Google UK English Female")) || voices.find(v => v.lang === "en-US");
  } else {
    selectedVoice = voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("female")) || voices[0];
  }
}

if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.onvoiceschanged = selectNarratorVoice;
}

function speakNarration() {
  if (!speechSynthesis || speechSynthesis.speaking) return;

  const utter = new SpeechSynthesisUtterance(narrationText);
  utter.voice = selectedVoice;
  utter.lang = "en-US";
  utter.rate = 0.72;
  utter.pitch = 1.2;
  utter.volume = 1.0;

  createMoodLighting();
  glowLogo();

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function createMoodLighting() {
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    opacity: "0",
    transition: "opacity 2s ease",
    zIndex: "9998",
    pointerEvents: "none"
  });
  document.body.appendChild(overlay);
  setTimeout(() => (overlay.style.opacity = "1"), 50);
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 2000);
  }, 9000);
}

function glowLogo() {
  const logo = document.querySelector(".logo img");
  if (!logo) return;
  logo.style.transition = "box-shadow 2s ease";
  logo.style.boxShadow = "0 0 40px rgba(255, 215, 150, 0.6)";
  setTimeout(() => {
    logo.style.boxShadow = "none";
  }, 9000);
}

// === TRIGGER ON VIDEO SECTION SCROLL ===
window.addEventListener("scroll", () => {
  const section = document.getElementById("videoSlider");
  if (!section || hasNarrated) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    speakNarration();
    hasNarrated = true;
  }
});

// === TRIGGER ON CENTER VIDEO CLICK ===
const videos = document.querySelectorAll("#videoSlider video");
videos.forEach(video => {
  video.addEventListener("click", () => {
    if (video.classList.contains("active-video")) {
      speakNarration();
    }
  });
});
