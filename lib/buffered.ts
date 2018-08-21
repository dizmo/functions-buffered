/* tslint:disable:ban-types trailing-comma */
import "babel-polyfill";

type IPromiseFunction = (
    this: any, ...args: any[]) => Promise<any>;
export interface IBufferedFunction extends IPromiseFunction {
    cancel: () => void;
}

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
export function buffered(
    fn: Function, ms: number = 200
): IBufferedFunction {
    let id: number;
    const bn: IPromiseFunction = function(
        this: any, ...args: any[]
    ): Promise<any> {
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
