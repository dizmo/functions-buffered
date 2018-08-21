"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:ban-types trailing-comma */
require("babel-polyfill");
/**
 * Returns a buffered and cancelable version for the provided function.
 *
 * The buffered function does *not* get invoked,   before the specified
 * delay in milliseconds passes,  no matter how much it gets invoked in
 * between. Also upon the invocation of the *actual* function a promise
 * is returned.  Further,  it is also possible to *cancel* a particular
 * invocation before the delay passes.
 *
 * @param fn an arbitrary function
 * @param ms delay in milliseconds
 * @returns a buffered function
 */
function buffered(fn) {
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
exports.default = buffered;
//# sourceMappingURL=buffered.js.map