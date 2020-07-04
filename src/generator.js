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
      strokeColor: undefined,
      strokeWidth: undefined,
      shadowColor: undefined,
      shadowBlur: undefined,
    };
    this.animate = {};
  }

  color(color) {
    this.properties.color = color;
    return this;
  }

  strokeColor(color) {
    this.properties.strokeColor = color;
    return this;
  }

  shadowColor(color) {
    this.properties.shadowColor = color;
    return this;
  }

  strokeWidth(width, animate) {
    this.properties.strokeWidth = width;
    this.animate.strokeWidth = animate;
    return this;
  }

  shadowBlur(blur, animate) {
    this.properties.shadowBlur = blur;
    this.animate.shadowBlur = animate;
    return this;
  }

  shadowX(offset, animate) {
    this.properties.shadowX = offset;
    this.animate.shadowX = animate;
    return this;
  }

  shadowY(offset, animate) {
    this.properties.shadowY = offset;
    this.animate.shadowY = animate;
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
      color: val(this.properties.color),
      strokeColor: val(this.properties.strokeColor),
      shadowColor: val(this.properties.shadowColor),
      strokeWidth: val(this.properties.strokeWidth, random) * pxratio,
      shadowBlur: val(this.properties.shadowBlur, random),
      shadowX: val(this.properties.shadowX, random) * pxratio,
      shadowY: val(this.properties.shadowY, random) * pxratio,
      shape: val(this.properties.shape),
      opacity: val(this.properties.opacity, random),
      size: val(this.properties.size, random) * pxratio,
    };

    if (typeof properties.shape === "string") {
      properties.shape = shapes[properties.shape];
    }

    properties.x = random(
      {
        min: properties.size * 2,
        max: canvas.width - properties.size * 2,
        round: true,
      },
    );
    properties.y = random(
      {
        min: properties.size * 2,
        max: canvas.height - properties.size * 2,
        round: true,
      },
    );

    const animate = {
      opacity: anim(properties.opacity, this.animate.opacity),
      size: anim(properties.size, this.animate.size, pxratio),
      position: animPosition(this.animate.position),
      strokeWidth: anim(
        properties.strokeWidth,
        this.animate.strokeWidth,
        pxratio,
      ),
      shadowBlur: anim(properties.shadowBlur, this.animate.shadowBlur),
      shadowX: anim(properties.shadowX, this.animate.shadowX, pxratio),
      shadowY: anim(properties.shadowY, this.animate.shadowY, pxratio),
    };

    return new Particle(properties, animate, canvas);
  }
}

function val(value, generate) {
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
    return generate(value);
  }

  return value;
}

function random(value) {
  const max = value.max || 1;
  const min = value.min || 0;
  const val = Math.round((Math.random() * (max - min) + min) * 100) / 100;

  return val.round ? Math.round(val) : val;
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

function anim(value, config, pxratio = 1) {
  if (!config) {
    return null;
  }
  const anim = {
    speed: (val(config.speed) * pxratio) / 100,
  };

  if (!val(config.sync)) {
    anim.speed *= Math.random();
  }

  if (config.to < value) {
    anim.max = value;
    anim.min = config.to;
  } else {
    anim.min = value;
    anim.max = config.to;
  }

  return anim;
}
