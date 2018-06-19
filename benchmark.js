const { sgdJs, generateSyntheticData, f } = require('./sgd_js.js');
const sgdCpp = require('.');
const _ = require('lodash');

const ita = 0.3;
const maxiter = 1e5;
const minerr = 1e-5;
const verbose = false;

const attempts = 5; // 5 performance checks

const w1 = 0.5;
const w2 = 2;
const nrows = 100;
const { x, y } = generateSyntheticData(w1, w2, nrows, false);

let benchmarks = [];

function testJs(next) {
	for (let i = 0; i < attempts; i++) {
		const slopes_js = sgdJs({
			maxiter,
			input: x,
			output: y,
			learning_rate: ita,
			minerr,
			verbose
		});

		console.log('Learned weights with JS: ', slopes_js);
		next((start, end, difference) => {
			console.log('Processing time (ms): ', difference.milliseconds);
			benchmarks.push({
				attempt: i,
				type: 'JS',
				milliseconds: difference.milliseconds,
				difference
			});
		});
	}
}


function testCpp(next) {
	for (let i = 0; i < attempts; i++) {
		const slopes_cpp = sgdCpp({
			input: x,
			output: y,
			learning_rate: ita,
			maxiter,
			minerr,
			verbose
		});

		console.log('Learned weights with CPP: ', slopes_cpp);
		next((start, end, difference) => {
			console.log('Processing time (ms): ', difference.milliseconds);
			benchmarks.push({
				attempt: i,
				type: 'CPP',
				milliseconds: difference.milliseconds,
				difference
			});
		});
	}
}


function benchmark(method) {
	let start = +(new Date);

	method && method(function(callback) {
		let end = +(new Date);
		let difference = end - start;
		callback && callback(start, end, {
			milliseconds: difference,
			ms: difference,
			seconds: (difference / 1000) % 60,
			minutes: (difference / (1000 * 60)) % 60,
			hours: (difference / (1000 * 60 * 60)) % 24
		});
	});
}

benchmark(testJs);
benchmark(testCpp);

// console.log(JSON.stringify(benchmarks, null, 2));

const avg_js = _.sum(_.map(_.filter(benchmarks, { type: 'JS' }), 'milliseconds'))/attempts;
const avg_cpp = _.sum(_.map(_.filter(benchmarks, { type: 'CPP' }), 'milliseconds'))/attempts;

console.log('\n\n');
console.log('Average JS time: ', avg_js);
console.log('Average CPP time: ', avg_cpp);
console.log('\n\n');
