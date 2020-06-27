/**
 * Class to manage a canvas of particles
 */
const defaults = {
  number: 200,
  densityArea: 800,
  resize: "repaint", // repaint | increment
};
export default class Canvas {
  constructor(element, generator, options = {}) {
    this.element = element;
    this.particles = [];
    this.generator = generator;
    this.paused = true;
    this.observer = null;

    this.options = Object.assign({}, defaults, options);
  }

  start() {
    this.initCanvas();
    this.createParticles();
    this.play();

    if (this.options.resize) {
      this.initResize();
    }
  }

  initCanvas() {
    this.pxratio = Math.max(1, window.devicePixelRatio);
    this.width = this.element.offsetWidth * this.pxratio;
    this.height = this.element.offsetHeight * this.pxratio;
    this.context = this.element.getContext("2d");

    this.element.width = this.width;
    this.element.height = this.height;

    this.context.fillRect(0, 0, this.width, this.height);
  }

  initResize() {
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = (entry.contentBoxSize
          ? entry.contentBoxSize.inlineSize
          : entry.contentRect.width) * this.pxratio;
        const height = (entry.contentBoxSize
          ? entry.contentBoxSize.blockSize
          : entry.contentRect.height) * this.pxratio;

        this.width = width;
        this.height = height;
        this.element.width = width;
        this.element.height = height;
      }

      this.pause();
      this.createParticles(this.options.resize === "increment");
      this.play();
    });

    this.observer.observe(this.element);
  }

  createParticles(increment = false) {
    if (!increment) {
      this.particles = [];
    }

    const diff = this.particles.length - this.calculateAmoutOfParticles();

    if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        this.particles.push(this.generator.createParticle(this));
      }
    } else {
      this.particles.splice(0, diff);
    }
  }

  calculateAmoutOfParticles() {
    if (!this.options.densityArea) {
      return this.options.number;
    }

    const area = (this.element.width * this.element.height) / 1000 /
      (this.pxratio * 2);

    return Math.round(
      Math.abs((area * this.options.number) / this.options.densityArea),
    );
  }

  update() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    if (!this.paused) {
      this.nextFrame = requestAnimationFrame(() => this.update());
    }
  }

  play() {
    if (this.paused) {
      this.paused = false;
      this.update();
    }
  }

  pause() {
    this.paused = true;

    if (this.nextFrame) {
      cancelAnimationFrame(this.nextFrame);
    }
  }
}
