"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function buffered(fn, ms = 200) {
    let id, buffered = function (...args) {
        let self = this;
        return new Promise(resolve => {
            clearTimeout(id);
            id = setTimeout(() => {
                resolve(fn.apply(self, args));
            }, ms);
        });
    };
    buffered.cancel = () => {
        clearTimeout(id);
    };
    return buffered;
}
exports.buffered = buffered;
exports.default = buffered;
//# sourceMappingURL=index.js.map