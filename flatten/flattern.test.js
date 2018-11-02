var flatten = require('./flatten');
var assert = require('assert');

function range(a, b) {
    return {
        [Symbol.iterator]() {
            var i = a;
            return {
                next() {
                    if(i <= b) return {
                        value: i++,
                        done: false
                    };

                    return {
                        value: undefined,
                        done: true
                    };
                }
            };
        }
    };
}

function * generate(a, b) {
    for(var i=a; i<=b; i++) {
        yield i;
    }
}

describe('flatten', function() {
    it('should accept undefined', function() {
        assert.deepStrictEqual(
            flatten(undefined, function() {}, [undefined]),
            [undefined, undefined, undefined]
        );
    });

    it('should accept null, bool, num, string, object', function() {
        assert.deepStrictEqual(
            flatten(null, true, 1, "abc", {}),
            [null, true, 1, "abc", {}]
        );
    });

    it('should flatten nested array', function() {
        assert.deepStrictEqual(
            flatten([], [1], [[2]], [[3],[4]]),
            [1, 2, 3, 4]
        );
    });

    it('should flatten iterable objects', function() {
        assert.deepStrictEqual(
            flatten({
                [Symbol.iterator]() {
                    return {
                        i: 0,           
                        next() {
                            if(this.i < 2) {
                                this.i++;
                                return {
                                    done: false,
                                    value: this.i
                                };
                            } else {
                                return {
                                    done: true,
                                    value: undefined
                                };
                            }
                        }
                    };
                } 
            }),
            [1, 2]
        );

        assert.deepStrictEqual(
            flatten(function() { return () => [1, 2]; }),
            [1, 2]
        );

    });

    it('should flatten generators', function() {
        assert.deepStrictEqual(
            flatten(function *() {yield 1; yield [2, 3];}),
            [1, 2, 3]
        );
    });


    it('should flatten iterator', function() {
        var arr = [1, 2];
        var itor = arr[Symbol.iterator]();
        assert.deepStrictEqual(
            flatten(itor, itor),
            [1, 2]
        );
    });

    it('should make an new array', function() {
        assert.notStrictEqual(
            flatten([1]),
            flatten([1])
        );
    });
});