let bananas = 0;
let auto = 0;
let autoCost = 50;
let perClick = 1;
let clickCost = 30;

// DOM
const bananaEl = document.getElementById("banana");
const countEl = document.getElementById("bananaCount");
const bpsEl = document.getElementById("bps");
const notifContainer = document.getElementById("notifContainer");

// CLICK
bananaEl.onclick = function (e) {
  bananas += perClick;
  createParticles(e, 10); // MORE PARTICLES
  update();
};

// BUY AUTO
function buyAuto() {
  if (bananas >= autoCost) {
    bananas -= autoCost;
    auto++;
    autoCost = Math.floor(autoCost * 1.4);
    showNotif("Whip Cream", "images/button.png");
    update();
  }
}

// BUY CLICK
function buyClickUpgrade() {
  if (bananas >= clickCost) {
    bananas -= clickCost;
    perClick++;
    clickCost = Math.floor(clickCost * 1.5);
    showNotif("Strawberries", "images/strawberries.png");
    update();
  }
}

// UPDATE UI
function update() {
  countEl.innerText = bananas + " bananas";
  bpsEl.innerText = "per second: " + auto;
  document.getElementById("autoCost").innerText = autoCost;
  document.getElementById("clickCost").innerText = clickCost;

  saveGame();
}

// AUTO BANANAS
setInterval(() => {
  bananas += auto;
  update();
}, 1000);

// PARTICLES
function createParticles(e, amount = 6) {
  for (let i = 0; i < amount; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const x = e.clientX + (Math.random() * 50 - 25);
    const y = e.clientY + (Math.random() * 50 - 25);

    p.style.left = x + "px";
    p.style.top = y + "px";
    p.innerText = "+" + perClick;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

// NOTIFICATION
function showNotif(name, img) {
  const div = document.createElement("div");
  div.className = "notif";
  div.innerHTML = `
    <img src="${img}">
    <span>Purchased ${name}!</span>
  `;
  notifContainer.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

// SAVE
function saveGame() {
  const data = {
    bananas,
    auto,
    autoCost,
    perClick,
    clickCost
  };
  localStorage.setItem("bananaSave", JSON.stringify(data));
}

// LOAD
function loadGame() {
  const save = JSON.parse(localStorage.getItem("bananaSave"));
  if (save) {
    bananas = save.bananas || 0;
    auto = save.auto || 0;
    autoCost = save.autoCost || 50;
    perClick = save.perClick || 1;
    clickCost = save.clickCost || 30;
  }
  update();
}

// SAVE ON LEAVE
window.addEventListener("beforeunload", saveGame);

// LOAD ON START
loadGame();

// LOADING SCREEN
window.addEventListener("load", () => {
  const loadingBar = document.getElementById("loadingBar");
  const playButton = document.getElementById("playButton");
  const loadingScreen = document.getElementById("loadingScreen");
  const gameContainer = document.getElementById("game");

  let progress = 0;

  const interval = setInterval(() => {
    progress += 5;
    loadingBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      playButton.style.display = "inline-block";
    }
  }, 50);

  playButton.onclick = () => {
    loadingScreen.style.display = "none";
    gameContainer.classList.remove("hidden");
  };
});