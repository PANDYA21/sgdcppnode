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
  Local<Array> xt = Local<Array>::Cast(args[0]);
  Local<Array> yt = Local<Array>::Cast(args[1]);
  
  double learning_rate = args[2]->NumberValue();
  unsigned int maxiter = args[3]->NumberValue();
  double minerr = args[4]->NumberValue();
  bool verbose = args[5]->BooleanValue();
  
  if (verbose)
  {
    printf("Verbose mode \n");
  }

  if (xt->Length() != yt->Length())
  {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Input and Output lengths do not match.")));
    return;
  }

  double* learned_slopes = learnSlope(xt, yt, learning_rate, maxiter, minerr, verbose);

  // export
  Local<Object> finans = Object::New(isolate);

  finans->Set(String::NewFromUtf8(isolate, "w1"), Number::New(isolate, learned_slopes[0]));
  finans->Set(String::NewFromUtf8(isolate, "w2"), Number::New(isolate, learned_slopes[1]));

  // Set the return weight (using the passed in FunctionCallbackInfo<Value>&)
  args.GetReturnValue().Set(finans);
}


void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "sgd", sgd);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo`