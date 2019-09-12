define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _homunculus = _interopRequireDefault(require("homunculus"));

var _ignore = _interopRequireDefault(require("./ignore"));

var _InnerTree = _interopRequireDefault(require("./InnerTree"));

var _csx = _interopRequireDefault(require("./csx"));

var _join = _interopRequireDefault(require("./join2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Token = _homunculus["default"].getClass('token', 'csx');

var Node = _homunculus["default"].getClass('node', 'csx');

var res;

function stmt(node, param) {
  recursion(node, param);
}

function recursion(node, param) {
  if (node.isToken()) {
    var token = node.token();

    if (token.isVirtual()) {
      return;
    }

    if (!token.ignore) {
      res += token.content();
    }

    while (token.next()) {
      token = token.next();

      if (token.isVirtual() || !_ignore["default"].S.hasOwnProperty(token.type())) {
        break;
      }

      if (!token.ignore) {
        res += token.content();
      }
    }
  } else {
    switch (node.name()) {
      case Node.CSXElement:
      case Node.CSXSelfClosingElement:
        res += (0, _csx["default"])(node, {
          isBind: true
        }, param);
        return;

      case Node.FNEXPR:
      case Node.FNDECL:
      case Node.CLASSEXPR:
        var tree = new _InnerTree["default"]();
        res += tree.parse(node);
        return;
    }

    node.leaves().forEach(function (leaf) {
      recursion(leaf, param);
    });
  }
}

function parse(node, param) {
  res = '';
  var len = node.size();
  node.leaves().forEach(function (leaf, i) {
    //fnbody
    if (i === len - 2) {
      leaf.leaves().forEach(function (item) {
        stmt(item, param);
      });
    } else {
      res += (0, _join["default"])(leaf);
    }
  });
  return res;
}

var _default = parse;
exports["default"] = _default;});