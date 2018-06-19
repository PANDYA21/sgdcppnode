const _ = require('lodash');

const ita = 0.3;
const maxiter = 10000;
const minerr = 1e-6;
const maxerr = 1e3;

function f(x) {
	return w1 + w2 * x;
}

function calcErr(calc, label) {
	return (calc - label) * (calc - label);
}

function gd(w1, w2, ita, x_i, y_i) {
	return -ita * 2 * (w1 + (w2 * x_i) - y_i);
}

let raw_min;
let raw_max;
function generateSyntheticData(w1, w2, lim = 100) {
	let x = [];
	let y = [];
	for (let i = lim - 1; i >= 0; i--) {
		x.push(i);
		y.push(w1 + w2 * i);
	}
	return normalizeData({ x, y });
}

function normalizeData(obj) {
	const whole = _.concat(obj.x, obj.y);
	raw_max = _.max(whole);
	raw_min = _.min(whole);
	// let normalizedvals = normalize(_.concat(obj.x, obj.y));
	let normalizedvals = scale(whole);
	return {
		x: _.slice(normalizedvals, 0, obj.x.length),
		y: _.slice(normalizedvals, obj.x.length, obj.x.length + obj.y.length),
	};
}

function sd(arr) {
	let deviations = [];
	const mean = _.sum(arr) / arr.length;
	_.each(arr, x => deviations.push(Math.pow(x - mean, 2)));
	return Math.sqrt(_.sum(deviations) / deviations.length);
}

function normalize(arr) {
	let ans = [];
	const mean = _.sum(arr) / arr.length;
	_.each(arr, x => ans.push((x - mean) / sd(arr)));
	return ans;
}

function scale(arr) {
	let ans = [];
	const min = _.min(arr);
	const max = _.max(arr);
	_.each(arr, x => ans.push((x - min) / (max - min)));
	return ans;
}

function deScale(num) {
	return num * (raw_max - raw_min) + raw_min;
}

function getIndexes(arr) {
	let indexes = [];
	Object.keys(arr).forEach(x => indexes.push(parseInt(x)));
	return indexes;
}

const { x, y } = generateSyntheticData(10, 2, 100);
let w1 = 0.1;
let w2 = 0.5;
w1 = 1;
w2 = 1;
const shuffled_indexes = _.shuffle(getIndexes(x));
for (let i = 0; i < maxiter; i++) {
	for (let j of shuffled_indexes) {
		const x_i = x[j];
		const y_i = y[j];
		const this_del = gd(w1, w2, ita, x_i, y_i);
		w1 += this_del;
		w2 += this_del * x_i;
		const err = calcErr(f(x_i), y_i);
		console.log({ x_i, y_i, y_caret_i: f(x_i), w1, w2, err });

		if (err > maxerr) {
			console.warn('Error too big');
			break;
		}

		if (err <= minerr) {
			console.info('minerr reached');
			break;
		}
	}
}

function prettyNum(num) {
	return Math.round(num * 1e5) / 1e5;
}
console.log('Learned weights: ', w1, w2);
const preds = [];
_.each(x, xx => preds.push(f(xx)));
let errs = [];
for (let i in x) {
	let this_vals = {
		x: prettyNum(deScale(x[i])),
		y: prettyNum(deScale(y[i])),
		y_: prettyNum(deScale(preds[i]))
	};
	this_vals.e = calcErr(this_vals.y, this_vals.y_);
	errs.push(this_vals.e);
	this_vals.e = prettyNum(this_vals.e);
	console.log(this_vals);
}

console.log(Math.sqrt(_.sum(errs)));
// EoF
