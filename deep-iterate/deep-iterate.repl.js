var utils = require('../utils');
var deepIterate = require('./deep-iterate');

utils.repl({
    deepIterate,
    array: function() {
        return Array.from(deepIterate.apply(this, arguments));
    }
});