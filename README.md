# buffered
A Node.js module that returns a buffered and cancelable version for the provided function.

The buffered function does *not* get invoked before the specified delay in milliseconds passes, no matter have many times it gets invoked in between. Further, it is also possible to *cancel* a particular invocation before the delay passes.

## Installation
```sh
npm install --save @hsk81/buffered
```

## Usage
```javascript
var buffered = require('@hsk81/buffered').default;
var fn = buffered(function (t) {
    console.log(new Date() - t);
}, 200);

fn(new Date());
```
```javascript
var buffered = require('@hsk81/buffered').buffered;
var fn = buffered(function () {
    throw new Error('should not be thrown');
}, 600);

fn();
fn.cancel();
```

## Test
```sh
npm run test
```
