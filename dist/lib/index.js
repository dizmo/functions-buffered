"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:ban-types */
require("babel-polyfill");
/**
 * Returns a buffered and cancelable version for the provided function.
 *
 * The buffered function does *not* get invoked before the specified delay in
 * milliseconds passes, no matter have many times it gets invoked in between.
 * Also upon the invocation of the *buffering* function a promise is returned.
 * Further, it is also possible to *cancel* a particular invocation before the
 * delay passes.
 *
 * @param fn an arbitrary function
 * @param ms delay in milliseconds
 * @returns a buffered function (returning a promise)
 */
function buffered(fn) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

    var id = void 0;
    var bn = function bn() // tslint:disable-line:trailing-comma
    {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new Promise(function (resolve) {
            clearTimeout(id);
            id = setTimeout(function () {
                return resolve(fn.apply(_this, args));
            }, ms);
        });
    };
    bn.cancel = function () {
        clearTimeout(id);
    };
    return bn;
}
exports.buffered = buffered;
function decorator(arg, key, descriptor) {
    if (typeof arg === "number") {
        return _decorator(arg);
    } else {
        _decorator(200)(arg, key, descriptor);
    }
}
exports.decorator = decorator;
function _decorator(ms) {
    return function (target, key, descriptor) {
        var fn = descriptor ? descriptor.value : target[key];
        var bn = buffered(fn, ms);
        for (var el in fn) {
            if (fn.hasOwnProperty(el)) {
                bn[el] = fn[el];
            }
        }
        if (descriptor) {
            descriptor.value = bn;
        } else {
            target[key] = bn;
        }
    };
}
exports.default = buffered;
//# sourceMappingURL=index.js.map