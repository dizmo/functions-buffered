"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:trailing-comma */
require("babel-polyfill");
/**
 * Returns a buffered and cancelable version for the provided function.
 *
 * The buffered function does *not* get invoked before the specified delay in
 * milliseconds passes, no matter have many times it gets invoked in between.
 * Also upon the invocation of the *actual* function a promise is returned.
 * Further, it is also possible to *cancel* a particular invocation before the
 * delay passes.
 *
 * @param fn an arbitrary function
 * @param ms delay in milliseconds
 * @returns a buffered function
 */
function buffered(fn) // tslint:disable-line:ban-types
{
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

    var id = void 0;
    var bn = function bn() {
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
function decorator(arg, key, tpd) {
    if (typeof arg === "number") {
        return _decorator(arg);
    } else {
        return _decorator()(arg, key, tpd);
    }
}
exports.decorator = decorator;
function _decorator(ms) {
    return function (tgt, key, tpd) {
        if (tpd) {
            tpd.value = buffered(tpd.value, ms);
            return tpd;
        } else {
            tgt[key] = buffered(tgt[key], ms);
        }
    };
}
exports.default = buffered;
//# sourceMappingURL=index.js.map