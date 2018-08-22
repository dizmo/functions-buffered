import { ICancelableFunction } from "./buffered";
export interface IBufferedFunction {
    (fn: Function, ms?: number): ICancelableFunction;
}
export interface IBufferedFunction {
    decorator: Function;
}
export declare const buffered: IBufferedFunction;
export default buffered;
//# sourceMappingURL=index.d.ts.map