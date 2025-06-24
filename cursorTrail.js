const trailContainer = document.createElement("div");
trailContainer.style.position = "fixed";
trailContainer.style.top = 0;
trailContainer.style.left = 0;
trailContainer.style.width = "100vw";
trailContainer.style.height = "100vh";
trailContainer.style.pointerEvents = "none";
trailContainer.style.zIndex = "9999";
document.body.appendChild(trailContainer);

function createPetal(x, y) {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.style.left = `${x}px`;
  petal.style.top = `${y}px`;
  trailContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 1500);
}

// Change this number to adjust density:
const petalsCount = 0;  // More = denser trail

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < petalsCount; i++) {
    const offsetX = (Math.random() - 0.5) * 20; // Spread petals horizontally ±10px
    const offsetY = (Math.random() - 0.5) * 20; // Spread petals vertically ±10px
    createPetal(e.clientX + offsetX, e.clientY + offsetY);
  }
});
