#ifndef GRADIENTDESCENT_H_INCLUDED
#define GRADIENTDESCENT_H_INCLUDED
#include <node.h>
#include <math.h>
using namespace v8; 

double calculateError(double label, double calculated) {
	// return sqrt(label*label - calculated*calculated);
	return label - calculated;
}

double gd(double learning_rate, double err, double current_slop) {
	// return - err * (1 - err) * learning_rate / current_slop;
	return err * learning_rate;
}

double learnSlope(double xt, double yt, double learning_rate, unsigned int maxiter, double minerr) {
	double slope = 0.0;
	double y_calculated = 0.0;
	double err = 0.0;

	for (unsigned int i = 0; i < maxiter; ++i)
	{
		y_calculated = xt * slope;
		err = calculateError(yt, y_calculated);
		if (err <= minerr) {
			printf("Minerr reached in iterations %d\n", i);
			return slope;
		}
		slope += gd(learning_rate, err, slope);
		printf("iter: %d error: %f\n", i, err);
	}

	printf("Maxiter reached");
	return slope;
}

#endif