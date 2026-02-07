// ================== CANVAS SETUP ==================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ================== STARS ==================
const STAR_COUNT = 500;
const stars = [];
const colors = [0, 60, 240];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: rand(0, canvas.width),
    y: rand(0, canvas.height),
    r: Math.random() * 1.2,
    o: Math.random(),
    h: colors[Math.floor(Math.random() * colors.length)]
  });
}

function drawStars() {
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${s.h},80%,88%,${s.o})`;
    ctx.fill();
  });
}

function twinkleStars() {
  stars.forEach(s => {
    if (Math.random() > 0.99) s.o = Math.random();
  });
}

// ================== STATE CONTROL ==================
let frame = 0;
let opacity = 0;
let proposalDone = false;
let yesOpacity = 0;

// ================== BUTTON ==================
const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  proposalDone = true;
  button.style.display = "none";
});

// ================== TEXT ==================
function drawText() {
  ctx.textAlign = "center";
  ctx.font = "28px Comic Sans MS";

  // 🛑 STOP OLD ANIMATION AFTER YES
  if (proposalDone) {
    if (yesOpacity < 1) yesOpacity += 0.05;

    ctx.fillStyle = `rgba(255,105,180,${yesOpacity})`;
    ctx.font = "42px Comic Sans MS";
    ctx.fillText(
      "She said YES! 💖✨",
      canvas.width / 2,
      canvas.height / 2 + 40
    );

    ctx.font = "28px Comic Sans MS";
    ctx.fillText(
      "This is the beginning of our forever ✨",
      canvas.width / 2,
      canvas.height / 2 + 95
    );

    return; // ⛔ prevents overwrite
  }

  // ================== NORMAL SEQUENCE ==================
  if (frame < 240) {
    opacity += 0.01;
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fillText(
      "everyday I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
  } 
  else if (frame < 480) {
    opacity -= 0.01;
  } 
  else if (frame === 480) {
    opacity = 0;
  } 
  else if (frame > 480) {
    ctx.fillStyle = "white";
    ctx.fillText(
      "Will You Be Mine?",
      canvas.width / 2,
      canvas.height / 2
    );
    button.style.display = "block";
  }
}

// ================== LOOP ==================
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  twinkleStars();
  drawText();
  frame++;
  requestAnimationFrame(animate);
}

// ================== RESIZE ==================
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ================== START ==================
animate();
