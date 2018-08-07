[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-buffered.svg)](https://npmjs.org/package/@dizmo/functions-buffered)
[![Build Status](https://travis-ci.org/dizmo/functions-buffered.svg?branch=master)](https://travis-ci.org/dizmo/functions-buffered)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-buffered/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-buffered?branch=master)

# @dizmo/functions-buffered
A [Node.js] module that returns a *buffered* and *cancelable* version for the provided function. The buffered function does **not** execute before the specified delay passes upon which it executes exactly **once**, no matter have many times it gets invoked in between.

The *cancellation* of a particular invocation is only possible while the specified delay has not passed yet. Further, upon the invocation of the buffered function a *promise* is returned. Also, for [TypeScript] developers a decorator is provided as well.

[Node.js]: https://nodejs.org/en/
[TypeScript]: https://www.typescriptlang.org/

## Usage
### Install
```sh
npm install @dizmo/functions-buffered --save
```
### Require
```javascript
let lib = require('@dizmo/functions-buffered');
```
### Examples
```typescript
import { buffered } from '@dizmo/functions-buffered';

let fn = buffered((t: Date) => {
    return new Date().getTime() - t.getTime();
}, 200);

fn(new Date()).then((res: number) => {
    console.debug(res);
}).catch((err: Error) => {
    console.error(err);
});
```
```typescript
import { buffered } from '@dizmo/functions-buffered';

let fn = buffered(() => {
    throw new Error("won't be thrown");
}, 600);

fn().then((res: any) => { // won't execute!
    console.debug(res);
}).catch((err: Error) => {
    console.error(err);
});

fn.cancel();
```
```typescript
import { decorator as buffered } from '@dizmo/functions-buffered';

class Class {
    @buffered(100)
    public f1(t: Date): number {
        return new Date().getTime() - t.getTime();
    }
    @buffered // 200ms default
    public f2(t: Date): number {
        return new Date().getTime() - t.getTime();
    }
}

const p1: Promise<number>
    = new Class().f1(new Date()) as any;
const p2: Promise<number>
    = new Class().f2(new Date()) as any;

p1.then((res: number) => { console.debug(res); });
p2.then((res: number) => { console.debug(res); });
```

## Development
### Build
```sh
npm run build
```
#### without linting:
```sh
npm run -- build --no-lint
```
### Lint
```sh
npm run lint
```
#### with auto-fixing (for JavaScript and TypeScript):
```sh
npm run -- lint --fix
```
### Test
```sh
npm run test
```
#### without (re-)building:
```sh
npm run -- test --no-build
```
### Cover
```sh
npm run cover
```
#### without (re-)building:
```sh
npm run -- cover --no-build
```

## Copyright

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland
