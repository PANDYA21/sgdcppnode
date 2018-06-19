const _ = require('lodash');

const ita = 0.3;
const maxiter = 1e6;
const minerr = 1e-16;
const maxerr = 1e3;

function f(x) {
	return w1 + w2 * x;
}

function calcErr(calc, label) {
	return (calc - label) * (calc - label);
}

// function gd(w1, w2, ita, x_i, y_i) {
// 	return -ita * 2 * (w1 + (w2 * x_i) - y_i);
// }

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
const shuffled_indexes = _.shuffle(getIndexes(x));
const sgd = require('.');

let slopes = [];
for (let j of shuffled_indexes) {
	slopes.push(sgd(
    x[j],
    y[j],
    ita,
    maxiter,
    minerr
  ));
}

const w1 = _.sum(_.map(slopes, 'w1')) / slopes.length;
const w2 = _.sum(_.map(slopes, 'w2')) / slopes.length;

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
// // EoF
