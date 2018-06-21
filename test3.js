
function _calcDelta(x, y, weights, ita = 0.3) {
	let ans = 0;
	for (let i in weights) {
		ans += Math.pow(x, i) * weights[i];
	}
	ans = -2 * ita * (ans - y);
	return ans;
}

function caluclateDelta(x, y, order, weights, ita) {
	let deltas = [];
	for (let i = 0; i < order; i++) {
		deltas.push(Math.pow(x, i) * _calcDelta(x, y, weights, ita))
	}
	return deltas;
}

const _ = require('lodash');
const x = [0.1, 0.2, 0.3, -0.1, -0.2, -0.3];
const f = (x, weights) => { 
	let ans = 0;
	for (let i in weights) {
		ans += weights[i] * Math.pow(x, i);
	}
	return ans;
};
const y = (() => { 
	let y = [];
	_.each(x, xx => y.push(f(xx, [1, 2, 3]))); 
	return y;
})();

function iterate(x, y, ita, maxiter, order) {
	let weights = [];
	for (let i = 0; i < order; i++) {
		weights.push(0);
	}
	for (let i = 0; i < maxiter; i++) {
		for (let j in x) {
			let deltas = caluclateDelta(x[j], y[j], order, weights, ita);
			for (let k = 0; k < order; k++) {
				weights[k] += deltas[k];
			}
		}
	}
	return weights;
}

const ans = iterate(x, y, 0.3, 10000, 3);
const y_c = (() => { 
	let y = [];
	_.each(x, xx => y.push(f(xx, ans))); 
	return y;
})();
console.log(x, y, y_c, ans);
// eof
