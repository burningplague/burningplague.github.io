// ===========================================================
// Landing + Main Audio Logic
// ===========================================================
const audio = document.getElementById("bg-audio");
const enterButton = document.getElementById("enter-button");
const landingContainer = document.getElementById("landing");
const mainContainer = document.getElementById("main-content");
const appContainer = document.getElementById("app");

enterButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  // Set fade duration (milliseconds)
  const fadeDuration = 2000;

  // Start fading button out & main content in simultaneously
  enterButton.classList.add("fade-out");
  mainContainer.classList.add("fade-in");

  // Play the intro audio immediately (no wait)
  audio.src = "/src/intro.mp3";
  audio.volume = 1.0;

  try {
    await audio.play();

    // Use the audio duration or fallback to fadeDuration
    const introDuration = isNaN(audio.duration) || !isFinite(audio.duration)
      ? fadeDuration
      : audio.duration * 1000;

    // After both fade and intro duration, switch audio and hide landing
    setTimeout(() => {
      audio.src = "/src/main.mp3";
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      landingContainer.style.display = "none";
    }, Math.max(fadeDuration, introDuration));  // Wait for the longer of fade or audio

  } catch (e) {
    console.error("Audio failed:", e);
    landingContainer.style.display = "none";
  }
});



// ===========================================================
// Random Image
// ===========================================================
function setRandomImage() {
  const images = [
    "/src/shiggy.gif",
    "/src/mamiya.png",
    "/src/rika.png",
    "/src/erika.png",
    "/src/len.png",
    "/src/arcuied.png"
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const imgElement = document.querySelector(".shiggy");
  if (imgElement) {
    imgElement.src = randomImage;
  }
}

// ===========================================================
// Routes
// ===========================================================
const routes = {
  "": "home.html",
  "about": "about.html"
};

async function loadPage() {
  const hash = window.location.hash.replace('#', '');
  const pageUrl = routes[hash] || routes[""];
  const response = await fetch(pageUrl);
  appContainer.innerHTML = await response.text();
  setRandomImage();
}

window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
