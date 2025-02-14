"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var LoansFixed = /*#__PURE__*/(0, _createClass2["default"])(function LoansFixed(options) {
  (0, _classCallCheck2["default"])(this, LoansFixed);
  (0, _defineProperty2["default"])(this, "v1", void 0);
  (0, _defineProperty2["default"])(this, "v2", void 0);
  (0, _defineProperty2["default"])(this, "v2_1", void 0);
  (0, _defineProperty2["default"])(this, "collection", void 0);
  this.v1 = options === null || options === void 0 ? void 0 : options.v1;
  this.v2 = options === null || options === void 0 ? void 0 : options.v2;
  this.v2_1 = options === null || options === void 0 ? void 0 : options.v2_1;
  this.collection = options === null || options === void 0 ? void 0 : options.collection;
});
var _default = LoansFixed;
exports["default"] = _default;