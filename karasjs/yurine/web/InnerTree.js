define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _homunculus = _interopRequireDefault(require("homunculus"));

var _csx = _interopRequireDefault(require("./csx"));

var _ignore = _interopRequireDefault(require("./ignore"));

var _linkage = _interopRequireDefault(require("./linkage"));

var _join = _interopRequireDefault(require("./join2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Token = _homunculus["default"].getClass('token', 'csx');

var Node = _homunculus["default"].getClass('node', 'csx');

var InnerTree =
/*#__PURE__*/
function () {
  function InnerTree() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, InnerTree);

    this.res = '';
    this.opt = opt;
    this.param = param;
  }

  _createClass(InnerTree, [{
    key: "parse",
    value: function parse(node) {
      this.recursion(node);
      return this.res;
    }
  }, {
    key: "recursion",
    value: function recursion(node) {
      var self = this;
      var isToken = node.isToken();

      if (isToken) {
        var token = node.token();

        if (token.isVirtual()) {
          return;
        }

        if (!token.ignore) {
          this.res += token.content();
        }

        while (token.next()) {
          token = token.next();

          if (token.isVirtual() || !_ignore["default"].S.hasOwnProperty(token.type())) {
            break;
          }

          if (!token.ignore) {
            this.res += token.content();
          }
        }
      } else {
        switch (node.name()) {
          case Node.CSXElement:
          case Node.CSXSelfClosingElement:
            this.res += (0, _csx["default"])(node, {
              isInBind: self.opt.isInBind || self.opt.isBind,
              arrowFn: self.opt.arrowFn
            }, self.param);
            return;

          case Node.RETSTMT:
            if (self.opt.isBind || self.opt.isInBind) {
              var allReturn = true;
              self.opt.arrowFn = self.opt.arrowFn || [];

              for (var i = 0, len = self.opt.arrowFn.length; i < len; i++) {
                if (!self.opt.arrowFn[i]) {
                  allReturn = false;
                  break;
                }
              }

              if (allReturn) {
                var temp = (0, _linkage["default"])(node.leaf(1), self.param, {
                  arrowFn: self.opt.arrowFn
                });
                var list = temp.arr;
                var listener = list.length === 1 ? '"' + list[0] + '"' : JSON.stringify(list);

                if (list.length) {
                  return this.res += (0, _join["default"])(node.first()) + 'new yurine.Obj(' + listener + ',()=>{return(' + new InnerTree(self.opt, self.param).parse(node.leaf(1)).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')})';
                }
              }
            }

            break;

          case Node.ARROWFN:
            self.opt.arrowFn = self.opt.arrowFn || [];

            if (self.opt.arrowFn.length === 0) {
              self.opt.arrowFn.push(true);
            } else {
              var is = false;

              var _temp = node.parent();

              if (_temp && _temp.name() === Node.ARGLIST) {
                _temp = _temp.parent();

                if (_temp && _temp.name() === Node.ARGS) {
                  var callexpr = _temp.parent();

                  _temp = _temp.prev();

                  if (_temp && _temp.name() === Node.MMBEXPR) {
                    _temp = _temp.leaf(2);

                    if (_temp.isToken() && _temp.token().content() === 'map') {
                      is = callexpr.parent().name() === Node.RETSTMT;
                    }
                  }
                }
              }

              self.opt.arrowFn.push(is);
            }

            break;
        }

        node.leaves().forEach(function (leaf) {
          self.recursion(leaf);
        });

        switch (node.name()) {
          case Node.ARROWFN:
            self.opt.arrowFn.pop();
            break;
        }
      }
    }
  }]);

  return InnerTree;
}();

var _default = InnerTree;
exports["default"] = _default;});