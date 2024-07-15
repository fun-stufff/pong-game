const INIT_VELOCITY = 0.03;
const DELTA_VELOCITY = 0.000005;

export default class Ball {
  constructor(ball) {
    this.ball = ball;
    this.reset();
  }

  // Getters
  get x() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--ball-x"));
  }

  get y() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--ball-y"));
  }

  get rect() {
    return this.ball.getBoundingClientRect();
  }

  // Setters
  set x(value) {
    this.ball.style.setProperty("--ball-x", value);
  }

  set y(value) {
    this.ball.style.setProperty("--ball-y", value);
  }

  reset() {
    this.x = 50;
    this.y = 50;
    const pi = randomPi(-Math.PI / 4, Math.PI / 4);
    this.direction = { x: Math.cos(pi), y: Math.sin(pi) };
    this.velocity = INIT_VELOCITY;
  }

  update(delta) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += DELTA_VELOCITY * delta;

    // Check boundary
    if (this.rect.top <= 0 || this.rect.bottom >= window.innerHeight) {
      this.direction.y *= -1;
    }
  }

  collision(paddles) {
    if (paddles.some((paddle) => collides(this, paddle))) {
      this.direction.x *= -1;
    }
  }
}

function randomPi(min, max) {
  let pi = Math.random() * (max - min) + min;
  while (pi <= 0.1 && pi >= -0.1) {
    pi = Math.random() * (max - min) + min;
  }
  return pi;
}

function collides(ball, paddle) {
  return (
    ball.rect.left <= paddle.rect.right &&
    ball.rect.top <= paddle.rect.bottom &&
    ball.rect.bottom >= paddle.rect.top &&
    ball.rect.right >= paddle.rect.left
  );
}
