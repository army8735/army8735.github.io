define(function(require, exports, module) {
  var yurine = require('./web/index')['default'];
  yurine.init = function() {
    var jsx = document.querySelectorAll('script');
    for(var i = 0, len = jsx.length; i < len; i++) {
      var node = jsx[i];
      if(node.getAttribute('type') === 'text/jsx' && !node.getAttribute('yurine')) {
        node.setAttribute('yurine', 1);
        var code = node.textContent || node.text;
        if(!code) {
          continue;
        }
        code = yurine.parse(code);
        node.textContent = node.text = code;
      }
    }
  };
  module.exports = yurine;
});
