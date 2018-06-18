#ifndef GRADIENTDESCENT_H_INCLUDED
#define GRADIENTDESCENT_H_INCLUDED
#include <node.h>
#include <math.h>
# include "typecastings.h"
using namespace v8; 

double calculateError(double label, double calculated) {
	// return sqrt(label*label - calculated*calculated);
	return label - calculated;
}

double gd(double learning_rate, double err, double current_slop) {
	// return - err * (1 - err) * learning_rate / current_slop;
	return err * learning_rate;
}

double mean(double* arr) {
	double summ = 0;
	unsigned int len = sizeof(arr)/sizeof(arr[0]);
	for (int i = 0; i < len; ++i)
	{
		summ += arr[i];
	}

	return summ / len;
}

double learnSlope(v8::Local<v8::Array> xt, v8::Local<v8::Array> yt, double learning_rate, unsigned int maxiter, double minerr) {
	double *x_t = jsArrayToCppArray(xt);
	double *y_t = jsArrayToCppArray(yt);
	double slope = 1.0;
	double *y_calculated = x_t;
	double *err = x_t;

	for (unsigned int i = 0; i < sizeof(x_t)/sizeof(x_t[0]); ++i)
	{
		y_calculated[i] = 0;
		err[i] = 1;
		printf("%f, %f\n", y_calculated[i], err[i]);
	}

	for (unsigned int i = 0; i < maxiter; ++i)
	{
		for (unsigned int j = 0; j < xt->Length(); ++j)
		{
			y_calculated[j] = x_t[j] * slope;
			err[j] = calculateError(y_t[j], y_calculated[j]);
			slope += gd(learning_rate, err[j], slope);
			printf("iter: %d  j: %d  error: %f\n", i, j, err[j]);
		}
		if (abs(mean(err)) <= minerr) {
			printf("Minerr %f reached in iterations %d\n", abs(mean(err)), i);
			return slope;
		}
	}

	printf("Maxiter reached");
	return slope;
}

#endif