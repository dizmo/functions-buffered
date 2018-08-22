/* tslint:disable:ban-types callable-types */
import { buffered as _buffered } from "./buffered";
import { ICancelableFunction } from "./buffered";
import { decorator as _decorator } from "./decorator";

export interface IBufferedFunction {
    (fn: Function, ms?: number): ICancelableFunction;
}
export interface IBufferedFunction {
    decorator: Function;
}
export const buffered: IBufferedFunction = (() => {
    (_buffered as IBufferedFunction).decorator = _decorator;
    return _buffered as IBufferedFunction;
})();

export default buffered;
