#ifndef GRADIENTDESCENT_H_INCLUDED
#define GRADIENTDESCENT_H_INCLUDED
#include <node.h>
#include <math.h>
#include "typecastings.h"
using namespace v8; 

double calculateError(double label, double calculated) {
	return (calculated - label) * (calculated - label);
}

double _calcDelta(double x, double y,double* weights, double ita) {
	double ans = 0;
	for (unsigned int i = 0; i < sizeof(weights)/sizeof(weights[0]); i++) {
		ans += pow(x, i) * weights[i];
	}
	ans = -2 * ita * (ans - y);
	return ans;
}

double* caluclateDelta(double x, double y, unsigned int order, double* weights, double ita) {
	double* deltas = 0;
	deltas = new double[0];
	for (unsigned int i = 0; i < order; i++) {
		deltas[i] = pow(x, i) * _calcDelta(x, y, weights, ita);
	}
	return deltas;
}

double* learnSlope(v8::Local<v8::Array> x_t, v8::Local<v8::Array> y_t, unsigned int order, double learning_rate, unsigned int maxiter, double minerr, bool verbose) {
	double* weights = 0;	
	weights = new double[0];
	double* xt = jsArrayToCppArray(x_t);
	double* yt = jsArrayToCppArray(y_t);

	for (unsigned int i = 0; i < order; i++) {
		weights[i] = 0;
	}
	for (unsigned int i = 0; i < maxiter; i++) {
		for (unsigned int j in x) {
			double* deltas = caluclateDelta(x[j], y[j], order, weights, ita);
			for (unsigned int k = 0; k < order; k++) {
				weights[k] += deltas[k];
			}
		}
	}
	return weights;
}

// double* learnSlope(v8::Local<v8::Array> x_t, v8::Local<v8::Array> y_t, double learning_rate, unsigned int maxiter, double minerr, bool verbose) {
// 	// convert js array to cpp array
// 	double* xt = jsArrayToCppArray(x_t);
// 	double* yt = jsArrayToCppArray(y_t);
// 	unsigned int length = x_t->Length();

// 	// initialize weights and vars
// 	double w1 = 0.0;
// 	double w2 = 0.0;
// 	double y_calculated = 0.0;
// 	double err = 0.0;

// 	// initialize returning array
// 	double *slopes = 0;
// 	slopes = new double[2];

// 	// iterate until criterion fulfilled
// 	for (unsigned int i = 0; i < maxiter; ++i)
// 	{
// 		double total_err = 0.0;
// 		for (unsigned int j = 0; j < length; ++j)
// 		{
// 			y_calculated = w1 + xt[j] * w2;
// 			err = calculateError(yt[j], y_calculated);
// 			double this_del = gd(w1, w2, learning_rate, xt[j], yt[j]);
// 			w1 += this_del;
// 			w2 += this_del * xt[j];
// 			total_err += err;
// 		}

// 		if (verbose)
// 		{
// 			printf("iter: %d error: %f\n", i, total_err);
// 		}

// 		if (total_err <= minerr) {
// 			// break and exit the loop
// 			if (verbose)
// 			{
// 				printf("Minerr reached in iterations %d %f %f\n", i, w1, w2);
// 			}
			
// 			slopes[0] = w1;
// 			slopes[1] = w2;
// 			printf("Required iterations: %d", i);
// 			return slopes;
// 		}
// 	}

// 	if (verbose)
// 	{
// 		printf("Maxiter reached.\n %f %f", w1, w2);
// 	}
	
// 	slopes[0] = w1;
// 	slopes[1] = w2;
// 	printf("Required iterations: %d", maxiter);
// 	return slopes;
// }

#endif