var flatten = require('./flatten');
var assert = require('assert');

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
            flatten(rangeIterator(1, 3)),
            [1, 2, 3]
        );
    });

    it('should execute and flatten the return values from function', function () {
        assert.deepStrictEqual(
            flatten(function() { return () => [[1, 2]]; }),
            [1, 2]
        );
    });

    it('should flatten generators', function() {
        assert.deepStrictEqual(
            flatten(rangeGenerator(1, 3)),
            [1, 2, 3]
        );
    });


    it('should flatten iterator', function() {
        var arr = [1, 2];
        var itor = arr[Symbol.iterator]();
        assert.deepStrictEqual(
            flatten(itor, itor, itor),
            [1, 2]
        );
    });

    it('should return new array and never mutate the input', function() {
        var src = [1,2];
        assert.notStrictEqual(
            flatten(src),
            src,
            'should return new array'
        );

        assert.deepStrictEqual(
            src, 
            [1, 2],
            'should not mutate the input'
        );
    });
});

function rangeIterator(a, b) {
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

function * rangeGenerator(a, b) {
    for(var i=a; i<=b; i++) {
        yield i;
    }
}
