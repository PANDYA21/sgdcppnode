const sgd = require('.');

// generate synthetic data
const w1 = 3;
const w2 = 20;
const w3 = 5;
const weights = [3, 20, 5];
const xt = [0.1, 0.2, 0.3, -0.1, -0.2, -0.3];
const noise = (lowerlim = 0, upperlim = 1) => Math.floor((Math.random() * upperlim) + lowerlim);
const f = (x) => {
	let y = 0;
	for (let i in weights) {
		y += Math.pow(x, i) * weights[i] + noise();
	}
	return y;
};
const yt = (() => {
	let y = [];
	xt.forEach(xx => y.push(f(xx)));
	return y;
})();

const learned_weights = sgd({
	input: xt,
	output: yt,
	learning_rate: 0.3, 
	order: weights.length, 
	maxiter: 10000,
	minerr: 1e-5,
	verbose: false
});

console.log(learned_weights);

// Expected output:
//   { weights: [ 3.0000000000000107, 20, 4.999999999999847 ] }
//   Required iterations: 1033