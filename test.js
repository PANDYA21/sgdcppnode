const sgd = require('.');
const _ = require('lodash');

// generate synthetic data
const nrows = 10; // data size
let xt = [];
let yt = [];
const m = 20; // slope of the line
const c = 3; // intersection with x-axis

for (let i = 1; i < nrows; i++) {
	xt.push(i / Math.pow(nrows, 1));
	yt.push((m * i) / Math.pow(nrows, 1) + c);
}

const slopes = sgd({
	input: xt,
	output: yt,
	learning_rate: 0.3, 
	maxiter: 1e5,
	minerr: 1e-13,
	verbose: false
});

console.log(slopes);
