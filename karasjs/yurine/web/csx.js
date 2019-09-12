define(function(require, exports, module){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _homunculus = _interopRequireDefault(require("homunculus"));

var _InnerTree = _interopRequireDefault(require("./InnerTree"));

var _linkage = _interopRequireDefault(require("./linkage"));

var _ignore = _interopRequireDefault(require("./ignore"));

var _join = _interopRequireDefault(require("./join"));

var _join2 = _interopRequireDefault(require("./join2"));

var _delegate = _interopRequireDefault(require("./delegate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Token = _homunculus["default"].getClass('token', 'csx');

var Node = _homunculus["default"].getClass('node', 'csx');

function elem(node, opt, param) {
  var res = ''; //open和selfClose逻辑复用

  res += selfClose(node.first(), opt, param);
  res += ',[';
  var comma = false;

  for (var i = 1, len = node.size(); i < len - 1; i++) {
    var leaf = node.leaf(i);

    switch (leaf.name()) {
      case Node.CSXChild:
        if (comma) {
          res += ',';
          comma = false;
        }

        res += child(leaf, opt, param);
        comma = true;
        break;

      case Node.TOKEN:
        var s = leaf.token().content(); //open和close之间的空白不能忽略

        if (/^\s+$/.test(s)) {
          if (leaf.prev().name() === Node.CSXOpeningElement && leaf.next().name() === Node.CSXClosingElement) {
            res += '"' + s.replace(/"/g, '\\"').replace(/\n/g, '\\n\\\n') + '"';
          } else {
            res += s;
          }
        } else {
          if (comma) {
            res += ',';
            comma = false;
          }

          res += '"' + s.replace(/"/g, '\\"').replace(/\n/g, '\\n\\\n') + '"';
          comma = true;
        }

        break;

      default:
        if (comma) {
          res += ',';
          comma = false;
        }

        res += parse(leaf, opt, param);
        comma = true;
    }
  }

  res += '])';

  if (node.last().name() === Node.CSXClosingElement) {
    res += (0, _ignore["default"])(node.last(), true).res;
  }

  return res;
}

function selfClose(node, opt, param) {
  var res = '';
  var name;
  var first = node.leaf(1);

  if (first.isToken()) {
    name = first.token().content();
  } else if (first.name() === Node.CSXMemberExpression) {
    name = first.first().token().content();

    for (var i = 1, len = first.size(); i < len; i++) {
      name += first.leaf(i).token().content();
    }
  }

  if (/^[A-Z]/.test(name)) {
    res += 'karas.createCp(';
    res += name;
  } else if (/^\$/.test(name)) {
    res += 'karas.createGm(';
    res += '"' + name + '"';
  } else {
    res += 'karas.createVd(';
    res += '"' + name + '"';
  }

  res += ',[';

  for (var _i = 2, _len = node.size(); _i < _len - 1; _i++) {
    var leaf = node.leaf(_i);

    if (_i !== 2) {
      res += ',';
    }

    switch (leaf.name()) {
      case Node.CSXBindAttribute:
        res += attr(leaf, opt, param);
        break;

      case Node.CSXAttribute:
        res += attr(leaf, opt, param);
        break;

      case Node.CSXSpreadAttribute:
        res += spread(leaf);
        break;
    }
  }

  res += ']';
  return res;
}

function attr(node, opt, param) {
  var res = '';
  var key = node.first().token().content();
  var name = node.parent().leaf(1).token().content();
  var isCp = /^[A-Z]/.test(name);

  if (key.charAt(0) === '@') {
    key = key.slice(1);
  } // 组件属性非@申明均不bind
  else if (isCp && opt.isBind) {
      opt.isBind = false;
    }

  var k = '["' + key + '"';
  res += k + ',';
  var v = node.last();

  if (v.isToken()) {
    v = v.token().content();
    res += v;
  } else if (/^on-?[a-zA-Z]/.test(key)) {
    res += onEvent(v, opt, param);
  } else {
    res += child(v, opt, param, true);
  }

  res += ']';
  return res;
}

function onEvent(node, opt, param) {
  return (0, _delegate["default"])(node, param);
}

function spread(node) {
  return (0, _join["default"])(node.leaf(2));
}

function child(node, opt, param, isAttr) {
  var callexpr = node.leaf(1);

  if (opt.isBind) {
    var temp = (0, _linkage["default"])(callexpr, param, {
      arrowFn: opt.arrowFn
    });
    var list = temp.arr;
    var single = temp.single;
    var bind = temp.bind;

    if (list.length) {
      var listener = list.length === 1 ? '"' + list[0] + '"' : JSON.stringify(list);

      if (isAttr) {
        var key = node.prev().prev().token().content();

        if (key === 'value' || key === 'checked' || key === 'selected') {
          var tag = node.parent().parent().leaf(1).token().content();

          if (tag === 'input' || tag === 'select' || tag === 'option') {
            var value = node.leaf(1); // 单独值mmbexpr非运算符双向绑定，其余单向

            if (value.name() === Node.MMBEXPR) {
              var v = (0, _join2["default"])(value);
              return 'new yurine.Obj(' + listener + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')}' + (single ? ',true' : ',false') + (bind ? ',(v)=>{v!==' + v + '&&(' + v + '=v)})' : ')');
            }

            return 'new yurine.Obj(' + listener + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')}' + (single ? ',true' : '') + ')';
          }
        }
      } else if (node.prev() && node.prev().name() === Node.CSXOpeningElement) {
        var _key = node.prev().leaf(1).token().content();

        if (_key === 'textarea') {
          var _value = node.leaf(1);

          if (_value.name() === Node.MMBEXPR) {
            var _v = (0, _join2["default"])(_value);

            return 'new yurine.Obj(' + listener + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')}' + (single ? ',true' : ',false') + (bind ? ',(v)=>{v!==' + _v + '&&(' + _v + '=v)})' : ')');
          }
        }
      }

      return 'new yurine.Obj(' + listener + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')}' + (single ? ',true' : '') + ')';
    }
  } // Obj中再次出现的:input的value还需要添加Obj
  else if (opt.isInBind) {
      if (isAttr) {
        var _key2 = node.prev().prev().token().content();

        if (_key2 === 'value') {
          var _tag = node.parent().parent().leaf(1).token().content();

          if (_tag === 'input' || _tag === 'select') {
            var _temp = (0, _linkage["default"])(callexpr, param, {
              arrowFn: opt.arrowFn
            });

            var _list = _temp.arr;
            var _bind = _temp.bind;

            if (_list.length) {
              var _value2 = node.leaf(1);

              var _listener = _list.length === 1 ? '"' + _list[0] + '"' : JSON.stringify(_list);

              if (_value2.name() === Node.MMBEXPR) {
                var _v2 = (0, _join2["default"])(_value2);

                return 'new yurine.Obj(' + _listener + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')}' + ',false' + (_bind ? ',(v)=>{v!==' + _v2 + '&&(' + _v2 + '=v)})' : ')');
              }

              return 'new yurine.Obj(' + _listener + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')})';
            }
          }
        }
      } else if (node.prev() && node.prev().name() === Node.CSXOpeningElement) {
        var _key3 = node.prev().leaf(1).token().content();

        if (_key3 === 'textarea') {
          var _temp2 = (0, _linkage["default"])(callexpr, param, {
            arrowFn: opt.arrowFn
          });

          var _list2 = _temp2.arr;
          var _bind2 = _temp2.bind;

          if (_list2.length) {
            var _value3 = node.leaf(1);

            var _listener2 = _list2.length === 1 ? '"' + _list2[0] + '"' : JSON.stringify(_list2);

            if (_value3.name() === Node.MMBEXPR) {
              var _v3 = (0, _join2["default"])(_value3);

              return 'new yurine.Obj(' + _listener2 + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')}' + ',false' + (_bind2 ? ',(v)=>{v!==' + _v3 + '&&(' + _v3 + '=v)})' : ')');
            }

            return 'new yurine.Obj(' + _listener2 + ',()=>{return(' + new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1') + ')})';
          }
        }
      }
    }

  return new _InnerTree["default"](opt, param).parse(node).replace(/^(\s*){/, '$1').replace(/}(\s*)$/, '$1');
}

function parse(node, opt, param) {
  var res = '';

  switch (node.name()) {
    case Node.CSXElement:
      res += elem(node, opt, param);
      break;

    case Node.CSXSelfClosingElement:
      res += selfClose(node, opt, param);
      res += ')';
      break;
  }

  return res;
}

var _default = parse;
exports["default"] = _default;});