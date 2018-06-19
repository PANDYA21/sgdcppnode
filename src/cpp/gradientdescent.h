#ifndef GRADIENTDESCENT_H_INCLUDED
#define GRADIENTDESCENT_H_INCLUDED
#include <node.h>
#include <math.h>
using namespace v8; 

double calculateError(double label, double calculated) {
	return (calculated - label) * (calculated - label);
}

double gd(double w1, double w2, double ita, double x_i, double y_i) {
	return - ita * 2 * (w1 + (w2 * x_i) - y_i);
}

double* learnSlope(double xt, double yt, double learning_rate, unsigned int maxiter, double minerr) {
	double w1 = 0.0;
	double w2 = 0.0;
	double y_calculated = 0.0;
	double err = 0.0;

	double *slopes = 0;
	slopes = new double[2];
	printf("slopes[0]: %f\n", slopes[0]);
	printf("slopes[1]: %f\n", slopes[1]);

	for (unsigned int i = 0; i < maxiter; ++i)
	{
		y_calculated = w1 + xt * w2;
		err = calculateError(yt, y_calculated);
		if (err <= minerr) {
			printf("Minerr reached in iterations %d %f %f\n", i, w1, w2);
			slopes[0] = w1;
			slopes[1] = w2;
			return slopes;
			// return w2;
		}
		// w2 += gd(learning_rate, err, w2, xt, yt);
		double this_del = gd(w1, w2, learning_rate, xt, yt);
		w1 += this_del;
		w2 += this_del * xt;
		printf("iter: %d error: %f\n", i, err);
	}

	printf("Maxiter reached.\n %f %f", w1, w2);
	slopes[0] = w1;
	slopes[1] = w2;
	return slopes;
	// return w2;
}

#endif