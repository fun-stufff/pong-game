const SPEED = 0.1;

export default class Paddle {
  constructor(paddle) {
    this.paddle = paddle;
    this.reset();
  }

  // Getters
  get y() {
    return parseFloat(
      getComputedStyle(this.paddle).getPropertyValue("--paddle-y")
    );
  }

  get rect() {
    return this.paddle.getBoundingClientRect();
  }

  // Setters
  set y(value) {
    this.paddle.style.setProperty("--paddle-y", value);
  }

  update_bot(delta, ball_y) {
    let speed_delta = SPEED * delta;
    // Avoid paddle to be jumpy
    if (speed_delta > 1) speed_delta = 1;
    this.y += speed_delta * (ball_y - this.y);
  }

  update_key(key) {
    switch (key) {
      case "ArrowDown":
        this.y = Math.min(100, this.y + this.y * SPEED);
        break;
      case "ArrowUp":
        this.y = Math.max(0, this.y - this.y * SPEED);
        break;
    }
  }

  reset() {
    this.y = 50;
  }
}
