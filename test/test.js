'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('index', () => {
    it('should exist', () => {
        expect(index).to.exist;
    });
    it('should export a default', () => {
        expect(index.default).to.exist;
    });
});

describe('index.buffered', () => {
    it('should exist', () => {
        expect(index.buffered).to.exist;
    });
    it('should be a function', () => {
        expect(index.buffered).to.be.a('function');
    });
});

describe('index.buffered', () => {
    it('should return a buffered function', () => {
        let f0 = index.default(() => {});
        expect(f0).to.be.a('function');
        let f1 = index.buffered(() => {});
        expect(f1).to.be.a('function');
    });

    it('should preserve `this` correctly', (done) => {
        index.buffered(function () {
            expect(this).to.be.an('undefined');
        }, 1)();
        index.buffered(() => {
            expect(this).to.be.an('object');
        }, 1)();

        index.buffered(function () {
            expect(this).to.be.an('object');
            expect(this.key).to.equal(true);
        }.bind({key: true}), 1)();
        index.buffered((() => {
            expect(this).to.be.an('object');
            expect(this.key).to.be.an('undefined');
        }).bind({key: true}), 1)();

        setTimeout(done, 1);
    });

    it('should buffer invocations', (done) => {
        let n = 0, fn = index.buffered(() => {
            n += 1;
        }, 5);

        expect(n).to.equal(0);
        expect(fn).to.be.a('function');

        let id = setInterval(() => {
            expect(n).to.equal(0);
            fn(); fn(); fn();
            expect(n).to.equal(0);
        }, 1);

        setTimeout(() => {
            expect(n).to.equal(0);
            clearInterval(id);
            expect(n).to.equal(0);

            setTimeout(() => {
                expect(n).to.equal(0);
            }, 1);
            expect(n).to.equal(0);

            setTimeout(() => {
                expect(n).to.equal(1); done();
            }, 5);
            expect(n).to.equal(0);
        }, 5);
    });

    it('should forward arguments', (done) => {
        index.buffered(function (t) {
            expect(new Date() - t >= 0).to.equal(true);
        }, 1)(new Date());
        setTimeout(done, 1);
    });

    it('should return a promise', (done) => {
        let fn = index.buffered(function (t) {
            return new Date() - t;
        }, 1);
        let p = fn(new Date());
        expect(p).to.be.a('Promise');
        p.then((res) => {
            expect(res >= 0).to.equal(true);
            throw new Error(res);
        }).catch((err) => {
            expect(err.name).to.equal('Error');
            expect(err.message).to.be.a('string');
            expect(err.message >= 0).to.equal(true);
        });
        setTimeout(done, 1);
    });

    it('should await a result', async () => {
        let fn = index.buffered(function (t) {
            return new Date() - t;
        }, 1);

        let dt = await fn(new Date());
        expect(dt).to.be.a('number');
        expect(dt >= 0).to.equal(true);
    });

    it('should return a cancelable function', () => {
        let fn = index.default(() => {});
        expect(fn).to.be.a('function');
        expect(fn.cancel).to.be.a('function');
    });

    it('should cancel invocations', () => {
        let fn = index.buffered(() => {
            expect(true).to.equal(false);
        }, 1);
        fn(); fn(); fn(); fn.cancel();
    });
});
