// ================== CANVAS SETUP ==================
const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ================== STARS ==================
const stars = 500;
const colorrange = [0, 60, 240];
const starArray = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < stars; i++) {
  starArray.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    hue: colorrange[getRandom(0, colorrange.length - 1)],
    sat: getRandom(50, 100),
    opacity: Math.random()
  });
}

function drawStars() {
  for (let i = 0; i < stars; i++) {
    const s = starArray[i];
    context.beginPath();
    context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    context.fillStyle = `hsla(${s.hue}, ${s.sat}%, 88%, ${s.opacity})`;
    context.fill();
  }
}

function updateStars() {
  for (let i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

// ================== TEXT CONTROL ==================
let frameNumber = 0;
let opacity = 0;
let secondOpacity = 0;
let thirdOpacity = 0;

const FAST_TEXT_SPEED = 0.03;

// ================== BUTTON ==================
const button = document.getElementById("valentinesButton");
let showYesMessage = false;
let yesOpacity = 0;

button.addEventListener("click", () => {
  showYesMessage = true;
  button.style.display = "none";
});

// ================== TEXT FUNCTIONS ==================
function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * (fontSize + lineHeight));
  });
}

function drawText() {
  const fontSize = Math.min(30, window.innerWidth / 25);
  const lineHeight = 8;

  context.font = `${fontSize}px Comic Sans MS`;
  context.textAlign = "center";

  // --- TEXT 1 ---
  if (frameNumber < 300) {
    context.fillStyle = `rgba(255,255,255,${opacity})`;
    context.fillText(
      "everyday I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  }

  if (frameNumber >= 300 && frameNumber < 600) {
    context.fillStyle = `rgba(255,255,255,${opacity})`;
    context.fillText(
      "everyday I cannot believe how lucky I am",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity -= 0.01;
  }

  if (frameNumber === 600) opacity = 0;

  // --- TEXT 2 ---
  if (frameNumber > 600 && frameNumber < 900) {
    context.fillStyle = `rgba(255,255,255,${opacity})`;

    if (window.innerWidth < 600) {
      drawTextWithLineBreaks(
        ["amongst trillions and trillions of stars,", "over billions of years"],
        canvas.width / 2,
        canvas.height / 2,
        fontSize,
        lineHeight
      );
    } else {
      context.fillText(
        "amongst trillions and trillions of stars, over billions of years",
        canvas.width / 2,
        canvas.height / 2
      );
    }
    opacity += 0.01;
  }

  if (frameNumber >= 900 && frameNumber < 1200) {
    context.fillStyle = `rgba(255,255,255,${opacity})`;
    opacity -= 0.01;
  }

  if (frameNumber === 1200) opacity = 0;

  // --- TEXT 3 ---
  if (frameNumber > 1200 && frameNumber < 1500) {
    context.fillStyle = `rgba(255,255,255,${opacity})`;
    context.fillText(
      "to be alive, and to get to spend this life with you",
      canvas.width / 2,
      canvas.height / 2
    );
    opacity += 0.01;
  }

  if (frameNumber >= 1500 && frameNumber < 1800) {
    context.fillStyle = `rgba(255,255,255,${opacity})`;
    opacity -= 0.01;
  }

  if (frameNumber === 1800) opacity = 0;

  // --- FINAL LOVE TEXT ---
  if (frameNumber > 1800) {
    context.fillStyle = `rgba(255,255,255,${thirdOpacity})`;
    context.fillText(
      "Will You Be Mine?",
      canvas.width / 2,
      canvas.height / 2 + 80
    );
    if (thirdOpacity < 1) thirdOpacity += 0.01;
    button.style.display = "block";
  }

  // ================== YES MESSAGE ==================
  if (showYesMessage) {
    if (yesOpacity < 1) yesOpacity += FAST_TEXT_SPEED;

    context.fillStyle = `rgba(255,105,180,${yesOpacity})`;
    context.font = "40px Comic Sans MS";

    context.fillText(
      "She said YES! 💖",
      canvas.width / 2,
      canvas.height / 2 + 200
    );

    context.font = "28px Comic Sans MS";
    context.fillText(
      "This is the beginning of our forever ✨",
      canvas.width / 2,
      canvas.height / 2 + 250
    );
  }
}

// ================== MAIN LOOP ==================
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  updateStars();
  drawText();

  frameNumber++;
  requestAnimationFrame(animate);
}

// ================== RESIZE ==================
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ================== START ==================
animate();
