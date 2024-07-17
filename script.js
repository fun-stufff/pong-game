import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const userPaddle = new Paddle(document.getElementById("user-paddle"));
const botPaddle = new Paddle(document.getElementById("bot-paddle"));
const startPage = document.getElementsByClassName("start-page");
const gamePage = document.getElementsByClassName("game-page");
const startButton = document.getElementsByClassName("start-button");
const userScore = document.getElementById("user-score");
const botScore = document.getElementById("bot-score");
let prevTime;

startButton[0].addEventListener("click", startGame);

function startGame() {
  startPage[0].classList.add("start");
  gamePage[0].classList.remove("not-start");

  window.requestAnimationFrame(update);

  // Move user paddle
  // By mouse
  let mouseMove = (e) => {
    userPaddle.y = (e.y / window.innerHeight) * 100;
  };
  document.addEventListener("mousemove", mouseMove);

  // By keyboard
  document.addEventListener("keydown", (e) => {
    userPaddle.update_key(e.key);
    document.removeEventListener("mousemove", mouseMove);
  });

  document.addEventListener("keyup", (e) => {
    document.addEventListener("mousemove", mouseMove);
  });
}

function update(time) {
  if (prevTime != null) {
    const delta = time - prevTime;

    // Change background color
    updateBackground(delta);
    // Move ball
    ball.update(delta);
    // Check collision
    ball.collision([userPaddle, botPaddle]);
    // Move bot paddle
    botPaddle.update_bot(delta, ball.y);

    if (gameOver()) {
      addScore();
      ball.reset();
      botPaddle.reset();
    }
  }
  prevTime = time;
  window.requestAnimationFrame(update);
}

function updateBackground(delta) {
  const hue = parseFloat(
    window.getComputedStyle(document.documentElement).getPropertyValue("--hue")
  );
  document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
}

function gameOver() {
  return ball.rect.left <= 0 || ball.rect.right >= window.innerWidth;
}

function addScore() {
  if (ball.rect.left <= 0) {
    botScore.innerText = parseInt(botScore.innerText) + 1;
  } else {
    userScore.innerText = parseInt(userScore.innerText) + 1;
  }
}
