// ===========================================================
// 🎵 Random Audio Init
// ===========================================================
const audio = document.getElementById("bg-audio");
const audioFiles = [
  "/src/monster.mp3",
  "/src/witchbox.mp3"
];

if (audio) {
  // Pick a random track
  const randomTrack = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  audio.src = randomTrack;

  // Set properties
  audio.volume = 0.2;
  audio.loop = true;

  // Try to play when user clicks
  const playAudio = () => {
    audio.play().catch((e) => {
      console.log("Autoplay prevented:", e);
    });
    window.removeEventListener("click", playAudio);
  };
  window.addEventListener("click", playAudio);
}

// ===========================================================
// 🖼️ Random Image
// ===========================================================
function setRandomImage() {
  const images = [
    "/src/shiggy.gif",
    "/src/mamiya.png",
    "/src/dunce.png",
    "/src/png.png",
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
// 📄 Routes
// ===========================================================
const routes = {
  "": "pages/home.html",
  about: "pages/about.html"
};

async function loadPage() {
  const hash = window.location.hash.replace('#', '');
  const pageUrl = routes[hash] || routes[""];
  const app = document.getElementById("app");
  const response = await fetch(pageUrl);
  app.innerHTML = await response.text();
  setRandomImage();
}

// ===========================================================
// 👇 Event Listeners
// ===========================================================
window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
