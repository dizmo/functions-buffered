"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* tslint:disable:ban-types callable-types */

var buffered_1 = require("./buffered");

var decorator_1 = require("./decorator");

exports.buffered = function () {
  buffered_1.buffered.decorator = decorator_1.decorator;
  return buffered_1.buffered;
}();

exports["default"] = exports.buffered;
//# sourceMappingURL=index.js.map