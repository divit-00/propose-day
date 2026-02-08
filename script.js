// ===== CANVAS =====
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===== STARS =====
const STAR_COUNT = 500;
const stars = [];
const colors = [0, 60, 240];

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    a: Math.random(),
    h: colors[Math.floor(Math.random() * colors.length)]
  });
}

function drawStars() {
  stars.forEach(s => {
    if (Math.random() > 0.99) s.a = Math.random();

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${s.h},80%,88%,${s.a})`;
    ctx.fill();
  });
}

// ===== MESSAGES =====
const messages = [
  "Every day I cannot believe how lucky I am",
  "Amongst trillions of stars,\nover billions of years",
  "To be alive,\nand to spend this life with you",
  "Is so incredibly,\nunfathomably unlikely",
  "And yet here I am,\ngetting the impossible chance",
  "I love you more than\nspace and time can contain",
  "And I can’t wait to spend forever\nsharing that love with you"
];

let msgIndex = 0;
let textOpacity = 0;
let fadingIn = true;

// change message every 4.5 seconds
setInterval(() => {
  if (msgIndex < messages.length - 1) {
    msgIndex++;
    textOpacity = 0;
    fadingIn = true;
  }
}, 4500);

// ===== BUTTON =====
const button = document.getElementById("valentinesButton");
button.style.display = "none";

let proposalDone = false;
let yesOpacity = 0;

button.addEventListener("click", () => {
  proposalDone = true;
  button.style.display = "none";
});

// ===== DRAW TEXT =====
function drawText() {
  ctx.textAlign = "center";
  const fontSize = window.innerWidth < 600 ? 22 : 28;
  ctx.font = `${fontSize}px Comic Sans MS`;

  // 💖 AFTER YES
  if (proposalDone) {
    yesOpacity = Math.min(1, yesOpacity + 0.05);

    ctx.fillStyle = `rgba(255,105,180,${yesOpacity})`;
    ctx.font = "42px Comic Sans MS";
    ctx.fillText(
      "I LOVE YOU! 💖✨",
      canvas.width / 2,
      canvas.height / 2 + 20
    );

    ctx.font = "28px Comic Sans MS";
    ctx.fillText(
      "This is the beginning of our forever ✨",
      canvas.width / 2,
      canvas.height / 2 + 75
    );
    return;
  }

  // 💬 NORMAL MESSAGE FLOW
  ctx.fillStyle = `rgba(255,255,255,${textOpacity})`;

  const lines = messages[msgIndex].split("\n");
  const lineHeight = fontSize + 6;
  const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;

  lines.forEach((line, i) => {
    ctx.fillText(
      line,
      canvas.width / 2,
      startY + i * lineHeight
    );
  });

  if (fadingIn) {
    textOpacity += 0.02;
    if (textOpacity >= 1) fadingIn = false;
  }

  // 💍 FINAL QUESTION
  if (msgIndex === messages.length - 1) {
    ctx.font = "32px Comic Sans MS";
    ctx.fillText(
      "Will You Be Mine?",
      canvas.width / 2,
      canvas.height / 2 + 120
    );
    button.style.display = "block";
  }
}

// ===== ANIMATION LOOP =====
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawText();
  requestAnimationFrame(animate);
}

animate();
