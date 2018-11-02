module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            0,
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0,
        "no-unused-vars": 0,
        "no-constant-condition": 0
    }
};