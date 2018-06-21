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
	xt.forEach(x => y.push(f(x)));
	return y;
})();

const learned_weights = sgd({
	input: xt,
	output: yt,
	learning_rate: 0.3, 
	order: -1, // self learn the best order for polynomial fitting
	maxiter: 1e5,
	minerr: 1e-6,
	verbose: false,
	lowerbound: 1,
	upperbound: 4
});

console.log(JSON.stringify(learned_weights, null, 2));

// Expected output:
//   {
//     "weights": [
//       3.000928689352925,
//       19.999955449600268,
//       4.986878794183504
//     ],
//     "rmse": 0.0013137351783434744
//   }
//   Iterations requied: 1102
//   [Finished in 0.2s]
