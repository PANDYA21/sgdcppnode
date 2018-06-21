#ifndef GRADIENTDESCENT_H_INCLUDED
#define GRADIENTDESCENT_H_INCLUDED
#include <node.h>
#include <math.h>
#include "typecastings.h"
using namespace v8; 

double calculateError(double label, double calculated) {
	return (calculated - label) * (calculated - label);
}

double f(double x, double* weights, unsigned int length) {
	double y = 0;
	for (unsigned int i = 0; i < length; ++i)
	{
		y += pow(x, i) * weights[i];
	}
	return y;
}

double _calcDelta(double x, double y,double* weights, double ita, unsigned int order) {
	double ans = 0;
	for (unsigned int i = 0; i < order; ++i) 
	{
		ans += pow(x, i) * weights[i];
	}
	ans = -2 * ita * (ans - y);
	return ans;
}

double* caluclateDelta(double x, double y, unsigned int order, double* weights, double ita) {
	double* deltas = 0;
	deltas = new double[order];
	for (unsigned int i = 0; i < order; ++i) 
	{
		deltas[i] = pow(x, i) * _calcDelta(x, y, weights, ita, order);
	}
	return deltas;
}

double* learnSlope(v8::Local<v8::Array> x_t, v8::Local<v8::Array> y_t, unsigned int order, double learning_rate, unsigned int maxiter, double minerr, bool verbose) {
	double* weights = 0;	
	weights = new double[order];
	double* xt = jsArrayToCppArray(x_t);
	double* yt = jsArrayToCppArray(y_t);
	unsigned int datalength = x_t->Length();

	for (unsigned int i = 0; i < order; ++i) 
	{
		weights[i] = 0;
	}
	for (unsigned int i = 0; i < maxiter; ++i) 
	{
		double err = 0;
		for (unsigned int j = 0; j < datalength; ++j) 
		{
			double* deltas = caluclateDelta(xt[j], yt[j], order, weights, learning_rate);
			for (unsigned int k = 0; k < order; ++k) 
			{
				weights[k] += deltas[k];
				err += calculateError(f(xt[j], weights, order), yt[j]);
			}
		}
		if (verbose)
		{
			printf("iter: %d  err: %f\n", i, err);
		}
		if (err <= minerr)
		{
			printf("Iterations requied: %d\n", i);
			return weights;
		}
	}

	printf("Iterations requied: %d\n", maxiter);
	return weights;
}

#endif