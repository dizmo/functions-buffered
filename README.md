# buffered
A Node.js module that returns a buffered and cancelable version for the provided function. The buffered function does *not* get invoked before the specified delay in milliseconds passes, no matter have many times it gets invoked in between. Also upon the invocation of the *buffering* function a promise is returned. Further, it is also possible to *cancel* a particular invocation before the delay passes.

## Installation
```sh
npm install --save @hsk81/buffered
```

## Usage
```javascript
var buffered = require('@hsk81/buffered').buffered;
var fn = buffered(function (t) {
    return new Date() - t;
}, 200);

fn(new Date()).then((res) => {
    console.debug(res);
}).catch((err) => {
    console.error(err);
});
```
```javascript
var buffered = require('@hsk81/buffered').buffered;
var fn = buffered(function () {
    throw new Error("won't be thrown");
}, 600);

fn().then((res) => {
    console.debug(res); // won't get executed
}).catch((err) => {
    console.error(err); // won't get executed
});

fn.cancel();
```

## Test
```sh
npm run test
```
