/* tslint:disable:ban-types */
import "babel-polyfill";

export interface IBufferedFunction extends Function {
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
export function buffered(
    fn: Function, ms: number = 200,
): IBufferedFunction {
    let id: number;
    const bn: Function = function(
        this: any, ...args: any[] // tslint:disable-line:trailing-comma
    ) {
        return new Promise((resolve) => {
            clearTimeout(id); id = setTimeout(
                () => resolve(fn.apply(this, args)), ms,
            );
        });
    };
    (bn as IBufferedFunction).cancel = () => {
        clearTimeout(id);
    };
    return bn as IBufferedFunction;
}

export default buffered;
