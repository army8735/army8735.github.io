define(function(require, exports, module){var Event=function(){var _0=require('./Event');return _0.hasOwnProperty("Event")?_0.Event:_0.hasOwnProperty("default")?_0.default:_0}();
var Component=function(){var _1=require('./Component');return _1.hasOwnProperty("Component")?_1.Component:_1.hasOwnProperty("default")?_1.default:_1}();

!function(){var _2=Object.create(Component.prototype);_2.constructor=CachedComponent;CachedComponent.prototype=_2}();
  function CachedComponent(data) {
    data=[].slice.call(arguments, 0);Component.apply(this,[].concat(function(){var _3=[],_4,_5=data[Symbol.iterator]();while(!(_4=_5.next()).done)_3.push(_4.value);return _3}()));
    this.__handler = {};
  }

  CachedComponent.prototype.__onData = function(target, k) {
    var self = this;
    function cb() {
      self.htmlComponent.emit(Event.DATA, target, k);
    }
    var temp;
    if(!self.__handler.hasOwnProperty(k)) {
      temp = self.__handler[k] = { cb: cb, timeout: null };
    }
    temp = temp || self.__handler[k];
    if(temp.timeout) {
      temp.cb = cb;
    }
    else {
      temp.timeout = setTimeout(function() {
        temp.cb();
        temp.timeout = null;
      }, 1);
    }
    self.children.forEach(function(child) {
      if(child instanceof Component) {
        child.emit(Event.DATA, target, k);
      }
    });
  }
Object.keys(Component).forEach(function(k){CachedComponent[k]=Component[k]});

exports.default=CachedComponent;});