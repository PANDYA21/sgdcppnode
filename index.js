const sgd = require('./build/Release/native.node').sgd;

function sgdWrapper(params) {
	return sgd(
		params.input,
		params.output,
		params.order,
		params.learning_rate,
		params.maxiter,
		params.minerr,
		params.verbose 
	);
}

module.exports = sgdWrapper;