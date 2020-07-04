export default class Particle {
  constructor(properties, animate, canvas) {
    this.properties = properties;

    this.size = properties.size;
    this.x = properties.x;
    this.y = properties.y;
    this.color = properties.color;
    this.opacity = properties.opacity;
    this.shape = properties.shape;
    this.strokeColor = properties.strokeColor;
    this.strokeWidth = properties.strokeWidth;
    this.shadowColor = properties.shadowColor;
    this.shadowBlur = properties.shadowBlur;
    this.shadowX = properties.shadowX;
    this.shadowY = properties.shadowY;

    this.animate = animate;
    this.canvas = canvas;
  }

  update() {
    Object.keys(this.animate).forEach((prop) => {
      if (prop === "position") {
        this.updatePosition();
      } else {
        this.updateProperty(prop);
      }
    });
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

    if (!animate) {
      return;
    }

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
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.globalAlpha = this.opacity;

    if (this.shadowBlur || this.shadowX || this.shadowY) {
      this.canvas.context.shadowColor = this.shadowColor || this.color;
      this.canvas.context.shadowBlur = this.shadowBlur || 0;
      this.canvas.context.shadowOffsetX = this.shadowX || 0;
      this.canvas.context.shadowOffsetY = this.shadowY || 0;
    }

    this.shape(this.canvas.context, this);
    this.canvas.context.fill();

    if (this.strokeWidth) {
      this.canvas.context.strokeStyle = this.strokeColor || this.color;
      this.canvas.context.lineWidth = this.strokeWidth;
      this.canvas.context.stroke();
    }
  }
}
