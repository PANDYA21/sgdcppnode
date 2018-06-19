const sgd = require('.');
const _ = require('lodash');

// generate synthetic data
const nrows = 10; // data size
let xt = [];
let yt = [];
const m = 2;
const c = 3;
for (let i = 1; i < nrows; i++) {
	xt.push(i / Math.pow(nrows, 1));
	yt.push((m * i) / Math.pow(nrows, 1) + c);
}

// console.log(xt, yt);

const learning_rate = 0.3;
const maxiter = 500;
const minerr = 1e-15;

const slopes = sgd(
	// xt,
	// yt,
	[0, 0.1, 0.2, 0.3],
	[0, 0.2, 0.4, 0.6],
	learning_rate,
	maxiter,
	minerr,
	false //verbose
);

console.log(slopes);
