#ifndef TYPECASTING_H_INCLUDED
#define TYPECASTING_H_INCLUDED
#include <node.h>
using namespace v8; 


double *jsArrayToCppArray(v8::Local<v8::Array> arr) {
  double *carr = 0;
  unsigned int length = arr->Length();
  carr = new double [length];
  for (unsigned int i = 0; i < length; ++i)
  {
    carr[i] = arr->Get(i)->NumberValue();
  }

  return carr;
}

v8::Local<v8::Array> cpp1DArrayToJs1DArray(Isolate *isolate, double *ans) {
  v8::Local<v8::Array> finans = v8::Array::New(isolate);
  for (unsigned int i = 0; i < sizeof(ans)/sizeof(ans[0]); ++i)
  {
    finans->Set(i, Number::New(isolate, ans[i]));
  }

  return finans;
}


#endif