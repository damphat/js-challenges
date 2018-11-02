var deepIterate = require('./deep-iterate');
var assert = require('assert');

describe('deepIterate(...args)', () => {
    it('iterates anything except functions and iterator objects', function() {
        assert.deepStrictEqual(
            Array.from(deepIterate(undefined, null, true, 1, 'abc', {age: 20}, Symbol.iterator)),
            [undefined, null, true, 1, 'abc', {age: 20}, Symbol.iterator]
        );
    });

    it('iterates values inside arrays', function() {
        assert.deepStrictEqual(
            Array.from(deepIterate([[1], [2,3]])),
            [1,2,3]
        );
    });

    it('iterates values return from generators', function() {
        function *foo() {
            yield 1;
            yield 2;
        }

        assert.deepStrictEqual(
            Array.from(deepIterate(foo)),
            [1,2]
        );
        assert.deepStrictEqual(
            Array.from(deepIterate(foo())),
            [1,2]
        );
        assert.deepStrictEqual(
            Array.from(deepIterate(foo()[Symbol.iterator]())),
            [1,2]
        );
    });

    it('iterates values returned from functions', function() {
        assert.deepStrictEqual(
            Array.from(deepIterate(() => () => [1,[2],3])),
            [1,2,3]
        );
    });
});