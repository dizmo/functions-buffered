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
 * @param ms delay in milliseconds (default: 200)
 * @returns a buffered function (returning a promise)
 */
function buffered(fn, ms = 200) {
    let id, buffered = function (...args) {
        let self = this, p = new Promise((resolve, reject) => {
            if (id !== undefined) {
                clearTimeout(id);
                id = undefined;
            }
            if (id === undefined) {
                id = setTimeout(() => {
                    let res;
                    try {
                        res = fn.apply(self, args);
                    }
                    catch (err) {
                        reject(err);
                    }
                    resolve(res);
                }, ms);
            }
        });
        return p;
    };
    buffered.cancel = () => {
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