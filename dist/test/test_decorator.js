"use strict";
// tslint:disable:max-classes-per-file

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
describe("index.decorator", function () {
    it("should exist", function () {
        chai_1.expect(index_1.decorator).to.not.be.an("undefined");
    });
    it("should be a function", function () {
        chai_1.expect(index_1.decorator).to.be.a("function");
    });
});
describe("index.decorator", function () {
    it("should return a buffered function", function () {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn() {
                    chai_1.expect(true).to.eq(true);
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        chai_1.expect(new Class().fn).to.be.a("function");
    });
    it("should preserve `this` correctly", function (done) {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn() {
                    chai_1.expect(this).to.be.an("object");
                    chai_1.expect(this instanceof Class).to.eq(true);
                    done();
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator(0), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        new Class().fn();
    });
    it("should preserve `this` correctly", function (done) {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn() {
                    chai_1.expect(this).to.be.an("object");
                    chai_1.expect(this.key).to.eq(true);
                    done();
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator(0), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        new Class().fn.bind({ key: true })();
    });
    it("should buffer invocations", function (done) {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);

                this.n = 0;
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn() {
                    this.n += 1;
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator(5), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        var c = new Class();
        chai_1.expect(c.n).to.eq(0);
        chai_1.expect(c.fn).to.be.a("function");
        var id = setInterval(function () {
            chai_1.expect(c.n).to.eq(0);
            c.fn();
            c.fn();
            c.fn();
            chai_1.expect(c.n).to.eq(0);
        }, 1);
        setTimeout(function () {
            chai_1.expect(c.n).to.eq(0);
            clearInterval(id);
            chai_1.expect(c.n).to.eq(0);
            setTimeout(function () {
                chai_1.expect(c.n).to.eq(0);
            }, 1);
            chai_1.expect(c.n).to.eq(0);
            setTimeout(function () {
                chai_1.expect(c.n).to.eq(1);
                done();
            }, 5);
            chai_1.expect(c.n).to.eq(0);
        }, 5);
    });
    it("should forward arguments", function (done) {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn(t) {
                    chai_1.expect(new Date().getTime() - t.getTime() >= 0).to.eq(true);
                    done();
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator(1), __metadata("design:type", Function), __metadata("design:paramtypes", [Date]), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        new Class().fn(new Date());
    });
    it("should return a promise", function (done) {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn(t) {
                    return new Date().getTime() - t.getTime();
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator(1), __metadata("design:type", Function), __metadata("design:paramtypes", [Date]), __metadata("design:returntype", Number)], Class.prototype, "fn", null);
        var p = new Class().fn(new Date());
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
            var Class, dt;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            Class = function () {
                                function Class() {
                                    _classCallCheck(this, Class);
                                }

                                _createClass(Class, [{
                                    key: "fn",
                                    value: function fn(t) {
                                        return new Date().getTime() - t.getTime();
                                    }
                                }]);

                                return Class;
                            }();

                            __decorate([index_1.decorator(1), __metadata("design:type", Function), __metadata("design:paramtypes", [Date]), __metadata("design:returntype", Number)], Class.prototype, "fn", null);
                            _context.next = 4;
                            return new Class().fn(new Date());

                        case 4:
                            dt = _context.sent;

                            chai_1.expect(dt).to.be.a("number");
                            chai_1.expect(dt >= 0).to.eq(true);

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    });
    it("should return a cancelable function", function () {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn() {
                    chai_1.expect(true).to.eq(true);
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        chai_1.expect(new Class().fn).to.be.a("function");
        chai_1.expect(new Class().fn.cancel).to.be.a("function");
    });
    it("should cancel invocations", function () {
        var Class = function () {
            function Class() {
                _classCallCheck(this, Class);
            }

            _createClass(Class, [{
                key: "fn",
                value: function fn() {
                    chai_1.expect(true).to.eq(false);
                }
            }]);

            return Class;
        }();

        __decorate([index_1.decorator(1), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Class.prototype, "fn", null);
        var c = new Class();
        c.fn();
        c.fn();
        c.fn();
        c.fn.cancel();
    });
});
//# sourceMappingURL=test_decorator.js.map