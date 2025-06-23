// ===========================================================
// !-- Audio Init --
// ===========================================================
const audio = document.getElementById("bg-audio");
if (audio) {
  audio.volume = 0.2;
  audio.loop = true;
  audio.play();
}

// ===========================================================
// !-- Random Image --
// ===========================================================
function setRandomImage() {
  const images = [
    "/src/shiggy.gif",
    "/src/mamiya.png",
    "/src/dunce.png",
    "/src/png.png",
    "/src/rika.png",
    "src/erika.png"
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const imgElement = document.querySelector(".shiggy");
  if (imgElement) {
    imgElement.src = randomImage;
  }
}

// ===========================================================
// !-- Routes --
// ===========================================================
const routes = {
  '': 'pages/home.html',
  'about': 'pages/about.html'
};

async function loadPage() {
  const hash = window.location.hash.replace('#', '');
  const pageUrl = routes[hash] || routes[''];
  const app = document.getElementById('app');
  const response = await fetch(pageUrl);
  app.innerHTML = await response.text();
  setRandomImage();
}

// ===========================================================
// !-- Event Listeners --
// ===========================================================
window.addEventListener('hashchange', loadPage);
window.addEventListener('DOMContentLoaded', loadPage);

