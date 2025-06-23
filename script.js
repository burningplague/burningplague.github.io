// ===========================================================
// 1️⃣ Audio Init (one-time)
// ===========================================================
const audio = document.getElementById("bg-audio");
if (audio) {
  audio.volume = 0.2;
  audio.loop = true;
  audio.play();
}

// ===========================================================
// 2️⃣ Random Image
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
// 3️⃣ Routes
// ===========================================================
const routes = {
  '/': 'pages/home.html',
  '/about': 'pages/about.html'
};

async function loadPage() {
  const path = window.location.pathname;
  const pageUrl = routes[path] || routes['/'];
  const app = document.getElementById('app');
  const response = await fetch(pageUrl);
  app.innerHTML = await response.text();

  // After page load
  setRandomImage();
}

// ===========================================================
// 4️⃣ Navigation
// ===========================================================
function navigateTo(url) {
  history.pushState(null, null, url);
  loadPage();
}

// ===========================================================
// 5️⃣ Event Listeners
// ===========================================================
window.addEventListener('popstate', loadPage);

window.addEventListener('DOMContentLoaded', () => {
  loadPage();

  // Route links
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.getAttribute('href'));
    });
  });
});
