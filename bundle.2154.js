(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2154],{

/***/ 62154:
/***/ (function(module) {

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
(function webpackUniversalModuleDefinition(root, factory) {
    if (true) module.exports = factory();
    else { var i, a; }
})(this, ()=>{
    return /******/ (()=>{
        /******/ var __webpack_modules__ = {
            /***/ 1696: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_810__)=>{
                "use strict";
                /* provided dependency */ var process = __nested_webpack_require_810__(4406);
                /* provided dependency */ var console = __nested_webpack_require_810__(3716);
                // Currently in sync with Node.js lib/assert.js
                // https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
                // Originally from narwhal.js (http://narwhaljs.org)
                // Copyright (c) 2009 Thomas Robinson <280north.com>
                //
                // Permission is hereby granted, free of charge, to any person obtaining a copy
                // of this software and associated documentation files (the 'Software'), to
                // deal in the Software without restriction, including without limitation the
                // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
                // sell copies of the Software, and to permit persons to whom the Software is
                // furnished to do so, subject to the following conditions:
                //
                // The above copyright notice and this permission notice shall be included in
                // all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
                // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
                // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                function _typeof(obj) {
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var _require = __nested_webpack_require_810__(7515), _require$codes = _require.codes, ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE, ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
                var AssertionError = __nested_webpack_require_810__(4082);
                var _require2 = __nested_webpack_require_810__(3335), inspect = _require2.inspect;
                var _require$types = __nested_webpack_require_810__(3335).types, isPromise = _require$types.isPromise, isRegExp = _require$types.isRegExp;
                var objectAssign = Object.assign ? Object.assign : __nested_webpack_require_810__(4956).assign;
                var objectIs = Object.is ? Object.is : __nested_webpack_require_810__(4679);
                var errorCache = new Map();
                var isDeepEqual;
                var isDeepStrictEqual;
                var parseExpressionAt;
                var findNodeAround;
                var decoder;
                function lazyLoadComparison() {
                    var comparison = __nested_webpack_require_810__(6796);
                    isDeepEqual = comparison.isDeepEqual;
                    isDeepStrictEqual = comparison.isDeepStrictEqual;
                } // Escape control characters but not \n and \t to keep the line breaks and
                // indentation intact.
                // eslint-disable-next-line no-control-regex
                var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
                var meta = /* unused pure expression or super */ null && 0;
                var escapeFn = function escapeFn(str) {
                    return meta[str.charCodeAt(0)];
                };
                var warned = false; // The assert module provides functions that throw
                // AssertionError's when particular conditions are not met. The
                // assert module must conform to the following interface.
                var assert = module1.exports = ok;
                var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
                // when a corresponding condition is not met, with a message that
                // may be undefined if not provided. All assertion methods provide
                // both the actual and expected values to the assertion error for
                // display purposes.
                function innerFail(obj) {
                    if (obj.message instanceof Error) throw obj.message;
                    throw new AssertionError(obj);
                }
                function fail(actual, expected, message, operator, stackStartFn) {
                    var argsLen = arguments.length;
                    var internalMessage;
                    if (argsLen === 0) {
                        internalMessage = 'Failed';
                    } else if (argsLen === 1) {
                        message = actual;
                        actual = undefined;
                    } else {
                        if (warned === false) {
                            warned = true;
                            var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
                            warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
                        }
                        if (argsLen === 2) operator = '!=';
                    }
                    if (message instanceof Error) throw message;
                    var errArgs = {
                        actual: actual,
                        expected: expected,
                        operator: operator === undefined ? 'fail' : operator,
                        stackStartFn: stackStartFn || fail
                    };
                    if (message !== undefined) {
                        errArgs.message = message;
                    }
                    var err = new AssertionError(errArgs);
                    if (internalMessage) {
                        err.message = internalMessage;
                        err.generatedMessage = true;
                    }
                    throw err;
                }
                assert.fail = fail; // The AssertionError is defined in internal/error.
                assert.AssertionError = AssertionError;
                function innerOk(fn, argLen, value, message) {
                    if (!value) {
                        var generatedMessage = false;
                        if (argLen === 0) {
                            generatedMessage = true;
                            message = 'No value argument passed to `assert.ok()`';
                        } else if (message instanceof Error) {
                            throw message;
                        }
                        var err = new AssertionError({
                            actual: value,
                            expected: true,
                            message: message,
                            operator: '==',
                            stackStartFn: fn
                        });
                        err.generatedMessage = generatedMessage;
                        throw err;
                    }
                } // Pure assertion tests whether a value is truthy, as determined
                // by !!value.
                function ok() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    innerOk.apply(void 0, [
                        ok,
                        args.length
                    ].concat(args));
                }
                assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.
                /* eslint-disable no-restricted-properties */ assert.equal = function equal(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    } // eslint-disable-next-line eqeqeq
                    if (actual != expected) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: '==',
                            stackStartFn: equal
                        });
                    }
                }; // The non-equality assertion tests for whether two objects are not
                // equal with !=.
                assert.notEqual = function notEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    } // eslint-disable-next-line eqeqeq
                    if (actual == expected) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: '!=',
                            stackStartFn: notEqual
                        });
                    }
                }; // The equivalence assertion tests a deep equality relation.
                assert.deepEqual = function deepEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    }
                    if (isDeepEqual === undefined) lazyLoadComparison();
                    if (!isDeepEqual(actual, expected)) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: 'deepEqual',
                            stackStartFn: deepEqual
                        });
                    }
                }; // The non-equivalence assertion tests for any deep inequality.
                assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    }
                    if (isDeepEqual === undefined) lazyLoadComparison();
                    if (isDeepEqual(actual, expected)) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: 'notDeepEqual',
                            stackStartFn: notDeepEqual
                        });
                    }
                };
                /* eslint-enable */ assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    }
                    if (isDeepEqual === undefined) lazyLoadComparison();
                    if (!isDeepStrictEqual(actual, expected)) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: 'deepStrictEqual',
                            stackStartFn: deepStrictEqual
                        });
                    }
                };
                assert.notDeepStrictEqual = notDeepStrictEqual;
                function notDeepStrictEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    }
                    if (isDeepEqual === undefined) lazyLoadComparison();
                    if (isDeepStrictEqual(actual, expected)) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: 'notDeepStrictEqual',
                            stackStartFn: notDeepStrictEqual
                        });
                    }
                }
                assert.strictEqual = function strictEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    }
                    if (!objectIs(actual, expected)) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: 'strictEqual',
                            stackStartFn: strictEqual
                        });
                    }
                };
                assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
                    if (arguments.length < 2) {
                        throw new ERR_MISSING_ARGS('actual', 'expected');
                    }
                    if (objectIs(actual, expected)) {
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: 'notStrictEqual',
                            stackStartFn: notStrictEqual
                        });
                    }
                };
                var Comparison = function Comparison(obj, keys, actual) {
                    var _this = this;
                    _classCallCheck(this, Comparison);
                    keys.forEach(function(key) {
                        if (key in obj) {
                            if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
                                _this[key] = actual[key];
                            } else {
                                _this[key] = obj[key];
                            }
                        }
                    });
                };
                function compareExceptionKey(actual, expected, key, message, keys, fn) {
                    if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
                        if (!message) {
                            // Create placeholder objects to create a nice output.
                            var a = new Comparison(actual, keys);
                            var b = new Comparison(expected, keys, actual);
                            var err = new AssertionError({
                                actual: a,
                                expected: b,
                                operator: 'deepStrictEqual',
                                stackStartFn: fn
                            });
                            err.actual = actual;
                            err.expected = expected;
                            err.operator = fn.name;
                            throw err;
                        }
                        innerFail({
                            actual: actual,
                            expected: expected,
                            message: message,
                            operator: fn.name,
                            stackStartFn: fn
                        });
                    }
                }
                function expectedException(actual, expected, msg, fn) {
                    if (typeof expected !== 'function') {
                        if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.
                        if (arguments.length === 2) {
                            throw new ERR_INVALID_ARG_TYPE('expected', [
                                'Function',
                                'RegExp'
                            ], expected);
                        } // Handle primitives properly.
                        if (_typeof(actual) !== 'object' || actual === null) {
                            var err = new AssertionError({
                                actual: actual,
                                expected: expected,
                                message: msg,
                                operator: 'deepStrictEqual',
                                stackStartFn: fn
                            });
                            err.operator = fn.name;
                            throw err;
                        }
                        var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
                        // as well.
                        if (expected instanceof Error) {
                            keys.push('name', 'message');
                        } else if (keys.length === 0) {
                            throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
                        }
                        if (isDeepEqual === undefined) lazyLoadComparison();
                        keys.forEach(function(key) {
                            if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
                                return;
                            }
                            compareExceptionKey(actual, expected, key, msg, keys, fn);
                        });
                        return true;
                    } // Guard instanceof against arrow functions as they don't have a prototype.
                    if (expected.prototype !== undefined && actual instanceof expected) {
                        return true;
                    }
                    if (Error.isPrototypeOf(expected)) {
                        return false;
                    }
                    return expected.call({}, actual) === true;
                }
                function getActual(fn) {
                    if (typeof fn !== 'function') {
                        throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
                    }
                    try {
                        fn();
                    } catch (e) {
                        return e;
                    }
                    return NO_EXCEPTION_SENTINEL;
                }
                function checkIsPromise(obj) {
                    // Accept native ES6 promises and promises that are implemented in a similar
                    // way. Do not accept thenables that use a function as `obj` and that have no
                    // `catch` handler.
                    // TODO: thenables are checked up until they have the correct methods,
                    // but according to documentation, the `then` method should receive
                    // the `fulfill` and `reject` arguments as well or it may be never resolved.
                    return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
                }
                function waitForActual(promiseFn) {
                    return Promise.resolve().then(function() {
                        var resultPromise;
                        if (typeof promiseFn === 'function') {
                            // Return a rejected promise if `promiseFn` throws synchronously.
                            resultPromise = promiseFn(); // Fail in case no promise is returned.
                            if (!checkIsPromise(resultPromise)) {
                                throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
                            }
                        } else if (checkIsPromise(promiseFn)) {
                            resultPromise = promiseFn;
                        } else {
                            throw new ERR_INVALID_ARG_TYPE('promiseFn', [
                                'Function',
                                'Promise'
                            ], promiseFn);
                        }
                        return Promise.resolve().then(function() {
                            return resultPromise;
                        }).then(function() {
                            return NO_EXCEPTION_SENTINEL;
                        }).catch(function(e) {
                            return e;
                        });
                    });
                }
                function expectsError(stackStartFn, actual, error, message) {
                    if (typeof error === 'string') {
                        if (arguments.length === 4) {
                            throw new ERR_INVALID_ARG_TYPE('error', [
                                'Object',
                                'Error',
                                'Function',
                                'RegExp'
                            ], error);
                        }
                        if (_typeof(actual) === 'object' && actual !== null) {
                            if (actual.message === error) {
                                throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
                            }
                        } else if (actual === error) {
                            throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
                        }
                        message = error;
                        error = undefined;
                    } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
                        throw new ERR_INVALID_ARG_TYPE('error', [
                            'Object',
                            'Error',
                            'Function',
                            'RegExp'
                        ], error);
                    }
                    if (actual === NO_EXCEPTION_SENTINEL) {
                        var details = '';
                        if (error && error.name) {
                            details += " (".concat(error.name, ")");
                        }
                        details += message ? ": ".concat(message) : '.';
                        var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
                        innerFail({
                            actual: undefined,
                            expected: error,
                            operator: stackStartFn.name,
                            message: "Missing expected ".concat(fnType).concat(details),
                            stackStartFn: stackStartFn
                        });
                    }
                    if (error && !expectedException(actual, error, message, stackStartFn)) {
                        throw actual;
                    }
                }
                function expectsNoError(stackStartFn, actual, error, message) {
                    if (actual === NO_EXCEPTION_SENTINEL) return;
                    if (typeof error === 'string') {
                        message = error;
                        error = undefined;
                    }
                    if (!error || expectedException(actual, error)) {
                        var details = message ? ": ".concat(message) : '.';
                        var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
                        innerFail({
                            actual: actual,
                            expected: error,
                            operator: stackStartFn.name,
                            message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
                            stackStartFn: stackStartFn
                        });
                    }
                    throw actual;
                }
                assert.throws = function throws(promiseFn) {
                    for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
                        args[_key2 - 1] = arguments[_key2];
                    }
                    expectsError.apply(void 0, [
                        throws,
                        getActual(promiseFn)
                    ].concat(args));
                };
                assert.rejects = function rejects(promiseFn) {
                    for(var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++){
                        args[_key3 - 1] = arguments[_key3];
                    }
                    return waitForActual(promiseFn).then(function(result) {
                        return expectsError.apply(void 0, [
                            rejects,
                            result
                        ].concat(args));
                    });
                };
                assert.doesNotThrow = function doesNotThrow(fn) {
                    for(var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++){
                        args[_key4 - 1] = arguments[_key4];
                    }
                    expectsNoError.apply(void 0, [
                        doesNotThrow,
                        getActual(fn)
                    ].concat(args));
                };
                assert.doesNotReject = function doesNotReject(fn) {
                    for(var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++){
                        args[_key5 - 1] = arguments[_key5];
                    }
                    return waitForActual(fn).then(function(result) {
                        return expectsNoError.apply(void 0, [
                            doesNotReject,
                            result
                        ].concat(args));
                    });
                };
                assert.ifError = function ifError(err) {
                    if (err !== null && err !== undefined) {
                        var message = 'ifError got unwanted exception: ';
                        if (_typeof(err) === 'object' && typeof err.message === 'string') {
                            if (err.message.length === 0 && err.constructor) {
                                message += err.constructor.name;
                            } else {
                                message += err.message;
                            }
                        } else {
                            message += inspect(err);
                        }
                        var newErr = new AssertionError({
                            actual: err,
                            expected: null,
                            operator: 'ifError',
                            message: message,
                            stackStartFn: ifError
                        }); // Make sure we actually have a stack trace!
                        var origStack = err.stack;
                        if (typeof origStack === 'string') {
                            // This will remove any duplicated frames from the error frames taken
                            // from within `ifError` and add the original error frames to the newly
                            // created ones.
                            var tmp2 = origStack.split('\n');
                            tmp2.shift(); // Filter all frames existing in err.stack.
                            var tmp1 = newErr.stack.split('\n');
                            for(var i = 0; i < tmp2.length; i++){
                                // Find the first occurrence of the frame.
                                var pos = tmp1.indexOf(tmp2[i]);
                                if (pos !== -1) {
                                    // Only keep new frames.
                                    tmp1 = tmp1.slice(0, pos);
                                    break;
                                }
                            }
                            newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
                        }
                        throw newErr;
                    }
                }; // Expose a strict only variant of assert
                function strict() {
                    for(var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++){
                        args[_key6] = arguments[_key6];
                    }
                    innerOk.apply(void 0, [
                        strict,
                        args.length
                    ].concat(args));
                }
                assert.strict = objectAssign(strict, assert, {
                    equal: assert.strictEqual,
                    deepEqual: assert.deepStrictEqual,
                    notEqual: assert.notStrictEqual,
                    notDeepEqual: assert.notDeepStrictEqual
                });
                assert.strict.strict = assert.strict;
            /***/ },
            /***/ 4082: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_32028__)=>{
                "use strict";
                /* provided dependency */ var process = __nested_webpack_require_32028__(4406);
                // Currently in sync with Node.js lib/internal/assert/assertion_error.js
                // https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c
                function _objectSpread(target) {
                    for(var i = 1; i < arguments.length; i++){
                        var source = arguments[i] != null ? arguments[i] : {};
                        var ownKeys = Object.keys(source);
                        if (typeof Object.getOwnPropertySymbols === 'function') {
                            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                            }));
                        }
                        ownKeys.forEach(function(key) {
                            _defineProperty(target, key, source[key]);
                        });
                    }
                    return target;
                }
                function _defineProperty(obj, key, value) {
                    if (key in obj) {
                        Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: true,
                            configurable: true,
                            writable: true
                        });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function _defineProperties(target, props) {
                    for(var i = 0; i < props.length; i++){
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                function _possibleConstructorReturn(self, call) {
                    if (call && (_typeof(call) === "object" || typeof call === "function")) {
                        return call;
                    }
                    return _assertThisInitialized(self);
                }
                function _assertThisInitialized(self) {
                    if (self === void 0) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return self;
                }
                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function");
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                }
                function _wrapNativeSuper(Class) {
                    var _cache = typeof Map === "function" ? new Map() : undefined;
                    _wrapNativeSuper = function _wrapNativeSuper(Class) {
                        if (Class === null || !_isNativeFunction(Class)) return Class;
                        if (typeof Class !== "function") {
                            throw new TypeError("Super expression must either be null or a function");
                        }
                        if (typeof _cache !== "undefined") {
                            if (_cache.has(Class)) return _cache.get(Class);
                            _cache.set(Class, Wrapper);
                        }
                        function Wrapper() {
                            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                        }
                        Wrapper.prototype = Object.create(Class.prototype, {
                            constructor: {
                                value: Wrapper,
                                enumerable: false,
                                writable: true,
                                configurable: true
                            }
                        });
                        return _setPrototypeOf(Wrapper, Class);
                    };
                    return _wrapNativeSuper(Class);
                }
                function isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                function _construct(Parent, args, Class) {
                    if (isNativeReflectConstruct()) {
                        _construct = Reflect.construct;
                    } else {
                        _construct = function _construct(Parent, args, Class) {
                            var a = [
                                null
                            ];
                            a.push.apply(a, args);
                            var Constructor = Function.bind.apply(Parent, a);
                            var instance = new Constructor();
                            if (Class) _setPrototypeOf(instance, Class.prototype);
                            return instance;
                        };
                    }
                    return _construct.apply(null, arguments);
                }
                function _isNativeFunction(fn) {
                    return Function.toString.call(fn).indexOf("[native code]") !== -1;
                }
                function _setPrototypeOf(o, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                        o.__proto__ = p;
                        return o;
                    };
                    return _setPrototypeOf(o, p);
                }
                function _getPrototypeOf(o) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                        return o.__proto__ || Object.getPrototypeOf(o);
                    };
                    return _getPrototypeOf(o);
                }
                function _typeof(obj) {
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }
                var _require = __nested_webpack_require_32028__(3335), inspect = _require.inspect;
                var _require2 = __nested_webpack_require_32028__(7515), ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
                function endsWith(str, search, this_len) {
                    if (this_len === undefined || this_len > str.length) {
                        this_len = str.length;
                    }
                    return str.substring(this_len - search.length, this_len) === search;
                } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
                function repeat(str, count) {
                    count = Math.floor(count);
                    if (str.length == 0 || count == 0) return '';
                    var maxCount = str.length * count;
                    count = Math.floor(Math.log(count) / Math.log(2));
                    while(count){
                        str += str;
                        count--;
                    }
                    str += str.substring(0, maxCount - str.length);
                    return str;
                }
                var blue = '';
                var green = '';
                var red = '';
                var white = '';
                var kReadableOperator = {
                    deepStrictEqual: 'Expected values to be strictly deep-equal:',
                    strictEqual: 'Expected values to be strictly equal:',
                    strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
                    deepEqual: 'Expected values to be loosely deep-equal:',
                    equal: 'Expected values to be loosely equal:',
                    notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
                    notStrictEqual: 'Expected "actual" to be strictly unequal to:',
                    notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
                    notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
                    notEqual: 'Expected "actual" to be loosely unequal to:',
                    notIdentical: 'Values identical but not reference-equal:'
                }; // Comparing short primitives should just show === / !== instead of using the
                // diff.
                var kMaxShortLength = 10;
                function copyError(source) {
                    var keys = Object.keys(source);
                    var target = Object.create(Object.getPrototypeOf(source));
                    keys.forEach(function(key) {
                        target[key] = source[key];
                    });
                    Object.defineProperty(target, 'message', {
                        value: source.message
                    });
                    return target;
                }
                function inspectValue(val) {
                    // The util.inspect default values could be changed. This makes sure the
                    // error messages contain the necessary information nevertheless.
                    return inspect(val, {
                        compact: false,
                        customInspect: false,
                        depth: 1000,
                        maxArrayLength: Infinity,
                        // Assert compares only enumerable properties (with a few exceptions).
                        showHidden: false,
                        // Having a long line as error is better than wrapping the line for
                        // comparison for now.
                        // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
                        // have meta information about the inspected properties (i.e., know where
                        // in what line the property starts and ends).
                        breakLength: Infinity,
                        // Assert does not detect proxies currently.
                        showProxy: false,
                        sorted: true,
                        // Inspect getters as we also check them when comparing entries.
                        getters: true
                    });
                }
                function createErrDiff(actual, expected, operator) {
                    var other = '';
                    var res = '';
                    var lastPos = 0;
                    var end = '';
                    var skipped = false;
                    var actualInspected = inspectValue(actual);
                    var actualLines = actualInspected.split('\n');
                    var expectedLines = inspectValue(expected).split('\n');
                    var i = 0;
                    var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
                    // for the `strictEqual` operator.
                    if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
                        operator = 'strictEqualObject';
                    } // If "actual" and "expected" fit on a single line and they are not strictly
                    // equal, check further special handling.
                    if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
                        var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
                        // kMaxShortLength and if neither is an object and at least one of them is
                        // not `zero`, use the strict equal comparison to visualize the output.
                        if (inputLength <= kMaxShortLength) {
                            if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
                                // -0 === +0
                                return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
                            }
                        } else if (operator !== 'strictEqualObject') {
                            // If the stderr is a tty and the input length is lower than the current
                            // columns per line, add a mismatch indicator below the output. If it is
                            // not a tty, use a default value of 80 characters.
                            var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
                            if (inputLength < maxLength) {
                                while(actualLines[0][i] === expectedLines[0][i]){
                                    i++;
                                } // Ignore the first characters.
                                if (i > 2) {
                                    // Add position indicator for the first mismatch in case it is a
                                    // single line and the input length is less than the column length.
                                    indicator = "\n  ".concat(repeat(' ', i), "^");
                                    i = 0;
                                }
                            }
                        }
                    } // Remove all ending lines that match (this optimizes the output for
                    // readability by reducing the number of total changed lines).
                    var a = actualLines[actualLines.length - 1];
                    var b = expectedLines[expectedLines.length - 1];
                    while(a === b){
                        if (i++ < 2) {
                            end = "\n  ".concat(a).concat(end);
                        } else {
                            other = a;
                        }
                        actualLines.pop();
                        expectedLines.pop();
                        if (actualLines.length === 0 || expectedLines.length === 0) break;
                        a = actualLines[actualLines.length - 1];
                        b = expectedLines[expectedLines.length - 1];
                    }
                    var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
                    // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
                    if (maxLines === 0) {
                        // We have to get the result again. The lines were all removed before.
                        var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
                        // TODO: Accept env to always show the full error.
                        if (_actualLines.length > 30) {
                            _actualLines[26] = "".concat(blue, "...").concat(white);
                            while(_actualLines.length > 27){
                                _actualLines.pop();
                            }
                        }
                        return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
                    }
                    if (i > 3) {
                        end = "\n".concat(blue, "...").concat(white).concat(end);
                        skipped = true;
                    }
                    if (other !== '') {
                        end = "\n  ".concat(other).concat(end);
                        other = '';
                    }
                    var printedLines = 0;
                    var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
                    var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
                    for(i = 0; i < maxLines; i++){
                        // Only extra expected lines exist
                        var cur = i - lastPos;
                        if (actualLines.length < i + 1) {
                            // If the last diverging line is more than one line above and the
                            // current line is at least line three, add some of the former lines and
                            // also add dots to indicate skipped entries.
                            if (cur > 1 && i > 2) {
                                if (cur > 4) {
                                    res += "\n".concat(blue, "...").concat(white);
                                    skipped = true;
                                } else if (cur > 3) {
                                    res += "\n  ".concat(expectedLines[i - 2]);
                                    printedLines++;
                                }
                                res += "\n  ".concat(expectedLines[i - 1]);
                                printedLines++;
                            } // Mark the current line as the last diverging one.
                            lastPos = i; // Add the expected line to the cache.
                            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
                            printedLines++; // Only extra actual lines exist
                        } else if (expectedLines.length < i + 1) {
                            // If the last diverging line is more than one line above and the
                            // current line is at least line three, add some of the former lines and
                            // also add dots to indicate skipped entries.
                            if (cur > 1 && i > 2) {
                                if (cur > 4) {
                                    res += "\n".concat(blue, "...").concat(white);
                                    skipped = true;
                                } else if (cur > 3) {
                                    res += "\n  ".concat(actualLines[i - 2]);
                                    printedLines++;
                                }
                                res += "\n  ".concat(actualLines[i - 1]);
                                printedLines++;
                            } // Mark the current line as the last diverging one.
                            lastPos = i; // Add the actual line to the result.
                            res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
                            printedLines++; // Lines diverge
                        } else {
                            var expectedLine = expectedLines[i];
                            var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
                            // a trailing comma. In that case it is actually identical and we should
                            // mark it as such.
                            var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
                            // add a comma at the end of the actual line. Otherwise the output could
                            // look weird as in:
                            //
                            //   [
                            //     1         // No comma at the end!
                            // +   2
                            //   ]
                            //
                            if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
                                divergingLines = false;
                                actualLine += ',';
                            }
                            if (divergingLines) {
                                // If the last diverging line is more than one line above and the
                                // current line is at least line three, add some of the former lines and
                                // also add dots to indicate skipped entries.
                                if (cur > 1 && i > 2) {
                                    if (cur > 4) {
                                        res += "\n".concat(blue, "...").concat(white);
                                        skipped = true;
                                    } else if (cur > 3) {
                                        res += "\n  ".concat(actualLines[i - 2]);
                                        printedLines++;
                                    }
                                    res += "\n  ".concat(actualLines[i - 1]);
                                    printedLines++;
                                } // Mark the current line as the last diverging one.
                                lastPos = i; // Add the actual line to the result and cache the expected diverging
                                // line so consecutive diverging lines show up as +++--- and not +-+-+-.
                                res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
                                other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
                                printedLines += 2; // Lines are identical
                            } else {
                                // Add all cached information to the result before adding other things
                                // and reset the cache.
                                res += other;
                                other = ''; // If the last diverging line is exactly one line above or if it is the
                                // very first line, add the line to the result.
                                if (cur === 1 || i === 0) {
                                    res += "\n  ".concat(actualLine);
                                    printedLines++;
                                }
                            }
                        } // Inspected object to big (Show ~20 rows max)
                        if (printedLines > 20 && i < maxLines - 2) {
                            return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
                        }
                    }
                    return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
                }
                var AssertionError = /*#__PURE__*/ function(_Error) {
                    _inherits(AssertionError, _Error);
                    function AssertionError(options) {
                        var _this;
                        _classCallCheck(this, AssertionError);
                        if (_typeof(options) !== 'object' || options === null) {
                            throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
                        }
                        var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
                        var actual = options.actual, expected = options.expected;
                        var limit = Error.stackTraceLimit;
                        Error.stackTraceLimit = 0;
                        if (message != null) {
                            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
                        } else {
                            if (process.stderr && process.stderr.isTTY) {
                                // Reset on each call to make sure we handle dynamically set environment
                                // variables correct.
                                if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
                                    blue = "\x1B[34m";
                                    green = "\x1B[32m";
                                    white = "\x1B[39m";
                                    red = "\x1B[31m";
                                } else {
                                    blue = '';
                                    green = '';
                                    white = '';
                                    red = '';
                                }
                            } // Prevent the error stack from being visible by duplicating the error
                            // in a very close way to the original in case both sides are actually
                            // instances of Error.
                            if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
                                actual = copyError(actual);
                                expected = copyError(expected);
                            }
                            if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
                                _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
                            } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
                                // In case the objects are equal but the operator requires unequal, show
                                // the first object and say A equals B
                                var base = kReadableOperator[operator];
                                var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.
                                if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
                                    base = kReadableOperator.notStrictEqualObject;
                                } // Only remove lines in case it makes sense to collapse those.
                                // TODO: Accept env to always show the full error.
                                if (res.length > 30) {
                                    res[26] = "".concat(blue, "...").concat(white);
                                    while(res.length > 27){
                                        res.pop();
                                    }
                                } // Only print a single input.
                                if (res.length === 1) {
                                    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
                                } else {
                                    _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
                                }
                            } else {
                                var _res = inspectValue(actual);
                                var other = '';
                                var knownOperators = kReadableOperator[operator];
                                if (operator === 'notDeepEqual' || operator === 'notEqual') {
                                    _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
                                    if (_res.length > 1024) {
                                        _res = "".concat(_res.slice(0, 1021), "...");
                                    }
                                } else {
                                    other = "".concat(inspectValue(expected));
                                    if (_res.length > 512) {
                                        _res = "".concat(_res.slice(0, 509), "...");
                                    }
                                    if (other.length > 512) {
                                        other = "".concat(other.slice(0, 509), "...");
                                    }
                                    if (operator === 'deepEqual' || operator === 'equal') {
                                        _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
                                    } else {
                                        other = " ".concat(operator, " ").concat(other);
                                    }
                                }
                                _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
                            }
                        }
                        Error.stackTraceLimit = limit;
                        _this.generatedMessage = !message;
                        Object.defineProperty(_assertThisInitialized(_this), 'name', {
                            value: 'AssertionError [ERR_ASSERTION]',
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                        _this.code = 'ERR_ASSERTION';
                        _this.actual = actual;
                        _this.expected = expected;
                        _this.operator = operator;
                        if (Error.captureStackTrace) {
                            // eslint-disable-next-line no-restricted-syntax
                            Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
                        } // Create error message including the error code in the name.
                        _this.stack; // Reset the name.
                        _this.name = 'AssertionError';
                        return _possibleConstructorReturn(_this);
                    }
                    _createClass(AssertionError, [
                        {
                            key: "toString",
                            value: function toString() {
                                return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
                            }
                        },
                        {
                            key: inspect.custom,
                            value: function value(recurseTimes, ctx) {
                                // This limits the `actual` and `expected` property default inspection to
                                // the minimum depth. Otherwise those values would be too verbose compared
                                // to the actual error message which contains a combined view of these two
                                // input values.
                                return inspect(this, _objectSpread({}, ctx, {
                                    customInspect: false,
                                    depth: 0
                                }));
                            }
                        }
                    ]);
                    return AssertionError;
                }(_wrapNativeSuper(Error));
                module1.exports = AssertionError;
            /***/ },
            /***/ 7515: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_65617__)=>{
                "use strict";
                // Currently in sync with Node.js lib/internal/errors.js
                // https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f
                /* eslint node-core/documented-errors: "error" */ /* eslint node-core/alphabetize-errors: "error" */ /* eslint node-core/prefer-util-format-errors: "error" */ // The whole point behind this internal module is to allow Node.js to no
                // longer be forced to treat every error message change as a semver-major
                // change. The NodeError classes here all expose a `code` property whose
                // value statically and permanently identifies the error. While the error
                // message may change, the code should not.
                function _typeof(obj) {
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function _possibleConstructorReturn(self, call) {
                    if (call && (_typeof(call) === "object" || typeof call === "function")) {
                        return call;
                    }
                    return _assertThisInitialized(self);
                }
                function _assertThisInitialized(self) {
                    if (self === void 0) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return self;
                }
                function _getPrototypeOf(o) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                        return o.__proto__ || Object.getPrototypeOf(o);
                    };
                    return _getPrototypeOf(o);
                }
                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function");
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                }
                function _setPrototypeOf(o, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                        o.__proto__ = p;
                        return o;
                    };
                    return _setPrototypeOf(o, p);
                }
                var codes = {}; // Lazy loaded
                var assert;
                var util;
                function createErrorType(code, message, Base) {
                    if (!Base) {
                        Base = Error;
                    }
                    function getMessage(arg1, arg2, arg3) {
                        if (typeof message === 'string') {
                            return message;
                        } else {
                            return message(arg1, arg2, arg3);
                        }
                    }
                    var NodeError = /*#__PURE__*/ function(_Base) {
                        _inherits(NodeError, _Base);
                        function NodeError(arg1, arg2, arg3) {
                            var _this;
                            _classCallCheck(this, NodeError);
                            _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
                            _this.code = code;
                            return _this;
                        }
                        return NodeError;
                    }(Base);
                    codes[code] = NodeError;
                } // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
                function oneOf(expected, thing) {
                    if (Array.isArray(expected)) {
                        var len = expected.length;
                        expected = expected.map(function(i) {
                            return String(i);
                        });
                        if (len > 2) {
                            return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
                        } else if (len === 2) {
                            return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
                        } else {
                            return "of ".concat(thing, " ").concat(expected[0]);
                        }
                    } else {
                        return "of ".concat(thing, " ").concat(String(expected));
                    }
                } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
                function startsWith(str, search, pos) {
                    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
                } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
                function endsWith(str, search, this_len) {
                    if (this_len === undefined || this_len > str.length) {
                        this_len = str.length;
                    }
                    return str.substring(this_len - search.length, this_len) === search;
                } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                function includes(str, search, start) {
                    if (typeof start !== 'number') {
                        start = 0;
                    }
                    if (start + search.length > str.length) {
                        return false;
                    } else {
                        return str.indexOf(search, start) !== -1;
                    }
                }
                createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
                createErrorType('ERR_INVALID_ARG_TYPE', function(name, expected, actual) {
                    if (assert === undefined) assert = __nested_webpack_require_65617__(1696);
                    assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'
                    var determiner;
                    if (typeof expected === 'string' && startsWith(expected, 'not ')) {
                        determiner = 'must not be';
                        expected = expected.replace(/^not /, '');
                    } else {
                        determiner = 'must be';
                    }
                    var msg;
                    if (endsWith(name, ' argument')) {
                        // For cases like 'first argument'
                        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
                    } else {
                        var type = includes(name, '.') ? 'property' : 'argument';
                        msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
                    } // TODO(BridgeAR): Improve the output by showing `null` and similar.
                    msg += ". Received type ".concat(_typeof(actual));
                    return msg;
                }, TypeError);
                createErrorType('ERR_INVALID_ARG_VALUE', function(name, value) {
                    var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
                    if (util === undefined) util = __nested_webpack_require_65617__(3335);
                    var inspected = util.inspect(value);
                    if (inspected.length > 128) {
                        inspected = "".concat(inspected.slice(0, 128), "...");
                    }
                    return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
                }, TypeError, RangeError);
                createErrorType('ERR_INVALID_RETURN_VALUE', function(input, name, value) {
                    var type;
                    if (value && value.constructor && value.constructor.name) {
                        type = "instance of ".concat(value.constructor.name);
                    } else {
                        type = "type ".concat(_typeof(value));
                    }
                    return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
                }, TypeError);
                createErrorType('ERR_MISSING_ARGS', function() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    if (assert === undefined) assert = __nested_webpack_require_65617__(1696);
                    assert(args.length > 0, 'At least one arg needs to be specified');
                    var msg = 'The ';
                    var len = args.length;
                    args = args.map(function(a) {
                        return "\"".concat(a, "\"");
                    });
                    switch(len){
                        case 1:
                            msg += "".concat(args[0], " argument");
                            break;
                        case 2:
                            msg += "".concat(args[0], " and ").concat(args[1], " arguments");
                            break;
                        default:
                            msg += args.slice(0, len - 1).join(', ');
                            msg += ", and ".concat(args[len - 1], " arguments");
                            break;
                    }
                    return "".concat(msg, " must be specified");
                }, TypeError);
                module1.exports.codes = codes;
            /***/ },
            /***/ 6796: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_76678__)=>{
                "use strict";
                // Currently in sync with Node.js lib/internal/util/comparisons.js
                // https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9
                function _slicedToArray(arr, i) {
                    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
                }
                function _nonIterableRest() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
                function _iterableToArrayLimit(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally{
                        try {
                            if (!_n && _i["return"] != null) _i["return"]();
                        } finally{
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                function _arrayWithHoles(arr) {
                    if (Array.isArray(arr)) return arr;
                }
                function _typeof(obj) {
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }
                var regexFlagsSupported = /a/g.flags !== undefined;
                var arrayFromSet = function arrayFromSet(set) {
                    var array = [];
                    set.forEach(function(value) {
                        return array.push(value);
                    });
                    return array;
                };
                var arrayFromMap = function arrayFromMap(map) {
                    var array = [];
                    map.forEach(function(value, key) {
                        return array.push([
                            key,
                            value
                        ]);
                    });
                    return array;
                };
                var objectIs = Object.is ? Object.is : __nested_webpack_require_76678__(4679);
                var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
                    return [];
                };
                var numberIsNaN = Number.isNaN ? Number.isNaN : __nested_webpack_require_76678__(4782);
                function uncurryThis(f) {
                    return f.call.bind(f);
                }
                var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
                var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
                var objectToString = uncurryThis(Object.prototype.toString);
                var _require$types = __nested_webpack_require_76678__(3335).types, isAnyArrayBuffer = _require$types.isAnyArrayBuffer, isArrayBufferView = _require$types.isArrayBufferView, isDate = _require$types.isDate, isMap = _require$types.isMap, isRegExp = _require$types.isRegExp, isSet = _require$types.isSet, isNativeError = _require$types.isNativeError, isBoxedPrimitive = _require$types.isBoxedPrimitive, isNumberObject = _require$types.isNumberObject, isStringObject = _require$types.isStringObject, isBooleanObject = _require$types.isBooleanObject, isBigIntObject = _require$types.isBigIntObject, isSymbolObject = _require$types.isSymbolObject, isFloat32Array = _require$types.isFloat32Array, isFloat64Array = _require$types.isFloat64Array;
                function isNonIndex(key) {
                    if (key.length === 0 || key.length > 10) return true;
                    for(var i = 0; i < key.length; i++){
                        var code = key.charCodeAt(i);
                        if (code < 48 || code > 57) return true;
                    } // The maximum size for an array is 2 ** 32 -1.
                    return key.length === 10 && key >= Math.pow(2, 32);
                }
                function getOwnNonIndexProperties(value) {
                    return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
                } // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
                // original notice:
                /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */ function compare(a, b) {
                    if (a === b) {
                        return 0;
                    }
                    var x = a.length;
                    var y = b.length;
                    for(var i = 0, len = Math.min(x, y); i < len; ++i){
                        if (a[i] !== b[i]) {
                            x = a[i];
                            y = b[i];
                            break;
                        }
                    }
                    if (x < y) {
                        return -1;
                    }
                    if (y < x) {
                        return 1;
                    }
                    return 0;
                }
                var ONLY_ENUMERABLE = undefined;
                var kStrict = true;
                var kLoose = false;
                var kNoIterator = 0;
                var kIsArray = 1;
                var kIsSet = 2;
                var kIsMap = 3; // Check if they have the same source and flags
                function areSimilarRegExps(a, b) {
                    return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
                }
                function areSimilarFloatArrays(a, b) {
                    if (a.byteLength !== b.byteLength) {
                        return false;
                    }
                    for(var offset = 0; offset < a.byteLength; offset++){
                        if (a[offset] !== b[offset]) {
                            return false;
                        }
                    }
                    return true;
                }
                function areSimilarTypedArrays(a, b) {
                    if (a.byteLength !== b.byteLength) {
                        return false;
                    }
                    return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
                }
                function areEqualArrayBuffers(buf1, buf2) {
                    return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
                }
                function isEqualBoxedPrimitive(val1, val2) {
                    if (isNumberObject(val1)) {
                        return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
                    }
                    if (isStringObject(val1)) {
                        return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
                    }
                    if (isBooleanObject(val1)) {
                        return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
                    }
                    if (isBigIntObject(val1)) {
                        return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
                    }
                    return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
                } // Notes: Type tags are historical [[Class]] properties that can be set by
                // FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
                // and retrieved using Object.prototype.toString.call(obj) in JS
                // See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
                // for a list of tags pre-defined in the spec.
                // There are some unspecified tags in the wild too (e.g. typed array tags).
                // Since tags can be altered, they only serve fast failures
                //
                // Typed arrays and buffers are checked by comparing the content in their
                // underlying ArrayBuffer. This optimization requires that it's
                // reasonable to interpret their underlying memory in the same way,
                // which is checked by comparing their type tags.
                // (e.g. a Uint8Array and a Uint16Array with the same memory content
                // could still be different because they will be interpreted differently).
                //
                // For strict comparison, objects should have
                // a) The same built-in type tags
                // b) The same prototypes.
                function innerDeepEqual(val1, val2, strict, memos) {
                    // All identical values are equivalent, as determined by ===.
                    if (val1 === val2) {
                        if (val1 !== 0) return true;
                        return strict ? objectIs(val1, val2) : true;
                    } // Check more closely if val1 and val2 are equal.
                    if (strict) {
                        if (_typeof(val1) !== 'object') {
                            return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
                        }
                        if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
                            return false;
                        }
                        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
                            return false;
                        }
                    } else {
                        if (val1 === null || _typeof(val1) !== 'object') {
                            if (val2 === null || _typeof(val2) !== 'object') {
                                // eslint-disable-next-line eqeqeq
                                return val1 == val2;
                            }
                            return false;
                        }
                        if (val2 === null || _typeof(val2) !== 'object') {
                            return false;
                        }
                    }
                    var val1Tag = objectToString(val1);
                    var val2Tag = objectToString(val2);
                    if (val1Tag !== val2Tag) {
                        return false;
                    }
                    if (Array.isArray(val1)) {
                        // Check for sparse arrays and general fast path
                        if (val1.length !== val2.length) {
                            return false;
                        }
                        var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
                        var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
                        if (keys1.length !== keys2.length) {
                            return false;
                        }
                        return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
                    } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
                    // wan't to early return out of the rest of the checks. However we can check
                    // if the second value is one of these values and the first isn't.
                    if (val1Tag === '[object Object]') {
                        // return keyCheck(val1, val2, strict, memos, kNoIterator);
                        if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
                            return false;
                        }
                    }
                    if (isDate(val1)) {
                        if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
                            return false;
                        }
                    } else if (isRegExp(val1)) {
                        if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
                            return false;
                        }
                    } else if (isNativeError(val1) || val1 instanceof Error) {
                        // Do not compare the stack as it might differ even though the error itself
                        // is otherwise identical.
                        if (val1.message !== val2.message || val1.name !== val2.name) {
                            return false;
                        }
                    } else if (isArrayBufferView(val1)) {
                        if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
                            if (!areSimilarFloatArrays(val1, val2)) {
                                return false;
                            }
                        } else if (!areSimilarTypedArrays(val1, val2)) {
                            return false;
                        } // Buffer.compare returns true, so val1.length === val2.length. If they both
                        // only contain numeric keys, we don't need to exam further than checking
                        // the symbols.
                        var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
                        var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
                        if (_keys.length !== _keys2.length) {
                            return false;
                        }
                        return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
                    } else if (isSet(val1)) {
                        if (!isSet(val2) || val1.size !== val2.size) {
                            return false;
                        }
                        return keyCheck(val1, val2, strict, memos, kIsSet);
                    } else if (isMap(val1)) {
                        if (!isMap(val2) || val1.size !== val2.size) {
                            return false;
                        }
                        return keyCheck(val1, val2, strict, memos, kIsMap);
                    } else if (isAnyArrayBuffer(val1)) {
                        if (!areEqualArrayBuffers(val1, val2)) {
                            return false;
                        }
                    } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
                        return false;
                    }
                    return keyCheck(val1, val2, strict, memos, kNoIterator);
                }
                function getEnumerables(val, keys) {
                    return keys.filter(function(k) {
                        return propertyIsEnumerable(val, k);
                    });
                }
                function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
                    // For all remaining Object pairs, including Array, objects and Maps,
                    // equivalence is determined by having:
                    // a) The same number of owned enumerable properties
                    // b) The same set of keys/indexes (although not necessarily the same order)
                    // c) Equivalent values for every corresponding key/index
                    // d) For Sets and Maps, equal contents
                    // Note: this accounts for both named and indexed properties on Arrays.
                    if (arguments.length === 5) {
                        aKeys = Object.keys(val1);
                        var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.
                        if (aKeys.length !== bKeys.length) {
                            return false;
                        }
                    } // Cheap key test
                    var i = 0;
                    for(; i < aKeys.length; i++){
                        if (!hasOwnProperty(val2, aKeys[i])) {
                            return false;
                        }
                    }
                    if (strict && arguments.length === 5) {
                        var symbolKeysA = objectGetOwnPropertySymbols(val1);
                        if (symbolKeysA.length !== 0) {
                            var count = 0;
                            for(i = 0; i < symbolKeysA.length; i++){
                                var key = symbolKeysA[i];
                                if (propertyIsEnumerable(val1, key)) {
                                    if (!propertyIsEnumerable(val2, key)) {
                                        return false;
                                    }
                                    aKeys.push(key);
                                    count++;
                                } else if (propertyIsEnumerable(val2, key)) {
                                    return false;
                                }
                            }
                            var symbolKeysB = objectGetOwnPropertySymbols(val2);
                            if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
                                return false;
                            }
                        } else {
                            var _symbolKeysB = objectGetOwnPropertySymbols(val2);
                            if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
                                return false;
                            }
                        }
                    }
                    if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
                        return true;
                    } // Use memos to handle cycles.
                    if (memos === undefined) {
                        memos = {
                            val1: new Map(),
                            val2: new Map(),
                            position: 0
                        };
                    } else {
                        // We prevent up to two map.has(x) calls by directly retrieving the value
                        // and checking for undefined. The map can only contain numbers, so it is
                        // safe to check for undefined only.
                        var val2MemoA = memos.val1.get(val1);
                        if (val2MemoA !== undefined) {
                            var val2MemoB = memos.val2.get(val2);
                            if (val2MemoB !== undefined) {
                                return val2MemoA === val2MemoB;
                            }
                        }
                        memos.position++;
                    }
                    memos.val1.set(val1, memos.position);
                    memos.val2.set(val2, memos.position);
                    var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
                    memos.val1.delete(val1);
                    memos.val2.delete(val2);
                    return areEq;
                }
                function setHasEqualElement(set, val1, strict, memo) {
                    // Go looking.
                    var setValues = arrayFromSet(set);
                    for(var i = 0; i < setValues.length; i++){
                        var val2 = setValues[i];
                        if (innerDeepEqual(val1, val2, strict, memo)) {
                            // Remove the matching element to make sure we do not check that again.
                            set.delete(val2);
                            return true;
                        }
                    }
                    return false;
                } // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
                // Sadly it is not possible to detect corresponding values properly in case the
                // type is a string, number, bigint or boolean. The reason is that those values
                // can match lots of different string values (e.g., 1n == '+00001').
                function findLooseMatchingPrimitives(prim) {
                    switch(_typeof(prim)){
                        case 'undefined':
                            return null;
                        case 'object':
                            // Only pass in null as object!
                            return undefined;
                        case 'symbol':
                            return false;
                        case 'string':
                            prim = +prim;
                        // Loose equal entries exist only if the string is possible to convert to
                        // a regular number and not NaN.
                        // Fall through
                        case 'number':
                            if (numberIsNaN(prim)) {
                                return false;
                            }
                    }
                    return true;
                }
                function setMightHaveLoosePrim(a, b, prim) {
                    var altValue = findLooseMatchingPrimitives(prim);
                    if (altValue != null) return altValue;
                    return b.has(altValue) && !a.has(altValue);
                }
                function mapMightHaveLoosePrim(a, b, prim, item, memo) {
                    var altValue = findLooseMatchingPrimitives(prim);
                    if (altValue != null) {
                        return altValue;
                    }
                    var curB = b.get(altValue);
                    if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
                        return false;
                    }
                    return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
                }
                function setEquiv(a, b, strict, memo) {
                    // This is a lazily initiated Set of entries which have to be compared
                    // pairwise.
                    var set = null;
                    var aValues = arrayFromSet(a);
                    for(var i = 0; i < aValues.length; i++){
                        var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
                        // heavy sets but it is a minor slow down for primitives. As they are fast
                        // to check this improves the worst case scenario instead.
                        if (_typeof(val) === 'object' && val !== null) {
                            if (set === null) {
                                set = new Set();
                            } // If the specified value doesn't exist in the second set its an not null
                            // object (or non strict only: a not matching primitive) we'll need to go
                            // hunting for something thats deep-(strict-)equal to it. To make this
                            // O(n log n) complexity we have to copy these values in a new set first.
                            set.add(val);
                        } else if (!b.has(val)) {
                            if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.
                            if (!setMightHaveLoosePrim(a, b, val)) {
                                return false;
                            }
                            if (set === null) {
                                set = new Set();
                            }
                            set.add(val);
                        }
                    }
                    if (set !== null) {
                        var bValues = arrayFromSet(b);
                        for(var _i = 0; _i < bValues.length; _i++){
                            var _val = bValues[_i]; // We have to check if a primitive value is already
                            // matching and only if it's not, go hunting for it.
                            if (_typeof(_val) === 'object' && _val !== null) {
                                if (!setHasEqualElement(set, _val, strict, memo)) return false;
                            } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
                                return false;
                            }
                        }
                        return set.size === 0;
                    }
                    return true;
                }
                function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
                    // To be able to handle cases like:
                    //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
                    // ... we need to consider *all* matching keys, not just the first we find.
                    var setValues = arrayFromSet(set);
                    for(var i = 0; i < setValues.length; i++){
                        var key2 = setValues[i];
                        if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
                            set.delete(key2);
                            return true;
                        }
                    }
                    return false;
                }
                function mapEquiv(a, b, strict, memo) {
                    var set = null;
                    var aEntries = arrayFromMap(a);
                    for(var i = 0; i < aEntries.length; i++){
                        var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
                        if (_typeof(key) === 'object' && key !== null) {
                            if (set === null) {
                                set = new Set();
                            }
                            set.add(key);
                        } else {
                            // By directly retrieving the value we prevent another b.has(key) check in
                            // almost all possible cases.
                            var item2 = b.get(key);
                            if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
                                if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
                                // keys.
                                if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
                                if (set === null) {
                                    set = new Set();
                                }
                                set.add(key);
                            }
                        }
                    }
                    if (set !== null) {
                        var bEntries = arrayFromMap(b);
                        for(var _i2 = 0; _i2 < bEntries.length; _i2++){
                            var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), key = _bEntries$_i[0], item = _bEntries$_i[1];
                            if (_typeof(key) === 'object' && key !== null) {
                                if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
                            } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
                                return false;
                            }
                        }
                        return set.size === 0;
                    }
                    return true;
                }
                function objEquiv(a, b, strict, keys, memos, iterationType) {
                    // Sets and maps don't have their entries accessible via normal object
                    // properties.
                    var i = 0;
                    if (iterationType === kIsSet) {
                        if (!setEquiv(a, b, strict, memos)) {
                            return false;
                        }
                    } else if (iterationType === kIsMap) {
                        if (!mapEquiv(a, b, strict, memos)) {
                            return false;
                        }
                    } else if (iterationType === kIsArray) {
                        for(; i < a.length; i++){
                            if (hasOwnProperty(a, i)) {
                                if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
                                    return false;
                                }
                            } else if (hasOwnProperty(b, i)) {
                                return false;
                            } else {
                                // Array is sparse.
                                var keysA = Object.keys(a);
                                for(; i < keysA.length; i++){
                                    var key = keysA[i];
                                    if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
                                        return false;
                                    }
                                }
                                if (keysA.length !== Object.keys(b).length) {
                                    return false;
                                }
                                return true;
                            }
                        }
                    } // The pair must have equivalent values for every corresponding key.
                    // Possibly expensive deep test:
                    for(i = 0; i < keys.length; i++){
                        var _key = keys[i];
                        if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
                            return false;
                        }
                    }
                    return true;
                }
                function isDeepEqual(val1, val2) {
                    return innerDeepEqual(val1, val2, kLoose);
                }
                function isDeepStrictEqual(val1, val2) {
                    return innerDeepEqual(val1, val2, kStrict);
                }
                module1.exports = {
                    isDeepEqual: isDeepEqual,
                    isDeepStrictEqual: isDeepStrictEqual
                };
            /***/ },
            /***/ 2680: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_108232__)=>{
                "use strict";
                var GetIntrinsic = __nested_webpack_require_108232__(7286);
                var callBind = __nested_webpack_require_108232__(9429);
                var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));
                module1.exports = function callBoundIntrinsic(name, allowMissing) {
                    var intrinsic = GetIntrinsic(name, !!allowMissing);
                    if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
                        return callBind(intrinsic);
                    }
                    return intrinsic;
                };
            /***/ },
            /***/ 9429: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_108960__)=>{
                "use strict";
                var bind = __nested_webpack_require_108960__(4090);
                var GetIntrinsic = __nested_webpack_require_108960__(7286);
                var $apply = GetIntrinsic('%Function.prototype.apply%');
                var $call = GetIntrinsic('%Function.prototype.call%');
                var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);
                var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
                var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
                var $max = GetIntrinsic('%Math.max%');
                if ($defineProperty) {
                    try {
                        $defineProperty({}, 'a', {
                            value: 1
                        });
                    } catch (e) {
                        // IE 8 has a broken defineProperty
                        $defineProperty = null;
                    }
                }
                module1.exports = function callBind(originalFunction) {
                    var func = $reflectApply(bind, $call, arguments);
                    if ($gOPD && $defineProperty) {
                        var desc = $gOPD(func, 'length');
                        if (desc.configurable) {
                            // original length, plus the receiver, minus any additional arguments (after the receiver)
                            $defineProperty(func, 'length', {
                                value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
                            });
                        }
                    }
                    return func;
                };
                var applyBind = function applyBind() {
                    return $reflectApply(bind, $apply, arguments);
                };
                if ($defineProperty) {
                    $defineProperty(module1.exports, 'apply', {
                        value: applyBind
                    });
                } else {
                    module1.exports.apply = applyBind;
                }
            /***/ },
            /***/ 3716: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_111174__)=>{
                /*global window, global*/ var util = __nested_webpack_require_111174__(3335);
                var assert = __nested_webpack_require_111174__(1696);
                function now() {
                    return new Date().getTime();
                }
                var slice = Array.prototype.slice;
                var console;
                var times = {};
                if (typeof __nested_webpack_require_111174__.g !== "undefined" && __nested_webpack_require_111174__.g.console) {
                    console = __nested_webpack_require_111174__.g.console;
                } else if (typeof window !== "undefined" && window.console) {
                    console = window.console;
                } else {
                    console = {};
                }
                var functions = [
                    [
                        log,
                        "log"
                    ],
                    [
                        info,
                        "info"
                    ],
                    [
                        warn,
                        "warn"
                    ],
                    [
                        error,
                        "error"
                    ],
                    [
                        time,
                        "time"
                    ],
                    [
                        timeEnd,
                        "timeEnd"
                    ],
                    [
                        trace,
                        "trace"
                    ],
                    [
                        dir,
                        "dir"
                    ],
                    [
                        consoleAssert,
                        "assert"
                    ]
                ];
                for(var i = 0; i < functions.length; i++){
                    var tuple = functions[i];
                    var f = tuple[0];
                    var name = tuple[1];
                    if (!console[name]) {
                        console[name] = f;
                    }
                }
                module1.exports = console;
                function log() {}
                function info() {
                    console.log.apply(console, arguments);
                }
                function warn() {
                    console.log.apply(console, arguments);
                }
                function error() {
                    console.warn.apply(console, arguments);
                }
                function time(label) {
                    times[label] = now();
                }
                function timeEnd(label) {
                    var time = times[label];
                    if (!time) {
                        throw new Error("No such label: " + label);
                    }
                    delete times[label];
                    var duration = now() - time;
                    console.log(label + ": " + duration + "ms");
                }
                function trace() {
                    var err = new Error();
                    err.name = "Trace";
                    err.message = util.format.apply(null, arguments);
                    console.error(err.stack);
                }
                function dir(object) {
                    console.log(util.inspect(object) + "\n");
                }
                function consoleAssert(expression) {
                    if (!expression) {
                        var arr = slice.call(arguments, 1);
                        assert.ok(false, util.format.apply(null, arr));
                    }
                }
            /***/ },
            /***/ 4926: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_114857__)=>{
                "use strict";
                var keys = __nested_webpack_require_114857__(3464);
                var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
                var toStr = Object.prototype.toString;
                var concat = Array.prototype.concat;
                var origDefineProperty = Object.defineProperty;
                var isFunction = function(fn) {
                    return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
                };
                var hasPropertyDescriptors = __nested_webpack_require_114857__(1181)();
                var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;
                var defineProperty = function(object, name, value, predicate) {
                    if (name in object) {
                        if (predicate === true) {
                            if (object[name] === value) {
                                return;
                            }
                        } else if (!isFunction(predicate) || !predicate()) {
                            return;
                        }
                    }
                    if (supportsDescriptors) {
                        origDefineProperty(object, name, {
                            configurable: true,
                            enumerable: false,
                            value: value,
                            writable: true
                        });
                    } else {
                        object[name] = value; // eslint-disable-line no-param-reassign
                    }
                };
                var defineProperties = function(object, map) {
                    var predicates = arguments.length > 2 ? arguments[2] : {};
                    var props = keys(map);
                    if (hasSymbols) {
                        props = concat.call(props, Object.getOwnPropertySymbols(map));
                    }
                    for(var i = 0; i < props.length; i += 1){
                        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
                    }
                };
                defineProperties.supportsDescriptors = !!supportsDescriptors;
                module1.exports = defineProperties;
            /***/ },
            /***/ 4956: /***/ (module1)=>{
                "use strict";
                /**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */ function assign(target, firstSource) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert first argument to object');
                    }
                    var to = Object(target);
                    for(var i = 1; i < arguments.length; i++){
                        var nextSource = arguments[i];
                        if (nextSource === undefined || nextSource === null) {
                            continue;
                        }
                        var keysArray = Object.keys(Object(nextSource));
                        for(var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++){
                            var nextKey = keysArray[nextIndex];
                            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                            if (desc !== undefined && desc.enumerable) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                    return to;
                }
                function polyfill() {
                    if (!Object.assign) {
                        Object.defineProperty(Object, 'assign', {
                            enumerable: false,
                            configurable: true,
                            writable: true,
                            value: assign
                        });
                    }
                }
                module1.exports = {
                    assign: assign,
                    polyfill: polyfill
                };
            /***/ },
            /***/ 3243: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_119153__)=>{
                "use strict";
                var isCallable = __nested_webpack_require_119153__(9680);
                var toStr = Object.prototype.toString;
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var forEachArray = function forEachArray(array, iterator, receiver) {
                    for(var i = 0, len = array.length; i < len; i++){
                        if (hasOwnProperty.call(array, i)) {
                            if (receiver == null) {
                                iterator(array[i], i, array);
                            } else {
                                iterator.call(receiver, array[i], i, array);
                            }
                        }
                    }
                };
                var forEachString = function forEachString(string, iterator, receiver) {
                    for(var i = 0, len = string.length; i < len; i++){
                        // no such thing as a sparse string.
                        if (receiver == null) {
                            iterator(string.charAt(i), i, string);
                        } else {
                            iterator.call(receiver, string.charAt(i), i, string);
                        }
                    }
                };
                var forEachObject = function forEachObject(object, iterator, receiver) {
                    for(var k in object){
                        if (hasOwnProperty.call(object, k)) {
                            if (receiver == null) {
                                iterator(object[k], k, object);
                            } else {
                                iterator.call(receiver, object[k], k, object);
                            }
                        }
                    }
                };
                var forEach = function forEach(list, iterator, thisArg) {
                    if (!isCallable(iterator)) {
                        throw new TypeError('iterator must be a function');
                    }
                    var receiver;
                    if (arguments.length >= 3) {
                        receiver = thisArg;
                    }
                    if (toStr.call(list) === '[object Array]') {
                        forEachArray(list, iterator, receiver);
                    } else if (typeof list === 'string') {
                        forEachString(list, iterator, receiver);
                    } else {
                        forEachObject(list, iterator, receiver);
                    }
                };
                module1.exports = forEach;
            /***/ },
            /***/ 7795: /***/ (module1)=>{
                "use strict";
                /* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
                var slice = Array.prototype.slice;
                var toStr = Object.prototype.toString;
                var funcType = '[object Function]';
                module1.exports = function bind(that) {
                    var target = this;
                    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
                        throw new TypeError(ERROR_MESSAGE + target);
                    }
                    var args = slice.call(arguments, 1);
                    var bound;
                    var binder = function() {
                        if (this instanceof bound) {
                            var result = target.apply(this, args.concat(slice.call(arguments)));
                            if (Object(result) === result) {
                                return result;
                            }
                            return this;
                        } else {
                            return target.apply(that, args.concat(slice.call(arguments)));
                        }
                    };
                    var boundLength = Math.max(0, target.length - args.length);
                    var boundArgs = [];
                    for(var i = 0; i < boundLength; i++){
                        boundArgs.push('$' + i);
                    }
                    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
                    if (target.prototype) {
                        var Empty = function Empty() {};
                        Empty.prototype = target.prototype;
                        bound.prototype = new Empty();
                        Empty.prototype = null;
                    }
                    return bound;
                };
            /***/ },
            /***/ 4090: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_123879__)=>{
                "use strict";
                var implementation = __nested_webpack_require_123879__(7795);
                module1.exports = Function.prototype.bind || implementation;
            /***/ },
            /***/ 7286: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_124161__)=>{
                "use strict";
                var undefined1;
                var $SyntaxError = SyntaxError;
                var $Function = Function;
                var $TypeError = TypeError;
                // eslint-disable-next-line consistent-return
                var getEvalledConstructor = function(expressionSyntax) {
                    try {
                        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
                    } catch (e) {}
                };
                var $gOPD = Object.getOwnPropertyDescriptor;
                if ($gOPD) {
                    try {
                        $gOPD({}, '');
                    } catch (e) {
                        $gOPD = null; // this is IE 8, which has a broken gOPD
                    }
                }
                var throwTypeError = function() {
                    throw new $TypeError();
                };
                var ThrowTypeError = $gOPD ? function() {
                    try {
                        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
                        arguments.callee; // IE 8 does not throw here
                        return throwTypeError;
                    } catch (calleeThrows) {
                        try {
                            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
                            return $gOPD(arguments, 'callee').get;
                        } catch (gOPDthrows) {
                            return throwTypeError;
                        }
                    }
                }() : throwTypeError;
                var hasSymbols = __nested_webpack_require_124161__(2636)();
                var hasProto = __nested_webpack_require_124161__(8486)();
                var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
                    return x.__proto__;
                } // eslint-disable-line no-proto
                 : null);
                var needsEval = {};
                var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined1 : getProto(Uint8Array);
                var INTRINSICS = {
                    '%AggregateError%': typeof AggregateError === 'undefined' ? undefined1 : AggregateError,
                    '%Array%': Array,
                    '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined1 : ArrayBuffer,
                    '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined1,
                    '%AsyncFromSyncIteratorPrototype%': undefined1,
                    '%AsyncFunction%': needsEval,
                    '%AsyncGenerator%': needsEval,
                    '%AsyncGeneratorFunction%': needsEval,
                    '%AsyncIteratorPrototype%': needsEval,
                    '%Atomics%': typeof Atomics === 'undefined' ? undefined1 : Atomics,
                    '%BigInt%': typeof BigInt === 'undefined' ? undefined1 : BigInt,
                    '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined1 : BigInt64Array,
                    '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined1 : BigUint64Array,
                    '%Boolean%': Boolean,
                    '%DataView%': typeof DataView === 'undefined' ? undefined1 : DataView,
                    '%Date%': Date,
                    '%decodeURI%': decodeURI,
                    '%decodeURIComponent%': decodeURIComponent,
                    '%encodeURI%': encodeURI,
                    '%encodeURIComponent%': encodeURIComponent,
                    '%Error%': Error,
                    '%eval%': eval,
                    '%EvalError%': EvalError,
                    '%Float32Array%': typeof Float32Array === 'undefined' ? undefined1 : Float32Array,
                    '%Float64Array%': typeof Float64Array === 'undefined' ? undefined1 : Float64Array,
                    '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined1 : FinalizationRegistry,
                    '%Function%': $Function,
                    '%GeneratorFunction%': needsEval,
                    '%Int8Array%': typeof Int8Array === 'undefined' ? undefined1 : Int8Array,
                    '%Int16Array%': typeof Int16Array === 'undefined' ? undefined1 : Int16Array,
                    '%Int32Array%': typeof Int32Array === 'undefined' ? undefined1 : Int32Array,
                    '%isFinite%': isFinite,
                    '%isNaN%': isNaN,
                    '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined1,
                    '%JSON%': typeof JSON === 'object' ? JSON : undefined1,
                    '%Map%': typeof Map === 'undefined' ? undefined1 : Map,
                    '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined1 : getProto(new Map()[Symbol.iterator]()),
                    '%Math%': Math,
                    '%Number%': Number,
                    '%Object%': Object,
                    '%parseFloat%': parseFloat,
                    '%parseInt%': parseInt,
                    '%Promise%': typeof Promise === 'undefined' ? undefined1 : Promise,
                    '%Proxy%': typeof Proxy === 'undefined' ? undefined1 : Proxy,
                    '%RangeError%': RangeError,
                    '%ReferenceError%': ReferenceError,
                    '%Reflect%': typeof Reflect === 'undefined' ? undefined1 : Reflect,
                    '%RegExp%': RegExp,
                    '%Set%': typeof Set === 'undefined' ? undefined1 : Set,
                    '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined1 : getProto(new Set()[Symbol.iterator]()),
                    '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined1 : SharedArrayBuffer,
                    '%String%': String,
                    '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined1,
                    '%Symbol%': hasSymbols ? Symbol : undefined1,
                    '%SyntaxError%': $SyntaxError,
                    '%ThrowTypeError%': ThrowTypeError,
                    '%TypedArray%': TypedArray,
                    '%TypeError%': $TypeError,
                    '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined1 : Uint8Array,
                    '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined1 : Uint8ClampedArray,
                    '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined1 : Uint16Array,
                    '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined1 : Uint32Array,
                    '%URIError%': URIError,
                    '%WeakMap%': typeof WeakMap === 'undefined' ? undefined1 : WeakMap,
                    '%WeakRef%': typeof WeakRef === 'undefined' ? undefined1 : WeakRef,
                    '%WeakSet%': typeof WeakSet === 'undefined' ? undefined1 : WeakSet
                };
                if (getProto) {
                    try {
                        null.error; // eslint-disable-line no-unused-expressions
                    } catch (e) {
                        // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
                        var errorProto = getProto(getProto(e));
                        INTRINSICS['%Error.prototype%'] = errorProto;
                    }
                }
                var doEval = function doEval(name) {
                    var value;
                    if (name === '%AsyncFunction%') {
                        value = getEvalledConstructor('async function () {}');
                    } else if (name === '%GeneratorFunction%') {
                        value = getEvalledConstructor('function* () {}');
                    } else if (name === '%AsyncGeneratorFunction%') {
                        value = getEvalledConstructor('async function* () {}');
                    } else if (name === '%AsyncGenerator%') {
                        var fn = doEval('%AsyncGeneratorFunction%');
                        if (fn) {
                            value = fn.prototype;
                        }
                    } else if (name === '%AsyncIteratorPrototype%') {
                        var gen = doEval('%AsyncGenerator%');
                        if (gen && getProto) {
                            value = getProto(gen.prototype);
                        }
                    }
                    INTRINSICS[name] = value;
                    return value;
                };
                var LEGACY_ALIASES = {
                    '%ArrayBufferPrototype%': [
                        'ArrayBuffer',
                        'prototype'
                    ],
                    '%ArrayPrototype%': [
                        'Array',
                        'prototype'
                    ],
                    '%ArrayProto_entries%': [
                        'Array',
                        'prototype',
                        'entries'
                    ],
                    '%ArrayProto_forEach%': [
                        'Array',
                        'prototype',
                        'forEach'
                    ],
                    '%ArrayProto_keys%': [
                        'Array',
                        'prototype',
                        'keys'
                    ],
                    '%ArrayProto_values%': [
                        'Array',
                        'prototype',
                        'values'
                    ],
                    '%AsyncFunctionPrototype%': [
                        'AsyncFunction',
                        'prototype'
                    ],
                    '%AsyncGenerator%': [
                        'AsyncGeneratorFunction',
                        'prototype'
                    ],
                    '%AsyncGeneratorPrototype%': [
                        'AsyncGeneratorFunction',
                        'prototype',
                        'prototype'
                    ],
                    '%BooleanPrototype%': [
                        'Boolean',
                        'prototype'
                    ],
                    '%DataViewPrototype%': [
                        'DataView',
                        'prototype'
                    ],
                    '%DatePrototype%': [
                        'Date',
                        'prototype'
                    ],
                    '%ErrorPrototype%': [
                        'Error',
                        'prototype'
                    ],
                    '%EvalErrorPrototype%': [
                        'EvalError',
                        'prototype'
                    ],
                    '%Float32ArrayPrototype%': [
                        'Float32Array',
                        'prototype'
                    ],
                    '%Float64ArrayPrototype%': [
                        'Float64Array',
                        'prototype'
                    ],
                    '%FunctionPrototype%': [
                        'Function',
                        'prototype'
                    ],
                    '%Generator%': [
                        'GeneratorFunction',
                        'prototype'
                    ],
                    '%GeneratorPrototype%': [
                        'GeneratorFunction',
                        'prototype',
                        'prototype'
                    ],
                    '%Int8ArrayPrototype%': [
                        'Int8Array',
                        'prototype'
                    ],
                    '%Int16ArrayPrototype%': [
                        'Int16Array',
                        'prototype'
                    ],
                    '%Int32ArrayPrototype%': [
                        'Int32Array',
                        'prototype'
                    ],
                    '%JSONParse%': [
                        'JSON',
                        'parse'
                    ],
                    '%JSONStringify%': [
                        'JSON',
                        'stringify'
                    ],
                    '%MapPrototype%': [
                        'Map',
                        'prototype'
                    ],
                    '%NumberPrototype%': [
                        'Number',
                        'prototype'
                    ],
                    '%ObjectPrototype%': [
                        'Object',
                        'prototype'
                    ],
                    '%ObjProto_toString%': [
                        'Object',
                        'prototype',
                        'toString'
                    ],
                    '%ObjProto_valueOf%': [
                        'Object',
                        'prototype',
                        'valueOf'
                    ],
                    '%PromisePrototype%': [
                        'Promise',
                        'prototype'
                    ],
                    '%PromiseProto_then%': [
                        'Promise',
                        'prototype',
                        'then'
                    ],
                    '%Promise_all%': [
                        'Promise',
                        'all'
                    ],
                    '%Promise_reject%': [
                        'Promise',
                        'reject'
                    ],
                    '%Promise_resolve%': [
                        'Promise',
                        'resolve'
                    ],
                    '%RangeErrorPrototype%': [
                        'RangeError',
                        'prototype'
                    ],
                    '%ReferenceErrorPrototype%': [
                        'ReferenceError',
                        'prototype'
                    ],
                    '%RegExpPrototype%': [
                        'RegExp',
                        'prototype'
                    ],
                    '%SetPrototype%': [
                        'Set',
                        'prototype'
                    ],
                    '%SharedArrayBufferPrototype%': [
                        'SharedArrayBuffer',
                        'prototype'
                    ],
                    '%StringPrototype%': [
                        'String',
                        'prototype'
                    ],
                    '%SymbolPrototype%': [
                        'Symbol',
                        'prototype'
                    ],
                    '%SyntaxErrorPrototype%': [
                        'SyntaxError',
                        'prototype'
                    ],
                    '%TypedArrayPrototype%': [
                        'TypedArray',
                        'prototype'
                    ],
                    '%TypeErrorPrototype%': [
                        'TypeError',
                        'prototype'
                    ],
                    '%Uint8ArrayPrototype%': [
                        'Uint8Array',
                        'prototype'
                    ],
                    '%Uint8ClampedArrayPrototype%': [
                        'Uint8ClampedArray',
                        'prototype'
                    ],
                    '%Uint16ArrayPrototype%': [
                        'Uint16Array',
                        'prototype'
                    ],
                    '%Uint32ArrayPrototype%': [
                        'Uint32Array',
                        'prototype'
                    ],
                    '%URIErrorPrototype%': [
                        'URIError',
                        'prototype'
                    ],
                    '%WeakMapPrototype%': [
                        'WeakMap',
                        'prototype'
                    ],
                    '%WeakSetPrototype%': [
                        'WeakSet',
                        'prototype'
                    ]
                };
                var bind = __nested_webpack_require_124161__(4090);
                var hasOwn = __nested_webpack_require_124161__(3198);
                var $concat = bind.call(Function.call, Array.prototype.concat);
                var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
                var $replace = bind.call(Function.call, String.prototype.replace);
                var $strSlice = bind.call(Function.call, String.prototype.slice);
                var $exec = bind.call(Function.call, RegExp.prototype.exec);
                /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
                var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
                var stringToPath = function stringToPath(string) {
                    var first = $strSlice(string, 0, 1);
                    var last = $strSlice(string, -1);
                    if (first === '%' && last !== '%') {
                        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
                    } else if (last === '%' && first !== '%') {
                        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
                    }
                    var result = [];
                    $replace(string, rePropName, function(match, number, quote, subString) {
                        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
                    });
                    return result;
                };
                /* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
                    var intrinsicName = name;
                    var alias;
                    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
                        alias = LEGACY_ALIASES[intrinsicName];
                        intrinsicName = '%' + alias[0] + '%';
                    }
                    if (hasOwn(INTRINSICS, intrinsicName)) {
                        var value = INTRINSICS[intrinsicName];
                        if (value === needsEval) {
                            value = doEval(intrinsicName);
                        }
                        if (typeof value === 'undefined' && !allowMissing) {
                            throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
                        }
                        return {
                            alias: alias,
                            name: intrinsicName,
                            value: value
                        };
                    }
                    throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
                };
                module1.exports = function GetIntrinsic(name, allowMissing) {
                    if (typeof name !== 'string' || name.length === 0) {
                        throw new $TypeError('intrinsic name must be a non-empty string');
                    }
                    if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
                        throw new $TypeError('"allowMissing" argument must be a boolean');
                    }
                    if ($exec(/^%?[^%]*%?$/, name) === null) {
                        throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
                    }
                    var parts = stringToPath(name);
                    var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
                    var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
                    var intrinsicRealName = intrinsic.name;
                    var value = intrinsic.value;
                    var skipFurtherCaching = false;
                    var alias = intrinsic.alias;
                    if (alias) {
                        intrinsicBaseName = alias[0];
                        $spliceApply(parts, $concat([
                            0,
                            1
                        ], alias));
                    }
                    for(var i = 1, isOwn = true; i < parts.length; i += 1){
                        var part = parts[i];
                        var first = $strSlice(part, 0, 1);
                        var last = $strSlice(part, -1);
                        if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
                            throw new $SyntaxError('property names with quotes must have matching quotes');
                        }
                        if (part === 'constructor' || !isOwn) {
                            skipFurtherCaching = true;
                        }
                        intrinsicBaseName += '.' + part;
                        intrinsicRealName = '%' + intrinsicBaseName + '%';
                        if (hasOwn(INTRINSICS, intrinsicRealName)) {
                            value = INTRINSICS[intrinsicRealName];
                        } else if (value != null) {
                            if (!(part in value)) {
                                if (!allowMissing) {
                                    throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                                }
                                return void undefined1;
                            }
                            if ($gOPD && i + 1 >= parts.length) {
                                var desc = $gOPD(value, part);
                                isOwn = !!desc;
                                // By convention, when a data property is converted to an accessor
                                // property to emulate a data property that does not suffer from
                                // the override mistake, that accessor's getter is marked with
                                // an `originalValue` property. Here, when we detect this, we
                                // uphold the illusion by pretending to see that original data
                                // property, i.e., returning the value rather than the getter
                                // itself.
                                if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                                    value = desc.get;
                                } else {
                                    value = value[part];
                                }
                            } else {
                                isOwn = hasOwn(value, part);
                                value = value[part];
                            }
                            if (isOwn && !skipFurtherCaching) {
                                INTRINSICS[intrinsicRealName] = value;
                            }
                        }
                    }
                    return value;
                };
            /***/ },
            /***/ 326: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_147628__)=>{
                "use strict";
                var GetIntrinsic = __nested_webpack_require_147628__(7286);
                var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
                if ($gOPD) {
                    try {
                        $gOPD([], 'length');
                    } catch (e) {
                        // IE 8 has a broken gOPD
                        $gOPD = null;
                    }
                }
                module1.exports = $gOPD;
            /***/ },
            /***/ 1181: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_148219__)=>{
                "use strict";
                var GetIntrinsic = __nested_webpack_require_148219__(7286);
                var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
                var hasPropertyDescriptors = function hasPropertyDescriptors() {
                    if ($defineProperty) {
                        try {
                            $defineProperty({}, 'a', {
                                value: 1
                            });
                            return true;
                        } catch (e) {
                            // IE 8 has a broken defineProperty
                            return false;
                        }
                    }
                    return false;
                };
                hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
                    // node v0.6 has a bug where array lengths can be Set but not Defined
                    if (!hasPropertyDescriptors()) {
                        return null;
                    }
                    try {
                        return $defineProperty([], 'length', {
                            value: 1
                        }).length !== 1;
                    } catch (e) {
                        // In Firefox 4-22, defining length on an array throws an exception.
                        return true;
                    }
                };
                module1.exports = hasPropertyDescriptors;
            /***/ },
            /***/ 8486: /***/ (module1)=>{
                "use strict";
                var test = {
                    foo: {}
                };
                var $Object = Object;
                module1.exports = function hasProto() {
                    return ({
                        __proto__: test
                    }).foo === test.foo && !(({
                        __proto__: null
                    }) instanceof $Object);
                };
            /***/ },
            /***/ 2636: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_150294__)=>{
                "use strict";
                var origSymbol = typeof Symbol !== 'undefined' && Symbol;
                var hasSymbolSham = __nested_webpack_require_150294__(6679);
                module1.exports = function hasNativeSymbols() {
                    if (typeof origSymbol !== 'function') {
                        return false;
                    }
                    if (typeof Symbol !== 'function') {
                        return false;
                    }
                    if (typeof origSymbol('foo') !== 'symbol') {
                        return false;
                    }
                    if (typeof Symbol('bar') !== 'symbol') {
                        return false;
                    }
                    return hasSymbolSham();
                };
            /***/ },
            /***/ 6679: /***/ (module1)=>{
                "use strict";
                /* eslint complexity: [2, 18], max-statements: [2, 33] */ module1.exports = function hasSymbols() {
                    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
                        return false;
                    }
                    if (typeof Symbol.iterator === 'symbol') {
                        return true;
                    }
                    var obj = {};
                    var sym = Symbol('test');
                    var symObj = Object(sym);
                    if (typeof sym === 'string') {
                        return false;
                    }
                    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
                        return false;
                    }
                    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
                        return false;
                    }
                    // temp disabled per https://github.com/ljharb/object.assign/issues/17
                    // if (sym instanceof Symbol) { return false; }
                    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
                    // if (!(symObj instanceof Symbol)) { return false; }
                    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
                    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
                    var symVal = 42;
                    obj[sym] = symVal;
                    for(sym in obj){
                        return false;
                    } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
                    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
                        return false;
                    }
                    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
                        return false;
                    }
                    var syms = Object.getOwnPropertySymbols(obj);
                    if (syms.length !== 1 || syms[0] !== sym) {
                        return false;
                    }
                    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
                        return false;
                    }
                    if (typeof Object.getOwnPropertyDescriptor === 'function') {
                        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
                        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
                            return false;
                        }
                    }
                    return true;
                };
            /***/ },
            /***/ 7226: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_154053__)=>{
                "use strict";
                var hasSymbols = __nested_webpack_require_154053__(6679);
                module1.exports = function hasToStringTagShams() {
                    return hasSymbols() && !!Symbol.toStringTag;
                };
            /***/ },
            /***/ 3198: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_154405__)=>{
                "use strict";
                var bind = __nested_webpack_require_154405__(4090);
                module1.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
            /***/ },
            /***/ 1285: /***/ (module1)=>{
                if (typeof Object.create === 'function') {
                    // implementation from standard node.js 'util' module
                    module1.exports = function inherits(ctor, superCtor) {
                        if (superCtor) {
                            ctor.super_ = superCtor;
                            ctor.prototype = Object.create(superCtor.prototype, {
                                constructor: {
                                    value: ctor,
                                    enumerable: false,
                                    writable: true,
                                    configurable: true
                                }
                            });
                        }
                    };
                } else {
                    // old school shim for old browsers
                    module1.exports = function inherits(ctor, superCtor) {
                        if (superCtor) {
                            ctor.super_ = superCtor;
                            var TempCtor = function() {};
                            TempCtor.prototype = superCtor.prototype;
                            ctor.prototype = new TempCtor();
                            ctor.prototype.constructor = ctor;
                        }
                    };
                }
            /***/ },
            /***/ 2635: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_156083__)=>{
                "use strict";
                var hasToStringTag = __nested_webpack_require_156083__(7226)();
                var callBound = __nested_webpack_require_156083__(2680);
                var $toString = callBound('Object.prototype.toString');
                var isStandardArguments = function isArguments(value) {
                    if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
                        return false;
                    }
                    return $toString(value) === '[object Arguments]';
                };
                var isLegacyArguments = function isArguments(value) {
                    if (isStandardArguments(value)) {
                        return true;
                    }
                    return value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && $toString(value) !== '[object Array]' && $toString(value.callee) === '[object Function]';
                };
                var supportsStandardArguments = function() {
                    return isStandardArguments(arguments);
                }();
                isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests
                module1.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
            /***/ },
            /***/ 9680: /***/ (module1)=>{
                "use strict";
                var fnToStr = Function.prototype.toString;
                var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
                var badArrayLike;
                var isCallableMarker;
                if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
                    try {
                        badArrayLike = Object.defineProperty({}, 'length', {
                            get: function() {
                                throw isCallableMarker;
                            }
                        });
                        isCallableMarker = {};
                        // eslint-disable-next-line no-throw-literal
                        reflectApply(function() {
                            throw 42;
                        }, null, badArrayLike);
                    } catch (_) {
                        if (_ !== isCallableMarker) {
                            reflectApply = null;
                        }
                    }
                } else {
                    reflectApply = null;
                }
                var constructorRegex = /^\s*class\b/;
                var isES6ClassFn = function isES6ClassFunction(value) {
                    try {
                        var fnStr = fnToStr.call(value);
                        return constructorRegex.test(fnStr);
                    } catch (e) {
                        return false; // not a function
                    }
                };
                var tryFunctionObject = function tryFunctionToStr(value) {
                    try {
                        if (isES6ClassFn(value)) {
                            return false;
                        }
                        fnToStr.call(value);
                        return true;
                    } catch (e) {
                        return false;
                    }
                };
                var toStr = Object.prototype.toString;
                var objectClass = '[object Object]';
                var fnClass = '[object Function]';
                var genClass = '[object GeneratorFunction]';
                var ddaClass = '[object HTMLAllCollection]'; // IE 11
                var ddaClass2 = '[object HTML document.all class]';
                var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
                var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
                var isIE68 = !(0 in [
                    , 
                ]); // eslint-disable-line no-sparse-arrays, comma-spacing
                var isDDA = function isDocumentDotAll() {
                    return false;
                };
                if (typeof document === 'object') {
                    // Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
                    var all = document.all;
                    if (toStr.call(all) === toStr.call(document.all)) {
                        isDDA = function isDocumentDotAll(value) {
                            /* globals document: false */ // in IE 6-8, typeof document.all is "object" and it's truthy
                            if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
                                try {
                                    var str = toStr.call(value);
                                    return (str === ddaClass || str === ddaClass2 || str === ddaClass3 // opera 12.16
                                     || str === objectClass // IE 6-8
                                    ) && value('') == null; // eslint-disable-line eqeqeq
                                } catch (e) {}
                            }
                            return false;
                        };
                    }
                }
                module1.exports = reflectApply ? function isCallable(value) {
                    if (isDDA(value)) {
                        return true;
                    }
                    if (!value) {
                        return false;
                    }
                    if (typeof value !== 'function' && typeof value !== 'object') {
                        return false;
                    }
                    try {
                        reflectApply(value, null, badArrayLike);
                    } catch (e) {
                        if (e !== isCallableMarker) {
                            return false;
                        }
                    }
                    return !isES6ClassFn(value) && tryFunctionObject(value);
                } : function isCallable(value) {
                    if (isDDA(value)) {
                        return true;
                    }
                    if (!value) {
                        return false;
                    }
                    if (typeof value !== 'function' && typeof value !== 'object') {
                        return false;
                    }
                    if (hasToStringTag) {
                        return tryFunctionObject(value);
                    }
                    if (isES6ClassFn(value)) {
                        return false;
                    }
                    var strClass = toStr.call(value);
                    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
                        return false;
                    }
                    return tryFunctionObject(value);
                };
            /***/ },
            /***/ 3138: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_163143__)=>{
                "use strict";
                var toStr = Object.prototype.toString;
                var fnToStr = Function.prototype.toString;
                var isFnRegex = /^\s*(?:function)?\*/;
                var hasToStringTag = __nested_webpack_require_163143__(7226)();
                var getProto = Object.getPrototypeOf;
                var getGeneratorFunc = function() {
                    if (!hasToStringTag) {
                        return false;
                    }
                    try {
                        return Function('return function*() {}')();
                    } catch (e) {}
                };
                var GeneratorFunction;
                module1.exports = function isGeneratorFunction(fn) {
                    if (typeof fn !== 'function') {
                        return false;
                    }
                    if (isFnRegex.test(fnToStr.call(fn))) {
                        return true;
                    }
                    if (!hasToStringTag) {
                        var str = toStr.call(fn);
                        return str === '[object GeneratorFunction]';
                    }
                    if (!getProto) {
                        return false;
                    }
                    if (typeof GeneratorFunction === 'undefined') {
                        var generatorFunc = getGeneratorFunc();
                        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
                    }
                    return getProto(fn) === GeneratorFunction;
                };
            /***/ },
            /***/ 7053: /***/ (module1)=>{
                "use strict";
                /* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */ module1.exports = function isNaN1(value) {
                    return value !== value;
                };
            /***/ },
            /***/ 4782: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_165112__)=>{
                "use strict";
                var callBind = __nested_webpack_require_165112__(9429);
                var define1 = __nested_webpack_require_165112__(4926);
                var implementation = __nested_webpack_require_165112__(7053);
                var getPolyfill = __nested_webpack_require_165112__(755);
                var shim = __nested_webpack_require_165112__(5346);
                var polyfill = callBind(getPolyfill(), Number);
                /* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */ define1(polyfill, {
                    getPolyfill: getPolyfill,
                    implementation: implementation,
                    shim: shim
                });
                module1.exports = polyfill;
            /***/ },
            /***/ 755: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_165909__)=>{
                "use strict";
                var implementation = __nested_webpack_require_165909__(7053);
                module1.exports = function getPolyfill() {
                    if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
                        return Number.isNaN;
                    }
                    return implementation;
                };
            /***/ },
            /***/ 5346: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_166385__)=>{
                "use strict";
                var define1 = __nested_webpack_require_166385__(4926);
                var getPolyfill = __nested_webpack_require_166385__(755);
                /* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */ module1.exports = function shimNumberIsNaN() {
                    var polyfill = getPolyfill();
                    define1(Number, {
                        isNaN: polyfill
                    }, {
                        isNaN: function testIsNaN() {
                            return Number.isNaN !== polyfill;
                        }
                    });
                    return polyfill;
                };
            /***/ },
            /***/ 198: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_167151__)=>{
                "use strict";
                var whichTypedArray = __nested_webpack_require_167151__(2094);
                module1.exports = function isTypedArray(value) {
                    return !!whichTypedArray(value);
                };
            /***/ },
            /***/ 8169: /***/ (module1)=>{
                "use strict";
                var numberIsNaN = function(value) {
                    return value !== value;
                };
                module1.exports = function is(a, b) {
                    if (a === 0 && b === 0) {
                        return 1 / a === 1 / b;
                    }
                    if (a === b) {
                        return true;
                    }
                    if (numberIsNaN(a) && numberIsNaN(b)) {
                        return true;
                    }
                    return false;
                };
            /***/ },
            /***/ 4679: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_168139__)=>{
                "use strict";
                var define1 = __nested_webpack_require_168139__(4926);
                var callBind = __nested_webpack_require_168139__(9429);
                var implementation = __nested_webpack_require_168139__(8169);
                var getPolyfill = __nested_webpack_require_168139__(8070);
                var shim = __nested_webpack_require_168139__(191);
                var polyfill = callBind(getPolyfill(), Object);
                define1(polyfill, {
                    getPolyfill: getPolyfill,
                    implementation: implementation,
                    shim: shim
                });
                module1.exports = polyfill;
            /***/ },
            /***/ 8070: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_168866__)=>{
                "use strict";
                var implementation = __nested_webpack_require_168866__(8169);
                module1.exports = function getPolyfill() {
                    return typeof Object.is === 'function' ? Object.is : implementation;
                };
            /***/ },
            /***/ 191: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_169237__)=>{
                "use strict";
                var getPolyfill = __nested_webpack_require_169237__(8070);
                var define1 = __nested_webpack_require_169237__(4926);
                module1.exports = function shimObjectIs() {
                    var polyfill = getPolyfill();
                    define1(Object, {
                        is: polyfill
                    }, {
                        is: function testObjectIs() {
                            return Object.is !== polyfill;
                        }
                    });
                    return polyfill;
                };
            /***/ },
            /***/ 5691: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_169925__)=>{
                "use strict";
                var keysShim;
                if (!Object.keys) {
                    // modified from https://github.com/es-shims/es5-shim
                    var has = Object.prototype.hasOwnProperty;
                    var toStr = Object.prototype.toString;
                    var isArgs = __nested_webpack_require_169925__(801); // eslint-disable-line global-require
                    var isEnumerable = Object.prototype.propertyIsEnumerable;
                    var hasDontEnumBug = !isEnumerable.call({
                        toString: null
                    }, 'toString');
                    var hasProtoEnumBug = isEnumerable.call(function() {}, 'prototype');
                    var dontEnums = [
                        'toString',
                        'toLocaleString',
                        'valueOf',
                        'hasOwnProperty',
                        'isPrototypeOf',
                        'propertyIsEnumerable',
                        'constructor'
                    ];
                    var equalsConstructorPrototype = function(o) {
                        var ctor = o.constructor;
                        return ctor && ctor.prototype === o;
                    };
                    var excludedKeys = {
                        $applicationCache: true,
                        $console: true,
                        $external: true,
                        $frame: true,
                        $frameElement: true,
                        $frames: true,
                        $innerHeight: true,
                        $innerWidth: true,
                        $onmozfullscreenchange: true,
                        $onmozfullscreenerror: true,
                        $outerHeight: true,
                        $outerWidth: true,
                        $pageXOffset: true,
                        $pageYOffset: true,
                        $parent: true,
                        $scrollLeft: true,
                        $scrollTop: true,
                        $scrollX: true,
                        $scrollY: true,
                        $self: true,
                        $webkitIndexedDB: true,
                        $webkitStorageInfo: true,
                        $window: true
                    };
                    var hasAutomationEqualityBug = function() {
                        /* global window */ if (typeof window === 'undefined') {
                            return false;
                        }
                        for(var k in window){
                            try {
                                if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                                    try {
                                        equalsConstructorPrototype(window[k]);
                                    } catch (e) {
                                        return true;
                                    }
                                }
                            } catch (e) {
                                return true;
                            }
                        }
                        return false;
                    }();
                    var equalsConstructorPrototypeIfNotBuggy = function(o) {
                        /* global window */ if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
                            return equalsConstructorPrototype(o);
                        }
                        try {
                            return equalsConstructorPrototype(o);
                        } catch (e) {
                            return false;
                        }
                    };
                    keysShim = function keys(object) {
                        var isObject = object !== null && typeof object === 'object';
                        var isFunction = toStr.call(object) === '[object Function]';
                        var isArguments = isArgs(object);
                        var isString = isObject && toStr.call(object) === '[object String]';
                        var theKeys = [];
                        if (!isObject && !isFunction && !isArguments) {
                            throw new TypeError('Object.keys called on a non-object');
                        }
                        var skipProto = hasProtoEnumBug && isFunction;
                        if (isString && object.length > 0 && !has.call(object, 0)) {
                            for(var i = 0; i < object.length; ++i){
                                theKeys.push(String(i));
                            }
                        }
                        if (isArguments && object.length > 0) {
                            for(var j = 0; j < object.length; ++j){
                                theKeys.push(String(j));
                            }
                        } else {
                            for(var name in object){
                                if (!(skipProto && name === 'prototype') && has.call(object, name)) {
                                    theKeys.push(String(name));
                                }
                            }
                        }
                        if (hasDontEnumBug) {
                            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                            for(var k = 0; k < dontEnums.length; ++k){
                                if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                                    theKeys.push(dontEnums[k]);
                                }
                            }
                        }
                        return theKeys;
                    };
                }
                module1.exports = keysShim;
            /***/ },
            /***/ 3464: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_175894__)=>{
                "use strict";
                var slice = Array.prototype.slice;
                var isArgs = __nested_webpack_require_175894__(801);
                var origKeys = Object.keys;
                var keysShim = origKeys ? function keys(o) {
                    return origKeys(o);
                } : __nested_webpack_require_175894__(5691);
                var originalKeys = Object.keys;
                keysShim.shim = function shimObjectKeys() {
                    if (Object.keys) {
                        var keysWorksWithArguments = function() {
                            // Safari 5.0 bug
                            var args = Object.keys(arguments);
                            return args && args.length === arguments.length;
                        }(1, 2);
                        if (!keysWorksWithArguments) {
                            Object.keys = function keys(object) {
                                if (isArgs(object)) {
                                    return originalKeys(slice.call(object));
                                }
                                return originalKeys(object);
                            };
                        }
                    } else {
                        Object.keys = keysShim;
                    }
                    return Object.keys || keysShim;
                };
                module1.exports = keysShim;
            /***/ },
            /***/ 801: /***/ (module1)=>{
                "use strict";
                var toStr = Object.prototype.toString;
                module1.exports = function isArguments(value) {
                    var str = toStr.call(value);
                    var isArgs = str === '[object Arguments]';
                    if (!isArgs) {
                        isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
                    }
                    return isArgs;
                };
            /***/ },
            /***/ 4406: /***/ (module1)=>{
                // shim for using process in browser
                var process = module1.exports = {};
                // cached from whatever global is present so that test runners that stub it
                // don't break things.  But we need to wrap it in a try catch in case it is
                // wrapped in strict mode code which doesn't define any globals.  It's inside a
                // function because try/catches deoptimize in certain engines.
                var cachedSetTimeout;
                var cachedClearTimeout;
                function defaultSetTimout() {
                    throw new Error('setTimeout has not been defined');
                }
                function defaultClearTimeout() {
                    throw new Error('clearTimeout has not been defined');
                }
                (function() {
                    try {
                        if (typeof setTimeout === 'function') {
                            cachedSetTimeout = setTimeout;
                        } else {
                            cachedSetTimeout = defaultSetTimout;
                        }
                    } catch (e) {
                        cachedSetTimeout = defaultSetTimout;
                    }
                    try {
                        if (typeof clearTimeout === 'function') {
                            cachedClearTimeout = clearTimeout;
                        } else {
                            cachedClearTimeout = defaultClearTimeout;
                        }
                    } catch (e) {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                })();
                function runTimeout(fun) {
                    if (cachedSetTimeout === setTimeout) {
                        //normal enviroments in sane situations
                        return setTimeout(fun, 0);
                    }
                    // if setTimeout wasn't available but was latter defined
                    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                        cachedSetTimeout = setTimeout;
                        return setTimeout(fun, 0);
                    }
                    try {
                        // when when somebody has screwed with setTimeout but no I.E. maddness
                        return cachedSetTimeout(fun, 0);
                    } catch (e) {
                        try {
                            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                            return cachedSetTimeout.call(null, fun, 0);
                        } catch (e) {
                            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                            return cachedSetTimeout.call(this, fun, 0);
                        }
                    }
                }
                function runClearTimeout(marker) {
                    if (cachedClearTimeout === clearTimeout) {
                        //normal enviroments in sane situations
                        return clearTimeout(marker);
                    }
                    // if clearTimeout wasn't available but was latter defined
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                        cachedClearTimeout = clearTimeout;
                        return clearTimeout(marker);
                    }
                    try {
                        // when when somebody has screwed with setTimeout but no I.E. maddness
                        return cachedClearTimeout(marker);
                    } catch (e) {
                        try {
                            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                            return cachedClearTimeout.call(null, marker);
                        } catch (e) {
                            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                            return cachedClearTimeout.call(this, marker);
                        }
                    }
                }
                var queue = [];
                var draining = false;
                var currentQueue;
                var queueIndex = -1;
                function cleanUpNextTick() {
                    if (!draining || !currentQueue) {
                        return;
                    }
                    draining = false;
                    if (currentQueue.length) {
                        queue = currentQueue.concat(queue);
                    } else {
                        queueIndex = -1;
                    }
                    if (queue.length) {
                        drainQueue();
                    }
                }
                function drainQueue() {
                    if (draining) {
                        return;
                    }
                    var timeout = runTimeout(cleanUpNextTick);
                    draining = true;
                    var len = queue.length;
                    while(len){
                        currentQueue = queue;
                        queue = [];
                        while(++queueIndex < len){
                            if (currentQueue) {
                                currentQueue[queueIndex].run();
                            }
                        }
                        queueIndex = -1;
                        len = queue.length;
                    }
                    currentQueue = null;
                    draining = false;
                    runClearTimeout(timeout);
                }
                process.nextTick = function(fun) {
                    var args = new Array(arguments.length - 1);
                    if (arguments.length > 1) {
                        for(var i = 1; i < arguments.length; i++){
                            args[i - 1] = arguments[i];
                        }
                    }
                    queue.push(new Item(fun, args));
                    if (queue.length === 1 && !draining) {
                        runTimeout(drainQueue);
                    }
                };
                // v8 likes predictible objects
                function Item(fun, array) {
                    this.fun = fun;
                    this.array = array;
                }
                Item.prototype.run = function() {
                    this.fun.apply(null, this.array);
                };
                process.title = 'browser';
                process.browser = true;
                process.env = {};
                process.argv = [];
                process.version = ''; // empty string to avoid regexp issues
                process.versions = {};
                function noop() {}
                process.on = noop;
                process.addListener = noop;
                process.once = noop;
                process.off = noop;
                process.removeListener = noop;
                process.removeAllListeners = noop;
                process.emit = noop;
                process.prependListener = noop;
                process.prependOnceListener = noop;
                process.listeners = function(name) {
                    return [];
                };
                process.binding = function(name) {
                    throw new Error('process.binding is not supported');
                };
                process.cwd = function() {
                    return '/';
                };
                process.chdir = function(dir) {
                    throw new Error('process.chdir is not supported');
                };
                process.umask = function() {
                    return 0;
                };
            /***/ },
            /***/ 4487: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_186269__)=>{
                "use strict";
                /* harmony export */ __nested_webpack_require_186269__.d(__nested_webpack_exports__, {
                    /* harmony export */ BaseService: ()=>/* binding */ BaseService
                });
                /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_186269__(6297);
                /* harmony import */ var vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_186269__(4881);
                function _define_property(obj, key, value) {
                    if (key in obj) {
                        Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: true,
                            configurable: true,
                            writable: true
                        });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }
                class BaseService {
                    addDocument(document1) {
                        this.documents[document1.uri] = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__ /* .TextDocument */ .n.create(document1.uri, document1.languageId, document1.version, document1.text);
                    //TODO:
                    /*if (options)
            this.setSessionOptions(sessionID, options);*/ }
                    getDocument(uri) {
                        return this.documents[uri];
                    }
                    removeDocument(document1) {
                        delete this.documents[document1.uri];
                        if (this.options[document1.uri]) {
                            delete this.options[document1.uri];
                        }
                    }
                    getDocumentValue(uri) {
                        var _this_getDocument;
                        return (_this_getDocument = this.getDocument(uri)) === null || _this_getDocument === void 0 ? void 0 : _this_getDocument.getText();
                    }
                    setValue(identifier, value) {
                        let document1 = this.getDocument(identifier.uri);
                        if (document1) {
                            document1 = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__ /* .TextDocument */ .n.create(document1.uri, document1.languageId, document1.version, value);
                            this.documents[document1.uri] = document1;
                        }
                    }
                    setGlobalOptions(options) {
                        this.globalOptions = options !== null && options !== void 0 ? options : {};
                    }
                    setOptions(sessionID, options, merge = false) {
                        this.options[sessionID] = merge ? (0, _utils__WEBPACK_IMPORTED_MODULE_1__ /* .mergeObjects */ .PM)(options, this.options[sessionID]) : options;
                    }
                    getOption(sessionID, optionName) {
                        if (this.options[sessionID] && this.options[sessionID][optionName]) {
                            return this.options[sessionID][optionName];
                        } else {
                            return this.globalOptions[optionName];
                        }
                    }
                    applyDeltas(identifier, deltas) {
                        let document1 = this.getDocument(identifier.uri);
                        if (document1) vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__ /* .TextDocument */ .n.update(document1, deltas, identifier.version);
                    }
                    async doComplete(document1, position) {
                        return null;
                    }
                    async doHover(document1, position) {
                        return null;
                    }
                    async doResolve(item) {
                        return null;
                    }
                    async doValidation(document1) {
                        return [];
                    }
                    format(document1, range, options) {
                        return Promise.resolve([]);
                    }
                    async provideSignatureHelp(document1, position) {
                        return null;
                    }
                    async findDocumentHighlights(document1, position) {
                        return [];
                    }
                    get optionsToFilterDiagnostics() {
                        var _this_globalOptions_errorCodesToIgnore, _this_globalOptions_errorCodesToTreatAsWarning, _this_globalOptions_errorCodesToTreatAsInfo, _this_globalOptions_errorMessagesToIgnore, _this_globalOptions_errorMessagesToTreatAsWarning, _this_globalOptions_errorMessagesToTreatAsInfo;
                        return {
                            errorCodesToIgnore: (_this_globalOptions_errorCodesToIgnore = this.globalOptions.errorCodesToIgnore) !== null && _this_globalOptions_errorCodesToIgnore !== void 0 ? _this_globalOptions_errorCodesToIgnore : [],
                            errorCodesToTreatAsWarning: (_this_globalOptions_errorCodesToTreatAsWarning = this.globalOptions.errorCodesToTreatAsWarning) !== null && _this_globalOptions_errorCodesToTreatAsWarning !== void 0 ? _this_globalOptions_errorCodesToTreatAsWarning : [],
                            errorCodesToTreatAsInfo: (_this_globalOptions_errorCodesToTreatAsInfo = this.globalOptions.errorCodesToTreatAsInfo) !== null && _this_globalOptions_errorCodesToTreatAsInfo !== void 0 ? _this_globalOptions_errorCodesToTreatAsInfo : [],
                            errorMessagesToIgnore: (_this_globalOptions_errorMessagesToIgnore = this.globalOptions.errorMessagesToIgnore) !== null && _this_globalOptions_errorMessagesToIgnore !== void 0 ? _this_globalOptions_errorMessagesToIgnore : [],
                            errorMessagesToTreatAsWarning: (_this_globalOptions_errorMessagesToTreatAsWarning = this.globalOptions.errorMessagesToTreatAsWarning) !== null && _this_globalOptions_errorMessagesToTreatAsWarning !== void 0 ? _this_globalOptions_errorMessagesToTreatAsWarning : [],
                            errorMessagesToTreatAsInfo: (_this_globalOptions_errorMessagesToTreatAsInfo = this.globalOptions.errorMessagesToTreatAsInfo) !== null && _this_globalOptions_errorMessagesToTreatAsInfo !== void 0 ? _this_globalOptions_errorMessagesToTreatAsInfo : []
                        };
                    }
                    constructor(mode){
                        _define_property(this, "mode", void 0);
                        _define_property(this, "documents", {});
                        _define_property(this, "options", {});
                        _define_property(this, "globalOptions", {});
                        _define_property(this, "serviceData", void 0);
                        _define_property(this, "serviceCapabilities", {});
                        this.mode = mode;
                    }
                }
            /***/ },
            /***/ 6297: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_193451__)=>{
                "use strict";
                /* harmony export */ __nested_webpack_require_193451__.d(__nested_webpack_exports__, {
                    /* harmony export */ PM: ()=>/* binding */ mergeObjects
                });
                /* unused harmony exports notEmpty, mergeRanges, checkValueAgainstRegexpArray */ function mergeObjects(obj1, obj2) {
                    if (!obj1) return obj2;
                    if (!obj2) return obj1;
                    const mergedObjects = {
                        ...obj2,
                        ...obj1
                    }; // Give priority to obj1 values by spreading obj2 first, then obj1
                    for (const key of Object.keys(mergedObjects)){
                        if (obj1[key] && obj2[key]) {
                            if (Array.isArray(obj1[key])) {
                                mergedObjects[key] = obj1[key].concat(obj2[key]);
                            } else if (Array.isArray(obj2[key])) {
                                mergedObjects[key] = obj2[key].concat(obj1[key]);
                            } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                                mergedObjects[key] = mergeObjects(obj1[key], obj2[key]);
                            }
                        }
                    }
                    return mergedObjects;
                }
                function notEmpty(value) {
                    return value !== null && value !== undefined;
                }
                //taken with small changes from ace-code
                function mergeRanges(ranges) {
                    var list = ranges;
                    list = list.sort(function(a, b) {
                        return comparePoints(a.start, b.start);
                    });
                    var next = list[0], range;
                    for(var i = 1; i < list.length; i++){
                        range = next;
                        next = list[i];
                        var cmp = comparePoints(range.end, next.start);
                        if (cmp < 0) continue;
                        if (cmp == 0 && !range.isEmpty() && !next.isEmpty()) continue;
                        if (comparePoints(range.end, next.end) < 0) {
                            range.end.row = next.end.row;
                            range.end.column = next.end.column;
                        }
                        list.splice(i, 1);
                        next = range;
                        i--;
                    }
                    return list;
                }
                function comparePoints(p1, p2) {
                    return p1.row - p2.row || p1.column - p2.column;
                }
                function checkValueAgainstRegexpArray(value, regexpArray) {
                    if (!regexpArray) {
                        return false;
                    }
                    for(let i = 0; i < regexpArray.length; i++){
                        if (regexpArray[i].test(value)) {
                            return true;
                        }
                    }
                    return false;
                }
            /***/ },
            /***/ 82: /***/ (module1)=>{
                module1.exports = function isBuffer(arg) {
                    return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
                };
            /***/ },
            /***/ 4895: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_197018__)=>{
                "use strict";
                // Currently in sync with Node.js lib/internal/util/types.js
                // https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9
                var isArgumentsObject = __nested_webpack_require_197018__(2635);
                var isGeneratorFunction = __nested_webpack_require_197018__(3138);
                var whichTypedArray = __nested_webpack_require_197018__(2094);
                var isTypedArray = __nested_webpack_require_197018__(198);
                function uncurryThis(f) {
                    return f.call.bind(f);
                }
                var BigIntSupported = typeof BigInt !== 'undefined';
                var SymbolSupported = typeof Symbol !== 'undefined';
                var ObjectToString = uncurryThis(Object.prototype.toString);
                var numberValue = uncurryThis(Number.prototype.valueOf);
                var stringValue = uncurryThis(String.prototype.valueOf);
                var booleanValue = uncurryThis(Boolean.prototype.valueOf);
                if (BigIntSupported) {
                    var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
                }
                if (SymbolSupported) {
                    var symbolValue = uncurryThis(Symbol.prototype.valueOf);
                }
                function checkBoxedPrimitive(value, prototypeValueOf) {
                    if (typeof value !== 'object') {
                        return false;
                    }
                    try {
                        prototypeValueOf(value);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                exports1.isArgumentsObject = isArgumentsObject;
                exports1.isGeneratorFunction = isGeneratorFunction;
                exports1.isTypedArray = isTypedArray;
                // Taken from here and modified for better browser support
                // https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
                function isPromise(input) {
                    return typeof Promise !== 'undefined' && input instanceof Promise || input !== null && typeof input === 'object' && typeof input.then === 'function' && typeof input.catch === 'function';
                }
                exports1.isPromise = isPromise;
                function isArrayBufferView(value) {
                    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
                        return ArrayBuffer.isView(value);
                    }
                    return isTypedArray(value) || isDataView(value);
                }
                exports1.isArrayBufferView = isArrayBufferView;
                function isUint8Array(value) {
                    return whichTypedArray(value) === 'Uint8Array';
                }
                exports1.isUint8Array = isUint8Array;
                function isUint8ClampedArray(value) {
                    return whichTypedArray(value) === 'Uint8ClampedArray';
                }
                exports1.isUint8ClampedArray = isUint8ClampedArray;
                function isUint16Array(value) {
                    return whichTypedArray(value) === 'Uint16Array';
                }
                exports1.isUint16Array = isUint16Array;
                function isUint32Array(value) {
                    return whichTypedArray(value) === 'Uint32Array';
                }
                exports1.isUint32Array = isUint32Array;
                function isInt8Array(value) {
                    return whichTypedArray(value) === 'Int8Array';
                }
                exports1.isInt8Array = isInt8Array;
                function isInt16Array(value) {
                    return whichTypedArray(value) === 'Int16Array';
                }
                exports1.isInt16Array = isInt16Array;
                function isInt32Array(value) {
                    return whichTypedArray(value) === 'Int32Array';
                }
                exports1.isInt32Array = isInt32Array;
                function isFloat32Array(value) {
                    return whichTypedArray(value) === 'Float32Array';
                }
                exports1.isFloat32Array = isFloat32Array;
                function isFloat64Array(value) {
                    return whichTypedArray(value) === 'Float64Array';
                }
                exports1.isFloat64Array = isFloat64Array;
                function isBigInt64Array(value) {
                    return whichTypedArray(value) === 'BigInt64Array';
                }
                exports1.isBigInt64Array = isBigInt64Array;
                function isBigUint64Array(value) {
                    return whichTypedArray(value) === 'BigUint64Array';
                }
                exports1.isBigUint64Array = isBigUint64Array;
                function isMapToString(value) {
                    return ObjectToString(value) === '[object Map]';
                }
                isMapToString.working = typeof Map !== 'undefined' && isMapToString(new Map());
                function isMap(value) {
                    if (typeof Map === 'undefined') {
                        return false;
                    }
                    return isMapToString.working ? isMapToString(value) : value instanceof Map;
                }
                exports1.isMap = isMap;
                function isSetToString(value) {
                    return ObjectToString(value) === '[object Set]';
                }
                isSetToString.working = typeof Set !== 'undefined' && isSetToString(new Set());
                function isSet(value) {
                    if (typeof Set === 'undefined') {
                        return false;
                    }
                    return isSetToString.working ? isSetToString(value) : value instanceof Set;
                }
                exports1.isSet = isSet;
                function isWeakMapToString(value) {
                    return ObjectToString(value) === '[object WeakMap]';
                }
                isWeakMapToString.working = typeof WeakMap !== 'undefined' && isWeakMapToString(new WeakMap());
                function isWeakMap(value) {
                    if (typeof WeakMap === 'undefined') {
                        return false;
                    }
                    return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
                }
                exports1.isWeakMap = isWeakMap;
                function isWeakSetToString(value) {
                    return ObjectToString(value) === '[object WeakSet]';
                }
                isWeakSetToString.working = typeof WeakSet !== 'undefined' && isWeakSetToString(new WeakSet());
                function isWeakSet(value) {
                    return isWeakSetToString(value);
                }
                exports1.isWeakSet = isWeakSet;
                function isArrayBufferToString(value) {
                    return ObjectToString(value) === '[object ArrayBuffer]';
                }
                isArrayBufferToString.working = typeof ArrayBuffer !== 'undefined' && isArrayBufferToString(new ArrayBuffer());
                function isArrayBuffer(value) {
                    if (typeof ArrayBuffer === 'undefined') {
                        return false;
                    }
                    return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
                }
                exports1.isArrayBuffer = isArrayBuffer;
                function isDataViewToString(value) {
                    return ObjectToString(value) === '[object DataView]';
                }
                isDataViewToString.working = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined' && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
                function isDataView(value) {
                    if (typeof DataView === 'undefined') {
                        return false;
                    }
                    return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
                }
                exports1.isDataView = isDataView;
                // Store a copy of SharedArrayBuffer in case it's deleted elsewhere
                var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
                function isSharedArrayBufferToString(value) {
                    return ObjectToString(value) === '[object SharedArrayBuffer]';
                }
                function isSharedArrayBuffer(value) {
                    if (typeof SharedArrayBufferCopy === 'undefined') {
                        return false;
                    }
                    if (typeof isSharedArrayBufferToString.working === 'undefined') {
                        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
                    }
                    return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
                }
                exports1.isSharedArrayBuffer = isSharedArrayBuffer;
                function isAsyncFunction(value) {
                    return ObjectToString(value) === '[object AsyncFunction]';
                }
                exports1.isAsyncFunction = isAsyncFunction;
                function isMapIterator(value) {
                    return ObjectToString(value) === '[object Map Iterator]';
                }
                exports1.isMapIterator = isMapIterator;
                function isSetIterator(value) {
                    return ObjectToString(value) === '[object Set Iterator]';
                }
                exports1.isSetIterator = isSetIterator;
                function isGeneratorObject(value) {
                    return ObjectToString(value) === '[object Generator]';
                }
                exports1.isGeneratorObject = isGeneratorObject;
                function isWebAssemblyCompiledModule(value) {
                    return ObjectToString(value) === '[object WebAssembly.Module]';
                }
                exports1.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
                function isNumberObject(value) {
                    return checkBoxedPrimitive(value, numberValue);
                }
                exports1.isNumberObject = isNumberObject;
                function isStringObject(value) {
                    return checkBoxedPrimitive(value, stringValue);
                }
                exports1.isStringObject = isStringObject;
                function isBooleanObject(value) {
                    return checkBoxedPrimitive(value, booleanValue);
                }
                exports1.isBooleanObject = isBooleanObject;
                function isBigIntObject(value) {
                    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
                }
                exports1.isBigIntObject = isBigIntObject;
                function isSymbolObject(value) {
                    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
                }
                exports1.isSymbolObject = isSymbolObject;
                function isBoxedPrimitive(value) {
                    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
                }
                exports1.isBoxedPrimitive = isBoxedPrimitive;
                function isAnyArrayBuffer(value) {
                    return typeof Uint8Array !== 'undefined' && (isArrayBuffer(value) || isSharedArrayBuffer(value));
                }
                exports1.isAnyArrayBuffer = isAnyArrayBuffer;
                [
                    'isProxy',
                    'isExternal',
                    'isModuleNamespaceObject'
                ].forEach(function(method) {
                    Object.defineProperty(exports1, method, {
                        enumerable: false,
                        value: function() {
                            throw new Error(method + ' is not supported in userland');
                        }
                    });
                });
            /***/ },
            /***/ 3335: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_209494__)=>{
                /* provided dependency */ var process = __nested_webpack_require_209494__(4406);
                /* provided dependency */ var console = __nested_webpack_require_209494__(3716);
                // Copyright Joyent, Inc. and other Node contributors.
                //
                // Permission is hereby granted, free of charge, to any person obtaining a
                // copy of this software and associated documentation files (the
                // "Software"), to deal in the Software without restriction, including
                // without limitation the rights to use, copy, modify, merge, publish,
                // distribute, sublicense, and/or sell copies of the Software, and to permit
                // persons to whom the Software is furnished to do so, subject to the
                // following conditions:
                //
                // The above copyright notice and this permission notice shall be included
                // in all copies or substantial portions of the Software.
                //
                // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                // USE OR OTHER DEALINGS IN THE SOFTWARE.
                var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
                    var keys = Object.keys(obj);
                    var descriptors = {};
                    for(var i = 0; i < keys.length; i++){
                        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
                    }
                    return descriptors;
                };
                var formatRegExp = /%[sdj%]/g;
                exports1.format = function(f) {
                    if (!isString(f)) {
                        var objects = [];
                        for(var i = 0; i < arguments.length; i++){
                            objects.push(inspect(arguments[i]));
                        }
                        return objects.join(' ');
                    }
                    var i = 1;
                    var args = arguments;
                    var len = args.length;
                    var str = String(f).replace(formatRegExp, function(x) {
                        if (x === '%%') return '%';
                        if (i >= len) return x;
                        switch(x){
                            case '%s':
                                return String(args[i++]);
                            case '%d':
                                return Number(args[i++]);
                            case '%j':
                                try {
                                    return JSON.stringify(args[i++]);
                                } catch (_) {
                                    return '[Circular]';
                                }
                            default:
                                return x;
                        }
                    });
                    for(var x = args[i]; i < len; x = args[++i]){
                        if (isNull(x) || !isObject(x)) {
                            str += ' ' + x;
                        } else {
                            str += ' ' + inspect(x);
                        }
                    }
                    return str;
                };
                // Mark that a method should not be used.
                // Returns a modified function which warns once by default.
                // If --no-deprecation is set, then it is a no-op.
                exports1.deprecate = function(fn, msg) {
                    if (typeof process !== 'undefined' && process.noDeprecation === true) {
                        return fn;
                    }
                    // Allow for deprecating things in the process of starting up.
                    if (typeof process === 'undefined') {
                        return function() {
                            return exports1.deprecate(fn, msg).apply(this, arguments);
                        };
                    }
                    var warned = false;
                    function deprecated() {
                        if (!warned) {
                            if (process.throwDeprecation) {
                                throw new Error(msg);
                            } else if (process.traceDeprecation) {
                                console.trace(msg);
                            } else {
                                console.error(msg);
                            }
                            warned = true;
                        }
                        return fn.apply(this, arguments);
                    }
                    return deprecated;
                };
                var debugs = {};
                var debugEnvRegex = /^$/;
                if (process.env.NODE_DEBUG) {
                    var debugEnv = process.env.NODE_DEBUG;
                    debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '.*').replace(/,/g, '$|^').toUpperCase();
                    debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
                }
                exports1.debuglog = function(set) {
                    set = set.toUpperCase();
                    if (!debugs[set]) {
                        if (debugEnvRegex.test(set)) {
                            var pid = process.pid;
                            debugs[set] = function() {
                                var msg = exports1.format.apply(exports1, arguments);
                                console.error('%s %d: %s', set, pid, msg);
                            };
                        } else {
                            debugs[set] = function() {};
                        }
                    }
                    return debugs[set];
                };
                /**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */ /* legacy: obj, showHidden, depth, colors*/ function inspect(obj, opts) {
                    // default options
                    var ctx = {
                        seen: [],
                        stylize: stylizeNoColor
                    };
                    // legacy...
                    if (arguments.length >= 3) ctx.depth = arguments[2];
                    if (arguments.length >= 4) ctx.colors = arguments[3];
                    if (isBoolean(opts)) {
                        // legacy...
                        ctx.showHidden = opts;
                    } else if (opts) {
                        // got an "options" object
                        exports1._extend(ctx, opts);
                    }
                    // set default options
                    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
                    if (isUndefined(ctx.depth)) ctx.depth = 2;
                    if (isUndefined(ctx.colors)) ctx.colors = false;
                    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
                    if (ctx.colors) ctx.stylize = stylizeWithColor;
                    return formatValue(ctx, obj, ctx.depth);
                }
                exports1.inspect = inspect;
                // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
                inspect.colors = {
                    'bold': [
                        1,
                        22
                    ],
                    'italic': [
                        3,
                        23
                    ],
                    'underline': [
                        4,
                        24
                    ],
                    'inverse': [
                        7,
                        27
                    ],
                    'white': [
                        37,
                        39
                    ],
                    'grey': [
                        90,
                        39
                    ],
                    'black': [
                        30,
                        39
                    ],
                    'blue': [
                        34,
                        39
                    ],
                    'cyan': [
                        36,
                        39
                    ],
                    'green': [
                        32,
                        39
                    ],
                    'magenta': [
                        35,
                        39
                    ],
                    'red': [
                        31,
                        39
                    ],
                    'yellow': [
                        33,
                        39
                    ]
                };
                // Don't use 'blue' not visible on cmd.exe
                inspect.styles = {
                    'special': 'cyan',
                    'number': 'yellow',
                    'boolean': 'yellow',
                    'undefined': 'grey',
                    'null': 'bold',
                    'string': 'green',
                    'date': 'magenta',
                    // "name": intentionally not styling
                    'regexp': 'red'
                };
                function stylizeWithColor(str, styleType) {
                    var style = inspect.styles[styleType];
                    if (style) {
                        return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
                    } else {
                        return str;
                    }
                }
                function stylizeNoColor(str, styleType) {
                    return str;
                }
                function arrayToHash(array) {
                    var hash = {};
                    array.forEach(function(val, idx) {
                        hash[val] = true;
                    });
                    return hash;
                }
                function formatValue(ctx, value, recurseTimes) {
                    // Provide a hook for user-specified inspect functions.
                    // Check that value is an object with an inspect function on it
                    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
                    value.inspect !== exports1.inspect && // Also filter out any prototype objects using the circular check.
                    !(value.constructor && value.constructor.prototype === value)) {
                        var ret = value.inspect(recurseTimes, ctx);
                        if (!isString(ret)) {
                            ret = formatValue(ctx, ret, recurseTimes);
                        }
                        return ret;
                    }
                    // Primitive types cannot have properties
                    var primitive = formatPrimitive(ctx, value);
                    if (primitive) {
                        return primitive;
                    }
                    // Look up the keys of the object.
                    var keys = Object.keys(value);
                    var visibleKeys = arrayToHash(keys);
                    if (ctx.showHidden) {
                        keys = Object.getOwnPropertyNames(value);
                    }
                    // IE doesn't make error fields non-enumerable
                    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
                    if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
                        return formatError(value);
                    }
                    // Some type of object without properties can be shortcutted.
                    if (keys.length === 0) {
                        if (isFunction(value)) {
                            var name = value.name ? ': ' + value.name : '';
                            return ctx.stylize('[Function' + name + ']', 'special');
                        }
                        if (isRegExp(value)) {
                            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                        }
                        if (isDate(value)) {
                            return ctx.stylize(Date.prototype.toString.call(value), 'date');
                        }
                        if (isError(value)) {
                            return formatError(value);
                        }
                    }
                    var base = '', array = false, braces = [
                        '{',
                        '}'
                    ];
                    // Make Array say that they are Array
                    if (isArray(value)) {
                        array = true;
                        braces = [
                            '[',
                            ']'
                        ];
                    }
                    // Make functions say that they are functions
                    if (isFunction(value)) {
                        var n = value.name ? ': ' + value.name : '';
                        base = ' [Function' + n + ']';
                    }
                    // Make RegExps say that they are RegExps
                    if (isRegExp(value)) {
                        base = ' ' + RegExp.prototype.toString.call(value);
                    }
                    // Make dates with properties first say the date
                    if (isDate(value)) {
                        base = ' ' + Date.prototype.toUTCString.call(value);
                    }
                    // Make error with message first say the error
                    if (isError(value)) {
                        base = ' ' + formatError(value);
                    }
                    if (keys.length === 0 && (!array || value.length == 0)) {
                        return braces[0] + base + braces[1];
                    }
                    if (recurseTimes < 0) {
                        if (isRegExp(value)) {
                            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                        } else {
                            return ctx.stylize('[Object]', 'special');
                        }
                    }
                    ctx.seen.push(value);
                    var output;
                    if (array) {
                        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
                    } else {
                        output = keys.map(function(key) {
                            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                        });
                    }
                    ctx.seen.pop();
                    return reduceToSingleString(output, base, braces);
                }
                function formatPrimitive(ctx, value) {
                    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
                    if (isString(value)) {
                        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
                        return ctx.stylize(simple, 'string');
                    }
                    if (isNumber(value)) return ctx.stylize('' + value, 'number');
                    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
                    // For some reason typeof null is "object", so special case here.
                    if (isNull(value)) return ctx.stylize('null', 'null');
                }
                function formatError(value) {
                    return '[' + Error.prototype.toString.call(value) + ']';
                }
                function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                    var output = [];
                    for(var i = 0, l = value.length; i < l; ++i){
                        if (hasOwnProperty(value, String(i))) {
                            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
                        } else {
                            output.push('');
                        }
                    }
                    keys.forEach(function(key) {
                        if (!key.match(/^\d+$/)) {
                            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
                        }
                    });
                    return output;
                }
                function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                    var name, str, desc;
                    desc = Object.getOwnPropertyDescriptor(value, key) || {
                        value: value[key]
                    };
                    if (desc.get) {
                        if (desc.set) {
                            str = ctx.stylize('[Getter/Setter]', 'special');
                        } else {
                            str = ctx.stylize('[Getter]', 'special');
                        }
                    } else {
                        if (desc.set) {
                            str = ctx.stylize('[Setter]', 'special');
                        }
                    }
                    if (!hasOwnProperty(visibleKeys, key)) {
                        name = '[' + key + ']';
                    }
                    if (!str) {
                        if (ctx.seen.indexOf(desc.value) < 0) {
                            if (isNull(recurseTimes)) {
                                str = formatValue(ctx, desc.value, null);
                            } else {
                                str = formatValue(ctx, desc.value, recurseTimes - 1);
                            }
                            if (str.indexOf('\n') > -1) {
                                if (array) {
                                    str = str.split('\n').map(function(line) {
                                        return '  ' + line;
                                    }).join('\n').slice(2);
                                } else {
                                    str = '\n' + str.split('\n').map(function(line) {
                                        return '   ' + line;
                                    }).join('\n');
                                }
                            }
                        } else {
                            str = ctx.stylize('[Circular]', 'special');
                        }
                    }
                    if (isUndefined(name)) {
                        if (array && key.match(/^\d+$/)) {
                            return str;
                        }
                        name = JSON.stringify('' + key);
                        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                            name = name.slice(1, -1);
                            name = ctx.stylize(name, 'name');
                        } else {
                            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                            name = ctx.stylize(name, 'string');
                        }
                    }
                    return name + ': ' + str;
                }
                function reduceToSingleString(output, base, braces) {
                    var numLinesEst = 0;
                    var length = output.reduce(function(prev, cur) {
                        numLinesEst++;
                        if (cur.indexOf('\n') >= 0) numLinesEst++;
                        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
                    }, 0);
                    if (length > 60) {
                        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
                    }
                    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
                }
                // NOTE: These type checking functions intentionally don't use `instanceof`
                // because it is fragile and can be easily faked with `Object.create()`.
                exports1.types = __nested_webpack_require_209494__(4895);
                function isArray(ar) {
                    return Array.isArray(ar);
                }
                exports1.isArray = isArray;
                function isBoolean(arg) {
                    return typeof arg === 'boolean';
                }
                exports1.isBoolean = isBoolean;
                function isNull(arg) {
                    return arg === null;
                }
                exports1.isNull = isNull;
                function isNullOrUndefined(arg) {
                    return arg == null;
                }
                exports1.isNullOrUndefined = isNullOrUndefined;
                function isNumber(arg) {
                    return typeof arg === 'number';
                }
                exports1.isNumber = isNumber;
                function isString(arg) {
                    return typeof arg === 'string';
                }
                exports1.isString = isString;
                function isSymbol(arg) {
                    return typeof arg === 'symbol';
                }
                exports1.isSymbol = isSymbol;
                function isUndefined(arg) {
                    return arg === void 0;
                }
                exports1.isUndefined = isUndefined;
                function isRegExp(re) {
                    return isObject(re) && objectToString(re) === '[object RegExp]';
                }
                exports1.isRegExp = isRegExp;
                exports1.types.isRegExp = isRegExp;
                function isObject(arg) {
                    return typeof arg === 'object' && arg !== null;
                }
                exports1.isObject = isObject;
                function isDate(d) {
                    return isObject(d) && objectToString(d) === '[object Date]';
                }
                exports1.isDate = isDate;
                exports1.types.isDate = isDate;
                function isError(e) {
                    return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
                }
                exports1.isError = isError;
                exports1.types.isNativeError = isError;
                function isFunction(arg) {
                    return typeof arg === 'function';
                }
                exports1.isFunction = isFunction;
                function isPrimitive(arg) {
                    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
                    typeof arg === 'undefined';
                }
                exports1.isPrimitive = isPrimitive;
                exports1.isBuffer = __nested_webpack_require_209494__(82);
                function objectToString(o) {
                    return Object.prototype.toString.call(o);
                }
                function pad(n) {
                    return n < 10 ? '0' + n.toString(10) : n.toString(10);
                }
                var months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ];
                // 26 Feb 16:19:34
                function timestamp() {
                    var d = new Date();
                    var time = [
                        pad(d.getHours()),
                        pad(d.getMinutes()),
                        pad(d.getSeconds())
                    ].join(':');
                    return [
                        d.getDate(),
                        months[d.getMonth()],
                        time
                    ].join(' ');
                }
                // log is just a thin wrapper to console.log that prepends a timestamp
                exports1.log = function() {
                    console.log('%s - %s', timestamp(), exports1.format.apply(exports1, arguments));
                };
                /**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */ exports1.inherits = __nested_webpack_require_209494__(1285);
                exports1._extend = function(origin, add) {
                    // Don't do anything if add isn't an object
                    if (!add || !isObject(add)) return origin;
                    var keys = Object.keys(add);
                    var i = keys.length;
                    while(i--){
                        origin[keys[i]] = add[keys[i]];
                    }
                    return origin;
                };
                function hasOwnProperty(obj, prop) {
                    return Object.prototype.hasOwnProperty.call(obj, prop);
                }
                var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;
                exports1.promisify = function promisify(original) {
                    if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');
                    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
                        var fn = original[kCustomPromisifiedSymbol];
                        if (typeof fn !== 'function') {
                            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                        }
                        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                            value: fn,
                            enumerable: false,
                            writable: false,
                            configurable: true
                        });
                        return fn;
                    }
                    function fn() {
                        var promiseResolve, promiseReject;
                        var promise = new Promise(function(resolve, reject) {
                            promiseResolve = resolve;
                            promiseReject = reject;
                        });
                        var args = [];
                        for(var i = 0; i < arguments.length; i++){
                            args.push(arguments[i]);
                        }
                        args.push(function(err, value) {
                            if (err) {
                                promiseReject(err);
                            } else {
                                promiseResolve(value);
                            }
                        });
                        try {
                            original.apply(this, args);
                        } catch (err) {
                            promiseReject(err);
                        }
                        return promise;
                    }
                    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
                    if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                        value: fn,
                        enumerable: false,
                        writable: false,
                        configurable: true
                    });
                    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
                };
                exports1.promisify.custom = kCustomPromisifiedSymbol;
                function callbackifyOnRejected(reason, cb) {
                    // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
                    // Because `null` is a special error value in callbacks which means "no error
                    // occurred", we error-wrap so the callback consumer can distinguish between
                    // "the promise rejected with null" or "the promise fulfilled with undefined".
                    if (!reason) {
                        var newReason = new Error('Promise was rejected with a falsy value');
                        newReason.reason = reason;
                        reason = newReason;
                    }
                    return cb(reason);
                }
                function callbackify(original) {
                    if (typeof original !== 'function') {
                        throw new TypeError('The "original" argument must be of type Function');
                    }
                    // We DO NOT return the promise as it gives the user a false sense that
                    // the promise is actually somehow related to the callback's execution
                    // and that the callback throwing will reject the promise.
                    function callbackified() {
                        var args = [];
                        for(var i = 0; i < arguments.length; i++){
                            args.push(arguments[i]);
                        }
                        var maybeCb = args.pop();
                        if (typeof maybeCb !== 'function') {
                            throw new TypeError('The last argument must be of type Function');
                        }
                        var self = this;
                        var cb = function() {
                            return maybeCb.apply(self, arguments);
                        };
                        // In true node style we process the callback on `nextTick` with all the
                        // implications (stack, `uncaughtException`, `async_hooks`)
                        original.apply(this, args).then(function(ret) {
                            process.nextTick(cb.bind(null, null, ret));
                        }, function(rej) {
                            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
                        });
                    }
                    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
                    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
                    return callbackified;
                }
                exports1.callbackify = callbackify;
            /***/ },
            /***/ 1200: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_241090__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */ module1.exports = __nested_webpack_require_241090__(5953);
            /***/ },
            /***/ 5953: /***/ function(__unused_webpack_module, exports1, __nested_webpack_require_241649__) {
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    var desc = Object.getOwnPropertyDescriptor(m, k);
                    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                        desc = {
                            enumerable: true,
                            get: function() {
                                return m[k];
                            }
                        };
                    }
                    Object.defineProperty(o, k2, desc);
                } : function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    o[k2] = m[k];
                });
                var __exportStar = this && this.__exportStar || function(m, exports1) {
                    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
                };
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.createMessageConnection = exports1.BrowserMessageWriter = exports1.BrowserMessageReader = void 0;
                const ril_1 = __nested_webpack_require_241649__(3632);
                // Install the browser runtime abstract.
                ril_1.default.install();
                const api_1 = __nested_webpack_require_241649__(5247);
                __exportStar(__nested_webpack_require_241649__(5247), exports1);
                class BrowserMessageReader extends api_1.AbstractMessageReader {
                    listen(callback) {
                        return this._onData.event(callback);
                    }
                    constructor(port){
                        super();
                        this._onData = new api_1.Emitter();
                        this._messageListener = (event)=>{
                            this._onData.fire(event.data);
                        };
                        port.addEventListener('error', (event)=>this.fireError(event));
                        port.onmessage = this._messageListener;
                    }
                }
                exports1.BrowserMessageReader = BrowserMessageReader;
                class BrowserMessageWriter extends api_1.AbstractMessageWriter {
                    write(msg) {
                        try {
                            this.port.postMessage(msg);
                            return Promise.resolve();
                        } catch (error) {
                            this.handleError(error, msg);
                            return Promise.reject(error);
                        }
                    }
                    handleError(error, msg) {
                        this.errorCount++;
                        this.fireError(error, msg, this.errorCount);
                    }
                    end() {}
                    constructor(port){
                        super();
                        this.port = port;
                        this.errorCount = 0;
                        port.addEventListener('error', (event)=>this.fireError(event));
                    }
                }
                exports1.BrowserMessageWriter = BrowserMessageWriter;
                function createMessageConnection(reader, writer, logger, options) {
                    if (logger === undefined) {
                        logger = api_1.NullLogger;
                    }
                    if (api_1.ConnectionStrategy.is(options)) {
                        options = {
                            connectionStrategy: options
                        };
                    }
                    return (0, api_1.createMessageConnection)(reader, writer, logger, options);
                }
                exports1.createMessageConnection = createMessageConnection;
            /***/ },
            /***/ 3632: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_246064__)=>{
                "use strict";
                /* provided dependency */ var console = __nested_webpack_require_246064__(3716);
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                const api_1 = __nested_webpack_require_246064__(5247);
                class MessageBuffer extends api_1.AbstractMessageBuffer {
                    emptyBuffer() {
                        return MessageBuffer.emptyBuffer;
                    }
                    fromString(value, _encoding) {
                        return new TextEncoder().encode(value);
                    }
                    toString(value, encoding) {
                        if (encoding === 'ascii') {
                            return this.asciiDecoder.decode(value);
                        } else {
                            return new TextDecoder(encoding).decode(value);
                        }
                    }
                    asNative(buffer, length) {
                        if (length === undefined) {
                            return buffer;
                        } else {
                            return buffer.slice(0, length);
                        }
                    }
                    allocNative(length) {
                        return new Uint8Array(length);
                    }
                    constructor(encoding = 'utf-8'){
                        super(encoding);
                        this.asciiDecoder = new TextDecoder('ascii');
                    }
                }
                MessageBuffer.emptyBuffer = new Uint8Array(0);
                class ReadableStreamWrapper {
                    onClose(listener) {
                        this.socket.addEventListener('close', listener);
                        return api_1.Disposable.create(()=>this.socket.removeEventListener('close', listener));
                    }
                    onError(listener) {
                        this.socket.addEventListener('error', listener);
                        return api_1.Disposable.create(()=>this.socket.removeEventListener('error', listener));
                    }
                    onEnd(listener) {
                        this.socket.addEventListener('end', listener);
                        return api_1.Disposable.create(()=>this.socket.removeEventListener('end', listener));
                    }
                    onData(listener) {
                        return this._onData.event(listener);
                    }
                    constructor(socket){
                        this.socket = socket;
                        this._onData = new api_1.Emitter();
                        this._messageListener = (event)=>{
                            const blob = event.data;
                            blob.arrayBuffer().then((buffer)=>{
                                this._onData.fire(new Uint8Array(buffer));
                            }, ()=>{
                                (0, api_1.RAL)().console.error(`Converting blob to array buffer failed.`);
                            });
                        };
                        this.socket.addEventListener('message', this._messageListener);
                    }
                }
                class WritableStreamWrapper {
                    onClose(listener) {
                        this.socket.addEventListener('close', listener);
                        return api_1.Disposable.create(()=>this.socket.removeEventListener('close', listener));
                    }
                    onError(listener) {
                        this.socket.addEventListener('error', listener);
                        return api_1.Disposable.create(()=>this.socket.removeEventListener('error', listener));
                    }
                    onEnd(listener) {
                        this.socket.addEventListener('end', listener);
                        return api_1.Disposable.create(()=>this.socket.removeEventListener('end', listener));
                    }
                    write(data, encoding) {
                        if (typeof data === 'string') {
                            if (encoding !== undefined && encoding !== 'utf-8') {
                                throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${encoding}`);
                            }
                            this.socket.send(data);
                        } else {
                            this.socket.send(data);
                        }
                        return Promise.resolve();
                    }
                    end() {
                        this.socket.close();
                    }
                    constructor(socket){
                        this.socket = socket;
                    }
                }
                const _textEncoder = new TextEncoder();
                const _ril = Object.freeze({
                    messageBuffer: Object.freeze({
                        create: (encoding)=>new MessageBuffer(encoding)
                    }),
                    applicationJson: Object.freeze({
                        encoder: Object.freeze({
                            name: 'application/json',
                            encode: (msg, options)=>{
                                if (options.charset !== 'utf-8') {
                                    throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${options.charset}`);
                                }
                                return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, undefined, 0)));
                            }
                        }),
                        decoder: Object.freeze({
                            name: 'application/json',
                            decode: (buffer, options)=>{
                                if (!(buffer instanceof Uint8Array)) {
                                    throw new Error(`In a Browser environments only Uint8Arrays are supported.`);
                                }
                                return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
                            }
                        })
                    }),
                    stream: Object.freeze({
                        asReadableStream: (socket)=>new ReadableStreamWrapper(socket),
                        asWritableStream: (socket)=>new WritableStreamWrapper(socket)
                    }),
                    console: console,
                    timer: Object.freeze({
                        setTimeout (callback, ms, ...args) {
                            const handle = setTimeout(callback, ms, ...args);
                            return {
                                dispose: ()=>clearTimeout(handle)
                            };
                        },
                        setImmediate (callback, ...args) {
                            const handle = setTimeout(callback, 0, ...args);
                            return {
                                dispose: ()=>clearTimeout(handle)
                            };
                        },
                        setInterval (callback, ms, ...args) {
                            const handle = setInterval(callback, ms, ...args);
                            return {
                                dispose: ()=>clearInterval(handle)
                            };
                        }
                    })
                });
                function RIL() {
                    return _ril;
                }
                (function(RIL) {
                    function install() {
                        api_1.RAL.install(_ril);
                    }
                    RIL.install = install;
                })(RIL || (RIL = {}));
                exports1["default"] = RIL;
            /***/ },
            /***/ 5247: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_254443__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ /// <reference path="../../typings/thenable.d.ts" />
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ProgressType = exports1.ProgressToken = exports1.createMessageConnection = exports1.NullLogger = exports1.ConnectionOptions = exports1.ConnectionStrategy = exports1.AbstractMessageBuffer = exports1.WriteableStreamMessageWriter = exports1.AbstractMessageWriter = exports1.MessageWriter = exports1.ReadableStreamMessageReader = exports1.AbstractMessageReader = exports1.MessageReader = exports1.SharedArrayReceiverStrategy = exports1.SharedArraySenderStrategy = exports1.CancellationToken = exports1.CancellationTokenSource = exports1.Emitter = exports1.Event = exports1.Disposable = exports1.LRUCache = exports1.Touch = exports1.LinkedMap = exports1.ParameterStructures = exports1.NotificationType9 = exports1.NotificationType8 = exports1.NotificationType7 = exports1.NotificationType6 = exports1.NotificationType5 = exports1.NotificationType4 = exports1.NotificationType3 = exports1.NotificationType2 = exports1.NotificationType1 = exports1.NotificationType0 = exports1.NotificationType = exports1.ErrorCodes = exports1.ResponseError = exports1.RequestType9 = exports1.RequestType8 = exports1.RequestType7 = exports1.RequestType6 = exports1.RequestType5 = exports1.RequestType4 = exports1.RequestType3 = exports1.RequestType2 = exports1.RequestType1 = exports1.RequestType0 = exports1.RequestType = exports1.Message = exports1.RAL = void 0;
                exports1.MessageStrategy = exports1.CancellationStrategy = exports1.CancellationSenderStrategy = exports1.CancellationReceiverStrategy = exports1.ConnectionError = exports1.ConnectionErrors = exports1.LogTraceNotification = exports1.SetTraceNotification = exports1.TraceFormat = exports1.TraceValues = exports1.Trace = void 0;
                const messages_1 = __nested_webpack_require_254443__(9141);
                Object.defineProperty(exports1, "Message", {
                    enumerable: true,
                    get: function() {
                        return messages_1.Message;
                    }
                });
                Object.defineProperty(exports1, "RequestType", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType;
                    }
                });
                Object.defineProperty(exports1, "RequestType0", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType0;
                    }
                });
                Object.defineProperty(exports1, "RequestType1", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType1;
                    }
                });
                Object.defineProperty(exports1, "RequestType2", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType2;
                    }
                });
                Object.defineProperty(exports1, "RequestType3", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType3;
                    }
                });
                Object.defineProperty(exports1, "RequestType4", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType4;
                    }
                });
                Object.defineProperty(exports1, "RequestType5", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType5;
                    }
                });
                Object.defineProperty(exports1, "RequestType6", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType6;
                    }
                });
                Object.defineProperty(exports1, "RequestType7", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType7;
                    }
                });
                Object.defineProperty(exports1, "RequestType8", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType8;
                    }
                });
                Object.defineProperty(exports1, "RequestType9", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType9;
                    }
                });
                Object.defineProperty(exports1, "ResponseError", {
                    enumerable: true,
                    get: function() {
                        return messages_1.ResponseError;
                    }
                });
                Object.defineProperty(exports1, "ErrorCodes", {
                    enumerable: true,
                    get: function() {
                        return messages_1.ErrorCodes;
                    }
                });
                Object.defineProperty(exports1, "NotificationType", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType;
                    }
                });
                Object.defineProperty(exports1, "NotificationType0", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType0;
                    }
                });
                Object.defineProperty(exports1, "NotificationType1", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType1;
                    }
                });
                Object.defineProperty(exports1, "NotificationType2", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType2;
                    }
                });
                Object.defineProperty(exports1, "NotificationType3", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType3;
                    }
                });
                Object.defineProperty(exports1, "NotificationType4", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType4;
                    }
                });
                Object.defineProperty(exports1, "NotificationType5", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType5;
                    }
                });
                Object.defineProperty(exports1, "NotificationType6", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType6;
                    }
                });
                Object.defineProperty(exports1, "NotificationType7", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType7;
                    }
                });
                Object.defineProperty(exports1, "NotificationType8", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType8;
                    }
                });
                Object.defineProperty(exports1, "NotificationType9", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType9;
                    }
                });
                Object.defineProperty(exports1, "ParameterStructures", {
                    enumerable: true,
                    get: function() {
                        return messages_1.ParameterStructures;
                    }
                });
                const linkedMap_1 = __nested_webpack_require_254443__(7040);
                Object.defineProperty(exports1, "LinkedMap", {
                    enumerable: true,
                    get: function() {
                        return linkedMap_1.LinkedMap;
                    }
                });
                Object.defineProperty(exports1, "LRUCache", {
                    enumerable: true,
                    get: function() {
                        return linkedMap_1.LRUCache;
                    }
                });
                Object.defineProperty(exports1, "Touch", {
                    enumerable: true,
                    get: function() {
                        return linkedMap_1.Touch;
                    }
                });
                const disposable_1 = __nested_webpack_require_254443__(8437);
                Object.defineProperty(exports1, "Disposable", {
                    enumerable: true,
                    get: function() {
                        return disposable_1.Disposable;
                    }
                });
                const events_1 = __nested_webpack_require_254443__(5165);
                Object.defineProperty(exports1, "Event", {
                    enumerable: true,
                    get: function() {
                        return events_1.Event;
                    }
                });
                Object.defineProperty(exports1, "Emitter", {
                    enumerable: true,
                    get: function() {
                        return events_1.Emitter;
                    }
                });
                const cancellation_1 = __nested_webpack_require_254443__(415);
                Object.defineProperty(exports1, "CancellationTokenSource", {
                    enumerable: true,
                    get: function() {
                        return cancellation_1.CancellationTokenSource;
                    }
                });
                Object.defineProperty(exports1, "CancellationToken", {
                    enumerable: true,
                    get: function() {
                        return cancellation_1.CancellationToken;
                    }
                });
                const sharedArrayCancellation_1 = __nested_webpack_require_254443__(178);
                Object.defineProperty(exports1, "SharedArraySenderStrategy", {
                    enumerable: true,
                    get: function() {
                        return sharedArrayCancellation_1.SharedArraySenderStrategy;
                    }
                });
                Object.defineProperty(exports1, "SharedArrayReceiverStrategy", {
                    enumerable: true,
                    get: function() {
                        return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
                    }
                });
                const messageReader_1 = __nested_webpack_require_254443__(451);
                Object.defineProperty(exports1, "MessageReader", {
                    enumerable: true,
                    get: function() {
                        return messageReader_1.MessageReader;
                    }
                });
                Object.defineProperty(exports1, "AbstractMessageReader", {
                    enumerable: true,
                    get: function() {
                        return messageReader_1.AbstractMessageReader;
                    }
                });
                Object.defineProperty(exports1, "ReadableStreamMessageReader", {
                    enumerable: true,
                    get: function() {
                        return messageReader_1.ReadableStreamMessageReader;
                    }
                });
                const messageWriter_1 = __nested_webpack_require_254443__(1251);
                Object.defineProperty(exports1, "MessageWriter", {
                    enumerable: true,
                    get: function() {
                        return messageWriter_1.MessageWriter;
                    }
                });
                Object.defineProperty(exports1, "AbstractMessageWriter", {
                    enumerable: true,
                    get: function() {
                        return messageWriter_1.AbstractMessageWriter;
                    }
                });
                Object.defineProperty(exports1, "WriteableStreamMessageWriter", {
                    enumerable: true,
                    get: function() {
                        return messageWriter_1.WriteableStreamMessageWriter;
                    }
                });
                const messageBuffer_1 = __nested_webpack_require_254443__(8652);
                Object.defineProperty(exports1, "AbstractMessageBuffer", {
                    enumerable: true,
                    get: function() {
                        return messageBuffer_1.AbstractMessageBuffer;
                    }
                });
                const connection_1 = __nested_webpack_require_254443__(1908);
                Object.defineProperty(exports1, "ConnectionStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionStrategy;
                    }
                });
                Object.defineProperty(exports1, "ConnectionOptions", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionOptions;
                    }
                });
                Object.defineProperty(exports1, "NullLogger", {
                    enumerable: true,
                    get: function() {
                        return connection_1.NullLogger;
                    }
                });
                Object.defineProperty(exports1, "createMessageConnection", {
                    enumerable: true,
                    get: function() {
                        return connection_1.createMessageConnection;
                    }
                });
                Object.defineProperty(exports1, "ProgressToken", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ProgressToken;
                    }
                });
                Object.defineProperty(exports1, "ProgressType", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ProgressType;
                    }
                });
                Object.defineProperty(exports1, "Trace", {
                    enumerable: true,
                    get: function() {
                        return connection_1.Trace;
                    }
                });
                Object.defineProperty(exports1, "TraceValues", {
                    enumerable: true,
                    get: function() {
                        return connection_1.TraceValues;
                    }
                });
                Object.defineProperty(exports1, "TraceFormat", {
                    enumerable: true,
                    get: function() {
                        return connection_1.TraceFormat;
                    }
                });
                Object.defineProperty(exports1, "SetTraceNotification", {
                    enumerable: true,
                    get: function() {
                        return connection_1.SetTraceNotification;
                    }
                });
                Object.defineProperty(exports1, "LogTraceNotification", {
                    enumerable: true,
                    get: function() {
                        return connection_1.LogTraceNotification;
                    }
                });
                Object.defineProperty(exports1, "ConnectionErrors", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionErrors;
                    }
                });
                Object.defineProperty(exports1, "ConnectionError", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionError;
                    }
                });
                Object.defineProperty(exports1, "CancellationReceiverStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.CancellationReceiverStrategy;
                    }
                });
                Object.defineProperty(exports1, "CancellationSenderStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.CancellationSenderStrategy;
                    }
                });
                Object.defineProperty(exports1, "CancellationStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.CancellationStrategy;
                    }
                });
                Object.defineProperty(exports1, "MessageStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.MessageStrategy;
                    }
                });
                const ral_1 = __nested_webpack_require_254443__(5706);
                exports1.RAL = ral_1.default;
            /***/ },
            /***/ 415: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_272504__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.CancellationTokenSource = exports1.CancellationToken = void 0;
                const ral_1 = __nested_webpack_require_272504__(5706);
                const Is = __nested_webpack_require_272504__(8811);
                const events_1 = __nested_webpack_require_272504__(5165);
                var CancellationToken;
                (function(CancellationToken) {
                    CancellationToken.None = Object.freeze({
                        isCancellationRequested: false,
                        onCancellationRequested: events_1.Event.None
                    });
                    CancellationToken.Cancelled = Object.freeze({
                        isCancellationRequested: true,
                        onCancellationRequested: events_1.Event.None
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && (candidate === CancellationToken.None || candidate === CancellationToken.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
                    }
                    CancellationToken.is = is;
                })(CancellationToken = exports1.CancellationToken || (exports1.CancellationToken = {}));
                const shortcutEvent = Object.freeze(function(callback, context) {
                    const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
                    return {
                        dispose () {
                            handle.dispose();
                        }
                    };
                });
                class MutableToken {
                    cancel() {
                        if (!this._isCancelled) {
                            this._isCancelled = true;
                            if (this._emitter) {
                                this._emitter.fire(undefined);
                                this.dispose();
                            }
                        }
                    }
                    get isCancellationRequested() {
                        return this._isCancelled;
                    }
                    get onCancellationRequested() {
                        if (this._isCancelled) {
                            return shortcutEvent;
                        }
                        if (!this._emitter) {
                            this._emitter = new events_1.Emitter();
                        }
                        return this._emitter.event;
                    }
                    dispose() {
                        if (this._emitter) {
                            this._emitter.dispose();
                            this._emitter = undefined;
                        }
                    }
                    constructor(){
                        this._isCancelled = false;
                    }
                }
                class CancellationTokenSource {
                    get token() {
                        if (!this._token) {
                            // be lazy and create the token only when
                            // actually needed
                            this._token = new MutableToken();
                        }
                        return this._token;
                    }
                    cancel() {
                        if (!this._token) {
                            // save an object by returning the default
                            // cancelled token when cancellation happens
                            // before someone asks for the token
                            this._token = CancellationToken.Cancelled;
                        } else {
                            this._token.cancel();
                        }
                    }
                    dispose() {
                        if (!this._token) {
                            // ensure to initialize with an empty token if we had none
                            this._token = CancellationToken.None;
                        } else if (this._token instanceof MutableToken) {
                            // actually dispose
                            this._token.dispose();
                        }
                    }
                }
                exports1.CancellationTokenSource = CancellationTokenSource;
            /***/ },
            /***/ 1908: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_277438__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.createMessageConnection = exports1.ConnectionOptions = exports1.MessageStrategy = exports1.CancellationStrategy = exports1.CancellationSenderStrategy = exports1.CancellationReceiverStrategy = exports1.RequestCancellationReceiverStrategy = exports1.IdCancellationReceiverStrategy = exports1.ConnectionStrategy = exports1.ConnectionError = exports1.ConnectionErrors = exports1.LogTraceNotification = exports1.SetTraceNotification = exports1.TraceFormat = exports1.TraceValues = exports1.Trace = exports1.NullLogger = exports1.ProgressType = exports1.ProgressToken = void 0;
                const ral_1 = __nested_webpack_require_277438__(5706);
                const Is = __nested_webpack_require_277438__(8811);
                const messages_1 = __nested_webpack_require_277438__(9141);
                const linkedMap_1 = __nested_webpack_require_277438__(7040);
                const events_1 = __nested_webpack_require_277438__(5165);
                const cancellation_1 = __nested_webpack_require_277438__(415);
                var CancelNotification;
                (function(CancelNotification) {
                    CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
                })(CancelNotification || (CancelNotification = {}));
                var ProgressToken;
                (function(ProgressToken) {
                    function is(value) {
                        return typeof value === 'string' || typeof value === 'number';
                    }
                    ProgressToken.is = is;
                })(ProgressToken = exports1.ProgressToken || (exports1.ProgressToken = {}));
                var ProgressNotification;
                (function(ProgressNotification) {
                    ProgressNotification.type = new messages_1.NotificationType('$/progress');
                })(ProgressNotification || (ProgressNotification = {}));
                class ProgressType {
                    constructor(){}
                }
                exports1.ProgressType = ProgressType;
                var StarRequestHandler;
                (function(StarRequestHandler) {
                    function is(value) {
                        return Is.func(value);
                    }
                    StarRequestHandler.is = is;
                })(StarRequestHandler || (StarRequestHandler = {}));
                exports1.NullLogger = Object.freeze({
                    error: ()=>{},
                    warn: ()=>{},
                    info: ()=>{},
                    log: ()=>{}
                });
                var Trace;
                (function(Trace) {
                    Trace[Trace["Off"] = 0] = "Off";
                    Trace[Trace["Messages"] = 1] = "Messages";
                    Trace[Trace["Compact"] = 2] = "Compact";
                    Trace[Trace["Verbose"] = 3] = "Verbose";
                })(Trace = exports1.Trace || (exports1.Trace = {}));
                var TraceValues;
                (function(TraceValues) {
                    /**
     * Turn tracing off.
     */ TraceValues.Off = 'off';
                    /**
     * Trace messages only.
     */ TraceValues.Messages = 'messages';
                    /**
     * Compact message tracing.
     */ TraceValues.Compact = 'compact';
                    /**
     * Verbose message tracing.
     */ TraceValues.Verbose = 'verbose';
                })(TraceValues = exports1.TraceValues || (exports1.TraceValues = {}));
                (function(Trace) {
                    function fromString(value) {
                        if (!Is.string(value)) {
                            return Trace.Off;
                        }
                        value = value.toLowerCase();
                        switch(value){
                            case 'off':
                                return Trace.Off;
                            case 'messages':
                                return Trace.Messages;
                            case 'compact':
                                return Trace.Compact;
                            case 'verbose':
                                return Trace.Verbose;
                            default:
                                return Trace.Off;
                        }
                    }
                    Trace.fromString = fromString;
                    function toString(value) {
                        switch(value){
                            case Trace.Off:
                                return 'off';
                            case Trace.Messages:
                                return 'messages';
                            case Trace.Compact:
                                return 'compact';
                            case Trace.Verbose:
                                return 'verbose';
                            default:
                                return 'off';
                        }
                    }
                    Trace.toString = toString;
                })(Trace = exports1.Trace || (exports1.Trace = {}));
                var TraceFormat;
                (function(TraceFormat) {
                    TraceFormat["Text"] = "text";
                    TraceFormat["JSON"] = "json";
                })(TraceFormat = exports1.TraceFormat || (exports1.TraceFormat = {}));
                (function(TraceFormat) {
                    function fromString(value) {
                        if (!Is.string(value)) {
                            return TraceFormat.Text;
                        }
                        value = value.toLowerCase();
                        if (value === 'json') {
                            return TraceFormat.JSON;
                        } else {
                            return TraceFormat.Text;
                        }
                    }
                    TraceFormat.fromString = fromString;
                })(TraceFormat = exports1.TraceFormat || (exports1.TraceFormat = {}));
                var SetTraceNotification;
                (function(SetTraceNotification) {
                    SetTraceNotification.type = new messages_1.NotificationType('$/setTrace');
                })(SetTraceNotification = exports1.SetTraceNotification || (exports1.SetTraceNotification = {}));
                var LogTraceNotification;
                (function(LogTraceNotification) {
                    LogTraceNotification.type = new messages_1.NotificationType('$/logTrace');
                })(LogTraceNotification = exports1.LogTraceNotification || (exports1.LogTraceNotification = {}));
                var ConnectionErrors;
                (function(ConnectionErrors) {
                    /**
     * The connection is closed.
     */ ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
                    /**
     * The connection got disposed.
     */ ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
                    /**
     * The connection is already in listening mode.
     */ ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
                })(ConnectionErrors = exports1.ConnectionErrors || (exports1.ConnectionErrors = {}));
                class ConnectionError extends Error {
                    constructor(code, message){
                        super(message);
                        this.code = code;
                        Object.setPrototypeOf(this, ConnectionError.prototype);
                    }
                }
                exports1.ConnectionError = ConnectionError;
                var ConnectionStrategy;
                (function(ConnectionStrategy) {
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.func(candidate.cancelUndispatched);
                    }
                    ConnectionStrategy.is = is;
                })(ConnectionStrategy = exports1.ConnectionStrategy || (exports1.ConnectionStrategy = {}));
                var IdCancellationReceiverStrategy;
                (function(IdCancellationReceiverStrategy) {
                    function is(value) {
                        const candidate = value;
                        return candidate && (candidate.kind === undefined || candidate.kind === 'id') && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
                    }
                    IdCancellationReceiverStrategy.is = is;
                })(IdCancellationReceiverStrategy = exports1.IdCancellationReceiverStrategy || (exports1.IdCancellationReceiverStrategy = {}));
                var RequestCancellationReceiverStrategy;
                (function(RequestCancellationReceiverStrategy) {
                    function is(value) {
                        const candidate = value;
                        return candidate && candidate.kind === 'request' && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === undefined || Is.func(candidate.dispose));
                    }
                    RequestCancellationReceiverStrategy.is = is;
                })(RequestCancellationReceiverStrategy = exports1.RequestCancellationReceiverStrategy || (exports1.RequestCancellationReceiverStrategy = {}));
                var CancellationReceiverStrategy;
                (function(CancellationReceiverStrategy) {
                    CancellationReceiverStrategy.Message = Object.freeze({
                        createCancellationTokenSource (_) {
                            return new cancellation_1.CancellationTokenSource();
                        }
                    });
                    function is(value) {
                        return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
                    }
                    CancellationReceiverStrategy.is = is;
                })(CancellationReceiverStrategy = exports1.CancellationReceiverStrategy || (exports1.CancellationReceiverStrategy = {}));
                var CancellationSenderStrategy;
                (function(CancellationSenderStrategy) {
                    CancellationSenderStrategy.Message = Object.freeze({
                        sendCancellation (conn, id) {
                            return conn.sendNotification(CancelNotification.type, {
                                id
                            });
                        },
                        cleanup (_) {}
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
                    }
                    CancellationSenderStrategy.is = is;
                })(CancellationSenderStrategy = exports1.CancellationSenderStrategy || (exports1.CancellationSenderStrategy = {}));
                var CancellationStrategy;
                (function(CancellationStrategy) {
                    CancellationStrategy.Message = Object.freeze({
                        receiver: CancellationReceiverStrategy.Message,
                        sender: CancellationSenderStrategy.Message
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
                    }
                    CancellationStrategy.is = is;
                })(CancellationStrategy = exports1.CancellationStrategy || (exports1.CancellationStrategy = {}));
                var MessageStrategy;
                (function(MessageStrategy) {
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.func(candidate.handleMessage);
                    }
                    MessageStrategy.is = is;
                })(MessageStrategy = exports1.MessageStrategy || (exports1.MessageStrategy = {}));
                var ConnectionOptions;
                (function(ConnectionOptions) {
                    function is(value) {
                        const candidate = value;
                        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
                    }
                    ConnectionOptions.is = is;
                })(ConnectionOptions = exports1.ConnectionOptions || (exports1.ConnectionOptions = {}));
                var ConnectionState;
                (function(ConnectionState) {
                    ConnectionState[ConnectionState["New"] = 1] = "New";
                    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
                    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
                    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
                })(ConnectionState || (ConnectionState = {}));
                function createMessageConnection(messageReader, messageWriter, _logger, options) {
                    const logger = _logger !== undefined ? _logger : exports1.NullLogger;
                    let sequenceNumber = 0;
                    let notificationSequenceNumber = 0;
                    let unknownResponseSequenceNumber = 0;
                    const version = '2.0';
                    let starRequestHandler = undefined;
                    const requestHandlers = new Map();
                    let starNotificationHandler = undefined;
                    const notificationHandlers = new Map();
                    const progressHandlers = new Map();
                    let timer;
                    let messageQueue = new linkedMap_1.LinkedMap();
                    let responsePromises = new Map();
                    let knownCanceledRequests = new Set();
                    let requestTokens = new Map();
                    let trace = Trace.Off;
                    let traceFormat = TraceFormat.Text;
                    let tracer;
                    let state = ConnectionState.New;
                    const errorEmitter = new events_1.Emitter();
                    const closeEmitter = new events_1.Emitter();
                    const unhandledNotificationEmitter = new events_1.Emitter();
                    const unhandledProgressEmitter = new events_1.Emitter();
                    const disposeEmitter = new events_1.Emitter();
                    const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
                    function createRequestQueueKey(id) {
                        if (id === null) {
                            throw new Error(`Can't send requests with id null since the response can't be correlated.`);
                        }
                        return 'req-' + id.toString();
                    }
                    function createResponseQueueKey(id) {
                        if (id === null) {
                            return 'res-unknown-' + (++unknownResponseSequenceNumber).toString();
                        } else {
                            return 'res-' + id.toString();
                        }
                    }
                    function createNotificationQueueKey() {
                        return 'not-' + (++notificationSequenceNumber).toString();
                    }
                    function addMessageToQueue(queue, message) {
                        if (messages_1.Message.isRequest(message)) {
                            queue.set(createRequestQueueKey(message.id), message);
                        } else if (messages_1.Message.isResponse(message)) {
                            queue.set(createResponseQueueKey(message.id), message);
                        } else {
                            queue.set(createNotificationQueueKey(), message);
                        }
                    }
                    function cancelUndispatched(_message) {
                        return undefined;
                    }
                    function isListening() {
                        return state === ConnectionState.Listening;
                    }
                    function isClosed() {
                        return state === ConnectionState.Closed;
                    }
                    function isDisposed() {
                        return state === ConnectionState.Disposed;
                    }
                    function closeHandler() {
                        if (state === ConnectionState.New || state === ConnectionState.Listening) {
                            state = ConnectionState.Closed;
                            closeEmitter.fire(undefined);
                        }
                    // If the connection is disposed don't sent close events.
                    }
                    function readErrorHandler(error) {
                        errorEmitter.fire([
                            error,
                            undefined,
                            undefined
                        ]);
                    }
                    function writeErrorHandler(data) {
                        errorEmitter.fire(data);
                    }
                    messageReader.onClose(closeHandler);
                    messageReader.onError(readErrorHandler);
                    messageWriter.onClose(closeHandler);
                    messageWriter.onError(writeErrorHandler);
                    function triggerMessageQueue() {
                        if (timer || messageQueue.size === 0) {
                            return;
                        }
                        timer = (0, ral_1.default)().timer.setImmediate(()=>{
                            timer = undefined;
                            processMessageQueue();
                        });
                    }
                    function handleMessage(message) {
                        if (messages_1.Message.isRequest(message)) {
                            handleRequest(message);
                        } else if (messages_1.Message.isNotification(message)) {
                            handleNotification(message);
                        } else if (messages_1.Message.isResponse(message)) {
                            handleResponse(message);
                        } else {
                            handleInvalidMessage(message);
                        }
                    }
                    function processMessageQueue() {
                        if (messageQueue.size === 0) {
                            return;
                        }
                        const message = messageQueue.shift();
                        try {
                            var _options;
                            const messageStrategy = (_options = options) === null || _options === void 0 ? void 0 : _options.messageStrategy;
                            if (MessageStrategy.is(messageStrategy)) {
                                messageStrategy.handleMessage(message, handleMessage);
                            } else {
                                handleMessage(message);
                            }
                        } finally{
                            triggerMessageQueue();
                        }
                    }
                    const callback = (message)=>{
                        try {
                            // We have received a cancellation message. Check if the message is still in the queue
                            // and cancel it if allowed to do so.
                            if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
                                const cancelId = message.params.id;
                                const key = createRequestQueueKey(cancelId);
                                const toCancel = messageQueue.get(key);
                                if (messages_1.Message.isRequest(toCancel)) {
                                    var _options;
                                    const strategy = (_options = options) === null || _options === void 0 ? void 0 : _options.connectionStrategy;
                                    const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                                    if (response && (response.error !== undefined || response.result !== undefined)) {
                                        messageQueue.delete(key);
                                        requestTokens.delete(cancelId);
                                        response.id = toCancel.id;
                                        traceSendingResponse(response, message.method, Date.now());
                                        messageWriter.write(response).catch(()=>logger.error(`Sending response for canceled message failed.`));
                                        return;
                                    }
                                }
                                const cancellationToken = requestTokens.get(cancelId);
                                // The request is already running. Cancel the token
                                if (cancellationToken !== undefined) {
                                    cancellationToken.cancel();
                                    traceReceivedNotification(message);
                                    return;
                                } else {
                                    // Remember the cancel but still queue the message to
                                    // clean up state in process message.
                                    knownCanceledRequests.add(cancelId);
                                }
                            }
                            addMessageToQueue(messageQueue, message);
                        } finally{
                            triggerMessageQueue();
                        }
                    };
                    function handleRequest(requestMessage) {
                        if (isDisposed()) {
                            // we return here silently since we fired an event when the
                            // connection got disposed.
                            return;
                        }
                        function reply(resultOrError, method, startTime) {
                            const message = {
                                jsonrpc: version,
                                id: requestMessage.id
                            };
                            if (resultOrError instanceof messages_1.ResponseError) {
                                message.error = resultOrError.toJson();
                            } else {
                                message.result = resultOrError === undefined ? null : resultOrError;
                            }
                            traceSendingResponse(message, method, startTime);
                            messageWriter.write(message).catch(()=>logger.error(`Sending response failed.`));
                        }
                        function replyError(error, method, startTime) {
                            const message = {
                                jsonrpc: version,
                                id: requestMessage.id,
                                error: error.toJson()
                            };
                            traceSendingResponse(message, method, startTime);
                            messageWriter.write(message).catch(()=>logger.error(`Sending response failed.`));
                        }
                        function replySuccess(result, method, startTime) {
                            // The JSON RPC defines that a response must either have a result or an error
                            // So we can't treat undefined as a valid response result.
                            if (result === undefined) {
                                result = null;
                            }
                            const message = {
                                jsonrpc: version,
                                id: requestMessage.id,
                                result: result
                            };
                            traceSendingResponse(message, method, startTime);
                            messageWriter.write(message).catch(()=>logger.error(`Sending response failed.`));
                        }
                        traceReceivedRequest(requestMessage);
                        const element = requestHandlers.get(requestMessage.method);
                        let type;
                        let requestHandler;
                        if (element) {
                            type = element.type;
                            requestHandler = element.handler;
                        }
                        const startTime = Date.now();
                        if (requestHandler || starRequestHandler) {
                            var _requestMessage_id;
                            const tokenKey = (_requestMessage_id = requestMessage.id) !== null && _requestMessage_id !== void 0 ? _requestMessage_id : String(Date.now()); //
                            const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
                            if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
                                cancellationSource.cancel();
                            }
                            if (requestMessage.id !== null) {
                                requestTokens.set(tokenKey, cancellationSource);
                            }
                            try {
                                let handlerResult;
                                if (requestHandler) {
                                    if (requestMessage.params === undefined) {
                                        if (type !== undefined && type.numberOfParams !== 0) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                                            return;
                                        }
                                        handlerResult = requestHandler(cancellationSource.token);
                                    } else if (Array.isArray(requestMessage.params)) {
                                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byName) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                                            return;
                                        }
                                        handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
                                    } else {
                                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                                            return;
                                        }
                                        handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
                                    }
                                } else if (starRequestHandler) {
                                    handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                                }
                                const promise = handlerResult;
                                if (!handlerResult) {
                                    requestTokens.delete(tokenKey);
                                    replySuccess(handlerResult, requestMessage.method, startTime);
                                } else if (promise.then) {
                                    promise.then((resultOrError)=>{
                                        requestTokens.delete(tokenKey);
                                        reply(resultOrError, requestMessage.method, startTime);
                                    }, (error)=>{
                                        requestTokens.delete(tokenKey);
                                        if (error instanceof messages_1.ResponseError) {
                                            replyError(error, requestMessage.method, startTime);
                                        } else if (error && Is.string(error.message)) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                                        } else {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                                        }
                                    });
                                } else {
                                    requestTokens.delete(tokenKey);
                                    reply(handlerResult, requestMessage.method, startTime);
                                }
                            } catch (error) {
                                requestTokens.delete(tokenKey);
                                if (error instanceof messages_1.ResponseError) {
                                    reply(error, requestMessage.method, startTime);
                                } else if (error && Is.string(error.message)) {
                                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                                } else {
                                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                                }
                            }
                        } else {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
                        }
                    }
                    function handleResponse(responseMessage) {
                        if (isDisposed()) {
                            // See handle request.
                            return;
                        }
                        if (responseMessage.id === null) {
                            if (responseMessage.error) {
                                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
                            } else {
                                logger.error(`Received response message without id. No further error information provided.`);
                            }
                        } else {
                            const key = responseMessage.id;
                            const responsePromise = responsePromises.get(key);
                            traceReceivedResponse(responseMessage, responsePromise);
                            if (responsePromise !== undefined) {
                                responsePromises.delete(key);
                                try {
                                    if (responseMessage.error) {
                                        const error = responseMessage.error;
                                        responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                                    } else if (responseMessage.result !== undefined) {
                                        responsePromise.resolve(responseMessage.result);
                                    } else {
                                        throw new Error('Should never happen.');
                                    }
                                } catch (error) {
                                    if (error.message) {
                                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                                    } else {
                                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                                    }
                                }
                            }
                        }
                    }
                    function handleNotification(message) {
                        if (isDisposed()) {
                            // See handle request.
                            return;
                        }
                        let type = undefined;
                        let notificationHandler;
                        if (message.method === CancelNotification.type.method) {
                            const cancelId = message.params.id;
                            knownCanceledRequests.delete(cancelId);
                            traceReceivedNotification(message);
                            return;
                        } else {
                            const element = notificationHandlers.get(message.method);
                            if (element) {
                                notificationHandler = element.handler;
                                type = element.type;
                            }
                        }
                        if (notificationHandler || starNotificationHandler) {
                            try {
                                traceReceivedNotification(message);
                                if (notificationHandler) {
                                    if (message.params === undefined) {
                                        if (type !== undefined) {
                                            if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                                                logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                                            }
                                        }
                                        notificationHandler();
                                    } else if (Array.isArray(message.params)) {
                                        // There are JSON-RPC libraries that send progress message as positional params although
                                        // specified as named. So convert them if this is the case.
                                        const params = message.params;
                                        if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                                            notificationHandler({
                                                token: params[0],
                                                value: params[1]
                                            });
                                        } else {
                                            if (type !== undefined) {
                                                if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                                                    logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                                                }
                                                if (type.numberOfParams !== message.params.length) {
                                                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                                                }
                                            }
                                            notificationHandler(...params);
                                        }
                                    } else {
                                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                                            logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                                        }
                                        notificationHandler(message.params);
                                    }
                                } else if (starNotificationHandler) {
                                    starNotificationHandler(message.method, message.params);
                                }
                            } catch (error) {
                                if (error.message) {
                                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                                } else {
                                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                                }
                            }
                        } else {
                            unhandledNotificationEmitter.fire(message);
                        }
                    }
                    function handleInvalidMessage(message) {
                        if (!message) {
                            logger.error('Received empty message.');
                            return;
                        }
                        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
                        // Test whether we find an id to reject the promise
                        const responseMessage = message;
                        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
                            const key = responseMessage.id;
                            const responseHandler = responsePromises.get(key);
                            if (responseHandler) {
                                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
                            }
                        }
                    }
                    function stringifyTrace(params) {
                        if (params === undefined || params === null) {
                            return undefined;
                        }
                        switch(trace){
                            case Trace.Verbose:
                                return JSON.stringify(params, null, 4);
                            case Trace.Compact:
                                return JSON.stringify(params);
                            default:
                                return undefined;
                        }
                    }
                    function traceSendingRequest(message) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                                data = `Params: ${stringifyTrace(message.params)}\n\n`;
                            }
                            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
                        } else {
                            logLSPMessage('send-request', message);
                        }
                    }
                    function traceSendingNotification(message) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.params) {
                                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                                } else {
                                    data = 'No parameters provided.\n\n';
                                }
                            }
                            tracer.log(`Sending notification '${message.method}'.`, data);
                        } else {
                            logLSPMessage('send-notification', message);
                        }
                    }
                    function traceSendingResponse(message, method, startTime) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.error && message.error.data) {
                                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                                } else {
                                    if (message.result) {
                                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                                    } else if (message.error === undefined) {
                                        data = 'No result returned.\n\n';
                                    }
                                }
                            }
                            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
                        } else {
                            logLSPMessage('send-response', message);
                        }
                    }
                    function traceReceivedRequest(message) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                                data = `Params: ${stringifyTrace(message.params)}\n\n`;
                            }
                            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
                        } else {
                            logLSPMessage('receive-request', message);
                        }
                    }
                    function traceReceivedNotification(message) {
                        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.params) {
                                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                                } else {
                                    data = 'No parameters provided.\n\n';
                                }
                            }
                            tracer.log(`Received notification '${message.method}'.`, data);
                        } else {
                            logLSPMessage('receive-notification', message);
                        }
                    }
                    function traceReceivedResponse(message, responsePromise) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.error && message.error.data) {
                                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                                } else {
                                    if (message.result) {
                                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                                    } else if (message.error === undefined) {
                                        data = 'No result returned.\n\n';
                                    }
                                }
                            }
                            if (responsePromise) {
                                const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
                            } else {
                                tracer.log(`Received response ${message.id} without active response promise.`, data);
                            }
                        } else {
                            logLSPMessage('receive-response', message);
                        }
                    }
                    function logLSPMessage(type, message) {
                        if (!tracer || trace === Trace.Off) {
                            return;
                        }
                        const lspMessage = {
                            isLSPMessage: true,
                            type,
                            message,
                            timestamp: Date.now()
                        };
                        tracer.log(lspMessage);
                    }
                    function throwIfClosedOrDisposed() {
                        if (isClosed()) {
                            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
                        }
                        if (isDisposed()) {
                            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
                        }
                    }
                    function throwIfListening() {
                        if (isListening()) {
                            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
                        }
                    }
                    function throwIfNotListening() {
                        if (!isListening()) {
                            throw new Error('Call listen() first.');
                        }
                    }
                    function undefinedToNull(param) {
                        if (param === undefined) {
                            return null;
                        } else {
                            return param;
                        }
                    }
                    function nullToUndefined(param) {
                        if (param === null) {
                            return undefined;
                        } else {
                            return param;
                        }
                    }
                    function isNamedParam(param) {
                        return param !== undefined && param !== null && !Array.isArray(param) && typeof param === 'object';
                    }
                    function computeSingleParam(parameterStructures, param) {
                        switch(parameterStructures){
                            case messages_1.ParameterStructures.auto:
                                if (isNamedParam(param)) {
                                    return nullToUndefined(param);
                                } else {
                                    return [
                                        undefinedToNull(param)
                                    ];
                                }
                            case messages_1.ParameterStructures.byName:
                                if (!isNamedParam(param)) {
                                    throw new Error(`Received parameters by name but param is not an object literal.`);
                                }
                                return nullToUndefined(param);
                            case messages_1.ParameterStructures.byPosition:
                                return [
                                    undefinedToNull(param)
                                ];
                            default:
                                throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
                        }
                    }
                    function computeMessageParams(type, params) {
                        let result;
                        const numberOfParams = type.numberOfParams;
                        switch(numberOfParams){
                            case 0:
                                result = undefined;
                                break;
                            case 1:
                                result = computeSingleParam(type.parameterStructures, params[0]);
                                break;
                            default:
                                result = [];
                                for(let i = 0; i < params.length && i < numberOfParams; i++){
                                    result.push(undefinedToNull(params[i]));
                                }
                                if (params.length < numberOfParams) {
                                    for(let i = params.length; i < numberOfParams; i++){
                                        result.push(null);
                                    }
                                }
                                break;
                        }
                        return result;
                    }
                    const connection = {
                        sendNotification: (type, ...args)=>{
                            throwIfClosedOrDisposed();
                            let method;
                            let messageParams;
                            if (Is.string(type)) {
                                method = type;
                                const first = args[0];
                                let paramStart = 0;
                                let parameterStructures = messages_1.ParameterStructures.auto;
                                if (messages_1.ParameterStructures.is(first)) {
                                    paramStart = 1;
                                    parameterStructures = first;
                                }
                                let paramEnd = args.length;
                                const numberOfParams = paramEnd - paramStart;
                                switch(numberOfParams){
                                    case 0:
                                        messageParams = undefined;
                                        break;
                                    case 1:
                                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                                        break;
                                    default:
                                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                                        }
                                        messageParams = args.slice(paramStart, paramEnd).map((value)=>undefinedToNull(value));
                                        break;
                                }
                            } else {
                                const params = args;
                                method = type.method;
                                messageParams = computeMessageParams(type, params);
                            }
                            const notificationMessage = {
                                jsonrpc: version,
                                method: method,
                                params: messageParams
                            };
                            traceSendingNotification(notificationMessage);
                            return messageWriter.write(notificationMessage).catch((error)=>{
                                logger.error(`Sending notification failed.`);
                                throw error;
                            });
                        },
                        onNotification: (type, handler)=>{
                            throwIfClosedOrDisposed();
                            let method;
                            if (Is.func(type)) {
                                starNotificationHandler = type;
                            } else if (handler) {
                                if (Is.string(type)) {
                                    method = type;
                                    notificationHandlers.set(type, {
                                        type: undefined,
                                        handler
                                    });
                                } else {
                                    method = type.method;
                                    notificationHandlers.set(type.method, {
                                        type,
                                        handler
                                    });
                                }
                            }
                            return {
                                dispose: ()=>{
                                    if (method !== undefined) {
                                        notificationHandlers.delete(method);
                                    } else {
                                        starNotificationHandler = undefined;
                                    }
                                }
                            };
                        },
                        onProgress: (_type, token, handler)=>{
                            if (progressHandlers.has(token)) {
                                throw new Error(`Progress handler for token ${token} already registered`);
                            }
                            progressHandlers.set(token, handler);
                            return {
                                dispose: ()=>{
                                    progressHandlers.delete(token);
                                }
                            };
                        },
                        sendProgress: (_type, token, value)=>{
                            // This should not await but simple return to ensure that we don't have another
                            // async scheduling. Otherwise one send could overtake another send.
                            return connection.sendNotification(ProgressNotification.type, {
                                token,
                                value
                            });
                        },
                        onUnhandledProgress: unhandledProgressEmitter.event,
                        sendRequest: (type, ...args)=>{
                            throwIfClosedOrDisposed();
                            throwIfNotListening();
                            let method;
                            let messageParams;
                            let token = undefined;
                            if (Is.string(type)) {
                                method = type;
                                const first = args[0];
                                const last = args[args.length - 1];
                                let paramStart = 0;
                                let parameterStructures = messages_1.ParameterStructures.auto;
                                if (messages_1.ParameterStructures.is(first)) {
                                    paramStart = 1;
                                    parameterStructures = first;
                                }
                                let paramEnd = args.length;
                                if (cancellation_1.CancellationToken.is(last)) {
                                    paramEnd = paramEnd - 1;
                                    token = last;
                                }
                                const numberOfParams = paramEnd - paramStart;
                                switch(numberOfParams){
                                    case 0:
                                        messageParams = undefined;
                                        break;
                                    case 1:
                                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                                        break;
                                    default:
                                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                                        }
                                        messageParams = args.slice(paramStart, paramEnd).map((value)=>undefinedToNull(value));
                                        break;
                                }
                            } else {
                                const params = args;
                                method = type.method;
                                messageParams = computeMessageParams(type, params);
                                const numberOfParams = type.numberOfParams;
                                token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
                            }
                            const id = sequenceNumber++;
                            let disposable;
                            if (token) {
                                disposable = token.onCancellationRequested(()=>{
                                    const p = cancellationStrategy.sender.sendCancellation(connection, id);
                                    if (p === undefined) {
                                        logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                                        return Promise.resolve();
                                    } else {
                                        return p.catch(()=>{
                                            logger.log(`Sending cancellation messages for id ${id} failed`);
                                        });
                                    }
                                });
                            }
                            const requestMessage = {
                                jsonrpc: version,
                                id: id,
                                method: method,
                                params: messageParams
                            };
                            traceSendingRequest(requestMessage);
                            if (typeof cancellationStrategy.sender.enableCancellation === 'function') {
                                cancellationStrategy.sender.enableCancellation(requestMessage);
                            }
                            return new Promise(async (resolve, reject)=>{
                                const resolveWithCleanup = (r)=>{
                                    var _disposable;
                                    resolve(r);
                                    cancellationStrategy.sender.cleanup(id);
                                    (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable.dispose();
                                };
                                const rejectWithCleanup = (r)=>{
                                    var _disposable;
                                    reject(r);
                                    cancellationStrategy.sender.cleanup(id);
                                    (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable.dispose();
                                };
                                const responsePromise = {
                                    method: method,
                                    timerStart: Date.now(),
                                    resolve: resolveWithCleanup,
                                    reject: rejectWithCleanup
                                };
                                try {
                                    await messageWriter.write(requestMessage);
                                    responsePromises.set(id, responsePromise);
                                } catch (error) {
                                    logger.error(`Sending request failed.`);
                                    // Writing the message failed. So we need to reject the promise.
                                    responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : 'Unknown reason'));
                                    throw error;
                                }
                            });
                        },
                        onRequest: (type, handler)=>{
                            throwIfClosedOrDisposed();
                            let method = null;
                            if (StarRequestHandler.is(type)) {
                                method = undefined;
                                starRequestHandler = type;
                            } else if (Is.string(type)) {
                                method = null;
                                if (handler !== undefined) {
                                    method = type;
                                    requestHandlers.set(type, {
                                        handler: handler,
                                        type: undefined
                                    });
                                }
                            } else {
                                if (handler !== undefined) {
                                    method = type.method;
                                    requestHandlers.set(type.method, {
                                        type,
                                        handler
                                    });
                                }
                            }
                            return {
                                dispose: ()=>{
                                    if (method === null) {
                                        return;
                                    }
                                    if (method !== undefined) {
                                        requestHandlers.delete(method);
                                    } else {
                                        starRequestHandler = undefined;
                                    }
                                }
                            };
                        },
                        hasPendingResponse: ()=>{
                            return responsePromises.size > 0;
                        },
                        trace: async (_value, _tracer, sendNotificationOrTraceOptions)=>{
                            let _sendNotification = false;
                            let _traceFormat = TraceFormat.Text;
                            if (sendNotificationOrTraceOptions !== undefined) {
                                if (Is.boolean(sendNotificationOrTraceOptions)) {
                                    _sendNotification = sendNotificationOrTraceOptions;
                                } else {
                                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                                }
                            }
                            trace = _value;
                            traceFormat = _traceFormat;
                            if (trace === Trace.Off) {
                                tracer = undefined;
                            } else {
                                tracer = _tracer;
                            }
                            if (_sendNotification && !isClosed() && !isDisposed()) {
                                await connection.sendNotification(SetTraceNotification.type, {
                                    value: Trace.toString(_value)
                                });
                            }
                        },
                        onError: errorEmitter.event,
                        onClose: closeEmitter.event,
                        onUnhandledNotification: unhandledNotificationEmitter.event,
                        onDispose: disposeEmitter.event,
                        end: ()=>{
                            messageWriter.end();
                        },
                        dispose: ()=>{
                            if (isDisposed()) {
                                return;
                            }
                            state = ConnectionState.Disposed;
                            disposeEmitter.fire(undefined);
                            const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, 'Pending response rejected since connection got disposed');
                            for (const promise of responsePromises.values()){
                                promise.reject(error);
                            }
                            responsePromises = new Map();
                            requestTokens = new Map();
                            knownCanceledRequests = new Set();
                            messageQueue = new linkedMap_1.LinkedMap();
                            // Test for backwards compatibility
                            if (Is.func(messageWriter.dispose)) {
                                messageWriter.dispose();
                            }
                            if (Is.func(messageReader.dispose)) {
                                messageReader.dispose();
                            }
                        },
                        listen: ()=>{
                            throwIfClosedOrDisposed();
                            throwIfListening();
                            state = ConnectionState.Listening;
                            messageReader.listen(callback);
                        },
                        inspect: ()=>{
                            // eslint-disable-next-line no-console
                            (0, ral_1.default)().console.log('inspect');
                        }
                    };
                    connection.onNotification(LogTraceNotification.type, (params)=>{
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
                        tracer.log(params.message, verbose ? params.verbose : undefined);
                    });
                    connection.onNotification(ProgressNotification.type, (params)=>{
                        const handler = progressHandlers.get(params.token);
                        if (handler) {
                            handler(params.value);
                        } else {
                            unhandledProgressEmitter.fire(params);
                        }
                    });
                    return connection;
                }
                exports1.createMessageConnection = createMessageConnection;
            /***/ },
            /***/ 8437: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Disposable = void 0;
                var Disposable;
                (function(Disposable) {
                    function create(func) {
                        return {
                            dispose: func
                        };
                    }
                    Disposable.create = create;
                })(Disposable = exports1.Disposable || (exports1.Disposable = {}));
            /***/ },
            /***/ 5165: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_348529__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Emitter = exports1.Event = void 0;
                const ral_1 = __nested_webpack_require_348529__(5706);
                var Event1;
                (function(Event1) {
                    const _disposable = {
                        dispose () {}
                    };
                    Event1.None = function() {
                        return _disposable;
                    };
                })(Event1 = exports1.Event || (exports1.Event = {}));
                class CallbackList {
                    add(callback, context = null, bucket) {
                        if (!this._callbacks) {
                            this._callbacks = [];
                            this._contexts = [];
                        }
                        this._callbacks.push(callback);
                        this._contexts.push(context);
                        if (Array.isArray(bucket)) {
                            bucket.push({
                                dispose: ()=>this.remove(callback, context)
                            });
                        }
                    }
                    remove(callback, context = null) {
                        if (!this._callbacks) {
                            return;
                        }
                        let foundCallbackWithDifferentContext = false;
                        for(let i = 0, len = this._callbacks.length; i < len; i++){
                            if (this._callbacks[i] === callback) {
                                if (this._contexts[i] === context) {
                                    // callback & context match => remove it
                                    this._callbacks.splice(i, 1);
                                    this._contexts.splice(i, 1);
                                    return;
                                } else {
                                    foundCallbackWithDifferentContext = true;
                                }
                            }
                        }
                        if (foundCallbackWithDifferentContext) {
                            throw new Error('When adding a listener with a context, you should remove it with the same context');
                        }
                    }
                    invoke(...args) {
                        if (!this._callbacks) {
                            return [];
                        }
                        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
                        for(let i = 0, len = callbacks.length; i < len; i++){
                            try {
                                ret.push(callbacks[i].apply(contexts[i], args));
                            } catch (e) {
                                // eslint-disable-next-line no-console
                                (0, ral_1.default)().console.error(e);
                            }
                        }
                        return ret;
                    }
                    isEmpty() {
                        return !this._callbacks || this._callbacks.length === 0;
                    }
                    dispose() {
                        this._callbacks = undefined;
                        this._contexts = undefined;
                    }
                }
                class Emitter {
                    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */ get event() {
                        if (!this._event) {
                            this._event = (listener, thisArgs, disposables)=>{
                                if (!this._callbacks) {
                                    this._callbacks = new CallbackList();
                                }
                                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                                    this._options.onFirstListenerAdd(this);
                                }
                                this._callbacks.add(listener, thisArgs);
                                const result = {
                                    dispose: ()=>{
                                        if (!this._callbacks) {
                                            // disposable is disposed after emitter is disposed.
                                            return;
                                        }
                                        this._callbacks.remove(listener, thisArgs);
                                        result.dispose = Emitter._noop;
                                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                                            this._options.onLastListenerRemove(this);
                                        }
                                    }
                                };
                                if (Array.isArray(disposables)) {
                                    disposables.push(result);
                                }
                                return result;
                            };
                        }
                        return this._event;
                    }
                    /**
     * To be kept private to fire an event to
     * subscribers
     */ fire(event) {
                        if (this._callbacks) {
                            this._callbacks.invoke.call(this._callbacks, event);
                        }
                    }
                    dispose() {
                        if (this._callbacks) {
                            this._callbacks.dispose();
                            this._callbacks = undefined;
                        }
                    }
                    constructor(_options){
                        this._options = _options;
                    }
                }
                exports1.Emitter = Emitter;
                Emitter._noop = function() {};
            /***/ },
            /***/ 8811: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.stringArray = exports1.array = exports1.func = exports1.error = exports1.number = exports1.string = exports1.boolean = void 0;
                function boolean(value) {
                    return value === true || value === false;
                }
                exports1.boolean = boolean;
                function string(value) {
                    return typeof value === 'string' || value instanceof String;
                }
                exports1.string = string;
                function number(value) {
                    return typeof value === 'number' || value instanceof Number;
                }
                exports1.number = number;
                function error(value) {
                    return value instanceof Error;
                }
                exports1.error = error;
                function func(value) {
                    return typeof value === 'function';
                }
                exports1.func = func;
                function array(value) {
                    return Array.isArray(value);
                }
                exports1.array = array;
                function stringArray(value) {
                    return array(value) && value.every((elem)=>string(elem));
                }
                exports1.stringArray = stringArray;
            /***/ },
            /***/ 7040: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var _a;
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.LRUCache = exports1.LinkedMap = exports1.Touch = void 0;
                var Touch;
                (function(Touch) {
                    Touch.None = 0;
                    Touch.First = 1;
                    Touch.AsOld = Touch.First;
                    Touch.Last = 2;
                    Touch.AsNew = Touch.Last;
                })(Touch = exports1.Touch || (exports1.Touch = {}));
                class LinkedMap {
                    clear() {
                        this._map.clear();
                        this._head = undefined;
                        this._tail = undefined;
                        this._size = 0;
                        this._state++;
                    }
                    isEmpty() {
                        return !this._head && !this._tail;
                    }
                    get size() {
                        return this._size;
                    }
                    get first() {
                        var _this__head;
                        return (_this__head = this._head) === null || _this__head === void 0 ? void 0 : _this__head.value;
                    }
                    get last() {
                        var _this__tail;
                        return (_this__tail = this._tail) === null || _this__tail === void 0 ? void 0 : _this__tail.value;
                    }
                    has(key) {
                        return this._map.has(key);
                    }
                    get(key, touch = Touch.None) {
                        const item = this._map.get(key);
                        if (!item) {
                            return undefined;
                        }
                        if (touch !== Touch.None) {
                            this.touch(item, touch);
                        }
                        return item.value;
                    }
                    set(key, value, touch = Touch.None) {
                        let item = this._map.get(key);
                        if (item) {
                            item.value = value;
                            if (touch !== Touch.None) {
                                this.touch(item, touch);
                            }
                        } else {
                            item = {
                                key,
                                value,
                                next: undefined,
                                previous: undefined
                            };
                            switch(touch){
                                case Touch.None:
                                    this.addItemLast(item);
                                    break;
                                case Touch.First:
                                    this.addItemFirst(item);
                                    break;
                                case Touch.Last:
                                    this.addItemLast(item);
                                    break;
                                default:
                                    this.addItemLast(item);
                                    break;
                            }
                            this._map.set(key, item);
                            this._size++;
                        }
                        return this;
                    }
                    delete(key) {
                        return !!this.remove(key);
                    }
                    remove(key) {
                        const item = this._map.get(key);
                        if (!item) {
                            return undefined;
                        }
                        this._map.delete(key);
                        this.removeItem(item);
                        this._size--;
                        return item.value;
                    }
                    shift() {
                        if (!this._head && !this._tail) {
                            return undefined;
                        }
                        if (!this._head || !this._tail) {
                            throw new Error('Invalid list');
                        }
                        const item = this._head;
                        this._map.delete(item.key);
                        this.removeItem(item);
                        this._size--;
                        return item.value;
                    }
                    forEach(callbackfn, thisArg) {
                        const state = this._state;
                        let current = this._head;
                        while(current){
                            if (thisArg) {
                                callbackfn.bind(thisArg)(current.value, current.key, this);
                            } else {
                                callbackfn(current.value, current.key, this);
                            }
                            if (this._state !== state) {
                                throw new Error(`LinkedMap got modified during iteration.`);
                            }
                            current = current.next;
                        }
                    }
                    keys() {
                        const state = this._state;
                        let current = this._head;
                        const iterator = {
                            [Symbol.iterator]: ()=>{
                                return iterator;
                            },
                            next: ()=>{
                                if (this._state !== state) {
                                    throw new Error(`LinkedMap got modified during iteration.`);
                                }
                                if (current) {
                                    const result = {
                                        value: current.key,
                                        done: false
                                    };
                                    current = current.next;
                                    return result;
                                } else {
                                    return {
                                        value: undefined,
                                        done: true
                                    };
                                }
                            }
                        };
                        return iterator;
                    }
                    values() {
                        const state = this._state;
                        let current = this._head;
                        const iterator = {
                            [Symbol.iterator]: ()=>{
                                return iterator;
                            },
                            next: ()=>{
                                if (this._state !== state) {
                                    throw new Error(`LinkedMap got modified during iteration.`);
                                }
                                if (current) {
                                    const result = {
                                        value: current.value,
                                        done: false
                                    };
                                    current = current.next;
                                    return result;
                                } else {
                                    return {
                                        value: undefined,
                                        done: true
                                    };
                                }
                            }
                        };
                        return iterator;
                    }
                    entries() {
                        const state = this._state;
                        let current = this._head;
                        const iterator = {
                            [Symbol.iterator]: ()=>{
                                return iterator;
                            },
                            next: ()=>{
                                if (this._state !== state) {
                                    throw new Error(`LinkedMap got modified during iteration.`);
                                }
                                if (current) {
                                    const result = {
                                        value: [
                                            current.key,
                                            current.value
                                        ],
                                        done: false
                                    };
                                    current = current.next;
                                    return result;
                                } else {
                                    return {
                                        value: undefined,
                                        done: true
                                    };
                                }
                            }
                        };
                        return iterator;
                    }
                    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
                        return this.entries();
                    }
                    trimOld(newSize) {
                        if (newSize >= this.size) {
                            return;
                        }
                        if (newSize === 0) {
                            this.clear();
                            return;
                        }
                        let current = this._head;
                        let currentSize = this.size;
                        while(current && currentSize > newSize){
                            this._map.delete(current.key);
                            current = current.next;
                            currentSize--;
                        }
                        this._head = current;
                        this._size = currentSize;
                        if (current) {
                            current.previous = undefined;
                        }
                        this._state++;
                    }
                    addItemFirst(item) {
                        // First time Insert
                        if (!this._head && !this._tail) {
                            this._tail = item;
                        } else if (!this._head) {
                            throw new Error('Invalid list');
                        } else {
                            item.next = this._head;
                            this._head.previous = item;
                        }
                        this._head = item;
                        this._state++;
                    }
                    addItemLast(item) {
                        // First time Insert
                        if (!this._head && !this._tail) {
                            this._head = item;
                        } else if (!this._tail) {
                            throw new Error('Invalid list');
                        } else {
                            item.previous = this._tail;
                            this._tail.next = item;
                        }
                        this._tail = item;
                        this._state++;
                    }
                    removeItem(item) {
                        if (item === this._head && item === this._tail) {
                            this._head = undefined;
                            this._tail = undefined;
                        } else if (item === this._head) {
                            // This can only happened if size === 1 which is handle
                            // by the case above.
                            if (!item.next) {
                                throw new Error('Invalid list');
                            }
                            item.next.previous = undefined;
                            this._head = item.next;
                        } else if (item === this._tail) {
                            // This can only happened if size === 1 which is handle
                            // by the case above.
                            if (!item.previous) {
                                throw new Error('Invalid list');
                            }
                            item.previous.next = undefined;
                            this._tail = item.previous;
                        } else {
                            const next = item.next;
                            const previous = item.previous;
                            if (!next || !previous) {
                                throw new Error('Invalid list');
                            }
                            next.previous = previous;
                            previous.next = next;
                        }
                        item.next = undefined;
                        item.previous = undefined;
                        this._state++;
                    }
                    touch(item, touch) {
                        if (!this._head || !this._tail) {
                            throw new Error('Invalid list');
                        }
                        if (touch !== Touch.First && touch !== Touch.Last) {
                            return;
                        }
                        if (touch === Touch.First) {
                            if (item === this._head) {
                                return;
                            }
                            const next = item.next;
                            const previous = item.previous;
                            // Unlink the item
                            if (item === this._tail) {
                                // previous must be defined since item was not head but is tail
                                // So there are more than on item in the map
                                previous.next = undefined;
                                this._tail = previous;
                            } else {
                                // Both next and previous are not undefined since item was neither head nor tail.
                                next.previous = previous;
                                previous.next = next;
                            }
                            // Insert the node at head
                            item.previous = undefined;
                            item.next = this._head;
                            this._head.previous = item;
                            this._head = item;
                            this._state++;
                        } else if (touch === Touch.Last) {
                            if (item === this._tail) {
                                return;
                            }
                            const next = item.next;
                            const previous = item.previous;
                            // Unlink the item.
                            if (item === this._head) {
                                // next must be defined since item was not tail but is head
                                // So there are more than on item in the map
                                next.previous = undefined;
                                this._head = next;
                            } else {
                                // Both next and previous are not undefined since item was neither head nor tail.
                                next.previous = previous;
                                previous.next = next;
                            }
                            item.next = undefined;
                            item.previous = this._tail;
                            this._tail.next = item;
                            this._tail = item;
                            this._state++;
                        }
                    }
                    toJSON() {
                        const data = [];
                        this.forEach((value, key)=>{
                            data.push([
                                key,
                                value
                            ]);
                        });
                        return data;
                    }
                    fromJSON(data) {
                        this.clear();
                        for (const [key, value] of data){
                            this.set(key, value);
                        }
                    }
                    constructor(){
                        this[_a] = 'LinkedMap';
                        this._map = new Map();
                        this._head = undefined;
                        this._tail = undefined;
                        this._size = 0;
                        this._state = 0;
                    }
                }
                exports1.LinkedMap = LinkedMap;
                class LRUCache extends LinkedMap {
                    get limit() {
                        return this._limit;
                    }
                    set limit(limit) {
                        this._limit = limit;
                        this.checkTrim();
                    }
                    get ratio() {
                        return this._ratio;
                    }
                    set ratio(ratio) {
                        this._ratio = Math.min(Math.max(0, ratio), 1);
                        this.checkTrim();
                    }
                    get(key, touch = Touch.AsNew) {
                        return super.get(key, touch);
                    }
                    peek(key) {
                        return super.get(key, Touch.None);
                    }
                    set(key, value) {
                        super.set(key, value, Touch.Last);
                        this.checkTrim();
                        return this;
                    }
                    checkTrim() {
                        if (this.size > this._limit) {
                            this.trimOld(Math.round(this._limit * this._ratio));
                        }
                    }
                    constructor(limit, ratio = 1){
                        super();
                        this._limit = limit;
                        this._ratio = Math.min(Math.max(0, ratio), 1);
                    }
                }
                exports1.LRUCache = LRUCache;
            /***/ },
            /***/ 8652: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.AbstractMessageBuffer = void 0;
                const CR = 13;
                const LF = 10;
                const CRLF = '\r\n';
                class AbstractMessageBuffer {
                    get encoding() {
                        return this._encoding;
                    }
                    append(chunk) {
                        const toAppend = typeof chunk === 'string' ? this.fromString(chunk, this._encoding) : chunk;
                        this._chunks.push(toAppend);
                        this._totalLength += toAppend.byteLength;
                    }
                    tryReadHeaders(lowerCaseKeys = false) {
                        if (this._chunks.length === 0) {
                            return undefined;
                        }
                        let state = 0;
                        let chunkIndex = 0;
                        let offset = 0;
                        let chunkBytesRead = 0;
                        row: while(chunkIndex < this._chunks.length){
                            const chunk = this._chunks[chunkIndex];
                            offset = 0;
                            column: while(offset < chunk.length){
                                const value = chunk[offset];
                                switch(value){
                                    case CR:
                                        switch(state){
                                            case 0:
                                                state = 1;
                                                break;
                                            case 2:
                                                state = 3;
                                                break;
                                            default:
                                                state = 0;
                                        }
                                        break;
                                    case LF:
                                        switch(state){
                                            case 1:
                                                state = 2;
                                                break;
                                            case 3:
                                                state = 4;
                                                offset++;
                                                break row;
                                            default:
                                                state = 0;
                                        }
                                        break;
                                    default:
                                        state = 0;
                                }
                                offset++;
                            }
                            chunkBytesRead += chunk.byteLength;
                            chunkIndex++;
                        }
                        if (state !== 4) {
                            return undefined;
                        }
                        // The buffer contains the two CRLF at the end. So we will
                        // have two empty lines after the split at the end as well.
                        const buffer = this._read(chunkBytesRead + offset);
                        const result = new Map();
                        const headers = this.toString(buffer, 'ascii').split(CRLF);
                        if (headers.length < 2) {
                            return result;
                        }
                        for(let i = 0; i < headers.length - 2; i++){
                            const header = headers[i];
                            const index = header.indexOf(':');
                            if (index === -1) {
                                throw new Error('Message header must separate key and value using :');
                            }
                            const key = header.substr(0, index);
                            const value = header.substr(index + 1).trim();
                            result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
                        }
                        return result;
                    }
                    tryReadBody(length) {
                        if (this._totalLength < length) {
                            return undefined;
                        }
                        return this._read(length);
                    }
                    get numberOfBytes() {
                        return this._totalLength;
                    }
                    _read(byteCount) {
                        if (byteCount === 0) {
                            return this.emptyBuffer();
                        }
                        if (byteCount > this._totalLength) {
                            throw new Error(`Cannot read so many bytes!`);
                        }
                        if (this._chunks[0].byteLength === byteCount) {
                            // super fast path, precisely first chunk must be returned
                            const chunk = this._chunks[0];
                            this._chunks.shift();
                            this._totalLength -= byteCount;
                            return this.asNative(chunk);
                        }
                        if (this._chunks[0].byteLength > byteCount) {
                            // fast path, the reading is entirely within the first chunk
                            const chunk = this._chunks[0];
                            const result = this.asNative(chunk, byteCount);
                            this._chunks[0] = chunk.slice(byteCount);
                            this._totalLength -= byteCount;
                            return result;
                        }
                        const result = this.allocNative(byteCount);
                        let resultOffset = 0;
                        let chunkIndex = 0;
                        while(byteCount > 0){
                            const chunk = this._chunks[chunkIndex];
                            if (chunk.byteLength > byteCount) {
                                // this chunk will survive
                                const chunkPart = chunk.slice(0, byteCount);
                                result.set(chunkPart, resultOffset);
                                resultOffset += byteCount;
                                this._chunks[chunkIndex] = chunk.slice(byteCount);
                                this._totalLength -= byteCount;
                                byteCount -= byteCount;
                            } else {
                                // this chunk will be entirely read
                                result.set(chunk, resultOffset);
                                resultOffset += chunk.byteLength;
                                this._chunks.shift();
                                this._totalLength -= chunk.byteLength;
                                byteCount -= chunk.byteLength;
                            }
                        }
                        return result;
                    }
                    constructor(encoding = 'utf-8'){
                        this._encoding = encoding;
                        this._chunks = [];
                        this._totalLength = 0;
                    }
                }
                exports1.AbstractMessageBuffer = AbstractMessageBuffer;
            /***/ },
            /***/ 451: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_384225__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ReadableStreamMessageReader = exports1.AbstractMessageReader = exports1.MessageReader = void 0;
                const ral_1 = __nested_webpack_require_384225__(5706);
                const Is = __nested_webpack_require_384225__(8811);
                const events_1 = __nested_webpack_require_384225__(5165);
                const semaphore_1 = __nested_webpack_require_384225__(2339);
                var MessageReader;
                (function(MessageReader) {
                    function is(value) {
                        let candidate = value;
                        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
                    }
                    MessageReader.is = is;
                })(MessageReader = exports1.MessageReader || (exports1.MessageReader = {}));
                class AbstractMessageReader {
                    dispose() {
                        this.errorEmitter.dispose();
                        this.closeEmitter.dispose();
                    }
                    get onError() {
                        return this.errorEmitter.event;
                    }
                    fireError(error) {
                        this.errorEmitter.fire(this.asError(error));
                    }
                    get onClose() {
                        return this.closeEmitter.event;
                    }
                    fireClose() {
                        this.closeEmitter.fire(undefined);
                    }
                    get onPartialMessage() {
                        return this.partialMessageEmitter.event;
                    }
                    firePartialMessage(info) {
                        this.partialMessageEmitter.fire(info);
                    }
                    asError(error) {
                        if (error instanceof Error) {
                            return error;
                        } else {
                            return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
                        }
                    }
                    constructor(){
                        this.errorEmitter = new events_1.Emitter();
                        this.closeEmitter = new events_1.Emitter();
                        this.partialMessageEmitter = new events_1.Emitter();
                    }
                }
                exports1.AbstractMessageReader = AbstractMessageReader;
                var ResolvedMessageReaderOptions;
                (function(ResolvedMessageReaderOptions) {
                    function fromOptions(options) {
                        let charset;
                        let result;
                        let contentDecoder;
                        const contentDecoders = new Map();
                        let contentTypeDecoder;
                        const contentTypeDecoders = new Map();
                        if (options === undefined || typeof options === 'string') {
                            charset = options !== null && options !== void 0 ? options : 'utf-8';
                        } else {
                            var _options_charset;
                            charset = (_options_charset = options.charset) !== null && _options_charset !== void 0 ? _options_charset : 'utf-8';
                            if (options.contentDecoder !== undefined) {
                                contentDecoder = options.contentDecoder;
                                contentDecoders.set(contentDecoder.name, contentDecoder);
                            }
                            if (options.contentDecoders !== undefined) {
                                for (const decoder of options.contentDecoders){
                                    contentDecoders.set(decoder.name, decoder);
                                }
                            }
                            if (options.contentTypeDecoder !== undefined) {
                                contentTypeDecoder = options.contentTypeDecoder;
                                contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
                            }
                            if (options.contentTypeDecoders !== undefined) {
                                for (const decoder of options.contentTypeDecoders){
                                    contentTypeDecoders.set(decoder.name, decoder);
                                }
                            }
                        }
                        if (contentTypeDecoder === undefined) {
                            contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
                            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
                        }
                        return {
                            charset,
                            contentDecoder,
                            contentDecoders,
                            contentTypeDecoder,
                            contentTypeDecoders
                        };
                    }
                    ResolvedMessageReaderOptions.fromOptions = fromOptions;
                })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
                class ReadableStreamMessageReader extends AbstractMessageReader {
                    set partialMessageTimeout(timeout) {
                        this._partialMessageTimeout = timeout;
                    }
                    get partialMessageTimeout() {
                        return this._partialMessageTimeout;
                    }
                    listen(callback) {
                        this.nextMessageLength = -1;
                        this.messageToken = 0;
                        this.partialMessageTimer = undefined;
                        this.callback = callback;
                        const result = this.readable.onData((data)=>{
                            this.onData(data);
                        });
                        this.readable.onError((error)=>this.fireError(error));
                        this.readable.onClose(()=>this.fireClose());
                        return result;
                    }
                    onData(data) {
                        this.buffer.append(data);
                        while(true){
                            if (this.nextMessageLength === -1) {
                                const headers = this.buffer.tryReadHeaders(true);
                                if (!headers) {
                                    return;
                                }
                                const contentLength = headers.get('content-length');
                                if (!contentLength) {
                                    this.fireError(new Error('Header must provide a Content-Length property.'));
                                    return;
                                }
                                const length = parseInt(contentLength);
                                if (isNaN(length)) {
                                    this.fireError(new Error('Content-Length value must be a number.'));
                                    return;
                                }
                                this.nextMessageLength = length;
                            }
                            const body = this.buffer.tryReadBody(this.nextMessageLength);
                            if (body === undefined) {
                                /** We haven't received the full message yet. */ this.setPartialMessageTimer();
                                return;
                            }
                            this.clearPartialMessageTimer();
                            this.nextMessageLength = -1;
                            // Make sure that we convert one received message after the
                            // other. Otherwise it could happen that a decoding of a second
                            // smaller message finished before the decoding of a first larger
                            // message and then we would deliver the second message first.
                            this.readSemaphore.lock(async ()=>{
                                const bytes = this.options.contentDecoder !== undefined ? await this.options.contentDecoder.decode(body) : body;
                                const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
                                this.callback(message);
                            }).catch((error)=>{
                                this.fireError(error);
                            });
                        }
                    }
                    clearPartialMessageTimer() {
                        if (this.partialMessageTimer) {
                            this.partialMessageTimer.dispose();
                            this.partialMessageTimer = undefined;
                        }
                    }
                    setPartialMessageTimer() {
                        this.clearPartialMessageTimer();
                        if (this._partialMessageTimeout <= 0) {
                            return;
                        }
                        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout)=>{
                            this.partialMessageTimer = undefined;
                            if (token === this.messageToken) {
                                this.firePartialMessage({
                                    messageToken: token,
                                    waitingTime: timeout
                                });
                                this.setPartialMessageTimer();
                            }
                        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
                    }
                    constructor(readable, options){
                        super();
                        this.readable = readable;
                        this.options = ResolvedMessageReaderOptions.fromOptions(options);
                        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
                        this._partialMessageTimeout = 10000;
                        this.nextMessageLength = -1;
                        this.messageToken = 0;
                        this.readSemaphore = new semaphore_1.Semaphore(1);
                    }
                }
                exports1.ReadableStreamMessageReader = ReadableStreamMessageReader;
            /***/ },
            /***/ 1251: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_395487__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.WriteableStreamMessageWriter = exports1.AbstractMessageWriter = exports1.MessageWriter = void 0;
                const ral_1 = __nested_webpack_require_395487__(5706);
                const Is = __nested_webpack_require_395487__(8811);
                const semaphore_1 = __nested_webpack_require_395487__(2339);
                const events_1 = __nested_webpack_require_395487__(5165);
                const ContentLength = 'Content-Length: ';
                const CRLF = '\r\n';
                var MessageWriter;
                (function(MessageWriter) {
                    function is(value) {
                        let candidate = value;
                        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
                    }
                    MessageWriter.is = is;
                })(MessageWriter = exports1.MessageWriter || (exports1.MessageWriter = {}));
                class AbstractMessageWriter {
                    dispose() {
                        this.errorEmitter.dispose();
                        this.closeEmitter.dispose();
                    }
                    get onError() {
                        return this.errorEmitter.event;
                    }
                    fireError(error, message, count) {
                        this.errorEmitter.fire([
                            this.asError(error),
                            message,
                            count
                        ]);
                    }
                    get onClose() {
                        return this.closeEmitter.event;
                    }
                    fireClose() {
                        this.closeEmitter.fire(undefined);
                    }
                    asError(error) {
                        if (error instanceof Error) {
                            return error;
                        } else {
                            return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
                        }
                    }
                    constructor(){
                        this.errorEmitter = new events_1.Emitter();
                        this.closeEmitter = new events_1.Emitter();
                    }
                }
                exports1.AbstractMessageWriter = AbstractMessageWriter;
                var ResolvedMessageWriterOptions;
                (function(ResolvedMessageWriterOptions) {
                    function fromOptions(options) {
                        if (options === undefined || typeof options === 'string') {
                            return {
                                charset: options !== null && options !== void 0 ? options : 'utf-8',
                                contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder
                            };
                        } else {
                            var _options_charset, _options_contentTypeEncoder;
                            return {
                                charset: (_options_charset = options.charset) !== null && _options_charset !== void 0 ? _options_charset : 'utf-8',
                                contentEncoder: options.contentEncoder,
                                contentTypeEncoder: (_options_contentTypeEncoder = options.contentTypeEncoder) !== null && _options_contentTypeEncoder !== void 0 ? _options_contentTypeEncoder : (0, ral_1.default)().applicationJson.encoder
                            };
                        }
                    }
                    ResolvedMessageWriterOptions.fromOptions = fromOptions;
                })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
                class WriteableStreamMessageWriter extends AbstractMessageWriter {
                    async write(msg) {
                        return this.writeSemaphore.lock(async ()=>{
                            const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer)=>{
                                if (this.options.contentEncoder !== undefined) {
                                    return this.options.contentEncoder.encode(buffer);
                                } else {
                                    return buffer;
                                }
                            });
                            return payload.then((buffer)=>{
                                const headers = [];
                                headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
                                headers.push(CRLF);
                                return this.doWrite(msg, headers, buffer);
                            }, (error)=>{
                                this.fireError(error);
                                throw error;
                            });
                        });
                    }
                    async doWrite(msg, headers, data) {
                        try {
                            await this.writable.write(headers.join(''), 'ascii');
                            return this.writable.write(data);
                        } catch (error) {
                            this.handleError(error, msg);
                            return Promise.reject(error);
                        }
                    }
                    handleError(error, msg) {
                        this.errorCount++;
                        this.fireError(error, msg, this.errorCount);
                    }
                    end() {
                        this.writable.end();
                    }
                    constructor(writable, options){
                        super();
                        this.writable = writable;
                        this.options = ResolvedMessageWriterOptions.fromOptions(options);
                        this.errorCount = 0;
                        this.writeSemaphore = new semaphore_1.Semaphore(1);
                        this.writable.onError((error)=>this.fireError(error));
                        this.writable.onClose(()=>this.fireClose());
                    }
                }
                exports1.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
            /***/ },
            /***/ 9141: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_402373__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Message = exports1.NotificationType9 = exports1.NotificationType8 = exports1.NotificationType7 = exports1.NotificationType6 = exports1.NotificationType5 = exports1.NotificationType4 = exports1.NotificationType3 = exports1.NotificationType2 = exports1.NotificationType1 = exports1.NotificationType0 = exports1.NotificationType = exports1.RequestType9 = exports1.RequestType8 = exports1.RequestType7 = exports1.RequestType6 = exports1.RequestType5 = exports1.RequestType4 = exports1.RequestType3 = exports1.RequestType2 = exports1.RequestType1 = exports1.RequestType = exports1.RequestType0 = exports1.AbstractMessageSignature = exports1.ParameterStructures = exports1.ResponseError = exports1.ErrorCodes = void 0;
                const is = __nested_webpack_require_402373__(8811);
                /**
 * Predefined error codes.
 */ var ErrorCodes;
                (function(ErrorCodes) {
                    // Defined by JSON RPC
                    ErrorCodes.ParseError = -32700;
                    ErrorCodes.InvalidRequest = -32600;
                    ErrorCodes.MethodNotFound = -32601;
                    ErrorCodes.InvalidParams = -32602;
                    ErrorCodes.InternalError = -32603;
                    /**
     * This is the start range of JSON RPC reserved error codes.
     * It doesn't denote a real error code. No application error codes should
     * be defined between the start and end range. For backwards
     * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
     * are left in the range.
     *
     * @since 3.16.0
    */ ErrorCodes.jsonrpcReservedErrorRangeStart = -32099;
                    /** @deprecated use  jsonrpcReservedErrorRangeStart */ ErrorCodes.serverErrorStart = -32099;
                    /**
     * An error occurred when write a message to the transport layer.
     */ ErrorCodes.MessageWriteError = -32099;
                    /**
     * An error occurred when reading a message from the transport layer.
     */ ErrorCodes.MessageReadError = -32098;
                    /**
     * The connection got disposed or lost and all pending responses got
     * rejected.
     */ ErrorCodes.PendingResponseRejected = -32097;
                    /**
     * The connection is inactive and a use of it failed.
     */ ErrorCodes.ConnectionInactive = -32096;
                    /**
     * Error code indicating that a server received a notification or
     * request before the server has received the `initialize` request.
     */ ErrorCodes.ServerNotInitialized = -32002;
                    ErrorCodes.UnknownErrorCode = -32001;
                    /**
     * This is the end range of JSON RPC reserved error codes.
     * It doesn't denote a real error code.
     *
     * @since 3.16.0
    */ ErrorCodes.jsonrpcReservedErrorRangeEnd = -32000;
                    /** @deprecated use  jsonrpcReservedErrorRangeEnd */ ErrorCodes.serverErrorEnd = -32000;
                })(ErrorCodes = exports1.ErrorCodes || (exports1.ErrorCodes = {}));
                /**
 * An error object return in a response in case a request
 * has failed.
 */ class ResponseError extends Error {
                    toJson() {
                        const result = {
                            code: this.code,
                            message: this.message
                        };
                        if (this.data !== undefined) {
                            result.data = this.data;
                        }
                        return result;
                    }
                    constructor(code, message, data){
                        super(message);
                        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
                        this.data = data;
                        Object.setPrototypeOf(this, ResponseError.prototype);
                    }
                }
                exports1.ResponseError = ResponseError;
                class ParameterStructures {
                    static is(value) {
                        return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
                    }
                    toString() {
                        return this.kind;
                    }
                    constructor(kind){
                        this.kind = kind;
                    }
                }
                exports1.ParameterStructures = ParameterStructures;
                /**
 * The parameter structure is automatically inferred on the number of parameters
 * and the parameter type in case of a single param.
 */ ParameterStructures.auto = new ParameterStructures('auto');
                /**
 * Forces `byPosition` parameter structure. This is useful if you have a single
 * parameter which has a literal type.
 */ ParameterStructures.byPosition = new ParameterStructures('byPosition');
                /**
 * Forces `byName` parameter structure. This is only useful when having a single
 * parameter. The library will report errors if used with a different number of
 * parameters.
 */ ParameterStructures.byName = new ParameterStructures('byName');
                /**
 * An abstract implementation of a MessageType.
 */ class AbstractMessageSignature {
                    get parameterStructures() {
                        return ParameterStructures.auto;
                    }
                    constructor(method, numberOfParams){
                        this.method = method;
                        this.numberOfParams = numberOfParams;
                    }
                }
                exports1.AbstractMessageSignature = AbstractMessageSignature;
                /**
 * Classes to type request response pairs
 */ class RequestType0 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 0);
                    }
                }
                exports1.RequestType0 = RequestType0;
                class RequestType extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.RequestType = RequestType;
                class RequestType1 extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.RequestType1 = RequestType1;
                class RequestType2 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 2);
                    }
                }
                exports1.RequestType2 = RequestType2;
                class RequestType3 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 3);
                    }
                }
                exports1.RequestType3 = RequestType3;
                class RequestType4 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 4);
                    }
                }
                exports1.RequestType4 = RequestType4;
                class RequestType5 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 5);
                    }
                }
                exports1.RequestType5 = RequestType5;
                class RequestType6 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 6);
                    }
                }
                exports1.RequestType6 = RequestType6;
                class RequestType7 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 7);
                    }
                }
                exports1.RequestType7 = RequestType7;
                class RequestType8 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 8);
                    }
                }
                exports1.RequestType8 = RequestType8;
                class RequestType9 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 9);
                    }
                }
                exports1.RequestType9 = RequestType9;
                class NotificationType extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.NotificationType = NotificationType;
                class NotificationType0 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 0);
                    }
                }
                exports1.NotificationType0 = NotificationType0;
                class NotificationType1 extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.NotificationType1 = NotificationType1;
                class NotificationType2 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 2);
                    }
                }
                exports1.NotificationType2 = NotificationType2;
                class NotificationType3 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 3);
                    }
                }
                exports1.NotificationType3 = NotificationType3;
                class NotificationType4 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 4);
                    }
                }
                exports1.NotificationType4 = NotificationType4;
                class NotificationType5 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 5);
                    }
                }
                exports1.NotificationType5 = NotificationType5;
                class NotificationType6 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 6);
                    }
                }
                exports1.NotificationType6 = NotificationType6;
                class NotificationType7 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 7);
                    }
                }
                exports1.NotificationType7 = NotificationType7;
                class NotificationType8 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 8);
                    }
                }
                exports1.NotificationType8 = NotificationType8;
                class NotificationType9 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 9);
                    }
                }
                exports1.NotificationType9 = NotificationType9;
                var Message;
                (function(Message) {
                    /**
     * Tests if the given message is a request message
     */ function isRequest(message) {
                        const candidate = message;
                        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
                    }
                    Message.isRequest = isRequest;
                    /**
     * Tests if the given message is a notification message
     */ function isNotification(message) {
                        const candidate = message;
                        return candidate && is.string(candidate.method) && message.id === void 0;
                    }
                    Message.isNotification = isNotification;
                    /**
     * Tests if the given message is a response message
     */ function isResponse(message) {
                        const candidate = message;
                        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
                    }
                    Message.isResponse = isResponse;
                })(Message = exports1.Message || (exports1.Message = {}));
            /***/ },
            /***/ 5706: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                let _ral;
                function RAL() {
                    if (_ral === undefined) {
                        throw new Error(`No runtime abstraction layer installed`);
                    }
                    return _ral;
                }
                (function(RAL) {
                    function install(ral) {
                        if (ral === undefined) {
                            throw new Error(`No runtime abstraction layer provided`);
                        }
                        _ral = ral;
                    }
                    RAL.install = install;
                })(RAL || (RAL = {}));
                exports1["default"] = RAL;
            /***/ },
            /***/ 2339: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_417881__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Semaphore = void 0;
                const ral_1 = __nested_webpack_require_417881__(5706);
                class Semaphore {
                    lock(thunk) {
                        return new Promise((resolve, reject)=>{
                            this._waiting.push({
                                thunk,
                                resolve,
                                reject
                            });
                            this.runNext();
                        });
                    }
                    get active() {
                        return this._active;
                    }
                    runNext() {
                        if (this._waiting.length === 0 || this._active === this._capacity) {
                            return;
                        }
                        (0, ral_1.default)().timer.setImmediate(()=>this.doRunNext());
                    }
                    doRunNext() {
                        if (this._waiting.length === 0 || this._active === this._capacity) {
                            return;
                        }
                        const next = this._waiting.shift();
                        this._active++;
                        if (this._active > this._capacity) {
                            throw new Error(`To many thunks active`);
                        }
                        try {
                            const result = next.thunk();
                            if (result instanceof Promise) {
                                result.then((value)=>{
                                    this._active--;
                                    next.resolve(value);
                                    this.runNext();
                                }, (err)=>{
                                    this._active--;
                                    next.reject(err);
                                    this.runNext();
                                });
                            } else {
                                this._active--;
                                next.resolve(result);
                                this.runNext();
                            }
                        } catch (err) {
                            this._active--;
                            next.reject(err);
                            this.runNext();
                        }
                    }
                    constructor(capacity = 1){
                        if (capacity <= 0) {
                            throw new Error('Capacity must be greater than 0');
                        }
                        this._capacity = capacity;
                        this._active = 0;
                        this._waiting = [];
                    }
                }
                exports1.Semaphore = Semaphore;
            /***/ },
            /***/ 178: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_421323__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.SharedArrayReceiverStrategy = exports1.SharedArraySenderStrategy = void 0;
                const cancellation_1 = __nested_webpack_require_421323__(415);
                var CancellationState;
                (function(CancellationState) {
                    CancellationState.Continue = 0;
                    CancellationState.Cancelled = 1;
                })(CancellationState || (CancellationState = {}));
                class SharedArraySenderStrategy {
                    enableCancellation(request) {
                        if (request.id === null) {
                            return;
                        }
                        const buffer = new SharedArrayBuffer(4);
                        const data = new Int32Array(buffer, 0, 1);
                        data[0] = CancellationState.Continue;
                        this.buffers.set(request.id, buffer);
                        request.$cancellationData = buffer;
                    }
                    async sendCancellation(_conn, id) {
                        const buffer = this.buffers.get(id);
                        if (buffer === undefined) {
                            return;
                        }
                        const data = new Int32Array(buffer, 0, 1);
                        Atomics.store(data, 0, CancellationState.Cancelled);
                    }
                    cleanup(id) {
                        this.buffers.delete(id);
                    }
                    dispose() {
                        this.buffers.clear();
                    }
                    constructor(){
                        this.buffers = new Map();
                    }
                }
                exports1.SharedArraySenderStrategy = SharedArraySenderStrategy;
                class SharedArrayBufferCancellationToken {
                    get isCancellationRequested() {
                        return Atomics.load(this.data, 0) === CancellationState.Cancelled;
                    }
                    get onCancellationRequested() {
                        throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
                    }
                    constructor(buffer){
                        this.data = new Int32Array(buffer, 0, 1);
                    }
                }
                class SharedArrayBufferCancellationTokenSource {
                    cancel() {}
                    dispose() {}
                    constructor(buffer){
                        this.token = new SharedArrayBufferCancellationToken(buffer);
                    }
                }
                class SharedArrayReceiverStrategy {
                    createCancellationTokenSource(request) {
                        const buffer = request.$cancellationData;
                        if (buffer === undefined) {
                            return new cancellation_1.CancellationTokenSource();
                        }
                        return new SharedArrayBufferCancellationTokenSource(buffer);
                    }
                    constructor(){
                        this.kind = 'request';
                    }
                }
                exports1.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
            /***/ },
            /***/ 1789: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_425219__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */ module1.exports = __nested_webpack_require_425219__(294);
            /***/ },
            /***/ 294: /***/ function(__unused_webpack_module, exports1, __nested_webpack_require_425776__) {
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    var desc = Object.getOwnPropertyDescriptor(m, k);
                    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                        desc = {
                            enumerable: true,
                            get: function() {
                                return m[k];
                            }
                        };
                    }
                    Object.defineProperty(o, k2, desc);
                } : function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    o[k2] = m[k];
                });
                var __exportStar = this && this.__exportStar || function(m, exports1) {
                    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
                };
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.createProtocolConnection = void 0;
                const browser_1 = __nested_webpack_require_425776__(1200);
                __exportStar(__nested_webpack_require_425776__(1200), exports1);
                __exportStar(__nested_webpack_require_425776__(9372), exports1);
                function createProtocolConnection(reader, writer, logger, options) {
                    return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
                }
                exports1.createProtocolConnection = createProtocolConnection;
            /***/ },
            /***/ 9372: /***/ function(__unused_webpack_module, exports1, __nested_webpack_require_427965__) {
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    var desc = Object.getOwnPropertyDescriptor(m, k);
                    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                        desc = {
                            enumerable: true,
                            get: function() {
                                return m[k];
                            }
                        };
                    }
                    Object.defineProperty(o, k2, desc);
                } : function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    o[k2] = m[k];
                });
                var __exportStar = this && this.__exportStar || function(m, exports1) {
                    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
                };
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.LSPErrorCodes = exports1.createProtocolConnection = void 0;
                __exportStar(__nested_webpack_require_427965__(5953), exports1);
                __exportStar(__nested_webpack_require_427965__(4767), exports1);
                __exportStar(__nested_webpack_require_427965__(8599), exports1);
                __exportStar(__nested_webpack_require_427965__(6525), exports1);
                var connection_1 = __nested_webpack_require_427965__(2798);
                Object.defineProperty(exports1, "createProtocolConnection", {
                    enumerable: true,
                    get: function() {
                        return connection_1.createProtocolConnection;
                    }
                });
                var LSPErrorCodes;
                (function(LSPErrorCodes) {
                    /**
    * This is the start range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */ LSPErrorCodes.lspReservedErrorRangeStart = -32899;
                    /**
     * A request failed but it was syntactically correct, e.g the
     * method name was known and the parameters were valid. The error
     * message should contain human readable information about why
     * the request failed.
     *
     * @since 3.17.0
     */ LSPErrorCodes.RequestFailed = -32803;
                    /**
     * The server cancelled the request. This error code should
     * only be used for requests that explicitly support being
     * server cancellable.
     *
     * @since 3.17.0
     */ LSPErrorCodes.ServerCancelled = -32802;
                    /**
     * The server detected that the content of a document got
     * modified outside normal conditions. A server should
     * NOT send this error code if it detects a content change
     * in it unprocessed messages. The result even computed
     * on an older state might still be useful for the client.
     *
     * If a client decides that a result is not of any use anymore
     * the client should cancel the request.
     */ LSPErrorCodes.ContentModified = -32801;
                    /**
     * The client has canceled a request and a server as detected
     * the cancel.
     */ LSPErrorCodes.RequestCancelled = -32800;
                    /**
    * This is the end range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */ LSPErrorCodes.lspReservedErrorRangeEnd = -32800;
                })(LSPErrorCodes = exports1.LSPErrorCodes || (exports1.LSPErrorCodes = {}));
            /***/ },
            /***/ 2798: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_432116__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.createProtocolConnection = void 0;
                const vscode_jsonrpc_1 = __nested_webpack_require_432116__(5953);
                function createProtocolConnection(input, output, logger, options) {
                    if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
                        options = {
                            connectionStrategy: options
                        };
                    }
                    return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
                }
                exports1.createProtocolConnection = createProtocolConnection;
            /***/ },
            /***/ 8599: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_433353__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ProtocolNotificationType = exports1.ProtocolNotificationType0 = exports1.ProtocolRequestType = exports1.ProtocolRequestType0 = exports1.RegistrationType = exports1.MessageDirection = void 0;
                const vscode_jsonrpc_1 = __nested_webpack_require_433353__(5953);
                var MessageDirection;
                (function(MessageDirection) {
                    MessageDirection["clientToServer"] = "clientToServer";
                    MessageDirection["serverToClient"] = "serverToClient";
                    MessageDirection["both"] = "both";
                })(MessageDirection = exports1.MessageDirection || (exports1.MessageDirection = {}));
                class RegistrationType {
                    constructor(method){
                        this.method = method;
                    }
                }
                exports1.RegistrationType = RegistrationType;
                class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
                    constructor(method){
                        super(method);
                    }
                }
                exports1.ProtocolRequestType0 = ProtocolRequestType0;
                class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
                    constructor(method){
                        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
                    }
                }
                exports1.ProtocolRequestType = ProtocolRequestType;
                class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
                    constructor(method){
                        super(method);
                    }
                }
                exports1.ProtocolNotificationType0 = ProtocolNotificationType0;
                class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
                    constructor(method){
                        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
                    }
                }
                exports1.ProtocolNotificationType = ProtocolNotificationType;
            /***/ },
            /***/ 4434: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_436079__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.CallHierarchyOutgoingCallsRequest = exports1.CallHierarchyIncomingCallsRequest = exports1.CallHierarchyPrepareRequest = void 0;
                const messages_1 = __nested_webpack_require_436079__(8599);
                /**
 * A request to result a `CallHierarchyItem` in a document at a given position.
 * Can be used as an input to an incoming or outgoing call hierarchy.
 *
 * @since 3.16.0
 */ var CallHierarchyPrepareRequest;
                (function(CallHierarchyPrepareRequest) {
                    CallHierarchyPrepareRequest.method = 'textDocument/prepareCallHierarchy';
                    CallHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CallHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest.method);
                })(CallHierarchyPrepareRequest = exports1.CallHierarchyPrepareRequest || (exports1.CallHierarchyPrepareRequest = {}));
                /**
 * A request to resolve the incoming calls for a given `CallHierarchyItem`.
 *
 * @since 3.16.0
 */ var CallHierarchyIncomingCallsRequest;
                (function(CallHierarchyIncomingCallsRequest) {
                    CallHierarchyIncomingCallsRequest.method = 'callHierarchy/incomingCalls';
                    CallHierarchyIncomingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CallHierarchyIncomingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest.method);
                })(CallHierarchyIncomingCallsRequest = exports1.CallHierarchyIncomingCallsRequest || (exports1.CallHierarchyIncomingCallsRequest = {}));
                /**
 * A request to resolve the outgoing calls for a given `CallHierarchyItem`.
 *
 * @since 3.16.0
 */ var CallHierarchyOutgoingCallsRequest;
                (function(CallHierarchyOutgoingCallsRequest) {
                    CallHierarchyOutgoingCallsRequest.method = 'callHierarchy/outgoingCalls';
                    CallHierarchyOutgoingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CallHierarchyOutgoingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest.method);
                })(CallHierarchyOutgoingCallsRequest = exports1.CallHierarchyOutgoingCallsRequest || (exports1.CallHierarchyOutgoingCallsRequest = {}));
            /***/ },
            /***/ 7908: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_439110__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ColorPresentationRequest = exports1.DocumentColorRequest = void 0;
                const messages_1 = __nested_webpack_require_439110__(8599);
                /**
 * A request to list all color symbols found in a given text document. The request's
 * parameter is of type {@link DocumentColorParams} the
 * response is of type {@link ColorInformation ColorInformation[]} or a Thenable
 * that resolves to such.
 */ var DocumentColorRequest;
                (function(DocumentColorRequest) {
                    DocumentColorRequest.method = 'textDocument/documentColor';
                    DocumentColorRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentColorRequest.type = new messages_1.ProtocolRequestType(DocumentColorRequest.method);
                })(DocumentColorRequest = exports1.DocumentColorRequest || (exports1.DocumentColorRequest = {}));
                /**
 * A request to list all presentation for a color. The request's
 * parameter is of type {@link ColorPresentationParams} the
 * response is of type {@link ColorInformation ColorInformation[]} or a Thenable
 * that resolves to such.
 */ var ColorPresentationRequest;
                (function(ColorPresentationRequest) {
                    ColorPresentationRequest.method = 'textDocument/colorPresentation';
                    ColorPresentationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    ColorPresentationRequest.type = new messages_1.ProtocolRequestType(ColorPresentationRequest.method);
                })(ColorPresentationRequest = exports1.ColorPresentationRequest || (exports1.ColorPresentationRequest = {}));
            /***/ },
            /***/ 5442: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_441413__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ConfigurationRequest = void 0;
                const messages_1 = __nested_webpack_require_441413__(8599);
                //---- Get Configuration request ----
                /**
 * The 'workspace/configuration' request is sent from the server to the client to fetch a certain
 * configuration setting.
 *
 * This pull model replaces the old push model were the client signaled configuration change via an
 * event. If the server still needs to react to configuration changes (since the server caches the
 * result of `workspace/configuration` requests) the server should register for an empty configuration
 * change event and empty the cache if such an event is received.
 */ var ConfigurationRequest;
                (function(ConfigurationRequest) {
                    ConfigurationRequest.method = 'workspace/configuration';
                    ConfigurationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    ConfigurationRequest.type = new messages_1.ProtocolRequestType(ConfigurationRequest.method);
                })(ConfigurationRequest = exports1.ConfigurationRequest || (exports1.ConfigurationRequest = {}));
            /***/ },
            /***/ 7210: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_443195__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.DeclarationRequest = void 0;
                const messages_1 = __nested_webpack_require_443195__(8599);
                // @ts-ignore: to avoid inlining LocationLink as dynamic import
                let __noDynamicImport;
                /**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type {@link Declaration}
 * or a typed array of {@link DeclarationLink} or a Thenable that resolves
 * to such.
 */ var DeclarationRequest;
                (function(DeclarationRequest) {
                    DeclarationRequest.method = 'textDocument/declaration';
                    DeclarationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DeclarationRequest.type = new messages_1.ProtocolRequestType(DeclarationRequest.method);
                })(DeclarationRequest = exports1.DeclarationRequest || (exports1.DeclarationRequest = {}));
            /***/ },
            /***/ 5692: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_444860__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.DiagnosticRefreshRequest = exports1.WorkspaceDiagnosticRequest = exports1.DocumentDiagnosticRequest = exports1.DocumentDiagnosticReportKind = exports1.DiagnosticServerCancellationData = void 0;
                const vscode_jsonrpc_1 = __nested_webpack_require_444860__(5953);
                const Is = __nested_webpack_require_444860__(2523);
                const messages_1 = __nested_webpack_require_444860__(8599);
                /**
 * @since 3.17.0
 */ var DiagnosticServerCancellationData;
                (function(DiagnosticServerCancellationData) {
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.boolean(candidate.retriggerRequest);
                    }
                    DiagnosticServerCancellationData.is = is;
                })(DiagnosticServerCancellationData = exports1.DiagnosticServerCancellationData || (exports1.DiagnosticServerCancellationData = {}));
                /**
 * The document diagnostic report kinds.
 *
 * @since 3.17.0
 */ var DocumentDiagnosticReportKind;
                (function(DocumentDiagnosticReportKind) {
                    /**
     * A diagnostic report with a full
     * set of problems.
     */ DocumentDiagnosticReportKind.Full = 'full';
                    /**
     * A report indicating that the last
     * returned report is still accurate.
     */ DocumentDiagnosticReportKind.Unchanged = 'unchanged';
                })(DocumentDiagnosticReportKind = exports1.DocumentDiagnosticReportKind || (exports1.DocumentDiagnosticReportKind = {}));
                /**
 * The document diagnostic request definition.
 *
 * @since 3.17.0
 */ var DocumentDiagnosticRequest;
                (function(DocumentDiagnosticRequest) {
                    DocumentDiagnosticRequest.method = 'textDocument/diagnostic';
                    DocumentDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentDiagnosticRequest.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest.method);
                    DocumentDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
                })(DocumentDiagnosticRequest = exports1.DocumentDiagnosticRequest || (exports1.DocumentDiagnosticRequest = {}));
                /**
 * The workspace diagnostic request definition.
 *
 * @since 3.17.0
 */ var WorkspaceDiagnosticRequest;
                (function(WorkspaceDiagnosticRequest) {
                    WorkspaceDiagnosticRequest.method = 'workspace/diagnostic';
                    WorkspaceDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WorkspaceDiagnosticRequest.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest.method);
                    WorkspaceDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
                })(WorkspaceDiagnosticRequest = exports1.WorkspaceDiagnosticRequest || (exports1.WorkspaceDiagnosticRequest = {}));
                /**
 * The diagnostic refresh request definition.
 *
 * @since 3.17.0
 */ var DiagnosticRefreshRequest;
                (function(DiagnosticRefreshRequest) {
                    DiagnosticRefreshRequest.method = `workspace/diagnostic/refresh`;
                    DiagnosticRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    DiagnosticRefreshRequest.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest.method);
                })(DiagnosticRefreshRequest = exports1.DiagnosticRefreshRequest || (exports1.DiagnosticRefreshRequest = {}));
            /***/ },
            /***/ 6190: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_449104__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.WillDeleteFilesRequest = exports1.DidDeleteFilesNotification = exports1.DidRenameFilesNotification = exports1.WillRenameFilesRequest = exports1.DidCreateFilesNotification = exports1.WillCreateFilesRequest = exports1.FileOperationPatternKind = void 0;
                const messages_1 = __nested_webpack_require_449104__(8599);
                /**
 * A pattern kind describing if a glob pattern matches a file a folder or
 * both.
 *
 * @since 3.16.0
 */ var FileOperationPatternKind;
                (function(FileOperationPatternKind) {
                    /**
     * The pattern matches a file only.
     */ FileOperationPatternKind.file = 'file';
                    /**
     * The pattern matches a folder only.
     */ FileOperationPatternKind.folder = 'folder';
                })(FileOperationPatternKind = exports1.FileOperationPatternKind || (exports1.FileOperationPatternKind = {}));
                /**
 * The will create files request is sent from the client to the server before files are actually
 * created as long as the creation is triggered from within the client.
 *
 * The request can return a `WorkspaceEdit` which will be applied to workspace before the
 * files are created. Hence the `WorkspaceEdit` can not manipulate the content of the file
 * to be created.
 *
 * @since 3.16.0
 */ var WillCreateFilesRequest;
                (function(WillCreateFilesRequest) {
                    WillCreateFilesRequest.method = 'workspace/willCreateFiles';
                    WillCreateFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WillCreateFilesRequest.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest.method);
                })(WillCreateFilesRequest = exports1.WillCreateFilesRequest || (exports1.WillCreateFilesRequest = {}));
                /**
 * The did create files notification is sent from the client to the server when
 * files were created from within the client.
 *
 * @since 3.16.0
 */ var DidCreateFilesNotification;
                (function(DidCreateFilesNotification) {
                    DidCreateFilesNotification.method = 'workspace/didCreateFiles';
                    DidCreateFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidCreateFilesNotification.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification.method);
                })(DidCreateFilesNotification = exports1.DidCreateFilesNotification || (exports1.DidCreateFilesNotification = {}));
                /**
 * The will rename files request is sent from the client to the server before files are actually
 * renamed as long as the rename is triggered from within the client.
 *
 * @since 3.16.0
 */ var WillRenameFilesRequest;
                (function(WillRenameFilesRequest) {
                    WillRenameFilesRequest.method = 'workspace/willRenameFiles';
                    WillRenameFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WillRenameFilesRequest.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest.method);
                })(WillRenameFilesRequest = exports1.WillRenameFilesRequest || (exports1.WillRenameFilesRequest = {}));
                /**
 * The did rename files notification is sent from the client to the server when
 * files were renamed from within the client.
 *
 * @since 3.16.0
 */ var DidRenameFilesNotification;
                (function(DidRenameFilesNotification) {
                    DidRenameFilesNotification.method = 'workspace/didRenameFiles';
                    DidRenameFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidRenameFilesNotification.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification.method);
                })(DidRenameFilesNotification = exports1.DidRenameFilesNotification || (exports1.DidRenameFilesNotification = {}));
                /**
 * The will delete files request is sent from the client to the server before files are actually
 * deleted as long as the deletion is triggered from within the client.
 *
 * @since 3.16.0
 */ var DidDeleteFilesNotification;
                (function(DidDeleteFilesNotification) {
                    DidDeleteFilesNotification.method = 'workspace/didDeleteFiles';
                    DidDeleteFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidDeleteFilesNotification.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification.method);
                })(DidDeleteFilesNotification = exports1.DidDeleteFilesNotification || (exports1.DidDeleteFilesNotification = {}));
                /**
 * The did delete files notification is sent from the client to the server when
 * files were deleted from within the client.
 *
 * @since 3.16.0
 */ var WillDeleteFilesRequest;
                (function(WillDeleteFilesRequest) {
                    WillDeleteFilesRequest.method = 'workspace/willDeleteFiles';
                    WillDeleteFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WillDeleteFilesRequest.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest.method);
                })(WillDeleteFilesRequest = exports1.WillDeleteFilesRequest || (exports1.WillDeleteFilesRequest = {}));
            /***/ },
            /***/ 7029: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_455109__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.FoldingRangeRequest = void 0;
                const messages_1 = __nested_webpack_require_455109__(8599);
                /**
 * A request to provide folding ranges in a document. The request's
 * parameter is of type {@link FoldingRangeParams}, the
 * response is of type {@link FoldingRangeList} or a Thenable
 * that resolves to such.
 */ var FoldingRangeRequest;
                (function(FoldingRangeRequest) {
                    FoldingRangeRequest.method = 'textDocument/foldingRange';
                    FoldingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    FoldingRangeRequest.type = new messages_1.ProtocolRequestType(FoldingRangeRequest.method);
                })(FoldingRangeRequest = exports1.FoldingRangeRequest || (exports1.FoldingRangeRequest = {}));
            /***/ },
            /***/ 9380: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_456548__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ImplementationRequest = void 0;
                const messages_1 = __nested_webpack_require_456548__(8599);
                // @ts-ignore: to avoid inlining LocationLink as dynamic import
                let __noDynamicImport;
                /**
 * A request to resolve the implementation locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type {@link Definition} or a
 * Thenable that resolves to such.
 */ var ImplementationRequest;
                (function(ImplementationRequest) {
                    ImplementationRequest.method = 'textDocument/implementation';
                    ImplementationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    ImplementationRequest.type = new messages_1.ProtocolRequestType(ImplementationRequest.method);
                })(ImplementationRequest = exports1.ImplementationRequest || (exports1.ImplementationRequest = {}));
            /***/ },
            /***/ 6315: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_458197__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.InlayHintRefreshRequest = exports1.InlayHintResolveRequest = exports1.InlayHintRequest = void 0;
                const messages_1 = __nested_webpack_require_458197__(8599);
                /**
 * A request to provide inlay hints in a document. The request's parameter is of
 * type {@link InlayHintsParams}, the response is of type
 * {@link InlayHint InlayHint[]} or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */ var InlayHintRequest;
                (function(InlayHintRequest) {
                    InlayHintRequest.method = 'textDocument/inlayHint';
                    InlayHintRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    InlayHintRequest.type = new messages_1.ProtocolRequestType(InlayHintRequest.method);
                })(InlayHintRequest = exports1.InlayHintRequest || (exports1.InlayHintRequest = {}));
                /**
 * A request to resolve additional properties for an inlay hint.
 * The request's parameter is of type {@link InlayHint}, the response is
 * of type {@link InlayHint} or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */ var InlayHintResolveRequest;
                (function(InlayHintResolveRequest) {
                    InlayHintResolveRequest.method = 'inlayHint/resolve';
                    InlayHintResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    InlayHintResolveRequest.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest.method);
                })(InlayHintResolveRequest = exports1.InlayHintResolveRequest || (exports1.InlayHintResolveRequest = {}));
                /**
 * @since 3.17.0
 */ var InlayHintRefreshRequest;
                (function(InlayHintRefreshRequest) {
                    InlayHintRefreshRequest.method = `workspace/inlayHint/refresh`;
                    InlayHintRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    InlayHintRefreshRequest.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest.method);
                })(InlayHintRefreshRequest = exports1.InlayHintRefreshRequest || (exports1.InlayHintRefreshRequest = {}));
            /***/ },
            /***/ 7425: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_461000__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.InlineValueRefreshRequest = exports1.InlineValueRequest = void 0;
                const messages_1 = __nested_webpack_require_461000__(8599);
                /**
 * A request to provide inline values in a document. The request's parameter is of
 * type {@link InlineValueParams}, the response is of type
 * {@link InlineValue InlineValue[]} or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */ var InlineValueRequest;
                (function(InlineValueRequest) {
                    InlineValueRequest.method = 'textDocument/inlineValue';
                    InlineValueRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    InlineValueRequest.type = new messages_1.ProtocolRequestType(InlineValueRequest.method);
                })(InlineValueRequest = exports1.InlineValueRequest || (exports1.InlineValueRequest = {}));
                /**
 * @since 3.17.0
 */ var InlineValueRefreshRequest;
                (function(InlineValueRefreshRequest) {
                    InlineValueRefreshRequest.method = `workspace/inlineValue/refresh`;
                    InlineValueRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    InlineValueRefreshRequest.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest.method);
                })(InlineValueRefreshRequest = exports1.InlineValueRefreshRequest || (exports1.InlineValueRefreshRequest = {}));
            /***/ },
            /***/ 6525: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_463066__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.WorkspaceSymbolRequest = exports1.CodeActionResolveRequest = exports1.CodeActionRequest = exports1.DocumentSymbolRequest = exports1.DocumentHighlightRequest = exports1.ReferencesRequest = exports1.DefinitionRequest = exports1.SignatureHelpRequest = exports1.SignatureHelpTriggerKind = exports1.HoverRequest = exports1.CompletionResolveRequest = exports1.CompletionRequest = exports1.CompletionTriggerKind = exports1.PublishDiagnosticsNotification = exports1.WatchKind = exports1.RelativePattern = exports1.FileChangeType = exports1.DidChangeWatchedFilesNotification = exports1.WillSaveTextDocumentWaitUntilRequest = exports1.WillSaveTextDocumentNotification = exports1.TextDocumentSaveReason = exports1.DidSaveTextDocumentNotification = exports1.DidCloseTextDocumentNotification = exports1.DidChangeTextDocumentNotification = exports1.TextDocumentContentChangeEvent = exports1.DidOpenTextDocumentNotification = exports1.TextDocumentSyncKind = exports1.TelemetryEventNotification = exports1.LogMessageNotification = exports1.ShowMessageRequest = exports1.ShowMessageNotification = exports1.MessageType = exports1.DidChangeConfigurationNotification = exports1.ExitNotification = exports1.ShutdownRequest = exports1.InitializedNotification = exports1.InitializeErrorCodes = exports1.InitializeRequest = exports1.WorkDoneProgressOptions = exports1.TextDocumentRegistrationOptions = exports1.StaticRegistrationOptions = exports1.PositionEncodingKind = exports1.FailureHandlingKind = exports1.ResourceOperationKind = exports1.UnregistrationRequest = exports1.RegistrationRequest = exports1.DocumentSelector = exports1.NotebookCellTextDocumentFilter = exports1.NotebookDocumentFilter = exports1.TextDocumentFilter = void 0;
                exports1.TypeHierarchySubtypesRequest = exports1.TypeHierarchyPrepareRequest = exports1.MonikerRequest = exports1.MonikerKind = exports1.UniquenessLevel = exports1.WillDeleteFilesRequest = exports1.DidDeleteFilesNotification = exports1.WillRenameFilesRequest = exports1.DidRenameFilesNotification = exports1.WillCreateFilesRequest = exports1.DidCreateFilesNotification = exports1.FileOperationPatternKind = exports1.LinkedEditingRangeRequest = exports1.ShowDocumentRequest = exports1.SemanticTokensRegistrationType = exports1.SemanticTokensRefreshRequest = exports1.SemanticTokensRangeRequest = exports1.SemanticTokensDeltaRequest = exports1.SemanticTokensRequest = exports1.TokenFormat = exports1.CallHierarchyPrepareRequest = exports1.CallHierarchyOutgoingCallsRequest = exports1.CallHierarchyIncomingCallsRequest = exports1.WorkDoneProgressCancelNotification = exports1.WorkDoneProgressCreateRequest = exports1.WorkDoneProgress = exports1.SelectionRangeRequest = exports1.DeclarationRequest = exports1.FoldingRangeRequest = exports1.ColorPresentationRequest = exports1.DocumentColorRequest = exports1.ConfigurationRequest = exports1.DidChangeWorkspaceFoldersNotification = exports1.WorkspaceFoldersRequest = exports1.TypeDefinitionRequest = exports1.ImplementationRequest = exports1.ApplyWorkspaceEditRequest = exports1.ExecuteCommandRequest = exports1.PrepareRenameRequest = exports1.RenameRequest = exports1.PrepareSupportDefaultBehavior = exports1.DocumentOnTypeFormattingRequest = exports1.DocumentRangeFormattingRequest = exports1.DocumentFormattingRequest = exports1.DocumentLinkResolveRequest = exports1.DocumentLinkRequest = exports1.CodeLensRefreshRequest = exports1.CodeLensResolveRequest = exports1.CodeLensRequest = exports1.WorkspaceSymbolResolveRequest = void 0;
                exports1.DidCloseNotebookDocumentNotification = exports1.DidSaveNotebookDocumentNotification = exports1.DidChangeNotebookDocumentNotification = exports1.NotebookCellArrayChange = exports1.DidOpenNotebookDocumentNotification = exports1.NotebookDocumentSyncRegistrationType = exports1.NotebookDocument = exports1.NotebookCell = exports1.ExecutionSummary = exports1.NotebookCellKind = exports1.DiagnosticRefreshRequest = exports1.WorkspaceDiagnosticRequest = exports1.DocumentDiagnosticRequest = exports1.DocumentDiagnosticReportKind = exports1.DiagnosticServerCancellationData = exports1.InlayHintRefreshRequest = exports1.InlayHintResolveRequest = exports1.InlayHintRequest = exports1.InlineValueRefreshRequest = exports1.InlineValueRequest = exports1.TypeHierarchySupertypesRequest = void 0;
                const messages_1 = __nested_webpack_require_463066__(8599);
                const vscode_languageserver_types_1 = __nested_webpack_require_463066__(4767);
                const Is = __nested_webpack_require_463066__(2523);
                const protocol_implementation_1 = __nested_webpack_require_463066__(9380);
                Object.defineProperty(exports1, "ImplementationRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_implementation_1.ImplementationRequest;
                    }
                });
                const protocol_typeDefinition_1 = __nested_webpack_require_463066__(8642);
                Object.defineProperty(exports1, "TypeDefinitionRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_typeDefinition_1.TypeDefinitionRequest;
                    }
                });
                const protocol_workspaceFolder_1 = __nested_webpack_require_463066__(3402);
                Object.defineProperty(exports1, "WorkspaceFoldersRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
                    }
                });
                Object.defineProperty(exports1, "DidChangeWorkspaceFoldersNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
                    }
                });
                const protocol_configuration_1 = __nested_webpack_require_463066__(5442);
                Object.defineProperty(exports1, "ConfigurationRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_configuration_1.ConfigurationRequest;
                    }
                });
                const protocol_colorProvider_1 = __nested_webpack_require_463066__(7908);
                Object.defineProperty(exports1, "DocumentColorRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_colorProvider_1.DocumentColorRequest;
                    }
                });
                Object.defineProperty(exports1, "ColorPresentationRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_colorProvider_1.ColorPresentationRequest;
                    }
                });
                const protocol_foldingRange_1 = __nested_webpack_require_463066__(7029);
                Object.defineProperty(exports1, "FoldingRangeRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_foldingRange_1.FoldingRangeRequest;
                    }
                });
                const protocol_declaration_1 = __nested_webpack_require_463066__(7210);
                Object.defineProperty(exports1, "DeclarationRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_declaration_1.DeclarationRequest;
                    }
                });
                const protocol_selectionRange_1 = __nested_webpack_require_463066__(2392);
                Object.defineProperty(exports1, "SelectionRangeRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_selectionRange_1.SelectionRangeRequest;
                    }
                });
                const protocol_progress_1 = __nested_webpack_require_463066__(7895);
                Object.defineProperty(exports1, "WorkDoneProgress", {
                    enumerable: true,
                    get: function() {
                        return protocol_progress_1.WorkDoneProgress;
                    }
                });
                Object.defineProperty(exports1, "WorkDoneProgressCreateRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_progress_1.WorkDoneProgressCreateRequest;
                    }
                });
                Object.defineProperty(exports1, "WorkDoneProgressCancelNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_progress_1.WorkDoneProgressCancelNotification;
                    }
                });
                const protocol_callHierarchy_1 = __nested_webpack_require_463066__(4434);
                Object.defineProperty(exports1, "CallHierarchyIncomingCallsRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
                    }
                });
                Object.defineProperty(exports1, "CallHierarchyOutgoingCallsRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
                    }
                });
                Object.defineProperty(exports1, "CallHierarchyPrepareRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
                    }
                });
                const protocol_semanticTokens_1 = __nested_webpack_require_463066__(8489);
                Object.defineProperty(exports1, "TokenFormat", {
                    enumerable: true,
                    get: function() {
                        return protocol_semanticTokens_1.TokenFormat;
                    }
                });
                Object.defineProperty(exports1, "SemanticTokensRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_semanticTokens_1.SemanticTokensRequest;
                    }
                });
                Object.defineProperty(exports1, "SemanticTokensDeltaRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
                    }
                });
                Object.defineProperty(exports1, "SemanticTokensRangeRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_semanticTokens_1.SemanticTokensRangeRequest;
                    }
                });
                Object.defineProperty(exports1, "SemanticTokensRefreshRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
                    }
                });
                Object.defineProperty(exports1, "SemanticTokensRegistrationType", {
                    enumerable: true,
                    get: function() {
                        return protocol_semanticTokens_1.SemanticTokensRegistrationType;
                    }
                });
                const protocol_showDocument_1 = __nested_webpack_require_463066__(1541);
                Object.defineProperty(exports1, "ShowDocumentRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_showDocument_1.ShowDocumentRequest;
                    }
                });
                const protocol_linkedEditingRange_1 = __nested_webpack_require_463066__(527);
                Object.defineProperty(exports1, "LinkedEditingRangeRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
                    }
                });
                const protocol_fileOperations_1 = __nested_webpack_require_463066__(6190);
                Object.defineProperty(exports1, "FileOperationPatternKind", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.FileOperationPatternKind;
                    }
                });
                Object.defineProperty(exports1, "DidCreateFilesNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.DidCreateFilesNotification;
                    }
                });
                Object.defineProperty(exports1, "WillCreateFilesRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.WillCreateFilesRequest;
                    }
                });
                Object.defineProperty(exports1, "DidRenameFilesNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.DidRenameFilesNotification;
                    }
                });
                Object.defineProperty(exports1, "WillRenameFilesRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.WillRenameFilesRequest;
                    }
                });
                Object.defineProperty(exports1, "DidDeleteFilesNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.DidDeleteFilesNotification;
                    }
                });
                Object.defineProperty(exports1, "WillDeleteFilesRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_fileOperations_1.WillDeleteFilesRequest;
                    }
                });
                const protocol_moniker_1 = __nested_webpack_require_463066__(1964);
                Object.defineProperty(exports1, "UniquenessLevel", {
                    enumerable: true,
                    get: function() {
                        return protocol_moniker_1.UniquenessLevel;
                    }
                });
                Object.defineProperty(exports1, "MonikerKind", {
                    enumerable: true,
                    get: function() {
                        return protocol_moniker_1.MonikerKind;
                    }
                });
                Object.defineProperty(exports1, "MonikerRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_moniker_1.MonikerRequest;
                    }
                });
                const protocol_typeHierarchy_1 = __nested_webpack_require_463066__(5318);
                Object.defineProperty(exports1, "TypeHierarchyPrepareRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
                    }
                });
                Object.defineProperty(exports1, "TypeHierarchySubtypesRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
                    }
                });
                Object.defineProperty(exports1, "TypeHierarchySupertypesRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
                    }
                });
                const protocol_inlineValue_1 = __nested_webpack_require_463066__(7425);
                Object.defineProperty(exports1, "InlineValueRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_inlineValue_1.InlineValueRequest;
                    }
                });
                Object.defineProperty(exports1, "InlineValueRefreshRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_inlineValue_1.InlineValueRefreshRequest;
                    }
                });
                const protocol_inlayHint_1 = __nested_webpack_require_463066__(6315);
                Object.defineProperty(exports1, "InlayHintRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_inlayHint_1.InlayHintRequest;
                    }
                });
                Object.defineProperty(exports1, "InlayHintResolveRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_inlayHint_1.InlayHintResolveRequest;
                    }
                });
                Object.defineProperty(exports1, "InlayHintRefreshRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_inlayHint_1.InlayHintRefreshRequest;
                    }
                });
                const protocol_diagnostic_1 = __nested_webpack_require_463066__(5692);
                Object.defineProperty(exports1, "DiagnosticServerCancellationData", {
                    enumerable: true,
                    get: function() {
                        return protocol_diagnostic_1.DiagnosticServerCancellationData;
                    }
                });
                Object.defineProperty(exports1, "DocumentDiagnosticReportKind", {
                    enumerable: true,
                    get: function() {
                        return protocol_diagnostic_1.DocumentDiagnosticReportKind;
                    }
                });
                Object.defineProperty(exports1, "DocumentDiagnosticRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_diagnostic_1.DocumentDiagnosticRequest;
                    }
                });
                Object.defineProperty(exports1, "WorkspaceDiagnosticRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
                    }
                });
                Object.defineProperty(exports1, "DiagnosticRefreshRequest", {
                    enumerable: true,
                    get: function() {
                        return protocol_diagnostic_1.DiagnosticRefreshRequest;
                    }
                });
                const protocol_notebook_1 = __nested_webpack_require_463066__(4460);
                Object.defineProperty(exports1, "NotebookCellKind", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.NotebookCellKind;
                    }
                });
                Object.defineProperty(exports1, "ExecutionSummary", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.ExecutionSummary;
                    }
                });
                Object.defineProperty(exports1, "NotebookCell", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.NotebookCell;
                    }
                });
                Object.defineProperty(exports1, "NotebookDocument", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.NotebookDocument;
                    }
                });
                Object.defineProperty(exports1, "NotebookDocumentSyncRegistrationType", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
                    }
                });
                Object.defineProperty(exports1, "DidOpenNotebookDocumentNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.DidOpenNotebookDocumentNotification;
                    }
                });
                Object.defineProperty(exports1, "NotebookCellArrayChange", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.NotebookCellArrayChange;
                    }
                });
                Object.defineProperty(exports1, "DidChangeNotebookDocumentNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.DidChangeNotebookDocumentNotification;
                    }
                });
                Object.defineProperty(exports1, "DidSaveNotebookDocumentNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.DidSaveNotebookDocumentNotification;
                    }
                });
                Object.defineProperty(exports1, "DidCloseNotebookDocumentNotification", {
                    enumerable: true,
                    get: function() {
                        return protocol_notebook_1.DidCloseNotebookDocumentNotification;
                    }
                });
                // @ts-ignore: to avoid inlining LocationLink as dynamic import
                let __noDynamicImport;
                /**
 * The TextDocumentFilter namespace provides helper functions to work with
 * {@link TextDocumentFilter} literals.
 *
 * @since 3.17.0
 */ var TextDocumentFilter;
                (function(TextDocumentFilter) {
                    function is(value) {
                        const candidate = value;
                        return Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
                    }
                    TextDocumentFilter.is = is;
                })(TextDocumentFilter = exports1.TextDocumentFilter || (exports1.TextDocumentFilter = {}));
                /**
 * The NotebookDocumentFilter namespace provides helper functions to work with
 * {@link NotebookDocumentFilter} literals.
 *
 * @since 3.17.0
 */ var NotebookDocumentFilter;
                (function(NotebookDocumentFilter) {
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
                    }
                    NotebookDocumentFilter.is = is;
                })(NotebookDocumentFilter = exports1.NotebookDocumentFilter || (exports1.NotebookDocumentFilter = {}));
                /**
 * The NotebookCellTextDocumentFilter namespace provides helper functions to work with
 * {@link NotebookCellTextDocumentFilter} literals.
 *
 * @since 3.17.0
 */ var NotebookCellTextDocumentFilter;
                (function(NotebookCellTextDocumentFilter) {
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === undefined || Is.string(candidate.language));
                    }
                    NotebookCellTextDocumentFilter.is = is;
                })(NotebookCellTextDocumentFilter = exports1.NotebookCellTextDocumentFilter || (exports1.NotebookCellTextDocumentFilter = {}));
                /**
 * The DocumentSelector namespace provides helper functions to work with
 * {@link DocumentSelector}s.
 */ var DocumentSelector;
                (function(DocumentSelector) {
                    function is(value) {
                        if (!Array.isArray(value)) {
                            return false;
                        }
                        for (let elem of value){
                            if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
                                return false;
                            }
                        }
                        return true;
                    }
                    DocumentSelector.is = is;
                })(DocumentSelector = exports1.DocumentSelector || (exports1.DocumentSelector = {}));
                /**
 * The `client/registerCapability` request is sent from the server to the client to register a new capability
 * handler on the client side.
 */ var RegistrationRequest;
                (function(RegistrationRequest) {
                    RegistrationRequest.method = 'client/registerCapability';
                    RegistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    RegistrationRequest.type = new messages_1.ProtocolRequestType(RegistrationRequest.method);
                })(RegistrationRequest = exports1.RegistrationRequest || (exports1.RegistrationRequest = {}));
                /**
 * The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
 * handler on the client side.
 */ var UnregistrationRequest;
                (function(UnregistrationRequest) {
                    UnregistrationRequest.method = 'client/unregisterCapability';
                    UnregistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    UnregistrationRequest.type = new messages_1.ProtocolRequestType(UnregistrationRequest.method);
                })(UnregistrationRequest = exports1.UnregistrationRequest || (exports1.UnregistrationRequest = {}));
                var ResourceOperationKind;
                (function(ResourceOperationKind) {
                    /**
     * Supports creating new files and folders.
     */ ResourceOperationKind.Create = 'create';
                    /**
     * Supports renaming existing files and folders.
     */ ResourceOperationKind.Rename = 'rename';
                    /**
     * Supports deleting existing files and folders.
     */ ResourceOperationKind.Delete = 'delete';
                })(ResourceOperationKind = exports1.ResourceOperationKind || (exports1.ResourceOperationKind = {}));
                var FailureHandlingKind;
                (function(FailureHandlingKind) {
                    /**
     * Applying the workspace change is simply aborted if one of the changes provided
     * fails. All operations executed before the failing operation stay executed.
     */ FailureHandlingKind.Abort = 'abort';
                    /**
     * All operations are executed transactional. That means they either all
     * succeed or no changes at all are applied to the workspace.
     */ FailureHandlingKind.Transactional = 'transactional';
                    /**
     * If the workspace edit contains only textual file changes they are executed transactional.
     * If resource changes (create, rename or delete file) are part of the change the failure
     * handling strategy is abort.
     */ FailureHandlingKind.TextOnlyTransactional = 'textOnlyTransactional';
                    /**
     * The client tries to undo the operations already executed. But there is no
     * guarantee that this is succeeding.
     */ FailureHandlingKind.Undo = 'undo';
                })(FailureHandlingKind = exports1.FailureHandlingKind || (exports1.FailureHandlingKind = {}));
                /**
 * A set of predefined position encoding kinds.
 *
 * @since 3.17.0
 */ var PositionEncodingKind;
                (function(PositionEncodingKind) {
                    /**
     * Character offsets count UTF-8 code units (e.g. bytes).
     */ PositionEncodingKind.UTF8 = 'utf-8';
                    /**
     * Character offsets count UTF-16 code units.
     *
     * This is the default and must always be supported
     * by servers
     */ PositionEncodingKind.UTF16 = 'utf-16';
                    /**
     * Character offsets count UTF-32 code units.
     *
     * Implementation note: these are the same as Unicode codepoints,
     * so this `PositionEncodingKind` may also be used for an
     * encoding-agnostic representation of character offsets.
     */ PositionEncodingKind.UTF32 = 'utf-32';
                })(PositionEncodingKind = exports1.PositionEncodingKind || (exports1.PositionEncodingKind = {}));
                /**
 * The StaticRegistrationOptions namespace provides helper functions to work with
 * {@link StaticRegistrationOptions} literals.
 */ var StaticRegistrationOptions;
                (function(StaticRegistrationOptions) {
                    function hasId(value) {
                        const candidate = value;
                        return candidate && Is.string(candidate.id) && candidate.id.length > 0;
                    }
                    StaticRegistrationOptions.hasId = hasId;
                })(StaticRegistrationOptions = exports1.StaticRegistrationOptions || (exports1.StaticRegistrationOptions = {}));
                /**
 * The TextDocumentRegistrationOptions namespace provides helper functions to work with
 * {@link TextDocumentRegistrationOptions} literals.
 */ var TextDocumentRegistrationOptions;
                (function(TextDocumentRegistrationOptions) {
                    function is(value) {
                        const candidate = value;
                        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
                    }
                    TextDocumentRegistrationOptions.is = is;
                })(TextDocumentRegistrationOptions = exports1.TextDocumentRegistrationOptions || (exports1.TextDocumentRegistrationOptions = {}));
                /**
 * The WorkDoneProgressOptions namespace provides helper functions to work with
 * {@link WorkDoneProgressOptions} literals.
 */ var WorkDoneProgressOptions;
                (function(WorkDoneProgressOptions) {
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && (candidate.workDoneProgress === undefined || Is.boolean(candidate.workDoneProgress));
                    }
                    WorkDoneProgressOptions.is = is;
                    function hasWorkDoneProgress(value) {
                        const candidate = value;
                        return candidate && Is.boolean(candidate.workDoneProgress);
                    }
                    WorkDoneProgressOptions.hasWorkDoneProgress = hasWorkDoneProgress;
                })(WorkDoneProgressOptions = exports1.WorkDoneProgressOptions || (exports1.WorkDoneProgressOptions = {}));
                /**
 * The initialize request is sent from the client to the server.
 * It is sent once as the request after starting up the server.
 * The requests parameter is of type {@link InitializeParams}
 * the response if of type {@link InitializeResult} of a Thenable that
 * resolves to such.
 */ var InitializeRequest;
                (function(InitializeRequest) {
                    InitializeRequest.method = 'initialize';
                    InitializeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    InitializeRequest.type = new messages_1.ProtocolRequestType(InitializeRequest.method);
                })(InitializeRequest = exports1.InitializeRequest || (exports1.InitializeRequest = {}));
                /**
 * Known error codes for an `InitializeErrorCodes`;
 */ var InitializeErrorCodes;
                (function(InitializeErrorCodes) {
                    /**
     * If the protocol version provided by the client can't be handled by the server.
     *
     * @deprecated This initialize error got replaced by client capabilities. There is
     * no version handshake in version 3.0x
     */ InitializeErrorCodes.unknownProtocolVersion = 1;
                })(InitializeErrorCodes = exports1.InitializeErrorCodes || (exports1.InitializeErrorCodes = {}));
                /**
 * The initialized notification is sent from the client to the
 * server after the client is fully initialized and the server
 * is allowed to send requests from the server to the client.
 */ var InitializedNotification;
                (function(InitializedNotification) {
                    InitializedNotification.method = 'initialized';
                    InitializedNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    InitializedNotification.type = new messages_1.ProtocolNotificationType(InitializedNotification.method);
                })(InitializedNotification = exports1.InitializedNotification || (exports1.InitializedNotification = {}));
                //---- Shutdown Method ----
                /**
 * A shutdown request is sent from the client to the server.
 * It is sent once when the client decides to shutdown the
 * server. The only notification that is sent after a shutdown request
 * is the exit event.
 */ var ShutdownRequest;
                (function(ShutdownRequest) {
                    ShutdownRequest.method = 'shutdown';
                    ShutdownRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    ShutdownRequest.type = new messages_1.ProtocolRequestType0(ShutdownRequest.method);
                })(ShutdownRequest = exports1.ShutdownRequest || (exports1.ShutdownRequest = {}));
                //---- Exit Notification ----
                /**
 * The exit event is sent from the client to the server to
 * ask the server to exit its process.
 */ var ExitNotification;
                (function(ExitNotification) {
                    ExitNotification.method = 'exit';
                    ExitNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    ExitNotification.type = new messages_1.ProtocolNotificationType0(ExitNotification.method);
                })(ExitNotification = exports1.ExitNotification || (exports1.ExitNotification = {}));
                /**
 * The configuration change notification is sent from the client to the server
 * when the client's configuration has changed. The notification contains
 * the changed configuration as defined by the language client.
 */ var DidChangeConfigurationNotification;
                (function(DidChangeConfigurationNotification) {
                    DidChangeConfigurationNotification.method = 'workspace/didChangeConfiguration';
                    DidChangeConfigurationNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidChangeConfigurationNotification.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification.method);
                })(DidChangeConfigurationNotification = exports1.DidChangeConfigurationNotification || (exports1.DidChangeConfigurationNotification = {}));
                //---- Message show and log notifications ----
                /**
 * The message type
 */ var MessageType;
                (function(MessageType) {
                    /**
     * An error message.
     */ MessageType.Error = 1;
                    /**
     * A warning message.
     */ MessageType.Warning = 2;
                    /**
     * An information message.
     */ MessageType.Info = 3;
                    /**
     * A log message.
     */ MessageType.Log = 4;
                })(MessageType = exports1.MessageType || (exports1.MessageType = {}));
                /**
 * The show message notification is sent from a server to a client to ask
 * the client to display a particular message in the user interface.
 */ var ShowMessageNotification;
                (function(ShowMessageNotification) {
                    ShowMessageNotification.method = 'window/showMessage';
                    ShowMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
                    ShowMessageNotification.type = new messages_1.ProtocolNotificationType(ShowMessageNotification.method);
                })(ShowMessageNotification = exports1.ShowMessageNotification || (exports1.ShowMessageNotification = {}));
                /**
 * The show message request is sent from the server to the client to show a message
 * and a set of options actions to the user.
 */ var ShowMessageRequest;
                (function(ShowMessageRequest) {
                    ShowMessageRequest.method = 'window/showMessageRequest';
                    ShowMessageRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    ShowMessageRequest.type = new messages_1.ProtocolRequestType(ShowMessageRequest.method);
                })(ShowMessageRequest = exports1.ShowMessageRequest || (exports1.ShowMessageRequest = {}));
                /**
 * The log message notification is sent from the server to the client to ask
 * the client to log a particular message.
 */ var LogMessageNotification;
                (function(LogMessageNotification) {
                    LogMessageNotification.method = 'window/logMessage';
                    LogMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
                    LogMessageNotification.type = new messages_1.ProtocolNotificationType(LogMessageNotification.method);
                })(LogMessageNotification = exports1.LogMessageNotification || (exports1.LogMessageNotification = {}));
                //---- Telemetry notification
                /**
 * The telemetry event notification is sent from the server to the client to ask
 * the client to log telemetry data.
 */ var TelemetryEventNotification;
                (function(TelemetryEventNotification) {
                    TelemetryEventNotification.method = 'telemetry/event';
                    TelemetryEventNotification.messageDirection = messages_1.MessageDirection.serverToClient;
                    TelemetryEventNotification.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification.method);
                })(TelemetryEventNotification = exports1.TelemetryEventNotification || (exports1.TelemetryEventNotification = {}));
                /**
 * Defines how the host (editor) should sync
 * document changes to the language server.
 */ var TextDocumentSyncKind;
                (function(TextDocumentSyncKind) {
                    /**
     * Documents should not be synced at all.
     */ TextDocumentSyncKind.None = 0;
                    /**
     * Documents are synced by always sending the full content
     * of the document.
     */ TextDocumentSyncKind.Full = 1;
                    /**
     * Documents are synced by sending the full content on open.
     * After that only incremental updates to the document are
     * send.
     */ TextDocumentSyncKind.Incremental = 2;
                })(TextDocumentSyncKind = exports1.TextDocumentSyncKind || (exports1.TextDocumentSyncKind = {}));
                /**
 * The document open notification is sent from the client to the server to signal
 * newly opened text documents. The document's truth is now managed by the client
 * and the server must not try to read the document's truth using the document's
 * uri. Open in this sense means it is managed by the client. It doesn't necessarily
 * mean that its content is presented in an editor. An open notification must not
 * be sent more than once without a corresponding close notification send before.
 * This means open and close notification must be balanced and the max open count
 * is one.
 */ var DidOpenTextDocumentNotification;
                (function(DidOpenTextDocumentNotification) {
                    DidOpenTextDocumentNotification.method = 'textDocument/didOpen';
                    DidOpenTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidOpenTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification.method);
                })(DidOpenTextDocumentNotification = exports1.DidOpenTextDocumentNotification || (exports1.DidOpenTextDocumentNotification = {}));
                var TextDocumentContentChangeEvent;
                (function(TextDocumentContentChangeEvent) {
                    /**
     * Checks whether the information describes a delta event.
     */ function isIncremental(event) {
                        let candidate = event;
                        return candidate !== undefined && candidate !== null && typeof candidate.text === 'string' && candidate.range !== undefined && (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
                    }
                    TextDocumentContentChangeEvent.isIncremental = isIncremental;
                    /**
     * Checks whether the information describes a full replacement event.
     */ function isFull(event) {
                        let candidate = event;
                        return candidate !== undefined && candidate !== null && typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
                    }
                    TextDocumentContentChangeEvent.isFull = isFull;
                })(TextDocumentContentChangeEvent = exports1.TextDocumentContentChangeEvent || (exports1.TextDocumentContentChangeEvent = {}));
                /**
 * The document change notification is sent from the client to the server to signal
 * changes to a text document.
 */ var DidChangeTextDocumentNotification;
                (function(DidChangeTextDocumentNotification) {
                    DidChangeTextDocumentNotification.method = 'textDocument/didChange';
                    DidChangeTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidChangeTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification.method);
                })(DidChangeTextDocumentNotification = exports1.DidChangeTextDocumentNotification || (exports1.DidChangeTextDocumentNotification = {}));
                /**
 * The document close notification is sent from the client to the server when
 * the document got closed in the client. The document's truth now exists where
 * the document's uri points to (e.g. if the document's uri is a file uri the
 * truth now exists on disk). As with the open notification the close notification
 * is about managing the document's content. Receiving a close notification
 * doesn't mean that the document was open in an editor before. A close
 * notification requires a previous open notification to be sent.
 */ var DidCloseTextDocumentNotification;
                (function(DidCloseTextDocumentNotification) {
                    DidCloseTextDocumentNotification.method = 'textDocument/didClose';
                    DidCloseTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidCloseTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification.method);
                })(DidCloseTextDocumentNotification = exports1.DidCloseTextDocumentNotification || (exports1.DidCloseTextDocumentNotification = {}));
                /**
 * The document save notification is sent from the client to the server when
 * the document got saved in the client.
 */ var DidSaveTextDocumentNotification;
                (function(DidSaveTextDocumentNotification) {
                    DidSaveTextDocumentNotification.method = 'textDocument/didSave';
                    DidSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification.method);
                })(DidSaveTextDocumentNotification = exports1.DidSaveTextDocumentNotification || (exports1.DidSaveTextDocumentNotification = {}));
                /**
 * Represents reasons why a text document is saved.
 */ var TextDocumentSaveReason;
                (function(TextDocumentSaveReason) {
                    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */ TextDocumentSaveReason.Manual = 1;
                    /**
     * Automatic after a delay.
     */ TextDocumentSaveReason.AfterDelay = 2;
                    /**
     * When the editor lost focus.
     */ TextDocumentSaveReason.FocusOut = 3;
                })(TextDocumentSaveReason = exports1.TextDocumentSaveReason || (exports1.TextDocumentSaveReason = {}));
                /**
 * A document will save notification is sent from the client to the server before
 * the document is actually saved.
 */ var WillSaveTextDocumentNotification;
                (function(WillSaveTextDocumentNotification) {
                    WillSaveTextDocumentNotification.method = 'textDocument/willSave';
                    WillSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    WillSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification.method);
                })(WillSaveTextDocumentNotification = exports1.WillSaveTextDocumentNotification || (exports1.WillSaveTextDocumentNotification = {}));
                /**
 * A document will save request is sent from the client to the server before
 * the document is actually saved. The request can return an array of TextEdits
 * which will be applied to the text document before it is saved. Please note that
 * clients might drop results if computing the text edits took too long or if a
 * server constantly fails on this request. This is done to keep the save fast and
 * reliable.
 */ var WillSaveTextDocumentWaitUntilRequest;
                (function(WillSaveTextDocumentWaitUntilRequest) {
                    WillSaveTextDocumentWaitUntilRequest.method = 'textDocument/willSaveWaitUntil';
                    WillSaveTextDocumentWaitUntilRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WillSaveTextDocumentWaitUntilRequest.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest.method);
                })(WillSaveTextDocumentWaitUntilRequest = exports1.WillSaveTextDocumentWaitUntilRequest || (exports1.WillSaveTextDocumentWaitUntilRequest = {}));
                /**
 * The watched files notification is sent from the client to the server when
 * the client detects changes to file watched by the language client.
 */ var DidChangeWatchedFilesNotification;
                (function(DidChangeWatchedFilesNotification) {
                    DidChangeWatchedFilesNotification.method = 'workspace/didChangeWatchedFiles';
                    DidChangeWatchedFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidChangeWatchedFilesNotification.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification.method);
                })(DidChangeWatchedFilesNotification = exports1.DidChangeWatchedFilesNotification || (exports1.DidChangeWatchedFilesNotification = {}));
                /**
 * The file event type
 */ var FileChangeType;
                (function(FileChangeType) {
                    /**
     * The file got created.
     */ FileChangeType.Created = 1;
                    /**
     * The file got changed.
     */ FileChangeType.Changed = 2;
                    /**
     * The file got deleted.
     */ FileChangeType.Deleted = 3;
                })(FileChangeType = exports1.FileChangeType || (exports1.FileChangeType = {}));
                var RelativePattern;
                (function(RelativePattern) {
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
                    }
                    RelativePattern.is = is;
                })(RelativePattern = exports1.RelativePattern || (exports1.RelativePattern = {}));
                var WatchKind;
                (function(WatchKind) {
                    /**
     * Interested in create events.
     */ WatchKind.Create = 1;
                    /**
     * Interested in change events
     */ WatchKind.Change = 2;
                    /**
     * Interested in delete events
     */ WatchKind.Delete = 4;
                })(WatchKind = exports1.WatchKind || (exports1.WatchKind = {}));
                /**
 * Diagnostics notification are sent from the server to the client to signal
 * results of validation runs.
 */ var PublishDiagnosticsNotification;
                (function(PublishDiagnosticsNotification) {
                    PublishDiagnosticsNotification.method = 'textDocument/publishDiagnostics';
                    PublishDiagnosticsNotification.messageDirection = messages_1.MessageDirection.serverToClient;
                    PublishDiagnosticsNotification.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification.method);
                })(PublishDiagnosticsNotification = exports1.PublishDiagnosticsNotification || (exports1.PublishDiagnosticsNotification = {}));
                /**
 * How a completion was triggered
 */ var CompletionTriggerKind;
                (function(CompletionTriggerKind) {
                    /**
     * Completion was triggered by typing an identifier (24x7 code
     * complete), manual invocation (e.g Ctrl+Space) or via API.
     */ CompletionTriggerKind.Invoked = 1;
                    /**
     * Completion was triggered by a trigger character specified by
     * the `triggerCharacters` properties of the `CompletionRegistrationOptions`.
     */ CompletionTriggerKind.TriggerCharacter = 2;
                    /**
     * Completion was re-triggered as current completion list is incomplete
     */ CompletionTriggerKind.TriggerForIncompleteCompletions = 3;
                })(CompletionTriggerKind = exports1.CompletionTriggerKind || (exports1.CompletionTriggerKind = {}));
                /**
 * Request to request completion at a given text document position. The request's
 * parameter is of type {@link TextDocumentPosition} the response
 * is of type {@link CompletionItem CompletionItem[]} or {@link CompletionList}
 * or a Thenable that resolves to such.
 *
 * The request can delay the computation of the {@link CompletionItem.detail `detail`}
 * and {@link CompletionItem.documentation `documentation`} properties to the `completionItem/resolve`
 * request. However, properties that are needed for the initial sorting and filtering, like `sortText`,
 * `filterText`, `insertText`, and `textEdit`, must not be changed during resolve.
 */ var CompletionRequest;
                (function(CompletionRequest) {
                    CompletionRequest.method = 'textDocument/completion';
                    CompletionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CompletionRequest.type = new messages_1.ProtocolRequestType(CompletionRequest.method);
                })(CompletionRequest = exports1.CompletionRequest || (exports1.CompletionRequest = {}));
                /**
 * Request to resolve additional information for a given completion item.The request's
 * parameter is of type {@link CompletionItem} the response
 * is of type {@link CompletionItem} or a Thenable that resolves to such.
 */ var CompletionResolveRequest;
                (function(CompletionResolveRequest) {
                    CompletionResolveRequest.method = 'completionItem/resolve';
                    CompletionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CompletionResolveRequest.type = new messages_1.ProtocolRequestType(CompletionResolveRequest.method);
                })(CompletionResolveRequest = exports1.CompletionResolveRequest || (exports1.CompletionResolveRequest = {}));
                /**
 * Request to request hover information at a given text document position. The request's
 * parameter is of type {@link TextDocumentPosition} the response is of
 * type {@link Hover} or a Thenable that resolves to such.
 */ var HoverRequest;
                (function(HoverRequest) {
                    HoverRequest.method = 'textDocument/hover';
                    HoverRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    HoverRequest.type = new messages_1.ProtocolRequestType(HoverRequest.method);
                })(HoverRequest = exports1.HoverRequest || (exports1.HoverRequest = {}));
                /**
 * How a signature help was triggered.
 *
 * @since 3.15.0
 */ var SignatureHelpTriggerKind;
                (function(SignatureHelpTriggerKind) {
                    /**
     * Signature help was invoked manually by the user or by a command.
     */ SignatureHelpTriggerKind.Invoked = 1;
                    /**
     * Signature help was triggered by a trigger character.
     */ SignatureHelpTriggerKind.TriggerCharacter = 2;
                    /**
     * Signature help was triggered by the cursor moving or by the document content changing.
     */ SignatureHelpTriggerKind.ContentChange = 3;
                })(SignatureHelpTriggerKind = exports1.SignatureHelpTriggerKind || (exports1.SignatureHelpTriggerKind = {}));
                var SignatureHelpRequest;
                (function(SignatureHelpRequest) {
                    SignatureHelpRequest.method = 'textDocument/signatureHelp';
                    SignatureHelpRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    SignatureHelpRequest.type = new messages_1.ProtocolRequestType(SignatureHelpRequest.method);
                })(SignatureHelpRequest = exports1.SignatureHelpRequest || (exports1.SignatureHelpRequest = {}));
                /**
 * A request to resolve the definition location of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the response is of either type {@link Definition}
 * or a typed array of {@link DefinitionLink} or a Thenable that resolves
 * to such.
 */ var DefinitionRequest;
                (function(DefinitionRequest) {
                    DefinitionRequest.method = 'textDocument/definition';
                    DefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DefinitionRequest.type = new messages_1.ProtocolRequestType(DefinitionRequest.method);
                })(DefinitionRequest = exports1.DefinitionRequest || (exports1.DefinitionRequest = {}));
                /**
 * A request to resolve project-wide references for the symbol denoted
 * by the given text document position. The request's parameter is of
 * type {@link ReferenceParams} the response is of type
 * {@link Location Location[]} or a Thenable that resolves to such.
 */ var ReferencesRequest;
                (function(ReferencesRequest) {
                    ReferencesRequest.method = 'textDocument/references';
                    ReferencesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    ReferencesRequest.type = new messages_1.ProtocolRequestType(ReferencesRequest.method);
                })(ReferencesRequest = exports1.ReferencesRequest || (exports1.ReferencesRequest = {}));
                /**
 * Request to resolve a {@link DocumentHighlight} for a given
 * text document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the request response is of type [DocumentHighlight[]]
 * (#DocumentHighlight) or a Thenable that resolves to such.
 */ var DocumentHighlightRequest;
                (function(DocumentHighlightRequest) {
                    DocumentHighlightRequest.method = 'textDocument/documentHighlight';
                    DocumentHighlightRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentHighlightRequest.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest.method);
                })(DocumentHighlightRequest = exports1.DocumentHighlightRequest || (exports1.DocumentHighlightRequest = {}));
                /**
 * A request to list all symbols found in a given text document. The request's
 * parameter is of type {@link TextDocumentIdentifier} the
 * response is of type {@link SymbolInformation SymbolInformation[]} or a Thenable
 * that resolves to such.
 */ var DocumentSymbolRequest;
                (function(DocumentSymbolRequest) {
                    DocumentSymbolRequest.method = 'textDocument/documentSymbol';
                    DocumentSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentSymbolRequest.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest.method);
                })(DocumentSymbolRequest = exports1.DocumentSymbolRequest || (exports1.DocumentSymbolRequest = {}));
                /**
 * A request to provide commands for the given text document and range.
 */ var CodeActionRequest;
                (function(CodeActionRequest) {
                    CodeActionRequest.method = 'textDocument/codeAction';
                    CodeActionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CodeActionRequest.type = new messages_1.ProtocolRequestType(CodeActionRequest.method);
                })(CodeActionRequest = exports1.CodeActionRequest || (exports1.CodeActionRequest = {}));
                /**
 * Request to resolve additional information for a given code action.The request's
 * parameter is of type {@link CodeAction} the response
 * is of type {@link CodeAction} or a Thenable that resolves to such.
 */ var CodeActionResolveRequest;
                (function(CodeActionResolveRequest) {
                    CodeActionResolveRequest.method = 'codeAction/resolve';
                    CodeActionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CodeActionResolveRequest.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest.method);
                })(CodeActionResolveRequest = exports1.CodeActionResolveRequest || (exports1.CodeActionResolveRequest = {}));
                /**
 * A request to list project-wide symbols matching the query string given
 * by the {@link WorkspaceSymbolParams}. The response is
 * of type {@link SymbolInformation SymbolInformation[]} or a Thenable that
 * resolves to such.
 *
 * @since 3.17.0 - support for WorkspaceSymbol in the returned data. Clients
 *  need to advertise support for WorkspaceSymbols via the client capability
 *  `workspace.symbol.resolveSupport`.
 *
 */ var WorkspaceSymbolRequest;
                (function(WorkspaceSymbolRequest) {
                    WorkspaceSymbolRequest.method = 'workspace/symbol';
                    WorkspaceSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WorkspaceSymbolRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest.method);
                })(WorkspaceSymbolRequest = exports1.WorkspaceSymbolRequest || (exports1.WorkspaceSymbolRequest = {}));
                /**
 * A request to resolve the range inside the workspace
 * symbol's location.
 *
 * @since 3.17.0
 */ var WorkspaceSymbolResolveRequest;
                (function(WorkspaceSymbolResolveRequest) {
                    WorkspaceSymbolResolveRequest.method = 'workspaceSymbol/resolve';
                    WorkspaceSymbolResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    WorkspaceSymbolResolveRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest.method);
                })(WorkspaceSymbolResolveRequest = exports1.WorkspaceSymbolResolveRequest || (exports1.WorkspaceSymbolResolveRequest = {}));
                /**
 * A request to provide code lens for the given text document.
 */ var CodeLensRequest;
                (function(CodeLensRequest) {
                    CodeLensRequest.method = 'textDocument/codeLens';
                    CodeLensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CodeLensRequest.type = new messages_1.ProtocolRequestType(CodeLensRequest.method);
                })(CodeLensRequest = exports1.CodeLensRequest || (exports1.CodeLensRequest = {}));
                /**
 * A request to resolve a command for a given code lens.
 */ var CodeLensResolveRequest;
                (function(CodeLensResolveRequest) {
                    CodeLensResolveRequest.method = 'codeLens/resolve';
                    CodeLensResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    CodeLensResolveRequest.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest.method);
                })(CodeLensResolveRequest = exports1.CodeLensResolveRequest || (exports1.CodeLensResolveRequest = {}));
                /**
 * A request to refresh all code actions
 *
 * @since 3.16.0
 */ var CodeLensRefreshRequest;
                (function(CodeLensRefreshRequest) {
                    CodeLensRefreshRequest.method = `workspace/codeLens/refresh`;
                    CodeLensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    CodeLensRefreshRequest.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest.method);
                })(CodeLensRefreshRequest = exports1.CodeLensRefreshRequest || (exports1.CodeLensRefreshRequest = {}));
                /**
 * A request to provide document links
 */ var DocumentLinkRequest;
                (function(DocumentLinkRequest) {
                    DocumentLinkRequest.method = 'textDocument/documentLink';
                    DocumentLinkRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentLinkRequest.type = new messages_1.ProtocolRequestType(DocumentLinkRequest.method);
                })(DocumentLinkRequest = exports1.DocumentLinkRequest || (exports1.DocumentLinkRequest = {}));
                /**
 * Request to resolve additional information for a given document link. The request's
 * parameter is of type {@link DocumentLink} the response
 * is of type {@link DocumentLink} or a Thenable that resolves to such.
 */ var DocumentLinkResolveRequest;
                (function(DocumentLinkResolveRequest) {
                    DocumentLinkResolveRequest.method = 'documentLink/resolve';
                    DocumentLinkResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentLinkResolveRequest.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest.method);
                })(DocumentLinkResolveRequest = exports1.DocumentLinkResolveRequest || (exports1.DocumentLinkResolveRequest = {}));
                /**
 * A request to to format a whole document.
 */ var DocumentFormattingRequest;
                (function(DocumentFormattingRequest) {
                    DocumentFormattingRequest.method = 'textDocument/formatting';
                    DocumentFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest.method);
                })(DocumentFormattingRequest = exports1.DocumentFormattingRequest || (exports1.DocumentFormattingRequest = {}));
                /**
 * A request to to format a range in a document.
 */ var DocumentRangeFormattingRequest;
                (function(DocumentRangeFormattingRequest) {
                    DocumentRangeFormattingRequest.method = 'textDocument/rangeFormatting';
                    DocumentRangeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentRangeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest.method);
                })(DocumentRangeFormattingRequest = exports1.DocumentRangeFormattingRequest || (exports1.DocumentRangeFormattingRequest = {}));
                /**
 * A request to format a document on type.
 */ var DocumentOnTypeFormattingRequest;
                (function(DocumentOnTypeFormattingRequest) {
                    DocumentOnTypeFormattingRequest.method = 'textDocument/onTypeFormatting';
                    DocumentOnTypeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    DocumentOnTypeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest.method);
                })(DocumentOnTypeFormattingRequest = exports1.DocumentOnTypeFormattingRequest || (exports1.DocumentOnTypeFormattingRequest = {}));
                //---- Rename ----------------------------------------------
                var PrepareSupportDefaultBehavior;
                (function(PrepareSupportDefaultBehavior) {
                    /**
     * The client's default behavior is to select the identifier
     * according the to language's syntax rule.
     */ PrepareSupportDefaultBehavior.Identifier = 1;
                })(PrepareSupportDefaultBehavior = exports1.PrepareSupportDefaultBehavior || (exports1.PrepareSupportDefaultBehavior = {}));
                /**
 * A request to rename a symbol.
 */ var RenameRequest;
                (function(RenameRequest) {
                    RenameRequest.method = 'textDocument/rename';
                    RenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    RenameRequest.type = new messages_1.ProtocolRequestType(RenameRequest.method);
                })(RenameRequest = exports1.RenameRequest || (exports1.RenameRequest = {}));
                /**
 * A request to test and perform the setup necessary for a rename.
 *
 * @since 3.16 - support for default behavior
 */ var PrepareRenameRequest;
                (function(PrepareRenameRequest) {
                    PrepareRenameRequest.method = 'textDocument/prepareRename';
                    PrepareRenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    PrepareRenameRequest.type = new messages_1.ProtocolRequestType(PrepareRenameRequest.method);
                })(PrepareRenameRequest = exports1.PrepareRenameRequest || (exports1.PrepareRenameRequest = {}));
                /**
 * A request send from the client to the server to execute a command. The request might return
 * a workspace edit which the client will apply to the workspace.
 */ var ExecuteCommandRequest;
                (function(ExecuteCommandRequest) {
                    ExecuteCommandRequest.method = 'workspace/executeCommand';
                    ExecuteCommandRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    ExecuteCommandRequest.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest.method);
                })(ExecuteCommandRequest = exports1.ExecuteCommandRequest || (exports1.ExecuteCommandRequest = {}));
                /**
 * A request sent from the server to the client to modified certain resources.
 */ var ApplyWorkspaceEditRequest;
                (function(ApplyWorkspaceEditRequest) {
                    ApplyWorkspaceEditRequest.method = 'workspace/applyEdit';
                    ApplyWorkspaceEditRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    ApplyWorkspaceEditRequest.type = new messages_1.ProtocolRequestType('workspace/applyEdit');
                })(ApplyWorkspaceEditRequest = exports1.ApplyWorkspaceEditRequest || (exports1.ApplyWorkspaceEditRequest = {}));
            /***/ },
            /***/ 527: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_532180__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.LinkedEditingRangeRequest = void 0;
                const messages_1 = __nested_webpack_require_532180__(8599);
                /**
 * A request to provide ranges that can be edited together.
 *
 * @since 3.16.0
 */ var LinkedEditingRangeRequest;
                (function(LinkedEditingRangeRequest) {
                    LinkedEditingRangeRequest.method = 'textDocument/linkedEditingRange';
                    LinkedEditingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    LinkedEditingRangeRequest.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest.method);
                })(LinkedEditingRangeRequest = exports1.LinkedEditingRangeRequest || (exports1.LinkedEditingRangeRequest = {}));
            /***/ },
            /***/ 1964: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_533553__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.MonikerRequest = exports1.MonikerKind = exports1.UniquenessLevel = void 0;
                const messages_1 = __nested_webpack_require_533553__(8599);
                /**
 * Moniker uniqueness level to define scope of the moniker.
 *
 * @since 3.16.0
 */ var UniquenessLevel;
                (function(UniquenessLevel) {
                    /**
     * The moniker is only unique inside a document
     */ UniquenessLevel.document = 'document';
                    /**
     * The moniker is unique inside a project for which a dump got created
     */ UniquenessLevel.project = 'project';
                    /**
     * The moniker is unique inside the group to which a project belongs
     */ UniquenessLevel.group = 'group';
                    /**
     * The moniker is unique inside the moniker scheme.
     */ UniquenessLevel.scheme = 'scheme';
                    /**
     * The moniker is globally unique
     */ UniquenessLevel.global = 'global';
                })(UniquenessLevel = exports1.UniquenessLevel || (exports1.UniquenessLevel = {}));
                /**
 * The moniker kind.
 *
 * @since 3.16.0
 */ var MonikerKind;
                (function(MonikerKind) {
                    /**
     * The moniker represent a symbol that is imported into a project
     */ MonikerKind.$import = 'import';
                    /**
     * The moniker represents a symbol that is exported from a project
     */ MonikerKind.$export = 'export';
                    /**
     * The moniker represents a symbol that is local to a project (e.g. a local
     * variable of a function, a class not visible outside the project, ...)
     */ MonikerKind.local = 'local';
                })(MonikerKind = exports1.MonikerKind || (exports1.MonikerKind = {}));
                /**
 * A request to get the moniker of a symbol at a given text document position.
 * The request parameter is of type {@link TextDocumentPositionParams}.
 * The response is of type {@link Moniker Moniker[]} or `null`.
 */ var MonikerRequest;
                (function(MonikerRequest) {
                    MonikerRequest.method = 'textDocument/moniker';
                    MonikerRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    MonikerRequest.type = new messages_1.ProtocolRequestType(MonikerRequest.method);
                })(MonikerRequest = exports1.MonikerRequest || (exports1.MonikerRequest = {}));
            /***/ },
            /***/ 4460: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_536587__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.DidCloseNotebookDocumentNotification = exports1.DidSaveNotebookDocumentNotification = exports1.DidChangeNotebookDocumentNotification = exports1.NotebookCellArrayChange = exports1.DidOpenNotebookDocumentNotification = exports1.NotebookDocumentSyncRegistrationType = exports1.NotebookDocument = exports1.NotebookCell = exports1.ExecutionSummary = exports1.NotebookCellKind = void 0;
                const vscode_languageserver_types_1 = __nested_webpack_require_536587__(4767);
                const Is = __nested_webpack_require_536587__(2523);
                const messages_1 = __nested_webpack_require_536587__(8599);
                /**
 * A notebook cell kind.
 *
 * @since 3.17.0
 */ var NotebookCellKind;
                (function(NotebookCellKind) {
                    /**
     * A markup-cell is formatted source that is used for display.
     */ NotebookCellKind.Markup = 1;
                    /**
     * A code-cell is source code.
     */ NotebookCellKind.Code = 2;
                    function is(value) {
                        return value === 1 || value === 2;
                    }
                    NotebookCellKind.is = is;
                })(NotebookCellKind = exports1.NotebookCellKind || (exports1.NotebookCellKind = {}));
                var ExecutionSummary;
                (function(ExecutionSummary) {
                    function create(executionOrder, success) {
                        const result = {
                            executionOrder
                        };
                        if (success === true || success === false) {
                            result.success = success;
                        }
                        return result;
                    }
                    ExecutionSummary.create = create;
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === undefined || Is.boolean(candidate.success));
                    }
                    ExecutionSummary.is = is;
                    function equals(one, other) {
                        if (one === other) {
                            return true;
                        }
                        if (one === null || one === undefined || other === null || other === undefined) {
                            return false;
                        }
                        return one.executionOrder === other.executionOrder && one.success === other.success;
                    }
                    ExecutionSummary.equals = equals;
                })(ExecutionSummary = exports1.ExecutionSummary || (exports1.ExecutionSummary = {}));
                var NotebookCell;
                (function(NotebookCell) {
                    function create(kind, document1) {
                        return {
                            kind,
                            document: document1
                        };
                    }
                    NotebookCell.create = create;
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === undefined || Is.objectLiteral(candidate.metadata));
                    }
                    NotebookCell.is = is;
                    function diff(one, two) {
                        const result = new Set();
                        if (one.document !== two.document) {
                            result.add('document');
                        }
                        if (one.kind !== two.kind) {
                            result.add('kind');
                        }
                        if (one.executionSummary !== two.executionSummary) {
                            result.add('executionSummary');
                        }
                        if ((one.metadata !== undefined || two.metadata !== undefined) && !equalsMetadata(one.metadata, two.metadata)) {
                            result.add('metadata');
                        }
                        if ((one.executionSummary !== undefined || two.executionSummary !== undefined) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
                            result.add('executionSummary');
                        }
                        return result;
                    }
                    NotebookCell.diff = diff;
                    function equalsMetadata(one, other) {
                        if (one === other) {
                            return true;
                        }
                        if (one === null || one === undefined || other === null || other === undefined) {
                            return false;
                        }
                        if (typeof one !== typeof other) {
                            return false;
                        }
                        if (typeof one !== 'object') {
                            return false;
                        }
                        const oneArray = Array.isArray(one);
                        const otherArray = Array.isArray(other);
                        if (oneArray !== otherArray) {
                            return false;
                        }
                        if (oneArray && otherArray) {
                            if (one.length !== other.length) {
                                return false;
                            }
                            for(let i = 0; i < one.length; i++){
                                if (!equalsMetadata(one[i], other[i])) {
                                    return false;
                                }
                            }
                        }
                        if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
                            const oneKeys = Object.keys(one);
                            const otherKeys = Object.keys(other);
                            if (oneKeys.length !== otherKeys.length) {
                                return false;
                            }
                            oneKeys.sort();
                            otherKeys.sort();
                            if (!equalsMetadata(oneKeys, otherKeys)) {
                                return false;
                            }
                            for(let i = 0; i < oneKeys.length; i++){
                                const prop = oneKeys[i];
                                if (!equalsMetadata(one[prop], other[prop])) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                })(NotebookCell = exports1.NotebookCell || (exports1.NotebookCell = {}));
                var NotebookDocument;
                (function(NotebookDocument) {
                    function create(uri, notebookType, version, cells) {
                        return {
                            uri,
                            notebookType,
                            version,
                            cells
                        };
                    }
                    NotebookDocument.create = create;
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
                    }
                    NotebookDocument.is = is;
                })(NotebookDocument = exports1.NotebookDocument || (exports1.NotebookDocument = {}));
                var NotebookDocumentSyncRegistrationType;
                (function(NotebookDocumentSyncRegistrationType) {
                    NotebookDocumentSyncRegistrationType.method = 'notebookDocument/sync';
                    NotebookDocumentSyncRegistrationType.messageDirection = messages_1.MessageDirection.clientToServer;
                    NotebookDocumentSyncRegistrationType.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType.method);
                })(NotebookDocumentSyncRegistrationType = exports1.NotebookDocumentSyncRegistrationType || (exports1.NotebookDocumentSyncRegistrationType = {}));
                /**
 * A notification sent when a notebook opens.
 *
 * @since 3.17.0
 */ var DidOpenNotebookDocumentNotification;
                (function(DidOpenNotebookDocumentNotification) {
                    DidOpenNotebookDocumentNotification.method = 'notebookDocument/didOpen';
                    DidOpenNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidOpenNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification.method);
                    DidOpenNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
                })(DidOpenNotebookDocumentNotification = exports1.DidOpenNotebookDocumentNotification || (exports1.DidOpenNotebookDocumentNotification = {}));
                var NotebookCellArrayChange;
                (function(NotebookCellArrayChange) {
                    function is(value) {
                        const candidate = value;
                        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === undefined || Is.typedArray(candidate.cells, NotebookCell.is));
                    }
                    NotebookCellArrayChange.is = is;
                    function create(start, deleteCount, cells) {
                        const result = {
                            start,
                            deleteCount
                        };
                        if (cells !== undefined) {
                            result.cells = cells;
                        }
                        return result;
                    }
                    NotebookCellArrayChange.create = create;
                })(NotebookCellArrayChange = exports1.NotebookCellArrayChange || (exports1.NotebookCellArrayChange = {}));
                var DidChangeNotebookDocumentNotification;
                (function(DidChangeNotebookDocumentNotification) {
                    DidChangeNotebookDocumentNotification.method = 'notebookDocument/didChange';
                    DidChangeNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidChangeNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification.method);
                    DidChangeNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
                })(DidChangeNotebookDocumentNotification = exports1.DidChangeNotebookDocumentNotification || (exports1.DidChangeNotebookDocumentNotification = {}));
                /**
 * A notification sent when a notebook document is saved.
 *
 * @since 3.17.0
 */ var DidSaveNotebookDocumentNotification;
                (function(DidSaveNotebookDocumentNotification) {
                    DidSaveNotebookDocumentNotification.method = 'notebookDocument/didSave';
                    DidSaveNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidSaveNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification.method);
                    DidSaveNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
                })(DidSaveNotebookDocumentNotification = exports1.DidSaveNotebookDocumentNotification || (exports1.DidSaveNotebookDocumentNotification = {}));
                /**
 * A notification sent when a notebook closes.
 *
 * @since 3.17.0
 */ var DidCloseNotebookDocumentNotification;
                (function(DidCloseNotebookDocumentNotification) {
                    DidCloseNotebookDocumentNotification.method = 'notebookDocument/didClose';
                    DidCloseNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidCloseNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification.method);
                    DidCloseNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
                })(DidCloseNotebookDocumentNotification = exports1.DidCloseNotebookDocumentNotification || (exports1.DidCloseNotebookDocumentNotification = {}));
            /***/ },
            /***/ 7895: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_550164__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.WorkDoneProgressCancelNotification = exports1.WorkDoneProgressCreateRequest = exports1.WorkDoneProgress = void 0;
                const vscode_jsonrpc_1 = __nested_webpack_require_550164__(5953);
                const messages_1 = __nested_webpack_require_550164__(8599);
                var WorkDoneProgress;
                (function(WorkDoneProgress) {
                    WorkDoneProgress.type = new vscode_jsonrpc_1.ProgressType();
                    function is(value) {
                        return value === WorkDoneProgress.type;
                    }
                    WorkDoneProgress.is = is;
                })(WorkDoneProgress = exports1.WorkDoneProgress || (exports1.WorkDoneProgress = {}));
                /**
 * The `window/workDoneProgress/create` request is sent from the server to the client to initiate progress
 * reporting from the server.
 */ var WorkDoneProgressCreateRequest;
                (function(WorkDoneProgressCreateRequest) {
                    WorkDoneProgressCreateRequest.method = 'window/workDoneProgress/create';
                    WorkDoneProgressCreateRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    WorkDoneProgressCreateRequest.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest.method);
                })(WorkDoneProgressCreateRequest = exports1.WorkDoneProgressCreateRequest || (exports1.WorkDoneProgressCreateRequest = {}));
                /**
 * The `window/workDoneProgress/cancel` notification is sent from  the client to the server to cancel a progress
 * initiated on the server side.
 */ var WorkDoneProgressCancelNotification;
                (function(WorkDoneProgressCancelNotification) {
                    WorkDoneProgressCancelNotification.method = 'window/workDoneProgress/cancel';
                    WorkDoneProgressCancelNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    WorkDoneProgressCancelNotification.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification.method);
                })(WorkDoneProgressCancelNotification = exports1.WorkDoneProgressCancelNotification || (exports1.WorkDoneProgressCancelNotification = {}));
            /***/ },
            /***/ 2392: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_553005__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.SelectionRangeRequest = void 0;
                const messages_1 = __nested_webpack_require_553005__(8599);
                /**
 * A request to provide selection ranges in a document. The request's
 * parameter is of type {@link SelectionRangeParams}, the
 * response is of type {@link SelectionRange SelectionRange[]} or a Thenable
 * that resolves to such.
 */ var SelectionRangeRequest;
                (function(SelectionRangeRequest) {
                    SelectionRangeRequest.method = 'textDocument/selectionRange';
                    SelectionRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    SelectionRangeRequest.type = new messages_1.ProtocolRequestType(SelectionRangeRequest.method);
                })(SelectionRangeRequest = exports1.SelectionRangeRequest || (exports1.SelectionRangeRequest = {}));
            /***/ },
            /***/ 8489: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_554485__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.SemanticTokensRefreshRequest = exports1.SemanticTokensRangeRequest = exports1.SemanticTokensDeltaRequest = exports1.SemanticTokensRequest = exports1.SemanticTokensRegistrationType = exports1.TokenFormat = void 0;
                const messages_1 = __nested_webpack_require_554485__(8599);
                //------- 'textDocument/semanticTokens' -----
                var TokenFormat;
                (function(TokenFormat) {
                    TokenFormat.Relative = 'relative';
                })(TokenFormat = exports1.TokenFormat || (exports1.TokenFormat = {}));
                var SemanticTokensRegistrationType;
                (function(SemanticTokensRegistrationType) {
                    SemanticTokensRegistrationType.method = 'textDocument/semanticTokens';
                    SemanticTokensRegistrationType.type = new messages_1.RegistrationType(SemanticTokensRegistrationType.method);
                })(SemanticTokensRegistrationType = exports1.SemanticTokensRegistrationType || (exports1.SemanticTokensRegistrationType = {}));
                /**
 * @since 3.16.0
 */ var SemanticTokensRequest;
                (function(SemanticTokensRequest) {
                    SemanticTokensRequest.method = 'textDocument/semanticTokens/full';
                    SemanticTokensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    SemanticTokensRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRequest.method);
                    SemanticTokensRequest.registrationMethod = SemanticTokensRegistrationType.method;
                })(SemanticTokensRequest = exports1.SemanticTokensRequest || (exports1.SemanticTokensRequest = {}));
                /**
 * @since 3.16.0
 */ var SemanticTokensDeltaRequest;
                (function(SemanticTokensDeltaRequest) {
                    SemanticTokensDeltaRequest.method = 'textDocument/semanticTokens/full/delta';
                    SemanticTokensDeltaRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    SemanticTokensDeltaRequest.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest.method);
                    SemanticTokensDeltaRequest.registrationMethod = SemanticTokensRegistrationType.method;
                })(SemanticTokensDeltaRequest = exports1.SemanticTokensDeltaRequest || (exports1.SemanticTokensDeltaRequest = {}));
                /**
 * @since 3.16.0
 */ var SemanticTokensRangeRequest;
                (function(SemanticTokensRangeRequest) {
                    SemanticTokensRangeRequest.method = 'textDocument/semanticTokens/range';
                    SemanticTokensRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    SemanticTokensRangeRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest.method);
                    SemanticTokensRangeRequest.registrationMethod = SemanticTokensRegistrationType.method;
                })(SemanticTokensRangeRequest = exports1.SemanticTokensRangeRequest || (exports1.SemanticTokensRangeRequest = {}));
                /**
 * @since 3.16.0
 */ var SemanticTokensRefreshRequest;
                (function(SemanticTokensRefreshRequest) {
                    SemanticTokensRefreshRequest.method = `workspace/semanticTokens/refresh`;
                    SemanticTokensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    SemanticTokensRefreshRequest.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest.method);
                })(SemanticTokensRefreshRequest = exports1.SemanticTokensRefreshRequest || (exports1.SemanticTokensRefreshRequest = {}));
            /***/ },
            /***/ 1541: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_558796__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ShowDocumentRequest = void 0;
                const messages_1 = __nested_webpack_require_558796__(8599);
                /**
 * A request to show a document. This request might open an
 * external program depending on the value of the URI to open.
 * For example a request to open `https://code.visualstudio.com/`
 * will very likely open the URI in a WEB browser.
 *
 * @since 3.16.0
*/ var ShowDocumentRequest;
                (function(ShowDocumentRequest) {
                    ShowDocumentRequest.method = 'window/showDocument';
                    ShowDocumentRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    ShowDocumentRequest.type = new messages_1.ProtocolRequestType(ShowDocumentRequest.method);
                })(ShowDocumentRequest = exports1.ShowDocumentRequest || (exports1.ShowDocumentRequest = {}));
            /***/ },
            /***/ 8642: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_560274__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.TypeDefinitionRequest = void 0;
                const messages_1 = __nested_webpack_require_560274__(8599);
                // @ts-ignore: to avoid inlining LocatioLink as dynamic import
                let __noDynamicImport;
                /**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type {@link Definition} or a
 * Thenable that resolves to such.
 */ var TypeDefinitionRequest;
                (function(TypeDefinitionRequest) {
                    TypeDefinitionRequest.method = 'textDocument/typeDefinition';
                    TypeDefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    TypeDefinitionRequest.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest.method);
                })(TypeDefinitionRequest = exports1.TypeDefinitionRequest || (exports1.TypeDefinitionRequest = {}));
            /***/ },
            /***/ 5318: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_561923__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.TypeHierarchySubtypesRequest = exports1.TypeHierarchySupertypesRequest = exports1.TypeHierarchyPrepareRequest = void 0;
                const messages_1 = __nested_webpack_require_561923__(8599);
                /**
 * A request to result a `TypeHierarchyItem` in a document at a given position.
 * Can be used as an input to a subtypes or supertypes type hierarchy.
 *
 * @since 3.17.0
 */ var TypeHierarchyPrepareRequest;
                (function(TypeHierarchyPrepareRequest) {
                    TypeHierarchyPrepareRequest.method = 'textDocument/prepareTypeHierarchy';
                    TypeHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    TypeHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest.method);
                })(TypeHierarchyPrepareRequest = exports1.TypeHierarchyPrepareRequest || (exports1.TypeHierarchyPrepareRequest = {}));
                /**
 * A request to resolve the supertypes for a given `TypeHierarchyItem`.
 *
 * @since 3.17.0
 */ var TypeHierarchySupertypesRequest;
                (function(TypeHierarchySupertypesRequest) {
                    TypeHierarchySupertypesRequest.method = 'typeHierarchy/supertypes';
                    TypeHierarchySupertypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    TypeHierarchySupertypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest.method);
                })(TypeHierarchySupertypesRequest = exports1.TypeHierarchySupertypesRequest || (exports1.TypeHierarchySupertypesRequest = {}));
                /**
 * A request to resolve the subtypes for a given `TypeHierarchyItem`.
 *
 * @since 3.17.0
 */ var TypeHierarchySubtypesRequest;
                (function(TypeHierarchySubtypesRequest) {
                    TypeHierarchySubtypesRequest.method = 'typeHierarchy/subtypes';
                    TypeHierarchySubtypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
                    TypeHierarchySubtypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest.method);
                })(TypeHierarchySubtypesRequest = exports1.TypeHierarchySubtypesRequest || (exports1.TypeHierarchySubtypesRequest = {}));
            /***/ },
            /***/ 3402: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_564857__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.DidChangeWorkspaceFoldersNotification = exports1.WorkspaceFoldersRequest = void 0;
                const messages_1 = __nested_webpack_require_564857__(8599);
                /**
 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
 */ var WorkspaceFoldersRequest;
                (function(WorkspaceFoldersRequest) {
                    WorkspaceFoldersRequest.method = 'workspace/workspaceFolders';
                    WorkspaceFoldersRequest.messageDirection = messages_1.MessageDirection.serverToClient;
                    WorkspaceFoldersRequest.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest.method);
                })(WorkspaceFoldersRequest = exports1.WorkspaceFoldersRequest || (exports1.WorkspaceFoldersRequest = {}));
                /**
 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
 * folder configuration changes.
 */ var DidChangeWorkspaceFoldersNotification;
                (function(DidChangeWorkspaceFoldersNotification) {
                    DidChangeWorkspaceFoldersNotification.method = 'workspace/didChangeWorkspaceFolders';
                    DidChangeWorkspaceFoldersNotification.messageDirection = messages_1.MessageDirection.clientToServer;
                    DidChangeWorkspaceFoldersNotification.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification.method);
                })(DidChangeWorkspaceFoldersNotification = exports1.DidChangeWorkspaceFoldersNotification || (exports1.DidChangeWorkspaceFoldersNotification = {}));
            /***/ },
            /***/ 2523: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.objectLiteral = exports1.typedArray = exports1.stringArray = exports1.array = exports1.func = exports1.error = exports1.number = exports1.string = exports1.boolean = void 0;
                function boolean(value) {
                    return value === true || value === false;
                }
                exports1.boolean = boolean;
                function string(value) {
                    return typeof value === 'string' || value instanceof String;
                }
                exports1.string = string;
                function number(value) {
                    return typeof value === 'number' || value instanceof Number;
                }
                exports1.number = number;
                function error(value) {
                    return value instanceof Error;
                }
                exports1.error = error;
                function func(value) {
                    return typeof value === 'function';
                }
                exports1.func = func;
                function array(value) {
                    return Array.isArray(value);
                }
                exports1.array = array;
                function stringArray(value) {
                    return array(value) && value.every((elem)=>string(elem));
                }
                exports1.stringArray = stringArray;
                function typedArray(value, check) {
                    return Array.isArray(value) && value.every(check);
                }
                exports1.typedArray = typedArray;
                function objectLiteral(value) {
                    // Strictly speaking class instances pass this check as well. Since the LSP
                    // doesn't use classes we ignore this for now. If we do we need to add something
                    // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
                    return value !== null && typeof value === 'object';
                }
                exports1.objectLiteral = objectLiteral;
            /***/ },
            /***/ 4881: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_569752__)=>{
                "use strict";
                /* harmony export */ __nested_webpack_require_569752__.d(__nested_webpack_exports__, {
                    /* harmony export */ n: ()=>/* binding */ TextDocument
                });
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ var __spreadArray =  false || function(to, from, pack) {
                    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
                        if (ar || !(i in from)) {
                            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                            ar[i] = from[i];
                        }
                    }
                    return to.concat(ar || Array.prototype.slice.call(from));
                };
                var FullTextDocument = /** @class */ function() {
                    function FullTextDocument(uri, languageId, version, content) {
                        this._uri = uri;
                        this._languageId = languageId;
                        this._version = version;
                        this._content = content;
                        this._lineOffsets = undefined;
                    }
                    Object.defineProperty(FullTextDocument.prototype, "uri", {
                        get: function() {
                            return this._uri;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(FullTextDocument.prototype, "languageId", {
                        get: function() {
                            return this._languageId;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(FullTextDocument.prototype, "version", {
                        get: function() {
                            return this._version;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    FullTextDocument.prototype.getText = function(range) {
                        if (range) {
                            var start = this.offsetAt(range.start);
                            var end = this.offsetAt(range.end);
                            return this._content.substring(start, end);
                        }
                        return this._content;
                    };
                    FullTextDocument.prototype.update = function(changes, version) {
                        for(var _i = 0, changes_1 = changes; _i < changes_1.length; _i++){
                            var change = changes_1[_i];
                            if (FullTextDocument.isIncremental(change)) {
                                // makes sure start is before end
                                var range = getWellformedRange(change.range);
                                // update content
                                var startOffset = this.offsetAt(range.start);
                                var endOffset = this.offsetAt(range.end);
                                this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
                                // update the offsets
                                var startLine = Math.max(range.start.line, 0);
                                var endLine = Math.max(range.end.line, 0);
                                var lineOffsets = this._lineOffsets;
                                var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
                                if (endLine - startLine === addedLineOffsets.length) {
                                    for(var i = 0, len = addedLineOffsets.length; i < len; i++){
                                        lineOffsets[i + startLine + 1] = addedLineOffsets[i];
                                    }
                                } else {
                                    if (addedLineOffsets.length < 10000) {
                                        lineOffsets.splice.apply(lineOffsets, __spreadArray([
                                            startLine + 1,
                                            endLine - startLine
                                        ], addedLineOffsets, false));
                                    } else {
                                        this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
                                    }
                                }
                                var diff = change.text.length - (endOffset - startOffset);
                                if (diff !== 0) {
                                    for(var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++){
                                        lineOffsets[i] = lineOffsets[i] + diff;
                                    }
                                }
                            } else if (FullTextDocument.isFull(change)) {
                                this._content = change.text;
                                this._lineOffsets = undefined;
                            } else {
                                throw new Error('Unknown change event received');
                            }
                        }
                        this._version = version;
                    };
                    FullTextDocument.prototype.getLineOffsets = function() {
                        if (this._lineOffsets === undefined) {
                            this._lineOffsets = computeLineOffsets(this._content, true);
                        }
                        return this._lineOffsets;
                    };
                    FullTextDocument.prototype.positionAt = function(offset) {
                        offset = Math.max(Math.min(offset, this._content.length), 0);
                        var lineOffsets = this.getLineOffsets();
                        var low = 0, high = lineOffsets.length;
                        if (high === 0) {
                            return {
                                line: 0,
                                character: offset
                            };
                        }
                        while(low < high){
                            var mid = Math.floor((low + high) / 2);
                            if (lineOffsets[mid] > offset) {
                                high = mid;
                            } else {
                                low = mid + 1;
                            }
                        }
                        // low is the least x for which the line offset is larger than the current offset
                        // or array.length if no line offset is larger than the current offset
                        var line = low - 1;
                        return {
                            line: line,
                            character: offset - lineOffsets[line]
                        };
                    };
                    FullTextDocument.prototype.offsetAt = function(position) {
                        var lineOffsets = this.getLineOffsets();
                        if (position.line >= lineOffsets.length) {
                            return this._content.length;
                        } else if (position.line < 0) {
                            return 0;
                        }
                        var lineOffset = lineOffsets[position.line];
                        var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
                        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
                    };
                    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
                        get: function() {
                            return this.getLineOffsets().length;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    FullTextDocument.isIncremental = function(event) {
                        var candidate = event;
                        return candidate !== undefined && candidate !== null && typeof candidate.text === 'string' && candidate.range !== undefined && (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
                    };
                    FullTextDocument.isFull = function(event) {
                        var candidate = event;
                        return candidate !== undefined && candidate !== null && typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
                    };
                    return FullTextDocument;
                }();
                var TextDocument;
                (function(TextDocument) {
                    /**
     * Creates a new text document.
     *
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param version The document's initial version number.
     * @param content The document's content.
     */ function create(uri, languageId, version, content) {
                        return new FullTextDocument(uri, languageId, version, content);
                    }
                    TextDocument.create = create;
                    /**
     * Updates a TextDocument by modifying its content.
     *
     * @param document the document to update. Only documents created by TextDocument.create are valid inputs.
     * @param changes the changes to apply to the document.
     * @param version the changes version for the document.
     * @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
     *
     */ function update(document1, changes, version) {
                        if (document1 instanceof FullTextDocument) {
                            document1.update(changes, version);
                            return document1;
                        } else {
                            throw new Error('TextDocument.update: document must be created by TextDocument.create');
                        }
                    }
                    TextDocument.update = update;
                    function applyEdits(document1, edits) {
                        var text = document1.getText();
                        var sortedEdits = mergeSort(edits.map(getWellformedEdit), function(a, b) {
                            var diff = a.range.start.line - b.range.start.line;
                            if (diff === 0) {
                                return a.range.start.character - b.range.start.character;
                            }
                            return diff;
                        });
                        var lastModifiedOffset = 0;
                        var spans = [];
                        for(var _i = 0, sortedEdits_1 = sortedEdits; _i < sortedEdits_1.length; _i++){
                            var e = sortedEdits_1[_i];
                            var startOffset = document1.offsetAt(e.range.start);
                            if (startOffset < lastModifiedOffset) {
                                throw new Error('Overlapping edit');
                            } else if (startOffset > lastModifiedOffset) {
                                spans.push(text.substring(lastModifiedOffset, startOffset));
                            }
                            if (e.newText.length) {
                                spans.push(e.newText);
                            }
                            lastModifiedOffset = document1.offsetAt(e.range.end);
                        }
                        spans.push(text.substr(lastModifiedOffset));
                        return spans.join('');
                    }
                    TextDocument.applyEdits = applyEdits;
                })(TextDocument || (TextDocument = {}));
                function mergeSort(data, compare) {
                    if (data.length <= 1) {
                        // sorted
                        return data;
                    }
                    var p = data.length / 2 | 0;
                    var left = data.slice(0, p);
                    var right = data.slice(p);
                    mergeSort(left, compare);
                    mergeSort(right, compare);
                    var leftIdx = 0;
                    var rightIdx = 0;
                    var i = 0;
                    while(leftIdx < left.length && rightIdx < right.length){
                        var ret = compare(left[leftIdx], right[rightIdx]);
                        if (ret <= 0) {
                            // smaller_equal -> take left to preserve order
                            data[i++] = left[leftIdx++];
                        } else {
                            // greater -> take right
                            data[i++] = right[rightIdx++];
                        }
                    }
                    while(leftIdx < left.length){
                        data[i++] = left[leftIdx++];
                    }
                    while(rightIdx < right.length){
                        data[i++] = right[rightIdx++];
                    }
                    return data;
                }
                function computeLineOffsets(text, isAtLineStart, textOffset) {
                    if (textOffset === void 0) {
                        textOffset = 0;
                    }
                    var result = isAtLineStart ? [
                        textOffset
                    ] : [];
                    for(var i = 0; i < text.length; i++){
                        var ch = text.charCodeAt(i);
                        if (ch === 13 /* CharCode.CarriageReturn */  || ch === 10 /* CharCode.LineFeed */ ) {
                            if (ch === 13 /* CharCode.CarriageReturn */  && i + 1 < text.length && text.charCodeAt(i + 1) === 10 /* CharCode.LineFeed */ ) {
                                i++;
                            }
                            result.push(textOffset + i + 1);
                        }
                    }
                    return result;
                }
                function getWellformedRange(range) {
                    var start = range.start;
                    var end = range.end;
                    if (start.line > end.line || start.line === end.line && start.character > end.character) {
                        return {
                            start: end,
                            end: start
                        };
                    }
                    return range;
                }
                function getWellformedEdit(textEdit) {
                    var range = getWellformedRange(textEdit.range);
                    if (range !== textEdit.range) {
                        return {
                            newText: textEdit.newText,
                            range: range
                        };
                    }
                    return textEdit;
                }
            /***/ },
            /***/ 4767: /***/ (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_585576__)=>{
                "use strict";
                __nested_webpack_require_585576__.r(__nested_webpack_exports__);
                /* harmony export */ __nested_webpack_require_585576__.d(__nested_webpack_exports__, {
                    /* harmony export */ AnnotatedTextEdit: ()=>/* binding */ AnnotatedTextEdit,
                    /* harmony export */ ChangeAnnotation: ()=>/* binding */ ChangeAnnotation,
                    /* harmony export */ ChangeAnnotationIdentifier: ()=>/* binding */ ChangeAnnotationIdentifier,
                    /* harmony export */ CodeAction: ()=>/* binding */ CodeAction,
                    /* harmony export */ CodeActionContext: ()=>/* binding */ CodeActionContext,
                    /* harmony export */ CodeActionKind: ()=>/* binding */ CodeActionKind,
                    /* harmony export */ CodeActionTriggerKind: ()=>/* binding */ CodeActionTriggerKind,
                    /* harmony export */ CodeDescription: ()=>/* binding */ CodeDescription,
                    /* harmony export */ CodeLens: ()=>/* binding */ CodeLens,
                    /* harmony export */ Color: ()=>/* binding */ Color,
                    /* harmony export */ ColorInformation: ()=>/* binding */ ColorInformation,
                    /* harmony export */ ColorPresentation: ()=>/* binding */ ColorPresentation,
                    /* harmony export */ Command: ()=>/* binding */ Command,
                    /* harmony export */ CompletionItem: ()=>/* binding */ CompletionItem,
                    /* harmony export */ CompletionItemKind: ()=>/* binding */ CompletionItemKind,
                    /* harmony export */ CompletionItemLabelDetails: ()=>/* binding */ CompletionItemLabelDetails,
                    /* harmony export */ CompletionItemTag: ()=>/* binding */ CompletionItemTag,
                    /* harmony export */ CompletionList: ()=>/* binding */ CompletionList,
                    /* harmony export */ CreateFile: ()=>/* binding */ CreateFile,
                    /* harmony export */ DeleteFile: ()=>/* binding */ DeleteFile,
                    /* harmony export */ Diagnostic: ()=>/* binding */ Diagnostic,
                    /* harmony export */ DiagnosticRelatedInformation: ()=>/* binding */ DiagnosticRelatedInformation,
                    /* harmony export */ DiagnosticSeverity: ()=>/* binding */ DiagnosticSeverity,
                    /* harmony export */ DiagnosticTag: ()=>/* binding */ DiagnosticTag,
                    /* harmony export */ DocumentHighlight: ()=>/* binding */ DocumentHighlight,
                    /* harmony export */ DocumentHighlightKind: ()=>/* binding */ DocumentHighlightKind,
                    /* harmony export */ DocumentLink: ()=>/* binding */ DocumentLink,
                    /* harmony export */ DocumentSymbol: ()=>/* binding */ DocumentSymbol,
                    /* harmony export */ DocumentUri: ()=>/* binding */ DocumentUri,
                    /* harmony export */ EOL: ()=>/* binding */ EOL,
                    /* harmony export */ FoldingRange: ()=>/* binding */ FoldingRange,
                    /* harmony export */ FoldingRangeKind: ()=>/* binding */ FoldingRangeKind,
                    /* harmony export */ FormattingOptions: ()=>/* binding */ FormattingOptions,
                    /* harmony export */ Hover: ()=>/* binding */ Hover,
                    /* harmony export */ InlayHint: ()=>/* binding */ InlayHint,
                    /* harmony export */ InlayHintKind: ()=>/* binding */ InlayHintKind,
                    /* harmony export */ InlayHintLabelPart: ()=>/* binding */ InlayHintLabelPart,
                    /* harmony export */ InlineValueContext: ()=>/* binding */ InlineValueContext,
                    /* harmony export */ InlineValueEvaluatableExpression: ()=>/* binding */ InlineValueEvaluatableExpression,
                    /* harmony export */ InlineValueText: ()=>/* binding */ InlineValueText,
                    /* harmony export */ InlineValueVariableLookup: ()=>/* binding */ InlineValueVariableLookup,
                    /* harmony export */ InsertReplaceEdit: ()=>/* binding */ InsertReplaceEdit,
                    /* harmony export */ InsertTextFormat: ()=>/* binding */ InsertTextFormat,
                    /* harmony export */ InsertTextMode: ()=>/* binding */ InsertTextMode,
                    /* harmony export */ Location: ()=>/* binding */ Location,
                    /* harmony export */ LocationLink: ()=>/* binding */ LocationLink,
                    /* harmony export */ MarkedString: ()=>/* binding */ MarkedString,
                    /* harmony export */ MarkupContent: ()=>/* binding */ MarkupContent,
                    /* harmony export */ MarkupKind: ()=>/* binding */ MarkupKind,
                    /* harmony export */ OptionalVersionedTextDocumentIdentifier: ()=>/* binding */ OptionalVersionedTextDocumentIdentifier,
                    /* harmony export */ ParameterInformation: ()=>/* binding */ ParameterInformation,
                    /* harmony export */ Position: ()=>/* binding */ Position,
                    /* harmony export */ Range: ()=>/* binding */ Range,
                    /* harmony export */ RenameFile: ()=>/* binding */ RenameFile,
                    /* harmony export */ SelectionRange: ()=>/* binding */ SelectionRange,
                    /* harmony export */ SemanticTokenModifiers: ()=>/* binding */ SemanticTokenModifiers,
                    /* harmony export */ SemanticTokenTypes: ()=>/* binding */ SemanticTokenTypes,
                    /* harmony export */ SemanticTokens: ()=>/* binding */ SemanticTokens,
                    /* harmony export */ SignatureInformation: ()=>/* binding */ SignatureInformation,
                    /* harmony export */ SymbolInformation: ()=>/* binding */ SymbolInformation,
                    /* harmony export */ SymbolKind: ()=>/* binding */ SymbolKind,
                    /* harmony export */ SymbolTag: ()=>/* binding */ SymbolTag,
                    /* harmony export */ TextDocument: ()=>/* binding */ TextDocument,
                    /* harmony export */ TextDocumentEdit: ()=>/* binding */ TextDocumentEdit,
                    /* harmony export */ TextDocumentIdentifier: ()=>/* binding */ TextDocumentIdentifier,
                    /* harmony export */ TextDocumentItem: ()=>/* binding */ TextDocumentItem,
                    /* harmony export */ TextEdit: ()=>/* binding */ TextEdit,
                    /* harmony export */ URI: ()=>/* binding */ URI,
                    /* harmony export */ VersionedTextDocumentIdentifier: ()=>/* binding */ VersionedTextDocumentIdentifier,
                    /* harmony export */ WorkspaceChange: ()=>/* binding */ WorkspaceChange,
                    /* harmony export */ WorkspaceEdit: ()=>/* binding */ WorkspaceEdit,
                    /* harmony export */ WorkspaceFolder: ()=>/* binding */ WorkspaceFolder,
                    /* harmony export */ WorkspaceSymbol: ()=>/* binding */ WorkspaceSymbol,
                    /* harmony export */ integer: ()=>/* binding */ integer,
                    /* harmony export */ uinteger: ()=>/* binding */ uinteger
                });
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ var DocumentUri;
                (function(DocumentUri) {
                    function is(value) {
                        return typeof value === 'string';
                    }
                    DocumentUri.is = is;
                })(DocumentUri || (DocumentUri = {}));
                var URI;
                (function(URI) {
                    function is(value) {
                        return typeof value === 'string';
                    }
                    URI.is = is;
                })(URI || (URI = {}));
                var integer;
                (function(integer) {
                    integer.MIN_VALUE = -2147483648;
                    integer.MAX_VALUE = 2147483647;
                    function is(value) {
                        return typeof value === 'number' && integer.MIN_VALUE <= value && value <= integer.MAX_VALUE;
                    }
                    integer.is = is;
                })(integer || (integer = {}));
                var uinteger;
                (function(uinteger) {
                    uinteger.MIN_VALUE = 0;
                    uinteger.MAX_VALUE = 2147483647;
                    function is(value) {
                        return typeof value === 'number' && uinteger.MIN_VALUE <= value && value <= uinteger.MAX_VALUE;
                    }
                    uinteger.is = is;
                })(uinteger || (uinteger = {}));
                /**
 * The Position namespace provides helper functions to work with
 * {@link Position} literals.
 */ var Position;
                (function(Position) {
                    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */ function create(line, character) {
                        if (line === Number.MAX_VALUE) {
                            line = uinteger.MAX_VALUE;
                        }
                        if (character === Number.MAX_VALUE) {
                            character = uinteger.MAX_VALUE;
                        }
                        return {
                            line: line,
                            character: character
                        };
                    }
                    Position.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link Position} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
                    }
                    Position.is = is;
                })(Position || (Position = {}));
                /**
 * The Range namespace provides helper functions to work with
 * {@link Range} literals.
 */ var Range;
                (function(Range) {
                    function create(one, two, three, four) {
                        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
                            return {
                                start: Position.create(one, two),
                                end: Position.create(three, four)
                            };
                        } else if (Position.is(one) && Position.is(two)) {
                            return {
                                start: one,
                                end: two
                            };
                        } else {
                            throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
                        }
                    }
                    Range.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link Range} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
                    }
                    Range.is = is;
                })(Range || (Range = {}));
                /**
 * The Location namespace provides helper functions to work with
 * {@link Location} literals.
 */ var Location;
                (function(Location) {
                    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */ function create(uri, range) {
                        return {
                            uri: uri,
                            range: range
                        };
                    }
                    Location.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link Location} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
                    }
                    Location.is = is;
                })(Location || (Location = {}));
                /**
 * The LocationLink namespace provides helper functions to work with
 * {@link LocationLink} literals.
 */ var LocationLink;
                (function(LocationLink) {
                    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */ function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
                        return {
                            targetUri: targetUri,
                            targetRange: targetRange,
                            targetSelectionRange: targetSelectionRange,
                            originSelectionRange: originSelectionRange
                        };
                    }
                    LocationLink.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link LocationLink} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
                    }
                    LocationLink.is = is;
                })(LocationLink || (LocationLink = {}));
                /**
 * The Color namespace provides helper functions to work with
 * {@link Color} literals.
 */ var Color;
                (function(Color) {
                    /**
     * Creates a new Color literal.
     */ function create(red, green, blue, alpha) {
                        return {
                            red: red,
                            green: green,
                            blue: blue,
                            alpha: alpha
                        };
                    }
                    Color.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link Color} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
                    }
                    Color.is = is;
                })(Color || (Color = {}));
                /**
 * The ColorInformation namespace provides helper functions to work with
 * {@link ColorInformation} literals.
 */ var ColorInformation;
                (function(ColorInformation) {
                    /**
     * Creates a new ColorInformation literal.
     */ function create(range, color) {
                        return {
                            range: range,
                            color: color
                        };
                    }
                    ColorInformation.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link ColorInformation} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
                    }
                    ColorInformation.is = is;
                })(ColorInformation || (ColorInformation = {}));
                /**
 * The Color namespace provides helper functions to work with
 * {@link ColorPresentation} literals.
 */ var ColorPresentation;
                (function(ColorPresentation) {
                    /**
     * Creates a new ColorInformation literal.
     */ function create(label, textEdit, additionalTextEdits) {
                        return {
                            label: label,
                            textEdit: textEdit,
                            additionalTextEdits: additionalTextEdits
                        };
                    }
                    ColorPresentation.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link ColorInformation} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
                    }
                    ColorPresentation.is = is;
                })(ColorPresentation || (ColorPresentation = {}));
                /**
 * A set of predefined range kinds.
 */ var FoldingRangeKind;
                (function(FoldingRangeKind) {
                    /**
     * Folding range for a comment
     */ FoldingRangeKind.Comment = 'comment';
                    /**
     * Folding range for an import or include
     */ FoldingRangeKind.Imports = 'imports';
                    /**
     * Folding range for a region (e.g. `#region`)
     */ FoldingRangeKind.Region = 'region';
                })(FoldingRangeKind || (FoldingRangeKind = {}));
                /**
 * The folding range namespace provides helper functions to work with
 * {@link FoldingRange} literals.
 */ var FoldingRange;
                (function(FoldingRange) {
                    /**
     * Creates a new FoldingRange literal.
     */ function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
                        var result = {
                            startLine: startLine,
                            endLine: endLine
                        };
                        if (Is.defined(startCharacter)) {
                            result.startCharacter = startCharacter;
                        }
                        if (Is.defined(endCharacter)) {
                            result.endCharacter = endCharacter;
                        }
                        if (Is.defined(kind)) {
                            result.kind = kind;
                        }
                        if (Is.defined(collapsedText)) {
                            result.collapsedText = collapsedText;
                        }
                        return result;
                    }
                    FoldingRange.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link FoldingRange} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
                    }
                    FoldingRange.is = is;
                })(FoldingRange || (FoldingRange = {}));
                /**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * {@link DiagnosticRelatedInformation} literals.
 */ var DiagnosticRelatedInformation;
                (function(DiagnosticRelatedInformation) {
                    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */ function create(location, message) {
                        return {
                            location: location,
                            message: message
                        };
                    }
                    DiagnosticRelatedInformation.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link DiagnosticRelatedInformation} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
                    }
                    DiagnosticRelatedInformation.is = is;
                })(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
                /**
 * The diagnostic's severity.
 */ var DiagnosticSeverity;
                (function(DiagnosticSeverity) {
                    /**
     * Reports an error.
     */ DiagnosticSeverity.Error = 1;
                    /**
     * Reports a warning.
     */ DiagnosticSeverity.Warning = 2;
                    /**
     * Reports an information.
     */ DiagnosticSeverity.Information = 3;
                    /**
     * Reports a hint.
     */ DiagnosticSeverity.Hint = 4;
                })(DiagnosticSeverity || (DiagnosticSeverity = {}));
                /**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */ var DiagnosticTag;
                (function(DiagnosticTag) {
                    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */ DiagnosticTag.Unnecessary = 1;
                    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */ DiagnosticTag.Deprecated = 2;
                })(DiagnosticTag || (DiagnosticTag = {}));
                /**
 * The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
 *
 * @since 3.16.0
 */ var CodeDescription;
                (function(CodeDescription) {
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.string(candidate.href);
                    }
                    CodeDescription.is = is;
                })(CodeDescription || (CodeDescription = {}));
                /**
 * The Diagnostic namespace provides helper functions to work with
 * {@link Diagnostic} literals.
 */ var Diagnostic;
                (function(Diagnostic) {
                    /**
     * Creates a new Diagnostic literal.
     */ function create(range, message, severity, code, source, relatedInformation) {
                        var result = {
                            range: range,
                            message: message
                        };
                        if (Is.defined(severity)) {
                            result.severity = severity;
                        }
                        if (Is.defined(code)) {
                            result.code = code;
                        }
                        if (Is.defined(source)) {
                            result.source = source;
                        }
                        if (Is.defined(relatedInformation)) {
                            result.relatedInformation = relatedInformation;
                        }
                        return result;
                    }
                    Diagnostic.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link Diagnostic} interface.
     */ function is(value) {
                        var _a;
                        var candidate = value;
                        return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
                    }
                    Diagnostic.is = is;
                })(Diagnostic || (Diagnostic = {}));
                /**
 * The Command namespace provides helper functions to work with
 * {@link Command} literals.
 */ var Command;
                (function(Command) {
                    /**
     * Creates a new Command literal.
     */ function create(title, command) {
                        var args = [];
                        for(var _i = 2; _i < arguments.length; _i++){
                            args[_i - 2] = arguments[_i];
                        }
                        var result = {
                            title: title,
                            command: command
                        };
                        if (Is.defined(args) && args.length > 0) {
                            result.arguments = args;
                        }
                        return result;
                    }
                    Command.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link Command} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
                    }
                    Command.is = is;
                })(Command || (Command = {}));
                /**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */ var TextEdit;
                (function(TextEdit) {
                    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */ function replace(range, newText) {
                        return {
                            range: range,
                            newText: newText
                        };
                    }
                    TextEdit.replace = replace;
                    /**
     * Creates an insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */ function insert(position, newText) {
                        return {
                            range: {
                                start: position,
                                end: position
                            },
                            newText: newText
                        };
                    }
                    TextEdit.insert = insert;
                    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */ function del(range) {
                        return {
                            range: range,
                            newText: ''
                        };
                    }
                    TextEdit.del = del;
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
                    }
                    TextEdit.is = is;
                })(TextEdit || (TextEdit = {}));
                var ChangeAnnotation;
                (function(ChangeAnnotation) {
                    function create(label, needsConfirmation, description) {
                        var result = {
                            label: label
                        };
                        if (needsConfirmation !== undefined) {
                            result.needsConfirmation = needsConfirmation;
                        }
                        if (description !== undefined) {
                            result.description = description;
                        }
                        return result;
                    }
                    ChangeAnnotation.create = create;
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) && (Is.string(candidate.description) || candidate.description === undefined);
                    }
                    ChangeAnnotation.is = is;
                })(ChangeAnnotation || (ChangeAnnotation = {}));
                var ChangeAnnotationIdentifier;
                (function(ChangeAnnotationIdentifier) {
                    function is(value) {
                        var candidate = value;
                        return Is.string(candidate);
                    }
                    ChangeAnnotationIdentifier.is = is;
                })(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
                var AnnotatedTextEdit;
                (function(AnnotatedTextEdit) {
                    /**
     * Creates an annotated replace text edit.
     *
     * @param range The range of text to be replaced.
     * @param newText The new text.
     * @param annotation The annotation.
     */ function replace(range, newText, annotation) {
                        return {
                            range: range,
                            newText: newText,
                            annotationId: annotation
                        };
                    }
                    AnnotatedTextEdit.replace = replace;
                    /**
     * Creates an annotated insert text edit.
     *
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     * @param annotation The annotation.
     */ function insert(position, newText, annotation) {
                        return {
                            range: {
                                start: position,
                                end: position
                            },
                            newText: newText,
                            annotationId: annotation
                        };
                    }
                    AnnotatedTextEdit.insert = insert;
                    /**
     * Creates an annotated delete text edit.
     *
     * @param range The range of text to be deleted.
     * @param annotation The annotation.
     */ function del(range, annotation) {
                        return {
                            range: range,
                            newText: '',
                            annotationId: annotation
                        };
                    }
                    AnnotatedTextEdit.del = del;
                    function is(value) {
                        var candidate = value;
                        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
                    }
                    AnnotatedTextEdit.is = is;
                })(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
                /**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */ var TextDocumentEdit;
                (function(TextDocumentEdit) {
                    /**
     * Creates a new `TextDocumentEdit`
     */ function create(textDocument, edits) {
                        return {
                            textDocument: textDocument,
                            edits: edits
                        };
                    }
                    TextDocumentEdit.create = create;
                    function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
                    }
                    TextDocumentEdit.is = is;
                })(TextDocumentEdit || (TextDocumentEdit = {}));
                var CreateFile;
                (function(CreateFile) {
                    function create(uri, options, annotation) {
                        var result = {
                            kind: 'create',
                            uri: uri
                        };
                        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
                            result.options = options;
                        }
                        if (annotation !== undefined) {
                            result.annotationId = annotation;
                        }
                        return result;
                    }
                    CreateFile.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined || (candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
                    }
                    CreateFile.is = is;
                })(CreateFile || (CreateFile = {}));
                var RenameFile;
                (function(RenameFile) {
                    function create(oldUri, newUri, options, annotation) {
                        var result = {
                            kind: 'rename',
                            oldUri: oldUri,
                            newUri: newUri
                        };
                        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
                            result.options = options;
                        }
                        if (annotation !== undefined) {
                            result.annotationId = annotation;
                        }
                        return result;
                    }
                    RenameFile.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined || (candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
                    }
                    RenameFile.is = is;
                })(RenameFile || (RenameFile = {}));
                var DeleteFile;
                (function(DeleteFile) {
                    function create(uri, options, annotation) {
                        var result = {
                            kind: 'delete',
                            uri: uri
                        };
                        if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
                            result.options = options;
                        }
                        if (annotation !== undefined) {
                            result.annotationId = annotation;
                        }
                        return result;
                    }
                    DeleteFile.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined || (candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
                    }
                    DeleteFile.is = is;
                })(DeleteFile || (DeleteFile = {}));
                var WorkspaceEdit;
                (function(WorkspaceEdit) {
                    function is(value) {
                        var candidate = value;
                        return candidate && (candidate.changes !== undefined || candidate.documentChanges !== undefined) && (candidate.documentChanges === undefined || candidate.documentChanges.every(function(change) {
                            if (Is.string(change.kind)) {
                                return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                            } else {
                                return TextDocumentEdit.is(change);
                            }
                        }));
                    }
                    WorkspaceEdit.is = is;
                })(WorkspaceEdit || (WorkspaceEdit = {}));
                var TextEditChangeImpl = /** @class */ function() {
                    function TextEditChangeImpl(edits, changeAnnotations) {
                        this.edits = edits;
                        this.changeAnnotations = changeAnnotations;
                    }
                    TextEditChangeImpl.prototype.insert = function(position, newText, annotation) {
                        var edit;
                        var id;
                        if (annotation === undefined) {
                            edit = TextEdit.insert(position, newText);
                        } else if (ChangeAnnotationIdentifier.is(annotation)) {
                            id = annotation;
                            edit = AnnotatedTextEdit.insert(position, newText, annotation);
                        } else {
                            this.assertChangeAnnotations(this.changeAnnotations);
                            id = this.changeAnnotations.manage(annotation);
                            edit = AnnotatedTextEdit.insert(position, newText, id);
                        }
                        this.edits.push(edit);
                        if (id !== undefined) {
                            return id;
                        }
                    };
                    TextEditChangeImpl.prototype.replace = function(range, newText, annotation) {
                        var edit;
                        var id;
                        if (annotation === undefined) {
                            edit = TextEdit.replace(range, newText);
                        } else if (ChangeAnnotationIdentifier.is(annotation)) {
                            id = annotation;
                            edit = AnnotatedTextEdit.replace(range, newText, annotation);
                        } else {
                            this.assertChangeAnnotations(this.changeAnnotations);
                            id = this.changeAnnotations.manage(annotation);
                            edit = AnnotatedTextEdit.replace(range, newText, id);
                        }
                        this.edits.push(edit);
                        if (id !== undefined) {
                            return id;
                        }
                    };
                    TextEditChangeImpl.prototype.delete = function(range, annotation) {
                        var edit;
                        var id;
                        if (annotation === undefined) {
                            edit = TextEdit.del(range);
                        } else if (ChangeAnnotationIdentifier.is(annotation)) {
                            id = annotation;
                            edit = AnnotatedTextEdit.del(range, annotation);
                        } else {
                            this.assertChangeAnnotations(this.changeAnnotations);
                            id = this.changeAnnotations.manage(annotation);
                            edit = AnnotatedTextEdit.del(range, id);
                        }
                        this.edits.push(edit);
                        if (id !== undefined) {
                            return id;
                        }
                    };
                    TextEditChangeImpl.prototype.add = function(edit) {
                        this.edits.push(edit);
                    };
                    TextEditChangeImpl.prototype.all = function() {
                        return this.edits;
                    };
                    TextEditChangeImpl.prototype.clear = function() {
                        this.edits.splice(0, this.edits.length);
                    };
                    TextEditChangeImpl.prototype.assertChangeAnnotations = function(value) {
                        if (value === undefined) {
                            throw new Error("Text edit change is not configured to manage change annotations.");
                        }
                    };
                    return TextEditChangeImpl;
                }();
                /**
 * A helper class
 */ var ChangeAnnotations = /** @class */ function() {
                    function ChangeAnnotations(annotations) {
                        this._annotations = annotations === undefined ? Object.create(null) : annotations;
                        this._counter = 0;
                        this._size = 0;
                    }
                    ChangeAnnotations.prototype.all = function() {
                        return this._annotations;
                    };
                    Object.defineProperty(ChangeAnnotations.prototype, "size", {
                        get: function() {
                            return this._size;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    ChangeAnnotations.prototype.manage = function(idOrAnnotation, annotation) {
                        var id;
                        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
                            id = idOrAnnotation;
                        } else {
                            id = this.nextId();
                            annotation = idOrAnnotation;
                        }
                        if (this._annotations[id] !== undefined) {
                            throw new Error("Id ".concat(id, " is already in use."));
                        }
                        if (annotation === undefined) {
                            throw new Error("No annotation provided for id ".concat(id));
                        }
                        this._annotations[id] = annotation;
                        this._size++;
                        return id;
                    };
                    ChangeAnnotations.prototype.nextId = function() {
                        this._counter++;
                        return this._counter.toString();
                    };
                    return ChangeAnnotations;
                }();
                /**
 * A workspace change helps constructing changes to a workspace.
 */ var WorkspaceChange = /** @class */ function() {
                    function WorkspaceChange(workspaceEdit) {
                        var _this = this;
                        this._textEditChanges = Object.create(null);
                        if (workspaceEdit !== undefined) {
                            this._workspaceEdit = workspaceEdit;
                            if (workspaceEdit.documentChanges) {
                                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                                workspaceEdit.documentChanges.forEach(function(change) {
                                    if (TextDocumentEdit.is(change)) {
                                        var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                                    }
                                });
                            } else if (workspaceEdit.changes) {
                                Object.keys(workspaceEdit.changes).forEach(function(key) {
                                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                                    _this._textEditChanges[key] = textEditChange;
                                });
                            }
                        } else {
                            this._workspaceEdit = {};
                        }
                    }
                    Object.defineProperty(WorkspaceChange.prototype, "edit", {
                        /**
         * Returns the underlying {@link WorkspaceEdit} literal
         * use to be returned from a workspace edit operation like rename.
         */ get: function() {
                            this.initDocumentChanges();
                            if (this._changeAnnotations !== undefined) {
                                if (this._changeAnnotations.size === 0) {
                                    this._workspaceEdit.changeAnnotations = undefined;
                                } else {
                                    this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                                }
                            }
                            return this._workspaceEdit;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    WorkspaceChange.prototype.getTextEditChange = function(key) {
                        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
                            this.initDocumentChanges();
                            if (this._workspaceEdit.documentChanges === undefined) {
                                throw new Error('Workspace edit is not configured for document changes.');
                            }
                            var textDocument = {
                                uri: key.uri,
                                version: key.version
                            };
                            var result = this._textEditChanges[textDocument.uri];
                            if (!result) {
                                var edits = [];
                                var textDocumentEdit = {
                                    textDocument: textDocument,
                                    edits: edits
                                };
                                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                                this._textEditChanges[textDocument.uri] = result;
                            }
                            return result;
                        } else {
                            this.initChanges();
                            if (this._workspaceEdit.changes === undefined) {
                                throw new Error('Workspace edit is not configured for normal text edit changes.');
                            }
                            var result = this._textEditChanges[key];
                            if (!result) {
                                var edits = [];
                                this._workspaceEdit.changes[key] = edits;
                                result = new TextEditChangeImpl(edits);
                                this._textEditChanges[key] = result;
                            }
                            return result;
                        }
                    };
                    WorkspaceChange.prototype.initDocumentChanges = function() {
                        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
                            this._changeAnnotations = new ChangeAnnotations();
                            this._workspaceEdit.documentChanges = [];
                            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                        }
                    };
                    WorkspaceChange.prototype.initChanges = function() {
                        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
                            this._workspaceEdit.changes = Object.create(null);
                        }
                    };
                    WorkspaceChange.prototype.createFile = function(uri, optionsOrAnnotation, options) {
                        this.initDocumentChanges();
                        if (this._workspaceEdit.documentChanges === undefined) {
                            throw new Error('Workspace edit is not configured for document changes.');
                        }
                        var annotation;
                        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
                            annotation = optionsOrAnnotation;
                        } else {
                            options = optionsOrAnnotation;
                        }
                        var operation;
                        var id;
                        if (annotation === undefined) {
                            operation = CreateFile.create(uri, options);
                        } else {
                            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
                            operation = CreateFile.create(uri, options, id);
                        }
                        this._workspaceEdit.documentChanges.push(operation);
                        if (id !== undefined) {
                            return id;
                        }
                    };
                    WorkspaceChange.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
                        this.initDocumentChanges();
                        if (this._workspaceEdit.documentChanges === undefined) {
                            throw new Error('Workspace edit is not configured for document changes.');
                        }
                        var annotation;
                        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
                            annotation = optionsOrAnnotation;
                        } else {
                            options = optionsOrAnnotation;
                        }
                        var operation;
                        var id;
                        if (annotation === undefined) {
                            operation = RenameFile.create(oldUri, newUri, options);
                        } else {
                            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
                            operation = RenameFile.create(oldUri, newUri, options, id);
                        }
                        this._workspaceEdit.documentChanges.push(operation);
                        if (id !== undefined) {
                            return id;
                        }
                    };
                    WorkspaceChange.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
                        this.initDocumentChanges();
                        if (this._workspaceEdit.documentChanges === undefined) {
                            throw new Error('Workspace edit is not configured for document changes.');
                        }
                        var annotation;
                        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
                            annotation = optionsOrAnnotation;
                        } else {
                            options = optionsOrAnnotation;
                        }
                        var operation;
                        var id;
                        if (annotation === undefined) {
                            operation = DeleteFile.create(uri, options);
                        } else {
                            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
                            operation = DeleteFile.create(uri, options, id);
                        }
                        this._workspaceEdit.documentChanges.push(operation);
                        if (id !== undefined) {
                            return id;
                        }
                    };
                    return WorkspaceChange;
                }();
                /**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * {@link TextDocumentIdentifier} literals.
 */ var TextDocumentIdentifier;
                (function(TextDocumentIdentifier) {
                    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */ function create(uri) {
                        return {
                            uri: uri
                        };
                    }
                    TextDocumentIdentifier.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link TextDocumentIdentifier} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.string(candidate.uri);
                    }
                    TextDocumentIdentifier.is = is;
                })(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
                /**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * {@link VersionedTextDocumentIdentifier} literals.
 */ var VersionedTextDocumentIdentifier;
                (function(VersionedTextDocumentIdentifier) {
                    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param version The document's version.
     */ function create(uri, version) {
                        return {
                            uri: uri,
                            version: version
                        };
                    }
                    VersionedTextDocumentIdentifier.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link VersionedTextDocumentIdentifier} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
                    }
                    VersionedTextDocumentIdentifier.is = is;
                })(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
                /**
 * The OptionalVersionedTextDocumentIdentifier namespace provides helper functions to work with
 * {@link OptionalVersionedTextDocumentIdentifier} literals.
 */ var OptionalVersionedTextDocumentIdentifier;
                (function(OptionalVersionedTextDocumentIdentifier) {
                    /**
     * Creates a new OptionalVersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param version The document's version.
     */ function create(uri, version) {
                        return {
                            uri: uri,
                            version: version
                        };
                    }
                    OptionalVersionedTextDocumentIdentifier.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link OptionalVersionedTextDocumentIdentifier} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
                    }
                    OptionalVersionedTextDocumentIdentifier.is = is;
                })(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
                /**
 * The TextDocumentItem namespace provides helper functions to work with
 * {@link TextDocumentItem} literals.
 */ var TextDocumentItem;
                (function(TextDocumentItem) {
                    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */ function create(uri, languageId, version, text) {
                        return {
                            uri: uri,
                            languageId: languageId,
                            version: version,
                            text: text
                        };
                    }
                    TextDocumentItem.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link TextDocumentItem} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
                    }
                    TextDocumentItem.is = is;
                })(TextDocumentItem || (TextDocumentItem = {}));
                /**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */ var MarkupKind;
                (function(MarkupKind) {
                    /**
     * Plain text is supported as a content format
     */ MarkupKind.PlainText = 'plaintext';
                    /**
     * Markdown is supported as a content format
     */ MarkupKind.Markdown = 'markdown';
                    /**
     * Checks whether the given value is a value of the {@link MarkupKind} type.
     */ function is(value) {
                        var candidate = value;
                        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
                    }
                    MarkupKind.is = is;
                })(MarkupKind || (MarkupKind = {}));
                var MarkupContent;
                (function(MarkupContent) {
                    /**
     * Checks whether the given value conforms to the {@link MarkupContent} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
                    }
                    MarkupContent.is = is;
                })(MarkupContent || (MarkupContent = {}));
                /**
 * The kind of a completion entry.
 */ var CompletionItemKind;
                (function(CompletionItemKind) {
                    CompletionItemKind.Text = 1;
                    CompletionItemKind.Method = 2;
                    CompletionItemKind.Function = 3;
                    CompletionItemKind.Constructor = 4;
                    CompletionItemKind.Field = 5;
                    CompletionItemKind.Variable = 6;
                    CompletionItemKind.Class = 7;
                    CompletionItemKind.Interface = 8;
                    CompletionItemKind.Module = 9;
                    CompletionItemKind.Property = 10;
                    CompletionItemKind.Unit = 11;
                    CompletionItemKind.Value = 12;
                    CompletionItemKind.Enum = 13;
                    CompletionItemKind.Keyword = 14;
                    CompletionItemKind.Snippet = 15;
                    CompletionItemKind.Color = 16;
                    CompletionItemKind.File = 17;
                    CompletionItemKind.Reference = 18;
                    CompletionItemKind.Folder = 19;
                    CompletionItemKind.EnumMember = 20;
                    CompletionItemKind.Constant = 21;
                    CompletionItemKind.Struct = 22;
                    CompletionItemKind.Event = 23;
                    CompletionItemKind.Operator = 24;
                    CompletionItemKind.TypeParameter = 25;
                })(CompletionItemKind || (CompletionItemKind = {}));
                /**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */ var InsertTextFormat;
                (function(InsertTextFormat) {
                    /**
     * The primary text to be inserted is treated as a plain string.
     */ InsertTextFormat.PlainText = 1;
                    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
     */ InsertTextFormat.Snippet = 2;
                })(InsertTextFormat || (InsertTextFormat = {}));
                /**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */ var CompletionItemTag;
                (function(CompletionItemTag) {
                    /**
     * Render a completion as obsolete, usually using a strike-out.
     */ CompletionItemTag.Deprecated = 1;
                })(CompletionItemTag || (CompletionItemTag = {}));
                /**
 * The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
 *
 * @since 3.16.0
 */ var InsertReplaceEdit;
                (function(InsertReplaceEdit) {
                    /**
     * Creates a new insert / replace edit
     */ function create(newText, insert, replace) {
                        return {
                            newText: newText,
                            insert: insert,
                            replace: replace
                        };
                    }
                    InsertReplaceEdit.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link InsertReplaceEdit} interface.
     */ function is(value) {
                        var candidate = value;
                        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
                    }
                    InsertReplaceEdit.is = is;
                })(InsertReplaceEdit || (InsertReplaceEdit = {}));
                /**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */ var InsertTextMode;
                (function(InsertTextMode) {
                    /**
     * The insertion or replace strings is taken as it is. If the
     * value is multi line the lines below the cursor will be
     * inserted using the indentation defined in the string value.
     * The client will not apply any kind of adjustments to the
     * string.
     */ InsertTextMode.asIs = 1;
                    /**
     * The editor adjusts leading whitespace of new lines so that
     * they match the indentation up to the cursor of the line for
     * which the item is accepted.
     *
     * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
     * multi line completion item is indented using 2 tabs and all
     * following lines inserted will be indented using 2 tabs as well.
     */ InsertTextMode.adjustIndentation = 2;
                })(InsertTextMode || (InsertTextMode = {}));
                var CompletionItemLabelDetails;
                (function(CompletionItemLabelDetails) {
                    function is(value) {
                        var candidate = value;
                        return candidate && (Is.string(candidate.detail) || candidate.detail === undefined) && (Is.string(candidate.description) || candidate.description === undefined);
                    }
                    CompletionItemLabelDetails.is = is;
                })(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
                /**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */ var CompletionItem;
                (function(CompletionItem) {
                    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */ function create(label) {
                        return {
                            label: label
                        };
                    }
                    CompletionItem.create = create;
                })(CompletionItem || (CompletionItem = {}));
                /**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */ var CompletionList;
                (function(CompletionList) {
                    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */ function create(items, isIncomplete) {
                        return {
                            items: items ? items : [],
                            isIncomplete: !!isIncomplete
                        };
                    }
                    CompletionList.create = create;
                })(CompletionList || (CompletionList = {}));
                var MarkedString;
                (function(MarkedString) {
                    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */ function fromPlainText(plainText) {
                        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
                    }
                    MarkedString.fromPlainText = fromPlainText;
                    /**
     * Checks whether the given value conforms to the {@link MarkedString} type.
     */ function is(value) {
                        var candidate = value;
                        return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
                    }
                    MarkedString.is = is;
                })(MarkedString || (MarkedString = {}));
                var Hover;
                (function(Hover) {
                    /**
     * Checks whether the given value conforms to the {@link Hover} interface.
     */ function is(value) {
                        var candidate = value;
                        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
                    }
                    Hover.is = is;
                })(Hover || (Hover = {}));
                /**
 * The ParameterInformation namespace provides helper functions to work with
 * {@link ParameterInformation} literals.
 */ var ParameterInformation;
                (function(ParameterInformation) {
                    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */ function create(label, documentation) {
                        return documentation ? {
                            label: label,
                            documentation: documentation
                        } : {
                            label: label
                        };
                    }
                    ParameterInformation.create = create;
                })(ParameterInformation || (ParameterInformation = {}));
                /**
 * The SignatureInformation namespace provides helper functions to work with
 * {@link SignatureInformation} literals.
 */ var SignatureInformation;
                (function(SignatureInformation) {
                    function create(label, documentation) {
                        var parameters = [];
                        for(var _i = 2; _i < arguments.length; _i++){
                            parameters[_i - 2] = arguments[_i];
                        }
                        var result = {
                            label: label
                        };
                        if (Is.defined(documentation)) {
                            result.documentation = documentation;
                        }
                        if (Is.defined(parameters)) {
                            result.parameters = parameters;
                        } else {
                            result.parameters = [];
                        }
                        return result;
                    }
                    SignatureInformation.create = create;
                })(SignatureInformation || (SignatureInformation = {}));
                /**
 * A document highlight kind.
 */ var DocumentHighlightKind;
                (function(DocumentHighlightKind) {
                    /**
     * A textual occurrence.
     */ DocumentHighlightKind.Text = 1;
                    /**
     * Read-access of a symbol, like reading a variable.
     */ DocumentHighlightKind.Read = 2;
                    /**
     * Write-access of a symbol, like writing to a variable.
     */ DocumentHighlightKind.Write = 3;
                })(DocumentHighlightKind || (DocumentHighlightKind = {}));
                /**
 * DocumentHighlight namespace to provide helper functions to work with
 * {@link DocumentHighlight} literals.
 */ var DocumentHighlight;
                (function(DocumentHighlight) {
                    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     * @param kind The highlight kind
     */ function create(range, kind) {
                        var result = {
                            range: range
                        };
                        if (Is.number(kind)) {
                            result.kind = kind;
                        }
                        return result;
                    }
                    DocumentHighlight.create = create;
                })(DocumentHighlight || (DocumentHighlight = {}));
                /**
 * A symbol kind.
 */ var SymbolKind;
                (function(SymbolKind) {
                    SymbolKind.File = 1;
                    SymbolKind.Module = 2;
                    SymbolKind.Namespace = 3;
                    SymbolKind.Package = 4;
                    SymbolKind.Class = 5;
                    SymbolKind.Method = 6;
                    SymbolKind.Property = 7;
                    SymbolKind.Field = 8;
                    SymbolKind.Constructor = 9;
                    SymbolKind.Enum = 10;
                    SymbolKind.Interface = 11;
                    SymbolKind.Function = 12;
                    SymbolKind.Variable = 13;
                    SymbolKind.Constant = 14;
                    SymbolKind.String = 15;
                    SymbolKind.Number = 16;
                    SymbolKind.Boolean = 17;
                    SymbolKind.Array = 18;
                    SymbolKind.Object = 19;
                    SymbolKind.Key = 20;
                    SymbolKind.Null = 21;
                    SymbolKind.EnumMember = 22;
                    SymbolKind.Struct = 23;
                    SymbolKind.Event = 24;
                    SymbolKind.Operator = 25;
                    SymbolKind.TypeParameter = 26;
                })(SymbolKind || (SymbolKind = {}));
                /**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 *
 * @since 3.16
 */ var SymbolTag;
                (function(SymbolTag) {
                    /**
     * Render a symbol as obsolete, usually using a strike-out.
     */ SymbolTag.Deprecated = 1;
                })(SymbolTag || (SymbolTag = {}));
                var SymbolInformation;
                (function(SymbolInformation) {
                    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol.
     * @param containerName The name of the symbol containing the symbol.
     */ function create(name, kind, range, uri, containerName) {
                        var result = {
                            name: name,
                            kind: kind,
                            location: {
                                uri: uri,
                                range: range
                            }
                        };
                        if (containerName) {
                            result.containerName = containerName;
                        }
                        return result;
                    }
                    SymbolInformation.create = create;
                })(SymbolInformation || (SymbolInformation = {}));
                var WorkspaceSymbol;
                (function(WorkspaceSymbol) {
                    /**
     * Create a new workspace symbol.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param uri The resource of the location of the symbol.
     * @param range An options range of the location.
     * @returns A WorkspaceSymbol.
     */ function create(name, kind, uri, range) {
                        return range !== undefined ? {
                            name: name,
                            kind: kind,
                            location: {
                                uri: uri,
                                range: range
                            }
                        } : {
                            name: name,
                            kind: kind,
                            location: {
                                uri: uri
                            }
                        };
                    }
                    WorkspaceSymbol.create = create;
                })(WorkspaceSymbol || (WorkspaceSymbol = {}));
                var DocumentSymbol;
                (function(DocumentSymbol) {
                    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */ function create(name, detail, kind, range, selectionRange, children) {
                        var result = {
                            name: name,
                            detail: detail,
                            kind: kind,
                            range: range,
                            selectionRange: selectionRange
                        };
                        if (children !== undefined) {
                            result.children = children;
                        }
                        return result;
                    }
                    DocumentSymbol.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link DocumentSymbol} interface.
     */ function is(value) {
                        var candidate = value;
                        return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === undefined || Is.string(candidate.detail)) && (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) && (candidate.children === undefined || Array.isArray(candidate.children)) && (candidate.tags === undefined || Array.isArray(candidate.tags));
                    }
                    DocumentSymbol.is = is;
                })(DocumentSymbol || (DocumentSymbol = {}));
                /**
 * A set of predefined code action kinds
 */ var CodeActionKind;
                (function(CodeActionKind) {
                    /**
     * Empty kind.
     */ CodeActionKind.Empty = '';
                    /**
     * Base kind for quickfix actions: 'quickfix'
     */ CodeActionKind.QuickFix = 'quickfix';
                    /**
     * Base kind for refactoring actions: 'refactor'
     */ CodeActionKind.Refactor = 'refactor';
                    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */ CodeActionKind.RefactorExtract = 'refactor.extract';
                    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */ CodeActionKind.RefactorInline = 'refactor.inline';
                    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */ CodeActionKind.RefactorRewrite = 'refactor.rewrite';
                    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */ CodeActionKind.Source = 'source';
                    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */ CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
                    /**
     * Base kind for auto-fix source actions: `source.fixAll`.
     *
     * Fix all actions automatically fix errors that have a clear fix that do not require user input.
     * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
     *
     * @since 3.15.0
     */ CodeActionKind.SourceFixAll = 'source.fixAll';
                })(CodeActionKind || (CodeActionKind = {}));
                /**
 * The reason why code actions were requested.
 *
 * @since 3.17.0
 */ var CodeActionTriggerKind;
                (function(CodeActionTriggerKind) {
                    /**
     * Code actions were explicitly requested by the user or by an extension.
     */ CodeActionTriggerKind.Invoked = 1;
                    /**
     * Code actions were requested automatically.
     *
     * This typically happens when current selection in a file changes, but can
     * also be triggered when file content changes.
     */ CodeActionTriggerKind.Automatic = 2;
                })(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
                /**
 * The CodeActionContext namespace provides helper functions to work with
 * {@link CodeActionContext} literals.
 */ var CodeActionContext;
                (function(CodeActionContext) {
                    /**
     * Creates a new CodeActionContext literal.
     */ function create(diagnostics, only, triggerKind) {
                        var result = {
                            diagnostics: diagnostics
                        };
                        if (only !== undefined && only !== null) {
                            result.only = only;
                        }
                        if (triggerKind !== undefined && triggerKind !== null) {
                            result.triggerKind = triggerKind;
                        }
                        return result;
                    }
                    CodeActionContext.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link CodeActionContext} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === undefined || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
                    }
                    CodeActionContext.is = is;
                })(CodeActionContext || (CodeActionContext = {}));
                var CodeAction;
                (function(CodeAction) {
                    function create(title, kindOrCommandOrEdit, kind) {
                        var result = {
                            title: title
                        };
                        var checkKind = true;
                        if (typeof kindOrCommandOrEdit === 'string') {
                            checkKind = false;
                            result.kind = kindOrCommandOrEdit;
                        } else if (Command.is(kindOrCommandOrEdit)) {
                            result.command = kindOrCommandOrEdit;
                        } else {
                            result.edit = kindOrCommandOrEdit;
                        }
                        if (checkKind && kind !== undefined) {
                            result.kind = kind;
                        }
                        return result;
                    }
                    CodeAction.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate && Is.string(candidate.title) && (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === undefined || Is.string(candidate.kind)) && (candidate.edit !== undefined || candidate.command !== undefined) && (candidate.command === undefined || Command.is(candidate.command)) && (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) && (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
                    }
                    CodeAction.is = is;
                })(CodeAction || (CodeAction = {}));
                /**
 * The CodeLens namespace provides helper functions to work with
 * {@link CodeLens} literals.
 */ var CodeLens;
                (function(CodeLens) {
                    /**
     * Creates a new CodeLens literal.
     */ function create(range, data) {
                        var result = {
                            range: range
                        };
                        if (Is.defined(data)) {
                            result.data = data;
                        }
                        return result;
                    }
                    CodeLens.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link CodeLens} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
                    }
                    CodeLens.is = is;
                })(CodeLens || (CodeLens = {}));
                /**
 * The FormattingOptions namespace provides helper functions to work with
 * {@link FormattingOptions} literals.
 */ var FormattingOptions;
                (function(FormattingOptions) {
                    /**
     * Creates a new FormattingOptions literal.
     */ function create(tabSize, insertSpaces) {
                        return {
                            tabSize: tabSize,
                            insertSpaces: insertSpaces
                        };
                    }
                    FormattingOptions.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link FormattingOptions} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
                    }
                    FormattingOptions.is = is;
                })(FormattingOptions || (FormattingOptions = {}));
                /**
 * The DocumentLink namespace provides helper functions to work with
 * {@link DocumentLink} literals.
 */ var DocumentLink;
                (function(DocumentLink) {
                    /**
     * Creates a new DocumentLink literal.
     */ function create(range, target, data) {
                        return {
                            range: range,
                            target: target,
                            data: data
                        };
                    }
                    DocumentLink.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link DocumentLink} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
                    }
                    DocumentLink.is = is;
                })(DocumentLink || (DocumentLink = {}));
                /**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */ var SelectionRange;
                (function(SelectionRange) {
                    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */ function create(range, parent) {
                        return {
                            range: range,
                            parent: parent
                        };
                    }
                    SelectionRange.create = create;
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
                    }
                    SelectionRange.is = is;
                })(SelectionRange || (SelectionRange = {}));
                /**
 * A set of predefined token types. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */ var SemanticTokenTypes;
                (function(SemanticTokenTypes) {
                    SemanticTokenTypes["namespace"] = "namespace";
                    /**
     * Represents a generic type. Acts as a fallback for types which can't be mapped to
     * a specific type like class or enum.
     */ SemanticTokenTypes["type"] = "type";
                    SemanticTokenTypes["class"] = "class";
                    SemanticTokenTypes["enum"] = "enum";
                    SemanticTokenTypes["interface"] = "interface";
                    SemanticTokenTypes["struct"] = "struct";
                    SemanticTokenTypes["typeParameter"] = "typeParameter";
                    SemanticTokenTypes["parameter"] = "parameter";
                    SemanticTokenTypes["variable"] = "variable";
                    SemanticTokenTypes["property"] = "property";
                    SemanticTokenTypes["enumMember"] = "enumMember";
                    SemanticTokenTypes["event"] = "event";
                    SemanticTokenTypes["function"] = "function";
                    SemanticTokenTypes["method"] = "method";
                    SemanticTokenTypes["macro"] = "macro";
                    SemanticTokenTypes["keyword"] = "keyword";
                    SemanticTokenTypes["modifier"] = "modifier";
                    SemanticTokenTypes["comment"] = "comment";
                    SemanticTokenTypes["string"] = "string";
                    SemanticTokenTypes["number"] = "number";
                    SemanticTokenTypes["regexp"] = "regexp";
                    SemanticTokenTypes["operator"] = "operator";
                    /**
     * @since 3.17.0
     */ SemanticTokenTypes["decorator"] = "decorator";
                })(SemanticTokenTypes || (SemanticTokenTypes = {}));
                /**
 * A set of predefined token modifiers. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */ var SemanticTokenModifiers;
                (function(SemanticTokenModifiers) {
                    SemanticTokenModifiers["declaration"] = "declaration";
                    SemanticTokenModifiers["definition"] = "definition";
                    SemanticTokenModifiers["readonly"] = "readonly";
                    SemanticTokenModifiers["static"] = "static";
                    SemanticTokenModifiers["deprecated"] = "deprecated";
                    SemanticTokenModifiers["abstract"] = "abstract";
                    SemanticTokenModifiers["async"] = "async";
                    SemanticTokenModifiers["modification"] = "modification";
                    SemanticTokenModifiers["documentation"] = "documentation";
                    SemanticTokenModifiers["defaultLibrary"] = "defaultLibrary";
                })(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
                /**
 * @since 3.16.0
 */ var SemanticTokens;
                (function(SemanticTokens) {
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && (candidate.resultId === undefined || typeof candidate.resultId === 'string') && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === 'number');
                    }
                    SemanticTokens.is = is;
                })(SemanticTokens || (SemanticTokens = {}));
                /**
 * The InlineValueText namespace provides functions to deal with InlineValueTexts.
 *
 * @since 3.17.0
 */ var InlineValueText;
                (function(InlineValueText) {
                    /**
     * Creates a new InlineValueText literal.
     */ function create(range, text) {
                        return {
                            range: range,
                            text: text
                        };
                    }
                    InlineValueText.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
                    }
                    InlineValueText.is = is;
                })(InlineValueText || (InlineValueText = {}));
                /**
 * The InlineValueVariableLookup namespace provides functions to deal with InlineValueVariableLookups.
 *
 * @since 3.17.0
 */ var InlineValueVariableLookup;
                (function(InlineValueVariableLookup) {
                    /**
     * Creates a new InlineValueText literal.
     */ function create(range, variableName, caseSensitiveLookup) {
                        return {
                            range: range,
                            variableName: variableName,
                            caseSensitiveLookup: caseSensitiveLookup
                        };
                    }
                    InlineValueVariableLookup.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === undefined);
                    }
                    InlineValueVariableLookup.is = is;
                })(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
                /**
 * The InlineValueEvaluatableExpression namespace provides functions to deal with InlineValueEvaluatableExpression.
 *
 * @since 3.17.0
 */ var InlineValueEvaluatableExpression;
                (function(InlineValueEvaluatableExpression) {
                    /**
     * Creates a new InlineValueEvaluatableExpression literal.
     */ function create(range, expression) {
                        return {
                            range: range,
                            expression: expression
                        };
                    }
                    InlineValueEvaluatableExpression.create = create;
                    function is(value) {
                        var candidate = value;
                        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === undefined);
                    }
                    InlineValueEvaluatableExpression.is = is;
                })(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
                /**
 * The InlineValueContext namespace provides helper functions to work with
 * {@link InlineValueContext} literals.
 *
 * @since 3.17.0
 */ var InlineValueContext;
                (function(InlineValueContext) {
                    /**
     * Creates a new InlineValueContext literal.
     */ function create(frameId, stoppedLocation) {
                        return {
                            frameId: frameId,
                            stoppedLocation: stoppedLocation
                        };
                    }
                    InlineValueContext.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link InlineValueContext} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Range.is(value.stoppedLocation);
                    }
                    InlineValueContext.is = is;
                })(InlineValueContext || (InlineValueContext = {}));
                /**
 * Inlay hint kinds.
 *
 * @since 3.17.0
 */ var InlayHintKind;
                (function(InlayHintKind) {
                    /**
     * An inlay hint that for a type annotation.
     */ InlayHintKind.Type = 1;
                    /**
     * An inlay hint that is for a parameter.
     */ InlayHintKind.Parameter = 2;
                    function is(value) {
                        return value === 1 || value === 2;
                    }
                    InlayHintKind.is = is;
                })(InlayHintKind || (InlayHintKind = {}));
                var InlayHintLabelPart;
                (function(InlayHintLabelPart) {
                    function create(value) {
                        return {
                            value: value
                        };
                    }
                    InlayHintLabelPart.create = create;
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === undefined || Location.is(candidate.location)) && (candidate.command === undefined || Command.is(candidate.command));
                    }
                    InlayHintLabelPart.is = is;
                })(InlayHintLabelPart || (InlayHintLabelPart = {}));
                var InlayHint;
                (function(InlayHint) {
                    function create(position, label, kind) {
                        var result = {
                            position: position,
                            label: label
                        };
                        if (kind !== undefined) {
                            result.kind = kind;
                        }
                        return result;
                    }
                    InlayHint.create = create;
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === undefined || InlayHintKind.is(candidate.kind)) && candidate.textEdits === undefined || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === undefined || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === undefined || Is.boolean(candidate.paddingRight));
                    }
                    InlayHint.is = is;
                })(InlayHint || (InlayHint = {}));
                var WorkspaceFolder;
                (function(WorkspaceFolder) {
                    function is(value) {
                        var candidate = value;
                        return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
                    }
                    WorkspaceFolder.is = is;
                })(WorkspaceFolder || (WorkspaceFolder = {}));
                var EOL = [
                    '\n',
                    '\r\n',
                    '\r'
                ];
                /**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */ var TextDocument;
                (function(TextDocument) {
                    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId The document's language Id.
     * @param version The document's version.
     * @param content The document's content.
     */ function create(uri, languageId, version, content) {
                        return new FullTextDocument(uri, languageId, version, content);
                    }
                    TextDocument.create = create;
                    /**
     * Checks whether the given literal conforms to the {@link ITextDocument} interface.
     */ function is(value) {
                        var candidate = value;
                        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
                    }
                    TextDocument.is = is;
                    function applyEdits(document1, edits) {
                        var text = document1.getText();
                        var sortedEdits = mergeSort(edits, function(a, b) {
                            var diff = a.range.start.line - b.range.start.line;
                            if (diff === 0) {
                                return a.range.start.character - b.range.start.character;
                            }
                            return diff;
                        });
                        var lastModifiedOffset = text.length;
                        for(var i = sortedEdits.length - 1; i >= 0; i--){
                            var e = sortedEdits[i];
                            var startOffset = document1.offsetAt(e.range.start);
                            var endOffset = document1.offsetAt(e.range.end);
                            if (endOffset <= lastModifiedOffset) {
                                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
                            } else {
                                throw new Error('Overlapping edit');
                            }
                            lastModifiedOffset = startOffset;
                        }
                        return text;
                    }
                    TextDocument.applyEdits = applyEdits;
                    function mergeSort(data, compare) {
                        if (data.length <= 1) {
                            // sorted
                            return data;
                        }
                        var p = data.length / 2 | 0;
                        var left = data.slice(0, p);
                        var right = data.slice(p);
                        mergeSort(left, compare);
                        mergeSort(right, compare);
                        var leftIdx = 0;
                        var rightIdx = 0;
                        var i = 0;
                        while(leftIdx < left.length && rightIdx < right.length){
                            var ret = compare(left[leftIdx], right[rightIdx]);
                            if (ret <= 0) {
                                // smaller_equal -> take left to preserve order
                                data[i++] = left[leftIdx++];
                            } else {
                                // greater -> take right
                                data[i++] = right[rightIdx++];
                            }
                        }
                        while(leftIdx < left.length){
                            data[i++] = left[leftIdx++];
                        }
                        while(rightIdx < right.length){
                            data[i++] = right[rightIdx++];
                        }
                        return data;
                    }
                })(TextDocument || (TextDocument = {}));
                /**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */ var FullTextDocument = /** @class */ function() {
                    function FullTextDocument(uri, languageId, version, content) {
                        this._uri = uri;
                        this._languageId = languageId;
                        this._version = version;
                        this._content = content;
                        this._lineOffsets = undefined;
                    }
                    Object.defineProperty(FullTextDocument.prototype, "uri", {
                        get: function() {
                            return this._uri;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(FullTextDocument.prototype, "languageId", {
                        get: function() {
                            return this._languageId;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(FullTextDocument.prototype, "version", {
                        get: function() {
                            return this._version;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    FullTextDocument.prototype.getText = function(range) {
                        if (range) {
                            var start = this.offsetAt(range.start);
                            var end = this.offsetAt(range.end);
                            return this._content.substring(start, end);
                        }
                        return this._content;
                    };
                    FullTextDocument.prototype.update = function(event, version) {
                        this._content = event.text;
                        this._version = version;
                        this._lineOffsets = undefined;
                    };
                    FullTextDocument.prototype.getLineOffsets = function() {
                        if (this._lineOffsets === undefined) {
                            var lineOffsets = [];
                            var text = this._content;
                            var isLineStart = true;
                            for(var i = 0; i < text.length; i++){
                                if (isLineStart) {
                                    lineOffsets.push(i);
                                    isLineStart = false;
                                }
                                var ch = text.charAt(i);
                                isLineStart = ch === '\r' || ch === '\n';
                                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                                    i++;
                                }
                            }
                            if (isLineStart && text.length > 0) {
                                lineOffsets.push(text.length);
                            }
                            this._lineOffsets = lineOffsets;
                        }
                        return this._lineOffsets;
                    };
                    FullTextDocument.prototype.positionAt = function(offset) {
                        offset = Math.max(Math.min(offset, this._content.length), 0);
                        var lineOffsets = this.getLineOffsets();
                        var low = 0, high = lineOffsets.length;
                        if (high === 0) {
                            return Position.create(0, offset);
                        }
                        while(low < high){
                            var mid = Math.floor((low + high) / 2);
                            if (lineOffsets[mid] > offset) {
                                high = mid;
                            } else {
                                low = mid + 1;
                            }
                        }
                        // low is the least x for which the line offset is larger than the current offset
                        // or array.length if no line offset is larger than the current offset
                        var line = low - 1;
                        return Position.create(line, offset - lineOffsets[line]);
                    };
                    FullTextDocument.prototype.offsetAt = function(position) {
                        var lineOffsets = this.getLineOffsets();
                        if (position.line >= lineOffsets.length) {
                            return this._content.length;
                        } else if (position.line < 0) {
                            return 0;
                        }
                        var lineOffset = lineOffsets[position.line];
                        var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
                        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
                    };
                    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
                        get: function() {
                            return this.getLineOffsets().length;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    return FullTextDocument;
                }();
                var Is;
                (function(Is) {
                    var toString = Object.prototype.toString;
                    function defined(value) {
                        return typeof value !== 'undefined';
                    }
                    Is.defined = defined;
                    function undefined1(value) {
                        return typeof value === 'undefined';
                    }
                    Is.undefined = undefined1;
                    function boolean(value) {
                        return value === true || value === false;
                    }
                    Is.boolean = boolean;
                    function string(value) {
                        return toString.call(value) === '[object String]';
                    }
                    Is.string = string;
                    function number(value) {
                        return toString.call(value) === '[object Number]';
                    }
                    Is.number = number;
                    function numberRange(value, min, max) {
                        return toString.call(value) === '[object Number]' && min <= value && value <= max;
                    }
                    Is.numberRange = numberRange;
                    function integer(value) {
                        return toString.call(value) === '[object Number]' && -2147483648 <= value && value <= 2147483647;
                    }
                    Is.integer = integer;
                    function uinteger(value) {
                        return toString.call(value) === '[object Number]' && 0 <= value && value <= 2147483647;
                    }
                    Is.uinteger = uinteger;
                    function func(value) {
                        return toString.call(value) === '[object Function]';
                    }
                    Is.func = func;
                    function objectLiteral(value) {
                        // Strictly speaking class instances pass this check as well. Since the LSP
                        // doesn't use classes we ignore this for now. If we do we need to add something
                        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
                        return value !== null && typeof value === 'object';
                    }
                    Is.objectLiteral = objectLiteral;
                    function typedArray(value, check) {
                        return Array.isArray(value) && value.every(check);
                    }
                    Is.typedArray = typedArray;
                })(Is || (Is = {}));
            /***/ },
            /***/ 2032: /***/ function(__unused_webpack_module, exports1, __nested_webpack_require_696626__) {
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    var desc = Object.getOwnPropertyDescriptor(m, k);
                    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                        desc = {
                            enumerable: true,
                            get: function() {
                                return m[k];
                            }
                        };
                    }
                    Object.defineProperty(o, k2, desc);
                } : function(o, m, k, k2) {
                    if (k2 === undefined) k2 = k;
                    o[k2] = m[k];
                });
                var __exportStar = this && this.__exportStar || function(m, exports1) {
                    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
                };
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.createMessageConnection = exports1.BrowserMessageWriter = exports1.BrowserMessageReader = void 0;
                const ril_1 = __nested_webpack_require_696626__(2812);
                // Install the browser runtime abstract.
                ril_1.default.install();
                const api_1 = __nested_webpack_require_696626__(8223);
                __exportStar(__nested_webpack_require_696626__(8223), exports1);
                class BrowserMessageReader extends api_1.AbstractMessageReader {
                    listen(callback) {
                        return this._onData.event(callback);
                    }
                    constructor(context){
                        super();
                        this._onData = new api_1.Emitter();
                        this._messageListener = (event)=>{
                            this._onData.fire(event.data);
                        };
                        context.addEventListener('error', (event)=>this.fireError(event));
                        context.onmessage = this._messageListener;
                    }
                }
                exports1.BrowserMessageReader = BrowserMessageReader;
                class BrowserMessageWriter extends api_1.AbstractMessageWriter {
                    write(msg) {
                        try {
                            this.context.postMessage(msg);
                            return Promise.resolve();
                        } catch (error) {
                            this.handleError(error, msg);
                            return Promise.reject(error);
                        }
                    }
                    handleError(error, msg) {
                        this.errorCount++;
                        this.fireError(error, msg, this.errorCount);
                    }
                    end() {}
                    constructor(context){
                        super();
                        this.context = context;
                        this.errorCount = 0;
                        context.addEventListener('error', (event)=>this.fireError(event));
                    }
                }
                exports1.BrowserMessageWriter = BrowserMessageWriter;
                function createMessageConnection(reader, writer, logger, options) {
                    if (logger === undefined) {
                        logger = api_1.NullLogger;
                    }
                    if (api_1.ConnectionStrategy.is(options)) {
                        options = {
                            connectionStrategy: options
                        };
                    }
                    return (0, api_1.createMessageConnection)(reader, writer, logger, options);
                }
                exports1.createMessageConnection = createMessageConnection;
            //# sourceMappingURL=main.js.map
            /***/ },
            /***/ 2812: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_701110__)=>{
                "use strict";
                /* provided dependency */ var console = __nested_webpack_require_701110__(3716);
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                const ral_1 = __nested_webpack_require_701110__(5406);
                const disposable_1 = __nested_webpack_require_701110__(4250);
                const events_1 = __nested_webpack_require_701110__(7257);
                const messageBuffer_1 = __nested_webpack_require_701110__(5947);
                class MessageBuffer extends messageBuffer_1.AbstractMessageBuffer {
                    emptyBuffer() {
                        return MessageBuffer.emptyBuffer;
                    }
                    fromString(value, _encoding) {
                        return new TextEncoder().encode(value);
                    }
                    toString(value, encoding) {
                        if (encoding === 'ascii') {
                            return this.asciiDecoder.decode(value);
                        } else {
                            return new TextDecoder(encoding).decode(value);
                        }
                    }
                    asNative(buffer, length) {
                        if (length === undefined) {
                            return buffer;
                        } else {
                            return buffer.slice(0, length);
                        }
                    }
                    allocNative(length) {
                        return new Uint8Array(length);
                    }
                    constructor(encoding = 'utf-8'){
                        super(encoding);
                        this.asciiDecoder = new TextDecoder('ascii');
                    }
                }
                MessageBuffer.emptyBuffer = new Uint8Array(0);
                class ReadableStreamWrapper {
                    onClose(listener) {
                        this.socket.addEventListener('close', listener);
                        return disposable_1.Disposable.create(()=>this.socket.removeEventListener('close', listener));
                    }
                    onError(listener) {
                        this.socket.addEventListener('error', listener);
                        return disposable_1.Disposable.create(()=>this.socket.removeEventListener('error', listener));
                    }
                    onEnd(listener) {
                        this.socket.addEventListener('end', listener);
                        return disposable_1.Disposable.create(()=>this.socket.removeEventListener('end', listener));
                    }
                    onData(listener) {
                        return this._onData.event(listener);
                    }
                    constructor(socket){
                        this.socket = socket;
                        this._onData = new events_1.Emitter();
                        this._messageListener = (event)=>{
                            const blob = event.data;
                            blob.arrayBuffer().then((buffer)=>{
                                this._onData.fire(new Uint8Array(buffer));
                            }, ()=>{
                                (0, ral_1.default)().console.error(`Converting blob to array buffer failed.`);
                            });
                        };
                        this.socket.addEventListener('message', this._messageListener);
                    }
                }
                class WritableStreamWrapper {
                    onClose(listener) {
                        this.socket.addEventListener('close', listener);
                        return disposable_1.Disposable.create(()=>this.socket.removeEventListener('close', listener));
                    }
                    onError(listener) {
                        this.socket.addEventListener('error', listener);
                        return disposable_1.Disposable.create(()=>this.socket.removeEventListener('error', listener));
                    }
                    onEnd(listener) {
                        this.socket.addEventListener('end', listener);
                        return disposable_1.Disposable.create(()=>this.socket.removeEventListener('end', listener));
                    }
                    write(data, encoding) {
                        if (typeof data === 'string') {
                            if (encoding !== undefined && encoding !== 'utf-8') {
                                throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${encoding}`);
                            }
                            this.socket.send(data);
                        } else {
                            this.socket.send(data);
                        }
                        return Promise.resolve();
                    }
                    end() {
                        this.socket.close();
                    }
                    constructor(socket){
                        this.socket = socket;
                    }
                }
                const _textEncoder = new TextEncoder();
                const _ril = Object.freeze({
                    messageBuffer: Object.freeze({
                        create: (encoding)=>new MessageBuffer(encoding)
                    }),
                    applicationJson: Object.freeze({
                        encoder: Object.freeze({
                            name: 'application/json',
                            encode: (msg, options)=>{
                                if (options.charset !== 'utf-8') {
                                    throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${options.charset}`);
                                }
                                return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, undefined, 0)));
                            }
                        }),
                        decoder: Object.freeze({
                            name: 'application/json',
                            decode: (buffer, options)=>{
                                if (!(buffer instanceof Uint8Array)) {
                                    throw new Error(`In a Browser environments only Uint8Arrays are supported.`);
                                }
                                return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
                            }
                        })
                    }),
                    stream: Object.freeze({
                        asReadableStream: (socket)=>new ReadableStreamWrapper(socket),
                        asWritableStream: (socket)=>new WritableStreamWrapper(socket)
                    }),
                    console: console,
                    timer: Object.freeze({
                        setTimeout (callback, ms, ...args) {
                            const handle = setTimeout(callback, ms, ...args);
                            return {
                                dispose: ()=>clearTimeout(handle)
                            };
                        },
                        setImmediate (callback, ...args) {
                            const handle = setTimeout(callback, 0, ...args);
                            return {
                                dispose: ()=>clearTimeout(handle)
                            };
                        },
                        setInterval (callback, ms, ...args) {
                            const handle = setInterval(callback, ms, ...args);
                            return {
                                dispose: ()=>clearInterval(handle)
                            };
                        }
                    })
                });
                function RIL() {
                    return _ril;
                }
                (function(RIL) {
                    function install() {
                        ral_1.default.install(_ril);
                    }
                    RIL.install = install;
                })(RIL || (RIL = {}));
                exports1["default"] = RIL;
            //# sourceMappingURL=ril.js.map
            /***/ },
            /***/ 8223: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_709787__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ /// <reference path="../../typings/thenable.d.ts" />
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.TraceFormat = exports1.TraceValues = exports1.Trace = exports1.ProgressType = exports1.ProgressToken = exports1.createMessageConnection = exports1.NullLogger = exports1.ConnectionOptions = exports1.ConnectionStrategy = exports1.WriteableStreamMessageWriter = exports1.AbstractMessageWriter = exports1.MessageWriter = exports1.ReadableStreamMessageReader = exports1.AbstractMessageReader = exports1.MessageReader = exports1.CancellationToken = exports1.CancellationTokenSource = exports1.Emitter = exports1.Event = exports1.Disposable = exports1.LRUCache = exports1.Touch = exports1.LinkedMap = exports1.ParameterStructures = exports1.NotificationType9 = exports1.NotificationType8 = exports1.NotificationType7 = exports1.NotificationType6 = exports1.NotificationType5 = exports1.NotificationType4 = exports1.NotificationType3 = exports1.NotificationType2 = exports1.NotificationType1 = exports1.NotificationType0 = exports1.NotificationType = exports1.ErrorCodes = exports1.ResponseError = exports1.RequestType9 = exports1.RequestType8 = exports1.RequestType7 = exports1.RequestType6 = exports1.RequestType5 = exports1.RequestType4 = exports1.RequestType3 = exports1.RequestType2 = exports1.RequestType1 = exports1.RequestType0 = exports1.RequestType = exports1.Message = exports1.RAL = void 0;
                exports1.CancellationStrategy = exports1.CancellationSenderStrategy = exports1.CancellationReceiverStrategy = exports1.ConnectionError = exports1.ConnectionErrors = exports1.LogTraceNotification = exports1.SetTraceNotification = void 0;
                const messages_1 = __nested_webpack_require_709787__(5613);
                Object.defineProperty(exports1, "Message", {
                    enumerable: true,
                    get: function() {
                        return messages_1.Message;
                    }
                });
                Object.defineProperty(exports1, "RequestType", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType;
                    }
                });
                Object.defineProperty(exports1, "RequestType0", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType0;
                    }
                });
                Object.defineProperty(exports1, "RequestType1", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType1;
                    }
                });
                Object.defineProperty(exports1, "RequestType2", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType2;
                    }
                });
                Object.defineProperty(exports1, "RequestType3", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType3;
                    }
                });
                Object.defineProperty(exports1, "RequestType4", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType4;
                    }
                });
                Object.defineProperty(exports1, "RequestType5", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType5;
                    }
                });
                Object.defineProperty(exports1, "RequestType6", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType6;
                    }
                });
                Object.defineProperty(exports1, "RequestType7", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType7;
                    }
                });
                Object.defineProperty(exports1, "RequestType8", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType8;
                    }
                });
                Object.defineProperty(exports1, "RequestType9", {
                    enumerable: true,
                    get: function() {
                        return messages_1.RequestType9;
                    }
                });
                Object.defineProperty(exports1, "ResponseError", {
                    enumerable: true,
                    get: function() {
                        return messages_1.ResponseError;
                    }
                });
                Object.defineProperty(exports1, "ErrorCodes", {
                    enumerable: true,
                    get: function() {
                        return messages_1.ErrorCodes;
                    }
                });
                Object.defineProperty(exports1, "NotificationType", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType;
                    }
                });
                Object.defineProperty(exports1, "NotificationType0", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType0;
                    }
                });
                Object.defineProperty(exports1, "NotificationType1", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType1;
                    }
                });
                Object.defineProperty(exports1, "NotificationType2", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType2;
                    }
                });
                Object.defineProperty(exports1, "NotificationType3", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType3;
                    }
                });
                Object.defineProperty(exports1, "NotificationType4", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType4;
                    }
                });
                Object.defineProperty(exports1, "NotificationType5", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType5;
                    }
                });
                Object.defineProperty(exports1, "NotificationType6", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType6;
                    }
                });
                Object.defineProperty(exports1, "NotificationType7", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType7;
                    }
                });
                Object.defineProperty(exports1, "NotificationType8", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType8;
                    }
                });
                Object.defineProperty(exports1, "NotificationType9", {
                    enumerable: true,
                    get: function() {
                        return messages_1.NotificationType9;
                    }
                });
                Object.defineProperty(exports1, "ParameterStructures", {
                    enumerable: true,
                    get: function() {
                        return messages_1.ParameterStructures;
                    }
                });
                const linkedMap_1 = __nested_webpack_require_709787__(1414);
                Object.defineProperty(exports1, "LinkedMap", {
                    enumerable: true,
                    get: function() {
                        return linkedMap_1.LinkedMap;
                    }
                });
                Object.defineProperty(exports1, "LRUCache", {
                    enumerable: true,
                    get: function() {
                        return linkedMap_1.LRUCache;
                    }
                });
                Object.defineProperty(exports1, "Touch", {
                    enumerable: true,
                    get: function() {
                        return linkedMap_1.Touch;
                    }
                });
                const disposable_1 = __nested_webpack_require_709787__(4250);
                Object.defineProperty(exports1, "Disposable", {
                    enumerable: true,
                    get: function() {
                        return disposable_1.Disposable;
                    }
                });
                const events_1 = __nested_webpack_require_709787__(7257);
                Object.defineProperty(exports1, "Event", {
                    enumerable: true,
                    get: function() {
                        return events_1.Event;
                    }
                });
                Object.defineProperty(exports1, "Emitter", {
                    enumerable: true,
                    get: function() {
                        return events_1.Emitter;
                    }
                });
                const cancellation_1 = __nested_webpack_require_709787__(1072);
                Object.defineProperty(exports1, "CancellationTokenSource", {
                    enumerable: true,
                    get: function() {
                        return cancellation_1.CancellationTokenSource;
                    }
                });
                Object.defineProperty(exports1, "CancellationToken", {
                    enumerable: true,
                    get: function() {
                        return cancellation_1.CancellationToken;
                    }
                });
                const messageReader_1 = __nested_webpack_require_709787__(207);
                Object.defineProperty(exports1, "MessageReader", {
                    enumerable: true,
                    get: function() {
                        return messageReader_1.MessageReader;
                    }
                });
                Object.defineProperty(exports1, "AbstractMessageReader", {
                    enumerable: true,
                    get: function() {
                        return messageReader_1.AbstractMessageReader;
                    }
                });
                Object.defineProperty(exports1, "ReadableStreamMessageReader", {
                    enumerable: true,
                    get: function() {
                        return messageReader_1.ReadableStreamMessageReader;
                    }
                });
                const messageWriter_1 = __nested_webpack_require_709787__(6214);
                Object.defineProperty(exports1, "MessageWriter", {
                    enumerable: true,
                    get: function() {
                        return messageWriter_1.MessageWriter;
                    }
                });
                Object.defineProperty(exports1, "AbstractMessageWriter", {
                    enumerable: true,
                    get: function() {
                        return messageWriter_1.AbstractMessageWriter;
                    }
                });
                Object.defineProperty(exports1, "WriteableStreamMessageWriter", {
                    enumerable: true,
                    get: function() {
                        return messageWriter_1.WriteableStreamMessageWriter;
                    }
                });
                const connection_1 = __nested_webpack_require_709787__(7075);
                Object.defineProperty(exports1, "ConnectionStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionStrategy;
                    }
                });
                Object.defineProperty(exports1, "ConnectionOptions", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionOptions;
                    }
                });
                Object.defineProperty(exports1, "NullLogger", {
                    enumerable: true,
                    get: function() {
                        return connection_1.NullLogger;
                    }
                });
                Object.defineProperty(exports1, "createMessageConnection", {
                    enumerable: true,
                    get: function() {
                        return connection_1.createMessageConnection;
                    }
                });
                Object.defineProperty(exports1, "ProgressToken", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ProgressToken;
                    }
                });
                Object.defineProperty(exports1, "ProgressType", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ProgressType;
                    }
                });
                Object.defineProperty(exports1, "Trace", {
                    enumerable: true,
                    get: function() {
                        return connection_1.Trace;
                    }
                });
                Object.defineProperty(exports1, "TraceValues", {
                    enumerable: true,
                    get: function() {
                        return connection_1.TraceValues;
                    }
                });
                Object.defineProperty(exports1, "TraceFormat", {
                    enumerable: true,
                    get: function() {
                        return connection_1.TraceFormat;
                    }
                });
                Object.defineProperty(exports1, "SetTraceNotification", {
                    enumerable: true,
                    get: function() {
                        return connection_1.SetTraceNotification;
                    }
                });
                Object.defineProperty(exports1, "LogTraceNotification", {
                    enumerable: true,
                    get: function() {
                        return connection_1.LogTraceNotification;
                    }
                });
                Object.defineProperty(exports1, "ConnectionErrors", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionErrors;
                    }
                });
                Object.defineProperty(exports1, "ConnectionError", {
                    enumerable: true,
                    get: function() {
                        return connection_1.ConnectionError;
                    }
                });
                Object.defineProperty(exports1, "CancellationReceiverStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.CancellationReceiverStrategy;
                    }
                });
                Object.defineProperty(exports1, "CancellationSenderStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.CancellationSenderStrategy;
                    }
                });
                Object.defineProperty(exports1, "CancellationStrategy", {
                    enumerable: true,
                    get: function() {
                        return connection_1.CancellationStrategy;
                    }
                });
                const ral_1 = __nested_webpack_require_709787__(5406);
                exports1.RAL = ral_1.default;
            //# sourceMappingURL=api.js.map
            /***/ },
            /***/ 1072: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_726538__)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.CancellationTokenSource = exports1.CancellationToken = void 0;
                const ral_1 = __nested_webpack_require_726538__(5406);
                const Is = __nested_webpack_require_726538__(1278);
                const events_1 = __nested_webpack_require_726538__(7257);
                var CancellationToken;
                (function(CancellationToken) {
                    CancellationToken.None = Object.freeze({
                        isCancellationRequested: false,
                        onCancellationRequested: events_1.Event.None
                    });
                    CancellationToken.Cancelled = Object.freeze({
                        isCancellationRequested: true,
                        onCancellationRequested: events_1.Event.None
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && (candidate === CancellationToken.None || candidate === CancellationToken.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
                    }
                    CancellationToken.is = is;
                })(CancellationToken = exports1.CancellationToken || (exports1.CancellationToken = {}));
                const shortcutEvent = Object.freeze(function(callback, context) {
                    const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
                    return {
                        dispose () {
                            handle.dispose();
                        }
                    };
                });
                class MutableToken {
                    cancel() {
                        if (!this._isCancelled) {
                            this._isCancelled = true;
                            if (this._emitter) {
                                this._emitter.fire(undefined);
                                this.dispose();
                            }
                        }
                    }
                    get isCancellationRequested() {
                        return this._isCancelled;
                    }
                    get onCancellationRequested() {
                        if (this._isCancelled) {
                            return shortcutEvent;
                        }
                        if (!this._emitter) {
                            this._emitter = new events_1.Emitter();
                        }
                        return this._emitter.event;
                    }
                    dispose() {
                        if (this._emitter) {
                            this._emitter.dispose();
                            this._emitter = undefined;
                        }
                    }
                    constructor(){
                        this._isCancelled = false;
                    }
                }
                class CancellationTokenSource {
                    get token() {
                        if (!this._token) {
                            // be lazy and create the token only when
                            // actually needed
                            this._token = new MutableToken();
                        }
                        return this._token;
                    }
                    cancel() {
                        if (!this._token) {
                            // save an object by returning the default
                            // cancelled token when cancellation happens
                            // before someone asks for the token
                            this._token = CancellationToken.Cancelled;
                        } else {
                            this._token.cancel();
                        }
                    }
                    dispose() {
                        if (!this._token) {
                            // ensure to initialize with an empty token if we had none
                            this._token = CancellationToken.None;
                        } else if (this._token instanceof MutableToken) {
                            // actually dispose
                            this._token.dispose();
                        }
                    }
                }
                exports1.CancellationTokenSource = CancellationTokenSource;
            //# sourceMappingURL=cancellation.js.map
            /***/ },
            /***/ 7075: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_731525__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.createMessageConnection = exports1.ConnectionOptions = exports1.CancellationStrategy = exports1.CancellationSenderStrategy = exports1.CancellationReceiverStrategy = exports1.ConnectionStrategy = exports1.ConnectionError = exports1.ConnectionErrors = exports1.LogTraceNotification = exports1.SetTraceNotification = exports1.TraceFormat = exports1.TraceValues = exports1.Trace = exports1.NullLogger = exports1.ProgressType = exports1.ProgressToken = void 0;
                const ral_1 = __nested_webpack_require_731525__(5406);
                const Is = __nested_webpack_require_731525__(1278);
                const messages_1 = __nested_webpack_require_731525__(5613);
                const linkedMap_1 = __nested_webpack_require_731525__(1414);
                const events_1 = __nested_webpack_require_731525__(7257);
                const cancellation_1 = __nested_webpack_require_731525__(1072);
                var CancelNotification;
                (function(CancelNotification) {
                    CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
                })(CancelNotification || (CancelNotification = {}));
                var ProgressToken;
                (function(ProgressToken) {
                    function is(value) {
                        return typeof value === 'string' || typeof value === 'number';
                    }
                    ProgressToken.is = is;
                })(ProgressToken = exports1.ProgressToken || (exports1.ProgressToken = {}));
                var ProgressNotification;
                (function(ProgressNotification) {
                    ProgressNotification.type = new messages_1.NotificationType('$/progress');
                })(ProgressNotification || (ProgressNotification = {}));
                class ProgressType {
                    constructor(){}
                }
                exports1.ProgressType = ProgressType;
                var StarRequestHandler;
                (function(StarRequestHandler) {
                    function is(value) {
                        return Is.func(value);
                    }
                    StarRequestHandler.is = is;
                })(StarRequestHandler || (StarRequestHandler = {}));
                exports1.NullLogger = Object.freeze({
                    error: ()=>{},
                    warn: ()=>{},
                    info: ()=>{},
                    log: ()=>{}
                });
                var Trace;
                (function(Trace) {
                    Trace[Trace["Off"] = 0] = "Off";
                    Trace[Trace["Messages"] = 1] = "Messages";
                    Trace[Trace["Compact"] = 2] = "Compact";
                    Trace[Trace["Verbose"] = 3] = "Verbose";
                })(Trace = exports1.Trace || (exports1.Trace = {}));
                var TraceValues;
                (function(TraceValues) {
                    /**
     * Turn tracing off.
     */ TraceValues.Off = 'off';
                    /**
     * Trace messages only.
     */ TraceValues.Messages = 'messages';
                    /**
     * Compact message tracing.
     */ TraceValues.Compact = 'compact';
                    /**
     * Verbose message tracing.
     */ TraceValues.Verbose = 'verbose';
                })(TraceValues = exports1.TraceValues || (exports1.TraceValues = {}));
                (function(Trace) {
                    function fromString(value) {
                        if (!Is.string(value)) {
                            return Trace.Off;
                        }
                        value = value.toLowerCase();
                        switch(value){
                            case 'off':
                                return Trace.Off;
                            case 'messages':
                                return Trace.Messages;
                            case 'compact':
                                return Trace.Compact;
                            case 'verbose':
                                return Trace.Verbose;
                            default:
                                return Trace.Off;
                        }
                    }
                    Trace.fromString = fromString;
                    function toString(value) {
                        switch(value){
                            case Trace.Off:
                                return 'off';
                            case Trace.Messages:
                                return 'messages';
                            case Trace.Compact:
                                return 'compact';
                            case Trace.Verbose:
                                return 'verbose';
                            default:
                                return 'off';
                        }
                    }
                    Trace.toString = toString;
                })(Trace = exports1.Trace || (exports1.Trace = {}));
                var TraceFormat;
                (function(TraceFormat) {
                    TraceFormat["Text"] = "text";
                    TraceFormat["JSON"] = "json";
                })(TraceFormat = exports1.TraceFormat || (exports1.TraceFormat = {}));
                (function(TraceFormat) {
                    function fromString(value) {
                        if (!Is.string(value)) {
                            return TraceFormat.Text;
                        }
                        value = value.toLowerCase();
                        if (value === 'json') {
                            return TraceFormat.JSON;
                        } else {
                            return TraceFormat.Text;
                        }
                    }
                    TraceFormat.fromString = fromString;
                })(TraceFormat = exports1.TraceFormat || (exports1.TraceFormat = {}));
                var SetTraceNotification;
                (function(SetTraceNotification) {
                    SetTraceNotification.type = new messages_1.NotificationType('$/setTrace');
                })(SetTraceNotification = exports1.SetTraceNotification || (exports1.SetTraceNotification = {}));
                var LogTraceNotification;
                (function(LogTraceNotification) {
                    LogTraceNotification.type = new messages_1.NotificationType('$/logTrace');
                })(LogTraceNotification = exports1.LogTraceNotification || (exports1.LogTraceNotification = {}));
                var ConnectionErrors;
                (function(ConnectionErrors) {
                    /**
     * The connection is closed.
     */ ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
                    /**
     * The connection got disposed.
     */ ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
                    /**
     * The connection is already in listening mode.
     */ ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
                })(ConnectionErrors = exports1.ConnectionErrors || (exports1.ConnectionErrors = {}));
                class ConnectionError extends Error {
                    constructor(code, message){
                        super(message);
                        this.code = code;
                        Object.setPrototypeOf(this, ConnectionError.prototype);
                    }
                }
                exports1.ConnectionError = ConnectionError;
                var ConnectionStrategy;
                (function(ConnectionStrategy) {
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.func(candidate.cancelUndispatched);
                    }
                    ConnectionStrategy.is = is;
                })(ConnectionStrategy = exports1.ConnectionStrategy || (exports1.ConnectionStrategy = {}));
                var CancellationReceiverStrategy;
                (function(CancellationReceiverStrategy) {
                    CancellationReceiverStrategy.Message = Object.freeze({
                        createCancellationTokenSource (_) {
                            return new cancellation_1.CancellationTokenSource();
                        }
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.func(candidate.createCancellationTokenSource);
                    }
                    CancellationReceiverStrategy.is = is;
                })(CancellationReceiverStrategy = exports1.CancellationReceiverStrategy || (exports1.CancellationReceiverStrategy = {}));
                var CancellationSenderStrategy;
                (function(CancellationSenderStrategy) {
                    CancellationSenderStrategy.Message = Object.freeze({
                        sendCancellation (conn, id) {
                            return conn.sendNotification(CancelNotification.type, {
                                id
                            });
                        },
                        cleanup (_) {}
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
                    }
                    CancellationSenderStrategy.is = is;
                })(CancellationSenderStrategy = exports1.CancellationSenderStrategy || (exports1.CancellationSenderStrategy = {}));
                var CancellationStrategy;
                (function(CancellationStrategy) {
                    CancellationStrategy.Message = Object.freeze({
                        receiver: CancellationReceiverStrategy.Message,
                        sender: CancellationSenderStrategy.Message
                    });
                    function is(value) {
                        const candidate = value;
                        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
                    }
                    CancellationStrategy.is = is;
                })(CancellationStrategy = exports1.CancellationStrategy || (exports1.CancellationStrategy = {}));
                var ConnectionOptions;
                (function(ConnectionOptions) {
                    function is(value) {
                        const candidate = value;
                        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy));
                    }
                    ConnectionOptions.is = is;
                })(ConnectionOptions = exports1.ConnectionOptions || (exports1.ConnectionOptions = {}));
                var ConnectionState;
                (function(ConnectionState) {
                    ConnectionState[ConnectionState["New"] = 1] = "New";
                    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
                    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
                    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
                })(ConnectionState || (ConnectionState = {}));
                function createMessageConnection(messageReader, messageWriter, _logger, options) {
                    const logger = _logger !== undefined ? _logger : exports1.NullLogger;
                    let sequenceNumber = 0;
                    let notificationSequenceNumber = 0;
                    let unknownResponseSequenceNumber = 0;
                    const version = '2.0';
                    let starRequestHandler = undefined;
                    const requestHandlers = new Map();
                    let starNotificationHandler = undefined;
                    const notificationHandlers = new Map();
                    const progressHandlers = new Map();
                    let timer;
                    let messageQueue = new linkedMap_1.LinkedMap();
                    let responsePromises = new Map();
                    let knownCanceledRequests = new Set();
                    let requestTokens = new Map();
                    let trace = Trace.Off;
                    let traceFormat = TraceFormat.Text;
                    let tracer;
                    let state = ConnectionState.New;
                    const errorEmitter = new events_1.Emitter();
                    const closeEmitter = new events_1.Emitter();
                    const unhandledNotificationEmitter = new events_1.Emitter();
                    const unhandledProgressEmitter = new events_1.Emitter();
                    const disposeEmitter = new events_1.Emitter();
                    const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
                    function createRequestQueueKey(id) {
                        if (id === null) {
                            throw new Error(`Can't send requests with id null since the response can't be correlated.`);
                        }
                        return 'req-' + id.toString();
                    }
                    function createResponseQueueKey(id) {
                        if (id === null) {
                            return 'res-unknown-' + (++unknownResponseSequenceNumber).toString();
                        } else {
                            return 'res-' + id.toString();
                        }
                    }
                    function createNotificationQueueKey() {
                        return 'not-' + (++notificationSequenceNumber).toString();
                    }
                    function addMessageToQueue(queue, message) {
                        if (messages_1.Message.isRequest(message)) {
                            queue.set(createRequestQueueKey(message.id), message);
                        } else if (messages_1.Message.isResponse(message)) {
                            queue.set(createResponseQueueKey(message.id), message);
                        } else {
                            queue.set(createNotificationQueueKey(), message);
                        }
                    }
                    function cancelUndispatched(_message) {
                        return undefined;
                    }
                    function isListening() {
                        return state === ConnectionState.Listening;
                    }
                    function isClosed() {
                        return state === ConnectionState.Closed;
                    }
                    function isDisposed() {
                        return state === ConnectionState.Disposed;
                    }
                    function closeHandler() {
                        if (state === ConnectionState.New || state === ConnectionState.Listening) {
                            state = ConnectionState.Closed;
                            closeEmitter.fire(undefined);
                        }
                    // If the connection is disposed don't sent close events.
                    }
                    function readErrorHandler(error) {
                        errorEmitter.fire([
                            error,
                            undefined,
                            undefined
                        ]);
                    }
                    function writeErrorHandler(data) {
                        errorEmitter.fire(data);
                    }
                    messageReader.onClose(closeHandler);
                    messageReader.onError(readErrorHandler);
                    messageWriter.onClose(closeHandler);
                    messageWriter.onError(writeErrorHandler);
                    function triggerMessageQueue() {
                        if (timer || messageQueue.size === 0) {
                            return;
                        }
                        timer = (0, ral_1.default)().timer.setImmediate(()=>{
                            timer = undefined;
                            processMessageQueue();
                        });
                    }
                    function processMessageQueue() {
                        if (messageQueue.size === 0) {
                            return;
                        }
                        const message = messageQueue.shift();
                        try {
                            if (messages_1.Message.isRequest(message)) {
                                handleRequest(message);
                            } else if (messages_1.Message.isNotification(message)) {
                                handleNotification(message);
                            } else if (messages_1.Message.isResponse(message)) {
                                handleResponse(message);
                            } else {
                                handleInvalidMessage(message);
                            }
                        } finally{
                            triggerMessageQueue();
                        }
                    }
                    const callback = (message)=>{
                        try {
                            // We have received a cancellation message. Check if the message is still in the queue
                            // and cancel it if allowed to do so.
                            if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
                                const cancelId = message.params.id;
                                const key = createRequestQueueKey(cancelId);
                                const toCancel = messageQueue.get(key);
                                if (messages_1.Message.isRequest(toCancel)) {
                                    var _options;
                                    const strategy = (_options = options) === null || _options === void 0 ? void 0 : _options.connectionStrategy;
                                    const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                                    if (response && (response.error !== undefined || response.result !== undefined)) {
                                        messageQueue.delete(key);
                                        requestTokens.delete(cancelId);
                                        response.id = toCancel.id;
                                        traceSendingResponse(response, message.method, Date.now());
                                        messageWriter.write(response).catch(()=>logger.error(`Sending response for canceled message failed.`));
                                        return;
                                    }
                                }
                                const cancellationToken = requestTokens.get(cancelId);
                                // The request is already running. Cancel the token
                                if (cancellationToken !== undefined) {
                                    cancellationToken.cancel();
                                    traceReceivedNotification(message);
                                    return;
                                } else {
                                    // Remember the cancel but still queue the message to
                                    // clean up state in process message.
                                    knownCanceledRequests.add(cancelId);
                                }
                            }
                            addMessageToQueue(messageQueue, message);
                        } finally{
                            triggerMessageQueue();
                        }
                    };
                    function handleRequest(requestMessage) {
                        if (isDisposed()) {
                            // we return here silently since we fired an event when the
                            // connection got disposed.
                            return;
                        }
                        function reply(resultOrError, method, startTime) {
                            const message = {
                                jsonrpc: version,
                                id: requestMessage.id
                            };
                            if (resultOrError instanceof messages_1.ResponseError) {
                                message.error = resultOrError.toJson();
                            } else {
                                message.result = resultOrError === undefined ? null : resultOrError;
                            }
                            traceSendingResponse(message, method, startTime);
                            messageWriter.write(message).catch(()=>logger.error(`Sending response failed.`));
                        }
                        function replyError(error, method, startTime) {
                            const message = {
                                jsonrpc: version,
                                id: requestMessage.id,
                                error: error.toJson()
                            };
                            traceSendingResponse(message, method, startTime);
                            messageWriter.write(message).catch(()=>logger.error(`Sending response failed.`));
                        }
                        function replySuccess(result, method, startTime) {
                            // The JSON RPC defines that a response must either have a result or an error
                            // So we can't treat undefined as a valid response result.
                            if (result === undefined) {
                                result = null;
                            }
                            const message = {
                                jsonrpc: version,
                                id: requestMessage.id,
                                result: result
                            };
                            traceSendingResponse(message, method, startTime);
                            messageWriter.write(message).catch(()=>logger.error(`Sending response failed.`));
                        }
                        traceReceivedRequest(requestMessage);
                        const element = requestHandlers.get(requestMessage.method);
                        let type;
                        let requestHandler;
                        if (element) {
                            type = element.type;
                            requestHandler = element.handler;
                        }
                        const startTime = Date.now();
                        if (requestHandler || starRequestHandler) {
                            var _requestMessage_id;
                            const tokenKey = (_requestMessage_id = requestMessage.id) !== null && _requestMessage_id !== void 0 ? _requestMessage_id : String(Date.now()); //
                            const cancellationSource = cancellationStrategy.receiver.createCancellationTokenSource(tokenKey);
                            if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
                                cancellationSource.cancel();
                            }
                            if (requestMessage.id !== null) {
                                requestTokens.set(tokenKey, cancellationSource);
                            }
                            try {
                                let handlerResult;
                                if (requestHandler) {
                                    if (requestMessage.params === undefined) {
                                        if (type !== undefined && type.numberOfParams !== 0) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                                            return;
                                        }
                                        handlerResult = requestHandler(cancellationSource.token);
                                    } else if (Array.isArray(requestMessage.params)) {
                                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byName) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                                            return;
                                        }
                                        handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
                                    } else {
                                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                                            return;
                                        }
                                        handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
                                    }
                                } else if (starRequestHandler) {
                                    handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                                }
                                const promise = handlerResult;
                                if (!handlerResult) {
                                    requestTokens.delete(tokenKey);
                                    replySuccess(handlerResult, requestMessage.method, startTime);
                                } else if (promise.then) {
                                    promise.then((resultOrError)=>{
                                        requestTokens.delete(tokenKey);
                                        reply(resultOrError, requestMessage.method, startTime);
                                    }, (error)=>{
                                        requestTokens.delete(tokenKey);
                                        if (error instanceof messages_1.ResponseError) {
                                            replyError(error, requestMessage.method, startTime);
                                        } else if (error && Is.string(error.message)) {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                                        } else {
                                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                                        }
                                    });
                                } else {
                                    requestTokens.delete(tokenKey);
                                    reply(handlerResult, requestMessage.method, startTime);
                                }
                            } catch (error) {
                                requestTokens.delete(tokenKey);
                                if (error instanceof messages_1.ResponseError) {
                                    reply(error, requestMessage.method, startTime);
                                } else if (error && Is.string(error.message)) {
                                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                                } else {
                                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                                }
                            }
                        } else {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
                        }
                    }
                    function handleResponse(responseMessage) {
                        if (isDisposed()) {
                            // See handle request.
                            return;
                        }
                        if (responseMessage.id === null) {
                            if (responseMessage.error) {
                                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
                            } else {
                                logger.error(`Received response message without id. No further error information provided.`);
                            }
                        } else {
                            const key = responseMessage.id;
                            const responsePromise = responsePromises.get(key);
                            traceReceivedResponse(responseMessage, responsePromise);
                            if (responsePromise !== undefined) {
                                responsePromises.delete(key);
                                try {
                                    if (responseMessage.error) {
                                        const error = responseMessage.error;
                                        responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                                    } else if (responseMessage.result !== undefined) {
                                        responsePromise.resolve(responseMessage.result);
                                    } else {
                                        throw new Error('Should never happen.');
                                    }
                                } catch (error) {
                                    if (error.message) {
                                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                                    } else {
                                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                                    }
                                }
                            }
                        }
                    }
                    function handleNotification(message) {
                        if (isDisposed()) {
                            // See handle request.
                            return;
                        }
                        let type = undefined;
                        let notificationHandler;
                        if (message.method === CancelNotification.type.method) {
                            const cancelId = message.params.id;
                            knownCanceledRequests.delete(cancelId);
                            traceReceivedNotification(message);
                            return;
                        } else {
                            const element = notificationHandlers.get(message.method);
                            if (element) {
                                notificationHandler = element.handler;
                                type = element.type;
                            }
                        }
                        if (notificationHandler || starNotificationHandler) {
                            try {
                                traceReceivedNotification(message);
                                if (notificationHandler) {
                                    if (message.params === undefined) {
                                        if (type !== undefined) {
                                            if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                                                logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                                            }
                                        }
                                        notificationHandler();
                                    } else if (Array.isArray(message.params)) {
                                        // There are JSON-RPC libraries that send progress message as positional params although
                                        // specified as named. So convert them if this is the case.
                                        const params = message.params;
                                        if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                                            notificationHandler({
                                                token: params[0],
                                                value: params[1]
                                            });
                                        } else {
                                            if (type !== undefined) {
                                                if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                                                    logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                                                }
                                                if (type.numberOfParams !== message.params.length) {
                                                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                                                }
                                            }
                                            notificationHandler(...params);
                                        }
                                    } else {
                                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                                            logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                                        }
                                        notificationHandler(message.params);
                                    }
                                } else if (starNotificationHandler) {
                                    starNotificationHandler(message.method, message.params);
                                }
                            } catch (error) {
                                if (error.message) {
                                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                                } else {
                                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                                }
                            }
                        } else {
                            unhandledNotificationEmitter.fire(message);
                        }
                    }
                    function handleInvalidMessage(message) {
                        if (!message) {
                            logger.error('Received empty message.');
                            return;
                        }
                        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
                        // Test whether we find an id to reject the promise
                        const responseMessage = message;
                        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
                            const key = responseMessage.id;
                            const responseHandler = responsePromises.get(key);
                            if (responseHandler) {
                                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
                            }
                        }
                    }
                    function stringifyTrace(params) {
                        if (params === undefined || params === null) {
                            return undefined;
                        }
                        switch(trace){
                            case Trace.Verbose:
                                return JSON.stringify(params, null, 4);
                            case Trace.Compact:
                                return JSON.stringify(params);
                            default:
                                return undefined;
                        }
                    }
                    function traceSendingRequest(message) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                                data = `Params: ${stringifyTrace(message.params)}\n\n`;
                            }
                            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
                        } else {
                            logLSPMessage('send-request', message);
                        }
                    }
                    function traceSendingNotification(message) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.params) {
                                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                                } else {
                                    data = 'No parameters provided.\n\n';
                                }
                            }
                            tracer.log(`Sending notification '${message.method}'.`, data);
                        } else {
                            logLSPMessage('send-notification', message);
                        }
                    }
                    function traceSendingResponse(message, method, startTime) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.error && message.error.data) {
                                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                                } else {
                                    if (message.result) {
                                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                                    } else if (message.error === undefined) {
                                        data = 'No result returned.\n\n';
                                    }
                                }
                            }
                            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
                        } else {
                            logLSPMessage('send-response', message);
                        }
                    }
                    function traceReceivedRequest(message) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                                data = `Params: ${stringifyTrace(message.params)}\n\n`;
                            }
                            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
                        } else {
                            logLSPMessage('receive-request', message);
                        }
                    }
                    function traceReceivedNotification(message) {
                        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.params) {
                                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                                } else {
                                    data = 'No parameters provided.\n\n';
                                }
                            }
                            tracer.log(`Received notification '${message.method}'.`, data);
                        } else {
                            logLSPMessage('receive-notification', message);
                        }
                    }
                    function traceReceivedResponse(message, responsePromise) {
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        if (traceFormat === TraceFormat.Text) {
                            let data = undefined;
                            if (trace === Trace.Verbose || trace === Trace.Compact) {
                                if (message.error && message.error.data) {
                                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                                } else {
                                    if (message.result) {
                                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                                    } else if (message.error === undefined) {
                                        data = 'No result returned.\n\n';
                                    }
                                }
                            }
                            if (responsePromise) {
                                const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
                            } else {
                                tracer.log(`Received response ${message.id} without active response promise.`, data);
                            }
                        } else {
                            logLSPMessage('receive-response', message);
                        }
                    }
                    function logLSPMessage(type, message) {
                        if (!tracer || trace === Trace.Off) {
                            return;
                        }
                        const lspMessage = {
                            isLSPMessage: true,
                            type,
                            message,
                            timestamp: Date.now()
                        };
                        tracer.log(lspMessage);
                    }
                    function throwIfClosedOrDisposed() {
                        if (isClosed()) {
                            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
                        }
                        if (isDisposed()) {
                            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
                        }
                    }
                    function throwIfListening() {
                        if (isListening()) {
                            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
                        }
                    }
                    function throwIfNotListening() {
                        if (!isListening()) {
                            throw new Error('Call listen() first.');
                        }
                    }
                    function undefinedToNull(param) {
                        if (param === undefined) {
                            return null;
                        } else {
                            return param;
                        }
                    }
                    function nullToUndefined(param) {
                        if (param === null) {
                            return undefined;
                        } else {
                            return param;
                        }
                    }
                    function isNamedParam(param) {
                        return param !== undefined && param !== null && !Array.isArray(param) && typeof param === 'object';
                    }
                    function computeSingleParam(parameterStructures, param) {
                        switch(parameterStructures){
                            case messages_1.ParameterStructures.auto:
                                if (isNamedParam(param)) {
                                    return nullToUndefined(param);
                                } else {
                                    return [
                                        undefinedToNull(param)
                                    ];
                                }
                            case messages_1.ParameterStructures.byName:
                                if (!isNamedParam(param)) {
                                    throw new Error(`Received parameters by name but param is not an object literal.`);
                                }
                                return nullToUndefined(param);
                            case messages_1.ParameterStructures.byPosition:
                                return [
                                    undefinedToNull(param)
                                ];
                            default:
                                throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
                        }
                    }
                    function computeMessageParams(type, params) {
                        let result;
                        const numberOfParams = type.numberOfParams;
                        switch(numberOfParams){
                            case 0:
                                result = undefined;
                                break;
                            case 1:
                                result = computeSingleParam(type.parameterStructures, params[0]);
                                break;
                            default:
                                result = [];
                                for(let i = 0; i < params.length && i < numberOfParams; i++){
                                    result.push(undefinedToNull(params[i]));
                                }
                                if (params.length < numberOfParams) {
                                    for(let i = params.length; i < numberOfParams; i++){
                                        result.push(null);
                                    }
                                }
                                break;
                        }
                        return result;
                    }
                    const connection = {
                        sendNotification: (type, ...args)=>{
                            throwIfClosedOrDisposed();
                            let method;
                            let messageParams;
                            if (Is.string(type)) {
                                method = type;
                                const first = args[0];
                                let paramStart = 0;
                                let parameterStructures = messages_1.ParameterStructures.auto;
                                if (messages_1.ParameterStructures.is(first)) {
                                    paramStart = 1;
                                    parameterStructures = first;
                                }
                                let paramEnd = args.length;
                                const numberOfParams = paramEnd - paramStart;
                                switch(numberOfParams){
                                    case 0:
                                        messageParams = undefined;
                                        break;
                                    case 1:
                                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                                        break;
                                    default:
                                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                                        }
                                        messageParams = args.slice(paramStart, paramEnd).map((value)=>undefinedToNull(value));
                                        break;
                                }
                            } else {
                                const params = args;
                                method = type.method;
                                messageParams = computeMessageParams(type, params);
                            }
                            const notificationMessage = {
                                jsonrpc: version,
                                method: method,
                                params: messageParams
                            };
                            traceSendingNotification(notificationMessage);
                            return messageWriter.write(notificationMessage).catch(()=>logger.error(`Sending notification failed.`));
                        },
                        onNotification: (type, handler)=>{
                            throwIfClosedOrDisposed();
                            let method;
                            if (Is.func(type)) {
                                starNotificationHandler = type;
                            } else if (handler) {
                                if (Is.string(type)) {
                                    method = type;
                                    notificationHandlers.set(type, {
                                        type: undefined,
                                        handler
                                    });
                                } else {
                                    method = type.method;
                                    notificationHandlers.set(type.method, {
                                        type,
                                        handler
                                    });
                                }
                            }
                            return {
                                dispose: ()=>{
                                    if (method !== undefined) {
                                        notificationHandlers.delete(method);
                                    } else {
                                        starNotificationHandler = undefined;
                                    }
                                }
                            };
                        },
                        onProgress: (_type, token, handler)=>{
                            if (progressHandlers.has(token)) {
                                throw new Error(`Progress handler for token ${token} already registered`);
                            }
                            progressHandlers.set(token, handler);
                            return {
                                dispose: ()=>{
                                    progressHandlers.delete(token);
                                }
                            };
                        },
                        sendProgress: (_type, token, value)=>{
                            return connection.sendNotification(ProgressNotification.type, {
                                token,
                                value
                            });
                        },
                        onUnhandledProgress: unhandledProgressEmitter.event,
                        sendRequest: (type, ...args)=>{
                            throwIfClosedOrDisposed();
                            throwIfNotListening();
                            let method;
                            let messageParams;
                            let token = undefined;
                            if (Is.string(type)) {
                                method = type;
                                const first = args[0];
                                const last = args[args.length - 1];
                                let paramStart = 0;
                                let parameterStructures = messages_1.ParameterStructures.auto;
                                if (messages_1.ParameterStructures.is(first)) {
                                    paramStart = 1;
                                    parameterStructures = first;
                                }
                                let paramEnd = args.length;
                                if (cancellation_1.CancellationToken.is(last)) {
                                    paramEnd = paramEnd - 1;
                                    token = last;
                                }
                                const numberOfParams = paramEnd - paramStart;
                                switch(numberOfParams){
                                    case 0:
                                        messageParams = undefined;
                                        break;
                                    case 1:
                                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                                        break;
                                    default:
                                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                                        }
                                        messageParams = args.slice(paramStart, paramEnd).map((value)=>undefinedToNull(value));
                                        break;
                                }
                            } else {
                                const params = args;
                                method = type.method;
                                messageParams = computeMessageParams(type, params);
                                const numberOfParams = type.numberOfParams;
                                token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
                            }
                            const id = sequenceNumber++;
                            let disposable;
                            if (token) {
                                disposable = token.onCancellationRequested(()=>{
                                    const p = cancellationStrategy.sender.sendCancellation(connection, id);
                                    if (p === undefined) {
                                        logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                                        return Promise.resolve();
                                    } else {
                                        return p.catch(()=>{
                                            logger.log(`Sending cancellation messages for id ${id} failed`);
                                        });
                                    }
                                });
                            }
                            const result = new Promise((resolve, reject)=>{
                                const requestMessage = {
                                    jsonrpc: version,
                                    id: id,
                                    method: method,
                                    params: messageParams
                                };
                                const resolveWithCleanup = (r)=>{
                                    var _disposable;
                                    resolve(r);
                                    cancellationStrategy.sender.cleanup(id);
                                    (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable.dispose();
                                };
                                const rejectWithCleanup = (r)=>{
                                    var _disposable;
                                    reject(r);
                                    cancellationStrategy.sender.cleanup(id);
                                    (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable.dispose();
                                };
                                let responsePromise = {
                                    method: method,
                                    timerStart: Date.now(),
                                    resolve: resolveWithCleanup,
                                    reject: rejectWithCleanup
                                };
                                traceSendingRequest(requestMessage);
                                try {
                                    messageWriter.write(requestMessage).catch(()=>logger.error(`Sending request failed.`));
                                } catch (e) {
                                    // Writing the message failed. So we need to reject the promise.
                                    responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : 'Unknown reason'));
                                    responsePromise = null;
                                }
                                if (responsePromise) {
                                    responsePromises.set(id, responsePromise);
                                }
                            });
                            return result;
                        },
                        onRequest: (type, handler)=>{
                            throwIfClosedOrDisposed();
                            let method = null;
                            if (StarRequestHandler.is(type)) {
                                method = undefined;
                                starRequestHandler = type;
                            } else if (Is.string(type)) {
                                method = null;
                                if (handler !== undefined) {
                                    method = type;
                                    requestHandlers.set(type, {
                                        handler: handler,
                                        type: undefined
                                    });
                                }
                            } else {
                                if (handler !== undefined) {
                                    method = type.method;
                                    requestHandlers.set(type.method, {
                                        type,
                                        handler
                                    });
                                }
                            }
                            return {
                                dispose: ()=>{
                                    if (method === null) {
                                        return;
                                    }
                                    if (method !== undefined) {
                                        requestHandlers.delete(method);
                                    } else {
                                        starRequestHandler = undefined;
                                    }
                                }
                            };
                        },
                        hasPendingResponse: ()=>{
                            return responsePromises.size > 0;
                        },
                        trace: async (_value, _tracer, sendNotificationOrTraceOptions)=>{
                            let _sendNotification = false;
                            let _traceFormat = TraceFormat.Text;
                            if (sendNotificationOrTraceOptions !== undefined) {
                                if (Is.boolean(sendNotificationOrTraceOptions)) {
                                    _sendNotification = sendNotificationOrTraceOptions;
                                } else {
                                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                                }
                            }
                            trace = _value;
                            traceFormat = _traceFormat;
                            if (trace === Trace.Off) {
                                tracer = undefined;
                            } else {
                                tracer = _tracer;
                            }
                            if (_sendNotification && !isClosed() && !isDisposed()) {
                                await connection.sendNotification(SetTraceNotification.type, {
                                    value: Trace.toString(_value)
                                });
                            }
                        },
                        onError: errorEmitter.event,
                        onClose: closeEmitter.event,
                        onUnhandledNotification: unhandledNotificationEmitter.event,
                        onDispose: disposeEmitter.event,
                        end: ()=>{
                            messageWriter.end();
                        },
                        dispose: ()=>{
                            if (isDisposed()) {
                                return;
                            }
                            state = ConnectionState.Disposed;
                            disposeEmitter.fire(undefined);
                            const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, 'Pending response rejected since connection got disposed');
                            for (const promise of responsePromises.values()){
                                promise.reject(error);
                            }
                            responsePromises = new Map();
                            requestTokens = new Map();
                            knownCanceledRequests = new Set();
                            messageQueue = new linkedMap_1.LinkedMap();
                            // Test for backwards compatibility
                            if (Is.func(messageWriter.dispose)) {
                                messageWriter.dispose();
                            }
                            if (Is.func(messageReader.dispose)) {
                                messageReader.dispose();
                            }
                        },
                        listen: ()=>{
                            throwIfClosedOrDisposed();
                            throwIfListening();
                            state = ConnectionState.Listening;
                            messageReader.listen(callback);
                        },
                        inspect: ()=>{
                            // eslint-disable-next-line no-console
                            (0, ral_1.default)().console.log('inspect');
                        }
                    };
                    connection.onNotification(LogTraceNotification.type, (params)=>{
                        if (trace === Trace.Off || !tracer) {
                            return;
                        }
                        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
                        tracer.log(params.message, verbose ? params.verbose : undefined);
                    });
                    connection.onNotification(ProgressNotification.type, (params)=>{
                        const handler = progressHandlers.get(params.token);
                        if (handler) {
                            handler(params.value);
                        } else {
                            unhandledProgressEmitter.fire(params);
                        }
                    });
                    return connection;
                }
                exports1.createMessageConnection = createMessageConnection;
            //# sourceMappingURL=connection.js.map
            /***/ },
            /***/ 4250: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Disposable = void 0;
                var Disposable;
                (function(Disposable) {
                    function create(func) {
                        return {
                            dispose: func
                        };
                    }
                    Disposable.create = create;
                })(Disposable = exports1.Disposable || (exports1.Disposable = {}));
            //# sourceMappingURL=disposable.js.map
            /***/ },
            /***/ 7257: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_799785__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Emitter = exports1.Event = void 0;
                const ral_1 = __nested_webpack_require_799785__(5406);
                var Event1;
                (function(Event1) {
                    const _disposable = {
                        dispose () {}
                    };
                    Event1.None = function() {
                        return _disposable;
                    };
                })(Event1 = exports1.Event || (exports1.Event = {}));
                class CallbackList {
                    add(callback, context = null, bucket) {
                        if (!this._callbacks) {
                            this._callbacks = [];
                            this._contexts = [];
                        }
                        this._callbacks.push(callback);
                        this._contexts.push(context);
                        if (Array.isArray(bucket)) {
                            bucket.push({
                                dispose: ()=>this.remove(callback, context)
                            });
                        }
                    }
                    remove(callback, context = null) {
                        if (!this._callbacks) {
                            return;
                        }
                        let foundCallbackWithDifferentContext = false;
                        for(let i = 0, len = this._callbacks.length; i < len; i++){
                            if (this._callbacks[i] === callback) {
                                if (this._contexts[i] === context) {
                                    // callback & context match => remove it
                                    this._callbacks.splice(i, 1);
                                    this._contexts.splice(i, 1);
                                    return;
                                } else {
                                    foundCallbackWithDifferentContext = true;
                                }
                            }
                        }
                        if (foundCallbackWithDifferentContext) {
                            throw new Error('When adding a listener with a context, you should remove it with the same context');
                        }
                    }
                    invoke(...args) {
                        if (!this._callbacks) {
                            return [];
                        }
                        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
                        for(let i = 0, len = callbacks.length; i < len; i++){
                            try {
                                ret.push(callbacks[i].apply(contexts[i], args));
                            } catch (e) {
                                // eslint-disable-next-line no-console
                                (0, ral_1.default)().console.error(e);
                            }
                        }
                        return ret;
                    }
                    isEmpty() {
                        return !this._callbacks || this._callbacks.length === 0;
                    }
                    dispose() {
                        this._callbacks = undefined;
                        this._contexts = undefined;
                    }
                }
                class Emitter {
                    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */ get event() {
                        if (!this._event) {
                            this._event = (listener, thisArgs, disposables)=>{
                                if (!this._callbacks) {
                                    this._callbacks = new CallbackList();
                                }
                                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                                    this._options.onFirstListenerAdd(this);
                                }
                                this._callbacks.add(listener, thisArgs);
                                const result = {
                                    dispose: ()=>{
                                        if (!this._callbacks) {
                                            // disposable is disposed after emitter is disposed.
                                            return;
                                        }
                                        this._callbacks.remove(listener, thisArgs);
                                        result.dispose = Emitter._noop;
                                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                                            this._options.onLastListenerRemove(this);
                                        }
                                    }
                                };
                                if (Array.isArray(disposables)) {
                                    disposables.push(result);
                                }
                                return result;
                            };
                        }
                        return this._event;
                    }
                    /**
     * To be kept private to fire an event to
     * subscribers
     */ fire(event) {
                        if (this._callbacks) {
                            this._callbacks.invoke.call(this._callbacks, event);
                        }
                    }
                    dispose() {
                        if (this._callbacks) {
                            this._callbacks.dispose();
                            this._callbacks = undefined;
                        }
                    }
                    constructor(_options){
                        this._options = _options;
                    }
                }
                exports1.Emitter = Emitter;
                Emitter._noop = function() {};
            //# sourceMappingURL=events.js.map
            /***/ },
            /***/ 1278: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.stringArray = exports1.array = exports1.func = exports1.error = exports1.number = exports1.string = exports1.boolean = void 0;
                function boolean(value) {
                    return value === true || value === false;
                }
                exports1.boolean = boolean;
                function string(value) {
                    return typeof value === 'string' || value instanceof String;
                }
                exports1.string = string;
                function number(value) {
                    return typeof value === 'number' || value instanceof Number;
                }
                exports1.number = number;
                function error(value) {
                    return value instanceof Error;
                }
                exports1.error = error;
                function func(value) {
                    return typeof value === 'function';
                }
                exports1.func = func;
                function array(value) {
                    return Array.isArray(value);
                }
                exports1.array = array;
                function stringArray(value) {
                    return array(value) && value.every((elem)=>string(elem));
                }
                exports1.stringArray = stringArray;
            //# sourceMappingURL=is.js.map
            /***/ },
            /***/ 1414: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var _a;
                Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.LRUCache = exports1.LinkedMap = exports1.Touch = void 0;
                var Touch;
                (function(Touch) {
                    Touch.None = 0;
                    Touch.First = 1;
                    Touch.AsOld = Touch.First;
                    Touch.Last = 2;
                    Touch.AsNew = Touch.Last;
                })(Touch = exports1.Touch || (exports1.Touch = {}));
                class LinkedMap {
                    clear() {
                        this._map.clear();
                        this._head = undefined;
                        this._tail = undefined;
                        this._size = 0;
                        this._state++;
                    }
                    isEmpty() {
                        return !this._head && !this._tail;
                    }
                    get size() {
                        return this._size;
                    }
                    get first() {
                        var _this__head;
                        return (_this__head = this._head) === null || _this__head === void 0 ? void 0 : _this__head.value;
                    }
                    get last() {
                        var _this__tail;
                        return (_this__tail = this._tail) === null || _this__tail === void 0 ? void 0 : _this__tail.value;
                    }
                    has(key) {
                        return this._map.has(key);
                    }
                    get(key, touch = Touch.None) {
                        const item = this._map.get(key);
                        if (!item) {
                            return undefined;
                        }
                        if (touch !== Touch.None) {
                            this.touch(item, touch);
                        }
                        return item.value;
                    }
                    set(key, value, touch = Touch.None) {
                        let item = this._map.get(key);
                        if (item) {
                            item.value = value;
                            if (touch !== Touch.None) {
                                this.touch(item, touch);
                            }
                        } else {
                            item = {
                                key,
                                value,
                                next: undefined,
                                previous: undefined
                            };
                            switch(touch){
                                case Touch.None:
                                    this.addItemLast(item);
                                    break;
                                case Touch.First:
                                    this.addItemFirst(item);
                                    break;
                                case Touch.Last:
                                    this.addItemLast(item);
                                    break;
                                default:
                                    this.addItemLast(item);
                                    break;
                            }
                            this._map.set(key, item);
                            this._size++;
                        }
                        return this;
                    }
                    delete(key) {
                        return !!this.remove(key);
                    }
                    remove(key) {
                        const item = this._map.get(key);
                        if (!item) {
                            return undefined;
                        }
                        this._map.delete(key);
                        this.removeItem(item);
                        this._size--;
                        return item.value;
                    }
                    shift() {
                        if (!this._head && !this._tail) {
                            return undefined;
                        }
                        if (!this._head || !this._tail) {
                            throw new Error('Invalid list');
                        }
                        const item = this._head;
                        this._map.delete(item.key);
                        this.removeItem(item);
                        this._size--;
                        return item.value;
                    }
                    forEach(callbackfn, thisArg) {
                        const state = this._state;
                        let current = this._head;
                        while(current){
                            if (thisArg) {
                                callbackfn.bind(thisArg)(current.value, current.key, this);
                            } else {
                                callbackfn(current.value, current.key, this);
                            }
                            if (this._state !== state) {
                                throw new Error(`LinkedMap got modified during iteration.`);
                            }
                            current = current.next;
                        }
                    }
                    keys() {
                        const state = this._state;
                        let current = this._head;
                        const iterator = {
                            [Symbol.iterator]: ()=>{
                                return iterator;
                            },
                            next: ()=>{
                                if (this._state !== state) {
                                    throw new Error(`LinkedMap got modified during iteration.`);
                                }
                                if (current) {
                                    const result = {
                                        value: current.key,
                                        done: false
                                    };
                                    current = current.next;
                                    return result;
                                } else {
                                    return {
                                        value: undefined,
                                        done: true
                                    };
                                }
                            }
                        };
                        return iterator;
                    }
                    values() {
                        const state = this._state;
                        let current = this._head;
                        const iterator = {
                            [Symbol.iterator]: ()=>{
                                return iterator;
                            },
                            next: ()=>{
                                if (this._state !== state) {
                                    throw new Error(`LinkedMap got modified during iteration.`);
                                }
                                if (current) {
                                    const result = {
                                        value: current.value,
                                        done: false
                                    };
                                    current = current.next;
                                    return result;
                                } else {
                                    return {
                                        value: undefined,
                                        done: true
                                    };
                                }
                            }
                        };
                        return iterator;
                    }
                    entries() {
                        const state = this._state;
                        let current = this._head;
                        const iterator = {
                            [Symbol.iterator]: ()=>{
                                return iterator;
                            },
                            next: ()=>{
                                if (this._state !== state) {
                                    throw new Error(`LinkedMap got modified during iteration.`);
                                }
                                if (current) {
                                    const result = {
                                        value: [
                                            current.key,
                                            current.value
                                        ],
                                        done: false
                                    };
                                    current = current.next;
                                    return result;
                                } else {
                                    return {
                                        value: undefined,
                                        done: true
                                    };
                                }
                            }
                        };
                        return iterator;
                    }
                    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
                        return this.entries();
                    }
                    trimOld(newSize) {
                        if (newSize >= this.size) {
                            return;
                        }
                        if (newSize === 0) {
                            this.clear();
                            return;
                        }
                        let current = this._head;
                        let currentSize = this.size;
                        while(current && currentSize > newSize){
                            this._map.delete(current.key);
                            current = current.next;
                            currentSize--;
                        }
                        this._head = current;
                        this._size = currentSize;
                        if (current) {
                            current.previous = undefined;
                        }
                        this._state++;
                    }
                    addItemFirst(item) {
                        // First time Insert
                        if (!this._head && !this._tail) {
                            this._tail = item;
                        } else if (!this._head) {
                            throw new Error('Invalid list');
                        } else {
                            item.next = this._head;
                            this._head.previous = item;
                        }
                        this._head = item;
                        this._state++;
                    }
                    addItemLast(item) {
                        // First time Insert
                        if (!this._head && !this._tail) {
                            this._head = item;
                        } else if (!this._tail) {
                            throw new Error('Invalid list');
                        } else {
                            item.previous = this._tail;
                            this._tail.next = item;
                        }
                        this._tail = item;
                        this._state++;
                    }
                    removeItem(item) {
                        if (item === this._head && item === this._tail) {
                            this._head = undefined;
                            this._tail = undefined;
                        } else if (item === this._head) {
                            // This can only happened if size === 1 which is handle
                            // by the case above.
                            if (!item.next) {
                                throw new Error('Invalid list');
                            }
                            item.next.previous = undefined;
                            this._head = item.next;
                        } else if (item === this._tail) {
                            // This can only happened if size === 1 which is handle
                            // by the case above.
                            if (!item.previous) {
                                throw new Error('Invalid list');
                            }
                            item.previous.next = undefined;
                            this._tail = item.previous;
                        } else {
                            const next = item.next;
                            const previous = item.previous;
                            if (!next || !previous) {
                                throw new Error('Invalid list');
                            }
                            next.previous = previous;
                            previous.next = next;
                        }
                        item.next = undefined;
                        item.previous = undefined;
                        this._state++;
                    }
                    touch(item, touch) {
                        if (!this._head || !this._tail) {
                            throw new Error('Invalid list');
                        }
                        if (touch !== Touch.First && touch !== Touch.Last) {
                            return;
                        }
                        if (touch === Touch.First) {
                            if (item === this._head) {
                                return;
                            }
                            const next = item.next;
                            const previous = item.previous;
                            // Unlink the item
                            if (item === this._tail) {
                                // previous must be defined since item was not head but is tail
                                // So there are more than on item in the map
                                previous.next = undefined;
                                this._tail = previous;
                            } else {
                                // Both next and previous are not undefined since item was neither head nor tail.
                                next.previous = previous;
                                previous.next = next;
                            }
                            // Insert the node at head
                            item.previous = undefined;
                            item.next = this._head;
                            this._head.previous = item;
                            this._head = item;
                            this._state++;
                        } else if (touch === Touch.Last) {
                            if (item === this._tail) {
                                return;
                            }
                            const next = item.next;
                            const previous = item.previous;
                            // Unlink the item.
                            if (item === this._head) {
                                // next must be defined since item was not tail but is head
                                // So there are more than on item in the map
                                next.previous = undefined;
                                this._head = next;
                            } else {
                                // Both next and previous are not undefined since item was neither head nor tail.
                                next.previous = previous;
                                previous.next = next;
                            }
                            item.next = undefined;
                            item.previous = this._tail;
                            this._tail.next = item;
                            this._tail = item;
                            this._state++;
                        }
                    }
                    toJSON() {
                        const data = [];
                        this.forEach((value, key)=>{
                            data.push([
                                key,
                                value
                            ]);
                        });
                        return data;
                    }
                    fromJSON(data) {
                        this.clear();
                        for (const [key, value] of data){
                            this.set(key, value);
                        }
                    }
                    constructor(){
                        this[_a] = 'LinkedMap';
                        this._map = new Map();
                        this._head = undefined;
                        this._tail = undefined;
                        this._size = 0;
                        this._state = 0;
                    }
                }
                exports1.LinkedMap = LinkedMap;
                class LRUCache extends LinkedMap {
                    get limit() {
                        return this._limit;
                    }
                    set limit(limit) {
                        this._limit = limit;
                        this.checkTrim();
                    }
                    get ratio() {
                        return this._ratio;
                    }
                    set ratio(ratio) {
                        this._ratio = Math.min(Math.max(0, ratio), 1);
                        this.checkTrim();
                    }
                    get(key, touch = Touch.AsNew) {
                        return super.get(key, touch);
                    }
                    peek(key) {
                        return super.get(key, Touch.None);
                    }
                    set(key, value) {
                        super.set(key, value, Touch.Last);
                        this.checkTrim();
                        return this;
                    }
                    checkTrim() {
                        if (this.size > this._limit) {
                            this.trimOld(Math.round(this._limit * this._ratio));
                        }
                    }
                    constructor(limit, ratio = 1){
                        super();
                        this._limit = limit;
                        this._ratio = Math.min(Math.max(0, ratio), 1);
                    }
                }
                exports1.LRUCache = LRUCache;
            //# sourceMappingURL=linkedMap.js.map
            /***/ },
            /***/ 5947: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.AbstractMessageBuffer = void 0;
                const CR = 13;
                const LF = 10;
                const CRLF = '\r\n';
                class AbstractMessageBuffer {
                    get encoding() {
                        return this._encoding;
                    }
                    append(chunk) {
                        const toAppend = typeof chunk === 'string' ? this.fromString(chunk, this._encoding) : chunk;
                        this._chunks.push(toAppend);
                        this._totalLength += toAppend.byteLength;
                    }
                    tryReadHeaders() {
                        if (this._chunks.length === 0) {
                            return undefined;
                        }
                        let state = 0;
                        let chunkIndex = 0;
                        let offset = 0;
                        let chunkBytesRead = 0;
                        row: while(chunkIndex < this._chunks.length){
                            const chunk = this._chunks[chunkIndex];
                            offset = 0;
                            column: while(offset < chunk.length){
                                const value = chunk[offset];
                                switch(value){
                                    case CR:
                                        switch(state){
                                            case 0:
                                                state = 1;
                                                break;
                                            case 2:
                                                state = 3;
                                                break;
                                            default:
                                                state = 0;
                                        }
                                        break;
                                    case LF:
                                        switch(state){
                                            case 1:
                                                state = 2;
                                                break;
                                            case 3:
                                                state = 4;
                                                offset++;
                                                break row;
                                            default:
                                                state = 0;
                                        }
                                        break;
                                    default:
                                        state = 0;
                                }
                                offset++;
                            }
                            chunkBytesRead += chunk.byteLength;
                            chunkIndex++;
                        }
                        if (state !== 4) {
                            return undefined;
                        }
                        // The buffer contains the two CRLF at the end. So we will
                        // have two empty lines after the split at the end as well.
                        const buffer = this._read(chunkBytesRead + offset);
                        const result = new Map();
                        const headers = this.toString(buffer, 'ascii').split(CRLF);
                        if (headers.length < 2) {
                            return result;
                        }
                        for(let i = 0; i < headers.length - 2; i++){
                            const header = headers[i];
                            const index = header.indexOf(':');
                            if (index === -1) {
                                throw new Error('Message header must separate key and value using :');
                            }
                            const key = header.substr(0, index);
                            const value = header.substr(index + 1).trim();
                            result.set(key, value);
                        }
                        return result;
                    }
                    tryReadBody(length) {
                        if (this._totalLength < length) {
                            return undefined;
                        }
                        return this._read(length);
                    }
                    get numberOfBytes() {
                        return this._totalLength;
                    }
                    _read(byteCount) {
                        if (byteCount === 0) {
                            return this.emptyBuffer();
                        }
                        if (byteCount > this._totalLength) {
                            throw new Error(`Cannot read so many bytes!`);
                        }
                        if (this._chunks[0].byteLength === byteCount) {
                            // super fast path, precisely first chunk must be returned
                            const chunk = this._chunks[0];
                            this._chunks.shift();
                            this._totalLength -= byteCount;
                            return this.asNative(chunk);
                        }
                        if (this._chunks[0].byteLength > byteCount) {
                            // fast path, the reading is entirely within the first chunk
                            const chunk = this._chunks[0];
                            const result = this.asNative(chunk, byteCount);
                            this._chunks[0] = chunk.slice(byteCount);
                            this._totalLength -= byteCount;
                            return result;
                        }
                        const result = this.allocNative(byteCount);
                        let resultOffset = 0;
                        let chunkIndex = 0;
                        while(byteCount > 0){
                            const chunk = this._chunks[chunkIndex];
                            if (chunk.byteLength > byteCount) {
                                // this chunk will survive
                                const chunkPart = chunk.slice(0, byteCount);
                                result.set(chunkPart, resultOffset);
                                resultOffset += byteCount;
                                this._chunks[chunkIndex] = chunk.slice(byteCount);
                                this._totalLength -= byteCount;
                                byteCount -= byteCount;
                            } else {
                                // this chunk will be entirely read
                                result.set(chunk, resultOffset);
                                resultOffset += chunk.byteLength;
                                this._chunks.shift();
                                this._totalLength -= chunk.byteLength;
                                byteCount -= chunk.byteLength;
                            }
                        }
                        return result;
                    }
                    constructor(encoding = 'utf-8'){
                        this._encoding = encoding;
                        this._chunks = [];
                        this._totalLength = 0;
                    }
                }
                exports1.AbstractMessageBuffer = AbstractMessageBuffer;
            //# sourceMappingURL=messageBuffer.js.map
            /***/ },
            /***/ 207: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_835618__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.ReadableStreamMessageReader = exports1.AbstractMessageReader = exports1.MessageReader = void 0;
                const ral_1 = __nested_webpack_require_835618__(5406);
                const Is = __nested_webpack_require_835618__(1278);
                const events_1 = __nested_webpack_require_835618__(7257);
                var MessageReader;
                (function(MessageReader) {
                    function is(value) {
                        let candidate = value;
                        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
                    }
                    MessageReader.is = is;
                })(MessageReader = exports1.MessageReader || (exports1.MessageReader = {}));
                class AbstractMessageReader {
                    dispose() {
                        this.errorEmitter.dispose();
                        this.closeEmitter.dispose();
                    }
                    get onError() {
                        return this.errorEmitter.event;
                    }
                    fireError(error) {
                        this.errorEmitter.fire(this.asError(error));
                    }
                    get onClose() {
                        return this.closeEmitter.event;
                    }
                    fireClose() {
                        this.closeEmitter.fire(undefined);
                    }
                    get onPartialMessage() {
                        return this.partialMessageEmitter.event;
                    }
                    firePartialMessage(info) {
                        this.partialMessageEmitter.fire(info);
                    }
                    asError(error) {
                        if (error instanceof Error) {
                            return error;
                        } else {
                            return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
                        }
                    }
                    constructor(){
                        this.errorEmitter = new events_1.Emitter();
                        this.closeEmitter = new events_1.Emitter();
                        this.partialMessageEmitter = new events_1.Emitter();
                    }
                }
                exports1.AbstractMessageReader = AbstractMessageReader;
                var ResolvedMessageReaderOptions;
                (function(ResolvedMessageReaderOptions) {
                    function fromOptions(options) {
                        let charset;
                        let result;
                        let contentDecoder;
                        const contentDecoders = new Map();
                        let contentTypeDecoder;
                        const contentTypeDecoders = new Map();
                        if (options === undefined || typeof options === 'string') {
                            charset = options !== null && options !== void 0 ? options : 'utf-8';
                        } else {
                            var _options_charset;
                            charset = (_options_charset = options.charset) !== null && _options_charset !== void 0 ? _options_charset : 'utf-8';
                            if (options.contentDecoder !== undefined) {
                                contentDecoder = options.contentDecoder;
                                contentDecoders.set(contentDecoder.name, contentDecoder);
                            }
                            if (options.contentDecoders !== undefined) {
                                for (const decoder of options.contentDecoders){
                                    contentDecoders.set(decoder.name, decoder);
                                }
                            }
                            if (options.contentTypeDecoder !== undefined) {
                                contentTypeDecoder = options.contentTypeDecoder;
                                contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
                            }
                            if (options.contentTypeDecoders !== undefined) {
                                for (const decoder of options.contentTypeDecoders){
                                    contentTypeDecoders.set(decoder.name, decoder);
                                }
                            }
                        }
                        if (contentTypeDecoder === undefined) {
                            contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
                            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
                        }
                        return {
                            charset,
                            contentDecoder,
                            contentDecoders,
                            contentTypeDecoder,
                            contentTypeDecoders
                        };
                    }
                    ResolvedMessageReaderOptions.fromOptions = fromOptions;
                })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
                class ReadableStreamMessageReader extends AbstractMessageReader {
                    set partialMessageTimeout(timeout) {
                        this._partialMessageTimeout = timeout;
                    }
                    get partialMessageTimeout() {
                        return this._partialMessageTimeout;
                    }
                    listen(callback) {
                        this.nextMessageLength = -1;
                        this.messageToken = 0;
                        this.partialMessageTimer = undefined;
                        this.callback = callback;
                        const result = this.readable.onData((data)=>{
                            this.onData(data);
                        });
                        this.readable.onError((error)=>this.fireError(error));
                        this.readable.onClose(()=>this.fireClose());
                        return result;
                    }
                    onData(data) {
                        this.buffer.append(data);
                        while(true){
                            if (this.nextMessageLength === -1) {
                                const headers = this.buffer.tryReadHeaders();
                                if (!headers) {
                                    return;
                                }
                                const contentLength = headers.get('Content-Length');
                                if (!contentLength) {
                                    throw new Error('Header must provide a Content-Length property.');
                                }
                                const length = parseInt(contentLength);
                                if (isNaN(length)) {
                                    throw new Error('Content-Length value must be a number.');
                                }
                                this.nextMessageLength = length;
                            }
                            const body = this.buffer.tryReadBody(this.nextMessageLength);
                            if (body === undefined) {
                                /** We haven't received the full message yet. */ this.setPartialMessageTimer();
                                return;
                            }
                            this.clearPartialMessageTimer();
                            this.nextMessageLength = -1;
                            let p;
                            if (this.options.contentDecoder !== undefined) {
                                p = this.options.contentDecoder.decode(body);
                            } else {
                                p = Promise.resolve(body);
                            }
                            p.then((value)=>{
                                this.options.contentTypeDecoder.decode(value, this.options).then((msg)=>{
                                    this.callback(msg);
                                }, (error)=>{
                                    this.fireError(error);
                                });
                            }, (error)=>{
                                this.fireError(error);
                            });
                        }
                    }
                    clearPartialMessageTimer() {
                        if (this.partialMessageTimer) {
                            this.partialMessageTimer.dispose();
                            this.partialMessageTimer = undefined;
                        }
                    }
                    setPartialMessageTimer() {
                        this.clearPartialMessageTimer();
                        if (this._partialMessageTimeout <= 0) {
                            return;
                        }
                        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout)=>{
                            this.partialMessageTimer = undefined;
                            if (token === this.messageToken) {
                                this.firePartialMessage({
                                    messageToken: token,
                                    waitingTime: timeout
                                });
                                this.setPartialMessageTimer();
                            }
                        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
                    }
                    constructor(readable, options){
                        super();
                        this.readable = readable;
                        this.options = ResolvedMessageReaderOptions.fromOptions(options);
                        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
                        this._partialMessageTimeout = 10000;
                        this.nextMessageLength = -1;
                        this.messageToken = 0;
                    }
                }
                exports1.ReadableStreamMessageReader = ReadableStreamMessageReader;
            //# sourceMappingURL=messageReader.js.map
            /***/ },
            /***/ 6214: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_846598__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.WriteableStreamMessageWriter = exports1.AbstractMessageWriter = exports1.MessageWriter = void 0;
                const ral_1 = __nested_webpack_require_846598__(5406);
                const Is = __nested_webpack_require_846598__(1278);
                const semaphore_1 = __nested_webpack_require_846598__(4197);
                const events_1 = __nested_webpack_require_846598__(7257);
                const ContentLength = 'Content-Length: ';
                const CRLF = '\r\n';
                var MessageWriter;
                (function(MessageWriter) {
                    function is(value) {
                        let candidate = value;
                        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
                    }
                    MessageWriter.is = is;
                })(MessageWriter = exports1.MessageWriter || (exports1.MessageWriter = {}));
                class AbstractMessageWriter {
                    dispose() {
                        this.errorEmitter.dispose();
                        this.closeEmitter.dispose();
                    }
                    get onError() {
                        return this.errorEmitter.event;
                    }
                    fireError(error, message, count) {
                        this.errorEmitter.fire([
                            this.asError(error),
                            message,
                            count
                        ]);
                    }
                    get onClose() {
                        return this.closeEmitter.event;
                    }
                    fireClose() {
                        this.closeEmitter.fire(undefined);
                    }
                    asError(error) {
                        if (error instanceof Error) {
                            return error;
                        } else {
                            return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
                        }
                    }
                    constructor(){
                        this.errorEmitter = new events_1.Emitter();
                        this.closeEmitter = new events_1.Emitter();
                    }
                }
                exports1.AbstractMessageWriter = AbstractMessageWriter;
                var ResolvedMessageWriterOptions;
                (function(ResolvedMessageWriterOptions) {
                    function fromOptions(options) {
                        if (options === undefined || typeof options === 'string') {
                            return {
                                charset: options !== null && options !== void 0 ? options : 'utf-8',
                                contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder
                            };
                        } else {
                            var _options_charset, _options_contentTypeEncoder;
                            return {
                                charset: (_options_charset = options.charset) !== null && _options_charset !== void 0 ? _options_charset : 'utf-8',
                                contentEncoder: options.contentEncoder,
                                contentTypeEncoder: (_options_contentTypeEncoder = options.contentTypeEncoder) !== null && _options_contentTypeEncoder !== void 0 ? _options_contentTypeEncoder : (0, ral_1.default)().applicationJson.encoder
                            };
                        }
                    }
                    ResolvedMessageWriterOptions.fromOptions = fromOptions;
                })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
                class WriteableStreamMessageWriter extends AbstractMessageWriter {
                    async write(msg) {
                        return this.writeSemaphore.lock(async ()=>{
                            const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer)=>{
                                if (this.options.contentEncoder !== undefined) {
                                    return this.options.contentEncoder.encode(buffer);
                                } else {
                                    return buffer;
                                }
                            });
                            return payload.then((buffer)=>{
                                const headers = [];
                                headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
                                headers.push(CRLF);
                                return this.doWrite(msg, headers, buffer);
                            }, (error)=>{
                                this.fireError(error);
                                throw error;
                            });
                        });
                    }
                    async doWrite(msg, headers, data) {
                        try {
                            await this.writable.write(headers.join(''), 'ascii');
                            return this.writable.write(data);
                        } catch (error) {
                            this.handleError(error, msg);
                            return Promise.reject(error);
                        }
                    }
                    handleError(error, msg) {
                        this.errorCount++;
                        this.fireError(error, msg, this.errorCount);
                    }
                    end() {
                        this.writable.end();
                    }
                    constructor(writable, options){
                        super();
                        this.writable = writable;
                        this.options = ResolvedMessageWriterOptions.fromOptions(options);
                        this.errorCount = 0;
                        this.writeSemaphore = new semaphore_1.Semaphore(1);
                        this.writable.onError((error)=>this.fireError(error));
                        this.writable.onClose(()=>this.fireClose());
                    }
                }
                exports1.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
            //# sourceMappingURL=messageWriter.js.map
            /***/ },
            /***/ 5613: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_853538__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Message = exports1.NotificationType9 = exports1.NotificationType8 = exports1.NotificationType7 = exports1.NotificationType6 = exports1.NotificationType5 = exports1.NotificationType4 = exports1.NotificationType3 = exports1.NotificationType2 = exports1.NotificationType1 = exports1.NotificationType0 = exports1.NotificationType = exports1.RequestType9 = exports1.RequestType8 = exports1.RequestType7 = exports1.RequestType6 = exports1.RequestType5 = exports1.RequestType4 = exports1.RequestType3 = exports1.RequestType2 = exports1.RequestType1 = exports1.RequestType = exports1.RequestType0 = exports1.AbstractMessageSignature = exports1.ParameterStructures = exports1.ResponseError = exports1.ErrorCodes = void 0;
                const is = __nested_webpack_require_853538__(1278);
                /**
 * Predefined error codes.
 */ var ErrorCodes;
                (function(ErrorCodes) {
                    // Defined by JSON RPC
                    ErrorCodes.ParseError = -32700;
                    ErrorCodes.InvalidRequest = -32600;
                    ErrorCodes.MethodNotFound = -32601;
                    ErrorCodes.InvalidParams = -32602;
                    ErrorCodes.InternalError = -32603;
                    /**
     * This is the start range of JSON RPC reserved error codes.
     * It doesn't denote a real error code. No application error codes should
     * be defined between the start and end range. For backwards
     * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
     * are left in the range.
     *
     * @since 3.16.0
    */ ErrorCodes.jsonrpcReservedErrorRangeStart = -32099;
                    /** @deprecated use  jsonrpcReservedErrorRangeStart */ ErrorCodes.serverErrorStart = -32099;
                    /**
     * An error occurred when write a message to the transport layer.
     */ ErrorCodes.MessageWriteError = -32099;
                    /**
     * An error occurred when reading a message from the transport layer.
     */ ErrorCodes.MessageReadError = -32098;
                    /**
     * The connection got disposed or lost and all pending responses got
     * rejected.
     */ ErrorCodes.PendingResponseRejected = -32097;
                    /**
     * The connection is inactive and a use of it failed.
     */ ErrorCodes.ConnectionInactive = -32096;
                    /**
     * Error code indicating that a server received a notification or
     * request before the server has received the `initialize` request.
     */ ErrorCodes.ServerNotInitialized = -32002;
                    ErrorCodes.UnknownErrorCode = -32001;
                    /**
     * This is the end range of JSON RPC reserved error codes.
     * It doesn't denote a real error code.
     *
     * @since 3.16.0
    */ ErrorCodes.jsonrpcReservedErrorRangeEnd = -32000;
                    /** @deprecated use  jsonrpcReservedErrorRangeEnd */ ErrorCodes.serverErrorEnd = -32000;
                })(ErrorCodes = exports1.ErrorCodes || (exports1.ErrorCodes = {}));
                /**
 * An error object return in a response in case a request
 * has failed.
 */ class ResponseError extends Error {
                    toJson() {
                        const result = {
                            code: this.code,
                            message: this.message
                        };
                        if (this.data !== undefined) {
                            result.data = this.data;
                        }
                        return result;
                    }
                    constructor(code, message, data){
                        super(message);
                        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
                        this.data = data;
                        Object.setPrototypeOf(this, ResponseError.prototype);
                    }
                }
                exports1.ResponseError = ResponseError;
                class ParameterStructures {
                    static is(value) {
                        return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
                    }
                    toString() {
                        return this.kind;
                    }
                    constructor(kind){
                        this.kind = kind;
                    }
                }
                exports1.ParameterStructures = ParameterStructures;
                /**
 * The parameter structure is automatically inferred on the number of parameters
 * and the parameter type in case of a single param.
 */ ParameterStructures.auto = new ParameterStructures('auto');
                /**
 * Forces `byPosition` parameter structure. This is useful if you have a single
 * parameter which has a literal type.
 */ ParameterStructures.byPosition = new ParameterStructures('byPosition');
                /**
 * Forces `byName` parameter structure. This is only useful when having a single
 * parameter. The library will report errors if used with a different number of
 * parameters.
 */ ParameterStructures.byName = new ParameterStructures('byName');
                /**
 * An abstract implementation of a MessageType.
 */ class AbstractMessageSignature {
                    get parameterStructures() {
                        return ParameterStructures.auto;
                    }
                    constructor(method, numberOfParams){
                        this.method = method;
                        this.numberOfParams = numberOfParams;
                    }
                }
                exports1.AbstractMessageSignature = AbstractMessageSignature;
                /**
 * Classes to type request response pairs
 */ class RequestType0 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 0);
                    }
                }
                exports1.RequestType0 = RequestType0;
                class RequestType extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.RequestType = RequestType;
                class RequestType1 extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.RequestType1 = RequestType1;
                class RequestType2 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 2);
                    }
                }
                exports1.RequestType2 = RequestType2;
                class RequestType3 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 3);
                    }
                }
                exports1.RequestType3 = RequestType3;
                class RequestType4 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 4);
                    }
                }
                exports1.RequestType4 = RequestType4;
                class RequestType5 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 5);
                    }
                }
                exports1.RequestType5 = RequestType5;
                class RequestType6 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 6);
                    }
                }
                exports1.RequestType6 = RequestType6;
                class RequestType7 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 7);
                    }
                }
                exports1.RequestType7 = RequestType7;
                class RequestType8 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 8);
                    }
                }
                exports1.RequestType8 = RequestType8;
                class RequestType9 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 9);
                    }
                }
                exports1.RequestType9 = RequestType9;
                class NotificationType extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.NotificationType = NotificationType;
                class NotificationType0 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 0);
                    }
                }
                exports1.NotificationType0 = NotificationType0;
                class NotificationType1 extends AbstractMessageSignature {
                    get parameterStructures() {
                        return this._parameterStructures;
                    }
                    constructor(method, _parameterStructures = ParameterStructures.auto){
                        super(method, 1);
                        this._parameterStructures = _parameterStructures;
                    }
                }
                exports1.NotificationType1 = NotificationType1;
                class NotificationType2 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 2);
                    }
                }
                exports1.NotificationType2 = NotificationType2;
                class NotificationType3 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 3);
                    }
                }
                exports1.NotificationType3 = NotificationType3;
                class NotificationType4 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 4);
                    }
                }
                exports1.NotificationType4 = NotificationType4;
                class NotificationType5 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 5);
                    }
                }
                exports1.NotificationType5 = NotificationType5;
                class NotificationType6 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 6);
                    }
                }
                exports1.NotificationType6 = NotificationType6;
                class NotificationType7 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 7);
                    }
                }
                exports1.NotificationType7 = NotificationType7;
                class NotificationType8 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 8);
                    }
                }
                exports1.NotificationType8 = NotificationType8;
                class NotificationType9 extends AbstractMessageSignature {
                    constructor(method){
                        super(method, 9);
                    }
                }
                exports1.NotificationType9 = NotificationType9;
                var Message;
                (function(Message) {
                    /**
     * Tests if the given message is a request message
     */ function isRequest(message) {
                        const candidate = message;
                        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
                    }
                    Message.isRequest = isRequest;
                    /**
     * Tests if the given message is a notification message
     */ function isNotification(message) {
                        const candidate = message;
                        return candidate && is.string(candidate.method) && message.id === void 0;
                    }
                    Message.isNotification = isNotification;
                    /**
     * Tests if the given message is a response message
     */ function isResponse(message) {
                        const candidate = message;
                        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
                    }
                    Message.isResponse = isResponse;
                })(Message = exports1.Message || (exports1.Message = {}));
            //# sourceMappingURL=messages.js.map
            /***/ },
            /***/ 5406: /***/ (__unused_webpack_module, exports1)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                let _ral;
                function RAL() {
                    if (_ral === undefined) {
                        throw new Error(`No runtime abstraction layer installed`);
                    }
                    return _ral;
                }
                (function(RAL) {
                    function install(ral) {
                        if (ral === undefined) {
                            throw new Error(`No runtime abstraction layer provided`);
                        }
                        _ral = ral;
                    }
                    RAL.install = install;
                })(RAL || (RAL = {}));
                exports1["default"] = RAL;
            //# sourceMappingURL=ral.js.map
            /***/ },
            /***/ 4197: /***/ (__unused_webpack_module, exports1, __nested_webpack_require_869139__)=>{
                "use strict";
                /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ Object.defineProperty(exports1, "__esModule", {
                    value: true
                });
                exports1.Semaphore = void 0;
                const ral_1 = __nested_webpack_require_869139__(5406);
                class Semaphore {
                    lock(thunk) {
                        return new Promise((resolve, reject)=>{
                            this._waiting.push({
                                thunk,
                                resolve,
                                reject
                            });
                            this.runNext();
                        });
                    }
                    get active() {
                        return this._active;
                    }
                    runNext() {
                        if (this._waiting.length === 0 || this._active === this._capacity) {
                            return;
                        }
                        (0, ral_1.default)().timer.setImmediate(()=>this.doRunNext());
                    }
                    doRunNext() {
                        if (this._waiting.length === 0 || this._active === this._capacity) {
                            return;
                        }
                        const next = this._waiting.shift();
                        this._active++;
                        if (this._active > this._capacity) {
                            throw new Error(`To many thunks active`);
                        }
                        try {
                            const result = next.thunk();
                            if (result instanceof Promise) {
                                result.then((value)=>{
                                    this._active--;
                                    next.resolve(value);
                                    this.runNext();
                                }, (err)=>{
                                    this._active--;
                                    next.reject(err);
                                    this.runNext();
                                });
                            } else {
                                this._active--;
                                next.resolve(result);
                                this.runNext();
                            }
                        } catch (err) {
                            this._active--;
                            next.reject(err);
                            this.runNext();
                        }
                    }
                    constructor(capacity = 1){
                        if (capacity <= 0) {
                            throw new Error('Capacity must be greater than 0');
                        }
                        this._capacity = capacity;
                        this._active = 0;
                        this._waiting = [];
                    }
                }
                exports1.Semaphore = Semaphore;
            //# sourceMappingURL=semaphore.js.map
            /***/ },
            /***/ 2094: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_872632__)=>{
                "use strict";
                var forEach = __nested_webpack_require_872632__(3243);
                var availableTypedArrays = __nested_webpack_require_872632__(2191);
                var callBind = __nested_webpack_require_872632__(9429);
                var callBound = __nested_webpack_require_872632__(2680);
                var gOPD = __nested_webpack_require_872632__(326);
                var $toString = callBound('Object.prototype.toString');
                var hasToStringTag = __nested_webpack_require_872632__(7226)();
                var g = typeof globalThis === 'undefined' ? __nested_webpack_require_872632__.g : globalThis;
                var typedArrays = availableTypedArrays();
                var $slice = callBound('String.prototype.slice');
                var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
                var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
                    for(var i = 0; i < array.length; i += 1){
                        if (array[i] === value) {
                            return i;
                        }
                    }
                    return -1;
                };
                var cache = {
                    __proto__: null
                };
                if (hasToStringTag && gOPD && getPrototypeOf) {
                    forEach(typedArrays, function(typedArray) {
                        var arr = new g[typedArray]();
                        if (Symbol.toStringTag in arr) {
                            var proto = getPrototypeOf(arr);
                            var descriptor = gOPD(proto, Symbol.toStringTag);
                            if (!descriptor) {
                                var superProto = getPrototypeOf(proto);
                                descriptor = gOPD(superProto, Symbol.toStringTag);
                            }
                            cache['$' + typedArray] = callBind(descriptor.get);
                        }
                    });
                } else {
                    forEach(typedArrays, function(typedArray) {
                        var arr = new g[typedArray]();
                        cache['$' + typedArray] = callBind(arr.slice);
                    });
                }
                var tryTypedArrays = function tryAllTypedArrays(value) {
                    var found = false;
                    forEach(cache, function(getter, typedArray) {
                        if (!found) {
                            try {
                                if ('$' + getter(value) === typedArray) {
                                    found = $slice(typedArray, 1);
                                }
                            } catch (e) {}
                        }
                    });
                    return found;
                };
                var trySlices = function tryAllSlices(value) {
                    var found = false;
                    forEach(cache, function(getter, name) {
                        if (!found) {
                            try {
                                getter(value);
                                found = $slice(name, 1);
                            } catch (e) {}
                        }
                    });
                    return found;
                };
                module1.exports = function whichTypedArray(value) {
                    if (!value || typeof value !== 'object') {
                        return false;
                    }
                    if (!hasToStringTag) {
                        var tag = $slice($toString(value), 8, -1);
                        if ($indexOf(typedArrays, tag) > -1) {
                            return tag;
                        }
                        if (tag !== 'Object') {
                            return false;
                        }
                        // node < 0.6 hits here on real Typed Arrays
                        return trySlices(value);
                    }
                    if (!gOPD) {
                        return null;
                    } // unknown engine
                    return tryTypedArrays(value);
                };
            /***/ },
            /***/ 2191: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_876879__)=>{
                "use strict";
                var possibleNames = [
                    'BigInt64Array',
                    'BigUint64Array',
                    'Float32Array',
                    'Float64Array',
                    'Int16Array',
                    'Int32Array',
                    'Int8Array',
                    'Uint16Array',
                    'Uint32Array',
                    'Uint8Array',
                    'Uint8ClampedArray'
                ];
                var g = typeof globalThis === 'undefined' ? __nested_webpack_require_876879__.g : globalThis;
                module1.exports = function availableTypedArrays() {
                    var out = [];
                    for(var i = 0; i < possibleNames.length; i++){
                        if (typeof g[possibleNames[i]] === 'function') {
                            out[out.length] = possibleNames[i];
                        }
                    }
                    return out;
                };
            /***/ }
        };
        /************************************************************************/ /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/ /******/ // The require function
        /******/ function __nested_webpack_require_878145__(moduleId) {
            /******/ // Check if module is in cache
            /******/ var cachedModule = __webpack_module_cache__[moduleId];
            /******/ if (cachedModule !== undefined) {
                /******/ return cachedModule.exports;
            /******/ }
            /******/ // Create a new module (and put it into the cache)
            /******/ var module1 = __webpack_module_cache__[moduleId] = {
                /******/ // no module.id needed
                /******/ // no module.loaded needed
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ __webpack_modules__[moduleId].call(module1.exports, module1, module1.exports, __nested_webpack_require_878145__);
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __nested_webpack_require_878145__.d = (exports1, definition)=>{
                /******/ for(var key in definition){
                    /******/ if (__nested_webpack_require_878145__.o(definition, key) && !__nested_webpack_require_878145__.o(exports1, key)) {
                        /******/ Object.defineProperty(exports1, key, {
                            enumerable: true,
                            get: definition[key]
                        });
                    /******/ }
                /******/ }
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/global */ /******/ (()=>{
            /******/ __nested_webpack_require_878145__.g = function() {
                /******/ if (typeof globalThis === 'object') return globalThis;
                /******/ try {
                    /******/ return this || new Function('return this')();
                /******/ } catch (e) {
                    /******/ if (typeof window === 'object') return window;
                /******/ }
            /******/ }();
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __nested_webpack_require_878145__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __nested_webpack_require_878145__.r = (exports1)=>{
                /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                    /******/ Object.defineProperty(exports1, Symbol.toStringTag, {
                        value: 'Module'
                    });
                /******/ }
                /******/ Object.defineProperty(exports1, '__esModule', {
                    value: true
                });
            /******/ };
        /******/ })();
        /******/ /************************************************************************/ var __nested_webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be in strict mode.
        (()=>{
            "use strict";
            // ESM COMPAT FLAG
            __nested_webpack_require_878145__.r(__nested_webpack_exports__);
            // EXPORTS
            __nested_webpack_require_878145__.d(__nested_webpack_exports__, {
                LanguageClient: ()=>/* binding */ LanguageClient
            });
            // EXTERNAL MODULE: ../../node_modules/vscode-ws-jsonrpc/node_modules/vscode-jsonrpc/lib/browser/main.js
            var main = __nested_webpack_require_878145__(2032);
            // EXTERNAL MODULE: ../../node_modules/vscode-ws-jsonrpc/node_modules/vscode-jsonrpc/lib/common/messages.js
            var messages = __nested_webpack_require_878145__(5613);
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/disposable.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ class DisposableCollection {
                dispose() {
                    while(this.disposables.length !== 0){
                        this.disposables.pop().dispose();
                    }
                }
                push(disposable) {
                    const disposables = this.disposables;
                    disposables.push(disposable);
                    return {
                        dispose () {
                            const index = disposables.indexOf(disposable);
                            if (index !== -1) {
                                disposables.splice(index, 1);
                            }
                        }
                    };
                }
                constructor(){
                    _define_property(this, "disposables", []);
                }
            }
            //# sourceMappingURL=disposable.js.map
            // EXTERNAL MODULE: ../../node_modules/vscode-ws-jsonrpc/node_modules/vscode-jsonrpc/lib/common/messageReader.js
            var messageReader = __nested_webpack_require_878145__(207);
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/socket/reader.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ class WebSocketMessageReader extends messageReader.AbstractMessageReader {
                listen(callback) {
                    if (this.state === 'initial') {
                        this.state = 'listening';
                        this.callback = callback;
                        while(this.events.length !== 0){
                            const event = this.events.pop();
                            if (event.message) {
                                this.readMessage(event.message);
                            } else if (event.error) {
                                this.fireError(event.error);
                            } else {
                                this.fireClose();
                            }
                        }
                    }
                    return {
                        dispose: ()=>{
                            if (this.callback === callback) {
                                this.callback = undefined;
                            }
                        }
                    };
                }
                readMessage(message) {
                    if (this.state === 'initial') {
                        this.events.splice(0, 0, {
                            message
                        });
                    } else if (this.state === 'listening') {
                        try {
                            const data = JSON.parse(message);
                            this.callback(data);
                        } catch (err) {
                            const error = {
                                name: '' + 400,
                                message: `Error during message parsing, reason = ${typeof err === 'object' ? err.message : 'unknown'}`
                            };
                            this.fireError(error);
                        }
                    }
                }
                fireError(error) {
                    if (this.state === 'initial') {
                        this.events.splice(0, 0, {
                            error
                        });
                    } else if (this.state === 'listening') {
                        super.fireError(error);
                    }
                }
                fireClose() {
                    if (this.state === 'initial') {
                        this.events.splice(0, 0, {});
                    } else if (this.state === 'listening') {
                        super.fireClose();
                    }
                    this.state = 'closed';
                }
                constructor(socket){
                    super();
                    _define_property(this, "socket", void 0);
                    _define_property(this, "state", 'initial');
                    _define_property(this, "callback", void 0);
                    _define_property(this, "events", []);
                    this.socket = socket;
                    this.socket.onMessage((message)=>this.readMessage(message));
                    this.socket.onError((error)=>this.fireError(error));
                    this.socket.onClose((code, reason)=>{
                        if (code !== 1000) {
                            const error = {
                                name: '' + code,
                                message: `Error during socket reconnect: code = ${code}, reason = ${reason}`
                            };
                            this.fireError(error);
                        }
                        this.fireClose();
                    });
                }
            }
            //# sourceMappingURL=reader.js.map
            // EXTERNAL MODULE: ../../node_modules/vscode-ws-jsonrpc/node_modules/vscode-jsonrpc/lib/common/messageWriter.js
            var messageWriter = __nested_webpack_require_878145__(6214);
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/socket/writer.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ class WebSocketMessageWriter extends messageWriter.AbstractMessageWriter {
                end() {}
                async write(msg) {
                    try {
                        const content = JSON.stringify(msg);
                        this.socket.send(content);
                    } catch (e) {
                        this.errorCount++;
                        this.fireError(e, msg, this.errorCount);
                    }
                }
                constructor(socket){
                    super();
                    _define_property(this, "socket", void 0);
                    _define_property(this, "errorCount", 0);
                    this.socket = socket;
                }
            }
            //# sourceMappingURL=writer.js.map
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/socket/connection.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ function createWebSocketConnection(socket, logger) {
                const messageReader = new WebSocketMessageReader(socket);
                const messageWriter = new WebSocketMessageWriter(socket);
                const connection = (0, main.createMessageConnection)(messageReader, messageWriter, logger);
                connection.onClose(()=>connection.dispose());
                return connection;
            }
            //# sourceMappingURL=connection.js.map
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/socket/index.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ //# sourceMappingURL=index.js.map
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/logger.js
            /* provided dependency */ var console = __nested_webpack_require_878145__(3716);
            class ConsoleLogger {
                error(message) {
                    console.error(message);
                }
                warn(message) {
                    console.warn(message);
                }
                info(message) {
                    console.info(message);
                }
                log(message) {
                    console.log(message);
                }
                debug(message) {
                    console.debug(message);
                }
            }
            //# sourceMappingURL=logger.js.map
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/connection.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ function listen(options) {
                const { webSocket, onConnection } = options;
                const logger = options.logger || new ConsoleLogger();
                webSocket.onopen = ()=>{
                    const socket = toSocket(webSocket);
                    const connection = createWebSocketConnection(socket, logger);
                    onConnection(connection);
                };
            }
            function toSocket(webSocket) {
                return {
                    send: (content)=>webSocket.send(content),
                    onMessage: (cb)=>{
                        webSocket.onmessage = (event)=>cb(event.data);
                    },
                    onError: (cb)=>{
                        webSocket.onerror = (event)=>{
                            if ('message' in event) {
                                cb(event.message);
                            }
                        };
                    },
                    onClose: (cb)=>{
                        webSocket.onclose = (event)=>cb(event.code, event.reason);
                    },
                    dispose: ()=>webSocket.close()
                };
            }
            //# sourceMappingURL=connection.js.map
            ; // CONCATENATED MODULE: ../../node_modules/vscode-ws-jsonrpc/lib/index.js
            /* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */ //# sourceMappingURL=index.js.map
            // EXTERNAL MODULE: ../../node_modules/vscode-languageserver-protocol/lib/browser/main.js
            var browser_main = __nested_webpack_require_878145__(294);
            // EXTERNAL MODULE: ../../node_modules/vscode-languageserver-protocol/browser.js
            var browser = __nested_webpack_require_878145__(1789);
            // EXTERNAL MODULE: ./src/services/base-service.ts
            var base_service = __nested_webpack_require_878145__(4487);
            ; // CONCATENATED MODULE: ./src/message-types.ts
            function _define_property1(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            }
            class BaseMessage {
                constructor(sessionId){
                    _define_property1(this, "sessionId", void 0);
                    this.sessionId = sessionId;
                }
            }
            class InitMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value, version, mode, options){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.init);
                    _define_property1(this, "mode", void 0);
                    _define_property1(this, "options", void 0);
                    _define_property1(this, "value", void 0);
                    _define_property1(this, "version", void 0);
                    this.version = version;
                    this.options = options;
                    this.mode = mode;
                    this.value = value;
                }
            }
            class FormatMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value, format){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.format);
                    _define_property1(this, "value", void 0);
                    _define_property1(this, "format", void 0);
                    this.value = value;
                    this.format = format;
                }
            }
            class CompleteMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.complete);
                    _define_property1(this, "value", void 0);
                    this.value = value;
                }
            }
            class ResolveCompletionMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.resolveCompletion);
                    _define_property1(this, "value", void 0);
                    this.value = value;
                }
            }
            class HoverMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.hover);
                    _define_property1(this, "value", void 0);
                    this.value = value;
                }
            }
            class ValidateMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.validate);
                }
            }
            class ChangeMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value, version){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.change);
                    _define_property1(this, "value", void 0);
                    _define_property1(this, "version", void 0);
                    this.value = value;
                    this.version = version;
                }
            }
            class DeltasMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value, version){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.applyDelta);
                    _define_property1(this, "value", void 0);
                    _define_property1(this, "version", void 0);
                    this.value = value;
                    this.version = version;
                }
            }
            class ChangeModeMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value, mode){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.changeMode);
                    _define_property1(this, "mode", void 0);
                    _define_property1(this, "value", void 0);
                    this.value = value;
                    this.mode = mode;
                }
            }
            class ChangeOptionsMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, options, merge = false){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.changeOptions);
                    _define_property1(this, "options", void 0);
                    _define_property1(this, "merge", void 0);
                    this.options = options;
                    this.merge = merge;
                }
            }
            class DisposeMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.dispose);
                }
            }
            class GlobalOptionsMessage {
                constructor(serviceName, options, merge){
                    _define_property1(this, "type", MessageType.globalOptions);
                    _define_property1(this, "serviceName", void 0);
                    _define_property1(this, "options", void 0);
                    _define_property1(this, "merge", void 0);
                    this.serviceName = serviceName;
                    this.options = options;
                    this.merge = merge;
                }
            }
            class ConfigureFeaturesMessage {
                constructor(serviceName, options){
                    _define_property1(this, "type", MessageType.configureFeatures);
                    _define_property1(this, "serviceName", void 0);
                    _define_property1(this, "options", void 0);
                    this.serviceName = serviceName;
                    this.options = options;
                }
            }
            class SignatureHelpMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.signatureHelp);
                    _define_property1(this, "value", void 0);
                    this.value = value;
                }
            }
            class DocumentHighlightMessage extends /* unused pure expression or super */ (null && 0) {
                constructor(sessionId, value){
                    super(sessionId);
                    _define_property1(this, "type", MessageType.documentHighlight);
                    _define_property1(this, "value", void 0);
                    this.value = value;
                }
            }
            var MessageType;
            (function(MessageType) {
                MessageType[MessageType["init"] = 0] = "init";
                MessageType[MessageType["format"] = 1] = "format";
                MessageType[MessageType["complete"] = 2] = "complete";
                MessageType[MessageType["resolveCompletion"] = 3] = "resolveCompletion";
                MessageType[MessageType["change"] = 4] = "change";
                MessageType[MessageType["hover"] = 5] = "hover";
                MessageType[MessageType["validate"] = 6] = "validate";
                MessageType[MessageType["applyDelta"] = 7] = "applyDelta";
                MessageType[MessageType["changeMode"] = 8] = "changeMode";
                MessageType[MessageType["changeOptions"] = 9] = "changeOptions";
                MessageType[MessageType["dispose"] = 10] = "dispose";
                MessageType[MessageType["globalOptions"] = 11] = "globalOptions";
                MessageType[MessageType["configureFeatures"] = 12] = "configureFeatures";
                MessageType[MessageType["signatureHelp"] = 13] = "signatureHelp";
                MessageType[MessageType["documentHighlight"] = 14] = "documentHighlight";
            })(MessageType || (MessageType = {}));
            ; // CONCATENATED MODULE: ./src/services/language-client.ts
            /* provided dependency */ var language_client_console = __nested_webpack_require_878145__(3716);
            function language_client_define_property(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            }
            class LanguageClient extends base_service.BaseService {
                $connectSocket(initializationOptions) {
                    if (this.socket.readyState === WebSocket.OPEN) {
                        listen({
                            webSocket: this.socket,
                            onConnection: (connection)=>{
                                this.$connect(connection, initializationOptions);
                            }
                        });
                        this.socket.dispatchEvent(new Event('open'));
                    } else {
                        listen({
                            webSocket: this.socket,
                            onConnection: (connection)=>{
                                this.$connect(connection, initializationOptions);
                            }
                        });
                    }
                }
                $connectWorker(worker, initializationOptions) {
                    const connection = (0, browser.createProtocolConnection)(new browser.BrowserMessageReader(worker), new browser.BrowserMessageWriter(worker));
                    this.$connect(connection, initializationOptions);
                }
                $connect(connection, initializationOptions) {
                    connection.listen();
                    this.isConnected = true;
                    this.connection = connection;
                    this.sendInitialize(initializationOptions);
                    this.connection.onNotification('textDocument/publishDiagnostics', (result)=>{
                        let postMessage = {
                            "type": MessageType.validate,
                            "sessionId": result.uri.replace(/^file:\/{2,3}/, ""),
                            "value": result.diagnostics
                        };
                        this.ctx.postMessage(postMessage);
                    });
                    this.connection.onNotification('window/showMessage', (params)=>{
                        this.showLog(params);
                    });
                    this.connection.onNotification('window/logMessage', (params)=>{
                        this.showLog(params);
                    });
                    this.connection.onNotification('$/logTrace', (params)=>{
                        this.showTrace(params);
                    });
                    this.connection.onRequest('window/showMessageRequest', (params)=>{
                        this.showLog(params);
                    });
                    this.connection.onRequest('workspace/configuration', (params)=>{
                        language_client_console.log(params);
                    });
                    this.connection.onRequest('client/registerCapability', (params)=>{
                        language_client_console.log(params);
                    });
                    this.connection.onError((e)=>{
                        throw e;
                    });
                    this.connection.onClose(()=>{
                        this.isConnected = false;
                    });
                }
                showLog(params) {
                    switch(params.type){
                        case 1:
                            language_client_console.error(params.message);
                            break;
                        case 2:
                            language_client_console.warn(params.message);
                            break;
                        case 3:
                            language_client_console.info(params.message);
                            break;
                        case 4:
                        default:
                            language_client_console.log(params.message);
                            break;
                    }
                }
                showTrace(params) {
                    language_client_console.log(params.message);
                    if (params.verbose) {
                        language_client_console.log(params.verbose);
                    }
                }
                addDocument(document1) {
                    super.addDocument(document1);
                    const textDocumentMessage = {
                        textDocument: document1
                    };
                    this.enqueueIfNotConnected(()=>this.connection.sendNotification('textDocument/didOpen', textDocumentMessage));
                }
                enqueueIfNotConnected(callback) {
                    if (!this.isConnected) {
                        this.requestsQueue.push(callback);
                    } else {
                        callback();
                    }
                }
                removeDocument(document1) {
                    super.removeDocument(document1);
                    this.enqueueIfNotConnected(()=>this.connection.sendNotification('textDocument/didClose', {
                            textDocument: {
                                uri: document1.uri
                            }
                        }));
                }
                /*
        close() {
            if (this.connection) {
                this.connection.dispose();
            }
            if (this.socket)
                this.socket.close();
        }
    */ sendInitialize(initializationOptions) {
                    if (!this.isConnected) {
                        return;
                    }
                    const message = {
                        capabilities: this.clientCapabilities,
                        initializationOptions: initializationOptions,
                        processId: null,
                        rootUri: "",
                        workspaceFolders: null
                    };
                    this.connection.sendRequest("initialize", message).then((params)=>{
                        this.isInitialized = true;
                        this.serviceCapabilities = params.capabilities;
                        this.connection.sendNotification('initialized', {}).then(()=>{
                            this.connection.sendNotification('workspace/didChangeConfiguration', {
                                settings: {}
                            });
                            this.requestsQueue.forEach((requestCallback)=>requestCallback());
                            this.requestsQueue = [];
                        });
                    });
                }
                applyDeltas(identifier, deltas) {
                    super.applyDeltas(identifier, deltas);
                    if (!this.isConnected) {
                        return;
                    }
                    if (!(this.serviceCapabilities && this.serviceCapabilities.textDocumentSync !== browser_main.TextDocumentSyncKind.Incremental)) {
                        return this.setValue(identifier, this.getDocument(identifier.uri).getText());
                    }
                    const textDocumentChange = {
                        textDocument: {
                            uri: identifier.uri,
                            version: identifier.version
                        },
                        contentChanges: deltas
                    };
                    this.connection.sendNotification('textDocument/didChange', textDocumentChange);
                }
                setValue(identifier, value) {
                    super.setValue(identifier, value);
                    if (!this.isConnected) {
                        return;
                    }
                    const textDocumentChange = {
                        textDocument: {
                            uri: identifier.uri,
                            version: identifier.version
                        },
                        contentChanges: [
                            {
                                text: value
                            }
                        ]
                    };
                    this.connection.sendNotification('textDocument/didChange', textDocumentChange);
                }
                async doHover(document1, position) {
                    var _this_serviceCapabilities;
                    if (!this.isInitialized) {
                        return null;
                    }
                    if (!((_this_serviceCapabilities = this.serviceCapabilities) === null || _this_serviceCapabilities === void 0 ? void 0 : _this_serviceCapabilities.hoverProvider)) {
                        return null;
                    }
                    let options = {
                        textDocument: {
                            uri: document1.uri
                        },
                        position: position
                    };
                    return this.connection.sendRequest('textDocument/hover', options);
                }
                async doComplete(document1, position) {
                    var _this_serviceCapabilities;
                    if (!this.isInitialized) {
                        return null;
                    }
                    if (!((_this_serviceCapabilities = this.serviceCapabilities) === null || _this_serviceCapabilities === void 0 ? void 0 : _this_serviceCapabilities.completionProvider)) {
                        return null;
                    }
                    let options = {
                        textDocument: {
                            uri: document1.uri
                        },
                        position: position
                    };
                    return this.connection.sendRequest('textDocument/completion', options);
                }
                async doResolve(item) {
                    var _this_serviceCapabilities_completionProvider, _this_serviceCapabilities;
                    if (!this.isInitialized) return null;
                    if (!((_this_serviceCapabilities = this.serviceCapabilities) === null || _this_serviceCapabilities === void 0 ? void 0 : (_this_serviceCapabilities_completionProvider = _this_serviceCapabilities.completionProvider) === null || _this_serviceCapabilities_completionProvider === void 0 ? void 0 : _this_serviceCapabilities_completionProvider.resolveProvider)) return null;
                    return this.connection.sendRequest('completionItem/resolve', item["item"]);
                }
                async doValidation(document1) {
                    //TODO: textDocument/diagnostic capability
                    return [];
                }
                async format(document1, range, format) {
                    if (!this.isInitialized) {
                        return [];
                    }
                    if (!(this.serviceCapabilities && (this.serviceCapabilities.documentRangeFormattingProvider || this.serviceCapabilities.documentFormattingProvider))) {
                        return [];
                    }
                    if (!this.serviceCapabilities.documentRangeFormattingProvider) {
                        let options = {
                            textDocument: {
                                uri: document1.uri
                            },
                            options: format
                        };
                        return this.connection.sendRequest('textDocument/formatting', options);
                    } else {
                        let options = {
                            textDocument: {
                                uri: document1.uri
                            },
                            options: format,
                            range: range
                        };
                        return this.connection.sendRequest('textDocument/rangeFormatting', options);
                    }
                }
                setGlobalOptions(options) {
                    super.setGlobalOptions(options);
                    if (!this.isConnected) {
                        this.requestsQueue.push(()=>this.setGlobalOptions(options));
                        return;
                    }
                    const configChanges = {
                        settings: options
                    };
                    this.connection.sendNotification('workspace/didChangeConfiguration', configChanges);
                }
                async findDocumentHighlights(document1, position) {
                    var _this_serviceCapabilities;
                    if (!this.isInitialized) return [];
                    if (!((_this_serviceCapabilities = this.serviceCapabilities) === null || _this_serviceCapabilities === void 0 ? void 0 : _this_serviceCapabilities.documentHighlightProvider)) return [];
                    let options = {
                        textDocument: {
                            uri: document1.uri
                        },
                        position: position
                    };
                    return this.connection.sendRequest('textDocument/documentHighlight', options);
                }
                async provideSignatureHelp(document1, position) {
                    var _this_serviceCapabilities;
                    if (!this.isInitialized) return null;
                    if (!((_this_serviceCapabilities = this.serviceCapabilities) === null || _this_serviceCapabilities === void 0 ? void 0 : _this_serviceCapabilities.signatureHelpProvider)) return null;
                    let options = {
                        textDocument: {
                            uri: document1.uri
                        },
                        position: position
                    };
                    return this.connection.sendRequest('textDocument/signatureHelp', options);
                }
                constructor(serverData, ctx){
                    super(serverData.modes);
                    language_client_define_property(this, "$service", void 0);
                    language_client_define_property(this, "isConnected", false);
                    language_client_define_property(this, "isInitialized", false);
                    language_client_define_property(this, "socket", void 0);
                    language_client_define_property(this, "connection", void 0);
                    language_client_define_property(this, "requestsQueue", []);
                    language_client_define_property(this, "clientCapabilities", {
                        textDocument: {
                            hover: {
                                dynamicRegistration: true,
                                contentFormat: [
                                    'markdown',
                                    'plaintext'
                                ]
                            },
                            synchronization: {
                                dynamicRegistration: true,
                                willSave: false,
                                didSave: false,
                                willSaveWaitUntil: false
                            },
                            formatting: {
                                dynamicRegistration: true
                            },
                            completion: {
                                dynamicRegistration: true,
                                completionItem: {
                                    snippetSupport: true,
                                    commitCharactersSupport: false,
                                    documentationFormat: [
                                        'markdown',
                                        'plaintext'
                                    ],
                                    deprecatedSupport: false,
                                    preselectSupport: false
                                },
                                contextSupport: false
                            },
                            signatureHelp: {
                                signatureInformation: {
                                    documentationFormat: [
                                        'markdown',
                                        'plaintext'
                                    ],
                                    activeParameterSupport: true
                                }
                            },
                            documentHighlight: {
                                dynamicRegistration: true
                            }
                        },
                        workspace: {
                            didChangeConfiguration: {
                                dynamicRegistration: true
                            }
                        }
                    });
                    language_client_define_property(this, "ctx", void 0);
                    this.ctx = ctx;
                    switch(serverData.type){
                        case "webworker":
                            if ('worker' in serverData) {
                                this.$connectWorker(serverData.worker, serverData.initializationOptions);
                            } else {
                                throw new Error("No worker provided");
                            }
                            break;
                        case "socket":
                            if ('socket' in serverData) {
                                this.socket = serverData.socket;
                                this.$connectSocket(serverData.initializationOptions);
                            } else {
                                throw new Error("No socketUrl provided");
                            }
                            break;
                        default:
                            throw new Error("Unknown server type: " + serverData.type);
                    }
                }
            }
        })();
        /******/ return __nested_webpack_exports__;
    /******/ })();
});


/***/ })

}]);