function append(ret, v) {
    if(v === null) {
        ret.push(null);
    } else if(typeof v === 'object' && v[Symbol.iterator]) {
        for (var i of v) { append(ret, i); }
    } else if(typeof v == 'function') {
        append(ret, v());
    } else {
        ret.push(v);
    }
    return ret;
}

function flatten(...args) {
    return append([], args);
}

flatten.append = append;

module.exports = flatten;
