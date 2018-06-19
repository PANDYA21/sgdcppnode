#ifndef GRADIENTDESCENT_H_INCLUDED
#define GRADIENTDESCENT_H_INCLUDED
#include <node.h>
#include <math.h>
#include "typecastings.h"
using namespace v8; 

double calculateError(double label, double calculated) {
	return (calculated - label) * (calculated - label);
}

double gd(double w1, double w2, double ita, double x_i, double y_i) {
	return - ita * 2 * (w1 + (w2 * x_i) - y_i);
}

double* learnSlope(v8::Local<v8::Array> x_t, v8::Local<v8::Array> y_t, double learning_rate, unsigned int maxiter, double minerr, bool verbose) {
	// convert js array to cpp array
	double* xt = jsArrayToCppArray(x_t);
	double* yt = jsArrayToCppArray(y_t);
	unsigned int length = x_t->Length();

	// initialize weights and vars
	double w1 = 0.0;
	double w2 = 0.0;
	double y_calculated = 0.0;
	double err = 0.0;

	// initialize returning array
	double *slopes = 0;
	slopes = new double[2];

	// iterate until criterion fulfilled
	for (unsigned int i = 0; i < maxiter; ++i)
	{
		double total_err = 0.0;
		for (unsigned int j = 0; j < length; ++j)
		{
			y_calculated = w1 + xt[j] * w2;
			err = calculateError(yt[j], y_calculated);
			double this_del = gd(w1, w2, learning_rate, xt[j], yt[j]);
			w1 += this_del;
			w2 += this_del * xt[j];
			total_err += err;
		}

		if (verbose)
		{
			printf("iter: %d error: %f\n", i, total_err);
		}

		if (total_err <= minerr) {
			// break the loop
			if (verbose)
			{
				printf("Minerr reached in iterations %d %f %f\n", i, w1, w2);
			}
			
			slopes[0] = w1;
			slopes[1] = w2;
			return slopes;
		}
	}

	if (verbose)
	{
		printf("Maxiter reached.\n %f %f", w1, w2);
	}
	
	slopes[0] = w1;
	slopes[1] = w2;
	return slopes;
}

#endif