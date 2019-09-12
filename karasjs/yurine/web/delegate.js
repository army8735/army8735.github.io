define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _homunculus = _interopRequireDefault(require("homunculus"));

var _ignore = _interopRequireDefault(require("./ignore"));

var _InnerTree = _interopRequireDefault(require("./InnerTree"));

var _join = _interopRequireDefault(require("./join"));

var _join2 = _interopRequireDefault(require("./join2"));

var _jaw = _interopRequireDefault(require("jaw"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Token = _homunculus["default"].getClass('token', 'csx');

var Node = _homunculus["default"].getClass('node', 'csx');

var S = {};
S[Token.LINE] = S[Token.COMMENT] = S[Token.BLANK] = true;
var res = '';

function parse(node) {
  var prmr = node.leaf(1);

  if (prmr && prmr.name() === Node.PRMREXPR) {
    var objltr = prmr.first();

    if (objltr && objltr.name() === Node.OBJLTR) {
      res = (0, _ignore["default"])(node.first(), true).res + '[';
      recursion(objltr);
      res += (0, _ignore["default"])(node.last(), true).res + ']';
    } else {
      var tree = new _InnerTree["default"]();
      res = tree.parse(node);
      res = res.replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1');
      res = filter(res);
    }
  } else {
    var _tree = new _InnerTree["default"]();

    res = _tree.parse(node);
    res = res.replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1');
    res = filter(res);
  }

  return res;
}

function recursion(objltr) {
  res += (0, _ignore["default"])(objltr.first(), true).res;

  for (var i = 1, len = objltr.size(); i < len - 1; i++) {
    var leaf = objltr.leaf(i);

    if (leaf.isToken()) {
      var s = (0, _join2["default"])(leaf);
      res += s;
    } else if (leaf.name() === Node.PROPTDEF) {
      res += '[';
      var proptname = leaf.first();

      var _s = (0, _join["default"])(proptname).replace(/^(["'])(.+)\1$/, '$2') + '{}';

      _s = _jaw["default"].parse(_s, {
        noPriority: true,
        noValue: true,
        noMedia: true
      });
      res += JSON.stringify(_s);
      res += ',';
      res += filter((0, _join["default"])(leaf.last()));
      res += ']';
      res += (0, _ignore["default"])(leaf, true).res;
    }
  }

  res += (0, _ignore["default"])(objltr.last(), true).res;
}

function filter(s) {
  if (/^\s*this\b/.test(s) || /^\s*function\b/.test(s)) {
    if (/^\s*this\s*\.\s*model\s*\./.test(s)) {
      return 'new yurine.Cb(this.model,' + s + ')';
    }

    return 'new yurine.Cb(this,' + s + ')';
  }

  return s;
}

var _default = parse;
exports["default"] = _default;});