"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../lib/index");
require("mocha");
describe("index.buffered", function () {
    it("should exist", function () {
        chai_1.expect(index_1.buffered).to.not.be.an("undefined");
    });
    it("should be a function", function () {
        chai_1.expect(index_1.buffered).to.be.a("function");
    });
});
describe("index.buffered", function () {
    it("should return a buffered function", function () {
        var fn = index_1.buffered(function () {
            chai_1.expect(true).to.eq(true);
        });
        chai_1.expect(fn).to.be.a("function");
    });
    it("should preserve `this` correctly", function (done) {
        index_1.buffered(function () {
            chai_1.expect(this).to.be.an("undefined");
        }, 1)();
        index_1.buffered(function () {
            chai_1.expect(this).to.be.an("object");
            chai_1.expect(this.key).to.eq(true);
        }.bind({ key: true }), 1)();
        setTimeout(done, 1);
    });
    it("should buffer invocations", function (done) {
        var n = 0;
        var fn = index_1.buffered(function () {
            n += 1;
        }, 5);
        chai_1.expect(n).to.eq(0);
        chai_1.expect(fn).to.be.a("function");
        var id = setInterval(function () {
            chai_1.expect(n).to.eq(0);
            fn();
            fn();
            fn();
            chai_1.expect(n).to.eq(0);
        }, 1);
        setTimeout(function () {
            chai_1.expect(n).to.eq(0);
            clearInterval(id);
            chai_1.expect(n).to.eq(0);
            setTimeout(function () {
                chai_1.expect(n).to.eq(0);
            }, 1);
            chai_1.expect(n).to.eq(0);
            setTimeout(function () {
                chai_1.expect(n).to.eq(1);
                done();
            }, 5);
            chai_1.expect(n).to.eq(0);
        }, 5);
    });
    it("should forward arguments", function (done) {
        index_1.buffered(function (t) {
            chai_1.expect(new Date().getTime() - t >= 0).to.eq(true);
        }, 1)(new Date().getTime());
        setTimeout(done, 1);
    });
    it("should return a promise", function (done) {
        var fn = index_1.buffered(function (t) {
            return new Date().getTime() - t;
        }, 1);
        var p = fn(new Date().getTime());
        chai_1.expect(p).to.be.a("Promise");
        p.then(function (res) {
            chai_1.expect(res >= 0).to.eq(true);
            throw new Error(res.toString());
        }).catch(function (err) {
            chai_1.expect(err.name).to.eq("Error");
            chai_1.expect(err.message).to.be.a("string");
            chai_1.expect(err.message >= "0").to.eq(true);
        });
        setTimeout(done, 1);
    });
    it("should await a result", function () {
        return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var fn, dt;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            fn = index_1.buffered(function (t) {
                                return new Date() - t;
                            }, 1);
                            _context.next = 3;
                            return fn(new Date());

                        case 3:
                            dt = _context.sent;

                            chai_1.expect(dt).to.be.a("number");
                            chai_1.expect(dt >= 0).to.eq(true);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    });
    it("should return a cancelable function", function () {
        var fn = index_1.buffered(function () {
            chai_1.expect(true).to.eq(true);
        });
        chai_1.expect(fn).to.be.a("function");
        chai_1.expect(fn.cancel).to.be.a("function");
    });
    it("should cancel invocations", function () {
        var fn = index_1.buffered(function () {
            chai_1.expect(true).to.eq(false);
        }, 1);
        fn();
        fn();
        fn();
        fn.cancel();
    });
});
//# sourceMappingURL=test.js.map