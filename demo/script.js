import Generator from "../src/generator.js";
import Canvas from "../src/canvas.js";

const generator = new Generator()
  .color(["#ffffff", "#ffff99"])
  .position({
    speed: 0.5,
    direction: "bottomRight",
    outMode: "out",
    straight: true,
  })
  .size({ min: 1, max: 5 })
  .opacity({ min: 0.1, max: 0.9 })
  .shadowBlur([10, 0, 5]);

const particles = new Canvas(document.querySelector("#particles"), generator);

particles.start();

window.particles = particles;
