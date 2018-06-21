#ifndef WRAPPER_H_INCLUDED
#define WRAPPER_H_INCLUDED
#include <node.h>
#include <math.h>
#include "typecastings.h"
#include "gradientdescent.h"
using namespace v8; 

Local<Object> ensembleOrder(Isolate *isolate, unsigned int lower, unsigned int upper, double* xt, double* yt, unsigned int datalength, double learning_rate, unsigned int maxiter, double minerr, bool verbose) {
	double* rmses = 0;
	rmses = new double[upper - lower];

	double** learnings = 0;
	learnings = new double*[upper - lower];

	double best_rmse = 1e15; //inf
	double* best_weights = 0;
	unsigned int best_order = 0;

	for (unsigned int i = lower; i <= upper; ++i)
	{
		// here order is i, so init all arrays of i size
		learnings[i] = new double[i];
		learnings[i] = learnSlope(xt, yt, datalength, i, learning_rate, maxiter, minerr, verbose);
		rmses[i] = rmse(xt, yt, learnings[i], datalength, i);
		printf("order: %d  rmse: %f\n", i, rmses[i]);
		if (rmses[i] < best_rmse)
		{
			best_rmse = rmses[i];
			best_weights = new double[i];
			best_weights = learnings[i];
			best_order = i;
		}
	}

	// export
  Local<Object> resp = Object::New(isolate);
  Local<Array> weights = cpp1DArrayToJs1DArray(isolate, best_weights, best_order);
  resp->Set(String::NewFromUtf8(isolate, "order"), Number::New(isolate, best_order));
  resp->Set(String::NewFromUtf8(isolate, "weights"), weights);
  resp->Set(String::NewFromUtf8(isolate, "rmse"), Number::New(isolate, best_rmse));

  return resp;
}

Local<Object> wrapItUp(Isolate *isolate, v8::Local<v8::Array> x_t, v8::Local<v8::Array> y_t, unsigned int order, double learning_rate, unsigned int maxiter, double minerr, bool verbose, unsigned int lowerbound, unsigned int upperbound) {
	// typecasting
	double* xt = jsArrayToCppArray(x_t);
	double* yt = jsArrayToCppArray(y_t);
	unsigned int datalength = x_t->Length();

	// iterate and find optimum order by minimum rmse
	if (order != -1)
	{
		Local<Object> resp = ensembleOrder(isolate, order, order, xt, yt, datalength, learning_rate, maxiter, minerr, verbose);
		return resp;
	} else
	{
		Local<Object> resp = ensembleOrder(isolate, lowerbound, upperbound, xt, yt, datalength, learning_rate, maxiter, minerr, verbose);	
		return resp;
	}
}

#endif