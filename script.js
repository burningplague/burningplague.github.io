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

  const fadeDuration = 2000;

  // ---- START FADING ----
  enterButton.classList.add("fade-out");
  mainContainer.classList.add("fade-in");

  // ---- START INTRO AUDIO ----
  audio.src = "/src/intro.mp3";
  audio.volume = 1.0;

  try {
    await audio.play();

    const introDuration = isNaN(audio.duration) || !isFinite(audio.duration)
      ? fadeDuration
      : audio.duration * 1000;

    // ---- INIT WAVEFORM ----
    setupWaveform();
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    drawWaveform();

    // ---- TRANSITION TO MAIN LOOP ----
    setTimeout(() => {
      audio.src = "/src/main.mp3";
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      landingContainer.style.display = "none";
    }, Math.max(fadeDuration, introDuration));

  } catch (e) {
    console.error("Audio failed:", e);
    landingContainer.style.display = "none";
  }
});




// ===========================================================
// Random Image
// ===========================================================
let lastImage = null;

function setRandomImage() {
  const images = [
    "/src/shiggy.gif",
    "/src/mamiya.png",
    "/src/rika.png",
    "/src/erika.png",
    "/src/len.png",
    "/src/arcuied.png"
  ];

  let randomImage;
  do {
    randomImage = images[Math.floor(Math.random() * images.length)];
  } while (randomImage === lastImage);

  lastImage = randomImage;

  const imgElement = document.querySelector(".shiggy");
  if (imgElement) {
    imgElement.src = randomImage;
  }
}


// ===========================
// Cycled Background Images
// ===========================
window.addEventListener("DOMContentLoaded", () => {
  const images = [
    "/src/prettifun.gif",
    "/src/che.gif",
    "/src/osama.gif"
  ];

  let index = parseInt(localStorage.getItem("bgIndex")) || 0;

  document.body.style.backgroundImage = `url(${images[index]})`;

  index = (index + 1) % images.length;

  localStorage.setItem("bgIndex", index);
});



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

// ================================
// Waveform Visualizer
// ================================

let audioContext;
let analyser;
let dataArray;
let bufferLength;

const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

function setupWaveform() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }
}

function drawWaveform() {
  requestAnimationFrame(drawWaveform);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = (canvas.width / bufferLength) * 2.5;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 255.0 * canvas.height;

    ctx.fillStyle = "#eebebe"; // Bar color
    ctx.fillRect(
      i * barWidth,             // x-position
      canvas.height - barHeight, // y-position
      barWidth - 1,               // bar spacing
      barHeight                   // bar height
    );
  }
}

