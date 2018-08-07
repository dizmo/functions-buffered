"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:trailing-comma */
var index_1 = require("./index");
function decor(arg, key, tpd) {
    if (typeof arg === "number") {
        return _decor(arg);
    } else {
        return _decor()(arg, key, tpd);
    }
}
exports.decor = decor;
function _decor(ms) {
    return function (tgt, key, tpd) {
        if (tpd) {
            tpd.value = index_1.buffered(tpd.value, ms);
            return tpd;
        } /* else {
            tgt[key] = buffered(tgt[key], ms);
          }*/
    };
}
exports._decor = _decor;
exports.default = decor;
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map
//# sourceMappingURL=decor.js.map