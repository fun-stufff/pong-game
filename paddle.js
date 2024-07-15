const SPEED = 0.01;

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

  update(delta, ball_y) {
    this.y += SPEED * delta * (ball_y - this.y);
  }

  reset() {
    this.y = 50;
  }
}
