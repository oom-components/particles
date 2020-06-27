import Particle from "./particle.js";

const directions = {
  top: { x: 0, y: -1 },
  topRight: { x: 0.5, y: -0.5 },
  right: { x: 1, y: -0 },
  bottomRight: { x: 0.5, y: 0.5 },
  bottom: { x: 0, y: 1 },
  bottomLeft: { x: -0.5, y: 1 },
  left: { x: -1, y: 0 },
  topLeft: { x: -0.5, y: -0.5 },
  none: { x: 0, y: 0 },
};

const shapes = {
  circle(context, p) {
    context.beginPath();
    context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
    context.closePath();
  },
};

export default class Generator {
  constructor() {
    this.properties = {
      color: "#fff",
      shape: "circle",
      opacity: 1,
      size: 10,
    };
    this.animate = {};
  }

  color(color) {
    this.properties.color = color;
    return this;
  }

  opacity(opacity, animate) {
    this.properties.opacity = opacity;
    this.animate.opacity = animate;
    return this;
  }

  size(size, animate) {
    this.properties.size = size;
    this.animate.size = animate;
    return this;
  }

  position(animate) {
    this.animate.position = animate;
    return this;
  }

  createParticle(canvas) {
    const pxratio = canvas.pxratio;
    const properties = {
      color: getColor(this.properties.color),
      shape: val(this.properties.shape),
      opacity: val(this.properties.opacity, randomFloat),
      size: val(this.properties.size, randomInteger) * pxratio,
    };

    if (typeof properties.shape === "string") {
      properties.shape = shapes[properties.shape];
    }

    properties.x = randomInteger(
      { min: properties.size * 2, max: canvas.width - properties.size * 2 },
    );
    properties.y = randomInteger(
      { min: properties.size * 2, max: canvas.height - properties.size * 2 },
    );

    const animate = {
      opacity: animOpacity(properties.opacity, this.animate.opacity),
      size: animSize(properties.size, this.animate.size, pxratio),
      position: animPosition(this.animate.position),
    };

    return new Particle(properties, animate, canvas);
  }
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : null;
}

function val(value, def) {
  if (value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    return val(value[Math.floor(Math.random() * value.length)]);
  }

  if (typeof value === "function") {
    return value();
  }

  if (typeof value === "object" && ("max" in value || "min" in value)) {
    return def(value);
  }

  return value;
}

function getColor(value) {
  const color = val(value, randomColor);

  if (color === "random") {
    return randomColor();
  }

  return typeof color === "string" ? hexToRgb(color) : color;
}

function randomColor() {
  const minmax = { min: 0, max: 255 };

  return [
    randomInteger(minmax),
    randomInteger(minmax),
    randomInteger(minmax),
  ];
}

function randomFloat(value) {
  const max = value.max || 1;
  const min = value.min || 0;

  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomInteger(value) {
  return Math.round(randomFloat(value));
}

function animPosition(position) {
  if (!position) {
    return null;
  }

  const anim = {
    outMode: val(position.outMode),
    speed: val(position.speed),
  };

  const direction = val(position.direction) || "none";
  const velocity = directions[direction];

  if (val(position.sync)) {
    anim.velocityX = velocity.x;
    anim.velocityY = velocity.y;
  } else {
    anim.velocityX = velocity.x + Math.random() - 0.5;
    anim.velocityY = velocity.y + Math.random() - 0.5;
  }

  return anim;
}

function animSize(size, config, pxratio) {
  if (!config) {
    return null;
  }
  const anim = {
    speed: (val(config.speed) * pxratio) / 100,
  };

  if (!val(config.sync)) {
    anim.speed *= Math.random();
  }

  if (config.to < size) {
    anim.max = size;
    anim.min = config.to;
  } else {
    anim.min = size;
    anim.max = config.to;
  }

  return anim;
}

function animOpacity(opacity, config) {
  if (!config) {
    return null;
  }

  const anim = {
    speed: val(config.speed) / 100,
  };

  if (!val(config.sync)) {
    anim.speed *= Math.random();
  }

  if (config.to < opacity) {
    anim.max = opacity;
    anim.min = config.to;
  } else {
    anim.min = opacity;
    anim.max = config.to;
  }

  return anim;
}
