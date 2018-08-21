/**
 * Returns a buffered and cancelable version for the given class method.
 *
 * The buffered method does  *not*  get invoked,  before  the specified
 * delay in milliseconds passes,  no matter how much it gets invoked in
 * between. Also upon the invocation of the *actual* function a promise
 * is returned.  Further,  it is also possible to *cancel* a particular
 * invocation before the delay passes.
 *
 * @param ms delay in milliseconds
 * @returns a buffered function
 */
export declare function decorator(ms: number): MethodDecorator;
export declare function decorator(tgt: any, key: string | symbol, tpd?: PropertyDescriptor): PropertyDescriptor | void;
export default decorator;
//# sourceMappingURL=decorator.d.ts.map