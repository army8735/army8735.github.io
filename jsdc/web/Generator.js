define(function(require, exports, module) {
  var homunculus = require('homunculus');
  var JsNode = homunculus.getClass('Node', 'es6');
  var Token = homunculus.getClass('token');
  
  var Class = require('./util/Class');
  var join = require('./join');
  var eventbus = require('./eventbus');
  
  var Generator = Class(function(jsdc) {
    this.jsdc = jsdc;
    this.hash = {};
    this.star = {};
<<<<<<< HEAD
    this.stmt = {};
=======
    this.block = {};
>>>>>>> FETCH_HEAD
  }).methods({
    parse: function(node, start) {
      var self = this;
      if(start) {
        self.jsdc.ignore(node.leaf(1), 'gen1');
        var token = node.leaf(2).first().token();
        //有可能被scope前置过
        var hasPre = token.ignore;
        self.jsdc.ignore(token, 'gen2');
        if(!hasPre) {
          self.jsdc.append('var ');
          self.jsdc.append(node.leaf(2).first().token().content());
          self.jsdc.append('=');
        }
<<<<<<< HEAD
        self.gen(node, start);
=======
        var state = this.jsdc.uid();
        var temp = this.jsdc.uid();
        var param = node.leaf(4).first();
        var count = this.count(node.last().prev());
        if(!param) {
          if(count) {
            param = this.jsdc.uid();
          }
          else {
            param = '';
          }
        }
        else if(param.name() == JsNode.SINGLENAME) {
          param = param.first().first().token().content();
        }
        else if(param.name() == JsNode.BINDREST) {
          param = param.last().first().token().content();
        }
        var o = this.hash[node.nid()] = {
          state: state,
          index: 0,
          count: count,
          temp: temp,
          param: param,
          last: null,
          yield: []
        };
        this.jsdc.append('function(' + param + '){');
        this.jsdc.append('var ' + state + '=0;');
        this.jsdc.append('return ');
        this.jsdc.append('function(){return{next:' + temp + '}};');
        o.pos = this.jsdc.res.length;
        this.jsdc.append('function ' + temp);
>>>>>>> FETCH_HEAD
      }
      else {
        self.gen(node, start);
        self.jsdc.appendBefore('}();');
      }
  
    },
    expr: function(node, start) {
      var self = this;
      if(start) {
        self.jsdc.ignore(node.first(), 'gen3');
        self.jsdc.ignore(node.leaf(1), 'gen4');
        if(node.leaf(2).name() == JsNode.BINDID) {
          self.jsdc.ignore(node.leaf(2), 'gen5');
        }
<<<<<<< HEAD
        self.gen(node, start);
      }
      else {
        self.gen(node, start);
        self.jsdc.appendBefore('}()');
      }
    },
    gen: function(node, start) {
      var self = this;
      if(start) {
        self.jsdc.ignore(node.first(), 'gen6');
        var state = self.jsdc.uid();
        var temp = self.jsdc.uid();
        var param = node.leaf(4).first();
        var res = self.count(node.last().prev(), node);
        var count = res.count;
        var ret = res.return;
        if(res.pre) {
          self.pre(node.last().prev(), node.nid(), node.last().prev().nid());
        }
        if(!param) {
          if(count) {
            param = self.jsdc.uid();
            eventbus.on(node.leaf(4).nid(), function(node, start) {
              start && self.jsdc.append(param);
            });
=======
        var state = this.jsdc.uid();
        var temp = this.jsdc.uid();
        var count = this.count(node.last().prev());
        var param = node.leaf(4).first();
        if(!param) {
          if(count) {
            param = this.jsdc.uid();
>>>>>>> FETCH_HEAD
          }
          else {
            param = '';
          }
        }
        else if(param.name() == JsNode.SINGLENAME) {
          param = param.first().first().token().content();
        }
        else if(param.name() == JsNode.BINDREST) {
<<<<<<< HEAD
          param = param.last().first().token().content() + '[0]';
        }
        var o = self.hash[node.nid()] = {
          state: state,
          index: 0,
          index2: 0,
          count: count,
          return: ret,
          if: 0,
          temp: temp,
          param: param,
          last: null,
          yield: [],
          pre: res.pre
        };
        self.jsdc.append('function(){');
        self.jsdc.append('var ' + state + '=0;');
        self.jsdc.append('return function(){return{next:' + temp + '}};');
        o.pos = self.jsdc.res.length;
        self.jsdc.append('function ' + temp);
=======
          param = param.last().first().token().content();
        }
        var o = this.hash[node.nid()] = {
          state: state,
          index: 0,
          count: count,
          temp: temp,
          param: param,
          last: null,
          yield: []
        };
        this.jsdc.append('function(' + param + '){');
        this.jsdc.append('var ' + state + '=0;');
        this.jsdc.append('return function(){return{next:' + temp + '}};');
        o.pos = this.jsdc.res.length;
        this.jsdc.append('function ' + temp);
      }
      else {
        this.jsdc.appendBefore('}()');
>>>>>>> FETCH_HEAD
      }
    },
    yield: function(node, start) {
      var self = this;
      var top = self.closest(node);
      var o = self.hash[top.nid()];
      if(start) {
<<<<<<< HEAD
        self.jsdc.ignore(node.first(), 'gen7');
        var parent = node.parent();
        //赋值语句需要添加上参数，先默认undefined，并记录在变量中为下次添加做标记
        var parent = node.parent();
        switch(parent.name()) {
          case JsNode.INITLZ:
            o.last = join(parent.prev());
            break;
          case JsNode.ASSIGNEXPR:
            o.last = join(parent.first());
            break;
          default:
            o.last = null;
        }
        //加上状态变更
        o.index++;
        self.jsdc.append(o.state + '=' + ++o.index2 + ';');
=======
        self.jsdc.ignore(node.first());
        var parent = node.parent();
        //赋值语句需要添加上参数，先默认undefined，并记录在变量中为下次添加做标记
        if([JsNode.INITLZ, JsNode.ASSIGNEXPR].indexOf(parent.name()) > -1) {
          self.jsdc.append('void 0;');
          if(parent.name() == JsNode.INITLZ) {
            o.last = join(parent.prev());
          }
          else {
            o.last = join(parent.first());
          }
        }
        else {
          o.last = null;
          //省略{}的ifstmt/iteratorstmt等要加上
          var parent = node.parent();
          if(parent.name() == JsNode.EXPRSTMT) {
            var grand = parent.parent();
            if(grand.name() == JsNode.IFSTMT && !parent.next()) {
              self.jsdc.append('{');
              eventbus.on(grand.nid(), function(node, start) {
                if(!start) {
                  self.jsdc.appendBefore('}');
                }
              });
            }
          }
        }
        //加上状态变更
        self.jsdc.append(o.state + '++;');
>>>>>>> FETCH_HEAD
        //yield *
        if(node.size() > 2
          && node.leaf(1).name() == JsNode.TOKEN
          && node.leaf(1).token().content() == '*') {
<<<<<<< HEAD
          self.jsdc.ignore(node.leaf(1), 'gen8');
=======
          self.jsdc.ignore(node.leaf(1));
>>>>>>> FETCH_HEAD
          var temp = this.star[node.nid()] = self.jsdc.uid();
          self.jsdc.append('var ' + temp + '=');
        }
        else {
          self.jsdc.append('return{value:');
        }
      }
      else {
<<<<<<< HEAD
        //yield *
        if(self.star.hasOwnProperty(node.nid())) {
          var temp = self.star[node.nid()];
          self.jsdc.appendBefore('.next();return{done:(!' + temp + '.done&&' + o.state + '--),value:' + temp + '}');
=======
        if(self.star.hasOwnProperty(node.nid())) {
          var temp = self.star[node.nid()];
          self.jsdc.appendBefore('();if(!' + temp + '.done)' + o.state + '--;return ' + temp + ';');
>>>>>>> FETCH_HEAD
          o.yield.push({
            i: self.jsdc.i,
            star: temp
          });
        }
        else {
<<<<<<< HEAD
          self.jsdc.appendBefore(',done:' + (o.index == o.count) + '}');
=======
          self.jsdc.appendBefore(',done:' + (o.index == o.count - 1) + '};');
>>>>>>> FETCH_HEAD
          o.yield.push({
            i: self.jsdc.i
          });
        }
<<<<<<< HEAD
        self.ignoreNext(node, ';');
        if(o.index < o.count) {
          self.jsdc.appendBefore(';case ' + o.index2 + ':');
        }
        else {
          self.jsdc.appendBefore(';case ' + o.index2 + ':');
        }
=======
        if(o.index++ < o.count - 1) {
          self.jsdc.appendBefore('case ' + o.index + ':');
        }
        else {
          self.jsdc.appendBefore('default:');
        }
        self.ignoreNext(node, ';');
>>>>>>> FETCH_HEAD
        //有赋值需要先赋值
        if(o.last) {
          self.jsdc.appendBefore(o.last + '=' + o.param + ';');
        }
        o.last = null;
      }
    },
    body: function(node, start) {
      var top = node.parent();
      if(top.name() == JsNode.GENDECL) {
        var o = this.hash[top.nid()];
        if(start) {
<<<<<<< HEAD
          if(o.count) {
            this.jsdc.append('while(1){switch(' + o.state + '){case 0:');
          }
        }
        else if(!o.return) {
          if(o.count) {
            this.jsdc.appendBefore(';' + o.state + '=-1');
            this.jsdc.appendBefore(';default:return{done:true}}}');
          }
          else {
            this.jsdc.appendBefore('return{done:true}');
          }
=======
          this.jsdc.append('switch(' + o.state + '){case 0:');
        }
        else {
          var last = this.getLast(node);
          if(last) {
            if([';', '}'].indexOf(last.token().content()) == -1) {
              this.jsdc.appendBefore(';');
            }
          }
          this.jsdc.appendBefore('return{done:true}}');
>>>>>>> FETCH_HEAD
        }
      }
    },
    closest: function(node) {
      var parent = node;
      while(parent = parent.parent()) {
        if(parent.name() == JsNode.GENDECL
          || parent.name() == JsNode.GENEXPR) {
          return parent;
        }
      }
    },
    prevar: function(varstmt) {
      var top = varstmt.gen;
      if(top) {
        this.jsdc.ignore(varstmt.first(), 'gen9');
        this.jsdc.insert('var ' + varstmt.leaf(1).first().first().token().content() + ';', this.hash[top.nid()].pos);
      }
    },
<<<<<<< HEAD
    count: function(node, top, res) {
      res = res || { count: 0, return: false, pre: false };
      var self = this;
      var isToken = node.name() == JsNode.TOKEN;
      if(!isToken) {
        switch(node.name()) {
          case JsNode.YIELDEXPR:
            res.count++;
            //赋值语句忽略
            var parent = node.parent();
            switch(parent.name()) {
              case JsNode.INITLZ:
                self.jsdc.ignore(parent.prev(), 'gen10');
                self.jsdc.ignore(node.prev(), 'gen11');
                break;
              case JsNode.ASSIGNEXPR:
                self.jsdc.ignore(parent.first(), 'gen12');
                self.jsdc.ignore(node.prev(), 'gen13');
                break;
            }
            var belong = self.belong(node);
            belong.forEach(function(f) {
              self.stmt[f.nid()] = true;
              res.pre = true;
            });
            break;
          case JsNode.RETSTMT:
            res.return = node;
            eventbus.on(node.nid(), function(node, start) {
              if(start) {
                var o = self.hash[top.nid()];
                self.jsdc.appendBefore(';' + o.state + '=-1;default:');
              }
            });
            eventbus.on(node.leaf(1).nid(), function(node, start) {
              if(start) {
                self.jsdc.append('{value:');
              }
              else {
                self.jsdc.appendBefore(',done:true}');
              }
            });
            break;
          //忽略这些节点中的yield语句
          case JsNode.CLASSDECL:
          case JsNode.CLASSEXPR:
          case JsNode.FNDECL:
          case JsNode.FNEXPR:
          case JsNode.GENDECL:
          case JsNode.GENEXPR:
          case JsNode.METHOD:
            return;
        }
        node.leaves().forEach(function(leaf) {
          self.count(leaf, top, res);
        });
      }
      return res;
    },
    pre: function(node, nid, bid, res) {
      res = res || { index: 0 };
      var self = this;
      var isToken = node.name() == JsNode.TOKEN;
      if(!isToken) {
        switch(node.name()) {
          case JsNode.IFSTMT:
            if(self.stmt.hasOwnProperty(node.nid())) {
              res.index++;
              var block = node.leaf(4);
              //改写if语句
              self.jsdc.ignore(node.first(), 'gen14');
              self.jsdc.ignore(node.leaf(1), 'gen15');
              self.jsdc.ignore(node.leaf(2), 'gen16');
              self.jsdc.ignore(node.leaf(3), 'gen17');
              if(block.name() == JsNode.BLOCKSTMT) {
                self.jsdc.ignore(block.first().first(), 'gen18');
                self.jsdc.ignore(block.first().last(), 'gen19');
              }
              var temp;
              var ifEndTemp;
              var top;
              var ifstmt = node;
              //if结束后的状态
              eventbus.on(node.nid(), function(node, start) {
                if(!start) {
                  self.jsdc.append('case ' + ifEndTemp + ':');
                }
              });
              //根据表达式true/false分2个state
              eventbus.on(block.nid(), function(node, start) {
                if(start) {
                  top = self.hash[nid];
                  index = top.index2;
                  self.jsdc.append(top.state + '=');
                  self.jsdc.append(join(ifstmt.leaf(2)));
                  self.jsdc.append('?');
                  self.jsdc.append(++top.index2 + ':' + ++top.index2 + ';break;');
                  self.jsdc.append('case ' + (top.index2 - 1) + ':');
                  temp = top.index2;
                  ifEndTemp = ++top.index2;
                }
                else {
                  self.jsdc.appendBefore(top.state + '=');
                  self.jsdc.appendBefore(ifEndTemp);
                  self.jsdc.appendBefore(';break;');
                }
              });
              //else语句忽略{}
              var elset = block.next();
              if(elset && elset.name() == JsNode.TOKEN) {
                self.jsdc.ignore(elset, 'gen20');
                block = elset.next();
                if(block.name() == JsNode.BLOCKSTMT) {
                  self.jsdc.ignore(block.first().first(), 'gen21');
                  self.jsdc.ignore(block.first().last(), 'gen22');
                }
                eventbus.on(block.nid(), function(node, start) {
                  if(start) {
                    self.jsdc.append('case ' + temp + ':');
                  }
                  else {
                    self.jsdc.appendBefore(top.state + '=');
                    self.jsdc.appendBefore(ifEndTemp);
                    self.jsdc.appendBefore('break;');
                  }
                });
              }
            }
            break;
          //忽略这些节点中的所有逻辑
          case JsNode.CLASSDECL:
          case JsNode.CLASSEXPR:
          case JsNode.FNDECL:
          case JsNode.FNEXPR:
          case JsNode.GENDECL:
          case JsNode.GENEXPR:
          case JsNode.METHOD:
            return;
        }
        node.leaves().forEach(function(leaf) {
          self.pre(leaf, nid, bid, res);
        });
      }
=======
    count: function(node, res) {
      res = res || { count: 0 };
      var self = this;
      var isToken = node.name() == JsNode.TOKEN;
      if(!isToken) {
        if(node.name() == JsNode.YIELDEXPR) {
          res.count++;
        }
        node.leaves().forEach(function(leaf) {
          self.count(leaf, res);
        });
      }
      return res.count;
>>>>>>> FETCH_HEAD
    },
    getLast: function(node) {
      while(node = node.last()) {
        if(node.name() == JsNode.TOKEN) {
          return node;
        }
      }
    },
    ignoreNext: function(node, value) {
      node = this.getLast(node);
      if(node) {
        var token = node.token();
        while(token = token.next()) {
          if(token.type() == Token.COMMENT
            || token.type() == Token.BLANK
            || token.type() == Token.LINE) {
            continue;
          }
          if(token.content() == value) {
<<<<<<< HEAD
            this.jsdc.ignore(token, 'gen23');
=======
            this.jsdc.ignore(token);
>>>>>>> FETCH_HEAD
            return;
          }
          else {
            return;
          }
        }
      }
<<<<<<< HEAD
    },
    belong: function(node) {
      var res = [];
      while(node = node.parent()) {
        switch(node.name()) {
          case JsNode.IFSTMT:
          case JsNode.ITERSTMT:
            res.push(node);
          case JsNode.GENDECL:
          case JsNode.GENEXPR:
            break;
        }
      }
      return res;
=======
>>>>>>> FETCH_HEAD
    }
  });
  
  module.exports = Generator;
});