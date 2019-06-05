"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* tslint:disable:trailing-comma */

var buffered_1 = require("./buffered");

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
      tpd.value = buffered_1.buffered(tpd.value, ms);
      return tpd;
    } else {
      tgt[key] = buffered_1.buffered(tgt[key], ms);
    }
  };
}

exports["default"] = decorator;
//# sourceMappingURL=decorator.js.map