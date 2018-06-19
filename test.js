const sgd = require('.');
const _ = require('lodash');

// generate synthetic data
const nrows = 10; // data size
let xt = [];
let yt = [];
const m = 2;
const c = 0;
for (let i = 0; i < nrows; i++) {
	xt.push(i / Math.pow(nrows, 2));
	yt.push((m * i + c) / Math.pow(nrows, 2));
}

console.log(xt, yt);

const learning_rate = 0.3;
const maxiter = 500;
const minerr = 1e-15;

let slope = [];
for (let i in xt) {
  slope.push(sgd(
    xt[i],
    yt[i],
    learning_rate,
    maxiter,
    minerr
  ));
}

console.log(slope, '\n\n\n\n\n\n\n\n', 'Learned Slope: ', slope.map(x => x.w2).reduce((a, b) => a+b)/slope.length);
