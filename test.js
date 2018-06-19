const sgd = require('.');

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