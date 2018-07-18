[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-buffered.svg)](https://npmjs.org/package/@dizmo/functions-buffered)
[![Build Status](https://travis-ci.org/dizmo/functions-buffered.svg?branch=master)](https://travis-ci.org/dizmo/functions-buffered)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-buffered/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-buffered?branch=master)

# @dizmo/functions-buffered
A [Node.js] module that returns a *buffered* and *cancelable* version for the provided function. The buffered function does **not** execute before the specified delay passes upon which it executes exactly **once**, no matter have many times it gets invoked in between. Also upon the invocation of the *buffering* function a promise is returned. Further, the *cancellation* of a particular invocation is only possible while the specified delay has not passed.

[Node.js]: https://nodejs.org/en/

## Usage
### Install
```sh
npm install @dizmo/functions-buffered --save
```
### Require
```javascript
var lib = require('@dizmo/functions-buffered');
```
### Examples
```javascript
var buffered = require('@dizmo/functions-buffered').buffered;
var fn = buffered((t) => {
    return new Date() - t;
}, 200);

fn(new Date()).then((res) => {
    console.debug(res);
}).catch((err) => {
    console.error(err);
});
```
```javascript
var buffered = require('@dizmo/functions-buffered').buffered;
var fn = buffered(() => {
    throw new Error("won't be thrown");
}, 600);

fn().then((res) => { // won't execute (due to `fn.cancel`)
    console.debug(res);
}).catch((err) => {
    console.error(err);
});

fn.cancel();
```

## Development
### Build
```sh
npm run build
```
### Lint
```sh
npm run lint
```
#### with fixes:
```sh
npm run lint:fix
```
### Test
```sh
npm run test
```
### Cover
```sh
npm run cover
```

## Copyright

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland
