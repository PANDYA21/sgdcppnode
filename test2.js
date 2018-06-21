// const sgd = require('.');

// // generate synthetic data
// const xt = [0, 1];
// const yt = [1, 0];

// const slopes = sgd({
// 	input: xt,
// 	output: yt,
// 	learning_rate: 0.3, 
// 	maxiter: 1e5,
// 	minerr: 1e-13,
// 	verbose: false
// });

// console.log(slopes);
// console.log(slopes.w1 + slopes.w2 * xt[0]);
// console.log(slopes.w1 + slopes.w2 * xt[1]);
// console.log(slopes.w1 + slopes.w2 * 0.5);
// console.log(slopes.w1 + slopes.w2 * -1);

// Expected output:
//   { w1: 3.0000004020842144, w2: 19.999998451399563 }
//   Required iterations: 1033

const de_w1 = (x, y, w1, w2, w3) => -2 * (w1 + w2 * x + w3 * x * x - y);
const de_w2 = (x, y, w1, w2, w3) => x * de_w1(x, y, w1, w2, w3);
const de_w3 = (x, y, w1, w2, w3) => x * de_w2(x, y, w1, w2, w3);

const _ = require('lodash');
const x = [0.1, 0.2, 0.3, -0.1, -0.2, -0.3];
const f = (x, w1, w2, w3) => w1 + w2 * x + w3 * x * x;
const y = (() => { 
	let y = [];
	_.each(x, xx => y.push(f(xx, 1, 2, 3))); 
	return y;
})();

function iterate(x, y, ita, maxiter, w1 = 0, w2 = 0, w3 = 0) {
	for (let i = 0; i < maxiter; i++) {
		for (let j in x) {
			w1 += ita * de_w1(x[j], y[j], w1, w2, w3);
			w2 += ita * de_w2(x[j], y[j], w1, w2, w3);
			w3 += ita * de_w3(x[j], y[j], w1, w2, w3);
		}
	}
	return { w1, w2, w3 };
}

const ans = iterate(x, y, 0.3, 10000);
const y_c = (() => { 
	let y = [];
	_.each(x, xx => y.push(f(xx, ans.w1, ans.w2, ans.w3))); 
	return y;
})();
console.log(x, y, y_c, ans);
// eof
