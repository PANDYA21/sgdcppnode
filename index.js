const sgd = require('./build/Release/native.node').sgd;

function sgdWrapper(params) {
	return sgd(
		params.input,
		params.output,
		params.order,
		params.learning_rate,
		params.maxiter,
		params.minerr,
		params.verbose,
		params.lowerbound || 1,
		params.upperbound || 4 
	);
}

module.exports = sgdWrapper;