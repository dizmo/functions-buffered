import "babel-polyfill";
export interface ICancelableFunction {
    (this: any, ...args: any[]): Promise<any>;
}
export interface ICancelableFunction {
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
export declare function buffered(fn: Function, ms?: number): ICancelableFunction;
export default buffered;
//# sourceMappingURL=buffered.d.ts.map