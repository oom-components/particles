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

//The particles generator. You can configure the position, size, color and opacity
const generator = new Generator()
  .color('#ff0033')
  .position({
    speed: 2,
    sync: [true, false],
    direction: ['right'],
    outMode: 'bounce',
  })
  .size({ min: 10, max: 50}, {
    speed: 1,
    vs: 1,
    sync: false,
    to: 5,
  })
  .opacity({min: 0.1, max: 0.9}, {
    speed: 0.5,
    sync: false,
    to: 0,
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

## Demo

To run the demo, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in `http://localhost:8080/`

There's an online demo here: https://oom-components.github.io/particles/
