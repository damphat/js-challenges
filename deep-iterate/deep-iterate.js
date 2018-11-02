function* internalIterate(iterable) {
    var stack = [];
    var iter = iterable[Symbol.iterator]();

    while (true) {
        var { value, done } = iter.next();
        if (!done) {
            while(typeof value === 'function') value = value();
            if (value === null) {
                yield null;
            } else if (typeof value === 'object' && value[Symbol.iterator]) {
                stack.push(iter);
                iter = value[Symbol.iterator]();
            } else { 
                yield value;
            }
        } else if (stack.length > 0) {
            iter = stack.pop();
        } else {
            return;
        }
    }
}

module.exports = function deepIterate(...args) {
    return internalIterate(args);
};