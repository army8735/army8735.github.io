define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _homunculus = _interopRequireDefault(require("homunculus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ES6Token = _homunculus["default"].getClass('token', 'js');

var Token = _homunculus["default"].getClass('token', 'csx');

var Node = _homunculus["default"].getClass('node', 'csx');

var S = {};
S[Token.LINE] = S[Token.COMMENT] = S[Token.BLANK] = true;
var res;
var append;

function ignore(node, includeLine) {
  if (node instanceof Token || node instanceof ES6Token) {
    if (node.isVirtual()) {
      return;
    }

    node.ignore = true;
    append = '';

    while (node = node.next()) {
      if (node.isVirtual() || !S.hasOwnProperty(node.type())) {
        break;
      }

      var s = node.content();
      res += s;
      append += s;

      if (includeLine || s != '\n') {
        node.ignore = true;
      }
    }
  } else if (node.isToken()) {
    ignore(node.token(), includeLine);
  } else {
    node.leaves().forEach(function (leaf) {
      ignore(leaf, includeLine);
    });
  }
}

function parse(node, includeLine) {
  res = '';
  append = '';
  ignore(node, includeLine);
  return {
    res: res,
    append: append
  };
}

parse.S = S;
var _default = parse;
exports["default"] = _default;});