const sgd = require('.');

const xt = [1, 2, 3];
const yt = [2, 4, 6];
const learning_rate = 1;
const maxiter = 100;
const minerr = 0.01;

let slope = sgd(
	xt,
	yt,
	learning_rate,
	maxiter,
	minerr
);

console.log(slope);