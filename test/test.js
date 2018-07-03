'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('buffered function test', () => {
    it('should return a buffered function', () => {
        let f0 = index.default(() => {});
        expect(f0).to.be.a('function');
        let f1 = index.buffered(() => {});
        expect(f1).to.be.a('function');
    });

    it('should return a cancelable function', () => {
        let fn = index.default(() => {});
        expect(fn).to.be.a('function');
        expect(fn.cancel).to.be.a('function');
    });

    it('should preserve `this` correctly', (done) => {
        index.buffered(function () {
            expect(this).to.be.an('undefined');
        }, 0)();
        index.buffered(() => {
            expect(this).to.be.an('object');
        }, 0)();

        index.buffered(function () {
            expect(this).to.be.an('object');
            expect(this.key).to.equal(1);
        }.bind({key: 1}), 0)();
        index.buffered((() => {
            expect(this).to.be.an('object');
            expect(this.key).to.be.an('undefined');
        }).bind({key: 1}), 0)();

        setTimeout(done, 0);
    });

    it('should buffer invocations', (done) => {
        let n = 0, fn = index.buffered(() => {
            n += 1;
        }, 5);

        expect(n).to.equal(0);
        expect(fn).to.be.a('function');

        let id = setInterval(() => {
            expect(n).to.equal(0);
            fn();
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

    it('should buffer invocations with arguments', (done) => {
        index.buffered(function (t) {
            expect(new Date() - t >= 0).to.equal(true);
        }, 0)(new Date());
        setTimeout(done, 0);
    });

    it('should buffer invocations resulting in a promise', (done) => {
        let fn = index.buffered(function (t) {
            return new Date() - t;
        }, 0);
        let p = fn(new Date());
        expect(p).to.be.a('Promise');
        p.then((res) => {
            expect(res >= 0).to.equal(true);
            throw new Error(res);
        }).catch((err) => {
            expect(err.name).to.be.a('string');
            expect(err.name).to.equal('Error');
            expect(err.message).to.be.a('string');
            expect(err.message >= 0).to.equal(true);
        });
        setTimeout(done, 0);
    });

    it('should cancel invocations', () => {
        let fn = index.buffered(() => {
            expect(true).to.equal(false);
        }, 0);
        fn(); fn.cancel();
    });
});
