"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:trailing-comma */
var index_1 = require("./index");
function decorator(arg, key, tpd) {
    if (typeof arg === "number") {
        return _decorator(arg);
    } else {
        return _decorator()(arg, key, tpd);
    }
}
exports.decorator = decorator;
function _decorator(ms) {
    return function (tgt, key, tpd) {
        if (tpd) {
            tpd.value = index_1.buffered(tpd.value, ms);
            return tpd;
        } else {
            tgt[key] = index_1.buffered(tgt[key], ms);
        }
    };
}
exports._decorator = _decorator;
exports.default = decorator;
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map
//# sourceMappingURL=decorator.js.map