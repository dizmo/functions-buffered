export interface BufferedFunction extends Function {
    cancel: Function;
}

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
export function buffered(fn: Function, ms: number=200): BufferedFunction {
    let id: number, buffered: Function = function (
        this: any, ...args: any[]
    ) {
        let self = this, p = new Promise((resolve) => {
            clearTimeout(id); id = setTimeout(() => {
                resolve(fn.apply(self, args));
            }, ms);
        });
        return p;
    };
    (buffered as BufferedFunction).cancel = () => {
        clearTimeout(id);
    };
    return buffered as BufferedFunction;
}

export default buffered;
