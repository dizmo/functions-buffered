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

    it('should preserve this correctly', (done) => {
        index.buffered(function () {
            expect(this).to.be.an('undefined');
        }, 1)();
        index.buffered(() => {
            expect(this).to.be.an('object');
        }, 1)();

        index.buffered(function () {
            expect(this).to.be.an('object');
            expect(this.key).to.equal(1);
        }.bind({key: 1}), 1)();
        index.buffered((() => {
            expect(this).to.be.an('object');
            expect(this.key).to.be.an('undefined');
        }).bind({key: 1}), 1)();

        setTimeout(done, 10);
    });

    it('should buffer invocations', (done) => {
        let n = 0, fn = index.buffered(() => {
            n += 1;
        }, 10);

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
            }, 10);
            expect(n).to.equal(0);
        }, 10);
    });

    it('should buffer invocations with args', (done) => {
        index.buffered(function (t) {
            expect(new Date() - t >= 0).to.be.true;
        }, 0)(new Date());

        index.buffered((t) => {
            expect(new Date() - t >= 10).to.be.true;
        }, 10)(new Date());

        setTimeout(done, 15);
    });

    it('should cancel invocations', () => {
        let f0 = index.buffered(() => {
            expect(true).to.be.false
        }, 0);
        f0(); f0.cancel();

        let f1 = index.buffered(() => {
            expect(true).to.be.false
        }, 1);
        f1(); f1.cancel();
    });
});
