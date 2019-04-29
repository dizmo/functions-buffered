[![NPM version](https://badge.fury.io/js/%40dizmo%2Ffunctions-buffered.svg)](https://npmjs.org/package/@dizmo/functions-buffered)
[![Build Status](https://travis-ci.org/dizmo/functions-buffered.svg?branch=master)](https://travis-ci.org/dizmo/functions-buffered)
[![Coverage Status](https://coveralls.io/repos/github/dizmo/functions-buffered/badge.svg?branch=master)](https://coveralls.io/github/dizmo/functions-buffered?branch=master)

# @dizmo/functions-buffered

Returns a *buffered* and *cancelable* version for the provided function. The buffered function does *not* execute before the specified delay passes upon which it executes exactly **once**, no matter have many times it gets invoked in between.

The *cancellation* of a particular invocation is only possible while the specified delay has not passed yet. Further, upon the invocation of the buffered function a *promise* is returned.

## Usage

### Install

```sh
npm install @dizmo/functions-buffered --save
```

### Require

```javascript
let lib = require("@dizmo/functions-buffered");
```

### Examples

```typescript
import { buffered } from "@dizmo/functions-buffered";
```

```typescript
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
class Class {
    @buffered.decorator(100)
    public async f1(t: Date): Promise<number> {
        return new Date().getTime() - t.getTime();
    }
    @buffered.decorator // 200ms default
    public async f2(t: Date) {
        return new Date().getTime() - t.getTime();
    }
}

const p1: Promise<number>
    = new Class().f1(new Date());
const p2
    = new Class().f2(new Date());

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

#### with UMD support (incl. minimization):

```sh
npm run -- build --prepack
```

#### with UMD support (excl. minimization):

```sh
npm run -- build --prepack --no-minify
```

### Lint

```sh
npm run lint
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

 © 2019 [dizmo AG](http://dizmo.com/), Switzerland
