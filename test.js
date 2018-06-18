const sgd = require('.');

const xt = 1;
const yt = 0.1;
const learning_rate = 0.3;
const maxiter = 100;
const minerr = 1e-5;

let slope = sgd(
	xt,
	yt,
	learning_rate,
	maxiter,
	minerr 
);

console.log(slope);