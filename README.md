# C++ based Stochastic Gradient Descent Optimization module for Node.JS
This module is implemented on C++ based [sgd optimizer](https://en.wikipedia.org/wiki/Stochastic_gradient_descent#Iterative_method).

## Why
### Benchmark
Weights to learn:
```js
const w1 = 0.5;
const w2 = 2;
```

Outcome:
```js
Iterations required:  100000000
Learned weights with JS:  { w1: 0.31361413912488656, w2: 1.961709566226222 }
Processing time (ms):  119777
Learned weights with CPP:  { w1: 0.40295447227588255, w2: 1.2320685656171875 }
Processing time (ms):  84439
Required iterations: 100000000
```
