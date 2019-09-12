define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _homunculus = _interopRequireDefault(require("homunculus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JsNode = _homunculus["default"].getClass('Node', 'es6');

var Token = _homunculus["default"].getClass('Token');

function _default(node, word) {
  var res = recursion(node, {
    's': '',
    'word': word
  });
  return res.s;
}

;

function recursion(node, res) {
  var isToken = node.name() === JsNode.TOKEN;
  var isVirtual = isToken && node.token().type() === Token.VIRTUAL;

  if (isToken) {
    var token = node.token();

    if (!isVirtual) {
      if (res.word && [Token.ID, Token.NUMBER, Token.KEYWORD].indexOf(token.type()) > -1) {
        res.s += ' ';
      }

      if (token.content() === '}' && res.s.charAt(res.s.length - 1) === ';') {
        res.s = res.s.replace(/;$/, '');
      }

      res.s += token.content();
      res.word = [Token.ID, Token.NUMBER, Token.KEYWORD].indexOf(token.type()) > -1;
    } else if (token.content() === ';') {
      res.s += ';';
      res.word = false;
    }
  } else {
    node.leaves().forEach(function (leaf) {
      recursion(leaf, res);
    });
  }

  return res;
}});