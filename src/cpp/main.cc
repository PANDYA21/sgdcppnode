// addon.cc
#include <node.h>
#include <math.h>
#include "gradientdescent.h"
#include "typecastings.h"

namespace demo {

using namespace v8; 


void sgd(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  // Check the number of arguments passed.
  if (args.Length() < 5) {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  // parse arguments
  double xt = args[0]->NumberValue();
  double yt = args[1]->NumberValue();
  double learning_rate = args[2]->NumberValue();
  unsigned int maxiter = args[3]->NumberValue();
  double minerr = args[4]->NumberValue();
  // double slope_init = args[5]->NumberValue();
  // double constant_init = args[6]->NumberValue();

  double learned_slope = learnSlope(xt, yt, learning_rate, maxiter, minerr);

  // export
  Local<Object> finans = Object::New(isolate);
  finans->Set(String::NewFromUtf8(isolate, "learned_slope"), Number::New(isolate, learned_slope));
  // finans->Set(String::NewFromUtf8(isolate, "weights"), weights);
  // finans->Set(String::NewFromUtf8(isolate, "weights"), weights);
  // finans->Set(String::NewFromUtf8(isolate, "weights"), weights);

  // Set the return weight (using the passed in FunctionCallbackInfo<Value>&)
  args.GetReturnValue().Set(finans);
}


void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "sgd", sgd);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo`