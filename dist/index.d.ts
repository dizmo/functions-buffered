export interface BufferedFunction extends Function {
    cancel: Function;
}
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
export declare function buffered(fn: Function, ms?: number): BufferedFunction;
export default buffered;
//# sourceMappingURL=index.d.ts.map