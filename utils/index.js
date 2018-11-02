/**
 * start a repl REPL with context
 * @param {Object} ctx - predefined variables for REPL
 */
function repl(ctx) {
    var server = require("repl").start(">");
    Object.assign(server.context, ctx);    
    return server;
}

module.exports = {
    repl
};