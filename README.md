# C++ based Stochastic Gradient Descent Optimization module for Node.JS
This module is implemented on C++ based [sgd optimizer](https://en.wikipedia.org/wiki/Stochastic_gradient_descent#Iterative_method).

## Usage
Install:
```shell
npm install git+https://github.com/RAW21/sgdcppnode.git --save
```

Require:
```js
const sgd = require('sgd-cpp-nodejs');

// generate synthetic data
const w1 = 3; // intersection with x-axis
const w2 = 20; // slope of the line
const xt = [0.1, 0.2, 0.3];
const f = (x) => w1 + w2 * x;
const yt = [f(0.1), f(0.2), f(0.3)];

const slopes = sgd({
	input: xt,
	output: yt,
	learning_rate: 0.3, 
	maxiter: 1e5,
	minerr: 1e-13,
	verbose: false
});

console.log(slopes);

// Expected output:
//   { w1: 3.0000004020842144, w2: 19.999998451399563 }
//   Required iterations: 1033
```

## Why
C++ add-ons for nodeJS are quite performant than native node modules. The motivation behind developing this add-on/module is based on the following benchmark.

### Benchmark
#### Single Attempt
Weights to learn:
```js
const ita = 0.3;
const maxiter = 1e5;
const minerr = 1e-5;
const verbose = false;
const attempts = 1; // number of performance checks

// weights to learn and data size
const w1 = 0.5;
const w2 = 2;
const nrows = 100;
```

Outcome:
```js
Iterations required:  100000
Learned weights with JS:  { w1: 0.27534322030308456, w2: 1.8251252795222055 }
Processing time (ms):  141
Learned weights with CPP:  { w1: 0.4085977705077681, w2: 1.451816311362102 }
Processing time (ms):  85


Average JS time:  141
Average CPP time:  85


Required iterations: 100000
```

#### Multiple Attempts
With the same parameters except `const attempts = 50;`, the outcome is:

```js
Average JS time:  130.52
Average CPP time:  84.54
```

CPP turns out to be approximately <b style="color: lightgreen; background-color: black;">35%</b> faster than JS!


## TODO
- Polynomial regression
- Exponential curve fitting
- Evaluation measures