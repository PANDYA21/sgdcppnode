const _ = require('lodash');

function rand(lower_lim = 0, upper_lim = 1) {
	return Math.floor((Math.random() * upper_lim) + lower_lim);
}

function f(x, w1, w2) {
	return w1 + w2 * x;
}

function calcErr(calc, label) {
	return (calc - label) * (calc - label);
}

function gd(w1, w2, ita, x_i, y_i) {
	return -ita * 2 * (w1 + (w2 * x_i) - y_i);
}

function generateSyntheticData(w1, w2, lim = 100, add_noise = true, should_normalize = true) {
	let x = [];
	let y = [];
	for (let i = lim - 1; i >= 0; i--) {
		x.push(i / lim);
		y.push(w1 + (w2 * i) / lim + rand(0, 100) / 100);
	}
	return should_normalize ? normalizeData({ x, y }) : { x, y };
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


function sgdJs(maxiter, x, y, w1, w2, ita, minerr, verbose) {
	const shuffled_indexes = _.shuffle(getIndexes(x));
	for (let i = 0; i < maxiter; i++) {
		let total_err = 0;
		for (let j of shuffled_indexes) {
			const x_i = x[j];
			const y_i = y[j];
			const this_del = gd(w1, w2, ita, x_i, y_i);
			w1 += this_del;
			w2 += this_del * x_i;
			total_err += calcErr(f(x_i, w1, w2), y_i);
		}
		
		verbose ? console.log('iter: ', i, ' err: ', total_err) : null;

		if (total_err <= minerr) {
			verbose ? console.info('minerr reached') : null;
			console.info('Iterations required: ', i);
			return { w1, w2 };
		}
	}

	verbose ? console.info('maxiter reached') : null;
	console.info('Iterations required: ', maxiter);
	return { w1, w2 };
}

function sgdWrapper(params) {
	return sgdJs(
		params.maxiter,
		params.input,
		params.output,
		0,
		0,
		params.learning_rate,
		params.minerr,
		params.verbose
	);
}

function prettyNum(num) {
	return Math.round(num * 1e5) / 1e5;
}


module.exports = {
	sgdJs: sgdWrapper,
	generateSyntheticData,
	f
};
// EoF
