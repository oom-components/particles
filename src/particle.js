export default class Particle {
  constructor(properties, animate, canvas) {
    this.properties = properties;

    this.size = properties.size;
    this.x = properties.x;
    this.y = properties.y;
    this.color = properties.color;
    this.opacity = properties.opacity;
    this.shape = properties.shape;

    this.animate = animate;
    this.canvas = canvas;
  }

  update() {
    if (this.animate.position) {
      this.updatePosition();
    }

    if (this.animate.size) {
      this.updateProperty("size");
    }

    if (this.animate.opacity) {
      this.updateProperty("opacity");
    }
  }

  updatePosition() {
    const ms = this.animate.position.speed;

    this.x += this.animate.position.velocityX * ms;
    this.y += this.animate.position.velocityY * ms;

    if (this.animate.position.outMode === "bounce") {
      this.bounce();
    } else {
      this.out();
    }
  }

  updateProperty(name) {
    const animate = this.animate[name];

    if (animate.grow) {
      if (this[name] >= animate.max) {
        animate.grow = false;
      }

      return (this[name] += animate.speed);
    }

    if (this[name] <= animate.min) {
      animate.grow = true;
    }

    this[name] -= animate.speed;

    if (this[name] < 0) {
      this[name] = 0;
    }
  }

  bounce() {
    if (this.x - this.size > this.canvas.width) {
      this.x = this.size;
      this.y = Math.random() * this.canvas.height;
    } else if (this.x + this.size < 0) {
      this.x = this.canvas.width;
      this.y = Math.random() * this.canvas.height;
    }

    if (this.y - this.size > this.canvas.height) {
      this.y = this.size;
      this.x = Math.random() * this.canvas.width;
    } else if (this.y + this.size < 0) {
      this.y = this.canvas.height;
      this.x = Math.random() * this.canvas.width;
    }

    if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
      this.animate.position.velocityX *= -1;
    }

    if (this.y + this.size > this.canvas.height || this.y - this.size < 0) {
      this.animate.position.velocityY *= -1;
    }
  }

  out() {
    if (this.x - this.size > this.canvas.width) {
      this.x = -this.size;
      this.y = Math.random() * this.canvas.height;
    } else if (this.x + this.size < 0) {
      this.x = this.canvas.width + this.size;
      this.y = Math.random() * this.canvas.height;
    }

    if (this.y - this.size > this.canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * this.canvas.width;
    } else if (this.y + this.size < 0) {
      this.y = this.canvas.height + this.size;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw() {
    this.canvas.context.fillStyle = getColor(this.color, this.opacity);
    this.shape(this.canvas.context, this);
    this.canvas.context.fill();
  }
}

function getColor(color, opacity) {
  return color
    ? `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
    : undefined;
}
