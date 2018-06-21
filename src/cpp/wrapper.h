#ifndef WRAPPER_H_INCLUDED
#define WRAPPER_H_INCLUDED
#include <node.h>
#include <math.h>
#include "typecastings.h"
#include "gradientdescent.h"
using namespace v8; 

Local<Object> wrapItUp(Isolate *isolate, v8::Local<v8::Array> x_t, v8::Local<v8::Array> y_t, unsigned int order, double learning_rate, unsigned int maxiter, double minerr, bool verbose) {
	// typecasting
	double* xt = jsArrayToCppArray(x_t);
	double* yt = jsArrayToCppArray(y_t);
	unsigned int datalength = x_t->Length();

	// iterate and learn weights
	double* learned_weights = learnSlope(xt, yt, datalength, order, learning_rate, maxiter, minerr, verbose);
	double err = rmse(xt, yt, learned_weights, datalength, order);

  // export
  Local<Object> resp = Object::New(isolate);
  Local<Array> weights = cpp1DArrayToJs1DArray(isolate, learned_weights, order);
  resp->Set(String::NewFromUtf8(isolate, "weights"), weights);
  resp->Set(String::NewFromUtf8(isolate, "rmse"), Number::New(isolate, err));

  return resp;
}

#endif