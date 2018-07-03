"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a buffered and cancelable version for the provided function.
 *
 * The buffered function does *not* get invoked before the specified delay in
 * milliseconds passes, no matter have many times it gets invoked in between.
 * Further, it is also possible to *cancel* a particular invocation before the
 * delay passes.
 *
 * @param fn an arbitrary function
 * @param ms delay in milliseconds
 * @returns a buffered function
 */
function buffered(fn, ms) {
    if (ms === void 0) { ms = 200; }
    var id, buffered = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        if (id !== undefined) {
            clearTimeout(id);
            id = undefined;
        }
        if (id === undefined) {
            id = setTimeout(function () {
                fn.apply(self, args);
            }, ms);
        }
    };
    buffered.cancel = function () {
        if (id !== undefined) {
            clearTimeout(id);
            id = undefined;
        }
    };
    return buffered;
}
exports.buffered = buffered;
exports.default = buffered;
//# sourceMappingURL=index.js.map