define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _homunculus = _interopRequireDefault(require("homunculus"));

var _Tree = _interopRequireDefault(require("./Tree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Yurine =
/*#__PURE__*/
function () {
  function Yurine() {
    _classCallCheck(this, Yurine);

    this.parser = null;
    this.node = null;
  }

  _createClass(Yurine, [{
    key: "parse",
    value: function parse(code) {
      this.parser = _homunculus["default"].getParser('csx');
      this.node = this.parser.parse(code);
      var tree = new _Tree["default"]();
      return tree.parse(this.node);
    }
  }, {
    key: "tokens",
    value: function tokens() {
      return this.ast ? this.parser.lexer.tokens() : null;
    }
  }, {
    key: "ast",
    value: function ast() {
      return this.node;
    }
  }], [{
    key: "parse",
    value: function parse(code) {
      return new Yurine().parse(code);
    }
  }]);

  return Yurine;
}();

var _default = new Yurine();

exports["default"] = _default;});