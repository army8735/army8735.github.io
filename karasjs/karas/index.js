(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.karas = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var Node =
  /*#__PURE__*/
  function () {
    function Node() {
      _classCallCheck(this, Node);

      this.__x = 0;
      this.__y = 0;
      this.__width = 0;
      this.__height = 0;
      this.__prev = null;
      this.__next = null;
      this.__ctx = null; // canvas的context

      this.__parent = null;
      this.__style = {}; // style被解析后的k-v形式

      this.__baseLine = 0;
    }

    _createClass(Node, [{
      key: "__offsetX",
      value: function __offsetX(diff) {
        this.__x += diff;
      }
    }, {
      key: "__offsetY",
      value: function __offsetY(diff) {
        this.__y += diff;
      }
    }, {
      key: "x",
      get: function get() {
        return this.__x;
      }
    }, {
      key: "y",
      get: function get() {
        return this.__y;
      }
    }, {
      key: "width",
      get: function get() {
        return this.__width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.__height;
      }
    }, {
      key: "outerWidth",
      get: function get() {
        return this.__width;
      }
    }, {
      key: "outerHeight",
      get: function get() {
        return this.__height;
      }
    }, {
      key: "prev",
      get: function get() {
        return this.__prev;
      }
    }, {
      key: "next",
      get: function get() {
        return this.__next;
      }
    }, {
      key: "parent",
      get: function get() {
        return this.__parent;
      }
    }, {
      key: "style",
      get: function get() {
        return this.__style;
      }
    }, {
      key: "ctx",
      get: function get() {
        return this.__ctx;
      }
    }, {
      key: "baseLine",
      get: function get() {
        return this.__baseLine;
      }
    }]);

    return Node;
  }();

  var mode = 0;
  var measureDom;
  var svgHtml;
  var mode$1 = {
    setCanvas: function setCanvas() {
      mode = 0;
    },
    setSvg: function setSvg() {
      mode = 1;
      svgHtml = '';
    },
    isCanvas: function isCanvas() {
      return mode === 0;
    },
    isSvg: function isSvg() {
      return mode === 1;
    },
    appendHtml: function appendHtml(s) {
      svgHtml += s;
    },

    get html() {
      return svgHtml;
    },

    get measure() {
      if (!measureDom) {
        measureDom = document.createElement('div');
        measureDom.style.position = 'absolute';
        measureDom.style.left = '99999px';
        measureDom.style.top = '-99999px';
        measureDom.style.visibility = 'hidden';
        document.body.appendChild(measureDom);
      }

      return measureDom;
    }

  };

  function arr2hash(arr) {
    var hash = {};

    for (var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];

      if (Array.isArray(item)) {
        hash[item[0]] = item[1];
      } else {
        for (var list = Object.keys(item), j = list.length - 1; j >= 0; j--) {
          var k = list[j];
          hash[k] = item[k];
        }
      }
    }

    return hash;
  }

  function hash2arr(hash) {
    var arr = [];

    for (var list = Object.keys(hash), i = 0, len = list.length; i < len; i++) {
      var k = list[i];
      arr.push([k, hash[k]]);
    }

    return arr;
  }

  function spread(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];

      if (!Array.isArray(item)) {
        var temp = [];

        for (var list = Object.keys(item), j = 0, _len = list.length; j < _len; j++) {
          var k = list[j];
          temp.push([k, item[k]]);
        }

        arr.splice.apply(arr, [i, 1].concat(temp));
      }
    }

    return arr;
  }

  var Xom =
  /*#__PURE__*/
  function (_Node) {
    _inherits(Xom, _Node);

    function Xom(tagName, props) {
      var _this;

      _classCallCheck(this, Xom);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Xom).call(this));
      props = props || []; // 构建工具中都是arr，手写可能出现hash情况

      if (Array.isArray(props)) {
        _this.props = arr2hash(props);
        _this.__props = spread(props);
      } else {
        _this.props = props;
        _this.__props = hash2arr(props);
      }

      _this.__tagName = tagName;
      _this.__style = _this.props.style || {}; // style被解析后的k-v形式

      return _this;
    }

    _createClass(Xom, [{
      key: "__preLay",
      value: function __preLay(data) {
        var style = this.style;

        if (style.display === 'block') {
          this.__preLayBlock(data);
        } else if (style.display === 'flex') {
          this.__preLayFlex(data);
        } else {
          this.__preLayInline(data);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var ctx = this.ctx,
            style = this.style,
            x = this.x,
            y = this.y,
            width = this.width,
            height = this.height,
            outerWidth = this.outerWidth,
            outerHeight = this.outerHeight;
        var backgroundColor = style.backgroundColor,
            borderTopWidth = style.borderTopWidth,
            borderTopColor = style.borderTopColor,
            borderRightWidth = style.borderRightWidth,
            borderRightColor = style.borderRightColor,
            borderBottomWidth = style.borderBottomWidth,
            borderBottomColor = style.borderBottomColor,
            borderLeftWidth = style.borderLeftWidth,
            borderLeftColor = style.borderLeftColor;

        if (backgroundColor) {
          var x1 = x;

          if (borderLeftWidth) {
            x1 += borderLeftWidth.value;
          }

          var y1 = y;

          if (borderTopWidth) {
            y1 += borderTopWidth.value;
          }

          if (mode$1.isCanvas()) {
            ctx.beginPath();
            ctx.fillStyle = backgroundColor;
            ctx.rect(x1, y1, width, height);
            ctx.fill();
            ctx.closePath();
          } else if (mode$1.isSvg()) {
            mode$1.appendHtml("<rect x=\"".concat(x1, "\" y=\"").concat(y1, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" fill=\"").concat(backgroundColor, "\"/>"));
          }
        }

        if (borderTopWidth.value) {
          var _y = y + borderTopWidth.value * 0.5;

          if (mode$1.isCanvas()) {
            ctx.beginPath();
            ctx.lineWidth = borderTopWidth.value;
            ctx.strokeStyle = borderTopColor;
            ctx.moveTo(x + borderLeftWidth.value, _y);
            ctx.lineTo(x + borderLeftWidth.value + width, _y);
            ctx.stroke();
            ctx.closePath();
          } else {
            mode$1.appendHtml("<line x1=\"".concat(x, "\" y1=\"").concat(_y, "\" x2=\"").concat(x + outerWidth, "\" y2=\"").concat(_y, "\" stroke-width=\"").concat(borderTopWidth.value, "\" stroke=\"").concat(borderTopColor, "\"/>"));
          }
        }

        if (borderRightWidth.value) {
          var _x = x + width + borderLeftWidth.value + borderRightWidth.value * 0.5;

          var y2 = y + outerHeight;

          if (mode$1.isCanvas()) {
            ctx.beginPath();
            ctx.lineWidth = borderRightWidth.value;
            ctx.strokeStyle = borderRightColor;
            ctx.moveTo(_x, y);
            ctx.lineTo(_x, y2);
            ctx.stroke();
            ctx.closePath();
          } else {
            mode$1.appendHtml("<line x1=\"".concat(_x, "\" y1=\"").concat(y, "\" x2=\"").concat(_x, "\" y2=\"").concat(y2, "\" stroke-width=\"").concat(borderRightWidth.value, "\" stroke=\"").concat(borderRightColor, "\"/>"));
          }
        }

        if (borderBottomWidth.value) {
          var _y2 = y + height + borderTopWidth.value + borderBottomWidth.value * 0.5;

          if (mode$1.isCanvas()) {
            ctx.beginPath();
            ctx.lineWidth = borderBottomWidth.value;
            ctx.strokeStyle = borderBottomColor;
            ctx.moveTo(x + borderLeftWidth.value, _y2);
            ctx.lineTo(x + borderLeftWidth.value + width, _y2);
            ctx.stroke();
            ctx.closePath();
          } else {
            mode$1.appendHtml("<line x1=\"".concat(x, "\" y1=\"").concat(_y2, "\" x2=\"").concat(x + outerWidth, "\" y2=\"").concat(_y2, "\" stroke-width=\"").concat(borderBottomWidth.value, "\" stroke=\"").concat(borderBottomColor, "\"/>"));
          }
        }

        if (borderLeftWidth.value) {
          var _x2 = x + borderLeftWidth.value * 0.5;

          if (mode$1.isCanvas()) {
            ctx.beginPath();
            ctx.lineWidth = borderLeftWidth.value;
            ctx.strokeStyle = borderLeftColor;
            ctx.moveTo(_x2, y);
            ctx.lineTo(_x2, y + height + borderTopWidth.value + borderBottomWidth.value);
            ctx.stroke();
            ctx.closePath();
          } else {
            mode$1.appendHtml("<line x1=\"".concat(_x2, "\" y1=\"").concat(y, "\" x2=\"").concat(_x2, "\" y2=\"").concat(y + outerHeight, "\" stroke-width=\"").concat(borderLeftWidth.value, "\" stroke=\"").concat(borderLeftColor, "\"/>"));
          }
        }
      }
    }, {
      key: "tagName",
      get: function get() {
        return this.__tagName;
      }
    }, {
      key: "outerWidth",
      get: function get() {
        var _this$style = this.style,
            borderLeftWidth = _this$style.borderLeftWidth,
            borderRightWidth = _this$style.borderRightWidth;
        return this.width + borderLeftWidth.value + borderRightWidth.value;
      }
    }, {
      key: "outerHeight",
      get: function get() {
        var _this$style2 = this.style,
            borderTopWidth = _this$style2.borderTopWidth,
            borderBottomWidth = _this$style2.borderBottomWidth;
        return this.height + borderTopWidth.value + borderBottomWidth.value;
      }
    }]);

    return Xom;
  }(Node);

  var unit = {
    AUTO: 0,
    PX: 1,
    PERCENT: 2
  };

  var font = {
    arial: {
      lhr: 1.14990234375,
      // 默认line-height ratio，(67+1854+434)/2048
      car: 1.1171875,
      // content-area ratio，(1854+434)/2048
      blr: 0.9052734375,
      // base-line ratio，1854/2048
      mdr: 0.64599609375,
      // middle ratio，(1854-1062/2)/2048
      lgr: 0.03271484375 // line-gap ratio，67/2048

    }
  };

  var RESET = {
    display: 'block',
    borderSizing: 'content-box',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    fontSize: 16,
    fontFamily: 'arial',
    color: '#000',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    verticalAlign: 'baseline',
    width: 'auto',
    height: 'auto',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItem: 'stretch',
    textAlign: 'left',
    stroke: '#000',
    strokeWidth: 1
  };
  var reset = [];
  Object.keys(RESET).forEach(function (k) {
    var v = RESET[k];
    reset.push({
      k: k,
      v: v
    });
  });

  var toString = {}.toString;

  function isType(type) {
    return function (obj) {
      return toString.call(obj) === '[object ' + type + ']';
    };
  }

  var isNumber = isType('Number');

  function _joinSourceArray(arr) {
    var res = '';

    for (var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];

      if (Array.isArray(item)) {
        res += _joinSourceArray(item);
      } else {
        res += stringify(item);
      }
    }

    return res;
  }

  function stringify(s) {
    if (isNil(s)) {
      return '';
    }

    return s.toString();
  }

  function encodeHtml(s, prop) {
    if (prop) {
      return s.replace(/"/g, '&quot;');
    }

    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  function isNil(v) {
    return v === undefined || v === null;
  }

  var util = {
    isObject: isType('Object'),
    isString: isType('String'),
    isFunction: isType('Function'),
    isNumber: isNumber,
    isBoolean: isType('Boolean'),
    isDate: isType('Date'),
    stringify: stringify,
    joinSourceArray: function joinSourceArray(arr) {
      return _joinSourceArray(arr);
    },
    encodeHtml: encodeHtml,
    isNil: isNil
  };

  function parserOneBorder(style, direction) {
    var key = "border".concat(direction);

    if (!style[key]) {
      return;
    }

    var w = /\b\d+px\b/i.exec(style[key]);

    if (w) {
      style[key + 'Width'] = w[0];
    }

    var s = /\bsolid\b/i.exec(style[key]);

    if (s) {
      style[key + 'Style'] = s[0];
    }

    var c = /#[0-9a-f]{3,6}/i.exec(style[key]);

    if (c && [4, 7].indexOf(c[0].length) > -1) {
      style[key + 'Color'] = c[0];
    }
  }

  function normalize(style) {
    // 默认reset
    reset.forEach(function (item) {
      if (!style.hasOwnProperty(item.k)) {
        style[item.k] = item.v;
      }
    }); // 处理缩写
    // TODO: 重复声明时优先级

    if (style.background) {
      var bgc = /#[0-9a-f]{3,6}/i.exec(style.background);

      if (bgc && [4, 7].indexOf(bgc[0].length) > -1) {
        style.backgroundColor = bgc[0];
      }
    }

    if (style.flex) {
      if (style.flex === 'none') {
        style.flexGrow = 0;
        style.flexShrink = 0;
        style.flexBasis = 'auto';
      } else if (style.flex === 'auto') {
        style.flexGrow = 1;
        style.flexShrink = 1;
        style.flexBasis = 'auto';
      } else if (/^[\d.]+$/.test(style.flex)) {
        style.flexGrow = parseFloat(style.flex);
        style.flexShrink = 1;
        style.flexBasis = 0;
      } else if (/^[\d.]+px$/.test(style.flex)) ; else if (/^[\d.]+%$/.test(style.flex)) ; else {
        style.flexGrow = 0;
        style.flexShrink = 1;
        style.flexBasis = 'auto';
      }
    }

    if (style.border) {
      style.borderTop = style.borderRight = style.borderBottom = style.borderLeft = style.border;
    }

    parserOneBorder(style, 'Top');
    parserOneBorder(style, 'Right');
    parserOneBorder(style, 'Bottom');
    parserOneBorder(style, 'Left'); // 转化不同单位值为对象标准化

    ['marginTop', 'marginRight', 'marginDown', 'marginLeft', 'paddingTop', 'paddingRight', 'paddingDown', 'paddingLeft', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'width', 'height', 'flexBasis'].forEach(function (k) {
      var v = style[k]; // 编译工具前置解析优化跳出

      if (!util.isNil(v) && v.unit) {
        return;
      }

      if (v === 'auto') {
        style[k] = {
          unit: unit.AUTO
        };
      } else if (/%$/.test(v)) {
        v = parseFloat(v) || 0;

        if (v <= 0) {
          style[k] = {
            value: 0,
            unit: unit.PX
          };
        } else {
          style[k] = {
            value: v,
            unit: unit.PERCENT
          };
        }
      } else {
        v = parseFloat(v) || 0;
        style[k] = {
          value: Math.max(v, 0),
          unit: unit.PX
        };
      }
    }); // 计算lineHeight为px值，最小范围

    var lineHeight = style.lineHeight;

    if (lineHeight === 'normal') {
      lineHeight = {
        value: style.fontSize * font.arial.lhr,
        unit: unit.PX
      };
    } else if (/px$/.test(lineHeight)) {
      lineHeight = parseFloat(lineHeight);
      lineHeight = {
        value: Math.max(style.fontSize, lineHeight),
        unit: unit.PX
      };
    } // 纯数字比例
    else {
        lineHeight = parseFloat(lineHeight) || 'normal'; // 非法数字

        if (lineHeight === 'normal') {
          lineHeight = {
            value: style.fontSize * font.arial.lhr,
            unit: unit.PX
          };
        } else {
          lineHeight = {
            value: lineHeight * style.fontSize,
            unit: unit.PX
          };
        }
      }

    style.lineHeight = lineHeight;
  }

  function setFontStyle(style) {
    var fontStyle = style.fontStyle,
        fontWeight = style.fontWeight,
        fontSize = style.fontSize,
        fontFamily = style.fontFamily;
    return "".concat(fontStyle, " ").concat(fontWeight, " ").concat(fontSize, "px/").concat(fontSize, "px ").concat(fontFamily);
  }

  function getBaseLine(style) {
    var normal = style.fontSize * font.arial.lhr;
    return (style.lineHeight.value - normal) * 0.5 + style.fontSize * font.arial.blr;
  }

  var css = {
    normalize: normalize,
    setFontStyle: setFontStyle,
    getBaseLine: getBaseLine
  };

  var LineBox =
  /*#__PURE__*/
  function () {
    function LineBox(ctx, x, y, content, style) {
      _classCallCheck(this, LineBox);

      this.__ctx = ctx;
      this.__x = x;
      this.__y = y;
      this.__content = content;
      this.__style = style;
    }

    _createClass(LineBox, [{
      key: "render",
      value: function render() {
        var ctx = this.ctx,
            style = this.style,
            content = this.content,
            x = this.x,
            y = this.y;

        if (mode$1.isCanvas()) {
          ctx.fillStyle = style.color;
          ctx.fillText(content, x, y + css.getBaseLine(style));
        } else if (mode$1.isSvg()) {
          mode$1.appendHtml("<text x=\"".concat(x, "\" y=\"").concat(y + css.getBaseLine(style), "\" fill=\"").concat(style.color, "\" font-size=\"").concat(style.fontSize, "px\">").concat(content, "</text>"));
        }
      }
    }, {
      key: "__offsetX",
      value: function __offsetX(diff) {
        this.__x += diff;
      }
    }, {
      key: "__offsetY",
      value: function __offsetY(diff) {
        this.__y += diff;
      }
    }, {
      key: "ctx",
      get: function get() {
        return this.__ctx;
      }
    }, {
      key: "x",
      get: function get() {
        return this.__x;
      }
    }, {
      key: "y",
      get: function get() {
        return this.__y;
      }
    }, {
      key: "content",
      get: function get() {
        return this.__content;
      }
    }, {
      key: "style",
      get: function get() {
        return this.__style;
      }
    }, {
      key: "baseLine",
      get: function get() {
        return css.getBaseLine(this.style);
      }
    }]);

    return LineBox;
  }();

  var CHAR_WIDTH_CACHE = {};

  var Text =
  /*#__PURE__*/
  function (_Node) {
    _inherits(Text, _Node);

    function Text(content) {
      var _this;

      _classCallCheck(this, Text);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this));
      _this.__content = content.toString();
      _this.__lineBoxes = [];
      _this.__charWidthList = [];
      _this.__charWidth = 0;
      _this.__textWidth = 0;
      return _this;
    } // 预先计算每个字的宽度


    _createClass(Text, [{
      key: "__measure",
      value: function __measure() {
        this.__charWidthList = [];
        var ctx = this.ctx,
            content = this.content,
            style = this.style,
            charWidthList = this.charWidthList;

        if (mode$1.isCanvas()) {
          ctx.font = css.setFontStyle(style);
        }

        var cache = CHAR_WIDTH_CACHE[style.fontSize] = CHAR_WIDTH_CACHE[style.fontSize] || {};
        var length = content.length;
        var sum = 0;

        for (var i = 0; i < length; i++) {
          var _char = content.charAt(i);

          var mw = void 0;

          if (cache.hasOwnProperty(_char)) {
            mw = cache[_char];
          } else if (mode$1.isCanvas()) {
            mw = ctx.measureText(_char).width;
          } else if (mode$1.isSvg()) {
            var dom = mode$1.measure;
            dom.style.fontSize = style.fontSize + 'px';
            dom.innerText = _char;

            var _css = window.getComputedStyle(dom, null);

            mw = parseFloat(_css.width);
          }

          charWidthList.push(mw);
          sum += mw;
          this.__charWidth = Math.max(this.charWidth, mw);
        }

        this.__textWidth = sum;
      }
    }, {
      key: "__preLay",
      value: function __preLay(data, isVirtual) {
        var x = data.x,
            y = data.y,
            w = data.w,
            h = data.h;
        this.__x = x;
        this.__y = y;
        var maxX = x;
        var ctx = this.ctx,
            content = this.content,
            style = this.style,
            lineBoxes = this.lineBoxes,
            charWidthList = this.charWidthList; // 顺序尝试分割字符串为lineBox，形成多行

        var begin = 0;
        var i = 0;
        var count = 0;
        var length = content.length;

        while (i < length) {
          count += charWidthList[i];

          if (count === w) {
            var lineBox = new LineBox(ctx, x, y, content.slice(begin, i + 1), style);
            lineBoxes.push(lineBox);
            maxX = Math.max(maxX, x + count);
            y += this.style.lineHeight.value;
            begin = i + 1;
            i = begin + 1;
            count = 0;
          } else if (count > w) {
            // 宽度不足时无法跳出循环，至少也要塞个字符形成一行
            if (i === begin) {
              i = begin + 1;
            }

            var _lineBox = new LineBox(ctx, x, y, content.slice(begin, i), style);

            lineBoxes.push(_lineBox);
            maxX = Math.max(maxX, x + count - charWidthList[i]);
            y += this.style.lineHeight.value;
            begin = i;
            i = i + 1;
            count = 0;
          } else {
            i++;
          }
        }

        if (begin < length && begin < i) {
          var _lineBox2 = new LineBox(ctx, x, y, content.slice(begin, i), style);

          lineBoxes.push(_lineBox2);
          maxX = Math.max(maxX, x + count);
          y += this.style.lineHeight.value;
        }

        this.__width = maxX - x;
        this.__height = y - data.y;

        if (isVirtual) {
          this.__lineBoxes = [];
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (mode$1.isCanvas()) {
          this.ctx.font = css.setFontStyle(this.style);
        }

        this.lineBoxes.forEach(function (item) {
          item.render();
        });
      }
    }, {
      key: "__tryLayInline",
      value: function __tryLayInline(w) {
        this.ctx.font = css.setFontStyle(this.style);
        var tw = this.ctx.measureText(this.content).width;
        return w - tw;
      }
    }, {
      key: "__offsetX",
      value: function __offsetX(diff) {
        _get(_getPrototypeOf(Text.prototype), "__offsetX", this).call(this, diff);

        this.lineBoxes.forEach(function (item) {
          item.__offsetX(diff);
        });
      }
    }, {
      key: "__offsetY",
      value: function __offsetY(diff) {
        _get(_getPrototypeOf(Text.prototype), "__offsetY", this).call(this, diff);

        this.lineBoxes.forEach(function (item) {
          item.__offsetY(diff);
        });
      }
    }, {
      key: "__calMaxAndMinWidth",
      value: function __calMaxAndMinWidth() {
        var n = 0;
        this.charWidthList.forEach(function (item) {
          n = Math.max(n, item);
        });
        return {
          max: this.textWidth,
          min: n
        };
      }
    }, {
      key: "content",
      get: function get() {
        return this.__content;
      },
      set: function set(v) {
        this.__content = v;
      }
    }, {
      key: "lineBoxes",
      get: function get() {
        return this.__lineBoxes;
      }
    }, {
      key: "charWidthList",
      get: function get() {
        return this.__charWidthList;
      }
    }, {
      key: "charWidth",
      get: function get() {
        return this.__charWidth;
      }
    }, {
      key: "textWidth",
      get: function get() {
        return this.__textWidth;
      }
    }, {
      key: "baseLine",
      get: function get() {
        var last = this.lineBoxes[this.lineBoxes.length - 1];
        return last.y - this.y + last.baseLine;
      }
    }]);

    return Text;
  }(Node);

  var LineGroup =
  /*#__PURE__*/
  function () {
    function LineGroup(x, y) {
      _classCallCheck(this, LineGroup);

      this.__list = [];
      this.__x = x;
      this.__y = y;
      this.__height = 0;
      this.__baseLine = 0;
    }

    _createClass(LineGroup, [{
      key: "add",
      value: function add(item) {
        this.list.push(item);
      }
    }, {
      key: "__calBaseLine",
      value: function __calBaseLine() {
        var baseLine = 0;
        this.list.forEach(function (item) {
          baseLine = Math.max(baseLine, item.baseLine);
        });
        return baseLine;
      }
    }, {
      key: "__calHeight",
      value: function __calHeight() {
        var height = 0;
        this.list.forEach(function (item) {
          height = Math.max(height, item.height);
        });
        return height;
      }
    }, {
      key: "verticalAlign",
      value: function verticalAlign() {
        var _this = this;

        this.__height = this.__calHeight();
        this.__baseLine = this.__calBaseLine(); // 仅当有2个和以上时才需要vertical对齐调整

        if (this.list.length > 1) {
          this.list.forEach(function (item) {
            if (item.baseLine !== _this.baseLine) {
              item.__offsetY(_this.baseLine - item.baseLine);
            }
          });
        }
      }
    }, {
      key: "list",
      get: function get() {
        return this.__list;
      }
    }, {
      key: "x",
      get: function get() {
        return this.__x;
      }
    }, {
      key: "y",
      get: function get() {
        return this.__y;
      }
    }, {
      key: "height",
      get: function get() {
        return this.__height;
      }
    }, {
      key: "baseLine",
      get: function get() {
        return this.__baseLine;
      }
    }, {
      key: "size",
      get: function get() {
        return this.__list.length;
      }
    }]);

    return LineGroup;
  }();

  var TAG_NAME = {
    '$line': true,
    '$polygon': true
  };

  var Geom =
  /*#__PURE__*/
  function (_Xom) {
    _inherits(Geom, _Xom);

    function Geom(tagName, props) {
      _classCallCheck(this, Geom);

      return _possibleConstructorReturn(this, _getPrototypeOf(Geom).call(this, tagName, props));
    }

    _createClass(Geom, [{
      key: "__initStyle",
      value: function __initStyle() {
        css.normalize(this.style);
      }
    }, {
      key: "__calAutoBasis",
      value: function __calAutoBasis(isDirectionRow, w, h) {
        var b = 0;
        var min = 0;
        var max = 0;
        var style = this.style; // 计算需考虑style的属性

        var width = style.width,
            height = style.height,
            borderTopWidth = style.borderTopWidth,
            borderRightWidth = style.borderRightWidth,
            borderBottomWidth = style.borderBottomWidth,
            borderLeftWidth = style.borderLeftWidth;
        var main = isDirectionRow ? width : height;

        if (main.unit !== unit.AUTO) {
          b = max += main.value;
        } // border也得计算在内


        if (isDirectionRow) {
          var _w = borderRightWidth.value + borderLeftWidth.value;

          b += _w;
          max += _w;
          min += _w;
        } else {
          var _h = borderTopWidth.value + borderBottomWidth.value;

          b += _h;
          max += _h;
          min += _h;
        }

        return {
          b: b,
          min: min,
          max: max
        };
      }
    }, {
      key: "__preLayBlock",
      value: function __preLayBlock(data) {}
    }, {
      key: "__preLayFlex",
      value: function __preLayFlex(data) {}
    }, {
      key: "__preLayInline",
      value: function __preLayInline(data) {
        var x = data.x,
            y = data.y,
            w = data.w,
            h = data.h;
        this.__x = x;
        this.__y = y;
        var style = this.style;
        var width = style.width,
            height = style.height,
            borderTopWidth = style.borderTopWidth,
            borderRightWidth = style.borderRightWidth,
            borderBottomWidth = style.borderBottomWidth,
            borderLeftWidth = style.borderLeftWidth; // 除了auto外都是固定高度

        var fixedWidth;
        var fixedHeight;

        if (width && width.unit !== unit.AUTO) {
          fixedWidth = true;

          switch (width.unit) {
            case unit.PX:
              w = width.value;
              break;
          }
        }

        if (height && height.unit !== unit.AUTO) {
          fixedHeight = true;

          switch (height.unit) {
            case unit.PX:
              h = height.value;
              break;
          }
        } // border影响x和y


        x += borderLeftWidth.value;
        data.x = x;
        y += borderTopWidth.value;
        data.y = y;
        w -= borderLeftWidth.value + borderRightWidth.value;
        h -= borderTopWidth.value + borderBottomWidth.value; // 元素的width不能超过父元素w

        this.__width = fixedWidth ? w : x - data.x;
        this.__height = fixedHeight ? h : y - data.y;
      }
    }, {
      key: "render",
      value: function render() {
        _get(_getPrototypeOf(Geom.prototype), "render", this).call(this);
      }
    }, {
      key: "tagName",
      get: function get() {
        return this.__tagName;
      }
    }, {
      key: "baseLine",
      get: function get() {
        return 0;
      }
    }], [{
      key: "isValid",
      value: function isValid(s) {
        return TAG_NAME.hasOwnProperty(s);
      }
    }]);

    return Geom;
  }(Xom);

  var TAG_NAME$1 = {
    'div': true,
    'span': true
  };
  var INLINE = {
    'span': true
  };

  var Dom =
  /*#__PURE__*/
  function (_Xom) {
    _inherits(Dom, _Xom);

    function Dom(tagName, props, children) {
      var _this;

      _classCallCheck(this, Dom);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Dom).call(this, tagName, props));
      _this.__children = children;
      _this.__lineGroups = []; // 一行inline元素组成的LineGroup对象后的存放列表

      return _this;
    }
    /**
     * 1. 封装string为Text节点
     * 2. 打平children中的数组，变成一维
     * 3. 合并相连的Text节点
     * 4. 检测inline不能包含block
     * 5. 设置parent和prev/next和ctx
     */


    _createClass(Dom, [{
      key: "__traverse",
      value: function __traverse(ctx) {
        var _this2 = this;

        var list = [];

        this.__traverseChildren(this.children, list, ctx);

        for (var i = list.length - 1; i > 0; i--) {
          var item = list[i];

          if (item instanceof Text) {
            var _prev = list[i - 1];

            if (_prev instanceof Text) {
              _prev.content += item.content;
              list.splice(i, 1);
            } else {
              i--;
            }
          }
        }

        if (this.style.display === 'inline' && this.parent.style.display !== 'flex') {
          for (var _i = list.length - 1; _i >= 0; _i--) {
            var _item = list[_i];

            if (_item instanceof Dom && _item.style.display !== 'inline') {
              throw new Error('inline can not contain block');
            }
          }
        }

        var prev = null;
        list.forEach(function (item) {
          item.__ctx = ctx;

          item.__parent = _this2;
          item.__prev = prev;
        });
        this.__children = list;
      }
    }, {
      key: "__traverseChildren",
      value: function __traverseChildren(children, list, ctx) {
        var _this3 = this;

        if (Array.isArray(children)) {
          children.forEach(function (item) {
            _this3.__traverseChildren(item, list, ctx);
          });
        } else if (children instanceof Dom) {
          list.push(children);

          children.__traverse(ctx);
        } // 图形没有children
        else if (children instanceof Geom) {
            list.push(children);
          } // 排除掉空的文本
          else if (!util.isNil(children)) {
              list.push(new Text(children));
            }
      } // 合并设置style，包括继承和默认值，修改一些自动值和固定值，测量所有文字的宽度

    }, {
      key: "__initStyle",
      value: function __initStyle() {
        var style = this.__style; // 仅支持flex/block/inline/none

        if (!style.display || ['flex', 'block', 'inline', 'none'].indexOf(style.display) === -1) {
          if (INLINE.hasOwnProperty(this.tagName)) {
            style.display = 'inline';
          } else {
            style.display = 'block';
          }
        } // 继承父元素样式


        var parent = this.parent;

        if (parent) {
          var parentStyle = parent.style;
          ['fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'wordBreak', 'color', 'textAlign'].forEach(function (k) {
            if (!style.hasOwnProperty(k) && parentStyle.hasOwnProperty(k)) {
              style[k] = parentStyle[k];
            }
          });
        } // 标准化处理，默认值、简写属性


        css.normalize(style);
        this.children.forEach(function (item) {
          if (item instanceof Dom || item instanceof Geom) {
            item.__initStyle();
          } else {
            item.__style = style; // 文字首先测量所有字符宽度

            item.__measure();
          }
        });
      } // 给定父宽度情况下，尝试行内放下后的剩余宽度，为负数即放不下

    }, {
      key: "__tryLayInline",
      value: function __tryLayInline(w) {
        var children = this.children;

        for (var i = 0; i < children.length; i++) {
          // 当放不下时直接返回，无需继续多余的尝试计算
          if (w < 0) {
            return w;
          }

          var item = children[i];

          if (item instanceof Dom || item instanceof Geom) {
            w = item.__tryLayInline(w);
          } else {
            w -= item.textWidth;
          }
        }

        return w;
      } // 设置y偏移值，递归包括children，此举在flex行元素的child进行justify-content对齐用

    }, {
      key: "__offsetX",
      value: function __offsetX(diff) {
        _get(_getPrototypeOf(Dom.prototype), "__offsetX", this).call(this, diff);

        this.children.forEach(function (item) {
          if (item) {
            item.__offsetX(diff);
          }
        });
      } // 设置y偏移值，递归包括children，此举在初步确定inline布局后设置元素vertical-align用

    }, {
      key: "__offsetY",
      value: function __offsetY(diff) {
        _get(_getPrototypeOf(Dom.prototype), "__offsetY", this).call(this, diff);

        this.children.forEach(function (item) {
          if (item) {
            item.__offsetY(diff);
          }
        });
      }
    }, {
      key: "__calAutoBasis",
      value: function __calAutoBasis(isDirectionRow, w, h, isRecursion) {
        var b = 0;
        var min = 0;
        var max = 0;
        var children = this.children,
            style = this.style; // 计算需考虑style的属性

        var width = style.width,
            height = style.height,
            borderTopWidth = style.borderTopWidth,
            borderRightWidth = style.borderRightWidth,
            borderBottomWidth = style.borderBottomWidth,
            borderLeftWidth = style.borderLeftWidth;
        var main = isDirectionRow ? width : height;

        if (main.unit !== unit.AUTO) {
          b = max += main.value; // 递归时children的长度会影响flex元素的最小宽度

          if (isRecursion) {
            min = b;
          }
        } // 递归children取最大值


        children.forEach(function (item) {
          if (item instanceof Dom || item instanceof Geom) {
            var _item$__calAutoBasis = item.__calAutoBasis(isDirectionRow, w, h, true),
                b2 = _item$__calAutoBasis.b,
                min2 = _item$__calAutoBasis.min,
                max2 = _item$__calAutoBasis.max;

            b = Math.max(b, b2);
            min = Math.max(min, min2);
            max = Math.max(max, max2);
          } else if (isDirectionRow) {
            min = Math.max(item.charWidth, min);
            max = Math.max(item.textWidth, max);
          } else {
            item.__preLay({
              x: 0,
              y: 0,
              w: w,
              h: h
            }, true);

            min = Math.max(min, item.height);
            max = Math.max(max, item.height);
          }
        }); // border也得计算在内

        if (isDirectionRow) {
          var _w = borderRightWidth.value + borderLeftWidth.value;

          b += _w;
          max += _w;
          min += _w;
        } else {
          var _h = borderTopWidth.value + borderBottomWidth.value;

          b += _h;
          max += _h;
          min += _h;
        }

        return {
          b: b,
          min: min,
          max: max
        };
      } // 本身block布局时计算好所有子元素的基本位置

    }, {
      key: "__preLayBlock",
      value: function __preLayBlock(data) {
        var _this4 = this;

        var x = data.x,
            y = data.y,
            w = data.w,
            h = data.h;
        this.__x = x;
        this.__y = y;
        this.__width = w;
        var children = this.children,
            style = this.style;
        var width = style.width,
            height = style.height,
            borderTopWidth = style.borderTopWidth,
            borderRightWidth = style.borderRightWidth,
            borderBottomWidth = style.borderBottomWidth,
            borderLeftWidth = style.borderLeftWidth; // 除了auto外都是固定高度

        var fixedHeight;

        if (width && width.unit !== unit.AUTO) {
          switch (width.unit) {
            case unit.PX:
              w = width.value;
              break;
          }
        }

        if (height && height.unit !== unit.AUTO) {
          fixedHeight = true;

          switch (height.unit) {
            case unit.PX:
              h = height.value;
              break;

            case unit.PERCENT:
              h *= height.value * 0.01;
              break;
          }
        } // border影响x和y和尺寸


        x += borderLeftWidth.value;
        data.x = x;
        y += borderTopWidth.value;
        data.y = y;
        w -= borderLeftWidth.value + borderRightWidth.value;
        h -= borderTopWidth.value + borderBottomWidth.value; // 递归布局，将inline的节点组成lineGroup一行

        var lineGroup = new LineGroup(x, y);
        children.forEach(function (item) {
          if (item instanceof Dom) {
            if (item.style.display === 'inline') {
              // inline开头，不用考虑是否放得下直接放
              if (x === data.x) {
                lineGroup.add(item);

                item.__preLayInline({
                  x: x,
                  y: y,
                  w: w,
                  h: h
                });

                x += item.outerWidth;
              } else {
                // 非开头先尝试是否放得下
                var fw = item.__tryLayInline(w - x); // 放得下继续


                if (fw >= 0) {
                  item.__preLayInline({
                    x: x,
                    y: y,
                    w: w
                  });
                } // 放不下处理之前的lineGroup，并重新开头
                else {
                    _this4.lineGroups.push(lineGroup);

                    lineGroup.verticalAlign();
                    x = data.x;
                    y += lineGroup.height;

                    item.__preLayInline({
                      x: data.x,
                      y: y,
                      w: w
                    });

                    lineGroup = new LineGroup(x, y);
                  }

                x += item.outerWidth;
                lineGroup.add(item);
              }
            } else {
              // block先处理之前可能的lineGroup
              if (lineGroup.size) {
                _this4.lineGroups.push(lineGroup);

                lineGroup.verticalAlign();
                y += lineGroup.height;
                lineGroup = new LineGroup(data.x, y);
              }

              item.__preLay({
                x: data.x,
                y: y,
                w: w,
                h: h
              });

              x = data.x;
              y += item.outerHeight;
            }
          } else if (item instanceof Geom) {
            // 图形也是block先处理之前可能的行
            if (lineGroup.size) {
              _this4.lineGroups.push(lineGroup);

              lineGroup.verticalAlign();
              y += lineGroup.height;
              lineGroup = new LineGroup(data.x, y);
            }

            item.__preLay({
              x: data.x,
              y: y,
              w: w
            });

            x = data.x;
            y += item.outerHeight;
          } // 文字和inline类似
          else {
              // x开头，不用考虑是否放得下直接放
              if (x === data.x) {
                lineGroup.add(item);

                item.__preLay({
                  x: x,
                  y: y,
                  w: w,
                  h: h
                });

                x += item.width;
              } else {
                // 非开头先尝试是否放得下
                var _fw = item.__tryLayInline(w - x); // 放得下继续


                if (_fw >= 0) {
                  item.__preLay({
                    x: x,
                    y: y,
                    w: w,
                    h: h
                  });
                } // 放不下处理之前的lineGroup，并重新开头
                else {
                    _this4.lineGroups.push(lineGroup);

                    lineGroup.verticalAlign();
                    x = data.x;
                    y += lineGroup.height;

                    item.__preLay({
                      x: data.x,
                      y: y,
                      w: w,
                      h: h
                    });

                    lineGroup = new LineGroup(x, y);
                  }

                x += item.width;
                lineGroup.add(item);
              }
            }
        }); // 结束后处理可能遗留的最后的lineGroup

        if (lineGroup.size) {
          this.lineGroups.push(lineGroup);
          lineGroup.verticalAlign();
          y += lineGroup.height;
        }

        this.__width = w;
        this.__height = fixedHeight ? h : y - data.y;
      } // 弹性布局时的计算位置

    }, {
      key: "__preLayFlex",
      value: function __preLayFlex(data) {
        var x = data.x,
            y = data.y,
            w = data.w,
            h = data.h;
        this.__x = x;
        this.__y = y;
        this.__width = w;
        var children = this.children,
            style = this.style;
        var width = style.width,
            height = style.height,
            flexDirection = style.flexDirection,
            borderTopWidth = style.borderTopWidth,
            borderRightWidth = style.borderRightWidth,
            borderBottomWidth = style.borderBottomWidth,
            borderLeftWidth = style.borderLeftWidth,
            justifyContent = style.justifyContent; // 除了auto外都是固定高度

        var fixedHeight;

        if (width && width.unit !== unit.AUTO) {
          switch (width.unit) {
            case unit.PX:
              w = width.value;
              break;
          }
        }

        if (height && height.unit !== unit.AUTO) {
          fixedHeight = true;

          switch (height.unit) {
            case unit.PX:
              h = height.value;
              break;

            case unit.PERCENT:
              h *= height.value * 0.01;
              break;
          }
        } // border影响x和y和尺寸


        x += borderLeftWidth.value;
        data.x = x;
        y += borderTopWidth.value;
        data.y = y;
        w -= borderLeftWidth.value + borderRightWidth.value;
        h -= borderTopWidth.value + borderBottomWidth.value;
        var isDirectionRow = flexDirection === 'row'; // column时height可能为auto，此时取消伸展，退化为类似block布局，但所有子元素强制block

        if (!isDirectionRow && !fixedHeight) {
          children.forEach(function (item) {
            if (item instanceof Dom || item instanceof Geom) {
              var _style = item.style,
                  _item$style = item.style,
                  display = _item$style.display,
                  _flexDirection = _item$style.flexDirection,
                  _width = _item$style.width,
                  _height = _item$style.height; // column的flex的child如果是inline，变为block

              if (display === 'inline') {
                _style.display = 'block';
              } // 竖向flex的child如果是横向flex，宽度自动的话要等同于父flex的宽度
              else if (display === 'flex' && _flexDirection === 'row' && _width.unit === unit.AUTO) {
                  _width.value = w;
                  _width.unit = unit.PX;
                }

              item.__preLay({
                x: x,
                y: y,
                w: w,
                h: h
              });

              y += item.outerHeight;
            } else {
              item.__preLay({
                x: x,
                y: y,
                w: w,
                h: h
              });

              y += item.outerHeight;
            }
          });
          this.__width = w;
          this.__height = y - data.y;
          return;
        } // 计算伸缩基数


        var growList = [];
        var shrinkList = [];
        var basisList = [];
        var minList = [];
        var growSum = 0;
        var shrinkSum = 0;
        var basisSum = 0;
        var maxSum = 0;
        children.forEach(function (item) {
          if (item instanceof Dom || item instanceof Geom) {
            var _item$style2 = item.style,
                flexGrow = _item$style2.flexGrow,
                flexShrink = _item$style2.flexShrink,
                flexBasis = _item$style2.flexBasis;
            growList.push(flexGrow);
            shrinkList.push(flexShrink);
            growSum += flexGrow;
            shrinkSum += flexShrink;

            var _item$__calAutoBasis2 = item.__calAutoBasis(isDirectionRow, w, h),
                b = _item$__calAutoBasis2.b,
                min = _item$__calAutoBasis2.min,
                max = _item$__calAutoBasis2.max; // 根据basis不同，计算方式不同


            if (flexBasis.unit === unit.AUTO) {
              basisList.push(max);
              basisSum += max;
            } else if (flexBasis.unit === unit.PX) {
              b = flexBasis.value;
              basisList.push(b);
              basisSum += b;
            } else if (flexBasis.unit === unit.PERCENT) {
              b = (isDirectionRow ? w : h) * flexBasis.value;
              basisList.push(b);
              basisSum += b;
            }

            maxSum += max;
            minList.push(min);
          } else {
            growList.push(0);
            shrinkList.push(1);
            shrinkSum += 1;

            if (isDirectionRow) {
              basisList.push(item.textWidth);
              basisSum += item.textWidth;
              maxSum += item.textWidth;
              minList.push(item.charWidth);
            } else {
              item.__preLay({
                x: 0,
                y: 0,
                w: w,
                h: h
              }, true);

              basisList.push(item.height);
              basisSum += item.height;
              maxSum += item.height;
              minList.push(item.height);
            }
          }
        });
        var maxCross = 0;
        var free = 0; // 判断是否超出，决定使用grow还是shrink

        var isOverflow = maxSum > (isDirectionRow ? w : h);
        children.forEach(function (item, i) {
          var main;
          var shrink = shrinkList[i];
          var grow = growList[i]; // 计算主轴长度

          if (isOverflow) {
            var overflow = basisSum - (isDirectionRow ? w : h);
            main = shrink ? basisList[i] - overflow * shrink / shrinkSum : basisList[i];
          } else {
            free = (isDirectionRow ? w : h) - basisSum;
            main = grow ? basisList[i] + free * grow / growSum : basisList[i];
          } // 主轴长度的最小值不能小于元素的最小长度，比如横向时的字符宽度


          main = Math.max(main, minList[i]);

          if (item instanceof Dom || item instanceof Geom) {
            var _style2 = item.style,
                _item$style3 = item.style,
                display = _item$style3.display,
                _flexDirection2 = _item$style3.flexDirection,
                _width2 = _item$style3.width,
                _height2 = _item$style3.height;

            if (isDirectionRow) {
              // row的flex的child如果是block，则等同于inline-block布局
              if (display === 'block') {
                _style2.display = 'inline';
              } // 横向flex的child如果是竖向flex，高度自动的话要等同于父flex的高度
              else if (display === 'flex' && _flexDirection2 === 'column' && fixedHeight && _height2.unit === unit.AUTO) {
                  _height2.value = h;
                  _height2.unit = unit.PX;
                }

              item.__preLay({
                x: x,
                y: y,
                w: main,
                h: h
              });
            } else {
              // column的flex的child如果是inline，变为block
              if (display === 'inline') {
                _style2.display = 'block';
              } // 竖向flex的child如果是横向flex，宽度自动的话要等同于父flex的宽度
              else if (display === 'flex' && _flexDirection2 === 'row' && _width2.unit === unit.AUTO) {
                  _width2.value = w;
                  _width2.unit = unit.PX;
                }

              item.__preLay({
                x: x,
                y: y,
                w: w,
                h: main
              });
            } // 重设因伸缩而导致的主轴长度


            if (isOverflow && shrink) {
              if (isDirectionRow) {
                item.__width = main;
              } else {
                item.__height = main;
              }
            } else if (!isOverflow && grow) {
              if (isDirectionRow) {
                item.__width = main;
              } else {
                item.__height = main;
              }
            }
          } else {
            item.__preLay({
              x: x,
              y: y,
              w: isDirectionRow ? main : w,
              h: isDirectionRow ? h : main
            });
          }

          if (isDirectionRow) {
            x += item.outerWidth;
            maxCross = Math.max(maxCross, item.outerHeight);
          } else {
            y += item.outerHeight;
            x = data.x;
            maxCross = Math.max(maxCross, item.outerWidth);
          }
        }); // 主轴侧轴对齐方式

        if (!isOverflow && growSum === 0 && free > 0) {
          var len = children.length;

          if (justifyContent === 'flex-end') {
            for (var i = 0; i < len; i++) {
              var child = children[i];
              isDirectionRow ? child.__offsetX(free) : child.__offsetY(free);
            }
          } else if (justifyContent === 'center') {
            var center = free * 0.5;

            for (var _i2 = 0; _i2 < len; _i2++) {
              var _child = children[_i2];
              isDirectionRow ? _child.__offsetX(center) : _child.__offsetY(center);
            }
          } else if (justifyContent === 'space-between') {
            var between = free / (len - 1);

            for (var _i3 = 1; _i3 < len; _i3++) {
              var _child2 = children[_i3];
              isDirectionRow ? _child2.__offsetX(between * _i3) : _child2.__offsetY(between * _i3);
            }
          } else if (justifyContent === 'space-around') {
            var around = free / (len + 1);

            for (var _i4 = 0; _i4 < len; _i4++) {
              var _child3 = children[_i4];
              isDirectionRow ? _child3.__offsetX(around * (_i4 + 1)) : _child3.__offsetY(around * (_i4 + 1));
            }
          }
        } // 子元素侧轴伸展


        if (isDirectionRow) {
          // 父元素固定高度，子元素可能超过，侧轴最大长度取固定高度
          if (fixedHeight) {
            maxCross = h;
          }

          y += maxCross;
        } // 所有短侧轴的children伸张侧轴长度至相同，超过的不动，固定宽高的也不动


        children.forEach(function (item) {
          var style = item.style;

          if (isDirectionRow) {
            if (item.style.height.unit === unit.AUTO) {
              item.__height = maxCross - style.borderTopWidth.value - style.borderBottomWidth.value;
            }
          } else {
            if (item.style.width.unit === unit.AUTO) {
              item.__width = maxCross - style.borderRightWidth.value - style.borderLeftWidth.value;
            }
          }
        });
        this.__width = w;
        this.__height = fixedHeight ? h : y - data.y;
      } // inline比较特殊，先简单顶部对其，后续还需根据vertical和lineHeight计算y偏移

    }, {
      key: "__preLayInline",
      value: function __preLayInline(data) {
        var _this5 = this;

        var x = data.x,
            y = data.y,
            w = data.w,
            h = data.h;
        this.__x = x;
        this.__y = y;
        var maxX = x;
        var children = this.children,
            style = this.style;
        var width = style.width,
            height = style.height,
            borderTopWidth = style.borderTopWidth,
            borderRightWidth = style.borderRightWidth,
            borderBottomWidth = style.borderBottomWidth,
            borderLeftWidth = style.borderLeftWidth; // 除了auto外都是固定高度

        var fixedWidth;
        var fixedHeight;

        if (width && width.unit !== unit.AUTO) {
          fixedWidth = true;

          switch (width.unit) {
            case unit.PX:
              w = width.value;
              break;
          }
        }

        if (height && height.unit !== unit.AUTO) {
          fixedHeight = true;

          switch (height.unit) {
            case unit.PX:
              h = height.value;
              break;
          }
        } // border影响x和y


        x += borderLeftWidth.value;
        data.x = x;
        y += borderTopWidth.value;
        data.y = y;
        w -= borderLeftWidth.value + borderRightWidth.value;
        h -= borderTopWidth.value + borderBottomWidth.value; // 递归布局，将inline的节点组成lineGroup一行

        var lineGroup = new LineGroup(x, y);
        children.forEach(function (item) {
          if (item instanceof Dom) {
            // inline开头，不用考虑是否放得下直接放
            if (x === data.x) {
              lineGroup.add(item);

              item.__preLayInline({
                x: x,
                y: y,
                w: w
              });

              x += item.outerWidth;
              maxX = Math.max(maxX, x);
            } else {
              // 非开头先尝试是否放得下
              var fw = item.__tryLayInline(w - x); // 放得下继续


              if (fw >= 0) {
                item.__preLayInline({
                  x: x,
                  y: y,
                  w: w
                });
              } // 放不下处理之前的lineGroup，并重新开头
              else {
                  _this5.lineGroups.push(lineGroup);

                  lineGroup.verticalAlign();
                  x = data.x;
                  y += lineGroup.height;

                  item.__preLayInline({
                    x: data.x,
                    y: y,
                    w: w
                  });

                  lineGroup = new LineGroup(x, y);
                }

              x += item.outerWidth;
              maxX = Math.max(maxX, x);
              lineGroup.add(item);
            }
          } // inline里的其它只有文本
          else {
              if (x === data.x) {
                lineGroup.add(item);

                item.__preLay({
                  x: x,
                  y: y,
                  w: w,
                  h: h
                });

                x += item.width;
                maxX = Math.max(maxX, x);
              } else {
                // 非开头先尝试是否放得下
                var _fw2 = item.__tryLayInline(w - x); // 放得下继续


                if (_fw2 >= 0) {
                  item.__preLay({
                    x: x,
                    y: y,
                    w: w,
                    h: h
                  });
                } // 放不下处理之前的lineGroup，并重新开头
                else {
                    _this5.lineGroups.push(lineGroup);

                    lineGroup.verticalAlign();
                    x = data.x;
                    y += lineGroup.height;

                    item.__preLay({
                      x: data.x,
                      y: y,
                      w: w,
                      h: h
                    });

                    lineGroup = new LineGroup(x, y);
                  }

                x += item.width;
                maxX = Math.max(maxX, x);
                lineGroup.add(item);
              }
            }
        }); // 结束后处理可能遗留的最后的lineGroup，children为空时可能size为空

        if (lineGroup.size) {
          this.lineGroups.push(lineGroup);
          lineGroup.verticalAlign();
          y += lineGroup.height;
        } // 元素的width不能超过父元素w


        this.__width = fixedWidth ? w : maxX - data.x;
        this.__height = fixedHeight ? h : y - data.y;
      }
    }, {
      key: "render",
      value: function render() {
        _get(_getPrototypeOf(Dom.prototype), "render", this).call(this);

        this.children.forEach(function (item) {
          if (item) {
            item.render();
          }
        });
      }
    }, {
      key: "tagName",
      get: function get() {
        return this.__tagName;
      }
    }, {
      key: "children",
      get: function get() {
        return this.__children;
      }
    }, {
      key: "lineGroups",
      get: function get() {
        return this.__lineGroups;
      }
    }, {
      key: "baseLine",
      get: function get() {
        var len = this.lineGroups.length;

        if (len) {
          var last = this.lineGroups[len - 1];
          return last.y - this.y + last.baseLine;
        }

        return this.y;
      }
    }], [{
      key: "isValid",
      value: function isValid(s) {
        return TAG_NAME$1.hasOwnProperty(s);
      }
    }]);

    return Dom;
  }(Xom);

  function getDom(dom) {
    if (util.isString(dom)) {
      var o = document.querySelector(dom);

      if (!o) {
        throw new Error('can not find dom of selector: ' + dom);
      }

      return o;
    }

    if (!dom) {
      throw new Error('can not find dom: ' + dom);
    }

    return dom;
  }

  function renderProp(k, v) {
    var s = Array.isArray(v) ? util.joinSourceArray(v) : util.stringify(v);

    if (k === 'className') {
      k = 'class';
    }

    return ' ' + k + '="' + util.encodeHtml(s, true) + '"';
  }

  var CS =
  /*#__PURE__*/
  function (_Dom) {
    _inherits(CS, _Dom);

    function CS(tagName, props, children) {
      var _this;

      _classCallCheck(this, CS);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CS).call(this, tagName, props, children));
      _this.__node = null; // 真实DOM引用

      return _this;
    }

    _createClass(CS, [{
      key: "__initProps",
      value: function __initProps() {
        if (this.props.width !== undefined) {
          var value = parseInt(this.props.width);

          if (!isNaN(value) && value > 0) {
            this.__width = value;
          }
        }

        if (this.props.height !== undefined) {
          var _value = parseInt(this.props.height);

          if (!isNaN(_value) && _value > 0) {
            this.__height = _value;
          }
        }
      }
    }, {
      key: "__genHtml",
      value: function __genHtml() {
        var res = "<".concat(this.tagName); // 拼接处理属性

        for (var i = 0, len = this.__props.length; i < len; i++) {
          var item = this.__props[i];
          res += renderProp(item[0], item[1]);
        }

        res += "></".concat(this.tagName, ">");
        return res;
      }
    }, {
      key: "appendTo",
      value: function appendTo(dom) {
        dom = getDom(dom);

        this.__initProps(); // 已有canvas节点


        if (dom.nodeName.toUpperCase() === this.tagName.toUpperCase()) {
          this.__node = dom;

          if (this.width) {
            dom.setAttribute('width', this.width);
          }

          if (this.height) {
            dom.setAttribute('height', this.height);
          }
        } // 没有canvas节点则生成一个新的
        else {
            var s = this.__genHtml();

            dom.insertAdjacentHTML('beforeend', s);
            var canvas = dom.querySelectorAll(this.tagName);
            this.__node = canvas[canvas.length - 1];
          } // 没有设置width/height则采用css计算形式


        if (!this.width || !this.height) {
          var css = window.getComputedStyle(dom, null);

          if (!this.width) {
            this.__width = parseInt(css.getPropertyValue('width'));
            dom.setAttribute('width', this.width);
          }

          if (!this.height) {
            this.__height = parseInt(css.getPropertyValue('height'));
            dom.setAttribute('height', this.height);
          }
        } // canvas作为根节点一定是block或flex，不会是inline


        var style = this.style;

        if (['flex', 'block'].indexOf(style.display) === -1) {
          style.display = 'block';
        } // 只有canvas有ctx，svg用真实dom


        if (this.tagName === 'canvas') {
          this.__ctx = this.__node.getContext('2d');
          mode$1.setCanvas();
        } else if (this.tagName === 'svg') {
          mode$1.setSvg();
        }

        this.__traverse(this.__ctx); // canvas的宽高固定初始化


        style.width = this.width;
        style.height = this.height;

        this.__initStyle();

        this.__preLay({
          x: 0,
          y: 0,
          w: this.width,
          h: this.height
        });

        this.render();

        if (mode$1.isSvg()) {
          this.__node.innerHTML = mode$1.html;
        }
      }
    }, {
      key: "node",
      get: function get() {
        return this.__node;
      }
    }]);

    return CS;
  }(Dom);

  var Line =
  /*#__PURE__*/
  function (_Geom) {
    _inherits(Line, _Geom);

    function Line(props) {
      var _this;

      _classCallCheck(this, Line);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, '$line', props));
      _this.__start = [0, 0];
      _this.__end = [1, 1];

      if (Array.isArray(_this.props.start)) {
        _this.__start = _this.props.start;
      }

      if (Array.isArray(_this.props.end)) {
        _this.__end = _this.props.end;
      }

      return _this;
    }

    _createClass(Line, [{
      key: "render",
      value: function render() {
        _get(_getPrototypeOf(Line.prototype), "render", this).call(this);

        var x = this.x,
            y = this.y,
            width = this.width,
            height = this.height,
            style = this.style,
            ctx = this.ctx,
            start = this.start,
            end = this.end;
        var borderTopWidth = style.borderTopWidth,
            borderLeftWidth = style.borderLeftWidth,
            stroke = style.stroke,
            strokeWidth = style.strokeWidth;
        var originX = x + borderLeftWidth.value;
        var originY = y + borderTopWidth.value;
        var x1 = originX + start[0] * width;
        var y1 = originY + start[1] * height;
        var x2 = originX + end[0] * width;
        var y2 = originY + end[1] * height;

        if (mode$1.isCanvas()) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = strokeWidth;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.closePath();
        } else if (mode$1.isSvg()) {
          mode$1.appendHtml("<line x1=\"".concat(x1, "\" y1=\"").concat(y1, "\" x2=\"").concat(x2, "\" y2=\"").concat(y2, "\" stroke-width=\"").concat(strokeWidth, "\" stroke=\"").concat(stroke, "\"/>"));
        }
      }
    }, {
      key: "start",
      get: function get() {
        return this.__start;
      }
    }, {
      key: "end",
      get: function get() {
        return this.__end;
      }
    }]);

    return Line;
  }(Geom);

  var Polygon =
  /*#__PURE__*/
  function (_Geom) {
    _inherits(Polygon, _Geom);

    function Polygon(props) {
      var _this;

      _classCallCheck(this, Polygon);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this, '$polygon', props));
      _this.__pointList = [];

      if (Array.isArray(_this.props.pointList)) {
        _this.__pointList = _this.props.pointList;
      }

      return _this;
    }

    _createClass(Polygon, [{
      key: "render",
      value: function render() {
        _get(_getPrototypeOf(Polygon.prototype), "render", this).call(this);

        var x = this.x,
            y = this.y,
            width = this.width,
            height = this.height,
            style = this.style,
            ctx = this.ctx,
            pointList = this.pointList;
        var borderTopWidth = style.borderTopWidth,
            borderLeftWidth = style.borderLeftWidth,
            stroke = style.stroke,
            strokeWidth = style.strokeWidth;
        var originX = x + borderLeftWidth.value;
        var originY = y + borderTopWidth.value;

        if (mode$1.isCanvas()) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = strokeWidth;
          ctx.beginPath();
          ctx.moveTo(originX + pointList[0][0] * width, originY + pointList[0][1] * height);

          for (var i = 1, len = pointList.length; i < len; i++) {
            var point = pointList[i];
            ctx.lineTo(originX + point[0] * width, originY + point[1] * height);
          }

          ctx.stroke();
          ctx.closePath();
        } else if (mode$1.isSvg()) {
          var points = '';

          for (var _i = 0, _len = pointList.length; _i < _len; _i++) {
            var _point = pointList[_i];
            points += "".concat(originX + _point[0] * width, ",").concat(originY + _point[1] * height, " ");
          }

          mode$1.appendHtml("<polyline fill=\"none\" points=\"".concat(points, "\" stroke-width=\"").concat(strokeWidth, "\" stroke=\"").concat(stroke, "\"/>"));
        }
      }
    }, {
      key: "pointList",
      get: function get() {
        return this.__pointList;
      }
    }]);

    return Polygon;
  }(Geom);

  var karas = {
    render: function render(cs, dom) {
      if (!(cs instanceof CS)) {
        throw new Error('render root muse be canvas or svg');
      }

      if (dom) {
        cs.appendTo(dom);
      }

      return cs;
    },
    createVd: function createVd(tagName, props, children) {
      if (['canvas', 'svg'].indexOf(tagName) > -1) {
        return new CS(tagName, props, children);
      }

      if (Dom.isValid(tagName)) {
        return new Dom(tagName, props, children);
      }

      throw new Error('can not use marker: ' + tagName);
    },
    createGm: function createGm(tagName, props) {
      if (Geom.isValid(tagName)) {
        switch (tagName) {
          case '$line':
            return new Line(props);

          case '$polygon':
            return new Polygon(props);
        }
      }

      throw new Error('can not use geom marker: ' + tagName);
    },
    createCp: function createCp(tagName, props, children) {}
  };

  if (typeof window != 'undefined') {
    window.karas = karas;
  }

  return karas;

}));
//# sourceMappingURL=index.js.map
