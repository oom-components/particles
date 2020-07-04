import { Generator, GeneratorMultiple } from "../src/generator.js";
import Canvas from "../src/canvas.js";

const img = new Image();
img.src = "star.png";

img.addEventListener("load", () => {
  //Generator 1: use the default circle
  const generator1 = new Generator()
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

  //Generator 2: use a image as shape
  const generator2 = new Generator()
    .shape((context, p) => context.drawImage(img, p.x, p.y, p.size, p.size))
    .position({
      speed: 0.5,
      direction: "bottomRight",
      outMode: "out",
      straight: true,
    })
    .size({ min: 5, max: 20 });

  //Combine all generators
  const generator = new GeneratorMultiple(generator1, generator2);

  //Create the particles canvas
  const particles = new Canvas(document.querySelector("#particles"), generator);

  particles.start();

  window.particles = particles;
});
