# @oom/particles

Javascript library to generate particles using the canvas API. It has the following features:

* No dependencies
* Superlight
* High performance
* Built with ES6, so you may need a transpiler for old browser support

It's inspired by [particles.js](https://github.com/VincentGarreau/particles.js) library but lighter and with better performance, in order to be more flexible and customizable.

## Install

Requirements:

* NPM or Yarn to install [the package and the dependencies](https://www.npmjs.com/@oom/particles)

```sh
npm install @oom/particles
```

## Usage

```js
import Generator from './vendors/@oom/particles/src/generator.js';
import Canvas from './vendors/@oom/particles/src/canvas.js';

//The particles generator:
const generator = new Generator()
  .color('#ff0033')
  .position({
    speed: 2,
    sync: [true, false],
    direction: ['right'],
    outMode: 'bounce',
  })
  .size(10, {
    speed: 1,
    vs: 1,
    sync: false,
    to: 5,
  })
  .opacity(1, {
    speed: 0.5,
    sync: false,
    to: 0,
  })
  .strokeColor('blue')
  .strokeWidth(3, {
    speed: 0.5,
    to: 1,
  });

//The canvas where the particles will be drawn
const element = document.querySelector('#canvas');

//Options to configure the number of particles, density, etc
const options = {
  number: 150,
  densityArea: 400
};

const canvas = new Canvas(element, generator, options);

//Start the animation
canvas.start();

//Pause the animation
canvas.pause();

//Resume the animation
canvas.play();
```

### Random values

There's many ways to generate random values for color, opacity, size etc:

```js
const generator = new Generator();

//Use an array with the available values:
generator.color(["#333", "blue", "white", "rgb(234,111,0)"]);

//Use an object to generate random values with a min and max value:
generator.opacity({
  min: 0.1,
  max: 0.8,
});

//To generate integer values:
generator.size({
  min: 2,
  max: 20,
  round: true
});

//You can also pass a function that returns the value
generator.opacity(() => Math.random());
```

## Demo

To run the demo, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in `http://localhost:8080/`

There's an online demo here: https://oom-components.github.io/particles/
