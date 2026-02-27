import { D as __commonJSMin, O as __esmMin, j as __toCommonJS, k as __export, r as require_main, t as BaseService } from "./base-service-EKUWsJ3q.js";
import { n as checkValueAgainstRegexpArray } from "./webworker-CbjDA12w.js";
import { t as CommonConverter } from "./common-converters-ChMj7xWb.js";
var VERSION;
var init_version = __esmMin((() => {
	VERSION = "7.1.1";
}));
function isEmpty$1(arr) {
	return arr && arr.length === 0;
}
function keys(obj) {
	if (obj === void 0 || obj === null) return [];
	return Object.keys(obj);
}
function values(obj) {
	var vals = [];
	var keys$1 = Object.keys(obj);
	for (var i = 0; i < keys$1.length; i++) vals.push(obj[keys$1[i]]);
	return vals;
}
function mapValues(obj, callback) {
	var result = [];
	var objKeys = keys(obj);
	for (var idx = 0; idx < objKeys.length; idx++) {
		var currKey = objKeys[idx];
		result.push(callback.call(null, obj[currKey], currKey));
	}
	return result;
}
function map$10(arr, callback) {
	var result = [];
	for (var idx = 0; idx < arr.length; idx++) result.push(callback.call(null, arr[idx], idx));
	return result;
}
function flatten(arr) {
	var result = [];
	for (var idx = 0; idx < arr.length; idx++) {
		var currItem = arr[idx];
		if (Array.isArray(currItem)) result = result.concat(flatten(currItem));
		else result.push(currItem);
	}
	return result;
}
function first$1(arr) {
	return isEmpty$1(arr) ? void 0 : arr[0];
}
function last$1(arr) {
	var len = arr && arr.length;
	return len ? arr[len - 1] : void 0;
}
function forEach$7(collection, iteratorCallback) {
	/* istanbul ignore else */
	if (Array.isArray(collection)) for (var i = 0; i < collection.length; i++) iteratorCallback.call(null, collection[i], i);
	else if (isObject(collection)) {
		var colKeys = keys(collection);
		for (var i = 0; i < colKeys.length; i++) {
			var key = colKeys[i];
			var value = collection[key];
			iteratorCallback.call(null, value, key);
		}
	} else throw Error("non exhaustive match");
}
function isString(item) {
	return typeof item === "string";
}
function isUndefined(item) {
	return item === void 0;
}
function isFunction$1(item) {
	return item instanceof Function;
}
function drop$1(arr, howMuch) {
	if (howMuch === void 0) howMuch = 1;
	return arr.slice(howMuch, arr.length);
}
function dropRight(arr, howMuch) {
	if (howMuch === void 0) howMuch = 1;
	return arr.slice(0, arr.length - howMuch);
}
function filter$5(arr, predicate) {
	var result = [];
	if (Array.isArray(arr)) for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (predicate.call(null, item)) result.push(item);
	}
	return result;
}
function reject(arr, predicate) {
	return filter$5(arr, function(item) {
		return !predicate(item);
	});
}
function pick$2(obj, predicate) {
	var keys$1 = Object.keys(obj);
	var result = {};
	for (var i = 0; i < keys$1.length; i++) {
		var currKey = keys$1[i];
		var currItem = obj[currKey];
		if (predicate(currItem)) result[currKey] = currItem;
	}
	return result;
}
function has$4(obj, prop) {
	if (isObject(obj)) return obj.hasOwnProperty(prop);
	return false;
}
function contains(arr, item) {
	return find(arr, function(currItem) {
		return currItem === item;
	}) !== void 0 ? true : false;
}
function cloneArr(arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) newArr.push(arr[i]);
	return newArr;
}
function cloneObj(obj) {
	var clonedObj = {};
	for (var key in obj)
 /* istanbul ignore else */
	if (Object.prototype.hasOwnProperty.call(obj, key)) clonedObj[key] = obj[key];
	return clonedObj;
}
function find(arr, predicate) {
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (predicate.call(null, item)) return item;
	}
}
function findAll(arr, predicate) {
	var found = [];
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (predicate.call(null, item)) found.push(item);
	}
	return found;
}
function reduce$3(arrOrObj, iterator, initial) {
	var isArr = Array.isArray(arrOrObj);
	var vals = isArr ? arrOrObj : values(arrOrObj);
	var objKeys = isArr ? [] : keys(arrOrObj);
	var accumulator = initial;
	for (var i = 0; i < vals.length; i++) accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
	return accumulator;
}
function compact(arr) {
	return reject(arr, function(item) {
		return item === null || item === void 0;
	});
}
function uniq(arr, identity) {
	if (identity === void 0) identity = function(item) {
		return item;
	};
	var identities = [];
	return reduce$3(arr, function(result, currItem) {
		var currIdentity = identity(currItem);
		if (contains(identities, currIdentity)) return result;
		else {
			identities.push(currIdentity);
			return result.concat(currItem);
		}
	}, []);
}
function isArray$4(obj) {
	return Array.isArray(obj);
}
function isRegExp$2(obj) {
	return obj instanceof RegExp;
}
function isObject(obj) {
	return obj instanceof Object;
}
function every(arr, predicate) {
	for (var i = 0; i < arr.length; i++) if (!predicate(arr[i], i)) return false;
	return true;
}
function difference$4(arr, values$1) {
	return reject(arr, function(item) {
		return contains(values$1, item);
	});
}
function some(arr, predicate) {
	for (var i = 0; i < arr.length; i++) if (predicate(arr[i])) return true;
	return false;
}
function indexOf(arr, value) {
	for (var i = 0; i < arr.length; i++) if (arr[i] === value) return i;
	return -1;
}
function assign$1(target) {
	var sources = [];
	for (var _i = 1; _i < arguments.length; _i++) sources[_i - 1] = arguments[_i];
	for (var i = 0; i < sources.length; i++) {
		var curSource = sources[i];
		var currSourceKeys = keys(curSource);
		for (var j = 0; j < currSourceKeys.length; j++) {
			var currKey = currSourceKeys[j];
			target[currKey] = curSource[currKey];
		}
	}
	return target;
}
function assignNoOverwrite(target) {
	var sources = [];
	for (var _i = 1; _i < arguments.length; _i++) sources[_i - 1] = arguments[_i];
	for (var i = 0; i < sources.length; i++) {
		var curSource = sources[i];
		var currSourceKeys = keys(curSource);
		for (var j = 0; j < currSourceKeys.length; j++) {
			var currKey = currSourceKeys[j];
			if (!has$4(target, currKey)) target[currKey] = curSource[currKey];
		}
	}
	return target;
}
function defaults() {
	var sources = [];
	for (var _i = 0; _i < arguments.length; _i++) sources[_i] = arguments[_i];
	return assignNoOverwrite.apply(null, [{}].concat(sources));
}
function groupBy$2(arr, groupKeyFunc) {
	var result = {};
	forEach$7(arr, function(item) {
		var currGroupKey = groupKeyFunc(item);
		var currGroupArr = result[currGroupKey];
		if (currGroupArr) currGroupArr.push(item);
		else result[currGroupKey] = [item];
	});
	return result;
}
function merge(obj1, obj2) {
	var result = cloneObj(obj1);
	var keys2 = keys(obj2);
	for (var i = 0; i < keys2.length; i++) {
		var key = keys2[i];
		result[key] = obj2[key];
	}
	return result;
}
function NOOP() {}
function IDENTITY(item) {
	return item;
}
function packArray(holeyArr) {
	var result = [];
	for (var i = 0; i < holeyArr.length; i++) {
		var orgValue = holeyArr[i];
		result.push(orgValue !== void 0 ? orgValue : void 0);
	}
	return result;
}
function PRINT_ERROR(msg) {
	/* istanbul ignore else - can't override global.console in node.js */
	if (console && console.error) console.error("Error: " + msg);
}
function PRINT_WARNING(msg) {
	/* istanbul ignore else - can't override global.console in node.js*/
	if (console && console.warn) console.warn("Warning: " + msg);
}
function isES2015MapSupported() {
	return typeof Map === "function";
}
function applyMixins(derivedCtor, baseCtors) {
	baseCtors.forEach(function(baseCtor) {
		var baseProto = baseCtor.prototype;
		Object.getOwnPropertyNames(baseProto).forEach(function(propName) {
			if (propName === "constructor") return;
			var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
			if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
			else derivedCtor.prototype[propName] = baseCtor.prototype[propName];
		});
	});
}
function toFastProperties(toBecomeFast) {
	function FakeConstructor() {}
	FakeConstructor.prototype = toBecomeFast;
	var fakeInstance = new FakeConstructor();
	function fakeAccess() {
		return typeof fakeInstance.bar;
	}
	fakeAccess();
	fakeAccess();
	return toBecomeFast;
}
function peek(arr) {
	return arr[arr.length - 1];
}
/* istanbul ignore next - for performance tracing*/
function timer(func) {
	var start = (/* @__PURE__ */ new Date()).getTime();
	var val = func();
	return {
		time: (/* @__PURE__ */ new Date()).getTime() - start,
		value: val
	};
}
var init_utils = __esmMin((() => {}));
var require_regexp_to_ast = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		// istanbul ignore next
		if (typeof define === "function" && define.amd)
 // istanbul ignore next
		define([], factory);
		else if (typeof module === "object" && module.exports) module.exports = factory();
		else
 // istanbul ignore next
		root.regexpToAst = factory();
	})(typeof self !== "undefined" ? self : exports, function() {
		function RegExpParser$1() {}
		RegExpParser$1.prototype.saveState = function() {
			return {
				idx: this.idx,
				input: this.input,
				groupIdx: this.groupIdx
			};
		};
		RegExpParser$1.prototype.restoreState = function(newState) {
			this.idx = newState.idx;
			this.input = newState.input;
			this.groupIdx = newState.groupIdx;
		};
		RegExpParser$1.prototype.pattern = function(input) {
			this.idx = 0;
			this.input = input;
			this.groupIdx = 0;
			this.consumeChar("/");
			var value = this.disjunction();
			this.consumeChar("/");
			var flags = {
				type: "Flags",
				loc: {
					begin: this.idx,
					end: input.length
				},
				global: false,
				ignoreCase: false,
				multiLine: false,
				unicode: false,
				sticky: false
			};
			while (this.isRegExpFlag()) switch (this.popChar()) {
				case "g":
					addFlag(flags, "global");
					break;
				case "i":
					addFlag(flags, "ignoreCase");
					break;
				case "m":
					addFlag(flags, "multiLine");
					break;
				case "u":
					addFlag(flags, "unicode");
					break;
				case "y":
					addFlag(flags, "sticky");
					break;
			}
			if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
			return {
				type: "Pattern",
				flags,
				value,
				loc: this.loc(0)
			};
		};
		RegExpParser$1.prototype.disjunction = function() {
			var alts = [];
			var begin = this.idx;
			alts.push(this.alternative());
			while (this.peekChar() === "|") {
				this.consumeChar("|");
				alts.push(this.alternative());
			}
			return {
				type: "Disjunction",
				value: alts,
				loc: this.loc(begin)
			};
		};
		RegExpParser$1.prototype.alternative = function() {
			var terms = [];
			var begin = this.idx;
			while (this.isTerm()) terms.push(this.term());
			return {
				type: "Alternative",
				value: terms,
				loc: this.loc(begin)
			};
		};
		RegExpParser$1.prototype.term = function() {
			if (this.isAssertion()) return this.assertion();
			else return this.atom();
		};
		RegExpParser$1.prototype.assertion = function() {
			var begin = this.idx;
			switch (this.popChar()) {
				case "^": return {
					type: "StartAnchor",
					loc: this.loc(begin)
				};
				case "$": return {
					type: "EndAnchor",
					loc: this.loc(begin)
				};
				case "\\":
					switch (this.popChar()) {
						case "b": return {
							type: "WordBoundary",
							loc: this.loc(begin)
						};
						case "B": return {
							type: "NonWordBoundary",
							loc: this.loc(begin)
						};
					}
					// istanbul ignore next
					throw Error("Invalid Assertion Escape");
				case "(":
					this.consumeChar("?");
					var type;
					switch (this.popChar()) {
						case "=":
							type = "Lookahead";
							break;
						case "!":
							type = "NegativeLookahead";
							break;
					}
					ASSERT_EXISTS(type);
					var disjunction = this.disjunction();
					this.consumeChar(")");
					return {
						type,
						value: disjunction,
						loc: this.loc(begin)
					};
			}
			// istanbul ignore next
			ASSERT_NEVER_REACH_HERE();
		};
		RegExpParser$1.prototype.quantifier = function(isBacktracking) {
			var range;
			var begin = this.idx;
			switch (this.popChar()) {
				case "*":
					range = {
						atLeast: 0,
						atMost: Infinity
					};
					break;
				case "+":
					range = {
						atLeast: 1,
						atMost: Infinity
					};
					break;
				case "?":
					range = {
						atLeast: 0,
						atMost: 1
					};
					break;
				case "{":
					var atLeast = this.integerIncludingZero();
					switch (this.popChar()) {
						case "}":
							range = {
								atLeast,
								atMost: atLeast
							};
							break;
						case ",":
							var atMost;
							if (this.isDigit()) {
								atMost = this.integerIncludingZero();
								range = {
									atLeast,
									atMost
								};
							} else range = {
								atLeast,
								atMost: Infinity
							};
							this.consumeChar("}");
							break;
					}
					if (isBacktracking === true && range === void 0) return;
					ASSERT_EXISTS(range);
					break;
			}
			if (isBacktracking === true && range === void 0) return;
			ASSERT_EXISTS(range);
			if (this.peekChar(0) === "?") {
				this.consumeChar("?");
				range.greedy = false;
			} else range.greedy = true;
			range.type = "Quantifier";
			range.loc = this.loc(begin);
			return range;
		};
		RegExpParser$1.prototype.atom = function() {
			var atom;
			var begin = this.idx;
			switch (this.peekChar()) {
				case ".":
					atom = this.dotAll();
					break;
				case "\\":
					atom = this.atomEscape();
					break;
				case "[":
					atom = this.characterClass();
					break;
				case "(":
					atom = this.group();
					break;
			}
			if (atom === void 0 && this.isPatternCharacter()) atom = this.patternCharacter();
			ASSERT_EXISTS(atom);
			atom.loc = this.loc(begin);
			if (this.isQuantifier()) atom.quantifier = this.quantifier();
			return atom;
		};
		RegExpParser$1.prototype.dotAll = function() {
			this.consumeChar(".");
			return {
				type: "Set",
				complement: true,
				value: [
					cc("\n"),
					cc("\r"),
					cc("\u2028"),
					cc("\u2029")
				]
			};
		};
		RegExpParser$1.prototype.atomEscape = function() {
			this.consumeChar("\\");
			switch (this.peekChar()) {
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9": return this.decimalEscapeAtom();
				case "d":
				case "D":
				case "s":
				case "S":
				case "w":
				case "W": return this.characterClassEscape();
				case "f":
				case "n":
				case "r":
				case "t":
				case "v": return this.controlEscapeAtom();
				case "c": return this.controlLetterEscapeAtom();
				case "0": return this.nulCharacterAtom();
				case "x": return this.hexEscapeSequenceAtom();
				case "u": return this.regExpUnicodeEscapeSequenceAtom();
				default: return this.identityEscapeAtom();
			}
		};
		RegExpParser$1.prototype.decimalEscapeAtom = function() {
			return {
				type: "GroupBackReference",
				value: this.positiveInteger()
			};
		};
		RegExpParser$1.prototype.characterClassEscape = function() {
			var set;
			var complement = false;
			switch (this.popChar()) {
				case "d":
					set = digitsCharCodes;
					break;
				case "D":
					set = digitsCharCodes;
					complement = true;
					break;
				case "s":
					set = whitespaceCodes;
					break;
				case "S":
					set = whitespaceCodes;
					complement = true;
					break;
				case "w":
					set = wordCharCodes;
					break;
				case "W":
					set = wordCharCodes;
					complement = true;
					break;
			}
			ASSERT_EXISTS(set);
			return {
				type: "Set",
				value: set,
				complement
			};
		};
		RegExpParser$1.prototype.controlEscapeAtom = function() {
			var escapeCode;
			switch (this.popChar()) {
				case "f":
					escapeCode = cc("\f");
					break;
				case "n":
					escapeCode = cc("\n");
					break;
				case "r":
					escapeCode = cc("\r");
					break;
				case "t":
					escapeCode = cc("	");
					break;
				case "v":
					escapeCode = cc("\v");
					break;
			}
			ASSERT_EXISTS(escapeCode);
			return {
				type: "Character",
				value: escapeCode
			};
		};
		RegExpParser$1.prototype.controlLetterEscapeAtom = function() {
			this.consumeChar("c");
			var letter = this.popChar();
			if (/[a-zA-Z]/.test(letter) === false) throw Error("Invalid ");
			return {
				type: "Character",
				value: letter.toUpperCase().charCodeAt(0) - 64
			};
		};
		RegExpParser$1.prototype.nulCharacterAtom = function() {
			this.consumeChar("0");
			return {
				type: "Character",
				value: cc("\0")
			};
		};
		RegExpParser$1.prototype.hexEscapeSequenceAtom = function() {
			this.consumeChar("x");
			return this.parseHexDigits(2);
		};
		RegExpParser$1.prototype.regExpUnicodeEscapeSequenceAtom = function() {
			this.consumeChar("u");
			return this.parseHexDigits(4);
		};
		RegExpParser$1.prototype.identityEscapeAtom = function() {
			return {
				type: "Character",
				value: cc(this.popChar())
			};
		};
		RegExpParser$1.prototype.classPatternCharacterAtom = function() {
			switch (this.peekChar()) {
				case "\n":
				case "\r":
				case "\u2028":
				case "\u2029":
				case "\\":
				case "]": throw Error("TBD");
				default: return {
					type: "Character",
					value: cc(this.popChar())
				};
			}
		};
		RegExpParser$1.prototype.characterClass = function() {
			var set = [];
			var complement = false;
			this.consumeChar("[");
			if (this.peekChar(0) === "^") {
				this.consumeChar("^");
				complement = true;
			}
			while (this.isClassAtom()) {
				var from = this.classAtom();
				if (from.type === "Character" && this.isRangeDash()) {
					this.consumeChar("-");
					var to = this.classAtom();
					if (to.type === "Character") {
						if (to.value < from.value) throw Error("Range out of order in character class");
						set.push({
							from: from.value,
							to: to.value
						});
					} else {
						insertToSet(from.value, set);
						set.push(cc("-"));
						insertToSet(to.value, set);
					}
				} else insertToSet(from.value, set);
			}
			this.consumeChar("]");
			return {
				type: "Set",
				complement,
				value: set
			};
		};
		RegExpParser$1.prototype.classAtom = function() {
			switch (this.peekChar()) {
				case "]":
				case "\n":
				case "\r":
				case "\u2028":
				case "\u2029": throw Error("TBD");
				case "\\": return this.classEscape();
				default: return this.classPatternCharacterAtom();
			}
		};
		RegExpParser$1.prototype.classEscape = function() {
			this.consumeChar("\\");
			switch (this.peekChar()) {
				case "b":
					this.consumeChar("b");
					return {
						type: "Character",
						value: cc("\b")
					};
				case "d":
				case "D":
				case "s":
				case "S":
				case "w":
				case "W": return this.characterClassEscape();
				case "f":
				case "n":
				case "r":
				case "t":
				case "v": return this.controlEscapeAtom();
				case "c": return this.controlLetterEscapeAtom();
				case "0": return this.nulCharacterAtom();
				case "x": return this.hexEscapeSequenceAtom();
				case "u": return this.regExpUnicodeEscapeSequenceAtom();
				default: return this.identityEscapeAtom();
			}
		};
		RegExpParser$1.prototype.group = function() {
			var capturing = true;
			this.consumeChar("(");
			switch (this.peekChar(0)) {
				case "?":
					this.consumeChar("?");
					this.consumeChar(":");
					capturing = false;
					break;
				default:
					this.groupIdx++;
					break;
			}
			var value = this.disjunction();
			this.consumeChar(")");
			var groupAst = {
				type: "Group",
				capturing,
				value
			};
			if (capturing) groupAst.idx = this.groupIdx;
			return groupAst;
		};
		RegExpParser$1.prototype.positiveInteger = function() {
			var number = this.popChar();
			// istanbul ignore next - can't ever get here due to previous lookahead checks
			if (decimalPatternNoZero.test(number) === false) throw Error("Expecting a positive integer");
			while (decimalPattern.test(this.peekChar(0))) number += this.popChar();
			return parseInt(number, 10);
		};
		RegExpParser$1.prototype.integerIncludingZero = function() {
			var number = this.popChar();
			if (decimalPattern.test(number) === false) throw Error("Expecting an integer");
			while (decimalPattern.test(this.peekChar(0))) number += this.popChar();
			return parseInt(number, 10);
		};
		RegExpParser$1.prototype.patternCharacter = function() {
			var nextChar = this.popChar();
			switch (nextChar) {
				case "\n":
				case "\r":
				case "\u2028":
				case "\u2029":
				case "^":
				case "$":
				case "\\":
				case ".":
				case "*":
				case "+":
				case "?":
				case "(":
				case ")":
				case "[":
				case "|":
 // istanbul ignore next
				throw Error("TBD");
				default: return {
					type: "Character",
					value: cc(nextChar)
				};
			}
		};
		RegExpParser$1.prototype.isRegExpFlag = function() {
			switch (this.peekChar(0)) {
				case "g":
				case "i":
				case "m":
				case "u":
				case "y": return true;
				default: return false;
			}
		};
		RegExpParser$1.prototype.isRangeDash = function() {
			return this.peekChar() === "-" && this.isClassAtom(1);
		};
		RegExpParser$1.prototype.isDigit = function() {
			return decimalPattern.test(this.peekChar(0));
		};
		RegExpParser$1.prototype.isClassAtom = function(howMuch) {
			if (howMuch === void 0) howMuch = 0;
			switch (this.peekChar(howMuch)) {
				case "]":
				case "\n":
				case "\r":
				case "\u2028":
				case "\u2029": return false;
				default: return true;
			}
		};
		RegExpParser$1.prototype.isTerm = function() {
			return this.isAtom() || this.isAssertion();
		};
		RegExpParser$1.prototype.isAtom = function() {
			if (this.isPatternCharacter()) return true;
			switch (this.peekChar(0)) {
				case ".":
				case "\\":
				case "[":
				case "(": return true;
				default: return false;
			}
		};
		RegExpParser$1.prototype.isAssertion = function() {
			switch (this.peekChar(0)) {
				case "^":
				case "$": return true;
				case "\\": switch (this.peekChar(1)) {
					case "b":
					case "B": return true;
					default: return false;
				}
				case "(": return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
				default: return false;
			}
		};
		RegExpParser$1.prototype.isQuantifier = function() {
			var prevState = this.saveState();
			try {
				return this.quantifier(true) !== void 0;
			} catch (e) {
				return false;
			} finally {
				this.restoreState(prevState);
			}
		};
		RegExpParser$1.prototype.isPatternCharacter = function() {
			switch (this.peekChar()) {
				case "^":
				case "$":
				case "\\":
				case ".":
				case "*":
				case "+":
				case "?":
				case "(":
				case ")":
				case "[":
				case "|":
				case "/":
				case "\n":
				case "\r":
				case "\u2028":
				case "\u2029": return false;
				default: return true;
			}
		};
		RegExpParser$1.prototype.parseHexDigits = function(howMany) {
			var hexString = "";
			for (var i$1 = 0; i$1 < howMany; i$1++) {
				var hexChar = this.popChar();
				if (hexDigitPattern.test(hexChar) === false) throw Error("Expecting a HexDecimal digits");
				hexString += hexChar;
			}
			return {
				type: "Character",
				value: parseInt(hexString, 16)
			};
		};
		RegExpParser$1.prototype.peekChar = function(howMuch) {
			if (howMuch === void 0) howMuch = 0;
			return this.input[this.idx + howMuch];
		};
		RegExpParser$1.prototype.popChar = function() {
			var nextChar = this.peekChar(0);
			this.consumeChar();
			return nextChar;
		};
		RegExpParser$1.prototype.consumeChar = function(char) {
			if (char !== void 0 && this.input[this.idx] !== char) throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
			if (this.idx >= this.input.length) throw Error("Unexpected end of input");
			this.idx++;
		};
		RegExpParser$1.prototype.loc = function(begin) {
			return {
				begin,
				end: this.idx
			};
		};
		var hexDigitPattern = /[0-9a-fA-F]/;
		var decimalPattern = /[0-9]/;
		var decimalPatternNoZero = /[1-9]/;
		function cc(char) {
			return char.charCodeAt(0);
		}
		function insertToSet(item, set) {
			if (item.length !== void 0) item.forEach(function(subItem) {
				set.push(subItem);
			});
			else set.push(item);
		}
		function addFlag(flagObj, flagKey) {
			if (flagObj[flagKey] === true) throw "duplicate flag " + flagKey;
			flagObj[flagKey] = true;
		}
		function ASSERT_EXISTS(obj) {
			// istanbul ignore next
			if (obj === void 0) throw Error("Internal Error - Should never get here!");
		}
		// istanbul ignore next
		function ASSERT_NEVER_REACH_HERE() {
			throw Error("Internal Error - Should never get here!");
		}
		var i;
		var digitsCharCodes = [];
		for (i = cc("0"); i <= cc("9"); i++) digitsCharCodes.push(i);
		var wordCharCodes = [cc("_")].concat(digitsCharCodes);
		for (i = cc("a"); i <= cc("z"); i++) wordCharCodes.push(i);
		for (i = cc("A"); i <= cc("Z"); i++) wordCharCodes.push(i);
		var whitespaceCodes = [
			cc(" "),
			cc("\f"),
			cc("\n"),
			cc("\r"),
			cc("	"),
			cc("\v"),
			cc("	"),
			cc("\xA0"),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc(" "),
			cc("\u2028"),
			cc("\u2029"),
			cc(" "),
			cc(" "),
			cc("　"),
			cc("﻿")
		];
		function BaseRegExpVisitor$2() {}
		BaseRegExpVisitor$2.prototype.visitChildren = function(node) {
			for (var key in node) {
				var child = node[key];
				/* istanbul ignore else */
				if (node.hasOwnProperty(key)) {
					if (child.type !== void 0) this.visit(child);
					else if (Array.isArray(child)) child.forEach(function(subChild) {
						this.visit(subChild);
					}, this);
				}
			}
		};
		BaseRegExpVisitor$2.prototype.visit = function(node) {
			switch (node.type) {
				case "Pattern":
					this.visitPattern(node);
					break;
				case "Flags":
					this.visitFlags(node);
					break;
				case "Disjunction":
					this.visitDisjunction(node);
					break;
				case "Alternative":
					this.visitAlternative(node);
					break;
				case "StartAnchor":
					this.visitStartAnchor(node);
					break;
				case "EndAnchor":
					this.visitEndAnchor(node);
					break;
				case "WordBoundary":
					this.visitWordBoundary(node);
					break;
				case "NonWordBoundary":
					this.visitNonWordBoundary(node);
					break;
				case "Lookahead":
					this.visitLookahead(node);
					break;
				case "NegativeLookahead":
					this.visitNegativeLookahead(node);
					break;
				case "Character":
					this.visitCharacter(node);
					break;
				case "Set":
					this.visitSet(node);
					break;
				case "Group":
					this.visitGroup(node);
					break;
				case "GroupBackReference":
					this.visitGroupBackReference(node);
					break;
				case "Quantifier":
					this.visitQuantifier(node);
					break;
			}
			this.visitChildren(node);
		};
		BaseRegExpVisitor$2.prototype.visitPattern = function(node) {};
		BaseRegExpVisitor$2.prototype.visitFlags = function(node) {};
		BaseRegExpVisitor$2.prototype.visitDisjunction = function(node) {};
		BaseRegExpVisitor$2.prototype.visitAlternative = function(node) {};
		BaseRegExpVisitor$2.prototype.visitStartAnchor = function(node) {};
		BaseRegExpVisitor$2.prototype.visitEndAnchor = function(node) {};
		BaseRegExpVisitor$2.prototype.visitWordBoundary = function(node) {};
		BaseRegExpVisitor$2.prototype.visitNonWordBoundary = function(node) {};
		BaseRegExpVisitor$2.prototype.visitLookahead = function(node) {};
		BaseRegExpVisitor$2.prototype.visitNegativeLookahead = function(node) {};
		BaseRegExpVisitor$2.prototype.visitCharacter = function(node) {};
		BaseRegExpVisitor$2.prototype.visitSet = function(node) {};
		BaseRegExpVisitor$2.prototype.visitGroup = function(node) {};
		BaseRegExpVisitor$2.prototype.visitGroupBackReference = function(node) {};
		BaseRegExpVisitor$2.prototype.visitQuantifier = function(node) {};
		return {
			RegExpParser: RegExpParser$1,
			BaseRegExpVisitor: BaseRegExpVisitor$2,
			VERSION: "0.5.0"
		};
	});
}));
function getRegExpAst(regExp) {
	var regExpStr = regExp.toString();
	if (regExpAstCache.hasOwnProperty(regExpStr)) return regExpAstCache[regExpStr];
	else {
		var regExpAst = regExpParser.pattern(regExpStr);
		regExpAstCache[regExpStr] = regExpAst;
		return regExpAst;
	}
}
function clearRegExpParserCache() {
	regExpAstCache = {};
}
var import_regexp_to_ast$2, regExpAstCache, regExpParser;
var init_reg_exp_parser = __esmMin((() => {
	import_regexp_to_ast$2 = require_regexp_to_ast();
	regExpAstCache = {};
	regExpParser = new import_regexp_to_ast$2.RegExpParser();
}));
function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
	if (ensureOptimizations === void 0) ensureOptimizations = false;
	try {
		var ast = getRegExpAst(regExp);
		return firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
	} catch (e) {
		/* istanbul ignore next */
		if (e.message === complementErrorMessage) {
			if (ensureOptimizations) PRINT_WARNING("" + failedOptimizationPrefixMsg + ("	Unable to optimize: < " + regExp.toString() + " >\n") + "	Complement Sets cannot be automatically optimized.\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
		} else {
			var msgSuffix = "";
			if (ensureOptimizations) msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
			PRINT_ERROR(failedOptimizationPrefixMsg + "\n" + ("	Failed parsing: < " + regExp.toString() + " >\n") + ("	Using the regexp-to-ast library version: " + import_regexp_to_ast$1.VERSION + "\n") + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + msgSuffix);
		}
	}
	return [];
}
function firstCharOptimizedIndices(ast, result, ignoreCase) {
	switch (ast.type) {
		case "Disjunction":
			for (var i = 0; i < ast.value.length; i++) firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
			break;
		case "Alternative":
			var terms = ast.value;
			for (var i = 0; i < terms.length; i++) {
				var term = terms[i];
				switch (term.type) {
					case "EndAnchor":
					case "GroupBackReference":
					case "Lookahead":
					case "NegativeLookahead":
					case "StartAnchor":
					case "WordBoundary":
					case "NonWordBoundary": continue;
				}
				var atom = term;
				switch (atom.type) {
					case "Character":
						addOptimizedIdxToResult(atom.value, result, ignoreCase);
						break;
					case "Set":
						if (atom.complement === true) throw Error(complementErrorMessage);
						forEach$7(atom.value, function(code) {
							if (typeof code === "number") addOptimizedIdxToResult(code, result, ignoreCase);
							else {
								var range = code;
								if (ignoreCase === true) for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
								else {
									for (var rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
									if (range.to >= minOptimizationVal) {
										var minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal;
										var maxUnOptVal = range.to;
										var minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
										var maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
										for (var currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) result[currOptIdx] = currOptIdx;
									}
								}
							}
						});
						break;
					case "Group":
						firstCharOptimizedIndices(atom.value, result, ignoreCase);
						break;
					default: throw Error("Non Exhaustive Match");
				}
				var isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
				if (atom.type === "Group" && isWholeOptional(atom) === false || atom.type !== "Group" && isOptionalQuantifier === false) break;
			}
			break;
		default: throw Error("non exhaustive match!");
	}
	return values(result);
}
function addOptimizedIdxToResult(code, result, ignoreCase) {
	var optimizedCharIdx = charCodeToOptimizedIndex(code);
	result[optimizedCharIdx] = optimizedCharIdx;
	if (ignoreCase === true) handleIgnoreCase(code, result);
}
function handleIgnoreCase(code, result) {
	var char = String.fromCharCode(code);
	var upperChar = char.toUpperCase();
	/* istanbul ignore else */
	if (upperChar !== char) {
		var optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
		result[optimizedCharIdx] = optimizedCharIdx;
	} else {
		var lowerChar = char.toLowerCase();
		if (lowerChar !== char) {
			var optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
			result[optimizedCharIdx] = optimizedCharIdx;
		}
	}
}
function findCode(setNode, targetCharCodes) {
	return find(setNode.value, function(codeOrRange) {
		if (typeof codeOrRange === "number") return contains(targetCharCodes, codeOrRange);
		else {
			var range_1 = codeOrRange;
			return find(targetCharCodes, function(targetCode) {
				return range_1.from <= targetCode && targetCode <= range_1.to;
			}) !== void 0;
		}
	});
}
function isWholeOptional(ast) {
	if (ast.quantifier && ast.quantifier.atLeast === 0) return true;
	if (!ast.value) return false;
	return isArray$4(ast.value) ? every(ast.value, isWholeOptional) : isWholeOptional(ast.value);
}
function canMatchCharCode(charCodes, pattern) {
	if (pattern instanceof RegExp) {
		var ast = getRegExpAst(pattern);
		var charCodeFinder = new CharCodeFinder(charCodes);
		charCodeFinder.visit(ast);
		return charCodeFinder.found;
	} else return find(pattern, function(char) {
		return contains(charCodes, char.charCodeAt(0));
	}) !== void 0;
}
var import_regexp_to_ast$1, __extends$10, complementErrorMessage, failedOptimizationPrefixMsg, CharCodeFinder;
var init_reg_exp = __esmMin((() => {
	import_regexp_to_ast$1 = require_regexp_to_ast();
	init_utils();
	init_reg_exp_parser();
	init_lexer();
	__extends$10 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	complementErrorMessage = "Complement Sets are not supported for first char optimization";
	failedOptimizationPrefixMsg = "Unable to use \"first char\" lexer optimizations:\n";
	CharCodeFinder = function(_super) {
		__extends$10(CharCodeFinder$1, _super);
		function CharCodeFinder$1(targetCharCodes) {
			var _this = _super.call(this) || this;
			_this.targetCharCodes = targetCharCodes;
			_this.found = false;
			return _this;
		}
		CharCodeFinder$1.prototype.visitChildren = function(node) {
			if (this.found === true) return;
			switch (node.type) {
				case "Lookahead":
					this.visitLookahead(node);
					return;
				case "NegativeLookahead":
					this.visitNegativeLookahead(node);
					return;
			}
			_super.prototype.visitChildren.call(this, node);
		};
		CharCodeFinder$1.prototype.visitCharacter = function(node) {
			if (contains(this.targetCharCodes, node.value)) this.found = true;
		};
		CharCodeFinder$1.prototype.visitSet = function(node) {
			if (node.complement) {
				if (findCode(node, this.targetCharCodes) === void 0) this.found = true;
			} else if (findCode(node, this.targetCharCodes) !== void 0) this.found = true;
		};
		return CharCodeFinder$1;
	}(import_regexp_to_ast$1.BaseRegExpVisitor);
}));
function analyzeTokenTypes(tokenTypes, options) {
	options = defaults(options, {
		useSticky: SUPPORT_STICKY,
		debug: false,
		safeMode: false,
		positionTracking: "full",
		lineTerminatorCharacters: ["\r", "\n"],
		tracer: function(msg, action) {
			return action();
		}
	});
	var tracer = options.tracer;
	tracer("initCharCodeToOptimizedIndexMap", function() {
		initCharCodeToOptimizedIndexMap();
	});
	var onlyRelevantTypes;
	tracer("Reject Lexer.NA", function() {
		onlyRelevantTypes = reject(tokenTypes, function(currType) {
			return currType[PATTERN] === Lexer$1.NA;
		});
	});
	var hasCustom = false;
	var allTransformedPatterns;
	tracer("Transform Patterns", function() {
		hasCustom = false;
		allTransformedPatterns = map$10(onlyRelevantTypes, function(currType) {
			var currPattern = currType[PATTERN];
			/* istanbul ignore else */
			if (isRegExp$2(currPattern)) {
				var regExpSource = currPattern.source;
				if (regExpSource.length === 1 && regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) return regExpSource;
				else if (regExpSource.length === 2 && regExpSource[0] === "\\" && !contains([
					"d",
					"D",
					"s",
					"S",
					"t",
					"r",
					"n",
					"t",
					"0",
					"c",
					"b",
					"B",
					"f",
					"v",
					"w",
					"W"
				], regExpSource[1])) return regExpSource[1];
				else return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
			} else if (isFunction$1(currPattern)) {
				hasCustom = true;
				return { exec: currPattern };
			} else if (has$4(currPattern, "exec")) {
				hasCustom = true;
				return currPattern;
			} else if (typeof currPattern === "string") if (currPattern.length === 1) return currPattern;
			else {
				var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
				var wrappedRegExp = new RegExp(escapedRegExpString);
				return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
			}
			else throw Error("non exhaustive match");
		});
	});
	var patternIdxToType;
	var patternIdxToGroup;
	var patternIdxToLongerAltIdx;
	var patternIdxToPushMode;
	var patternIdxToPopMode;
	tracer("misc mapping", function() {
		patternIdxToType = map$10(onlyRelevantTypes, function(currType) {
			return currType.tokenTypeIdx;
		});
		patternIdxToGroup = map$10(onlyRelevantTypes, function(clazz) {
			var groupName = clazz.GROUP;
			/* istanbul ignore next */
			if (groupName === Lexer$1.SKIPPED) return;
			else if (isString(groupName)) return groupName;
			else if (isUndefined(groupName)) return false;
			else throw Error("non exhaustive match");
		});
		patternIdxToLongerAltIdx = map$10(onlyRelevantTypes, function(clazz) {
			var longerAltType = clazz.LONGER_ALT;
			if (longerAltType) return indexOf(onlyRelevantTypes, longerAltType);
		});
		patternIdxToPushMode = map$10(onlyRelevantTypes, function(clazz) {
			return clazz.PUSH_MODE;
		});
		patternIdxToPopMode = map$10(onlyRelevantTypes, function(clazz) {
			return has$4(clazz, "POP_MODE");
		});
	});
	var patternIdxToCanLineTerminator;
	tracer("Line Terminator Handling", function() {
		var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
		patternIdxToCanLineTerminator = map$10(onlyRelevantTypes, function(tokType) {
			return false;
		});
		if (options.positionTracking !== "onlyOffset") patternIdxToCanLineTerminator = map$10(onlyRelevantTypes, function(tokType) {
			if (has$4(tokType, "LINE_BREAKS")) return tokType.LINE_BREAKS;
			else if (checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false) return canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
		});
	});
	var patternIdxToIsCustom;
	var patternIdxToShort;
	var emptyGroups;
	var patternIdxToConfig;
	tracer("Misc Mapping #2", function() {
		patternIdxToIsCustom = map$10(onlyRelevantTypes, isCustomPattern);
		patternIdxToShort = map$10(allTransformedPatterns, isShortPattern);
		emptyGroups = reduce$3(onlyRelevantTypes, function(acc, clazz) {
			var groupName = clazz.GROUP;
			if (isString(groupName) && !(groupName === Lexer$1.SKIPPED)) acc[groupName] = [];
			return acc;
		}, {});
		patternIdxToConfig = map$10(allTransformedPatterns, function(x, idx) {
			return {
				pattern: allTransformedPatterns[idx],
				longerAlt: patternIdxToLongerAltIdx[idx],
				canLineTerminator: patternIdxToCanLineTerminator[idx],
				isCustom: patternIdxToIsCustom[idx],
				short: patternIdxToShort[idx],
				group: patternIdxToGroup[idx],
				push: patternIdxToPushMode[idx],
				pop: patternIdxToPopMode[idx],
				tokenTypeIdx: patternIdxToType[idx],
				tokenType: onlyRelevantTypes[idx]
			};
		});
	});
	var canBeOptimized = true;
	var charCodeToPatternIdxToConfig = [];
	if (!options.safeMode) tracer("First Char Optimization", function() {
		charCodeToPatternIdxToConfig = reduce$3(onlyRelevantTypes, function(result, currTokType, idx) {
			if (typeof currTokType.PATTERN === "string") addToMapOfArrays(result, charCodeToOptimizedIndex(currTokType.PATTERN.charCodeAt(0)), patternIdxToConfig[idx]);
			else if (isArray$4(currTokType.START_CHARS_HINT)) {
				var lastOptimizedIdx_1;
				forEach$7(currTokType.START_CHARS_HINT, function(charOrInt) {
					var currOptimizedIdx = charCodeToOptimizedIndex(typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt);
					/* istanbul ignore else */
					if (lastOptimizedIdx_1 !== currOptimizedIdx) {
						lastOptimizedIdx_1 = currOptimizedIdx;
						addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
					}
				});
			} else if (isRegExp$2(currTokType.PATTERN)) if (currTokType.PATTERN.unicode) {
				canBeOptimized = false;
				if (options.ensureOptimizations) PRINT_ERROR("" + failedOptimizationPrefixMsg + ("	Unable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n") + "	The regexp unicode flag is not currently supported by the regexp-to-ast library.\n	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
			} else {
				var optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
				/* istanbul ignore if */
				if (isEmpty$1(optimizedCodes)) canBeOptimized = false;
				forEach$7(optimizedCodes, function(code) {
					addToMapOfArrays(result, code, patternIdxToConfig[idx]);
				});
			}
			else {
				if (options.ensureOptimizations) PRINT_ERROR("" + failedOptimizationPrefixMsg + ("	TokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n") + "	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE");
				canBeOptimized = false;
			}
			return result;
		}, []);
	});
	tracer("ArrayPacking", function() {
		charCodeToPatternIdxToConfig = packArray(charCodeToPatternIdxToConfig);
	});
	return {
		emptyGroups,
		patternIdxToConfig,
		charCodeToPatternIdxToConfig,
		hasCustom,
		canBeOptimized
	};
}
function validatePatterns(tokenTypes, validModesNames) {
	var errors = [];
	var missingResult = findMissingPatterns(tokenTypes);
	errors = errors.concat(missingResult.errors);
	var invalidResult = findInvalidPatterns(missingResult.valid);
	var validTokenTypes = invalidResult.valid;
	errors = errors.concat(invalidResult.errors);
	errors = errors.concat(validateRegExpPattern(validTokenTypes));
	errors = errors.concat(findInvalidGroupType(validTokenTypes));
	errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
	errors = errors.concat(findUnreachablePatterns(validTokenTypes));
	return errors;
}
function validateRegExpPattern(tokenTypes) {
	var errors = [];
	var withRegExpPatterns = filter$5(tokenTypes, function(currTokType) {
		return isRegExp$2(currTokType[PATTERN]);
	});
	errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
	errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
	errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
	errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
	errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
	return errors;
}
function findMissingPatterns(tokenTypes) {
	var tokenTypesWithMissingPattern = filter$5(tokenTypes, function(currType) {
		return !has$4(currType, PATTERN);
	});
	return {
		errors: map$10(tokenTypesWithMissingPattern, function(currType) {
			return {
				message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
				type: LexerDefinitionErrorType.MISSING_PATTERN,
				tokenTypes: [currType]
			};
		}),
		valid: difference$4(tokenTypes, tokenTypesWithMissingPattern)
	};
}
function findInvalidPatterns(tokenTypes) {
	var tokenTypesWithInvalidPattern = filter$5(tokenTypes, function(currType) {
		var pattern = currType[PATTERN];
		return !isRegExp$2(pattern) && !isFunction$1(pattern) && !has$4(pattern, "exec") && !isString(pattern);
	});
	return {
		errors: map$10(tokenTypesWithInvalidPattern, function(currType) {
			return {
				message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
				type: LexerDefinitionErrorType.INVALID_PATTERN,
				tokenTypes: [currType]
			};
		}),
		valid: difference$4(tokenTypes, tokenTypesWithInvalidPattern)
	};
}
function findEndOfInputAnchor(tokenTypes) {
	var EndAnchorFinder = function(_super) {
		__extends$9(EndAnchorFinder$1, _super);
		function EndAnchorFinder$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.found = false;
			return _this;
		}
		EndAnchorFinder$1.prototype.visitEndAnchor = function(node) {
			this.found = true;
		};
		return EndAnchorFinder$1;
	}(import_regexp_to_ast.BaseRegExpVisitor);
	return map$10(filter$5(tokenTypes, function(currType) {
		var pattern = currType[PATTERN];
		try {
			var regexpAst = getRegExpAst(pattern);
			var endAnchorVisitor = new EndAnchorFinder();
			endAnchorVisitor.visit(regexpAst);
			return endAnchorVisitor.found;
		} catch (e) {
			/* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
			return end_of_input.test(pattern.source);
		}
	}), function(currType) {
		return {
			message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
			type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findEmptyMatchRegExps(tokenTypes) {
	return map$10(filter$5(tokenTypes, function(currType) {
		return currType[PATTERN].test("");
	}), function(currType) {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
			type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
			tokenTypes: [currType]
		};
	});
}
function findStartOfInputAnchor(tokenTypes) {
	var StartAnchorFinder = function(_super) {
		__extends$9(StartAnchorFinder$1, _super);
		function StartAnchorFinder$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.found = false;
			return _this;
		}
		StartAnchorFinder$1.prototype.visitStartAnchor = function(node) {
			this.found = true;
		};
		return StartAnchorFinder$1;
	}(import_regexp_to_ast.BaseRegExpVisitor);
	return map$10(filter$5(tokenTypes, function(currType) {
		var pattern = currType[PATTERN];
		try {
			var regexpAst = getRegExpAst(pattern);
			var startAnchorVisitor = new StartAnchorFinder();
			startAnchorVisitor.visit(regexpAst);
			return startAnchorVisitor.found;
		} catch (e) {
			/* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
			return start_of_input.test(pattern.source);
		}
	}), function(currType) {
		return {
			message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
			type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findUnsupportedFlags(tokenTypes) {
	return map$10(filter$5(tokenTypes, function(currType) {
		var pattern = currType[PATTERN];
		return pattern instanceof RegExp && (pattern.multiline || pattern.global);
	}), function(currType) {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
			type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findDuplicatePatterns(tokenTypes) {
	var found = [];
	var identicalPatterns = map$10(tokenTypes, function(outerType) {
		return reduce$3(tokenTypes, function(result, innerType) {
			if (outerType.PATTERN.source === innerType.PATTERN.source && !contains(found, innerType) && innerType.PATTERN !== Lexer$1.NA) {
				found.push(innerType);
				result.push(innerType);
				return result;
			}
			return result;
		}, []);
	});
	identicalPatterns = compact(identicalPatterns);
	return map$10(filter$5(identicalPatterns, function(currIdenticalSet) {
		return currIdenticalSet.length > 1;
	}), function(setOfIdentical) {
		var tokenTypeNames = map$10(setOfIdentical, function(currType) {
			return currType.name;
		});
		return {
			message: "The same RegExp pattern ->" + first$1(setOfIdentical).PATTERN + "<-" + ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
			type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
			tokenTypes: setOfIdentical
		};
	});
}
function findInvalidGroupType(tokenTypes) {
	return map$10(filter$5(tokenTypes, function(clazz) {
		if (!has$4(clazz, "GROUP")) return false;
		var group = clazz.GROUP;
		return group !== Lexer$1.SKIPPED && group !== Lexer$1.NA && !isString(group);
	}), function(currType) {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
			type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findModesThatDoNotExist(tokenTypes, validModes) {
	return map$10(filter$5(tokenTypes, function(clazz) {
		return clazz.PUSH_MODE !== void 0 && !contains(validModes, clazz.PUSH_MODE);
	}), function(tokType) {
		return {
			message: "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-which does not exist",
			type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
			tokenTypes: [tokType]
		};
	});
}
function findUnreachablePatterns(tokenTypes) {
	var errors = [];
	var canBeTested = reduce$3(tokenTypes, function(result, tokType, idx) {
		var pattern = tokType.PATTERN;
		if (pattern === Lexer$1.NA) return result;
		if (isString(pattern)) result.push({
			str: pattern,
			idx,
			tokenType: tokType
		});
		else if (isRegExp$2(pattern) && noMetaChar(pattern)) result.push({
			str: pattern.source,
			idx,
			tokenType: tokType
		});
		return result;
	}, []);
	forEach$7(tokenTypes, function(tokType, testIdx) {
		forEach$7(canBeTested, function(_a) {
			var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
			if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
				var msg = "Token: ->" + tokenType.name + "<- can never be matched.\n" + ("Because it appears AFTER the Token Type ->" + tokType.name + "<-") + "in the lexer's definition.\nSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
				errors.push({
					message: msg,
					type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
					tokenTypes: [tokType, tokenType]
				});
			}
		});
	});
	return errors;
}
function testTokenType(str, pattern) {
	/* istanbul ignore else */
	if (isRegExp$2(pattern)) {
		var regExpArray = pattern.exec(str);
		return regExpArray !== null && regExpArray.index === 0;
	} else if (isFunction$1(pattern)) return pattern(str, 0, [], {});
	else if (has$4(pattern, "exec")) return pattern.exec(str, 0, [], {});
	else if (typeof pattern === "string") return pattern === str;
	else throw Error("non exhaustive match");
}
function noMetaChar(regExp) {
	return find([
		".",
		"\\",
		"[",
		"]",
		"|",
		"^",
		"$",
		"(",
		")",
		"?",
		"*",
		"+",
		"{"
	], function(char) {
		return regExp.source.indexOf(char) !== -1;
	}) === void 0;
}
function addStartOfInput(pattern) {
	var flags = pattern.ignoreCase ? "i" : "";
	return new RegExp("^(?:" + pattern.source + ")", flags);
}
function addStickyFlag(pattern) {
	var flags = pattern.ignoreCase ? "iy" : "y";
	return new RegExp("" + pattern.source, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
	var errors = [];
	if (!has$4(lexerDefinition, DEFAULT_MODE)) errors.push({
		message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
	});
	if (!has$4(lexerDefinition, MODES)) errors.push({
		message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
	});
	if (has$4(lexerDefinition, MODES) && has$4(lexerDefinition, DEFAULT_MODE) && !has$4(lexerDefinition.modes, lexerDefinition.defaultMode)) errors.push({
		message: "A MultiMode Lexer cannot be initialized with a " + DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">which does not exist\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
	});
	if (has$4(lexerDefinition, MODES)) forEach$7(lexerDefinition.modes, function(currModeValue, currModeName) {
		forEach$7(currModeValue, function(currTokType, currIdx) {
			if (isUndefined(currTokType)) errors.push({
				message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
				type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
			});
		});
	});
	return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
	var warnings = [];
	var hasAnyLineBreak = false;
	var concreteTokenTypes = reject(compact(flatten(mapValues(lexerDefinition.modes, function(tokTypes) {
		return tokTypes;
	}))), function(currType) {
		return currType[PATTERN] === Lexer$1.NA;
	});
	var terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
	if (trackLines) forEach$7(concreteTokenTypes, function(tokType) {
		var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
		if (currIssue !== false) {
			var warningDescriptor = {
				message: buildLineBreakIssueMessage(tokType, currIssue),
				type: currIssue.issue,
				tokenType: tokType
			};
			warnings.push(warningDescriptor);
		} else if (has$4(tokType, "LINE_BREAKS")) {
			if (tokType.LINE_BREAKS === true) hasAnyLineBreak = true;
		} else if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) hasAnyLineBreak = true;
	});
	if (trackLines && !hasAnyLineBreak) warnings.push({
		message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
		type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
	});
	return warnings;
}
function cloneEmptyGroups(emptyGroups) {
	var clonedResult = {};
	forEach$7(keys(emptyGroups), function(currKey) {
		var currGroupValue = emptyGroups[currKey];
		/* istanbul ignore else */
		if (isArray$4(currGroupValue)) clonedResult[currKey] = [];
		else throw Error("non exhaustive match");
	});
	return clonedResult;
}
function isCustomPattern(tokenType) {
	var pattern = tokenType.PATTERN;
	/* istanbul ignore else */
	if (isRegExp$2(pattern)) return false;
	else if (isFunction$1(pattern)) return true;
	else if (has$4(pattern, "exec")) return true;
	else if (isString(pattern)) return false;
	else throw Error("non exhaustive match");
}
function isShortPattern(pattern) {
	if (isString(pattern) && pattern.length === 1) return pattern.charCodeAt(0);
	else return false;
}
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
	if (has$4(tokType, "LINE_BREAKS")) return false;
	else if (isRegExp$2(tokType.PATTERN)) {
		try {
			canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
		} catch (e) {
			/* istanbul ignore next - to test this we would have to mock <canMatchCharCode> to throw an error */
			return {
				issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
				errMsg: e.message
			};
		}
		return false;
	} else if (isString(tokType.PATTERN)) return false;
	else if (isCustomPattern(tokType)) return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
	else throw Error("non exhaustive match");
}
function buildLineBreakIssueMessage(tokType, details) {
	/* istanbul ignore else */
	if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) return "Warning: unable to identify line terminator usage in pattern.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + ("	 Root cause: " + details.errMsg + ".\n") + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
	else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n" + ("	The problem is in the <" + tokType.name + "> Token Type\n") + "	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
	else throw Error("non exhaustive match");
}
function getCharCodes(charsOrCodes) {
	return map$10(charsOrCodes, function(numOrString) {
		if (isString(numOrString) && numOrString.length > 0) return numOrString.charCodeAt(0);
		else return numOrString;
	});
}
function addToMapOfArrays(map$11, key, value) {
	if (map$11[key] === void 0) map$11[key] = [value];
	else map$11[key].push(value);
}
function charCodeToOptimizedIndex(charCode) {
	return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
}
function initCharCodeToOptimizedIndexMap() {
	if (isEmpty$1(charCodeToOptimizedIdxMap)) {
		charCodeToOptimizedIdxMap = new Array(65536);
		for (var i = 0; i < 65536; i++) charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
	}
}
var import_regexp_to_ast, __extends$9, PATTERN, DEFAULT_MODE, MODES, SUPPORT_STICKY, end_of_input, start_of_input, LineTerminatorOptimizedTester, minOptimizationVal, charCodeToOptimizedIdxMap;
var init_lexer = __esmMin((() => {
	import_regexp_to_ast = require_regexp_to_ast();
	init_lexer_public();
	init_utils();
	init_reg_exp();
	init_reg_exp_parser();
	__extends$9 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	PATTERN = "PATTERN";
	DEFAULT_MODE = "defaultMode";
	MODES = "modes";
	SUPPORT_STICKY = typeof (/* @__PURE__ */ new RegExp("(?:)")).sticky === "boolean";
	end_of_input = /[^\\][\$]/;
	start_of_input = /[^\\[][\^]|^\^/;
	LineTerminatorOptimizedTester = {
		test: function(text) {
			var len = text.length;
			for (var i = this.lastIndex; i < len; i++) {
				var c = text.charCodeAt(i);
				if (c === 10) {
					this.lastIndex = i + 1;
					return true;
				} else if (c === 13) {
					if (text.charCodeAt(i + 1) === 10) this.lastIndex = i + 2;
					else this.lastIndex = i + 1;
					return true;
				}
			}
			return false;
		},
		lastIndex: 0
	};
	minOptimizationVal = 256;
	charCodeToOptimizedIdxMap = [];
}));
function tokenStructuredMatcher(tokInstance, tokConstructor) {
	var instanceType = tokInstance.tokenTypeIdx;
	if (instanceType === tokConstructor.tokenTypeIdx) return true;
	else return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
}
function tokenStructuredMatcherNoCategories(token, tokType) {
	return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
function augmentTokenTypes(tokenTypes) {
	var tokenTypesAndParents = expandCategories(tokenTypes);
	assignTokenDefaultProps(tokenTypesAndParents);
	assignCategoriesMapProp(tokenTypesAndParents);
	assignCategoriesTokensProp(tokenTypesAndParents);
	forEach$7(tokenTypesAndParents, function(tokType) {
		tokType.isParent = tokType.categoryMatches.length > 0;
	});
}
function expandCategories(tokenTypes) {
	var result = cloneArr(tokenTypes);
	var categories = tokenTypes;
	var searching = true;
	while (searching) {
		categories = compact(flatten(map$10(categories, function(currTokType) {
			return currTokType.CATEGORIES;
		})));
		var newCategories = difference$4(categories, result);
		result = result.concat(newCategories);
		if (isEmpty$1(newCategories)) searching = false;
		else categories = newCategories;
	}
	return result;
}
function assignTokenDefaultProps(tokenTypes) {
	forEach$7(tokenTypes, function(currTokType) {
		if (!hasShortKeyProperty(currTokType)) {
			tokenIdxToClass[tokenShortNameIdx] = currTokType;
			currTokType.tokenTypeIdx = tokenShortNameIdx++;
		}
		if (hasCategoriesProperty(currTokType) && !isArray$4(currTokType.CATEGORIES)) currTokType.CATEGORIES = [currTokType.CATEGORIES];
		if (!hasCategoriesProperty(currTokType)) currTokType.CATEGORIES = [];
		if (!hasExtendingTokensTypesProperty(currTokType)) currTokType.categoryMatches = [];
		if (!hasExtendingTokensTypesMapProperty(currTokType)) currTokType.categoryMatchesMap = {};
	});
}
function assignCategoriesTokensProp(tokenTypes) {
	forEach$7(tokenTypes, function(currTokType) {
		currTokType.categoryMatches = [];
		forEach$7(currTokType.categoryMatchesMap, function(val, key) {
			currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
		});
	});
}
function assignCategoriesMapProp(tokenTypes) {
	forEach$7(tokenTypes, function(currTokType) {
		singleAssignCategoriesToksMap([], currTokType);
	});
}
function singleAssignCategoriesToksMap(path, nextNode) {
	forEach$7(path, function(pathNode) {
		nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
	});
	forEach$7(nextNode.CATEGORIES, function(nextCategory) {
		var newPath = path.concat(nextNode);
		if (!contains(newPath, nextCategory)) singleAssignCategoriesToksMap(newPath, nextCategory);
	});
}
function hasShortKeyProperty(tokType) {
	return has$4(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
	return has$4(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
	return has$4(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
	return has$4(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
	return has$4(tokType, "tokenTypeIdx");
}
var tokenShortNameIdx, tokenIdxToClass;
var init_tokens = __esmMin((() => {
	init_utils();
	tokenShortNameIdx = 1;
	tokenIdxToClass = {};
}));
var defaultLexerErrorProvider;
var init_lexer_errors_public = __esmMin((() => {
	defaultLexerErrorProvider = {
		buildUnableToPopLexerModeMessage: function(token) {
			return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
		},
		buildUnexpectedCharactersMessage: function(fullText, startOffset, length, line, column) {
			return "unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + "," + (" skipped " + length + " characters.");
		}
	};
}));
var LexerDefinitionErrorType, DEFAULT_LEXER_CONFIG, Lexer$1;
var init_lexer_public = __esmMin((() => {
	init_lexer();
	init_utils();
	init_tokens();
	init_lexer_errors_public();
	init_reg_exp_parser();
	(function(LexerDefinitionErrorType$1) {
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
		LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
	})(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
	DEFAULT_LEXER_CONFIG = {
		deferDefinitionErrorsHandling: false,
		positionTracking: "full",
		lineTerminatorsPattern: /\n|\r\n?/g,
		lineTerminatorCharacters: ["\n", "\r"],
		ensureOptimizations: false,
		safeMode: false,
		errorMessageProvider: defaultLexerErrorProvider,
		traceInitPerf: false,
		skipValidations: false
	};
	Object.freeze(DEFAULT_LEXER_CONFIG);
	Lexer$1 = function() {
		function Lexer$2(lexerDefinition, config) {
			var _this = this;
			if (config === void 0) config = DEFAULT_LEXER_CONFIG;
			this.lexerDefinition = lexerDefinition;
			this.lexerDefinitionErrors = [];
			this.lexerDefinitionWarning = [];
			this.patternIdxToConfig = {};
			this.charCodeToPatternIdxToConfig = {};
			this.modes = [];
			this.emptyGroups = {};
			this.config = void 0;
			this.trackStartLines = true;
			this.trackEndLines = true;
			this.hasCustom = false;
			this.canModeBeOptimized = {};
			if (typeof config === "boolean") throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
			this.config = merge(DEFAULT_LEXER_CONFIG, config);
			var traceInitVal = this.config.traceInitPerf;
			if (traceInitVal === true) {
				this.traceInitMaxIdent = Infinity;
				this.traceInitPerf = true;
			} else if (typeof traceInitVal === "number") {
				this.traceInitMaxIdent = traceInitVal;
				this.traceInitPerf = true;
			}
			this.traceInitIndent = -1;
			this.TRACE_INIT("Lexer Constructor", function() {
				var actualDefinition;
				var hasOnlySingleMode = true;
				_this.TRACE_INIT("Lexer Config handling", function() {
					if (_this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) _this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
					else if (_this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
					if (config.safeMode && config.ensureOptimizations) throw Error("\"safeMode\" and \"ensureOptimizations\" flags are mutually exclusive.");
					_this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking);
					_this.trackEndLines = /full/i.test(_this.config.positionTracking);
					if (isArray$4(lexerDefinition)) {
						actualDefinition = { modes: {} };
						actualDefinition.modes[DEFAULT_MODE] = cloneArr(lexerDefinition);
						actualDefinition[DEFAULT_MODE] = DEFAULT_MODE;
					} else {
						hasOnlySingleMode = false;
						actualDefinition = cloneObj(lexerDefinition);
					}
				});
				if (_this.config.skipValidations === false) {
					_this.TRACE_INIT("performRuntimeChecks", function() {
						_this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
					});
					_this.TRACE_INIT("performWarningRuntimeChecks", function() {
						_this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
					});
				}
				actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
				forEach$7(actualDefinition.modes, function(currModeValue, currModeName) {
					actualDefinition.modes[currModeName] = reject(currModeValue, function(currTokType) {
						return isUndefined(currTokType);
					});
				});
				var allModeNames = keys(actualDefinition.modes);
				forEach$7(actualDefinition.modes, function(currModDef, currModName) {
					_this.TRACE_INIT("Mode: <" + currModName + "> processing", function() {
						_this.modes.push(currModName);
						if (_this.config.skipValidations === false) _this.TRACE_INIT("validatePatterns", function() {
							_this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
						});
						if (isEmpty$1(_this.lexerDefinitionErrors)) {
							augmentTokenTypes(currModDef);
							var currAnalyzeResult_1;
							_this.TRACE_INIT("analyzeTokenTypes", function() {
								currAnalyzeResult_1 = analyzeTokenTypes(currModDef, {
									lineTerminatorCharacters: _this.config.lineTerminatorCharacters,
									positionTracking: config.positionTracking,
									ensureOptimizations: config.ensureOptimizations,
									safeMode: config.safeMode,
									tracer: _this.TRACE_INIT.bind(_this)
								});
							});
							_this.patternIdxToConfig[currModName] = currAnalyzeResult_1.patternIdxToConfig;
							_this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult_1.charCodeToPatternIdxToConfig;
							_this.emptyGroups = merge(_this.emptyGroups, currAnalyzeResult_1.emptyGroups);
							_this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom;
							_this.canModeBeOptimized[currModName] = currAnalyzeResult_1.canBeOptimized;
						}
					});
				});
				_this.defaultMode = actualDefinition.defaultMode;
				if (!isEmpty$1(_this.lexerDefinitionErrors) && !_this.config.deferDefinitionErrorsHandling) {
					var allErrMessagesString = map$10(_this.lexerDefinitionErrors, function(error) {
						return error.message;
					}).join("-----------------------\n");
					throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
				}
				forEach$7(_this.lexerDefinitionWarning, function(warningDescriptor) {
					PRINT_WARNING(warningDescriptor.message);
				});
				_this.TRACE_INIT("Choosing sub-methods implementations", function() {
					if (SUPPORT_STICKY) {
						_this.chopInput = IDENTITY;
						_this.match = _this.matchWithTest;
					} else {
						_this.updateLastIndex = NOOP;
						_this.match = _this.matchWithExec;
					}
					if (hasOnlySingleMode) _this.handleModes = NOOP;
					if (_this.trackStartLines === false) _this.computeNewColumn = IDENTITY;
					if (_this.trackEndLines === false) _this.updateTokenEndLineColumnLocation = NOOP;
					if (/full/i.test(_this.config.positionTracking)) _this.createTokenInstance = _this.createFullToken;
					else if (/onlyStart/i.test(_this.config.positionTracking)) _this.createTokenInstance = _this.createStartOnlyToken;
					else if (/onlyOffset/i.test(_this.config.positionTracking)) _this.createTokenInstance = _this.createOffsetOnlyToken;
					else throw Error("Invalid <positionTracking> config option: \"" + _this.config.positionTracking + "\"");
					if (_this.hasCustom) {
						_this.addToken = _this.addTokenUsingPush;
						_this.handlePayload = _this.handlePayloadWithCustom;
					} else {
						_this.addToken = _this.addTokenUsingMemberAccess;
						_this.handlePayload = _this.handlePayloadNoCustom;
					}
				});
				_this.TRACE_INIT("Failed Optimization Warnings", function() {
					var unOptimizedModes = reduce$3(_this.canModeBeOptimized, function(cannotBeOptimized, canBeOptimized, modeName) {
						if (canBeOptimized === false) cannotBeOptimized.push(modeName);
						return cannotBeOptimized;
					}, []);
					if (config.ensureOptimizations && !isEmpty$1(unOptimizedModes)) throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + " > cannot be optimized.\n	 Disable the \"ensureOptimizations\" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n	 Or inspect the console log for details on how to resolve these issues.");
				});
				_this.TRACE_INIT("clearRegExpParserCache", function() {
					clearRegExpParserCache();
				});
				_this.TRACE_INIT("toFastProperties", function() {
					toFastProperties(_this);
				});
			});
		}
		Lexer$2.prototype.tokenize = function(text, initialMode) {
			if (initialMode === void 0) initialMode = this.defaultMode;
			if (!isEmpty$1(this.lexerDefinitionErrors)) {
				var allErrMessagesString = map$10(this.lexerDefinitionErrors, function(error) {
					return error.message;
				}).join("-----------------------\n");
				throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
			}
			return this.tokenizeInternal(text, initialMode);
		};
		Lexer$2.prototype.tokenizeInternal = function(text, initialMode) {
			var _this = this, i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match;
			var orgText = text;
			var orgLength = orgText.length;
			var offset = 0;
			var matchedTokensIndex = 0;
			var guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
			var matchedTokens = new Array(guessedNumberOfTokens);
			var errors = [];
			var line = this.trackStartLines ? 1 : void 0;
			var column = this.trackStartLines ? 1 : void 0;
			var groups = cloneEmptyGroups(this.emptyGroups);
			var trackLines = this.trackStartLines;
			var lineTerminatorPattern = this.config.lineTerminatorsPattern;
			var currModePatternsLength = 0;
			var patternIdxToConfig = [];
			var currCharCodeToPatternIdxToConfig = [];
			var modeStack = [];
			var emptyArray = [];
			Object.freeze(emptyArray);
			var getPossiblePatterns = void 0;
			function getPossiblePatternsSlow() {
				return patternIdxToConfig;
			}
			function getPossiblePatternsOptimized(charCode) {
				var optimizedCharIdx = charCodeToOptimizedIndex(charCode);
				var possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
				if (possiblePatterns === void 0) return emptyArray;
				else return possiblePatterns;
			}
			var pop_mode = function(popToken) {
				if (modeStack.length === 1 && popToken.tokenType.PUSH_MODE === void 0) {
					var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
					errors.push({
						offset: popToken.startOffset,
						line: popToken.startLine !== void 0 ? popToken.startLine : void 0,
						column: popToken.startColumn !== void 0 ? popToken.startColumn : void 0,
						length: popToken.image.length,
						message: msg_1
					});
				} else {
					modeStack.pop();
					var newMode = last$1(modeStack);
					patternIdxToConfig = _this.patternIdxToConfig[newMode];
					currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode];
					currModePatternsLength = patternIdxToConfig.length;
					var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && _this.config.safeMode === false;
					if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) getPossiblePatterns = getPossiblePatternsOptimized;
					else getPossiblePatterns = getPossiblePatternsSlow;
				}
			};
			function push_mode(newMode) {
				modeStack.push(newMode);
				currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
				patternIdxToConfig = this.patternIdxToConfig[newMode];
				currModePatternsLength = patternIdxToConfig.length;
				currModePatternsLength = patternIdxToConfig.length;
				var modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
				if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) getPossiblePatterns = getPossiblePatternsOptimized;
				else getPossiblePatterns = getPossiblePatternsSlow;
			}
			push_mode.call(this, initialMode);
			var currConfig;
			while (offset < orgLength) {
				matchedImage = null;
				var nextCharCode = orgText.charCodeAt(offset);
				var chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
				var chosenPatternsLength = chosenPatternIdxToConfig.length;
				for (i = 0; i < chosenPatternsLength; i++) {
					currConfig = chosenPatternIdxToConfig[i];
					var currPattern = currConfig.pattern;
					payload = null;
					var singleCharCode = currConfig.short;
					if (singleCharCode !== false) {
						if (nextCharCode === singleCharCode) matchedImage = currPattern;
					} else if (currConfig.isCustom === true) {
						match = currPattern.exec(orgText, offset, matchedTokens, groups);
						if (match !== null) {
							matchedImage = match[0];
							if (match.payload !== void 0) payload = match.payload;
						} else matchedImage = null;
					} else {
						this.updateLastIndex(currPattern, offset);
						matchedImage = this.match(currPattern, text, offset);
					}
					if (matchedImage !== null) {
						longerAltIdx = currConfig.longerAlt;
						if (longerAltIdx !== void 0) {
							var longerAltConfig = patternIdxToConfig[longerAltIdx];
							var longerAltPattern = longerAltConfig.pattern;
							altPayload = null;
							if (longerAltConfig.isCustom === true) {
								match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
								if (match !== null) {
									matchAltImage = match[0];
									if (match.payload !== void 0) altPayload = match.payload;
								} else matchAltImage = null;
							} else {
								this.updateLastIndex(longerAltPattern, offset);
								matchAltImage = this.match(longerAltPattern, text, offset);
							}
							if (matchAltImage && matchAltImage.length > matchedImage.length) {
								matchedImage = matchAltImage;
								payload = altPayload;
								currConfig = longerAltConfig;
							}
						}
						break;
					}
				}
				if (matchedImage !== null) {
					imageLength = matchedImage.length;
					group = currConfig.group;
					if (group !== void 0) {
						tokType = currConfig.tokenTypeIdx;
						newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
						this.handlePayload(newToken, payload);
						if (group === false) matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
						else groups[group].push(newToken);
					}
					text = this.chopInput(text, imageLength);
					offset = offset + imageLength;
					column = this.computeNewColumn(column, imageLength);
					if (trackLines === true && currConfig.canLineTerminator === true) {
						var numOfLTsInMatch = 0;
						var foundTerminator = void 0;
						var lastLTEndOffset = void 0;
						lineTerminatorPattern.lastIndex = 0;
						do {
							foundTerminator = lineTerminatorPattern.test(matchedImage);
							if (foundTerminator === true) {
								lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
								numOfLTsInMatch++;
							}
						} while (foundTerminator === true);
						if (numOfLTsInMatch !== 0) {
							line = line + numOfLTsInMatch;
							column = imageLength - lastLTEndOffset;
							this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
						}
					}
					this.handleModes(currConfig, pop_mode, push_mode, newToken);
				} else {
					var errorStartOffset = offset;
					var errorLine = line;
					var errorColumn = column;
					var foundResyncPoint = false;
					while (!foundResyncPoint && offset < orgLength) {
						orgText.charCodeAt(offset);
						text = this.chopInput(text, 1);
						offset++;
						for (j = 0; j < currModePatternsLength; j++) {
							var currConfig_1 = patternIdxToConfig[j];
							var currPattern = currConfig_1.pattern;
							var singleCharCode = currConfig_1.short;
							if (singleCharCode !== false) {
								if (orgText.charCodeAt(offset) === singleCharCode) foundResyncPoint = true;
							} else if (currConfig_1.isCustom === true) foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
							else {
								this.updateLastIndex(currPattern, offset);
								foundResyncPoint = currPattern.exec(text) !== null;
							}
							if (foundResyncPoint === true) break;
						}
					}
					errLength = offset - errorStartOffset;
					msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
					errors.push({
						offset: errorStartOffset,
						line: errorLine,
						column: errorColumn,
						length: errLength,
						message: msg
					});
				}
			}
			if (!this.hasCustom) matchedTokens.length = matchedTokensIndex;
			return {
				tokens: matchedTokens,
				groups,
				errors
			};
		};
		Lexer$2.prototype.handleModes = function(config, pop_mode, push_mode, newToken) {
			if (config.pop === true) {
				var pushMode = config.push;
				pop_mode(newToken);
				if (pushMode !== void 0) push_mode.call(this, pushMode);
			} else if (config.push !== void 0) push_mode.call(this, config.push);
		};
		Lexer$2.prototype.chopInput = function(text, length) {
			return text.substring(length);
		};
		Lexer$2.prototype.updateLastIndex = function(regExp, newLastIndex) {
			regExp.lastIndex = newLastIndex;
		};
		Lexer$2.prototype.updateTokenEndLineColumnLocation = function(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
			var lastCharIsLT, fixForEndingInLT;
			if (group !== void 0) {
				lastCharIsLT = lastLTIdx === imageLength - 1;
				fixForEndingInLT = lastCharIsLT ? -1 : 0;
				if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
					newToken.endLine = line + fixForEndingInLT;
					newToken.endColumn = column - 1 + -fixForEndingInLT;
				}
			}
		};
		Lexer$2.prototype.computeNewColumn = function(oldColumn, imageLength) {
			return oldColumn + imageLength;
		};
		/* istanbul ignore next - place holder */
		Lexer$2.prototype.createTokenInstance = function() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
			return null;
		};
		Lexer$2.prototype.createOffsetOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType) {
			return {
				image,
				startOffset,
				tokenTypeIdx,
				tokenType
			};
		};
		Lexer$2.prototype.createStartOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
			return {
				image,
				startOffset,
				startLine,
				startColumn,
				tokenTypeIdx,
				tokenType
			};
		};
		Lexer$2.prototype.createFullToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
			return {
				image,
				startOffset,
				endOffset: startOffset + imageLength - 1,
				startLine,
				endLine: startLine,
				startColumn,
				endColumn: startColumn + imageLength - 1,
				tokenTypeIdx,
				tokenType
			};
		};
		/* istanbul ignore next - place holder */
		Lexer$2.prototype.addToken = function(tokenVector, index, tokenToAdd) {
			return 666;
		};
		Lexer$2.prototype.addTokenUsingPush = function(tokenVector, index, tokenToAdd) {
			tokenVector.push(tokenToAdd);
			return index;
		};
		Lexer$2.prototype.addTokenUsingMemberAccess = function(tokenVector, index, tokenToAdd) {
			tokenVector[index] = tokenToAdd;
			index++;
			return index;
		};
		/* istanbul ignore next - place holder */
		Lexer$2.prototype.handlePayload = function(token, payload) {};
		Lexer$2.prototype.handlePayloadNoCustom = function(token, payload) {};
		Lexer$2.prototype.handlePayloadWithCustom = function(token, payload) {
			if (payload !== null) token.payload = payload;
		};
		/* istanbul ignore next - place holder to be replaced with chosen alternative at runtime */
		Lexer$2.prototype.match = function(pattern, text, offset) {
			return null;
		};
		Lexer$2.prototype.matchWithTest = function(pattern, text, offset) {
			if (pattern.test(text) === true) return text.substring(offset, pattern.lastIndex);
			return null;
		};
		Lexer$2.prototype.matchWithExec = function(pattern, text) {
			var regExpArray = pattern.exec(text);
			return regExpArray !== null ? regExpArray[0] : regExpArray;
		};
		Lexer$2.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
			if (this.traceInitPerf === true) {
				this.traceInitIndent++;
				var indent$1 = new Array(this.traceInitIndent + 1).join("	");
				if (this.traceInitIndent < this.traceInitMaxIdent) console.log(indent$1 + "--> <" + phaseDesc + ">");
				var _a = timer(phaseImpl), time = _a.time, value = _a.value;
				/* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
				var traceMethod = time > 10 ? console.warn : console.log;
				if (this.traceInitIndent < this.traceInitMaxIdent) traceMethod(indent$1 + "<-- <" + phaseDesc + "> time: " + time + "ms");
				this.traceInitIndent--;
				return value;
			} else return phaseImpl();
		};
		Lexer$2.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
		Lexer$2.NA = /NOT_APPLICABLE/;
		return Lexer$2;
	}();
}));
function tokenLabel(tokType) {
	if (hasTokenLabel(tokType)) return tokType.LABEL;
	else return tokType.name;
}
function tokenName(tokType) {
	return tokType.name;
}
function hasTokenLabel(obj) {
	return isString(obj.LABEL) && obj.LABEL !== "";
}
function createToken$1(config) {
	return createTokenInternal(config);
}
function createTokenInternal(config) {
	var pattern = config.pattern;
	var tokenType = {};
	tokenType.name = config.name;
	if (!isUndefined(pattern)) tokenType.PATTERN = pattern;
	if (has$4(config, PARENT)) throw "The parent property is no longer supported.\nSee: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";
	if (has$4(config, CATEGORIES)) tokenType.CATEGORIES = config[CATEGORIES];
	augmentTokenTypes([tokenType]);
	if (has$4(config, LABEL)) tokenType.LABEL = config[LABEL];
	if (has$4(config, GROUP)) tokenType.GROUP = config[GROUP];
	if (has$4(config, POP_MODE)) tokenType.POP_MODE = config[POP_MODE];
	if (has$4(config, PUSH_MODE)) tokenType.PUSH_MODE = config[PUSH_MODE];
	if (has$4(config, LONGER_ALT)) tokenType.LONGER_ALT = config[LONGER_ALT];
	if (has$4(config, LINE_BREAKS)) tokenType.LINE_BREAKS = config[LINE_BREAKS];
	if (has$4(config, START_CHARS_HINT)) tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
	return tokenType;
}
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
	return {
		image,
		startOffset,
		endOffset,
		startLine,
		endLine,
		startColumn,
		endColumn,
		tokenTypeIdx: tokType.tokenTypeIdx,
		tokenType: tokType
	};
}
function tokenMatcher$1(token, tokType) {
	return tokenStructuredMatcher(token, tokType);
}
var PARENT, CATEGORIES, LABEL, GROUP, PUSH_MODE, POP_MODE, LONGER_ALT, LINE_BREAKS, START_CHARS_HINT, EOF;
var init_tokens_public = __esmMin((() => {
	init_utils();
	init_lexer_public();
	init_tokens();
	PARENT = "parent";
	CATEGORIES = "categories";
	LABEL = "label";
	GROUP = "group";
	PUSH_MODE = "push_mode";
	POP_MODE = "pop_mode";
	LONGER_ALT = "longer_alt";
	LINE_BREAKS = "line_breaks";
	START_CHARS_HINT = "start_chars_hint";
	EOF = createToken$1({
		name: "EOF",
		pattern: Lexer$1.NA
	});
	augmentTokenTypes([EOF]);
}));
function serializeGrammar(topRules) {
	return map$10(topRules, serializeProduction);
}
function serializeProduction(node) {
	function convertDefinition(definition) {
		return map$10(definition, serializeProduction);
	}
	/* istanbul ignore else */
	if (node instanceof NonTerminal) return {
		type: "NonTerminal",
		name: node.nonTerminalName,
		idx: node.idx
	};
	else if (node instanceof Alternative) return {
		type: "Alternative",
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Option) return {
		type: "Option",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof RepetitionMandatory) return {
		type: "RepetitionMandatory",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof RepetitionMandatoryWithSeparator) return {
		type: "RepetitionMandatoryWithSeparator",
		idx: node.idx,
		separator: serializeProduction(new Terminal({ terminalType: node.separator })),
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof RepetitionWithSeparator) return {
		type: "RepetitionWithSeparator",
		idx: node.idx,
		separator: serializeProduction(new Terminal({ terminalType: node.separator })),
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Repetition) return {
		type: "Repetition",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Alternation) return {
		type: "Alternation",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Terminal) {
		var serializedTerminal = {
			type: "Terminal",
			name: node.terminalType.name,
			label: tokenLabel(node.terminalType),
			idx: node.idx
		};
		var pattern = node.terminalType.PATTERN;
		if (node.terminalType.PATTERN) serializedTerminal.pattern = isRegExp$2(pattern) ? pattern.source : pattern;
		return serializedTerminal;
	} else if (node instanceof Rule) return {
		type: "Rule",
		name: node.name,
		orgText: node.orgText,
		definition: convertDefinition(node.definition)
	};
	else throw Error("non exhaustive match");
}
var __extends$8, AbstractProduction, NonTerminal, Rule, Alternative, Option, RepetitionMandatory, RepetitionMandatoryWithSeparator, Repetition, RepetitionWithSeparator, Alternation, Terminal;
var init_gast_public = __esmMin((() => {
	init_utils();
	init_tokens_public();
	__extends$8 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	AbstractProduction = function() {
		function AbstractProduction$1(_definition) {
			this._definition = _definition;
		}
		Object.defineProperty(AbstractProduction$1.prototype, "definition", {
			get: function() {
				return this._definition;
			},
			set: function(value) {
				this._definition = value;
			},
			enumerable: false,
			configurable: true
		});
		AbstractProduction$1.prototype.accept = function(visitor) {
			visitor.visit(this);
			forEach$7(this.definition, function(prod) {
				prod.accept(visitor);
			});
		};
		return AbstractProduction$1;
	}();
	NonTerminal = function(_super) {
		__extends$8(NonTerminal$1, _super);
		function NonTerminal$1(options) {
			var _this = _super.call(this, []) || this;
			_this.idx = 1;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		Object.defineProperty(NonTerminal$1.prototype, "definition", {
			get: function() {
				if (this.referencedRule !== void 0) return this.referencedRule.definition;
				return [];
			},
			set: function(definition) {},
			enumerable: false,
			configurable: true
		});
		NonTerminal$1.prototype.accept = function(visitor) {
			visitor.visit(this);
		};
		return NonTerminal$1;
	}(AbstractProduction);
	Rule = function(_super) {
		__extends$8(Rule$1, _super);
		function Rule$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.orgText = "";
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return Rule$1;
	}(AbstractProduction);
	Alternative = function(_super) {
		__extends$8(Alternative$1, _super);
		function Alternative$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.ignoreAmbiguities = false;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return Alternative$1;
	}(AbstractProduction);
	Option = function(_super) {
		__extends$8(Option$1, _super);
		function Option$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.idx = 1;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return Option$1;
	}(AbstractProduction);
	RepetitionMandatory = function(_super) {
		__extends$8(RepetitionMandatory$1, _super);
		function RepetitionMandatory$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.idx = 1;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return RepetitionMandatory$1;
	}(AbstractProduction);
	RepetitionMandatoryWithSeparator = function(_super) {
		__extends$8(RepetitionMandatoryWithSeparator$1, _super);
		function RepetitionMandatoryWithSeparator$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.idx = 1;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return RepetitionMandatoryWithSeparator$1;
	}(AbstractProduction);
	Repetition = function(_super) {
		__extends$8(Repetition$1, _super);
		function Repetition$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.idx = 1;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return Repetition$1;
	}(AbstractProduction);
	RepetitionWithSeparator = function(_super) {
		__extends$8(RepetitionWithSeparator$1, _super);
		function RepetitionWithSeparator$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.idx = 1;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		return RepetitionWithSeparator$1;
	}(AbstractProduction);
	Alternation = function(_super) {
		__extends$8(Alternation$1, _super);
		function Alternation$1(options) {
			var _this = _super.call(this, options.definition) || this;
			_this.idx = 1;
			_this.ignoreAmbiguities = false;
			_this.hasPredicates = false;
			assign$1(_this, pick$2(options, function(v) {
				return v !== void 0;
			}));
			return _this;
		}
		Object.defineProperty(Alternation$1.prototype, "definition", {
			get: function() {
				return this._definition;
			},
			set: function(value) {
				this._definition = value;
			},
			enumerable: false,
			configurable: true
		});
		return Alternation$1;
	}(AbstractProduction);
	Terminal = function() {
		function Terminal$1(options) {
			this.idx = 1;
			assign$1(this, pick$2(options, function(v) {
				return v !== void 0;
			}));
		}
		Terminal$1.prototype.accept = function(visitor) {
			visitor.visit(this);
		};
		return Terminal$1;
	}();
}));
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
	return [new Option({ definition: [new Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition) })].concat(currRest, prevRest);
}
var RestWalker;
var init_rest = __esmMin((() => {
	init_utils();
	init_gast_public();
	RestWalker = function() {
		function RestWalker$1() {}
		RestWalker$1.prototype.walk = function(prod, prevRest) {
			var _this = this;
			if (prevRest === void 0) prevRest = [];
			forEach$7(prod.definition, function(subProd, index) {
				var currRest = drop$1(prod.definition, index + 1);
				/* istanbul ignore else */
				if (subProd instanceof NonTerminal) _this.walkProdRef(subProd, currRest, prevRest);
				else if (subProd instanceof Terminal) _this.walkTerminal(subProd, currRest, prevRest);
				else if (subProd instanceof Alternative) _this.walkFlat(subProd, currRest, prevRest);
				else if (subProd instanceof Option) _this.walkOption(subProd, currRest, prevRest);
				else if (subProd instanceof RepetitionMandatory) _this.walkAtLeastOne(subProd, currRest, prevRest);
				else if (subProd instanceof RepetitionMandatoryWithSeparator) _this.walkAtLeastOneSep(subProd, currRest, prevRest);
				else if (subProd instanceof RepetitionWithSeparator) _this.walkManySep(subProd, currRest, prevRest);
				else if (subProd instanceof Repetition) _this.walkMany(subProd, currRest, prevRest);
				else if (subProd instanceof Alternation) _this.walkOr(subProd, currRest, prevRest);
				else throw Error("non exhaustive match");
			});
		};
		RestWalker$1.prototype.walkTerminal = function(terminal, currRest, prevRest) {};
		RestWalker$1.prototype.walkProdRef = function(refProd, currRest, prevRest) {};
		RestWalker$1.prototype.walkFlat = function(flatProd, currRest, prevRest) {
			var fullOrRest = currRest.concat(prevRest);
			this.walk(flatProd, fullOrRest);
		};
		RestWalker$1.prototype.walkOption = function(optionProd, currRest, prevRest) {
			var fullOrRest = currRest.concat(prevRest);
			this.walk(optionProd, fullOrRest);
		};
		RestWalker$1.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
			var fullAtLeastOneRest = [new Option({ definition: atLeastOneProd.definition })].concat(currRest, prevRest);
			this.walk(atLeastOneProd, fullAtLeastOneRest);
		};
		RestWalker$1.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
			var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
			this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
		};
		RestWalker$1.prototype.walkMany = function(manyProd, currRest, prevRest) {
			var fullManyRest = [new Option({ definition: manyProd.definition })].concat(currRest, prevRest);
			this.walk(manyProd, fullManyRest);
		};
		RestWalker$1.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
			var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
			this.walk(manySepProd, fullManySepRest);
		};
		RestWalker$1.prototype.walkOr = function(orProd, currRest, prevRest) {
			var _this = this;
			var fullOrRest = currRest.concat(prevRest);
			forEach$7(orProd.definition, function(alt) {
				var prodWrapper = new Alternative({ definition: [alt] });
				_this.walk(prodWrapper, fullOrRest);
			});
		};
		return RestWalker$1;
	}();
}));
var GAstVisitor;
var init_gast_visitor_public = __esmMin((() => {
	init_gast_public();
	GAstVisitor = function() {
		function GAstVisitor$1() {}
		GAstVisitor$1.prototype.visit = function(node) {
			var nodeAny = node;
			switch (nodeAny.constructor) {
				case NonTerminal: return this.visitNonTerminal(nodeAny);
				case Alternative: return this.visitAlternative(nodeAny);
				case Option: return this.visitOption(nodeAny);
				case RepetitionMandatory: return this.visitRepetitionMandatory(nodeAny);
				case RepetitionMandatoryWithSeparator: return this.visitRepetitionMandatoryWithSeparator(nodeAny);
				case RepetitionWithSeparator: return this.visitRepetitionWithSeparator(nodeAny);
				case Repetition: return this.visitRepetition(nodeAny);
				case Alternation: return this.visitAlternation(nodeAny);
				case Terminal: return this.visitTerminal(nodeAny);
				case Rule: return this.visitRule(nodeAny);
				default: throw Error("non exhaustive match");
			}
		};
		GAstVisitor$1.prototype.visitNonTerminal = function(node) {};
		GAstVisitor$1.prototype.visitAlternative = function(node) {};
		GAstVisitor$1.prototype.visitOption = function(node) {};
		GAstVisitor$1.prototype.visitRepetition = function(node) {};
		GAstVisitor$1.prototype.visitRepetitionMandatory = function(node) {};
		GAstVisitor$1.prototype.visitRepetitionMandatoryWithSeparator = function(node) {};
		GAstVisitor$1.prototype.visitRepetitionWithSeparator = function(node) {};
		GAstVisitor$1.prototype.visitAlternation = function(node) {};
		GAstVisitor$1.prototype.visitTerminal = function(node) {};
		GAstVisitor$1.prototype.visitRule = function(node) {};
		return GAstVisitor$1;
	}();
}));
function isSequenceProd(prod) {
	return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
}
function isOptionalProd(prod, alreadyVisited) {
	if (alreadyVisited === void 0) alreadyVisited = [];
	if (prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator) return true;
	if (prod instanceof Alternation) return some(prod.definition, function(subProd) {
		return isOptionalProd(subProd, alreadyVisited);
	});
	else if (prod instanceof NonTerminal && contains(alreadyVisited, prod)) return false;
	else if (prod instanceof AbstractProduction) {
		if (prod instanceof NonTerminal) alreadyVisited.push(prod);
		return every(prod.definition, function(subProd) {
			return isOptionalProd(subProd, alreadyVisited);
		});
	} else return false;
}
function isBranchingProd(prod) {
	return prod instanceof Alternation;
}
function getProductionDslName(prod) {
	/* istanbul ignore else */
	if (prod instanceof NonTerminal) return "SUBRULE";
	else if (prod instanceof Option) return "OPTION";
	else if (prod instanceof Alternation) return "OR";
	else if (prod instanceof RepetitionMandatory) return "AT_LEAST_ONE";
	else if (prod instanceof RepetitionMandatoryWithSeparator) return "AT_LEAST_ONE_SEP";
	else if (prod instanceof RepetitionWithSeparator) return "MANY_SEP";
	else if (prod instanceof Repetition) return "MANY";
	else if (prod instanceof Terminal) return "CONSUME";
	else throw Error("non exhaustive match");
}
function collectMethods(rule) {
	collectorVisitor.reset();
	rule.accept(collectorVisitor);
	var dslMethods = collectorVisitor.dslMethods;
	collectorVisitor.reset();
	return dslMethods;
}
var __extends$7, DslMethodsCollectorVisitor, collectorVisitor;
var init_gast = __esmMin((() => {
	init_utils();
	init_gast_public();
	init_gast_visitor_public();
	__extends$7 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	DslMethodsCollectorVisitor = function(_super) {
		__extends$7(DslMethodsCollectorVisitor$1, _super);
		function DslMethodsCollectorVisitor$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.separator = "-";
			_this.dslMethods = {
				option: [],
				alternation: [],
				repetition: [],
				repetitionWithSeparator: [],
				repetitionMandatory: [],
				repetitionMandatoryWithSeparator: []
			};
			return _this;
		}
		DslMethodsCollectorVisitor$1.prototype.reset = function() {
			this.dslMethods = {
				option: [],
				alternation: [],
				repetition: [],
				repetitionWithSeparator: [],
				repetitionMandatory: [],
				repetitionMandatoryWithSeparator: []
			};
		};
		DslMethodsCollectorVisitor$1.prototype.visitTerminal = function(terminal) {
			var key = terminal.terminalType.name + this.separator + "Terminal";
			if (!has$4(this.dslMethods, key)) this.dslMethods[key] = [];
			this.dslMethods[key].push(terminal);
		};
		DslMethodsCollectorVisitor$1.prototype.visitNonTerminal = function(subrule) {
			var key = subrule.nonTerminalName + this.separator + "Terminal";
			if (!has$4(this.dslMethods, key)) this.dslMethods[key] = [];
			this.dslMethods[key].push(subrule);
		};
		DslMethodsCollectorVisitor$1.prototype.visitOption = function(option) {
			this.dslMethods.option.push(option);
		};
		DslMethodsCollectorVisitor$1.prototype.visitRepetitionWithSeparator = function(manySep) {
			this.dslMethods.repetitionWithSeparator.push(manySep);
		};
		DslMethodsCollectorVisitor$1.prototype.visitRepetitionMandatory = function(atLeastOne) {
			this.dslMethods.repetitionMandatory.push(atLeastOne);
		};
		DslMethodsCollectorVisitor$1.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
			this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
		};
		DslMethodsCollectorVisitor$1.prototype.visitRepetition = function(many) {
			this.dslMethods.repetition.push(many);
		};
		DslMethodsCollectorVisitor$1.prototype.visitAlternation = function(or) {
			this.dslMethods.alternation.push(or);
		};
		return DslMethodsCollectorVisitor$1;
	}(GAstVisitor);
	collectorVisitor = new DslMethodsCollectorVisitor();
}));
function first$2(prod) {
	/* istanbul ignore else */
	if (prod instanceof NonTerminal) return first$2(prod.referencedRule);
	else if (prod instanceof Terminal) return firstForTerminal(prod);
	else if (isSequenceProd(prod)) return firstForSequence(prod);
	else if (isBranchingProd(prod)) return firstForBranching(prod);
	else throw Error("non exhaustive match");
}
function firstForSequence(prod) {
	var firstSet = [];
	var seq = prod.definition;
	var nextSubProdIdx = 0;
	var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
	var currSubProd;
	var isLastInnerProdOptional = true;
	while (hasInnerProdsRemaining && isLastInnerProdOptional) {
		currSubProd = seq[nextSubProdIdx];
		isLastInnerProdOptional = isOptionalProd(currSubProd);
		firstSet = firstSet.concat(first$2(currSubProd));
		nextSubProdIdx = nextSubProdIdx + 1;
		hasInnerProdsRemaining = seq.length > nextSubProdIdx;
	}
	return uniq(firstSet);
}
function firstForBranching(prod) {
	return uniq(flatten(map$10(prod.definition, function(innerProd) {
		return first$2(innerProd);
	})));
}
function firstForTerminal(terminal) {
	return [terminal.terminalType];
}
var init_first = __esmMin((() => {
	init_utils();
	init_gast_public();
	init_gast();
}));
var IN;
var init_constants = __esmMin((() => {
	IN = "_~IN~_";
}));
function computeAllProdsFollows(topProductions) {
	var reSyncFollows = {};
	forEach$7(topProductions, function(topProd) {
		assign$1(reSyncFollows, new ResyncFollowsWalker(topProd).startWalking());
	});
	return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
	return inner.name + occurenceInParent + IN;
}
var __extends$6, ResyncFollowsWalker;
var init_follow = __esmMin((() => {
	init_rest();
	init_first();
	init_utils();
	init_constants();
	init_gast_public();
	__extends$6 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	ResyncFollowsWalker = function(_super) {
		__extends$6(ResyncFollowsWalker$1, _super);
		function ResyncFollowsWalker$1(topProd) {
			var _this = _super.call(this) || this;
			_this.topProd = topProd;
			_this.follows = {};
			return _this;
		}
		ResyncFollowsWalker$1.prototype.startWalking = function() {
			this.walk(this.topProd);
			return this.follows;
		};
		ResyncFollowsWalker$1.prototype.walkTerminal = function(terminal, currRest, prevRest) {};
		ResyncFollowsWalker$1.prototype.walkProdRef = function(refProd, currRest, prevRest) {
			var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
			var t_in_topProd_follows = first$2(new Alternative({ definition: currRest.concat(prevRest) }));
			this.follows[followName] = t_in_topProd_follows;
		};
		return ResyncFollowsWalker$1;
	}(RestWalker);
}));
var defaultParserErrorProvider, defaultGrammarResolverErrorProvider, defaultGrammarValidatorErrorProvider;
var init_errors_public = __esmMin((() => {
	init_tokens_public();
	init_utils();
	init_gast_public();
	init_gast();
	defaultParserErrorProvider = {
		buildMismatchTokenMessage: function(_a) {
			var expected = _a.expected, actual = _a.actual;
			_a.previous;
			_a.ruleName;
			return "Expecting " + (hasTokenLabel(expected) ? "--> " + tokenLabel(expected) + " <--" : "token of type --> " + expected.name + " <--") + " but found --> '" + actual.image + "' <--";
		},
		buildNotAllInputParsedMessage: function(_a) {
			var firstRedundant = _a.firstRedundant;
			_a.ruleName;
			return "Redundant input, expecting EOF but found: " + firstRedundant.image;
		},
		buildNoViableAltMessage: function(_a) {
			var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual;
			_a.previous;
			var customUserDescription = _a.customUserDescription;
			_a.ruleName;
			var errPrefix = "Expecting: ";
			var errSuffix = "\nbut found: '" + first$1(actual).image + "'";
			if (customUserDescription) return errPrefix + customUserDescription + errSuffix;
			else return errPrefix + ("one of these possible Token sequences:\n" + map$10(map$10(reduce$3(expectedPathsPerAlt, function(result, currAltPaths) {
				return result.concat(currAltPaths);
			}, []), function(currPath) {
				return "[" + map$10(currPath, function(currTokenType) {
					return tokenLabel(currTokenType);
				}).join(", ") + "]";
			}), function(itemMsg, idx) {
				return "  " + (idx + 1) + ". " + itemMsg;
			}).join("\n")) + errSuffix;
		},
		buildEarlyExitMessage: function(_a) {
			var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription;
			_a.ruleName;
			var errPrefix = "Expecting: ";
			var errSuffix = "\nbut found: '" + first$1(actual).image + "'";
			if (customUserDescription) return errPrefix + customUserDescription + errSuffix;
			else return errPrefix + ("expecting at least one iteration which starts with one of these possible Token sequences::\n  " + ("<" + map$10(expectedIterationPaths, function(currPath) {
				return "[" + map$10(currPath, function(currTokenType) {
					return tokenLabel(currTokenType);
				}).join(",") + "]";
			}).join(" ,") + ">")) + errSuffix;
		}
	};
	Object.freeze(defaultParserErrorProvider);
	defaultGrammarResolverErrorProvider = { buildRuleNotFoundError: function(topLevelRule, undefinedRule) {
		return "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
	} };
	defaultGrammarValidatorErrorProvider = {
		buildDuplicateFoundError: function(topLevelRule, duplicateProds) {
			function getExtraProductionArgument$1(prod) {
				if (prod instanceof Terminal) return prod.terminalType.name;
				else if (prod instanceof NonTerminal) return prod.nonTerminalName;
				else return "";
			}
			var topLevelName = topLevelRule.name;
			var duplicateProd = first$1(duplicateProds);
			var index = duplicateProd.idx;
			var dslName = getProductionDslName(duplicateProd);
			var extraArgument = getExtraProductionArgument$1(duplicateProd);
			var hasExplicitIndex = index > 0;
			var msg = "->" + dslName + (hasExplicitIndex ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
			msg = msg.replace(/[ \t]+/g, " ");
			msg = msg.replace(/\s\s+/g, "\n");
			return msg;
		},
		buildNamespaceConflictError: function(rule) {
			return "Namespace conflict found in grammar.\n" + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") + "To resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.";
		},
		buildAlternationPrefixAmbiguityError: function(options) {
			var pathMsg = map$10(options.prefixPath, function(currTok) {
				return tokenLabel(currTok);
			}).join(", ");
			var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
			return "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" + ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.";
		},
		buildAlternationAmbiguityError: function(options) {
			var pathMsg = map$10(options.prefixPath, function(currtok) {
				return tokenLabel(currtok);
			}).join(", ");
			var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
			var currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" + (" inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
			currMessage = currMessage + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
			return currMessage;
		},
		buildEmptyRepetitionError: function(options) {
			var dslName = getProductionDslName(options.repetition);
			if (options.repetition.idx !== 0) dslName += options.repetition.idx;
			return "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop.";
		},
		buildTokenNameError: function(options) {
			/* istanbul ignore next */
			return "deprecated";
		},
		buildEmptyAlternationError: function(options) {
			return "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" + (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") + "Only the last alternative may be an empty alternative.";
		},
		buildTooManyAlternativesError: function(options) {
			return "An Alternation cannot have more than 256 alternatives:\n" + ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.");
		},
		buildLeftRecursionError: function(options) {
			var ruleName = options.topLevelRule.name;
			var pathNames = map$10(options.leftRecursionPath, function(currRule) {
				return currRule.name;
			});
			var leftRecursivePath = ruleName + " --> " + pathNames.concat([ruleName]).join(" --> ");
			return "Left Recursion found in grammar.\n" + ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") + ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") + " To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
		},
		buildInvalidRuleNameError: function(options) {
			/* istanbul ignore next */
			return "deprecated";
		},
		buildDuplicateRuleNameError: function(options) {
			var ruleName;
			if (options.topLevelRule instanceof Rule) ruleName = options.topLevelRule.name;
			else ruleName = options.topLevelRule;
			return "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
		}
	};
}));
function resolveGrammar$1(topLevels, errMsgProvider) {
	var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
	refResolver.resolveRefs();
	return refResolver.errors;
}
var __extends$5, GastRefResolverVisitor;
var init_resolver = __esmMin((() => {
	init_parser();
	init_utils();
	init_gast_visitor_public();
	__extends$5 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	GastRefResolverVisitor = function(_super) {
		__extends$5(GastRefResolverVisitor$1, _super);
		function GastRefResolverVisitor$1(nameToTopRule, errMsgProvider) {
			var _this = _super.call(this) || this;
			_this.nameToTopRule = nameToTopRule;
			_this.errMsgProvider = errMsgProvider;
			_this.errors = [];
			return _this;
		}
		GastRefResolverVisitor$1.prototype.resolveRefs = function() {
			var _this = this;
			forEach$7(values(this.nameToTopRule), function(prod) {
				_this.currTopLevel = prod;
				prod.accept(_this);
			});
		};
		GastRefResolverVisitor$1.prototype.visitNonTerminal = function(node) {
			var ref = this.nameToTopRule[node.nonTerminalName];
			if (!ref) {
				var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
				this.errors.push({
					message: msg,
					type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
					ruleName: this.currTopLevel.name,
					unresolvedRefName: node.nonTerminalName
				});
			} else node.referencedRule = ref;
		};
		return GastRefResolverVisitor$1;
	}(GAstVisitor);
}));
function possiblePathsFrom(targetDef, maxLength, currPath) {
	if (currPath === void 0) currPath = [];
	currPath = cloneArr(currPath);
	var result = [];
	var i = 0;
	function remainingPathWith(nextDef) {
		return nextDef.concat(drop$1(targetDef, i + 1));
	}
	function getAlternativesForProd(definition) {
		var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
		return result.concat(alternatives);
	}
	while (currPath.length < maxLength && i < targetDef.length) {
		var prod = targetDef[i];
		/* istanbul ignore else */
		if (prod instanceof Alternative) return getAlternativesForProd(prod.definition);
		else if (prod instanceof NonTerminal) return getAlternativesForProd(prod.definition);
		else if (prod instanceof Option) result = getAlternativesForProd(prod.definition);
		else if (prod instanceof RepetitionMandatory) {
			var newDef = prod.definition.concat([new Repetition({ definition: prod.definition })]);
			return getAlternativesForProd(newDef);
		} else if (prod instanceof RepetitionMandatoryWithSeparator) {
			var newDef = [new Alternative({ definition: prod.definition }), new Repetition({ definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition) })];
			return getAlternativesForProd(newDef);
		} else if (prod instanceof RepetitionWithSeparator) {
			var newDef = prod.definition.concat([new Repetition({ definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition) })]);
			result = getAlternativesForProd(newDef);
		} else if (prod instanceof Repetition) {
			var newDef = prod.definition.concat([new Repetition({ definition: prod.definition })]);
			result = getAlternativesForProd(newDef);
		} else if (prod instanceof Alternation) {
			forEach$7(prod.definition, function(currAlt) {
				if (isEmpty$1(currAlt.definition) === false) result = getAlternativesForProd(currAlt.definition);
			});
			return result;
		} else if (prod instanceof Terminal) currPath.push(prod.terminalType);
		else throw Error("non exhaustive match");
		i++;
	}
	result.push({
		partialPath: currPath,
		suffixDef: drop$1(targetDef, i)
	});
	return result;
}
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
	var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
	var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
	var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
	var foundCompletePath = false;
	var tokenVectorLength = tokenVector.length;
	var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
	var result = [];
	var possiblePaths = [];
	possiblePaths.push({
		idx: -1,
		def: initialDef,
		ruleStack: [],
		occurrenceStack: []
	});
	while (!isEmpty$1(possiblePaths)) {
		var currPath = possiblePaths.pop();
		if (currPath === EXIT_ALTERNATIVE) {
			if (foundCompletePath && last$1(possiblePaths).idx <= minimalAlternativesIndex) possiblePaths.pop();
			continue;
		}
		var currDef = currPath.def;
		var currIdx = currPath.idx;
		var currRuleStack = currPath.ruleStack;
		var currOccurrenceStack = currPath.occurrenceStack;
		if (isEmpty$1(currDef)) continue;
		var prod = currDef[0];
		/* istanbul ignore else */
		if (prod === EXIT_NON_TERMINAL) {
			var nextPath = {
				idx: currIdx,
				def: drop$1(currDef),
				ruleStack: dropRight(currRuleStack),
				occurrenceStack: dropRight(currOccurrenceStack)
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof Terminal)
 /* istanbul ignore else */
		if (currIdx < tokenVectorLength - 1) {
			var nextIdx = currIdx + 1;
			var actualToken = tokenVector[nextIdx];
			if (tokMatcher(actualToken, prod.terminalType)) {
				var nextPath = {
					idx: nextIdx,
					def: drop$1(currDef),
					ruleStack: currRuleStack,
					occurrenceStack: currOccurrenceStack
				};
				possiblePaths.push(nextPath);
			}
		} else if (currIdx === tokenVectorLength - 1) {
			result.push({
				nextTokenType: prod.terminalType,
				nextTokenOccurrence: prod.idx,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			});
			foundCompletePath = true;
		} else throw Error("non exhaustive match");
		else if (prod instanceof NonTerminal) {
			var newRuleStack = cloneArr(currRuleStack);
			newRuleStack.push(prod.nonTerminalName);
			var newOccurrenceStack = cloneArr(currOccurrenceStack);
			newOccurrenceStack.push(prod.idx);
			var nextPath = {
				idx: currIdx,
				def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop$1(currDef)),
				ruleStack: newRuleStack,
				occurrenceStack: newOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof Option) {
			var nextPathWithout = {
				idx: currIdx,
				def: drop$1(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			var nextPathWith = {
				idx: currIdx,
				def: prod.definition.concat(drop$1(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof RepetitionMandatory) {
			var secondIteration = new Repetition({
				definition: prod.definition,
				idx: prod.idx
			});
			var nextDef = prod.definition.concat([secondIteration], drop$1(currDef));
			var nextPath = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof RepetitionMandatoryWithSeparator) {
			var separatorGast = new Terminal({ terminalType: prod.separator });
			var secondIteration = new Repetition({
				definition: [separatorGast].concat(prod.definition),
				idx: prod.idx
			});
			var nextDef = prod.definition.concat([secondIteration], drop$1(currDef));
			var nextPath = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof RepetitionWithSeparator) {
			var nextPathWithout = {
				idx: currIdx,
				def: drop$1(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			var separatorGast = new Terminal({ terminalType: prod.separator });
			var nthRepetition = new Repetition({
				definition: [separatorGast].concat(prod.definition),
				idx: prod.idx
			});
			var nextDef = prod.definition.concat([nthRepetition], drop$1(currDef));
			var nextPathWith = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof Repetition) {
			var nextPathWithout = {
				idx: currIdx,
				def: drop$1(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			var nthRepetition = new Repetition({
				definition: prod.definition,
				idx: prod.idx
			});
			var nextDef = prod.definition.concat([nthRepetition], drop$1(currDef));
			var nextPathWith = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof Alternation) for (var i = prod.definition.length - 1; i >= 0; i--) {
			var currAltPath = {
				idx: currIdx,
				def: prod.definition[i].definition.concat(drop$1(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(currAltPath);
			possiblePaths.push(EXIT_ALTERNATIVE);
		}
		else if (prod instanceof Alternative) possiblePaths.push({
			idx: currIdx,
			def: prod.definition.concat(drop$1(currDef)),
			ruleStack: currRuleStack,
			occurrenceStack: currOccurrenceStack
		});
		else if (prod instanceof Rule) possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
		else throw Error("non exhaustive match");
	}
	return result;
}
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
	var newRuleStack = cloneArr(currRuleStack);
	newRuleStack.push(topRule.name);
	var newCurrOccurrenceStack = cloneArr(currOccurrenceStack);
	newCurrOccurrenceStack.push(1);
	return {
		idx: currIdx,
		def: topRule.definition,
		ruleStack: newRuleStack,
		occurrenceStack: newCurrOccurrenceStack
	};
}
var __extends$4, AbstractNextPossibleTokensWalker, NextAfterTokenWalker, AbstractNextTerminalAfterProductionWalker, NextTerminalAfterManyWalker, NextTerminalAfterManySepWalker, NextTerminalAfterAtLeastOneWalker, NextTerminalAfterAtLeastOneSepWalker;
var init_interpreter = __esmMin((() => {
	init_rest();
	init_utils();
	init_first();
	init_gast_public();
	__extends$4 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	AbstractNextPossibleTokensWalker = function(_super) {
		__extends$4(AbstractNextPossibleTokensWalker$1, _super);
		function AbstractNextPossibleTokensWalker$1(topProd, path) {
			var _this = _super.call(this) || this;
			_this.topProd = topProd;
			_this.path = path;
			_this.possibleTokTypes = [];
			_this.nextProductionName = "";
			_this.nextProductionOccurrence = 0;
			_this.found = false;
			_this.isAtEndOfPath = false;
			return _this;
		}
		AbstractNextPossibleTokensWalker$1.prototype.startWalking = function() {
			this.found = false;
			if (this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
			this.ruleStack = cloneArr(this.path.ruleStack).reverse();
			this.occurrenceStack = cloneArr(this.path.occurrenceStack).reverse();
			this.ruleStack.pop();
			this.occurrenceStack.pop();
			this.updateExpectedNext();
			this.walk(this.topProd);
			return this.possibleTokTypes;
		};
		AbstractNextPossibleTokensWalker$1.prototype.walk = function(prod, prevRest) {
			if (prevRest === void 0) prevRest = [];
			if (!this.found) _super.prototype.walk.call(this, prod, prevRest);
		};
		AbstractNextPossibleTokensWalker$1.prototype.walkProdRef = function(refProd, currRest, prevRest) {
			if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
				var fullRest = currRest.concat(prevRest);
				this.updateExpectedNext();
				this.walk(refProd.referencedRule, fullRest);
			}
		};
		AbstractNextPossibleTokensWalker$1.prototype.updateExpectedNext = function() {
			if (isEmpty$1(this.ruleStack)) {
				this.nextProductionName = "";
				this.nextProductionOccurrence = 0;
				this.isAtEndOfPath = true;
			} else {
				this.nextProductionName = this.ruleStack.pop();
				this.nextProductionOccurrence = this.occurrenceStack.pop();
			}
		};
		return AbstractNextPossibleTokensWalker$1;
	}(RestWalker);
	NextAfterTokenWalker = function(_super) {
		__extends$4(NextAfterTokenWalker$1, _super);
		function NextAfterTokenWalker$1(topProd, path) {
			var _this = _super.call(this, topProd, path) || this;
			_this.path = path;
			_this.nextTerminalName = "";
			_this.nextTerminalOccurrence = 0;
			_this.nextTerminalName = _this.path.lastTok.name;
			_this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
			return _this;
		}
		NextAfterTokenWalker$1.prototype.walkTerminal = function(terminal, currRest, prevRest) {
			if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
				this.possibleTokTypes = first$2(new Alternative({ definition: currRest.concat(prevRest) }));
				this.found = true;
			}
		};
		return NextAfterTokenWalker$1;
	}(AbstractNextPossibleTokensWalker);
	AbstractNextTerminalAfterProductionWalker = function(_super) {
		__extends$4(AbstractNextTerminalAfterProductionWalker$1, _super);
		function AbstractNextTerminalAfterProductionWalker$1(topRule, occurrence) {
			var _this = _super.call(this) || this;
			_this.topRule = topRule;
			_this.occurrence = occurrence;
			_this.result = {
				token: void 0,
				occurrence: void 0,
				isEndOfRule: void 0
			};
			return _this;
		}
		AbstractNextTerminalAfterProductionWalker$1.prototype.startWalking = function() {
			this.walk(this.topRule);
			return this.result;
		};
		return AbstractNextTerminalAfterProductionWalker$1;
	}(RestWalker);
	NextTerminalAfterManyWalker = function(_super) {
		__extends$4(NextTerminalAfterManyWalker$1, _super);
		function NextTerminalAfterManyWalker$1() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		NextTerminalAfterManyWalker$1.prototype.walkMany = function(manyProd, currRest, prevRest) {
			if (manyProd.idx === this.occurrence) {
				var firstAfterMany = first$1(currRest.concat(prevRest));
				this.result.isEndOfRule = firstAfterMany === void 0;
				if (firstAfterMany instanceof Terminal) {
					this.result.token = firstAfterMany.terminalType;
					this.result.occurrence = firstAfterMany.idx;
				}
			} else _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
		};
		return NextTerminalAfterManyWalker$1;
	}(AbstractNextTerminalAfterProductionWalker);
	NextTerminalAfterManySepWalker = function(_super) {
		__extends$4(NextTerminalAfterManySepWalker$1, _super);
		function NextTerminalAfterManySepWalker$1() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		NextTerminalAfterManySepWalker$1.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
			if (manySepProd.idx === this.occurrence) {
				var firstAfterManySep = first$1(currRest.concat(prevRest));
				this.result.isEndOfRule = firstAfterManySep === void 0;
				if (firstAfterManySep instanceof Terminal) {
					this.result.token = firstAfterManySep.terminalType;
					this.result.occurrence = firstAfterManySep.idx;
				}
			} else _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
		};
		return NextTerminalAfterManySepWalker$1;
	}(AbstractNextTerminalAfterProductionWalker);
	NextTerminalAfterAtLeastOneWalker = function(_super) {
		__extends$4(NextTerminalAfterAtLeastOneWalker$1, _super);
		function NextTerminalAfterAtLeastOneWalker$1() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		NextTerminalAfterAtLeastOneWalker$1.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
			if (atLeastOneProd.idx === this.occurrence) {
				var firstAfterAtLeastOne = first$1(currRest.concat(prevRest));
				this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
				if (firstAfterAtLeastOne instanceof Terminal) {
					this.result.token = firstAfterAtLeastOne.terminalType;
					this.result.occurrence = firstAfterAtLeastOne.idx;
				}
			} else _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
		};
		return NextTerminalAfterAtLeastOneWalker$1;
	}(AbstractNextTerminalAfterProductionWalker);
	NextTerminalAfterAtLeastOneSepWalker = function(_super) {
		__extends$4(NextTerminalAfterAtLeastOneSepWalker$1, _super);
		function NextTerminalAfterAtLeastOneSepWalker$1() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		NextTerminalAfterAtLeastOneSepWalker$1.prototype.walkAtLeastOneSep = function(atleastOneSepProd, currRest, prevRest) {
			if (atleastOneSepProd.idx === this.occurrence) {
				var firstAfterfirstAfterAtLeastOneSep = first$1(currRest.concat(prevRest));
				this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
				if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
					this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
					this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
				}
			} else _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
		};
		return NextTerminalAfterAtLeastOneSepWalker$1;
	}(AbstractNextTerminalAfterProductionWalker);
}));
function getProdType(prod) {
	/* istanbul ignore else */
	if (prod instanceof Option) return PROD_TYPE.OPTION;
	else if (prod instanceof Repetition) return PROD_TYPE.REPETITION;
	else if (prod instanceof RepetitionMandatory) return PROD_TYPE.REPETITION_MANDATORY;
	else if (prod instanceof RepetitionMandatoryWithSeparator) return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
	else if (prod instanceof RepetitionWithSeparator) return PROD_TYPE.REPETITION_WITH_SEPARATOR;
	else if (prod instanceof Alternation) return PROD_TYPE.ALTERNATION;
	else throw Error("non exhaustive match");
}
function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
	var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
	return laFuncBuilder(lookAheadPaths, hasPredicates, areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher, dynamicTokensEnabled);
}
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
	var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
	var tokenMatcher$2 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
	return lookaheadBuilder(lookAheadPaths[0], tokenMatcher$2, dynamicTokensEnabled);
}
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher$2, dynamicTokensEnabled) {
	var numOfAlts = alts.length;
	var areAllOneTokenLookahead = every(alts, function(currAlt) {
		return every(currAlt, function(currPath) {
			return currPath.length === 1;
		});
	});
	if (hasPredicates) return function(orAlts) {
		var predicates = map$10(orAlts, function(currAlt$1) {
			return currAlt$1.GATE;
		});
		for (var t$1 = 0; t$1 < numOfAlts; t$1++) {
			var currAlt = alts[t$1];
			var currNumOfPaths = currAlt.length;
			var currPredicate = predicates[t$1];
			if (currPredicate !== void 0 && currPredicate.call(this) === false) continue;
			nextPath: for (var j = 0; j < currNumOfPaths; j++) {
				var currPath = currAlt[j];
				var currPathLength = currPath.length;
				for (var i = 0; i < currPathLength; i++) if (tokenMatcher$2(this.LA(i + 1), currPath[i]) === false) continue nextPath;
				return t$1;
			}
		}
	};
	else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
		var choiceToAlt_1 = reduce$3(map$10(alts, function(currAlt) {
			return flatten(currAlt);
		}), function(result, currAlt, idx) {
			forEach$7(currAlt, function(currTokType) {
				if (!has$4(result, currTokType.tokenTypeIdx)) result[currTokType.tokenTypeIdx] = idx;
				forEach$7(currTokType.categoryMatches, function(currExtendingType) {
					if (!has$4(result, currExtendingType)) result[currExtendingType] = idx;
				});
			});
			return result;
		}, []);
		return function() {
			return choiceToAlt_1[this.LA(1).tokenTypeIdx];
		};
	} else return function() {
		for (var t$1 = 0; t$1 < numOfAlts; t$1++) {
			var currAlt = alts[t$1];
			var currNumOfPaths = currAlt.length;
			nextPath: for (var j = 0; j < currNumOfPaths; j++) {
				var currPath = currAlt[j];
				var currPathLength = currPath.length;
				for (var i = 0; i < currPathLength; i++) if (tokenMatcher$2(this.LA(i + 1), currPath[i]) === false) continue nextPath;
				return t$1;
			}
		}
	};
}
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher$2, dynamicTokensEnabled) {
	var areAllOneTokenLookahead = every(alt, function(currPath) {
		return currPath.length === 1;
	});
	var numOfPaths = alt.length;
	if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
		var singleTokensTypes = flatten(alt);
		if (singleTokensTypes.length === 1 && isEmpty$1(singleTokensTypes[0].categoryMatches)) {
			var expectedTokenUniqueKey_1 = singleTokensTypes[0].tokenTypeIdx;
			return function() {
				return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
			};
		} else {
			var choiceToAlt_2 = reduce$3(singleTokensTypes, function(result, currTokType, idx) {
				result[currTokType.tokenTypeIdx] = true;
				forEach$7(currTokType.categoryMatches, function(currExtendingType) {
					result[currExtendingType] = true;
				});
				return result;
			}, []);
			return function() {
				return choiceToAlt_2[this.LA(1).tokenTypeIdx] === true;
			};
		}
	} else return function() {
		nextPath: for (var j = 0; j < numOfPaths; j++) {
			var currPath = alt[j];
			var currPathLength = currPath.length;
			for (var i = 0; i < currPathLength; i++) if (tokenMatcher$2(this.LA(i + 1), currPath[i]) === false) continue nextPath;
			return true;
		}
		return false;
	};
}
function initializeArrayOfArrays(size) {
	var result = new Array(size);
	for (var i = 0; i < size; i++) result[i] = [];
	return result;
}
function pathToHashKeys(path) {
	var keys$1 = [""];
	for (var i = 0; i < path.length; i++) {
		var tokType = path[i];
		var longerKeys = [];
		for (var j = 0; j < keys$1.length; j++) {
			var currShorterKey = keys$1[j];
			longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
			for (var t$1 = 0; t$1 < tokType.categoryMatches.length; t$1++) {
				var categoriesKeySuffix = "_" + tokType.categoryMatches[t$1];
				longerKeys.push(currShorterKey + categoriesKeySuffix);
			}
		}
		keys$1 = longerKeys;
	}
	return keys$1;
}
function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
	for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
		if (currAltIdx === idx) continue;
		var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
		for (var searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) if (otherAltKnownPathsKeys[searchPathKeys[searchIdx]] === true) return false;
	}
	return true;
}
function lookAheadSequenceFromAlternatives(altsDefs, k) {
	var partialAlts = map$10(altsDefs, function(currAlt) {
		return possiblePathsFrom([currAlt], 1);
	});
	var finalResult = initializeArrayOfArrays(partialAlts.length);
	var altsHashes = map$10(partialAlts, function(currAltPaths) {
		var dict = {};
		forEach$7(currAltPaths, function(item) {
			forEach$7(pathToHashKeys(item.partialPath), function(currKey) {
				dict[currKey] = true;
			});
		});
		return dict;
	});
	var newData = partialAlts;
	for (var pathLength = 1; pathLength <= k; pathLength++) {
		var currDataset = newData;
		newData = initializeArrayOfArrays(currDataset.length);
		var _loop_1 = function(altIdx$1) {
			var currAltPathsAndSuffixes = currDataset[altIdx$1];
			for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
				var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
				var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
				var prefixKeys = pathToHashKeys(currPathPrefix);
				if (isUniquePrefixHash(altsHashes, prefixKeys, altIdx$1) || isEmpty$1(suffixDef) || currPathPrefix.length === k) {
					var currAltResult = finalResult[altIdx$1];
					if (containsPath(currAltResult, currPathPrefix) === false) {
						currAltResult.push(currPathPrefix);
						for (var j = 0; j < prefixKeys.length; j++) {
							var currKey = prefixKeys[j];
							altsHashes[altIdx$1][currKey] = true;
						}
					}
				} else {
					var newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
					newData[altIdx$1] = newData[altIdx$1].concat(newPartialPathsAndSuffixes);
					forEach$7(newPartialPathsAndSuffixes, function(item) {
						forEach$7(pathToHashKeys(item.partialPath), function(key) {
							altsHashes[altIdx$1][key] = true;
						});
					});
				}
			}
		};
		for (var altIdx = 0; altIdx < currDataset.length; altIdx++) _loop_1(altIdx);
	}
	return finalResult;
}
function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
	var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
	ruleGrammar.accept(visitor);
	return lookAheadSequenceFromAlternatives(visitor.result, k);
}
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
	var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
	ruleGrammar.accept(insideDefVisitor);
	var insideDef = insideDefVisitor.result;
	var afterDef = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType).startWalking();
	return lookAheadSequenceFromAlternatives([new Alternative({ definition: insideDef }), new Alternative({ definition: afterDef })], k);
}
function containsPath(alternative, searchPath) {
	compareOtherPath: for (var i = 0; i < alternative.length; i++) {
		var otherPath = alternative[i];
		if (otherPath.length !== searchPath.length) continue;
		for (var j = 0; j < otherPath.length; j++) {
			var searchTok = searchPath[j];
			var otherTok = otherPath[j];
			if ((searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0) === false) continue compareOtherPath;
		}
		return true;
	}
	return false;
}
function isStrictPrefixOfPath(prefix, other) {
	return prefix.length < other.length && every(prefix, function(tokType, idx) {
		var otherTokType = other[idx];
		return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
	});
}
function areTokenCategoriesNotUsed(lookAheadPaths) {
	return every(lookAheadPaths, function(singleAltPaths) {
		return every(singleAltPaths, function(singlePath) {
			return every(singlePath, function(token) {
				return isEmpty$1(token.categoryMatches);
			});
		});
	});
}
var __extends$3, PROD_TYPE, RestDefinitionFinderWalker, InsideDefinitionFinderVisitor;
var init_lookahead = __esmMin((() => {
	init_utils();
	init_interpreter();
	init_rest();
	init_tokens();
	init_gast_public();
	init_gast_visitor_public();
	__extends$3 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	(function(PROD_TYPE$1) {
		PROD_TYPE$1[PROD_TYPE$1["OPTION"] = 0] = "OPTION";
		PROD_TYPE$1[PROD_TYPE$1["REPETITION"] = 1] = "REPETITION";
		PROD_TYPE$1[PROD_TYPE$1["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
		PROD_TYPE$1[PROD_TYPE$1["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
		PROD_TYPE$1[PROD_TYPE$1["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
		PROD_TYPE$1[PROD_TYPE$1["ALTERNATION"] = 5] = "ALTERNATION";
	})(PROD_TYPE || (PROD_TYPE = {}));
	RestDefinitionFinderWalker = function(_super) {
		__extends$3(RestDefinitionFinderWalker$1, _super);
		function RestDefinitionFinderWalker$1(topProd, targetOccurrence, targetProdType) {
			var _this = _super.call(this) || this;
			_this.topProd = topProd;
			_this.targetOccurrence = targetOccurrence;
			_this.targetProdType = targetProdType;
			return _this;
		}
		RestDefinitionFinderWalker$1.prototype.startWalking = function() {
			this.walk(this.topProd);
			return this.restDef;
		};
		RestDefinitionFinderWalker$1.prototype.checkIsTarget = function(node, expectedProdType, currRest, prevRest) {
			if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
				this.restDef = currRest.concat(prevRest);
				return true;
			}
			return false;
		};
		RestDefinitionFinderWalker$1.prototype.walkOption = function(optionProd, currRest, prevRest) {
			if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
		};
		RestDefinitionFinderWalker$1.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
			if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
		};
		RestDefinitionFinderWalker$1.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
			if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
		};
		RestDefinitionFinderWalker$1.prototype.walkMany = function(manyProd, currRest, prevRest) {
			if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
		};
		RestDefinitionFinderWalker$1.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
			if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
		};
		return RestDefinitionFinderWalker$1;
	}(RestWalker);
	InsideDefinitionFinderVisitor = function(_super) {
		__extends$3(InsideDefinitionFinderVisitor$1, _super);
		function InsideDefinitionFinderVisitor$1(targetOccurrence, targetProdType, targetRef) {
			var _this = _super.call(this) || this;
			_this.targetOccurrence = targetOccurrence;
			_this.targetProdType = targetProdType;
			_this.targetRef = targetRef;
			_this.result = [];
			return _this;
		}
		InsideDefinitionFinderVisitor$1.prototype.checkIsTarget = function(node, expectedProdName) {
			if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) this.result = node.definition;
		};
		InsideDefinitionFinderVisitor$1.prototype.visitOption = function(node) {
			this.checkIsTarget(node, PROD_TYPE.OPTION);
		};
		InsideDefinitionFinderVisitor$1.prototype.visitRepetition = function(node) {
			this.checkIsTarget(node, PROD_TYPE.REPETITION);
		};
		InsideDefinitionFinderVisitor$1.prototype.visitRepetitionMandatory = function(node) {
			this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
		};
		InsideDefinitionFinderVisitor$1.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
			this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
		};
		InsideDefinitionFinderVisitor$1.prototype.visitRepetitionWithSeparator = function(node) {
			this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
		};
		InsideDefinitionFinderVisitor$1.prototype.visitAlternation = function(node) {
			this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
		};
		return InsideDefinitionFinderVisitor$1;
	}(GAstVisitor);
}));
function validateGrammar$1(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
	var duplicateErrors = map$10(topLevels, function(currTopLevel) {
		return validateDuplicateProductions(currTopLevel, errMsgProvider);
	});
	var leftRecursionErrors = map$10(topLevels, function(currTopRule) {
		return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
	});
	var emptyAltErrors = [];
	var ambiguousAltsErrors = [];
	var emptyRepetitionErrors = [];
	if (every(leftRecursionErrors, isEmpty$1)) {
		emptyAltErrors = map$10(topLevels, function(currTopRule) {
			return validateEmptyOrAlternative(currTopRule, errMsgProvider);
		});
		ambiguousAltsErrors = map$10(topLevels, function(currTopRule) {
			return validateAmbiguousAlternationAlternatives(currTopRule, globalMaxLookahead, errMsgProvider);
		});
		emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, globalMaxLookahead, errMsgProvider);
	}
	var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
	var tooManyAltsErrors = map$10(topLevels, function(curRule) {
		return validateTooManyAlts(curRule, errMsgProvider);
	});
	var duplicateRulesError = map$10(topLevels, function(curRule) {
		return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
	});
	return flatten(duplicateErrors.concat(emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError));
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
	var collectorVisitor$1 = new OccurrenceValidationCollector();
	topLevelRule.accept(collectorVisitor$1);
	var allRuleProductions = collectorVisitor$1.allProductions;
	return map$10(values(pick$2(groupBy$2(allRuleProductions, identifyProductionForDuplicates), function(currGroup) {
		return currGroup.length > 1;
	})), function(currDuplicates) {
		var firstProd = first$1(currDuplicates);
		var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
		var dslName = getProductionDslName(firstProd);
		var defError = {
			message: msg,
			type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
			ruleName: topLevelRule.name,
			dslName,
			occurrence: firstProd.idx
		};
		var param = getExtraProductionArgument(firstProd);
		if (param) defError.parameter = param;
		return defError;
	});
}
function identifyProductionForDuplicates(prod) {
	return getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
}
function getExtraProductionArgument(prod) {
	if (prod instanceof Terminal) return prod.terminalType.name;
	else if (prod instanceof NonTerminal) return prod.nonTerminalName;
	else return "";
}
function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
	var errors = [];
	if (reduce$3(allRules, function(result, curRule) {
		if (curRule.name === rule.name) return result + 1;
		return result;
	}, 0) > 1) {
		var errMsg = errMsgProvider.buildDuplicateRuleNameError({
			topLevelRule: rule,
			grammarName: className
		});
		errors.push({
			message: errMsg,
			type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
			ruleName: rule.name
		});
	}
	return errors;
}
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
	var errors = [];
	var errMsg;
	if (!contains(definedRulesNames, ruleName)) {
		errMsg = "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-as it is not defined in any of the super grammars ";
		errors.push({
			message: errMsg,
			type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
			ruleName
		});
	}
	return errors;
}
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
	if (path === void 0) path = [];
	var errors = [];
	var nextNonTerminals = getFirstNoneTerminal(currRule.definition);
	if (isEmpty$1(nextNonTerminals)) return [];
	else {
		var ruleName = topRule.name;
		if (contains(nextNonTerminals, topRule)) errors.push({
			message: errMsgProvider.buildLeftRecursionError({
				topLevelRule: topRule,
				leftRecursionPath: path
			}),
			type: ParserDefinitionErrorType.LEFT_RECURSION,
			ruleName
		});
		var errorsFromNextSteps = map$10(difference$4(nextNonTerminals, path.concat([topRule])), function(currRefRule) {
			var newPath = cloneArr(path);
			newPath.push(currRefRule);
			return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
		});
		return errors.concat(flatten(errorsFromNextSteps));
	}
}
function getFirstNoneTerminal(definition) {
	var result = [];
	if (isEmpty$1(definition)) return result;
	var firstProd = first$1(definition);
	/* istanbul ignore else */
	if (firstProd instanceof NonTerminal) result.push(firstProd.referencedRule);
	else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) result = result.concat(getFirstNoneTerminal(firstProd.definition));
	else if (firstProd instanceof Alternation) result = flatten(map$10(firstProd.definition, function(currSubDef) {
		return getFirstNoneTerminal(currSubDef.definition);
	}));
	else if (firstProd instanceof Terminal) {} else throw Error("non exhaustive match");
	var isFirstOptional = isOptionalProd(firstProd);
	var hasMore = definition.length > 1;
	if (isFirstOptional && hasMore) {
		var rest = drop$1(definition);
		return result.concat(getFirstNoneTerminal(rest));
	} else return result;
}
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
	var orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	var ors = orCollector.alternations;
	return reduce$3(ors, function(errors, currOr) {
		var currErrors = map$10(dropRight(currOr.definition), function(currAlternative, currAltIdx) {
			if (isEmpty$1(nextPossibleTokensAfter([currAlternative], [], null, 1))) return {
				message: errMsgProvider.buildEmptyAlternationError({
					topLevelRule,
					alternation: currOr,
					emptyChoiceIdx: currAltIdx
				}),
				type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
				ruleName: topLevelRule.name,
				occurrence: currOr.idx,
				alternative: currAltIdx + 1
			};
			else return null;
		});
		return errors.concat(compact(currErrors));
	}, []);
}
function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
	var orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	var ors = orCollector.alternations;
	ors = reject(ors, function(currOr) {
		return currOr.ignoreAmbiguities === true;
	});
	return reduce$3(ors, function(result, currOr) {
		var currOccurrence = currOr.idx;
		var alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, currOr.maxLookahead || globalMaxLookahead, currOr);
		var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
		var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
		return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
	}, []);
}
function validateTooManyAlts(topLevelRule, errMsgProvider) {
	var orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	var ors = orCollector.alternations;
	return reduce$3(ors, function(errors, currOr) {
		if (currOr.definition.length > 255) errors.push({
			message: errMsgProvider.buildTooManyAlternativesError({
				topLevelRule,
				alternation: currOr
			}),
			type: ParserDefinitionErrorType.TOO_MANY_ALTS,
			ruleName: topLevelRule.name,
			occurrence: currOr.idx
		});
		return errors;
	}, []);
}
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
	var errors = [];
	forEach$7(topLevelRules, function(currTopRule) {
		var collectorVisitor$1 = new RepetionCollector();
		currTopRule.accept(collectorVisitor$1);
		var allRuleProductions = collectorVisitor$1.allProductions;
		forEach$7(allRuleProductions, function(currProd) {
			var prodType = getProdType(currProd);
			var actualMaxLookahead = currProd.maxLookahead || maxLookahead;
			var currOccurrence = currProd.idx;
			var pathsInsideProduction = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead)[0];
			if (isEmpty$1(flatten(pathsInsideProduction))) {
				var errMsg = errMsgProvider.buildEmptyRepetitionError({
					topLevelRule: currTopRule,
					repetition: currProd
				});
				errors.push({
					message: errMsg,
					type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
					ruleName: currTopRule.name
				});
			}
		});
	});
	return errors;
}
function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
	var foundAmbiguousPaths = [];
	return map$10(reduce$3(alternatives, function(result, currAlt, currAltIdx) {
		if (alternation.definition[currAltIdx].ignoreAmbiguities === true) return result;
		forEach$7(currAlt, function(currPath) {
			var altsCurrPathAppearsIn = [currAltIdx];
			forEach$7(alternatives, function(currOtherAlt, currOtherAltIdx) {
				if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) altsCurrPathAppearsIn.push(currOtherAltIdx);
			});
			if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
				foundAmbiguousPaths.push(currPath);
				result.push({
					alts: altsCurrPathAppearsIn,
					path: currPath
				});
			}
		});
		return result;
	}, []), function(currAmbDescriptor) {
		var ambgIndices = map$10(currAmbDescriptor.alts, function(currAltIdx) {
			return currAltIdx + 1;
		});
		return {
			message: errMsgProvider.buildAlternationAmbiguityError({
				topLevelRule: rule,
				alternation,
				ambiguityIndices: ambgIndices,
				prefixPath: currAmbDescriptor.path
			}),
			type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
			ruleName: rule.name,
			occurrence: alternation.idx,
			alternatives: [currAmbDescriptor.alts]
		};
	});
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
	var errors = [];
	var pathsAndIndices = reduce$3(alternatives, function(result, currAlt, idx) {
		var currPathsAndIdx = map$10(currAlt, function(currPath) {
			return {
				idx,
				path: currPath
			};
		});
		return result.concat(currPathsAndIdx);
	}, []);
	forEach$7(pathsAndIndices, function(currPathAndIdx) {
		if (alternation.definition[currPathAndIdx.idx].ignoreAmbiguities === true) return;
		var targetIdx = currPathAndIdx.idx;
		var targetPath = currPathAndIdx.path;
		var currPathPrefixErrors = map$10(findAll(pathsAndIndices, function(searchPathAndIdx) {
			return alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && isStrictPrefixOfPath(searchPathAndIdx.path, targetPath);
		}), function(currAmbPathAndIdx) {
			var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
			var occurrence = alternation.idx === 0 ? "" : alternation.idx;
			return {
				message: errMsgProvider.buildAlternationPrefixAmbiguityError({
					topLevelRule: rule,
					alternation,
					ambiguityIndices: ambgIndices,
					prefixPath: currAmbPathAndIdx.path
				}),
				type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
				ruleName: rule.name,
				occurrence,
				alternatives: ambgIndices
			};
		});
		errors = errors.concat(currPathPrefixErrors);
	});
	return errors;
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
	var errors = [];
	var tokenNames = map$10(tokenTypes, function(currToken) {
		return currToken.name;
	});
	forEach$7(topLevels, function(currRule) {
		var currRuleName = currRule.name;
		if (contains(tokenNames, currRuleName)) {
			var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
			errors.push({
				message: errMsg,
				type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
				ruleName: currRuleName
			});
		}
	});
	return errors;
}
var __extends$2, OccurrenceValidationCollector, OrCollector, RepetionCollector;
var init_checks = __esmMin((() => {
	init_utils();
	init_parser();
	init_gast();
	init_lookahead();
	init_interpreter();
	init_gast_public();
	init_gast_visitor_public();
	__extends$2 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	OccurrenceValidationCollector = function(_super) {
		__extends$2(OccurrenceValidationCollector$1, _super);
		function OccurrenceValidationCollector$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.allProductions = [];
			return _this;
		}
		OccurrenceValidationCollector$1.prototype.visitNonTerminal = function(subrule) {
			this.allProductions.push(subrule);
		};
		OccurrenceValidationCollector$1.prototype.visitOption = function(option) {
			this.allProductions.push(option);
		};
		OccurrenceValidationCollector$1.prototype.visitRepetitionWithSeparator = function(manySep) {
			this.allProductions.push(manySep);
		};
		OccurrenceValidationCollector$1.prototype.visitRepetitionMandatory = function(atLeastOne) {
			this.allProductions.push(atLeastOne);
		};
		OccurrenceValidationCollector$1.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
			this.allProductions.push(atLeastOneSep);
		};
		OccurrenceValidationCollector$1.prototype.visitRepetition = function(many) {
			this.allProductions.push(many);
		};
		OccurrenceValidationCollector$1.prototype.visitAlternation = function(or) {
			this.allProductions.push(or);
		};
		OccurrenceValidationCollector$1.prototype.visitTerminal = function(terminal) {
			this.allProductions.push(terminal);
		};
		return OccurrenceValidationCollector$1;
	}(GAstVisitor);
	OrCollector = function(_super) {
		__extends$2(OrCollector$1, _super);
		function OrCollector$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.alternations = [];
			return _this;
		}
		OrCollector$1.prototype.visitAlternation = function(node) {
			this.alternations.push(node);
		};
		return OrCollector$1;
	}(GAstVisitor);
	RepetionCollector = function(_super) {
		__extends$2(RepetionCollector$1, _super);
		function RepetionCollector$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.allProductions = [];
			return _this;
		}
		RepetionCollector$1.prototype.visitRepetitionWithSeparator = function(manySep) {
			this.allProductions.push(manySep);
		};
		RepetionCollector$1.prototype.visitRepetitionMandatory = function(atLeastOne) {
			this.allProductions.push(atLeastOne);
		};
		RepetionCollector$1.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
			this.allProductions.push(atLeastOneSep);
		};
		RepetionCollector$1.prototype.visitRepetition = function(many) {
			this.allProductions.push(many);
		};
		return RepetionCollector$1;
	}(GAstVisitor);
}));
function resolveGrammar(options) {
	options = defaults(options, { errMsgProvider: defaultGrammarResolverErrorProvider });
	var topRulesTable = {};
	forEach$7(options.rules, function(rule) {
		topRulesTable[rule.name] = rule;
	});
	return resolveGrammar$1(topRulesTable, options.errMsgProvider);
}
function validateGrammar(options) {
	options = defaults(options, { errMsgProvider: defaultGrammarValidatorErrorProvider });
	return validateGrammar$1(options.rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
}
function assignOccurrenceIndices(options) {
	forEach$7(options.rules, function(currRule) {
		var methodsCollector = new DslMethodsCollectorVisitor();
		currRule.accept(methodsCollector);
		forEach$7(methodsCollector.dslMethods, function(methods) {
			forEach$7(methods, function(currMethod, arrIdx) {
				currMethod.idx = arrIdx + 1;
			});
		});
	});
}
var init_gast_resolver_public = __esmMin((() => {
	init_utils();
	init_resolver();
	init_checks();
	init_errors_public();
	init_gast();
}));
function isRecognitionException(error) {
	return contains(RECOGNITION_EXCEPTION_NAMES, error.name);
}
var __extends$1, MISMATCHED_TOKEN_EXCEPTION, NO_VIABLE_ALT_EXCEPTION, EARLY_EXIT_EXCEPTION, NOT_ALL_INPUT_PARSED_EXCEPTION, RECOGNITION_EXCEPTION_NAMES, RecognitionException, MismatchedTokenException, NoViableAltException, NotAllInputParsedException, EarlyExitException;
var init_exceptions_public = __esmMin((() => {
	init_utils();
	__extends$1 = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
	NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
	EARLY_EXIT_EXCEPTION = "EarlyExitException";
	NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
	RECOGNITION_EXCEPTION_NAMES = [
		MISMATCHED_TOKEN_EXCEPTION,
		NO_VIABLE_ALT_EXCEPTION,
		EARLY_EXIT_EXCEPTION,
		NOT_ALL_INPUT_PARSED_EXCEPTION
	];
	Object.freeze(RECOGNITION_EXCEPTION_NAMES);
	RecognitionException = function(_super) {
		__extends$1(RecognitionException$1, _super);
		function RecognitionException$1(message, token) {
			var _newTarget = this.constructor;
			var _this = _super.call(this, message) || this;
			_this.token = token;
			_this.resyncedTokens = [];
			Object.setPrototypeOf(_this, _newTarget.prototype);
			/* istanbul ignore next - V8 workaround to remove constructor from stacktrace when typescript target is ES5 */
			if (Error.captureStackTrace) Error.captureStackTrace(_this, _this.constructor);
			return _this;
		}
		return RecognitionException$1;
	}(Error);
	MismatchedTokenException = function(_super) {
		__extends$1(MismatchedTokenException$1, _super);
		function MismatchedTokenException$1(message, token, previousToken) {
			var _this = _super.call(this, message, token) || this;
			_this.previousToken = previousToken;
			_this.name = MISMATCHED_TOKEN_EXCEPTION;
			return _this;
		}
		return MismatchedTokenException$1;
	}(RecognitionException);
	NoViableAltException = function(_super) {
		__extends$1(NoViableAltException$1, _super);
		function NoViableAltException$1(message, token, previousToken) {
			var _this = _super.call(this, message, token) || this;
			_this.previousToken = previousToken;
			_this.name = NO_VIABLE_ALT_EXCEPTION;
			return _this;
		}
		return NoViableAltException$1;
	}(RecognitionException);
	NotAllInputParsedException = function(_super) {
		__extends$1(NotAllInputParsedException$1, _super);
		function NotAllInputParsedException$1(message, token) {
			var _this = _super.call(this, message, token) || this;
			_this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
			return _this;
		}
		return NotAllInputParsedException$1;
	}(RecognitionException);
	EarlyExitException = function(_super) {
		__extends$1(EarlyExitException$1, _super);
		function EarlyExitException$1(message, token, previousToken) {
			var _this = _super.call(this, message, token) || this;
			_this.previousToken = previousToken;
			_this.name = EARLY_EXIT_EXCEPTION;
			return _this;
		}
		return EarlyExitException$1;
	}(RecognitionException);
}));
function InRuleRecoveryException(message) {
	this.name = IN_RULE_RECOVERY_EXCEPTION;
	this.message = message;
}
function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
	var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
	var firstAfterRepInfo = this.firstAfterRepMap[key];
	if (firstAfterRepInfo === void 0) {
		var currRuleName = this.getCurrRuleFullName();
		var ruleGrammar = this.getGAstProductions()[currRuleName];
		firstAfterRepInfo = new nextToksWalker(ruleGrammar, prodOccurrence).startWalking();
		this.firstAfterRepMap[key] = firstAfterRepInfo;
	}
	var expectTokAfterLastMatch = firstAfterRepInfo.token;
	var nextTokIdx = firstAfterRepInfo.occurrence;
	var isEndOfRule = firstAfterRepInfo.isEndOfRule;
	if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
		expectTokAfterLastMatch = EOF;
		nextTokIdx = 1;
	}
	if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
}
var EOF_FOLLOW_KEY, IN_RULE_RECOVERY_EXCEPTION, Recoverable;
var init_recoverable = __esmMin((() => {
	init_tokens_public();
	init_utils();
	init_exceptions_public();
	init_constants();
	init_parser();
	EOF_FOLLOW_KEY = {};
	IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
	InRuleRecoveryException.prototype = Error.prototype;
	Recoverable = function() {
		function Recoverable$1() {}
		Recoverable$1.prototype.initRecoverable = function(config) {
			this.firstAfterRepMap = {};
			this.resyncFollows = {};
			this.recoveryEnabled = has$4(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled;
			if (this.recoveryEnabled) this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
		};
		Recoverable$1.prototype.getTokenToInsert = function(tokType) {
			var tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
			tokToInsert.isInsertedInRecovery = true;
			return tokToInsert;
		};
		Recoverable$1.prototype.canTokenTypeBeInsertedInRecovery = function(tokType) {
			return true;
		};
		Recoverable$1.prototype.tryInRepetitionRecovery = function(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
			var _this = this;
			var reSyncTokType = this.findReSyncTokenType();
			var savedLexerState = this.exportLexerState();
			var resyncedTokens = [];
			var passedResyncPoint = false;
			var nextTokenWithoutResync = this.LA(1);
			var currToken = this.LA(1);
			var generateErrorMessage = function() {
				var previousToken = _this.LA(0);
				var error = new MismatchedTokenException(_this.errorMessageProvider.buildMismatchTokenMessage({
					expected: expectedTokType,
					actual: nextTokenWithoutResync,
					previous: previousToken,
					ruleName: _this.getCurrRuleFullName()
				}), nextTokenWithoutResync, _this.LA(0));
				error.resyncedTokens = dropRight(resyncedTokens);
				_this.SAVE_ERROR(error);
			};
			while (!passedResyncPoint) if (this.tokenMatcher(currToken, expectedTokType)) {
				generateErrorMessage();
				return;
			} else if (lookAheadFunc.call(this)) {
				generateErrorMessage();
				grammarRule.apply(this, grammarRuleArgs);
				return;
			} else if (this.tokenMatcher(currToken, reSyncTokType)) passedResyncPoint = true;
			else {
				currToken = this.SKIP_TOKEN();
				this.addToResyncTokens(currToken, resyncedTokens);
			}
			this.importLexerState(savedLexerState);
		};
		Recoverable$1.prototype.shouldInRepetitionRecoveryBeTried = function(expectTokAfterLastMatch, nextTokIdx, notStuck) {
			if (notStuck === false) return false;
			if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) return false;
			if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) return false;
			if (this.isBackTracking()) return false;
			if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) return false;
			return true;
		};
		Recoverable$1.prototype.getFollowsForInRuleRecovery = function(tokType, tokIdxInRule) {
			var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
			return this.getNextPossibleTokenTypes(grammarPath);
		};
		Recoverable$1.prototype.tryInRuleRecovery = function(expectedTokType, follows) {
			if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) return this.getTokenToInsert(expectedTokType);
			if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
				var nextTok = this.SKIP_TOKEN();
				this.consumeToken();
				return nextTok;
			}
			throw new InRuleRecoveryException("sad sad panda");
		};
		Recoverable$1.prototype.canPerformInRuleRecovery = function(expectedToken, follows) {
			return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
		};
		Recoverable$1.prototype.canRecoverWithSingleTokenInsertion = function(expectedTokType, follows) {
			var _this = this;
			if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) return false;
			if (isEmpty$1(follows)) return false;
			var mismatchedTok = this.LA(1);
			return find(follows, function(possibleFollowsTokType) {
				return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
			}) !== void 0;
		};
		Recoverable$1.prototype.canRecoverWithSingleTokenDeletion = function(expectedTokType) {
			return this.tokenMatcher(this.LA(2), expectedTokType);
		};
		Recoverable$1.prototype.isInCurrentRuleReSyncSet = function(tokenTypeIdx) {
			var followKey = this.getCurrFollowKey();
			return contains(this.getFollowSetFromFollowKey(followKey), tokenTypeIdx);
		};
		Recoverable$1.prototype.findReSyncTokenType = function() {
			var allPossibleReSyncTokTypes = this.flattenFollowSet();
			var nextToken = this.LA(1);
			var k = 2;
			while (true) {
				var nextTokenType = nextToken.tokenType;
				if (contains(allPossibleReSyncTokTypes, nextTokenType)) return nextTokenType;
				nextToken = this.LA(k);
				k++;
			}
		};
		Recoverable$1.prototype.getCurrFollowKey = function() {
			if (this.RULE_STACK.length === 1) return EOF_FOLLOW_KEY;
			var currRuleShortName = this.getLastExplicitRuleShortName();
			var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
			var prevRuleShortName = this.getPreviousExplicitRuleShortName();
			return {
				ruleName: this.shortRuleNameToFullName(currRuleShortName),
				idxInCallingRule: currRuleIdx,
				inRule: this.shortRuleNameToFullName(prevRuleShortName)
			};
		};
		Recoverable$1.prototype.buildFullFollowKeyStack = function() {
			var _this = this;
			var explicitRuleStack = this.RULE_STACK;
			var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
			return map$10(explicitRuleStack, function(ruleName, idx) {
				if (idx === 0) return EOF_FOLLOW_KEY;
				return {
					ruleName: _this.shortRuleNameToFullName(ruleName),
					idxInCallingRule: explicitOccurrenceStack[idx],
					inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
				};
			});
		};
		Recoverable$1.prototype.flattenFollowSet = function() {
			var _this = this;
			return flatten(map$10(this.buildFullFollowKeyStack(), function(currKey) {
				return _this.getFollowSetFromFollowKey(currKey);
			}));
		};
		Recoverable$1.prototype.getFollowSetFromFollowKey = function(followKey) {
			if (followKey === EOF_FOLLOW_KEY) return [EOF];
			var followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
			return this.resyncFollows[followName];
		};
		Recoverable$1.prototype.addToResyncTokens = function(token, resyncTokens) {
			if (!this.tokenMatcher(token, EOF)) resyncTokens.push(token);
			return resyncTokens;
		};
		Recoverable$1.prototype.reSyncTo = function(tokType) {
			var resyncedTokens = [];
			var nextTok = this.LA(1);
			while (this.tokenMatcher(nextTok, tokType) === false) {
				nextTok = this.SKIP_TOKEN();
				this.addToResyncTokens(nextTok, resyncedTokens);
			}
			return dropRight(resyncedTokens);
		};
		Recoverable$1.prototype.attemptInRepetitionRecovery = function(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {};
		Recoverable$1.prototype.getCurrentGrammarPath = function(tokType, tokIdxInRule) {
			return {
				ruleStack: this.getHumanReadableRuleStack(),
				occurrenceStack: cloneArr(this.RULE_OCCURRENCE_STACK),
				lastTok: tokType,
				lastTokOccurrence: tokIdxInRule
			};
		};
		Recoverable$1.prototype.getHumanReadableRuleStack = function() {
			var _this = this;
			return map$10(this.RULE_STACK, function(currShortName) {
				return _this.shortRuleNameToFullName(currShortName);
			});
		};
		return Recoverable$1;
	}();
}));
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
	return occurrence | dslMethodIdx | ruleIdx;
}
var BITS_FOR_METHOD_TYPE, BITS_FOR_OCCURRENCE_IDX, BITS_FOR_ALT_IDX, OR_IDX, OPTION_IDX, MANY_IDX, AT_LEAST_ONE_IDX, MANY_SEP_IDX, AT_LEAST_ONE_SEP_IDX;
var init_keys = __esmMin((() => {
	BITS_FOR_METHOD_TYPE = 4;
	BITS_FOR_OCCURRENCE_IDX = 8;
	BITS_FOR_ALT_IDX = 8;
	OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
	OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
	MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
	AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
	MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
	AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
	32 - BITS_FOR_ALT_IDX;
}));
var LooksAhead;
var init_looksahead = __esmMin((() => {
	init_lookahead();
	init_utils();
	init_parser();
	init_keys();
	init_gast();
	LooksAhead = function() {
		function LooksAhead$1() {}
		LooksAhead$1.prototype.initLooksAhead = function(config) {
			this.dynamicTokensEnabled = has$4(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
			this.maxLookahead = has$4(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
			/* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
			this.lookAheadFuncsCache = isES2015MapSupported() ? /* @__PURE__ */ new Map() : [];
			/* istanbul ignore else - The else branch will be tested on older node.js versions and IE11 */
			if (isES2015MapSupported()) {
				this.getLaFuncFromCache = this.getLaFuncFromMap;
				this.setLaFuncCache = this.setLaFuncCacheUsingMap;
			} else {
				this.getLaFuncFromCache = this.getLaFuncFromObj;
				this.setLaFuncCache = this.setLaFuncUsingObj;
			}
		};
		LooksAhead$1.prototype.preComputeLookaheadFunctions = function(rules) {
			var _this = this;
			forEach$7(rules, function(currRule) {
				_this.TRACE_INIT(currRule.name + " Rule Lookahead", function() {
					var _a = collectMethods(currRule), alternation = _a.alternation, repetition = _a.repetition, option = _a.option, repetitionMandatory = _a.repetitionMandatory, repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator, repetitionWithSeparator = _a.repetitionWithSeparator;
					forEach$7(alternation, function(currProd) {
						var prodIdx = currProd.idx === 0 ? "" : currProd.idx;
						_this.TRACE_INIT("" + getProductionDslName(currProd) + prodIdx, function() {
							var laFunc = buildLookaheadFuncForOr(currProd.idx, currRule, currProd.maxLookahead || _this.maxLookahead, currProd.hasPredicates, _this.dynamicTokensEnabled, _this.lookAheadBuilderForAlternatives);
							var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);
							_this.setLaFuncCache(key, laFunc);
						});
					});
					forEach$7(repetition, function(currProd) {
						_this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, PROD_TYPE.REPETITION, currProd.maxLookahead, getProductionDslName(currProd));
					});
					forEach$7(option, function(currProd) {
						_this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, PROD_TYPE.OPTION, currProd.maxLookahead, getProductionDslName(currProd));
					});
					forEach$7(repetitionMandatory, function(currProd) {
						_this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, getProductionDslName(currProd));
					});
					forEach$7(repetitionMandatoryWithSeparator, function(currProd) {
						_this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
					});
					forEach$7(repetitionWithSeparator, function(currProd) {
						_this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
					});
				});
			});
		};
		LooksAhead$1.prototype.computeLookaheadFunc = function(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
			var _this = this;
			this.TRACE_INIT("" + dslMethodName + (prodOccurrence === 0 ? "" : prodOccurrence), function() {
				var laFunc = buildLookaheadFuncForOptionalProd(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional);
				var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
				_this.setLaFuncCache(key, laFunc);
			});
		};
		LooksAhead$1.prototype.lookAheadBuilderForOptional = function(alt, tokenMatcher$2, dynamicTokensEnabled) {
			return buildSingleAlternativeLookaheadFunction(alt, tokenMatcher$2, dynamicTokensEnabled);
		};
		LooksAhead$1.prototype.lookAheadBuilderForAlternatives = function(alts, hasPredicates, tokenMatcher$2, dynamicTokensEnabled) {
			return buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher$2, dynamicTokensEnabled);
		};
		LooksAhead$1.prototype.getKeyForAutomaticLookahead = function(dslMethodIdx, occurrence) {
			return getKeyForAutomaticLookahead(this.getLastExplicitRuleShortName(), dslMethodIdx, occurrence);
		};
		/* istanbul ignore next */
		LooksAhead$1.prototype.getLaFuncFromCache = function(key) {};
		LooksAhead$1.prototype.getLaFuncFromMap = function(key) {
			return this.lookAheadFuncsCache.get(key);
		};
		/* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
		LooksAhead$1.prototype.getLaFuncFromObj = function(key) {
			return this.lookAheadFuncsCache[key];
		};
		/* istanbul ignore next */
		LooksAhead$1.prototype.setLaFuncCache = function(key, value) {};
		LooksAhead$1.prototype.setLaFuncCacheUsingMap = function(key, value) {
			this.lookAheadFuncsCache.set(key, value);
		};
		/* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
		LooksAhead$1.prototype.setLaFuncUsingObj = function(key, value) {
			this.lookAheadFuncsCache[key] = value;
		};
		return LooksAhead$1;
	}();
}));
function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
	if (isNaN(currNodeLocation.startOffset) === true) {
		currNodeLocation.startOffset = newLocationInfo.startOffset;
		currNodeLocation.endOffset = newLocationInfo.endOffset;
	} else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) currNodeLocation.endOffset = newLocationInfo.endOffset;
}
function setNodeLocationFull(currNodeLocation, newLocationInfo) {
	if (isNaN(currNodeLocation.startOffset) === true) {
		currNodeLocation.startOffset = newLocationInfo.startOffset;
		currNodeLocation.startColumn = newLocationInfo.startColumn;
		currNodeLocation.startLine = newLocationInfo.startLine;
		currNodeLocation.endOffset = newLocationInfo.endOffset;
		currNodeLocation.endColumn = newLocationInfo.endColumn;
		currNodeLocation.endLine = newLocationInfo.endLine;
	} else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
		currNodeLocation.endOffset = newLocationInfo.endOffset;
		currNodeLocation.endColumn = newLocationInfo.endColumn;
		currNodeLocation.endLine = newLocationInfo.endLine;
	}
}
function addTerminalToCst(node, token, tokenTypeName) {
	if (node.children[tokenTypeName] === void 0) node.children[tokenTypeName] = [token];
	else node.children[tokenTypeName].push(token);
}
function addNoneTerminalToCst(node, ruleName, ruleResult) {
	if (node.children[ruleName] === void 0) node.children[ruleName] = [ruleResult];
	else node.children[ruleName].push(ruleResult);
}
var init_cst = __esmMin((() => {}));
function classNameFromInstance(instance) {
	return functionName(instance.constructor);
}
function functionName(func) {
	var existingNameProp = func.name;
	/* istanbul ignore else - too many hacks for IE/old versions of node.js here*/
	if (existingNameProp) return existingNameProp;
	else return "anonymous";
}
function defineNameProp(obj, nameValue) {
	var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
	/* istanbul ignore else -> will only run in old versions of node.js */
	if (isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
		Object.defineProperty(obj, NAME, {
			enumerable: false,
			configurable: true,
			writable: false,
			value: nameValue
		});
		return true;
	}
	/* istanbul ignore next -> will only run in old versions of node.js */
	return false;
}
var NAME;
var init_lang_extensions = __esmMin((() => {
	init_utils();
	NAME = "name";
}));
function defaultVisit(ctx, param) {
	var childrenNames = keys(ctx);
	var childrenNamesLength = childrenNames.length;
	for (var i = 0; i < childrenNamesLength; i++) {
		var currChildArray = ctx[childrenNames[i]];
		var currChildArrayLength = currChildArray.length;
		for (var j = 0; j < currChildArrayLength; j++) {
			var currChild = currChildArray[j];
			if (currChild.tokenTypeIdx === void 0) this[currChild.name](currChild.children, param);
		}
	}
}
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
	var derivedConstructor = function() {};
	defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
	derivedConstructor.prototype = {
		visit: function(cstNode, param) {
			if (isArray$4(cstNode)) cstNode = cstNode[0];
			if (isUndefined(cstNode)) return;
			return this[cstNode.name](cstNode.children, param);
		},
		validateVisitor: function() {
			var semanticDefinitionErrors = validateVisitor(this, ruleNames);
			if (!isEmpty$1(semanticDefinitionErrors)) {
				var errorMessages = map$10(semanticDefinitionErrors, function(currDefError) {
					return currDefError.msg;
				});
				throw Error("Errors Detected in CST Visitor <" + functionName(this.constructor) + ">:\n	" + ("" + errorMessages.join("\n\n").replace(/\n/g, "\n	")));
			}
		}
	};
	derivedConstructor.prototype.constructor = derivedConstructor;
	derivedConstructor._RULE_NAMES = ruleNames;
	return derivedConstructor;
}
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
	var derivedConstructor = function() {};
	defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
	var withDefaultsProto = Object.create(baseConstructor.prototype);
	forEach$7(ruleNames, function(ruleName) {
		withDefaultsProto[ruleName] = defaultVisit;
	});
	derivedConstructor.prototype = withDefaultsProto;
	derivedConstructor.prototype.constructor = derivedConstructor;
	return derivedConstructor;
}
function validateVisitor(visitorInstance, ruleNames) {
	var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
	var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
	return missingErrors.concat(redundantErrors);
}
function validateMissingCstMethods(visitorInstance, ruleNames) {
	return compact(map$10(ruleNames, function(currRuleName) {
		if (!isFunction$1(visitorInstance[currRuleName])) return {
			msg: "Missing visitor method: <" + currRuleName + "> on " + functionName(visitorInstance.constructor) + " CST Visitor.",
			type: CstVisitorDefinitionError.MISSING_METHOD,
			methodName: currRuleName
		};
	}));
}
function validateRedundantMethods(visitorInstance, ruleNames) {
	var errors = [];
	for (var prop in visitorInstance) if (isFunction$1(visitorInstance[prop]) && !contains(VALID_PROP_NAMES, prop) && !contains(ruleNames, prop)) errors.push({
		msg: "Redundant visitor method: <" + prop + "> on " + functionName(visitorInstance.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",
		type: CstVisitorDefinitionError.REDUNDANT_METHOD,
		methodName: prop
	});
	return errors;
}
var CstVisitorDefinitionError, VALID_PROP_NAMES;
var init_cst_visitor = __esmMin((() => {
	init_utils();
	init_lang_extensions();
	(function(CstVisitorDefinitionError$1) {
		CstVisitorDefinitionError$1[CstVisitorDefinitionError$1["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
		CstVisitorDefinitionError$1[CstVisitorDefinitionError$1["MISSING_METHOD"] = 1] = "MISSING_METHOD";
	})(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
	VALID_PROP_NAMES = [
		"constructor",
		"visit",
		"validateVisitor"
	];
}));
var TreeBuilder;
var init_tree_builder = __esmMin((() => {
	init_cst();
	init_utils();
	init_cst_visitor();
	init_parser();
	TreeBuilder = function() {
		function TreeBuilder$1() {}
		TreeBuilder$1.prototype.initTreeBuilder = function(config) {
			this.CST_STACK = [];
			this.outputCst = config.outputCst;
			this.nodeLocationTracking = has$4(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
			if (!this.outputCst) {
				this.cstInvocationStateUpdate = NOOP;
				this.cstFinallyStateUpdate = NOOP;
				this.cstPostTerminal = NOOP;
				this.cstPostNonTerminal = NOOP;
				this.cstPostRule = NOOP;
			} else if (/full/i.test(this.nodeLocationTracking)) if (this.recoveryEnabled) {
				this.setNodeLocationFromToken = setNodeLocationFull;
				this.setNodeLocationFromNode = setNodeLocationFull;
				this.cstPostRule = NOOP;
				this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
			} else {
				this.setNodeLocationFromToken = NOOP;
				this.setNodeLocationFromNode = NOOP;
				this.cstPostRule = this.cstPostRuleFull;
				this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
			}
			else if (/onlyOffset/i.test(this.nodeLocationTracking)) if (this.recoveryEnabled) {
				this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
				this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
				this.cstPostRule = NOOP;
				this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
			} else {
				this.setNodeLocationFromToken = NOOP;
				this.setNodeLocationFromNode = NOOP;
				this.cstPostRule = this.cstPostRuleOnlyOffset;
				this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
			}
			else if (/none/i.test(this.nodeLocationTracking)) {
				this.setNodeLocationFromToken = NOOP;
				this.setNodeLocationFromNode = NOOP;
				this.cstPostRule = NOOP;
				this.setInitialNodeLocation = NOOP;
			} else throw Error("Invalid <nodeLocationTracking> config option: \"" + config.nodeLocationTracking + "\"");
		};
		TreeBuilder$1.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(cstNode) {
			cstNode.location = {
				startOffset: NaN,
				endOffset: NaN
			};
		};
		TreeBuilder$1.prototype.setInitialNodeLocationOnlyOffsetRegular = function(cstNode) {
			cstNode.location = {
				startOffset: this.LA(1).startOffset,
				endOffset: NaN
			};
		};
		TreeBuilder$1.prototype.setInitialNodeLocationFullRecovery = function(cstNode) {
			cstNode.location = {
				startOffset: NaN,
				startLine: NaN,
				startColumn: NaN,
				endOffset: NaN,
				endLine: NaN,
				endColumn: NaN
			};
		};
		TreeBuilder$1.prototype.setInitialNodeLocationFullRegular = function(cstNode) {
			var nextToken = this.LA(1);
			cstNode.location = {
				startOffset: nextToken.startOffset,
				startLine: nextToken.startLine,
				startColumn: nextToken.startColumn,
				endOffset: NaN,
				endLine: NaN,
				endColumn: NaN
			};
		};
		TreeBuilder$1.prototype.cstInvocationStateUpdate = function(fullRuleName, shortName) {
			var cstNode = {
				name: fullRuleName,
				children: {}
			};
			this.setInitialNodeLocation(cstNode);
			this.CST_STACK.push(cstNode);
		};
		TreeBuilder$1.prototype.cstFinallyStateUpdate = function() {
			this.CST_STACK.pop();
		};
		TreeBuilder$1.prototype.cstPostRuleFull = function(ruleCstNode) {
			var prevToken = this.LA(0);
			var loc = ruleCstNode.location;
			if (loc.startOffset <= prevToken.startOffset === true) {
				loc.endOffset = prevToken.endOffset;
				loc.endLine = prevToken.endLine;
				loc.endColumn = prevToken.endColumn;
			} else {
				loc.startOffset = NaN;
				loc.startLine = NaN;
				loc.startColumn = NaN;
			}
		};
		TreeBuilder$1.prototype.cstPostRuleOnlyOffset = function(ruleCstNode) {
			var prevToken = this.LA(0);
			var loc = ruleCstNode.location;
			if (loc.startOffset <= prevToken.startOffset === true) loc.endOffset = prevToken.endOffset;
			else loc.startOffset = NaN;
		};
		TreeBuilder$1.prototype.cstPostTerminal = function(key, consumedToken) {
			var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
			addTerminalToCst(rootCst, consumedToken, key);
			this.setNodeLocationFromToken(rootCst.location, consumedToken);
		};
		TreeBuilder$1.prototype.cstPostNonTerminal = function(ruleCstResult, ruleName) {
			var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
			addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
			this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
		};
		TreeBuilder$1.prototype.getBaseCstVisitorConstructor = function() {
			if (isUndefined(this.baseCstVisitorConstructor)) {
				var newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys(this.gastProductionsCache));
				this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
				return newBaseCstVisitorConstructor;
			}
			return this.baseCstVisitorConstructor;
		};
		TreeBuilder$1.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
			if (isUndefined(this.baseCstVisitorWithDefaultsConstructor)) {
				var newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
				this.baseCstVisitorWithDefaultsConstructor = newConstructor;
				return newConstructor;
			}
			return this.baseCstVisitorWithDefaultsConstructor;
		};
		TreeBuilder$1.prototype.getLastExplicitRuleShortName = function() {
			var ruleStack = this.RULE_STACK;
			return ruleStack[ruleStack.length - 1];
		};
		TreeBuilder$1.prototype.getPreviousExplicitRuleShortName = function() {
			var ruleStack = this.RULE_STACK;
			return ruleStack[ruleStack.length - 2];
		};
		TreeBuilder$1.prototype.getLastExplicitRuleOccurrenceIndex = function() {
			var occurrenceStack = this.RULE_OCCURRENCE_STACK;
			return occurrenceStack[occurrenceStack.length - 1];
		};
		return TreeBuilder$1;
	}();
}));
var LexerAdapter;
var init_lexer_adapter = __esmMin((() => {
	init_parser();
	LexerAdapter = function() {
		function LexerAdapter$1() {}
		LexerAdapter$1.prototype.initLexerAdapter = function() {
			this.tokVector = [];
			this.tokVectorLength = 0;
			this.currIdx = -1;
		};
		Object.defineProperty(LexerAdapter$1.prototype, "input", {
			get: function() {
				return this.tokVector;
			},
			set: function(newInput) {
				if (this.selfAnalysisDone !== true) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
				this.reset();
				this.tokVector = newInput;
				this.tokVectorLength = newInput.length;
			},
			enumerable: false,
			configurable: true
		});
		LexerAdapter$1.prototype.SKIP_TOKEN = function() {
			if (this.currIdx <= this.tokVector.length - 2) {
				this.consumeToken();
				return this.LA(1);
			} else return END_OF_FILE;
		};
		LexerAdapter$1.prototype.LA = function(howMuch) {
			var soughtIdx = this.currIdx + howMuch;
			if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) return END_OF_FILE;
			else return this.tokVector[soughtIdx];
		};
		LexerAdapter$1.prototype.consumeToken = function() {
			this.currIdx++;
		};
		LexerAdapter$1.prototype.exportLexerState = function() {
			return this.currIdx;
		};
		LexerAdapter$1.prototype.importLexerState = function(newState) {
			this.currIdx = newState;
		};
		LexerAdapter$1.prototype.resetLexerState = function() {
			this.currIdx = -1;
		};
		LexerAdapter$1.prototype.moveToTerminatedState = function() {
			this.currIdx = this.tokVector.length - 1;
		};
		LexerAdapter$1.prototype.getLexerPosition = function() {
			return this.exportLexerState();
		};
		return LexerAdapter$1;
	}();
}));
var RecognizerApi;
var init_recognizer_api = __esmMin((() => {
	init_utils();
	init_exceptions_public();
	init_parser();
	init_errors_public();
	init_checks();
	init_gast_public();
	RecognizerApi = function() {
		function RecognizerApi$1() {}
		RecognizerApi$1.prototype.ACTION = function(impl) {
			return impl.call(this);
		};
		RecognizerApi$1.prototype.consume = function(idx, tokType, options) {
			return this.consumeInternal(tokType, idx, options);
		};
		RecognizerApi$1.prototype.subrule = function(idx, ruleToCall, options) {
			return this.subruleInternal(ruleToCall, idx, options);
		};
		RecognizerApi$1.prototype.option = function(idx, actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, idx);
		};
		RecognizerApi$1.prototype.or = function(idx, altsOrOpts) {
			return this.orInternal(altsOrOpts, idx);
		};
		RecognizerApi$1.prototype.many = function(idx, actionORMethodDef) {
			return this.manyInternal(idx, actionORMethodDef);
		};
		RecognizerApi$1.prototype.atLeastOne = function(idx, actionORMethodDef) {
			return this.atLeastOneInternal(idx, actionORMethodDef);
		};
		RecognizerApi$1.prototype.CONSUME = function(tokType, options) {
			return this.consumeInternal(tokType, 0, options);
		};
		RecognizerApi$1.prototype.CONSUME1 = function(tokType, options) {
			return this.consumeInternal(tokType, 1, options);
		};
		RecognizerApi$1.prototype.CONSUME2 = function(tokType, options) {
			return this.consumeInternal(tokType, 2, options);
		};
		RecognizerApi$1.prototype.CONSUME3 = function(tokType, options) {
			return this.consumeInternal(tokType, 3, options);
		};
		RecognizerApi$1.prototype.CONSUME4 = function(tokType, options) {
			return this.consumeInternal(tokType, 4, options);
		};
		RecognizerApi$1.prototype.CONSUME5 = function(tokType, options) {
			return this.consumeInternal(tokType, 5, options);
		};
		RecognizerApi$1.prototype.CONSUME6 = function(tokType, options) {
			return this.consumeInternal(tokType, 6, options);
		};
		RecognizerApi$1.prototype.CONSUME7 = function(tokType, options) {
			return this.consumeInternal(tokType, 7, options);
		};
		RecognizerApi$1.prototype.CONSUME8 = function(tokType, options) {
			return this.consumeInternal(tokType, 8, options);
		};
		RecognizerApi$1.prototype.CONSUME9 = function(tokType, options) {
			return this.consumeInternal(tokType, 9, options);
		};
		RecognizerApi$1.prototype.SUBRULE = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 0, options);
		};
		RecognizerApi$1.prototype.SUBRULE1 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 1, options);
		};
		RecognizerApi$1.prototype.SUBRULE2 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 2, options);
		};
		RecognizerApi$1.prototype.SUBRULE3 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 3, options);
		};
		RecognizerApi$1.prototype.SUBRULE4 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 4, options);
		};
		RecognizerApi$1.prototype.SUBRULE5 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 5, options);
		};
		RecognizerApi$1.prototype.SUBRULE6 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 6, options);
		};
		RecognizerApi$1.prototype.SUBRULE7 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 7, options);
		};
		RecognizerApi$1.prototype.SUBRULE8 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 8, options);
		};
		RecognizerApi$1.prototype.SUBRULE9 = function(ruleToCall, options) {
			return this.subruleInternal(ruleToCall, 9, options);
		};
		RecognizerApi$1.prototype.OPTION = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 0);
		};
		RecognizerApi$1.prototype.OPTION1 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 1);
		};
		RecognizerApi$1.prototype.OPTION2 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 2);
		};
		RecognizerApi$1.prototype.OPTION3 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 3);
		};
		RecognizerApi$1.prototype.OPTION4 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 4);
		};
		RecognizerApi$1.prototype.OPTION5 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 5);
		};
		RecognizerApi$1.prototype.OPTION6 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 6);
		};
		RecognizerApi$1.prototype.OPTION7 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 7);
		};
		RecognizerApi$1.prototype.OPTION8 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 8);
		};
		RecognizerApi$1.prototype.OPTION9 = function(actionORMethodDef) {
			return this.optionInternal(actionORMethodDef, 9);
		};
		RecognizerApi$1.prototype.OR = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 0);
		};
		RecognizerApi$1.prototype.OR1 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 1);
		};
		RecognizerApi$1.prototype.OR2 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 2);
		};
		RecognizerApi$1.prototype.OR3 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 3);
		};
		RecognizerApi$1.prototype.OR4 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 4);
		};
		RecognizerApi$1.prototype.OR5 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 5);
		};
		RecognizerApi$1.prototype.OR6 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 6);
		};
		RecognizerApi$1.prototype.OR7 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 7);
		};
		RecognizerApi$1.prototype.OR8 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 8);
		};
		RecognizerApi$1.prototype.OR9 = function(altsOrOpts) {
			return this.orInternal(altsOrOpts, 9);
		};
		RecognizerApi$1.prototype.MANY = function(actionORMethodDef) {
			this.manyInternal(0, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY1 = function(actionORMethodDef) {
			this.manyInternal(1, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY2 = function(actionORMethodDef) {
			this.manyInternal(2, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY3 = function(actionORMethodDef) {
			this.manyInternal(3, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY4 = function(actionORMethodDef) {
			this.manyInternal(4, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY5 = function(actionORMethodDef) {
			this.manyInternal(5, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY6 = function(actionORMethodDef) {
			this.manyInternal(6, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY7 = function(actionORMethodDef) {
			this.manyInternal(7, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY8 = function(actionORMethodDef) {
			this.manyInternal(8, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY9 = function(actionORMethodDef) {
			this.manyInternal(9, actionORMethodDef);
		};
		RecognizerApi$1.prototype.MANY_SEP = function(options) {
			this.manySepFirstInternal(0, options);
		};
		RecognizerApi$1.prototype.MANY_SEP1 = function(options) {
			this.manySepFirstInternal(1, options);
		};
		RecognizerApi$1.prototype.MANY_SEP2 = function(options) {
			this.manySepFirstInternal(2, options);
		};
		RecognizerApi$1.prototype.MANY_SEP3 = function(options) {
			this.manySepFirstInternal(3, options);
		};
		RecognizerApi$1.prototype.MANY_SEP4 = function(options) {
			this.manySepFirstInternal(4, options);
		};
		RecognizerApi$1.prototype.MANY_SEP5 = function(options) {
			this.manySepFirstInternal(5, options);
		};
		RecognizerApi$1.prototype.MANY_SEP6 = function(options) {
			this.manySepFirstInternal(6, options);
		};
		RecognizerApi$1.prototype.MANY_SEP7 = function(options) {
			this.manySepFirstInternal(7, options);
		};
		RecognizerApi$1.prototype.MANY_SEP8 = function(options) {
			this.manySepFirstInternal(8, options);
		};
		RecognizerApi$1.prototype.MANY_SEP9 = function(options) {
			this.manySepFirstInternal(9, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE = function(actionORMethodDef) {
			this.atLeastOneInternal(0, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE1 = function(actionORMethodDef) {
			return this.atLeastOneInternal(1, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE2 = function(actionORMethodDef) {
			this.atLeastOneInternal(2, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE3 = function(actionORMethodDef) {
			this.atLeastOneInternal(3, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE4 = function(actionORMethodDef) {
			this.atLeastOneInternal(4, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE5 = function(actionORMethodDef) {
			this.atLeastOneInternal(5, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE6 = function(actionORMethodDef) {
			this.atLeastOneInternal(6, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE7 = function(actionORMethodDef) {
			this.atLeastOneInternal(7, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE8 = function(actionORMethodDef) {
			this.atLeastOneInternal(8, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE9 = function(actionORMethodDef) {
			this.atLeastOneInternal(9, actionORMethodDef);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP = function(options) {
			this.atLeastOneSepFirstInternal(0, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP1 = function(options) {
			this.atLeastOneSepFirstInternal(1, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP2 = function(options) {
			this.atLeastOneSepFirstInternal(2, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP3 = function(options) {
			this.atLeastOneSepFirstInternal(3, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP4 = function(options) {
			this.atLeastOneSepFirstInternal(4, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP5 = function(options) {
			this.atLeastOneSepFirstInternal(5, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP6 = function(options) {
			this.atLeastOneSepFirstInternal(6, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP7 = function(options) {
			this.atLeastOneSepFirstInternal(7, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP8 = function(options) {
			this.atLeastOneSepFirstInternal(8, options);
		};
		RecognizerApi$1.prototype.AT_LEAST_ONE_SEP9 = function(options) {
			this.atLeastOneSepFirstInternal(9, options);
		};
		RecognizerApi$1.prototype.RULE = function(name, implementation, config) {
			if (config === void 0) config = DEFAULT_RULE_CONFIG;
			if (contains(this.definedRulesNames, name)) {
				var error = {
					message: defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
						topLevelRule: name,
						grammarName: this.className
					}),
					type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
					ruleName: name
				};
				this.definitionErrors.push(error);
			}
			this.definedRulesNames.push(name);
			var ruleImplementation = this.defineRule(name, implementation, config);
			this[name] = ruleImplementation;
			return ruleImplementation;
		};
		RecognizerApi$1.prototype.OVERRIDE_RULE = function(name, impl, config) {
			if (config === void 0) config = DEFAULT_RULE_CONFIG;
			var ruleErrors = [];
			ruleErrors = ruleErrors.concat(validateRuleIsOverridden(name, this.definedRulesNames, this.className));
			this.definitionErrors.push.apply(this.definitionErrors, ruleErrors);
			var ruleImplementation = this.defineRule(name, impl, config);
			this[name] = ruleImplementation;
			return ruleImplementation;
		};
		RecognizerApi$1.prototype.BACKTRACK = function(grammarRule, args) {
			return function() {
				this.isBackTrackingStack.push(1);
				var orgState = this.saveRecogState();
				try {
					grammarRule.apply(this, args);
					return true;
				} catch (e) {
					if (isRecognitionException(e)) return false;
					else throw e;
				} finally {
					this.reloadRecogState(orgState);
					this.isBackTrackingStack.pop();
				}
			};
		};
		RecognizerApi$1.prototype.getGAstProductions = function() {
			return this.gastProductionsCache;
		};
		RecognizerApi$1.prototype.getSerializedGastProductions = function() {
			return serializeGrammar(values(this.gastProductionsCache));
		};
		return RecognizerApi$1;
	}();
}));
var RecognizerEngine;
var init_recognizer_engine = __esmMin((() => {
	init_utils();
	init_keys();
	init_exceptions_public();
	init_lookahead();
	init_interpreter();
	init_parser();
	init_recoverable();
	init_tokens_public();
	init_tokens();
	init_lang_extensions();
	RecognizerEngine = function() {
		function RecognizerEngine$1() {}
		RecognizerEngine$1.prototype.initRecognizerEngine = function(tokenVocabulary, config) {
			this.className = classNameFromInstance(this);
			this.shortRuleNameToFull = {};
			this.fullRuleNameToShort = {};
			this.ruleShortNameIdx = 256;
			this.tokenMatcher = tokenStructuredMatcherNoCategories;
			this.definedRulesNames = [];
			this.tokensMap = {};
			this.isBackTrackingStack = [];
			this.RULE_STACK = [];
			this.RULE_OCCURRENCE_STACK = [];
			this.gastProductionsCache = {};
			if (has$4(config, "serializedGrammar")) throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
			if (isArray$4(tokenVocabulary)) {
				if (isEmpty$1(tokenVocabulary)) throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
				if (typeof tokenVocabulary[0].startOffset === "number") throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
			}
			if (isArray$4(tokenVocabulary)) this.tokensMap = reduce$3(tokenVocabulary, function(acc, tokType) {
				acc[tokType.name] = tokType;
				return acc;
			}, {});
			else if (has$4(tokenVocabulary, "modes") && every(flatten(values(tokenVocabulary.modes)), isTokenType)) this.tokensMap = reduce$3(uniq(flatten(values(tokenVocabulary.modes))), function(acc, tokType) {
				acc[tokType.name] = tokType;
				return acc;
			}, {});
			else if (isObject(tokenVocabulary)) this.tokensMap = cloneObj(tokenVocabulary);
			else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
			this.tokensMap["EOF"] = EOF;
			this.tokenMatcher = every(values(tokenVocabulary), function(tokenConstructor) {
				return isEmpty$1(tokenConstructor.categoryMatches);
			}) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
			augmentTokenTypes(values(this.tokensMap));
		};
		RecognizerEngine$1.prototype.defineRule = function(ruleName, impl, config) {
			if (this.selfAnalysisDone) throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
			var resyncEnabled = has$4(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
			var recoveryValueFunc = has$4(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc;
			var shortName = this.ruleShortNameIdx << BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX;
			this.ruleShortNameIdx++;
			this.shortRuleNameToFull[shortName] = ruleName;
			this.fullRuleNameToShort[ruleName] = shortName;
			function invokeRuleWithTry(args) {
				try {
					if (this.outputCst === true) {
						impl.apply(this, args);
						var cst = this.CST_STACK[this.CST_STACK.length - 1];
						this.cstPostRule(cst);
						return cst;
					} else return impl.apply(this, args);
				} catch (e) {
					return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
				} finally {
					this.ruleFinallyStateUpdate();
				}
			}
			var wrappedGrammarRule = function(idxInCallingRule, args) {
				if (idxInCallingRule === void 0) idxInCallingRule = 0;
				this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
				return invokeRuleWithTry.call(this, args);
			};
			var ruleNamePropName = "ruleName";
			wrappedGrammarRule[ruleNamePropName] = ruleName;
			wrappedGrammarRule["originalGrammarAction"] = impl;
			return wrappedGrammarRule;
		};
		RecognizerEngine$1.prototype.invokeRuleCatch = function(e, resyncEnabledConfig, recoveryValueFunc) {
			var isFirstInvokedRule = this.RULE_STACK.length === 1;
			var reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
			if (isRecognitionException(e)) {
				var recogError = e;
				if (reSyncEnabled) {
					var reSyncTokType = this.findReSyncTokenType();
					if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
						recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
						if (this.outputCst) {
							var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
							partialCstResult.recoveredNode = true;
							return partialCstResult;
						} else return recoveryValueFunc();
					} else {
						if (this.outputCst) {
							var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
							partialCstResult.recoveredNode = true;
							recogError.partialCstResult = partialCstResult;
						}
						throw recogError;
					}
				} else if (isFirstInvokedRule) {
					this.moveToTerminatedState();
					return recoveryValueFunc();
				} else throw recogError;
			} else throw e;
		};
		RecognizerEngine$1.prototype.optionInternal = function(actionORMethodDef, occurrence) {
			var key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
			return this.optionInternalLogic(actionORMethodDef, occurrence, key);
		};
		RecognizerEngine$1.prototype.optionInternalLogic = function(actionORMethodDef, occurrence, key) {
			var _this = this;
			var lookAheadFunc = this.getLaFuncFromCache(key);
			var action;
			var predicate;
			if (actionORMethodDef.DEF !== void 0) {
				action = actionORMethodDef.DEF;
				predicate = actionORMethodDef.GATE;
				if (predicate !== void 0) {
					var orgLookaheadFunction_1 = lookAheadFunc;
					lookAheadFunc = function() {
						return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
					};
				}
			} else action = actionORMethodDef;
			if (lookAheadFunc.call(this) === true) return action.call(this);
		};
		RecognizerEngine$1.prototype.atLeastOneInternal = function(prodOccurrence, actionORMethodDef) {
			var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
			return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
		};
		RecognizerEngine$1.prototype.atLeastOneInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
			var _this = this;
			var lookAheadFunc = this.getLaFuncFromCache(key);
			var action;
			var predicate;
			if (actionORMethodDef.DEF !== void 0) {
				action = actionORMethodDef.DEF;
				predicate = actionORMethodDef.GATE;
				if (predicate !== void 0) {
					var orgLookaheadFunction_2 = lookAheadFunc;
					lookAheadFunc = function() {
						return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
					};
				}
			} else action = actionORMethodDef;
			if (lookAheadFunc.call(this) === true) {
				var notStuck = this.doSingleRepetition(action);
				while (lookAheadFunc.call(this) === true && notStuck === true) notStuck = this.doSingleRepetition(action);
			} else throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
			this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
		};
		RecognizerEngine$1.prototype.atLeastOneSepFirstInternal = function(prodOccurrence, options) {
			var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
			this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
		};
		RecognizerEngine$1.prototype.atLeastOneSepFirstInternalLogic = function(prodOccurrence, options, key) {
			var _this = this;
			var action = options.DEF;
			var separator = options.SEP;
			if (this.getLaFuncFromCache(key).call(this) === true) {
				action.call(this);
				var separatorLookAheadFunc = function() {
					return _this.tokenMatcher(_this.LA(1), separator);
				};
				while (this.tokenMatcher(this.LA(1), separator) === true) {
					this.CONSUME(separator);
					action.call(this);
				}
				this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
					prodOccurrence,
					separator,
					separatorLookAheadFunc,
					action,
					NextTerminalAfterAtLeastOneSepWalker
				], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
			} else throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
		};
		RecognizerEngine$1.prototype.manyInternal = function(prodOccurrence, actionORMethodDef) {
			var laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
			return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
		};
		RecognizerEngine$1.prototype.manyInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
			var _this = this;
			var lookaheadFunction = this.getLaFuncFromCache(key);
			var action;
			var predicate;
			if (actionORMethodDef.DEF !== void 0) {
				action = actionORMethodDef.DEF;
				predicate = actionORMethodDef.GATE;
				if (predicate !== void 0) {
					var orgLookaheadFunction_3 = lookaheadFunction;
					lookaheadFunction = function() {
						return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
					};
				}
			} else action = actionORMethodDef;
			var notStuck = true;
			while (lookaheadFunction.call(this) === true && notStuck === true) notStuck = this.doSingleRepetition(action);
			this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef], lookaheadFunction, MANY_IDX, prodOccurrence, NextTerminalAfterManyWalker, notStuck);
		};
		RecognizerEngine$1.prototype.manySepFirstInternal = function(prodOccurrence, options) {
			var laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
			this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
		};
		RecognizerEngine$1.prototype.manySepFirstInternalLogic = function(prodOccurrence, options, key) {
			var _this = this;
			var action = options.DEF;
			var separator = options.SEP;
			if (this.getLaFuncFromCache(key).call(this) === true) {
				action.call(this);
				var separatorLookAheadFunc = function() {
					return _this.tokenMatcher(_this.LA(1), separator);
				};
				while (this.tokenMatcher(this.LA(1), separator) === true) {
					this.CONSUME(separator);
					action.call(this);
				}
				this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
					prodOccurrence,
					separator,
					separatorLookAheadFunc,
					action,
					NextTerminalAfterManySepWalker
				], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
			}
		};
		RecognizerEngine$1.prototype.repetitionSepSecondInternal = function(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
			while (separatorLookAheadFunc()) {
				this.CONSUME(separator);
				action.call(this);
			}
			/* istanbul ignore else */
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				prodOccurrence,
				separator,
				separatorLookAheadFunc,
				action,
				nextTerminalAfterWalker
			], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
		};
		RecognizerEngine$1.prototype.doSingleRepetition = function(action) {
			var beforeIteration = this.getLexerPosition();
			action.call(this);
			return this.getLexerPosition() > beforeIteration;
		};
		RecognizerEngine$1.prototype.orInternal = function(altsOrOpts, occurrence) {
			var laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
			var alts = isArray$4(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
			var altIdxToTake = this.getLaFuncFromCache(laKey).call(this, alts);
			if (altIdxToTake !== void 0) return alts[altIdxToTake].ALT.call(this);
			this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
		};
		RecognizerEngine$1.prototype.ruleFinallyStateUpdate = function() {
			this.RULE_STACK.pop();
			this.RULE_OCCURRENCE_STACK.pop();
			this.cstFinallyStateUpdate();
			if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
				var firstRedundantTok = this.LA(1);
				var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
					firstRedundant: firstRedundantTok,
					ruleName: this.getCurrRuleFullName()
				});
				this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
			}
		};
		RecognizerEngine$1.prototype.subruleInternal = function(ruleToCall, idx, options) {
			var ruleResult;
			try {
				var args = options !== void 0 ? options.ARGS : void 0;
				ruleResult = ruleToCall.call(this, idx, args);
				this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
				return ruleResult;
			} catch (e) {
				this.subruleInternalError(e, options, ruleToCall.ruleName);
			}
		};
		RecognizerEngine$1.prototype.subruleInternalError = function(e, options, ruleName) {
			if (isRecognitionException(e) && e.partialCstResult !== void 0) {
				this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
				delete e.partialCstResult;
			}
			throw e;
		};
		RecognizerEngine$1.prototype.consumeInternal = function(tokType, idx, options) {
			var consumedToken;
			try {
				var nextToken = this.LA(1);
				if (this.tokenMatcher(nextToken, tokType) === true) {
					this.consumeToken();
					consumedToken = nextToken;
				} else this.consumeInternalError(tokType, nextToken, options);
			} catch (eFromConsumption) {
				consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
			}
			this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
			return consumedToken;
		};
		RecognizerEngine$1.prototype.consumeInternalError = function(tokType, nextToken, options) {
			var msg;
			var previousToken = this.LA(0);
			if (options !== void 0 && options.ERR_MSG) msg = options.ERR_MSG;
			else msg = this.errorMessageProvider.buildMismatchTokenMessage({
				expected: tokType,
				actual: nextToken,
				previous: previousToken,
				ruleName: this.getCurrRuleFullName()
			});
			throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
		};
		RecognizerEngine$1.prototype.consumeInternalRecovery = function(tokType, idx, eFromConsumption) {
			if (this.recoveryEnabled && eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
				var follows = this.getFollowsForInRuleRecovery(tokType, idx);
				try {
					return this.tryInRuleRecovery(tokType, follows);
				} catch (eFromInRuleRecovery) {
					if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) throw eFromConsumption;
					else throw eFromInRuleRecovery;
				}
			} else throw eFromConsumption;
		};
		RecognizerEngine$1.prototype.saveRecogState = function() {
			var savedErrors = this.errors;
			var savedRuleStack = cloneArr(this.RULE_STACK);
			return {
				errors: savedErrors,
				lexerState: this.exportLexerState(),
				RULE_STACK: savedRuleStack,
				CST_STACK: this.CST_STACK
			};
		};
		RecognizerEngine$1.prototype.reloadRecogState = function(newState) {
			this.errors = newState.errors;
			this.importLexerState(newState.lexerState);
			this.RULE_STACK = newState.RULE_STACK;
		};
		RecognizerEngine$1.prototype.ruleInvocationStateUpdate = function(shortName, fullName, idxInCallingRule) {
			this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
			this.RULE_STACK.push(shortName);
			this.cstInvocationStateUpdate(fullName, shortName);
		};
		RecognizerEngine$1.prototype.isBackTracking = function() {
			return this.isBackTrackingStack.length !== 0;
		};
		RecognizerEngine$1.prototype.getCurrRuleFullName = function() {
			var shortName = this.getLastExplicitRuleShortName();
			return this.shortRuleNameToFull[shortName];
		};
		RecognizerEngine$1.prototype.shortRuleNameToFullName = function(shortName) {
			return this.shortRuleNameToFull[shortName];
		};
		RecognizerEngine$1.prototype.isAtEndOfInput = function() {
			return this.tokenMatcher(this.LA(1), EOF);
		};
		RecognizerEngine$1.prototype.reset = function() {
			this.resetLexerState();
			this.isBackTrackingStack = [];
			this.errors = [];
			this.RULE_STACK = [];
			this.CST_STACK = [];
			this.RULE_OCCURRENCE_STACK = [];
		};
		return RecognizerEngine$1;
	}();
}));
var ErrorHandler;
var init_error_handler = __esmMin((() => {
	init_exceptions_public();
	init_utils();
	init_lookahead();
	init_parser();
	ErrorHandler = function() {
		function ErrorHandler$1() {}
		ErrorHandler$1.prototype.initErrorHandler = function(config) {
			this._errors = [];
			this.errorMessageProvider = has$4(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
		};
		ErrorHandler$1.prototype.SAVE_ERROR = function(error) {
			if (isRecognitionException(error)) {
				error.context = {
					ruleStack: this.getHumanReadableRuleStack(),
					ruleOccurrenceStack: cloneArr(this.RULE_OCCURRENCE_STACK)
				};
				this._errors.push(error);
				return error;
			} else throw Error("Trying to save an Error which is not a RecognitionException");
		};
		Object.defineProperty(ErrorHandler$1.prototype, "errors", {
			get: function() {
				return cloneArr(this._errors);
			},
			set: function(newErrors) {
				this._errors = newErrors;
			},
			enumerable: false,
			configurable: true
		});
		ErrorHandler$1.prototype.raiseEarlyExitException = function(occurrence, prodType, userDefinedErrMsg) {
			var ruleName = this.getCurrRuleFullName();
			var ruleGrammar = this.getGAstProductions()[ruleName];
			var insideProdPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead)[0];
			var actualTokens = [];
			for (var i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
			var msg = this.errorMessageProvider.buildEarlyExitMessage({
				expectedIterationPaths: insideProdPaths,
				actual: actualTokens,
				previous: this.LA(0),
				customUserDescription: userDefinedErrMsg,
				ruleName
			});
			throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
		};
		ErrorHandler$1.prototype.raiseNoAltException = function(occurrence, errMsgTypes) {
			var ruleName = this.getCurrRuleFullName();
			var ruleGrammar = this.getGAstProductions()[ruleName];
			var lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
			var actualTokens = [];
			for (var i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
			var previousToken = this.LA(0);
			var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
				expectedPathsPerAlt: lookAheadPathsPerAlternative,
				actual: actualTokens,
				previous: previousToken,
				customUserDescription: errMsgTypes,
				ruleName: this.getCurrRuleFullName()
			});
			throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
		};
		return ErrorHandler$1;
	}();
}));
var ContentAssist;
var init_context_assist = __esmMin((() => {
	init_interpreter();
	init_utils();
	ContentAssist = function() {
		function ContentAssist$1() {}
		ContentAssist$1.prototype.initContentAssist = function() {};
		ContentAssist$1.prototype.computeContentAssist = function(startRuleName, precedingInput) {
			var startRuleGast = this.gastProductionsCache[startRuleName];
			if (isUndefined(startRuleGast)) throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
			return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
		};
		ContentAssist$1.prototype.getNextPossibleTokenTypes = function(grammarPath) {
			var topRuleName = first$1(grammarPath.ruleStack);
			var topProduction = this.getGAstProductions()[topRuleName];
			return new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
		};
		return ContentAssist$1;
	}();
}));
function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
	if (handleSep === void 0) handleSep = false;
	assertMethodIdxIsValid(occurrence);
	var prevProd = peek(this.recordingProdStack);
	var grammarAction = isFunction$1(mainProdArg) ? mainProdArg : mainProdArg.DEF;
	var newProd = new prodConstructor({
		definition: [],
		idx: occurrence
	});
	if (handleSep) newProd.separator = mainProdArg.SEP;
	if (has$4(mainProdArg, "MAX_LOOKAHEAD")) newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
	this.recordingProdStack.push(newProd);
	grammarAction.call(this);
	prevProd.definition.push(newProd);
	this.recordingProdStack.pop();
	return RECORDING_NULL_OBJECT;
}
function recordOrProd(mainProdArg, occurrence) {
	var _this = this;
	assertMethodIdxIsValid(occurrence);
	var prevProd = peek(this.recordingProdStack);
	var hasOptions = isArray$4(mainProdArg) === false;
	var alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
	var newOrProd = new Alternation({
		definition: [],
		idx: occurrence,
		ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
	});
	if (has$4(mainProdArg, "MAX_LOOKAHEAD")) newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
	newOrProd.hasPredicates = some(alts, function(currAlt) {
		return isFunction$1(currAlt.GATE);
	});
	prevProd.definition.push(newOrProd);
	forEach$7(alts, function(currAlt) {
		var currAltFlat = new Alternative({ definition: [] });
		newOrProd.definition.push(currAltFlat);
		if (has$4(currAlt, "IGNORE_AMBIGUITIES")) currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
		else if (has$4(currAlt, "GATE")) currAltFlat.ignoreAmbiguities = true;
		_this.recordingProdStack.push(currAltFlat);
		currAlt.ALT.call(_this);
		_this.recordingProdStack.pop();
	});
	return RECORDING_NULL_OBJECT;
}
function getIdxSuffix(idx) {
	return idx === 0 ? "" : "" + idx;
}
function assertMethodIdxIsValid(idx) {
	if (idx < 0 || idx > MAX_METHOD_IDX) {
		var error = /* @__PURE__ */ new Error("Invalid DSL Method idx value: <" + idx + ">\n	" + ("Idx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1)));
		error.KNOWN_RECORDER_ERROR = true;
		throw error;
	}
}
var RECORDING_NULL_OBJECT, HANDLE_SEPARATOR, MAX_METHOD_IDX, RFT, RECORDING_PHASE_TOKEN, RECORDING_PHASE_CSTNODE, GastRecorder;
var init_gast_recorder = __esmMin((() => {
	init_utils();
	init_gast_public();
	init_lexer_public();
	init_tokens();
	init_tokens_public();
	init_parser();
	init_keys();
	RECORDING_NULL_OBJECT = { description: "This Object indicates the Parser is during Recording Phase" };
	Object.freeze(RECORDING_NULL_OBJECT);
	HANDLE_SEPARATOR = true;
	MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
	RFT = createToken$1({
		name: "RECORDING_PHASE_TOKEN",
		pattern: Lexer$1.NA
	});
	augmentTokenTypes([RFT]);
	RECORDING_PHASE_TOKEN = createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
	Object.freeze(RECORDING_PHASE_TOKEN);
	RECORDING_PHASE_CSTNODE = {
		name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",
		children: {}
	};
	GastRecorder = function() {
		function GastRecorder$1() {}
		GastRecorder$1.prototype.initGastRecorder = function(config) {
			this.recordingProdStack = [];
			this.RECORDING_PHASE = false;
		};
		GastRecorder$1.prototype.enableRecording = function() {
			var _this = this;
			this.RECORDING_PHASE = true;
			this.TRACE_INIT("Enable Recording", function() {
				var _loop_1 = function(i$1) {
					var idx = i$1 > 0 ? i$1 : "";
					_this["CONSUME" + idx] = function(arg1, arg2) {
						return this.consumeInternalRecord(arg1, i$1, arg2);
					};
					_this["SUBRULE" + idx] = function(arg1, arg2) {
						return this.subruleInternalRecord(arg1, i$1, arg2);
					};
					_this["OPTION" + idx] = function(arg1) {
						return this.optionInternalRecord(arg1, i$1);
					};
					_this["OR" + idx] = function(arg1) {
						return this.orInternalRecord(arg1, i$1);
					};
					_this["MANY" + idx] = function(arg1) {
						this.manyInternalRecord(i$1, arg1);
					};
					_this["MANY_SEP" + idx] = function(arg1) {
						this.manySepFirstInternalRecord(i$1, arg1);
					};
					_this["AT_LEAST_ONE" + idx] = function(arg1) {
						this.atLeastOneInternalRecord(i$1, arg1);
					};
					_this["AT_LEAST_ONE_SEP" + idx] = function(arg1) {
						this.atLeastOneSepFirstInternalRecord(i$1, arg1);
					};
				};
				for (var i = 0; i < 10; i++) _loop_1(i);
				_this["consume"] = function(idx, arg1, arg2) {
					return this.consumeInternalRecord(arg1, idx, arg2);
				};
				_this["subrule"] = function(idx, arg1, arg2) {
					return this.subruleInternalRecord(arg1, idx, arg2);
				};
				_this["option"] = function(idx, arg1) {
					return this.optionInternalRecord(arg1, idx);
				};
				_this["or"] = function(idx, arg1) {
					return this.orInternalRecord(arg1, idx);
				};
				_this["many"] = function(idx, arg1) {
					this.manyInternalRecord(idx, arg1);
				};
				_this["atLeastOne"] = function(idx, arg1) {
					this.atLeastOneInternalRecord(idx, arg1);
				};
				_this.ACTION = _this.ACTION_RECORD;
				_this.BACKTRACK = _this.BACKTRACK_RECORD;
				_this.LA = _this.LA_RECORD;
			});
		};
		GastRecorder$1.prototype.disableRecording = function() {
			var _this = this;
			this.RECORDING_PHASE = false;
			this.TRACE_INIT("Deleting Recording methods", function() {
				for (var i = 0; i < 10; i++) {
					var idx = i > 0 ? i : "";
					delete _this["CONSUME" + idx];
					delete _this["SUBRULE" + idx];
					delete _this["OPTION" + idx];
					delete _this["OR" + idx];
					delete _this["MANY" + idx];
					delete _this["MANY_SEP" + idx];
					delete _this["AT_LEAST_ONE" + idx];
					delete _this["AT_LEAST_ONE_SEP" + idx];
				}
				delete _this["consume"];
				delete _this["subrule"];
				delete _this["option"];
				delete _this["or"];
				delete _this["many"];
				delete _this["atLeastOne"];
				delete _this.ACTION;
				delete _this.BACKTRACK;
				delete _this.LA;
			});
		};
		GastRecorder$1.prototype.ACTION_RECORD = function(impl) {};
		GastRecorder$1.prototype.BACKTRACK_RECORD = function(grammarRule, args) {
			return function() {
				return true;
			};
		};
		GastRecorder$1.prototype.LA_RECORD = function(howMuch) {
			return END_OF_FILE;
		};
		GastRecorder$1.prototype.topLevelRuleRecord = function(name, def) {
			try {
				var newTopLevelRule = new Rule({
					definition: [],
					name
				});
				newTopLevelRule.name = name;
				this.recordingProdStack.push(newTopLevelRule);
				def.call(this);
				this.recordingProdStack.pop();
				return newTopLevelRule;
			} catch (originalError) {
				if (originalError.KNOWN_RECORDER_ERROR !== true) try {
					originalError.message = originalError.message + "\n	 This error was thrown during the \"grammar recording phase\" For more info see:\n	https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording";
				} catch (mutabilityError) {
					throw originalError;
				}
				throw originalError;
			}
		};
		GastRecorder$1.prototype.optionInternalRecord = function(actionORMethodDef, occurrence) {
			return recordProd.call(this, Option, actionORMethodDef, occurrence);
		};
		GastRecorder$1.prototype.atLeastOneInternalRecord = function(occurrence, actionORMethodDef) {
			recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
		};
		GastRecorder$1.prototype.atLeastOneSepFirstInternalRecord = function(occurrence, options) {
			recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
		};
		GastRecorder$1.prototype.manyInternalRecord = function(occurrence, actionORMethodDef) {
			recordProd.call(this, Repetition, actionORMethodDef, occurrence);
		};
		GastRecorder$1.prototype.manySepFirstInternalRecord = function(occurrence, options) {
			recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
		};
		GastRecorder$1.prototype.orInternalRecord = function(altsOrOpts, occurrence) {
			return recordOrProd.call(this, altsOrOpts, occurrence);
		};
		GastRecorder$1.prototype.subruleInternalRecord = function(ruleToCall, occurrence, options) {
			assertMethodIdxIsValid(occurrence);
			if (!ruleToCall || has$4(ruleToCall, "ruleName") === false) {
				var error = /* @__PURE__ */ new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
				error.KNOWN_RECORDER_ERROR = true;
				throw error;
			}
			var prevProd = peek(this.recordingProdStack);
			var ruleName = ruleToCall["ruleName"];
			var newNoneTerminal = new NonTerminal({
				idx: occurrence,
				nonTerminalName: ruleName,
				referencedRule: void 0
			});
			prevProd.definition.push(newNoneTerminal);
			return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
		};
		GastRecorder$1.prototype.consumeInternalRecord = function(tokType, occurrence, options) {
			assertMethodIdxIsValid(occurrence);
			if (!hasShortKeyProperty(tokType)) {
				var error = /* @__PURE__ */ new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
				error.KNOWN_RECORDER_ERROR = true;
				throw error;
			}
			var prevProd = peek(this.recordingProdStack);
			var newNoneTerminal = new Terminal({
				idx: occurrence,
				terminalType: tokType
			});
			prevProd.definition.push(newNoneTerminal);
			return RECORDING_PHASE_TOKEN;
		};
		return GastRecorder$1;
	}();
}));
var PerformanceTracer;
var init_perf_tracer = __esmMin((() => {
	init_utils();
	init_parser();
	PerformanceTracer = function() {
		function PerformanceTracer$1() {}
		PerformanceTracer$1.prototype.initPerformanceTracer = function(config) {
			if (has$4(config, "traceInitPerf")) {
				var userTraceInitPerf = config.traceInitPerf;
				var traceIsNumber = typeof userTraceInitPerf === "number";
				this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
				this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
			} else {
				this.traceInitMaxIdent = 0;
				this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
			}
			this.traceInitIndent = -1;
		};
		PerformanceTracer$1.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
			if (this.traceInitPerf === true) {
				this.traceInitIndent++;
				var indent$1 = new Array(this.traceInitIndent + 1).join("	");
				if (this.traceInitIndent < this.traceInitMaxIdent) console.log(indent$1 + "--> <" + phaseDesc + ">");
				var _a = timer(phaseImpl), time = _a.time, value = _a.value;
				/* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
				var traceMethod = time > 10 ? console.warn : console.log;
				if (this.traceInitIndent < this.traceInitMaxIdent) traceMethod(indent$1 + "<-- <" + phaseDesc + "> time: " + time + "ms");
				this.traceInitIndent--;
				return value;
			} else return phaseImpl();
		};
		return PerformanceTracer$1;
	}();
}));
function EMPTY_ALT(value) {
	if (value === void 0) value = void 0;
	return function() {
		return value;
	};
}
var __extends, END_OF_FILE, DEFAULT_PARSER_CONFIG, DEFAULT_RULE_CONFIG, ParserDefinitionErrorType, Parser$2, CstParser$1, EmbeddedActionsParser;
var init_parser = __esmMin((() => {
	init_utils();
	init_follow();
	init_tokens_public();
	init_errors_public();
	init_gast_resolver_public();
	init_recoverable();
	init_looksahead();
	init_tree_builder();
	init_lexer_adapter();
	init_recognizer_api();
	init_recognizer_engine();
	init_error_handler();
	init_context_assist();
	init_gast_recorder();
	init_perf_tracer();
	__extends = (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
	Object.freeze(END_OF_FILE);
	DEFAULT_PARSER_CONFIG = Object.freeze({
		recoveryEnabled: false,
		maxLookahead: 3,
		dynamicTokensEnabled: false,
		outputCst: true,
		errorMessageProvider: defaultParserErrorProvider,
		nodeLocationTracking: "none",
		traceInitPerf: false,
		skipValidations: false
	});
	DEFAULT_RULE_CONFIG = Object.freeze({
		recoveryValueFunc: function() {},
		resyncEnabled: true
	});
	(function(ParserDefinitionErrorType$1) {
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
		ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
	})(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
	Parser$2 = function() {
		function Parser$3(tokenVocabulary, config) {
			this.definitionErrors = [];
			this.selfAnalysisDone = false;
			var that = this;
			that.initErrorHandler(config);
			that.initLexerAdapter();
			that.initLooksAhead(config);
			that.initRecognizerEngine(tokenVocabulary, config);
			that.initRecoverable(config);
			that.initTreeBuilder(config);
			that.initContentAssist();
			that.initGastRecorder(config);
			that.initPerformanceTracer(config);
			if (has$4(config, "ignoredIssues")) throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
			this.skipValidations = has$4(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
		}
		Parser$3.performSelfAnalysis = function(parserInstance) {
			throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
		};
		Parser$3.prototype.performSelfAnalysis = function() {
			var _this = this;
			this.TRACE_INIT("performSelfAnalysis", function() {
				var defErrorsMsgs;
				_this.selfAnalysisDone = true;
				var className = _this.className;
				_this.TRACE_INIT("toFastProps", function() {
					toFastProperties(_this);
				});
				_this.TRACE_INIT("Grammar Recording", function() {
					try {
						_this.enableRecording();
						forEach$7(_this.definedRulesNames, function(currRuleName) {
							var originalGrammarAction = _this[currRuleName]["originalGrammarAction"];
							var recordedRuleGast = void 0;
							_this.TRACE_INIT(currRuleName + " Rule", function() {
								recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
							});
							_this.gastProductionsCache[currRuleName] = recordedRuleGast;
						});
					} finally {
						_this.disableRecording();
					}
				});
				var resolverErrors = [];
				_this.TRACE_INIT("Grammar Resolving", function() {
					resolverErrors = resolveGrammar({ rules: values(_this.gastProductionsCache) });
					_this.definitionErrors.push.apply(_this.definitionErrors, resolverErrors);
				});
				_this.TRACE_INIT("Grammar Validations", function() {
					if (isEmpty$1(resolverErrors) && _this.skipValidations === false) {
						var validationErrors = validateGrammar({
							rules: values(_this.gastProductionsCache),
							maxLookahead: _this.maxLookahead,
							tokenTypes: values(_this.tokensMap),
							errMsgProvider: defaultGrammarValidatorErrorProvider,
							grammarName: className
						});
						_this.definitionErrors.push.apply(_this.definitionErrors, validationErrors);
					}
				});
				if (isEmpty$1(_this.definitionErrors)) {
					if (_this.recoveryEnabled) _this.TRACE_INIT("computeAllProdsFollows", function() {
						_this.resyncFollows = computeAllProdsFollows(values(_this.gastProductionsCache));
					});
					_this.TRACE_INIT("ComputeLookaheadFunctions", function() {
						_this.preComputeLookaheadFunctions(values(_this.gastProductionsCache));
					});
				}
				if (!Parser$3.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty$1(_this.definitionErrors)) {
					defErrorsMsgs = map$10(_this.definitionErrors, function(defError) {
						return defError.message;
					});
					throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
				}
			});
		};
		Parser$3.DEFER_DEFINITION_ERRORS_HANDLING = false;
		return Parser$3;
	}();
	applyMixins(Parser$2, [
		Recoverable,
		LooksAhead,
		TreeBuilder,
		LexerAdapter,
		RecognizerEngine,
		RecognizerApi,
		ErrorHandler,
		ContentAssist,
		GastRecorder,
		PerformanceTracer
	]);
	CstParser$1 = function(_super) {
		__extends(CstParser$2, _super);
		function CstParser$2(tokenVocabulary, config) {
			if (config === void 0) config = DEFAULT_PARSER_CONFIG;
			var _this = this;
			var configClone = cloneObj(config);
			configClone.outputCst = true;
			_this = _super.call(this, tokenVocabulary, configClone) || this;
			return _this;
		}
		return CstParser$2;
	}(Parser$2);
	EmbeddedActionsParser = function(_super) {
		__extends(EmbeddedActionsParser$1, _super);
		function EmbeddedActionsParser$1(tokenVocabulary, config) {
			if (config === void 0) config = DEFAULT_PARSER_CONFIG;
			var _this = this;
			var configClone = cloneObj(config);
			configClone.outputCst = false;
			_this = _super.call(this, tokenVocabulary, configClone) || this;
			return _this;
		}
		return EmbeddedActionsParser$1;
	}(Parser$2);
}));
function createSyntaxDiagramsCode(grammar, _a) {
	var _b = _a === void 0 ? {} : _a, _c = _b.resourceBase, resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/" : _c, _d = _b.css, css = _d === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/diagrams.css" : _d;
	var header = "\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n";
	var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
	var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_builder.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'><\/script>\n<script src='" + resourceBase + "src/main.js'><\/script>\n";
	var diagramsDiv = "\n<div id=\"diagrams\" align=\"center\"></div>    \n";
	var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n<\/script>\n";
	return header + cssHtml + scripts + diagramsDiv + serializedGrammar + "\n<script>\n    var diagramsDiv = document.getElementById(\"diagrams\");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n<\/script>\n";
}
var init_render_public = __esmMin((() => {
	init_version();
}));
function genUmdModule(options) {
	return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
}
function genWrapperFunction(options) {
	return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
}
function genClass(options) {
	return "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + genAllRules(options.rules) + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" + options.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
}
function genAllRules(rules) {
	return map$10(rules, function(currRule) {
		return genRule(currRule, 1);
	}).join("\n");
}
function genRule(prod, n) {
	var result = indent(n, "$.RULE(\"" + prod.name + "\", function() {") + NL;
	result += genDefinition(prod.definition, n + 1);
	result += indent(n + 1, "})") + NL;
	return result;
}
function genTerminal(prod, n) {
	var name = prod.terminalType.name;
	return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
}
function genNonTerminal(prod, n) {
	return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
}
function genAlternation(prod, n) {
	var result = indent(n, "$.OR" + prod.idx + "([") + NL;
	var alts = map$10(prod.definition, function(altDef) {
		return genSingleAlt(altDef, n + 1);
	});
	result += alts.join("," + NL);
	result += NL + indent(n, "])" + NL);
	return result;
}
function genSingleAlt(prod, n) {
	var result = indent(n, "{") + NL;
	result += indent(n + 1, "ALT: function() {") + NL;
	result += genDefinition(prod.definition, n + 1);
	result += indent(n + 1, "}") + NL;
	result += indent(n, "}");
	return result;
}
function genProd(prod, n) {
	/* istanbul ignore else */
	if (prod instanceof NonTerminal) return genNonTerminal(prod, n);
	else if (prod instanceof Option) return genDSLRule("OPTION", prod, n);
	else if (prod instanceof RepetitionMandatory) return genDSLRule("AT_LEAST_ONE", prod, n);
	else if (prod instanceof RepetitionMandatoryWithSeparator) return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
	else if (prod instanceof RepetitionWithSeparator) return genDSLRule("MANY_SEP", prod, n);
	else if (prod instanceof Repetition) return genDSLRule("MANY", prod, n);
	else if (prod instanceof Alternation) return genAlternation(prod, n);
	else if (prod instanceof Terminal) return genTerminal(prod, n);
	else if (prod instanceof Alternative) return genDefinition(prod.definition, n);
	else throw Error("non exhaustive match");
}
function genDSLRule(dslName, prod, n) {
	var result = indent(n, "$." + (dslName + prod.idx) + "(");
	if (prod.separator) {
		result += "{" + NL;
		result += indent(n + 1, "SEP: this.tokensMap." + prod.separator.name) + "," + NL;
		result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL;
		result += indent(n, "}") + NL;
	} else result += genDefFunction(prod.definition, n + 1);
	result += indent(n, ")") + NL;
	return result;
}
function genDefFunction(definition, n) {
	var def = "function() {" + NL;
	def += genDefinition(definition, n);
	def += indent(n, "}") + NL;
	return def;
}
function genDefinition(def, n) {
	var result = "";
	forEach$7(def, function(prod) {
		result += genProd(prod, n + 1);
	});
	return result;
}
function indent(howMuch, text) {
	return Array(howMuch * 4 + 1).join(" ") + text;
}
var NL;
var init_generate = __esmMin((() => {
	init_utils();
	init_gast_public();
	NL = "\n";
}));
function generateParserFactory(options) {
	var wrapperText = genWrapperFunction({
		name: options.name,
		rules: options.rules
	});
	var constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
	return function(config) {
		return constructorWrapper(options.tokenVocabulary, config, (init_api(), __toCommonJS(api_exports)));
	};
}
function generateParserModule(options) {
	return genUmdModule({
		name: options.name,
		rules: options.rules
	});
}
var init_generate_public = __esmMin((() => {
	init_generate();
}));
var api_exports = /* @__PURE__ */ __export({
	Alternation: () => Alternation,
	Alternative: () => Alternative,
	CstParser: () => CstParser$1,
	EMPTY_ALT: () => EMPTY_ALT,
	EOF: () => EOF,
	EarlyExitException: () => EarlyExitException,
	EmbeddedActionsParser: () => EmbeddedActionsParser,
	GAstVisitor: () => GAstVisitor,
	Lexer: () => Lexer$1,
	LexerDefinitionErrorType: () => LexerDefinitionErrorType,
	MismatchedTokenException: () => MismatchedTokenException,
	NoViableAltException: () => NoViableAltException,
	NonTerminal: () => NonTerminal,
	NotAllInputParsedException: () => NotAllInputParsedException,
	Option: () => Option,
	Parser: () => Parser$1,
	ParserDefinitionErrorType: () => ParserDefinitionErrorType,
	Repetition: () => Repetition,
	RepetitionMandatory: () => RepetitionMandatory,
	RepetitionMandatoryWithSeparator: () => RepetitionMandatoryWithSeparator,
	RepetitionWithSeparator: () => RepetitionWithSeparator,
	Rule: () => Rule,
	Terminal: () => Terminal,
	VERSION: () => VERSION,
	assignOccurrenceIndices: () => assignOccurrenceIndices,
	clearCache: () => clearCache,
	createSyntaxDiagramsCode: () => createSyntaxDiagramsCode,
	createToken: () => createToken$1,
	createTokenInstance: () => createTokenInstance,
	defaultGrammarResolverErrorProvider: () => defaultGrammarResolverErrorProvider,
	defaultGrammarValidatorErrorProvider: () => defaultGrammarValidatorErrorProvider,
	defaultLexerErrorProvider: () => defaultLexerErrorProvider,
	defaultParserErrorProvider: () => defaultParserErrorProvider,
	generateParserFactory: () => generateParserFactory,
	generateParserModule: () => generateParserModule,
	isRecognitionException: () => isRecognitionException,
	resolveGrammar: () => resolveGrammar,
	serializeGrammar: () => serializeGrammar,
	serializeProduction: () => serializeProduction,
	tokenLabel: () => tokenLabel,
	tokenMatcher: () => tokenMatcher$1,
	tokenName: () => tokenName,
	validateGrammar: () => validateGrammar
});
/* istanbul ignore next */
function clearCache() {
	console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future");
}
var Parser$1;
var init_api = __esmMin((() => {
	init_version();
	init_parser();
	init_lexer_public();
	init_tokens_public();
	init_errors_public();
	init_exceptions_public();
	init_lexer_errors_public();
	init_gast_public();
	init_gast_visitor_public();
	init_gast_resolver_public();
	init_render_public();
	init_generate_public();
	Parser$1 = function() {
		function Parser$3() {
			throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0");
		}
		return Parser$3;
	}();
}));
var require_lexer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { createToken: createTokenOrg, Lexer } = (init_api(), __toCommonJS(api_exports));
	const fragments = {};
	const f = fragments;
	function FRAGMENT(name, def) {
		fragments[name] = typeof def === "string" ? def : def.source;
	}
	function makePattern(strings, ...args) {
		let combined = "";
		for (let i = 0; i < strings.length; i++) {
			combined += strings[i];
			if (i < args.length) {
				let pattern = args[i];
				combined += `(?:${pattern})`;
			}
		}
		return new RegExp(combined);
	}
	const tokensArray = [];
	const tokensDictionary = {};
	function createToken(options) {
		const newTokenType = createTokenOrg(options);
		tokensArray.push(newTokenType);
		tokensDictionary[options.name] = newTokenType;
		return newTokenType;
	}
	FRAGMENT("NameStartChar", "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)");
	FRAGMENT("NameChar", makePattern`${f.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`);
	FRAGMENT("Name", makePattern`${f.NameStartChar}(${f.NameChar})*`);
	const Comment = createToken({
		name: "Comment",
		pattern: /<!--(.|\r?\n)*?-->/,
		line_breaks: true
	});
	const CData = createToken({
		name: "CData",
		pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/,
		line_breaks: true
	});
	const DocType = createToken({
		name: "DocType",
		pattern: /<!DOCTYPE/,
		push_mode: "INSIDE"
	});
	const IgnoredDTD = createToken({
		name: "DTD",
		pattern: /<!.*?>/,
		group: Lexer.SKIPPED
	});
	const EntityRef = createToken({
		name: "EntityRef",
		pattern: makePattern`&${f.Name};`
	});
	const CharRef = createToken({
		name: "CharRef",
		pattern: /&#\d+;|&#x[a-fA-F0-9]/
	});
	const SEA_WS = createToken({
		name: "SEA_WS",
		pattern: /( |\t|\n|\r\n)+/
	});
	const XMLDeclOpen = createToken({
		name: "XMLDeclOpen",
		pattern: /<\?xml[ \t\r\n]/,
		push_mode: "INSIDE"
	});
	const SLASH_OPEN = createToken({
		name: "SLASH_OPEN",
		pattern: /<\//,
		push_mode: "INSIDE"
	});
	const INVALID_SLASH_OPEN = createToken({
		name: "INVALID_SLASH_OPEN",
		pattern: /<\//,
		categories: [SLASH_OPEN]
	});
	const PROCESSING_INSTRUCTION = createToken({
		name: "PROCESSING_INSTRUCTION",
		pattern: makePattern`<\\?${f.Name}.*\\?>`
	});
	const OPEN = createToken({
		name: "OPEN",
		pattern: /</,
		push_mode: "INSIDE"
	});
	const INVALID_OPEN_INSIDE = createToken({
		name: "INVALID_OPEN_INSIDE",
		pattern: /</,
		categories: [OPEN]
	});
	const TEXT = createToken({
		name: "TEXT",
		pattern: /[^<&]+/
	});
	const CLOSE = createToken({
		name: "CLOSE",
		pattern: />/,
		pop_mode: true
	});
	const SPECIAL_CLOSE = createToken({
		name: "SPECIAL_CLOSE",
		pattern: /\?>/,
		pop_mode: true
	});
	const SLASH_CLOSE = createToken({
		name: "SLASH_CLOSE",
		pattern: /\/>/,
		pop_mode: true
	});
	const SLASH = createToken({
		name: "SLASH",
		pattern: /\//
	});
	const STRING = createToken({
		name: "STRING",
		pattern: /"[^<"]*"|'[^<']*'/
	});
	const EQUALS = createToken({
		name: "EQUALS",
		pattern: /=/
	});
	const Name = createToken({
		name: "Name",
		pattern: makePattern`${f.Name}`
	});
	const S = createToken({
		name: "S",
		pattern: /[ \t\r\n]/,
		group: Lexer.SKIPPED
	});
	module.exports = {
		xmlLexer: new Lexer({
			defaultMode: "OUTSIDE",
			modes: {
				OUTSIDE: [
					Comment,
					CData,
					DocType,
					IgnoredDTD,
					EntityRef,
					CharRef,
					SEA_WS,
					XMLDeclOpen,
					SLASH_OPEN,
					PROCESSING_INSTRUCTION,
					OPEN,
					TEXT
				],
				INSIDE: [
					Comment,
					INVALID_SLASH_OPEN,
					INVALID_OPEN_INSIDE,
					CLOSE,
					SPECIAL_CLOSE,
					SLASH_CLOSE,
					SLASH,
					EQUALS,
					STRING,
					Name,
					S
				]
			}
		}, {
			positionTracking: "full",
			ensureOptimizations: false,
			lineTerminatorCharacters: ["\n"],
			lineTerminatorsPattern: /\n|\r\n/g
		}),
		tokensDictionary
	};
}));
var require_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { CstParser, tokenMatcher } = (init_api(), __toCommonJS(api_exports));
	const { tokensDictionary: t } = require_lexer();
	var Parser = class extends CstParser {
		constructor() {
			super(t, {
				maxLookahead: 1,
				recoveryEnabled: true,
				nodeLocationTracking: "full"
			});
			this.deletionRecoveryEnabled = true;
			const $ = this;
			$.RULE("document", () => {
				$.OPTION(() => {
					$.SUBRULE($.prolog);
				});
				$.MANY(() => {
					$.SUBRULE($.misc);
				});
				$.OPTION2(() => {
					$.SUBRULE($.docTypeDecl);
				});
				$.MANY2(() => {
					$.SUBRULE2($.misc);
				});
				$.SUBRULE($.element);
				$.MANY3(() => {
					$.SUBRULE3($.misc);
				});
			});
			$.RULE("prolog", () => {
				$.CONSUME(t.XMLDeclOpen);
				$.MANY(() => {
					$.SUBRULE($.attribute);
				});
				$.CONSUME(t.SPECIAL_CLOSE);
			});
			$.RULE("docTypeDecl", () => {
				$.CONSUME(t.DocType);
				$.CONSUME(t.Name);
				$.OPTION(() => {
					$.SUBRULE($.externalID);
				});
				$.CONSUME(t.CLOSE);
			});
			$.RULE("externalID", () => {
				$.OR([{
					GATE: () => $.LA(1).image === "SYSTEM",
					ALT: () => {
						$.CONSUME2(t.Name, { LABEL: "System" });
						$.CONSUME(t.STRING, { LABEL: "SystemLiteral" });
					}
				}, {
					GATE: () => $.LA(1).image === "PUBLIC",
					ALT: () => {
						$.CONSUME3(t.Name, { LABEL: "Public" });
						$.CONSUME2(t.STRING, { LABEL: "PubIDLiteral" });
						$.CONSUME3(t.STRING, { LABEL: "SystemLiteral" });
					}
				}]);
			});
			$.RULE("content", () => {
				$.MANY(() => {
					$.OR([
						{ ALT: () => $.SUBRULE($.element) },
						{ ALT: () => $.SUBRULE($.chardata) },
						{ ALT: () => $.SUBRULE($.reference) },
						{ ALT: () => $.CONSUME(t.CData) },
						{ ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION) },
						{ ALT: () => $.CONSUME(t.Comment) }
					]);
				});
			});
			$.RULE("element", () => {
				$.CONSUME(t.OPEN);
				try {
					this.deletionRecoveryEnabled = false;
					$.CONSUME(t.Name);
				} finally {
					this.deletionRecoveryEnabled = true;
				}
				$.MANY(() => {
					$.SUBRULE($.attribute);
				});
				$.OR([{ ALT: () => {
					$.CONSUME(t.CLOSE, { LABEL: "START_CLOSE" });
					$.SUBRULE($.content);
					$.CONSUME(t.SLASH_OPEN);
					$.CONSUME2(t.Name, { LABEL: "END_NAME" });
					$.CONSUME2(t.CLOSE, { LABEL: "END" });
				} }, { ALT: () => {
					$.CONSUME(t.SLASH_CLOSE);
				} }]);
			});
			$.RULE("reference", () => {
				$.OR([{ ALT: () => $.CONSUME(t.EntityRef) }, { ALT: () => $.CONSUME(t.CharRef) }]);
			});
			$.RULE("attribute", () => {
				$.CONSUME(t.Name);
				try {
					this.deletionRecoveryEnabled = false;
					$.CONSUME(t.EQUALS);
					$.CONSUME(t.STRING);
				} finally {
					this.deletionRecoveryEnabled = true;
				}
			});
			$.RULE("chardata", () => {
				$.OR([{ ALT: () => $.CONSUME(t.TEXT) }, { ALT: () => $.CONSUME(t.SEA_WS) }]);
			});
			$.RULE("misc", () => {
				$.OR([
					{ ALT: () => $.CONSUME(t.Comment) },
					{ ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION) },
					{ ALT: () => $.CONSUME(t.SEA_WS) }
				]);
			});
			this.performSelfAnalysis();
		}
		canRecoverWithSingleTokenDeletion(expectedTokType) {
			if (this.deletionRecoveryEnabled === false) return false;
			return super.canRecoverWithSingleTokenDeletion(expectedTokType);
		}
		/* istanbul ignore next - should be tested as part of Chevrotain */
		findReSyncTokenType() {
			const allPossibleReSyncTokTypes = this.flattenFollowSet();
			let nextToken = this.LA(1);
			let k = 2;
			while (true) {
				const foundMatch = allPossibleReSyncTokTypes.find((resyncTokType) => {
					return tokenMatcher(nextToken, resyncTokType);
				});
				if (foundMatch !== void 0) return foundMatch;
				nextToken = this.LA(k);
				k++;
			}
		}
	};
	module.exports = { xmlParser: new Parser() };
}));
var require_api$5 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { xmlLexer } = require_lexer();
	const { xmlParser } = require_parser();
	module.exports = {
		parse: function parse$1(text) {
			const lexResult = xmlLexer.tokenize(text);
			xmlParser.input = lexResult.tokens;
			return {
				cst: xmlParser.document(),
				tokenVector: lexResult.tokens,
				lexErrors: lexResult.errors,
				parseErrors: xmlParser.errors
			};
		},
		BaseXmlCstVisitor: xmlParser.getBaseCstVisitorConstructor()
	};
}));
var require_lodash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var undefined$1;
		var VERSION$2 = "4.17.21";
		var LARGE_ARRAY_SIZE = 200;
		var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
		var HASH_UNDEFINED = "__lodash_hash_undefined__";
		var MAX_MEMOIZE_SIZE = 500;
		var PLACEHOLDER = "__lodash_placeholder__";
		var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
		var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
		var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
		var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
		var HOT_COUNT = 800, HOT_SPAN = 16;
		var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
		var INFINITY = Infinity, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = NaN;
		var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
		var wrapFlags = [
			["ary", WRAP_ARY_FLAG],
			["bind", WRAP_BIND_FLAG],
			["bindKey", WRAP_BIND_KEY_FLAG],
			["curry", WRAP_CURRY_FLAG],
			["curryRight", WRAP_CURRY_RIGHT_FLAG],
			["flip", WRAP_FLIP_FLAG],
			["partial", WRAP_PARTIAL_FLAG],
			["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
			["rearg", WRAP_REARG_FLAG]
		];
		var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
		var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
		var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
		var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
		var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
		var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
		var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
		var reTrimStart = /^\s+/;
		var reWhitespace = /\s/;
		var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
		var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
		var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
		var reEscapeChar = /\\(\\)?/g;
		var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
		var reFlags = /\w*$/;
		var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
		var reIsBinary = /^0b[01]+$/i;
		var reIsHostCtor = /^\[object .+?Constructor\]$/;
		var reIsOctal = /^0o[0-7]+$/i;
		var reIsUint = /^(?:0|[1-9]\d*)$/;
		var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
		var reNoMatch = /($^)/;
		var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
		var rsAstralRange = "\\ud800-\\udfff", rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
		var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
		var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
			rsNonAstral,
			rsRegional,
			rsSurrPair
		].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [
			rsDingbat,
			rsRegional,
			rsSurrPair
		].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [
			rsNonAstral + rsCombo + "?",
			rsCombo,
			rsRegional,
			rsSurrPair,
			rsAstral
		].join("|") + ")";
		var reApos = RegExp(rsApos, "g");
		var reComboMark = RegExp(rsCombo, "g");
		var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
		var reUnicodeWord = RegExp([
			rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [
				rsBreak,
				rsUpper,
				"$"
			].join("|") + ")",
			rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [
				rsBreak,
				rsUpper + rsMiscLower,
				"$"
			].join("|") + ")",
			rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
			rsUpper + "+" + rsOptContrUpper,
			rsOrdUpper,
			rsOrdLower,
			rsDigits,
			rsEmoji
		].join("|"), "g");
		var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
		var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
		var contextProps = [
			"Array",
			"Buffer",
			"DataView",
			"Date",
			"Error",
			"Float32Array",
			"Float64Array",
			"Function",
			"Int8Array",
			"Int16Array",
			"Int32Array",
			"Map",
			"Math",
			"Object",
			"Promise",
			"RegExp",
			"Set",
			"String",
			"Symbol",
			"TypeError",
			"Uint8Array",
			"Uint8ClampedArray",
			"Uint16Array",
			"Uint32Array",
			"WeakMap",
			"_",
			"clearTimeout",
			"isFinite",
			"parseInt",
			"setTimeout"
		];
		var templateCounter = -1;
		var typedArrayTags = {};
		typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
		typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
		var cloneableTags = {};
		cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
		cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
		var deburredLetters = {
			"À": "A",
			"Á": "A",
			"Â": "A",
			"Ã": "A",
			"Ä": "A",
			"Å": "A",
			"à": "a",
			"á": "a",
			"â": "a",
			"ã": "a",
			"ä": "a",
			"å": "a",
			"Ç": "C",
			"ç": "c",
			"Ð": "D",
			"ð": "d",
			"È": "E",
			"É": "E",
			"Ê": "E",
			"Ë": "E",
			"è": "e",
			"é": "e",
			"ê": "e",
			"ë": "e",
			"Ì": "I",
			"Í": "I",
			"Î": "I",
			"Ï": "I",
			"ì": "i",
			"í": "i",
			"î": "i",
			"ï": "i",
			"Ñ": "N",
			"ñ": "n",
			"Ò": "O",
			"Ó": "O",
			"Ô": "O",
			"Õ": "O",
			"Ö": "O",
			"Ø": "O",
			"ò": "o",
			"ó": "o",
			"ô": "o",
			"õ": "o",
			"ö": "o",
			"ø": "o",
			"Ù": "U",
			"Ú": "U",
			"Û": "U",
			"Ü": "U",
			"ù": "u",
			"ú": "u",
			"û": "u",
			"ü": "u",
			"Ý": "Y",
			"ý": "y",
			"ÿ": "y",
			"Æ": "Ae",
			"æ": "ae",
			"Þ": "Th",
			"þ": "th",
			"ß": "ss",
			"Ā": "A",
			"Ă": "A",
			"Ą": "A",
			"ā": "a",
			"ă": "a",
			"ą": "a",
			"Ć": "C",
			"Ĉ": "C",
			"Ċ": "C",
			"Č": "C",
			"ć": "c",
			"ĉ": "c",
			"ċ": "c",
			"č": "c",
			"Ď": "D",
			"Đ": "D",
			"ď": "d",
			"đ": "d",
			"Ē": "E",
			"Ĕ": "E",
			"Ė": "E",
			"Ę": "E",
			"Ě": "E",
			"ē": "e",
			"ĕ": "e",
			"ė": "e",
			"ę": "e",
			"ě": "e",
			"Ĝ": "G",
			"Ğ": "G",
			"Ġ": "G",
			"Ģ": "G",
			"ĝ": "g",
			"ğ": "g",
			"ġ": "g",
			"ģ": "g",
			"Ĥ": "H",
			"Ħ": "H",
			"ĥ": "h",
			"ħ": "h",
			"Ĩ": "I",
			"Ī": "I",
			"Ĭ": "I",
			"Į": "I",
			"İ": "I",
			"ĩ": "i",
			"ī": "i",
			"ĭ": "i",
			"į": "i",
			"ı": "i",
			"Ĵ": "J",
			"ĵ": "j",
			"Ķ": "K",
			"ķ": "k",
			"ĸ": "k",
			"Ĺ": "L",
			"Ļ": "L",
			"Ľ": "L",
			"Ŀ": "L",
			"Ł": "L",
			"ĺ": "l",
			"ļ": "l",
			"ľ": "l",
			"ŀ": "l",
			"ł": "l",
			"Ń": "N",
			"Ņ": "N",
			"Ň": "N",
			"Ŋ": "N",
			"ń": "n",
			"ņ": "n",
			"ň": "n",
			"ŋ": "n",
			"Ō": "O",
			"Ŏ": "O",
			"Ő": "O",
			"ō": "o",
			"ŏ": "o",
			"ő": "o",
			"Ŕ": "R",
			"Ŗ": "R",
			"Ř": "R",
			"ŕ": "r",
			"ŗ": "r",
			"ř": "r",
			"Ś": "S",
			"Ŝ": "S",
			"Ş": "S",
			"Š": "S",
			"ś": "s",
			"ŝ": "s",
			"ş": "s",
			"š": "s",
			"Ţ": "T",
			"Ť": "T",
			"Ŧ": "T",
			"ţ": "t",
			"ť": "t",
			"ŧ": "t",
			"Ũ": "U",
			"Ū": "U",
			"Ŭ": "U",
			"Ů": "U",
			"Ű": "U",
			"Ų": "U",
			"ũ": "u",
			"ū": "u",
			"ŭ": "u",
			"ů": "u",
			"ű": "u",
			"ų": "u",
			"Ŵ": "W",
			"ŵ": "w",
			"Ŷ": "Y",
			"ŷ": "y",
			"Ÿ": "Y",
			"Ź": "Z",
			"Ż": "Z",
			"Ž": "Z",
			"ź": "z",
			"ż": "z",
			"ž": "z",
			"Ĳ": "IJ",
			"ĳ": "ij",
			"Œ": "Oe",
			"œ": "oe",
			"ŉ": "'n",
			"ſ": "s"
		};
		var htmlEscapes = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;"
		};
		var htmlUnescapes = {
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&quot;": "\"",
			"&#39;": "'"
		};
		var stringEscapes = {
			"\\": "\\",
			"'": "'",
			"\n": "n",
			"\r": "r",
			"\u2028": "u2028",
			"\u2029": "u2029"
		};
		var freeParseFloat = parseFloat, freeParseInt = parseInt;
		var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
		var freeSelf = typeof self == "object" && self && self.Object === Object && self;
		var root = freeGlobal || freeSelf || Function("return this")();
		var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
		var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
		var moduleExports = freeModule && freeModule.exports === freeExports;
		var freeProcess = moduleExports && freeGlobal.process;
		var nodeUtil = function() {
			try {
				var types = freeModule && freeModule.require && freeModule.require("util").types;
				if (types) return types;
				return freeProcess && freeProcess.binding && freeProcess.binding("util");
			} catch (e) {}
		}();
		var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
		function apply(func, thisArg, args) {
			switch (args.length) {
				case 0: return func.call(thisArg);
				case 1: return func.call(thisArg, args[0]);
				case 2: return func.call(thisArg, args[0], args[1]);
				case 3: return func.call(thisArg, args[0], args[1], args[2]);
			}
			return func.apply(thisArg, args);
		}
		function arrayAggregator(array, setter, iteratee, accumulator) {
			var index = -1, length = array == null ? 0 : array.length;
			while (++index < length) {
				var value = array[index];
				setter(accumulator, value, iteratee(value), array);
			}
			return accumulator;
		}
		function arrayEach(array, iteratee) {
			var index = -1, length = array == null ? 0 : array.length;
			while (++index < length) if (iteratee(array[index], index, array) === false) break;
			return array;
		}
		function arrayEachRight(array, iteratee) {
			var length = array == null ? 0 : array.length;
			while (length--) if (iteratee(array[length], length, array) === false) break;
			return array;
		}
		function arrayEvery(array, predicate) {
			var index = -1, length = array == null ? 0 : array.length;
			while (++index < length) if (!predicate(array[index], index, array)) return false;
			return true;
		}
		function arrayFilter(array, predicate) {
			var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
			while (++index < length) {
				var value = array[index];
				if (predicate(value, index, array)) result[resIndex++] = value;
			}
			return result;
		}
		function arrayIncludes(array, value) {
			return !!(array == null ? 0 : array.length) && baseIndexOf(array, value, 0) > -1;
		}
		function arrayIncludesWith(array, value, comparator) {
			var index = -1, length = array == null ? 0 : array.length;
			while (++index < length) if (comparator(value, array[index])) return true;
			return false;
		}
		function arrayMap(array, iteratee) {
			var index = -1, length = array == null ? 0 : array.length, result = Array(length);
			while (++index < length) result[index] = iteratee(array[index], index, array);
			return result;
		}
		function arrayPush(array, values$1) {
			var index = -1, length = values$1.length, offset = array.length;
			while (++index < length) array[offset + index] = values$1[index];
			return array;
		}
		function arrayReduce(array, iteratee, accumulator, initAccum) {
			var index = -1, length = array == null ? 0 : array.length;
			if (initAccum && length) accumulator = array[++index];
			while (++index < length) accumulator = iteratee(accumulator, array[index], index, array);
			return accumulator;
		}
		function arrayReduceRight(array, iteratee, accumulator, initAccum) {
			var length = array == null ? 0 : array.length;
			if (initAccum && length) accumulator = array[--length];
			while (length--) accumulator = iteratee(accumulator, array[length], length, array);
			return accumulator;
		}
		function arraySome(array, predicate) {
			var index = -1, length = array == null ? 0 : array.length;
			while (++index < length) if (predicate(array[index], index, array)) return true;
			return false;
		}
		var asciiSize = baseProperty("length");
		function asciiToArray(string) {
			return string.split("");
		}
		function asciiWords(string) {
			return string.match(reAsciiWord) || [];
		}
		function baseFindKey(collection, predicate, eachFunc) {
			var result;
			eachFunc(collection, function(value, key, collection$1) {
				if (predicate(value, key, collection$1)) {
					result = key;
					return false;
				}
			});
			return result;
		}
		function baseFindIndex(array, predicate, fromIndex, fromRight) {
			var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
			while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
			return -1;
		}
		function baseIndexOf(array, value, fromIndex) {
			return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
		}
		function baseIndexOfWith(array, value, fromIndex, comparator) {
			var index = fromIndex - 1, length = array.length;
			while (++index < length) if (comparator(array[index], value)) return index;
			return -1;
		}
		function baseIsNaN(value) {
			return value !== value;
		}
		function baseMean(array, iteratee) {
			var length = array == null ? 0 : array.length;
			return length ? baseSum(array, iteratee) / length : NAN;
		}
		function baseProperty(key) {
			return function(object) {
				return object == null ? undefined$1 : object[key];
			};
		}
		function basePropertyOf(object) {
			return function(key) {
				return object == null ? undefined$1 : object[key];
			};
		}
		function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
			eachFunc(collection, function(value, index, collection$1) {
				accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection$1);
			});
			return accumulator;
		}
		function baseSortBy(array, comparer) {
			var length = array.length;
			array.sort(comparer);
			while (length--) array[length] = array[length].value;
			return array;
		}
		function baseSum(array, iteratee) {
			var result, index = -1, length = array.length;
			while (++index < length) {
				var current = iteratee(array[index]);
				if (current !== undefined$1) result = result === undefined$1 ? current : result + current;
			}
			return result;
		}
		function baseTimes(n, iteratee) {
			var index = -1, result = Array(n);
			while (++index < n) result[index] = iteratee(index);
			return result;
		}
		function baseToPairs(object, props) {
			return arrayMap(props, function(key) {
				return [key, object[key]];
			});
		}
		function baseTrim(string) {
			return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
		}
		function baseUnary(func) {
			return function(value) {
				return func(value);
			};
		}
		function baseValues(object, props) {
			return arrayMap(props, function(key) {
				return object[key];
			});
		}
		function cacheHas(cache, key) {
			return cache.has(key);
		}
		function charsStartIndex(strSymbols, chrSymbols) {
			var index = -1, length = strSymbols.length;
			while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1);
			return index;
		}
		function charsEndIndex(strSymbols, chrSymbols) {
			var index = strSymbols.length;
			while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1);
			return index;
		}
		function countHolders(array, placeholder) {
			var length = array.length, result = 0;
			while (length--) if (array[length] === placeholder) ++result;
			return result;
		}
		var deburrLetter = basePropertyOf(deburredLetters);
		var escapeHtmlChar = basePropertyOf(htmlEscapes);
		function escapeStringChar(chr) {
			return "\\" + stringEscapes[chr];
		}
		function getValue(object, key) {
			return object == null ? undefined$1 : object[key];
		}
		function hasUnicode(string) {
			return reHasUnicode.test(string);
		}
		function hasUnicodeWord(string) {
			return reHasUnicodeWord.test(string);
		}
		function iteratorToArray(iterator) {
			var data, result = [];
			while (!(data = iterator.next()).done) result.push(data.value);
			return result;
		}
		function mapToArray(map$11) {
			var index = -1, result = Array(map$11.size);
			map$11.forEach(function(value, key) {
				result[++index] = [key, value];
			});
			return result;
		}
		function overArg(func, transform) {
			return function(arg) {
				return func(transform(arg));
			};
		}
		function replaceHolders(array, placeholder) {
			var index = -1, length = array.length, resIndex = 0, result = [];
			while (++index < length) {
				var value = array[index];
				if (value === placeholder || value === PLACEHOLDER) {
					array[index] = PLACEHOLDER;
					result[resIndex++] = index;
				}
			}
			return result;
		}
		function setToArray(set) {
			var index = -1, result = Array(set.size);
			set.forEach(function(value) {
				result[++index] = value;
			});
			return result;
		}
		function setToPairs(set) {
			var index = -1, result = Array(set.size);
			set.forEach(function(value) {
				result[++index] = [value, value];
			});
			return result;
		}
		function strictIndexOf(array, value, fromIndex) {
			var index = fromIndex - 1, length = array.length;
			while (++index < length) if (array[index] === value) return index;
			return -1;
		}
		function strictLastIndexOf(array, value, fromIndex) {
			var index = fromIndex + 1;
			while (index--) if (array[index] === value) return index;
			return index;
		}
		function stringSize(string) {
			return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
		}
		function stringToArray(string) {
			return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
		}
		function trimmedEndIndex(string) {
			var index = string.length;
			while (index-- && reWhitespace.test(string.charAt(index)));
			return index;
		}
		var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
		function unicodeSize(string) {
			var result = reUnicode.lastIndex = 0;
			while (reUnicode.test(string)) ++result;
			return result;
		}
		function unicodeToArray(string) {
			return string.match(reUnicode) || [];
		}
		function unicodeWords(string) {
			return string.match(reUnicodeWord) || [];
		}
		var _ = (function runInContext(context) {
			context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
			var Array$1 = context.Array, Date$1 = context.Date, Error$1 = context.Error, Function$1 = context.Function, Math$1 = context.Math, Object$1 = context.Object, RegExp$1 = context.RegExp, String$1 = context.String, TypeError = context.TypeError;
			var arrayProto = Array$1.prototype, funcProto = Function$1.prototype, objectProto = Object$1.prototype;
			var coreJsData = context["__core-js_shared__"];
			var funcToString = funcProto.toString;
			var hasOwnProperty = objectProto.hasOwnProperty;
			var idCounter = 0;
			var maskSrcKey = function() {
				var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
				return uid ? "Symbol(src)_1." + uid : "";
			}();
			var nativeObjectToString = objectProto.toString;
			var objectCtorString = funcToString.call(Object$1);
			var oldDash = root._;
			var reIsNative = RegExp$1("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
			var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object$1.getPrototypeOf, Object$1), objectCreate = Object$1.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1, symIterator = Symbol ? Symbol.iterator : undefined$1, symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;
			var defineProperty = function() {
				try {
					var func = getNative(Object$1, "defineProperty");
					func({}, "", {});
					return func;
				} catch (e) {}
			}();
			var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date$1 && Date$1.now !== root.Date.now && Date$1.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
			var nativeCeil = Math$1.ceil, nativeFloor = Math$1.floor, nativeGetSymbols = Object$1.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object$1.keys, Object$1), nativeMax = Math$1.max, nativeMin = Math$1.min, nativeNow = Date$1.now, nativeParseInt = context.parseInt, nativeRandom = Math$1.random, nativeReverse = arrayProto.reverse;
			var DataView = getNative(context, "DataView"), Map$1 = getNative(context, "Map"), Promise$1 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object$1, "create");
			var metaMap = WeakMap && new WeakMap();
			var realNames = {};
			var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
			var symbolProto = Symbol ? Symbol.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
			function lodash(value) {
				if (isObjectLike(value) && !isArray$5(value) && !(value instanceof LazyWrapper)) {
					if (value instanceof LodashWrapper) return value;
					if (hasOwnProperty.call(value, "__wrapped__")) return wrapperClone(value);
				}
				return new LodashWrapper(value);
			}
			var baseCreate = function() {
				function object() {}
				return function(proto) {
					if (!isObject$1(proto)) return {};
					if (objectCreate) return objectCreate(proto);
					object.prototype = proto;
					var result$1 = new object();
					object.prototype = undefined$1;
					return result$1;
				};
			}();
			function baseLodash() {}
			function LodashWrapper(value, chainAll) {
				this.__wrapped__ = value;
				this.__actions__ = [];
				this.__chain__ = !!chainAll;
				this.__index__ = 0;
				this.__values__ = undefined$1;
			}
			lodash.templateSettings = {
				"escape": reEscape,
				"evaluate": reEvaluate,
				"interpolate": reInterpolate,
				"variable": "",
				"imports": { "_": lodash }
			};
			lodash.prototype = baseLodash.prototype;
			lodash.prototype.constructor = lodash;
			LodashWrapper.prototype = baseCreate(baseLodash.prototype);
			LodashWrapper.prototype.constructor = LodashWrapper;
			function LazyWrapper(value) {
				this.__wrapped__ = value;
				this.__actions__ = [];
				this.__dir__ = 1;
				this.__filtered__ = false;
				this.__iteratees__ = [];
				this.__takeCount__ = MAX_ARRAY_LENGTH;
				this.__views__ = [];
			}
			function lazyClone() {
				var result$1 = new LazyWrapper(this.__wrapped__);
				result$1.__actions__ = copyArray(this.__actions__);
				result$1.__dir__ = this.__dir__;
				result$1.__filtered__ = this.__filtered__;
				result$1.__iteratees__ = copyArray(this.__iteratees__);
				result$1.__takeCount__ = this.__takeCount__;
				result$1.__views__ = copyArray(this.__views__);
				return result$1;
			}
			function lazyReverse() {
				if (this.__filtered__) {
					var result$1 = new LazyWrapper(this);
					result$1.__dir__ = -1;
					result$1.__filtered__ = true;
				} else {
					result$1 = this.clone();
					result$1.__dir__ *= -1;
				}
				return result$1;
			}
			function lazyValue() {
				var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray$5(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
				if (!isArr || !isRight && arrLength == length && takeCount == length) return baseWrapperValue(array, this.__actions__);
				var result$1 = [];
				outer: while (length-- && resIndex < takeCount) {
					index += dir;
					var iterIndex = -1, value = array[index];
					while (++iterIndex < iterLength) {
						var data = iteratees[iterIndex], iteratee$1 = data.iteratee, type = data.type, computed = iteratee$1(value);
						if (type == LAZY_MAP_FLAG) value = computed;
						else if (!computed) if (type == LAZY_FILTER_FLAG) continue outer;
						else break outer;
					}
					result$1[resIndex++] = value;
				}
				return result$1;
			}
			LazyWrapper.prototype = baseCreate(baseLodash.prototype);
			LazyWrapper.prototype.constructor = LazyWrapper;
			function Hash(entries) {
				var index = -1, length = entries == null ? 0 : entries.length;
				this.clear();
				while (++index < length) {
					var entry = entries[index];
					this.set(entry[0], entry[1]);
				}
			}
			function hashClear() {
				this.__data__ = nativeCreate ? nativeCreate(null) : {};
				this.size = 0;
			}
			function hashDelete(key) {
				var result$1 = this.has(key) && delete this.__data__[key];
				this.size -= result$1 ? 1 : 0;
				return result$1;
			}
			function hashGet(key) {
				var data = this.__data__;
				if (nativeCreate) {
					var result$1 = data[key];
					return result$1 === HASH_UNDEFINED ? undefined$1 : result$1;
				}
				return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
			}
			function hashHas(key) {
				var data = this.__data__;
				return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
			}
			function hashSet(key, value) {
				var data = this.__data__;
				this.size += this.has(key) ? 0 : 1;
				data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
				return this;
			}
			Hash.prototype.clear = hashClear;
			Hash.prototype["delete"] = hashDelete;
			Hash.prototype.get = hashGet;
			Hash.prototype.has = hashHas;
			Hash.prototype.set = hashSet;
			function ListCache(entries) {
				var index = -1, length = entries == null ? 0 : entries.length;
				this.clear();
				while (++index < length) {
					var entry = entries[index];
					this.set(entry[0], entry[1]);
				}
			}
			function listCacheClear() {
				this.__data__ = [];
				this.size = 0;
			}
			function listCacheDelete(key) {
				var data = this.__data__, index = assocIndexOf(data, key);
				if (index < 0) return false;
				if (index == data.length - 1) data.pop();
				else splice.call(data, index, 1);
				--this.size;
				return true;
			}
			function listCacheGet(key) {
				var data = this.__data__, index = assocIndexOf(data, key);
				return index < 0 ? undefined$1 : data[index][1];
			}
			function listCacheHas(key) {
				return assocIndexOf(this.__data__, key) > -1;
			}
			function listCacheSet(key, value) {
				var data = this.__data__, index = assocIndexOf(data, key);
				if (index < 0) {
					++this.size;
					data.push([key, value]);
				} else data[index][1] = value;
				return this;
			}
			ListCache.prototype.clear = listCacheClear;
			ListCache.prototype["delete"] = listCacheDelete;
			ListCache.prototype.get = listCacheGet;
			ListCache.prototype.has = listCacheHas;
			ListCache.prototype.set = listCacheSet;
			function MapCache(entries) {
				var index = -1, length = entries == null ? 0 : entries.length;
				this.clear();
				while (++index < length) {
					var entry = entries[index];
					this.set(entry[0], entry[1]);
				}
			}
			function mapCacheClear() {
				this.size = 0;
				this.__data__ = {
					"hash": new Hash(),
					"map": new (Map$1 || ListCache)(),
					"string": new Hash()
				};
			}
			function mapCacheDelete(key) {
				var result$1 = getMapData(this, key)["delete"](key);
				this.size -= result$1 ? 1 : 0;
				return result$1;
			}
			function mapCacheGet(key) {
				return getMapData(this, key).get(key);
			}
			function mapCacheHas(key) {
				return getMapData(this, key).has(key);
			}
			function mapCacheSet(key, value) {
				var data = getMapData(this, key), size$1 = data.size;
				data.set(key, value);
				this.size += data.size == size$1 ? 0 : 1;
				return this;
			}
			MapCache.prototype.clear = mapCacheClear;
			MapCache.prototype["delete"] = mapCacheDelete;
			MapCache.prototype.get = mapCacheGet;
			MapCache.prototype.has = mapCacheHas;
			MapCache.prototype.set = mapCacheSet;
			function SetCache(values$2) {
				var index = -1, length = values$2 == null ? 0 : values$2.length;
				this.__data__ = new MapCache();
				while (++index < length) this.add(values$2[index]);
			}
			function setCacheAdd(value) {
				this.__data__.set(value, HASH_UNDEFINED);
				return this;
			}
			function setCacheHas(value) {
				return this.__data__.has(value);
			}
			SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
			SetCache.prototype.has = setCacheHas;
			function Stack(entries) {
				this.size = (this.__data__ = new ListCache(entries)).size;
			}
			function stackClear() {
				this.__data__ = new ListCache();
				this.size = 0;
			}
			function stackDelete(key) {
				var data = this.__data__, result$1 = data["delete"](key);
				this.size = data.size;
				return result$1;
			}
			function stackGet(key) {
				return this.__data__.get(key);
			}
			function stackHas(key) {
				return this.__data__.has(key);
			}
			function stackSet(key, value) {
				var data = this.__data__;
				if (data instanceof ListCache) {
					var pairs = data.__data__;
					if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
						pairs.push([key, value]);
						this.size = ++data.size;
						return this;
					}
					data = this.__data__ = new MapCache(pairs);
				}
				data.set(key, value);
				this.size = data.size;
				return this;
			}
			Stack.prototype.clear = stackClear;
			Stack.prototype["delete"] = stackDelete;
			Stack.prototype.get = stackGet;
			Stack.prototype.has = stackHas;
			Stack.prototype.set = stackSet;
			function arrayLikeKeys(value, inherited) {
				var isArr = isArray$5(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result$1 = skipIndexes ? baseTimes(value.length, String$1) : [], length = result$1.length;
				for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result$1.push(key);
				return result$1;
			}
			function arraySample(array) {
				var length = array.length;
				return length ? array[baseRandom(0, length - 1)] : undefined$1;
			}
			function arraySampleSize(array, n) {
				return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
			}
			function arrayShuffle(array) {
				return shuffleSelf(copyArray(array));
			}
			function assignMergeValue(object, key, value) {
				if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) baseAssignValue(object, key, value);
			}
			function assignValue(object, key, value) {
				var objValue = object[key];
				if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) baseAssignValue(object, key, value);
			}
			function assocIndexOf(array, key) {
				var length = array.length;
				while (length--) if (eq(array[length][0], key)) return length;
				return -1;
			}
			function baseAggregator(collection, setter, iteratee$1, accumulator) {
				baseEach(collection, function(value, key, collection$1) {
					setter(accumulator, value, iteratee$1(value), collection$1);
				});
				return accumulator;
			}
			function baseAssign(object, source) {
				return object && copyObject(source, keys$1(source), object);
			}
			function baseAssignIn(object, source) {
				return object && copyObject(source, keysIn(source), object);
			}
			function baseAssignValue(object, key, value) {
				if (key == "__proto__" && defineProperty) defineProperty(object, key, {
					"configurable": true,
					"enumerable": true,
					"value": value,
					"writable": true
				});
				else object[key] = value;
			}
			function baseAt(object, paths) {
				var index = -1, length = paths.length, result$1 = Array$1(length), skip = object == null;
				while (++index < length) result$1[index] = skip ? undefined$1 : get(object, paths[index]);
				return result$1;
			}
			function baseClamp(number, lower, upper) {
				if (number === number) {
					if (upper !== undefined$1) number = number <= upper ? number : upper;
					if (lower !== undefined$1) number = number >= lower ? number : lower;
				}
				return number;
			}
			function baseClone(value, bitmask, customizer, key, object, stack) {
				var result$1, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
				if (customizer) result$1 = object ? customizer(value, key, object, stack) : customizer(value);
				if (result$1 !== undefined$1) return result$1;
				if (!isObject$1(value)) return value;
				var isArr = isArray$5(value);
				if (isArr) {
					result$1 = initCloneArray(value);
					if (!isDeep) return copyArray(value, result$1);
				} else {
					var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
					if (isBuffer(value)) return cloneBuffer(value, isDeep);
					if (tag == objectTag || tag == argsTag || isFunc && !object) {
						result$1 = isFlat || isFunc ? {} : initCloneObject(value);
						if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result$1, value)) : copySymbols(value, baseAssign(result$1, value));
					} else {
						if (!cloneableTags[tag]) return object ? value : {};
						result$1 = initCloneByTag(value, tag, isDeep);
					}
				}
				stack || (stack = new Stack());
				var stacked = stack.get(value);
				if (stacked) return stacked;
				stack.set(value, result$1);
				if (isSet(value)) value.forEach(function(subValue) {
					result$1.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
				});
				else if (isMap(value)) value.forEach(function(subValue, key$1) {
					result$1.set(key$1, baseClone(subValue, bitmask, customizer, key$1, value, stack));
				});
				var props = isArr ? undefined$1 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys$1)(value);
				arrayEach(props || value, function(subValue, key$1) {
					if (props) {
						key$1 = subValue;
						subValue = value[key$1];
					}
					assignValue(result$1, key$1, baseClone(subValue, bitmask, customizer, key$1, value, stack));
				});
				return result$1;
			}
			function baseConforms(source) {
				var props = keys$1(source);
				return function(object) {
					return baseConformsTo(object, source, props);
				};
			}
			function baseConformsTo(object, source, props) {
				var length = props.length;
				if (object == null) return !length;
				object = Object$1(object);
				while (length--) {
					var key = props[length], predicate = source[key], value = object[key];
					if (value === undefined$1 && !(key in object) || !predicate(value)) return false;
				}
				return true;
			}
			function baseDelay(func, wait, args) {
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				return setTimeout(function() {
					func.apply(undefined$1, args);
				}, wait);
			}
			function baseDifference(array, values$2, iteratee$1, comparator) {
				var index = -1, includes$5 = arrayIncludes, isCommon = true, length = array.length, result$1 = [], valuesLength = values$2.length;
				if (!length) return result$1;
				if (iteratee$1) values$2 = arrayMap(values$2, baseUnary(iteratee$1));
				if (comparator) {
					includes$5 = arrayIncludesWith;
					isCommon = false;
				} else if (values$2.length >= LARGE_ARRAY_SIZE) {
					includes$5 = cacheHas;
					isCommon = false;
					values$2 = new SetCache(values$2);
				}
				outer: while (++index < length) {
					var value = array[index], computed = iteratee$1 == null ? value : iteratee$1(value);
					value = comparator || value !== 0 ? value : 0;
					if (isCommon && computed === computed) {
						var valuesIndex = valuesLength;
						while (valuesIndex--) if (values$2[valuesIndex] === computed) continue outer;
						result$1.push(value);
					} else if (!includes$5(values$2, computed, comparator)) result$1.push(value);
				}
				return result$1;
			}
			var baseEach = createBaseEach(baseForOwn);
			var baseEachRight = createBaseEach(baseForOwnRight, true);
			function baseEvery(collection, predicate) {
				var result$1 = true;
				baseEach(collection, function(value, index, collection$1) {
					result$1 = !!predicate(value, index, collection$1);
					return result$1;
				});
				return result$1;
			}
			function baseExtremum(array, iteratee$1, comparator) {
				var index = -1, length = array.length;
				while (++index < length) {
					var value = array[index], current = iteratee$1(value);
					if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) var computed = current, result$1 = value;
				}
				return result$1;
			}
			function baseFill(array, value, start, end) {
				var length = array.length;
				start = toInteger(start);
				if (start < 0) start = -start > length ? 0 : length + start;
				end = end === undefined$1 || end > length ? length : toInteger(end);
				if (end < 0) end += length;
				end = start > end ? 0 : toLength(end);
				while (start < end) array[start++] = value;
				return array;
			}
			function baseFilter(collection, predicate) {
				var result$1 = [];
				baseEach(collection, function(value, index, collection$1) {
					if (predicate(value, index, collection$1)) result$1.push(value);
				});
				return result$1;
			}
			function baseFlatten(array, depth, predicate, isStrict, result$1) {
				var index = -1, length = array.length;
				predicate || (predicate = isFlattenable);
				result$1 || (result$1 = []);
				while (++index < length) {
					var value = array[index];
					if (depth > 0 && predicate(value)) if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result$1);
					else arrayPush(result$1, value);
					else if (!isStrict) result$1[result$1.length] = value;
				}
				return result$1;
			}
			var baseFor = createBaseFor();
			var baseForRight = createBaseFor(true);
			function baseForOwn(object, iteratee$1) {
				return object && baseFor(object, iteratee$1, keys$1);
			}
			function baseForOwnRight(object, iteratee$1) {
				return object && baseForRight(object, iteratee$1, keys$1);
			}
			function baseFunctions(object, props) {
				return arrayFilter(props, function(key) {
					return isFunction$2(object[key]);
				});
			}
			function baseGet(object, path) {
				path = castPath(path, object);
				var index = 0, length = path.length;
				while (object != null && index < length) object = object[toKey(path[index++])];
				return index && index == length ? object : undefined$1;
			}
			function baseGetAllKeys(object, keysFunc, symbolsFunc) {
				var result$1 = keysFunc(object);
				return isArray$5(object) ? result$1 : arrayPush(result$1, symbolsFunc(object));
			}
			function baseGetTag(value) {
				if (value == null) return value === undefined$1 ? undefinedTag : nullTag;
				return symToStringTag && symToStringTag in Object$1(value) ? getRawTag(value) : objectToString(value);
			}
			function baseGt(value, other) {
				return value > other;
			}
			function baseHas(object, key) {
				return object != null && hasOwnProperty.call(object, key);
			}
			function baseHasIn(object, key) {
				return object != null && key in Object$1(object);
			}
			function baseInRange(number, start, end) {
				return number >= nativeMin(start, end) && number < nativeMax(start, end);
			}
			function baseIntersection(arrays, iteratee$1, comparator) {
				var includes$5 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array$1(othLength), maxLength = Infinity, result$1 = [];
				while (othIndex--) {
					var array = arrays[othIndex];
					if (othIndex && iteratee$1) array = arrayMap(array, baseUnary(iteratee$1));
					maxLength = nativeMin(array.length, maxLength);
					caches[othIndex] = !comparator && (iteratee$1 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
				}
				array = arrays[0];
				var index = -1, seen = caches[0];
				outer: while (++index < length && result$1.length < maxLength) {
					var value = array[index], computed = iteratee$1 ? iteratee$1(value) : value;
					value = comparator || value !== 0 ? value : 0;
					if (!(seen ? cacheHas(seen, computed) : includes$5(result$1, computed, comparator))) {
						othIndex = othLength;
						while (--othIndex) {
							var cache = caches[othIndex];
							if (!(cache ? cacheHas(cache, computed) : includes$5(arrays[othIndex], computed, comparator))) continue outer;
						}
						if (seen) seen.push(computed);
						result$1.push(value);
					}
				}
				return result$1;
			}
			function baseInverter(object, setter, iteratee$1, accumulator) {
				baseForOwn(object, function(value, key, object$1) {
					setter(accumulator, iteratee$1(value), key, object$1);
				});
				return accumulator;
			}
			function baseInvoke(object, path, args) {
				path = castPath(path, object);
				object = parent(object, path);
				var func = object == null ? object : object[toKey(last$2(path))];
				return func == null ? undefined$1 : apply(func, object, args);
			}
			function baseIsArguments(value) {
				return isObjectLike(value) && baseGetTag(value) == argsTag;
			}
			function baseIsArrayBuffer(value) {
				return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
			}
			function baseIsDate(value) {
				return isObjectLike(value) && baseGetTag(value) == dateTag;
			}
			function baseIsEqual(value, other, bitmask, customizer, stack) {
				if (value === other) return true;
				if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
				return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
			}
			function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
				var objIsArr = isArray$5(object), othIsArr = isArray$5(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
				objTag = objTag == argsTag ? objectTag : objTag;
				othTag = othTag == argsTag ? objectTag : othTag;
				var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
				if (isSameTag && isBuffer(object)) {
					if (!isBuffer(other)) return false;
					objIsArr = true;
					objIsObj = false;
				}
				if (isSameTag && !objIsObj) {
					stack || (stack = new Stack());
					return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
				}
				if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
					var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
					if (objIsWrapped || othIsWrapped) {
						var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
						stack || (stack = new Stack());
						return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
					}
				}
				if (!isSameTag) return false;
				stack || (stack = new Stack());
				return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
			}
			function baseIsMap(value) {
				return isObjectLike(value) && getTag(value) == mapTag;
			}
			function baseIsMatch(object, source, matchData, customizer) {
				var index = matchData.length, length = index, noCustomizer = !customizer;
				if (object == null) return !length;
				object = Object$1(object);
				while (index--) {
					var data = matchData[index];
					if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
				}
				while (++index < length) {
					data = matchData[index];
					var key = data[0], objValue = object[key], srcValue = data[1];
					if (noCustomizer && data[2]) {
						if (objValue === undefined$1 && !(key in object)) return false;
					} else {
						var stack = new Stack();
						if (customizer) var result$1 = customizer(objValue, srcValue, key, object, source, stack);
						if (!(result$1 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result$1)) return false;
					}
				}
				return true;
			}
			function baseIsNative(value) {
				if (!isObject$1(value) || isMasked(value)) return false;
				return (isFunction$2(value) ? reIsNative : reIsHostCtor).test(toSource(value));
			}
			function baseIsRegExp(value) {
				return isObjectLike(value) && baseGetTag(value) == regexpTag;
			}
			function baseIsSet(value) {
				return isObjectLike(value) && getTag(value) == setTag;
			}
			function baseIsTypedArray(value) {
				return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
			}
			function baseIteratee(value) {
				if (typeof value == "function") return value;
				if (value == null) return identity;
				if (typeof value == "object") return isArray$5(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
				return property(value);
			}
			function baseKeys(object) {
				if (!isPrototype(object)) return nativeKeys(object);
				var result$1 = [];
				for (var key in Object$1(object)) if (hasOwnProperty.call(object, key) && key != "constructor") result$1.push(key);
				return result$1;
			}
			function baseKeysIn(object) {
				if (!isObject$1(object)) return nativeKeysIn(object);
				var isProto = isPrototype(object), result$1 = [];
				for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) result$1.push(key);
				return result$1;
			}
			function baseLt(value, other) {
				return value < other;
			}
			function baseMap(collection, iteratee$1) {
				var index = -1, result$1 = isArrayLike(collection) ? Array$1(collection.length) : [];
				baseEach(collection, function(value, key, collection$1) {
					result$1[++index] = iteratee$1(value, key, collection$1);
				});
				return result$1;
			}
			function baseMatches(source) {
				var matchData = getMatchData(source);
				if (matchData.length == 1 && matchData[0][2]) return matchesStrictComparable(matchData[0][0], matchData[0][1]);
				return function(object) {
					return object === source || baseIsMatch(object, source, matchData);
				};
			}
			function baseMatchesProperty(path, srcValue) {
				if (isKey(path) && isStrictComparable(srcValue)) return matchesStrictComparable(toKey(path), srcValue);
				return function(object) {
					var objValue = get(object, path);
					return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
				};
			}
			function baseMerge(object, source, srcIndex, customizer, stack) {
				if (object === source) return;
				baseFor(source, function(srcValue, key) {
					stack || (stack = new Stack());
					if (isObject$1(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
					else {
						var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
						if (newValue === undefined$1) newValue = srcValue;
						assignMergeValue(object, key, newValue);
					}
				}, keysIn);
			}
			function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
				var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
				if (stacked) {
					assignMergeValue(object, key, stacked);
					return;
				}
				var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
				var isCommon = newValue === undefined$1;
				if (isCommon) {
					var isArr = isArray$5(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
					newValue = srcValue;
					if (isArr || isBuff || isTyped) if (isArray$5(objValue)) newValue = objValue;
					else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue);
					else if (isBuff) {
						isCommon = false;
						newValue = cloneBuffer(srcValue, true);
					} else if (isTyped) {
						isCommon = false;
						newValue = cloneTypedArray(srcValue, true);
					} else newValue = [];
					else if (isPlainObject(srcValue) || isArguments(srcValue)) {
						newValue = objValue;
						if (isArguments(objValue)) newValue = toPlainObject(objValue);
						else if (!isObject$1(objValue) || isFunction$2(objValue)) newValue = initCloneObject(srcValue);
					} else isCommon = false;
				}
				if (isCommon) {
					stack.set(srcValue, newValue);
					mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
					stack["delete"](srcValue);
				}
				assignMergeValue(object, key, newValue);
			}
			function baseNth(array, n) {
				var length = array.length;
				if (!length) return;
				n += n < 0 ? length : 0;
				return isIndex(n, length) ? array[n] : undefined$1;
			}
			function baseOrderBy(collection, iteratees, orders) {
				if (iteratees.length) iteratees = arrayMap(iteratees, function(iteratee$1) {
					if (isArray$5(iteratee$1)) return function(value) {
						return baseGet(value, iteratee$1.length === 1 ? iteratee$1[0] : iteratee$1);
					};
					return iteratee$1;
				});
				else iteratees = [identity];
				var index = -1;
				iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
				return baseSortBy(baseMap(collection, function(value, key, collection$1) {
					var criteria = arrayMap(iteratees, function(iteratee$1) {
						return iteratee$1(value);
					});
					return {
						"criteria": criteria,
						"index": ++index,
						"value": value
					};
				}), function(object, other) {
					return compareMultiple(object, other, orders);
				});
			}
			function basePick(object, paths) {
				return basePickBy(object, paths, function(value, path) {
					return hasIn(object, path);
				});
			}
			function basePickBy(object, paths, predicate) {
				var index = -1, length = paths.length, result$1 = {};
				while (++index < length) {
					var path = paths[index], value = baseGet(object, path);
					if (predicate(value, path)) baseSet(result$1, castPath(path, object), value);
				}
				return result$1;
			}
			function basePropertyDeep(path) {
				return function(object) {
					return baseGet(object, path);
				};
			}
			function basePullAll(array, values$2, iteratee$1, comparator) {
				var indexOf$2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values$2.length, seen = array;
				if (array === values$2) values$2 = copyArray(values$2);
				if (iteratee$1) seen = arrayMap(array, baseUnary(iteratee$1));
				while (++index < length) {
					var fromIndex = 0, value = values$2[index], computed = iteratee$1 ? iteratee$1(value) : value;
					while ((fromIndex = indexOf$2(seen, computed, fromIndex, comparator)) > -1) {
						if (seen !== array) splice.call(seen, fromIndex, 1);
						splice.call(array, fromIndex, 1);
					}
				}
				return array;
			}
			function basePullAt(array, indexes) {
				var length = array ? indexes.length : 0, lastIndex = length - 1;
				while (length--) {
					var index = indexes[length];
					if (length == lastIndex || index !== previous) {
						var previous = index;
						if (isIndex(index)) splice.call(array, index, 1);
						else baseUnset(array, index);
					}
				}
				return array;
			}
			function baseRandom(lower, upper) {
				return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
			}
			function baseRange(start, end, step, fromRight) {
				var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result$1 = Array$1(length);
				while (length--) {
					result$1[fromRight ? length : ++index] = start;
					start += step;
				}
				return result$1;
			}
			function baseRepeat(string, n) {
				var result$1 = "";
				if (!string || n < 1 || n > MAX_SAFE_INTEGER) return result$1;
				do {
					if (n % 2) result$1 += string;
					n = nativeFloor(n / 2);
					if (n) string += string;
				} while (n);
				return result$1;
			}
			function baseRest(func, start) {
				return setToString(overRest(func, start, identity), func + "");
			}
			function baseSample(collection) {
				return arraySample(values$1(collection));
			}
			function baseSampleSize(collection, n) {
				var array = values$1(collection);
				return shuffleSelf(array, baseClamp(n, 0, array.length));
			}
			function baseSet(object, path, value, customizer) {
				if (!isObject$1(object)) return object;
				path = castPath(path, object);
				var index = -1, length = path.length, lastIndex = length - 1, nested = object;
				while (nested != null && ++index < length) {
					var key = toKey(path[index]), newValue = value;
					if (key === "__proto__" || key === "constructor" || key === "prototype") return object;
					if (index != lastIndex) {
						var objValue = nested[key];
						newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
						if (newValue === undefined$1) newValue = isObject$1(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
					}
					assignValue(nested, key, newValue);
					nested = nested[key];
				}
				return object;
			}
			var baseSetData = !metaMap ? identity : function(func, data) {
				metaMap.set(func, data);
				return func;
			};
			var baseSetToString = !defineProperty ? identity : function(func, string) {
				return defineProperty(func, "toString", {
					"configurable": true,
					"enumerable": false,
					"value": constant(string),
					"writable": true
				});
			};
			function baseShuffle(collection) {
				return shuffleSelf(values$1(collection));
			}
			function baseSlice(array, start, end) {
				var index = -1, length = array.length;
				if (start < 0) start = -start > length ? 0 : length + start;
				end = end > length ? length : end;
				if (end < 0) end += length;
				length = start > end ? 0 : end - start >>> 0;
				start >>>= 0;
				var result$1 = Array$1(length);
				while (++index < length) result$1[index] = array[index + start];
				return result$1;
			}
			function baseSome(collection, predicate) {
				var result$1;
				baseEach(collection, function(value, index, collection$1) {
					result$1 = predicate(value, index, collection$1);
					return !result$1;
				});
				return !!result$1;
			}
			function baseSortedIndex(array, value, retHighest) {
				var low = 0, high = array == null ? low : array.length;
				if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
					while (low < high) {
						var mid = low + high >>> 1, computed = array[mid];
						if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) low = mid + 1;
						else high = mid;
					}
					return high;
				}
				return baseSortedIndexBy(array, value, identity, retHighest);
			}
			function baseSortedIndexBy(array, value, iteratee$1, retHighest) {
				var low = 0, high = array == null ? 0 : array.length;
				if (high === 0) return 0;
				value = iteratee$1(value);
				var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
				while (low < high) {
					var mid = nativeFloor((low + high) / 2), computed = iteratee$1(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
					if (valIsNaN) var setLow = retHighest || othIsReflexive;
					else if (valIsUndefined) setLow = othIsReflexive && (retHighest || othIsDefined);
					else if (valIsNull) setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
					else if (valIsSymbol) setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
					else if (othIsNull || othIsSymbol) setLow = false;
					else setLow = retHighest ? computed <= value : computed < value;
					if (setLow) low = mid + 1;
					else high = mid;
				}
				return nativeMin(high, MAX_ARRAY_INDEX);
			}
			function baseSortedUniq(array, iteratee$1) {
				var index = -1, length = array.length, resIndex = 0, result$1 = [];
				while (++index < length) {
					var value = array[index], computed = iteratee$1 ? iteratee$1(value) : value;
					if (!index || !eq(computed, seen)) {
						var seen = computed;
						result$1[resIndex++] = value === 0 ? 0 : value;
					}
				}
				return result$1;
			}
			function baseToNumber(value) {
				if (typeof value == "number") return value;
				if (isSymbol(value)) return NAN;
				return +value;
			}
			function baseToString(value) {
				if (typeof value == "string") return value;
				if (isArray$5(value)) return arrayMap(value, baseToString) + "";
				if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
				var result$1 = value + "";
				return result$1 == "0" && 1 / value == -INFINITY ? "-0" : result$1;
			}
			function baseUniq(array, iteratee$1, comparator) {
				var index = -1, includes$5 = arrayIncludes, length = array.length, isCommon = true, result$1 = [], seen = result$1;
				if (comparator) {
					isCommon = false;
					includes$5 = arrayIncludesWith;
				} else if (length >= LARGE_ARRAY_SIZE) {
					var set$1 = iteratee$1 ? null : createSet(array);
					if (set$1) return setToArray(set$1);
					isCommon = false;
					includes$5 = cacheHas;
					seen = new SetCache();
				} else seen = iteratee$1 ? [] : result$1;
				outer: while (++index < length) {
					var value = array[index], computed = iteratee$1 ? iteratee$1(value) : value;
					value = comparator || value !== 0 ? value : 0;
					if (isCommon && computed === computed) {
						var seenIndex = seen.length;
						while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
						if (iteratee$1) seen.push(computed);
						result$1.push(value);
					} else if (!includes$5(seen, computed, comparator)) {
						if (seen !== result$1) seen.push(computed);
						result$1.push(value);
					}
				}
				return result$1;
			}
			function baseUnset(object, path) {
				path = castPath(path, object);
				object = parent(object, path);
				return object == null || delete object[toKey(last$2(path))];
			}
			function baseUpdate(object, path, updater, customizer) {
				return baseSet(object, path, updater(baseGet(object, path)), customizer);
			}
			function baseWhile(array, predicate, isDrop, fromRight) {
				var length = array.length, index = fromRight ? length : -1;
				while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array));
				return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
			}
			function baseWrapperValue(value, actions) {
				var result$1 = value;
				if (result$1 instanceof LazyWrapper) result$1 = result$1.value();
				return arrayReduce(actions, function(result$2, action) {
					return action.func.apply(action.thisArg, arrayPush([result$2], action.args));
				}, result$1);
			}
			function baseXor(arrays, iteratee$1, comparator) {
				var length = arrays.length;
				if (length < 2) return length ? baseUniq(arrays[0]) : [];
				var index = -1, result$1 = Array$1(length);
				while (++index < length) {
					var array = arrays[index], othIndex = -1;
					while (++othIndex < length) if (othIndex != index) result$1[index] = baseDifference(result$1[index] || array, arrays[othIndex], iteratee$1, comparator);
				}
				return baseUniq(baseFlatten(result$1, 1), iteratee$1, comparator);
			}
			function baseZipObject(props, values$2, assignFunc) {
				var index = -1, length = props.length, valsLength = values$2.length, result$1 = {};
				while (++index < length) {
					var value = index < valsLength ? values$2[index] : undefined$1;
					assignFunc(result$1, props[index], value);
				}
				return result$1;
			}
			function castArrayLikeObject(value) {
				return isArrayLikeObject(value) ? value : [];
			}
			function castFunction(value) {
				return typeof value == "function" ? value : identity;
			}
			function castPath(value, object) {
				if (isArray$5(value)) return value;
				return isKey(value, object) ? [value] : stringToPath(toString(value));
			}
			var castRest = baseRest;
			function castSlice(array, start, end) {
				var length = array.length;
				end = end === undefined$1 ? length : end;
				return !start && end >= length ? array : baseSlice(array, start, end);
			}
			var clearTimeout = ctxClearTimeout || function(id) {
				return root.clearTimeout(id);
			};
			function cloneBuffer(buffer, isDeep) {
				if (isDeep) return buffer.slice();
				var length = buffer.length, result$1 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
				buffer.copy(result$1);
				return result$1;
			}
			function cloneArrayBuffer(arrayBuffer) {
				var result$1 = new arrayBuffer.constructor(arrayBuffer.byteLength);
				new Uint8Array(result$1).set(new Uint8Array(arrayBuffer));
				return result$1;
			}
			function cloneDataView(dataView, isDeep) {
				var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
				return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
			}
			function cloneRegExp(regexp) {
				var result$1 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
				result$1.lastIndex = regexp.lastIndex;
				return result$1;
			}
			function cloneSymbol(symbol) {
				return symbolValueOf ? Object$1(symbolValueOf.call(symbol)) : {};
			}
			function cloneTypedArray(typedArray, isDeep) {
				var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
				return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
			}
			function compareAscending(value, other) {
				if (value !== other) {
					var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
					var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
					if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1;
					if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1;
				}
				return 0;
			}
			function compareMultiple(object, other, orders) {
				var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
				while (++index < length) {
					var result$1 = compareAscending(objCriteria[index], othCriteria[index]);
					if (result$1) {
						if (index >= ordersLength) return result$1;
						return result$1 * (orders[index] == "desc" ? -1 : 1);
					}
				}
				return object.index - other.index;
			}
			function composeArgs(args, partials, holders, isCurried) {
				var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result$1 = Array$1(leftLength + rangeLength), isUncurried = !isCurried;
				while (++leftIndex < leftLength) result$1[leftIndex] = partials[leftIndex];
				while (++argsIndex < holdersLength) if (isUncurried || argsIndex < argsLength) result$1[holders[argsIndex]] = args[argsIndex];
				while (rangeLength--) result$1[leftIndex++] = args[argsIndex++];
				return result$1;
			}
			function composeArgsRight(args, partials, holders, isCurried) {
				var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result$1 = Array$1(rangeLength + rightLength), isUncurried = !isCurried;
				while (++argsIndex < rangeLength) result$1[argsIndex] = args[argsIndex];
				var offset = argsIndex;
				while (++rightIndex < rightLength) result$1[offset + rightIndex] = partials[rightIndex];
				while (++holdersIndex < holdersLength) if (isUncurried || argsIndex < argsLength) result$1[offset + holders[holdersIndex]] = args[argsIndex++];
				return result$1;
			}
			function copyArray(source, array) {
				var index = -1, length = source.length;
				array || (array = Array$1(length));
				while (++index < length) array[index] = source[index];
				return array;
			}
			function copyObject(source, props, object, customizer) {
				var isNew = !object;
				object || (object = {});
				var index = -1, length = props.length;
				while (++index < length) {
					var key = props[index];
					var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
					if (newValue === undefined$1) newValue = source[key];
					if (isNew) baseAssignValue(object, key, newValue);
					else assignValue(object, key, newValue);
				}
				return object;
			}
			function copySymbols(source, object) {
				return copyObject(source, getSymbols(source), object);
			}
			function copySymbolsIn(source, object) {
				return copyObject(source, getSymbolsIn(source), object);
			}
			function createAggregator(setter, initializer) {
				return function(collection, iteratee$1) {
					var func = isArray$5(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
					return func(collection, setter, getIteratee(iteratee$1, 2), accumulator);
				};
			}
			function createAssigner(assigner) {
				return baseRest(function(object, sources) {
					var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
					customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
					if (guard && isIterateeCall(sources[0], sources[1], guard)) {
						customizer = length < 3 ? undefined$1 : customizer;
						length = 1;
					}
					object = Object$1(object);
					while (++index < length) {
						var source = sources[index];
						if (source) assigner(object, source, index, customizer);
					}
					return object;
				});
			}
			function createBaseEach(eachFunc, fromRight) {
				return function(collection, iteratee$1) {
					if (collection == null) return collection;
					if (!isArrayLike(collection)) return eachFunc(collection, iteratee$1);
					var length = collection.length, index = fromRight ? length : -1, iterable = Object$1(collection);
					while (fromRight ? index-- : ++index < length) if (iteratee$1(iterable[index], index, iterable) === false) break;
					return collection;
				};
			}
			function createBaseFor(fromRight) {
				return function(object, iteratee$1, keysFunc) {
					var index = -1, iterable = Object$1(object), props = keysFunc(object), length = props.length;
					while (length--) {
						var key = props[fromRight ? length : ++index];
						if (iteratee$1(iterable[key], key, iterable) === false) break;
					}
					return object;
				};
			}
			function createBind(func, bitmask, thisArg) {
				var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
				function wrapper() {
					return (this && this !== root && this instanceof wrapper ? Ctor : func).apply(isBind ? thisArg : this, arguments);
				}
				return wrapper;
			}
			function createCaseFirst(methodName) {
				return function(string) {
					string = toString(string);
					var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
					var chr = strSymbols ? strSymbols[0] : string.charAt(0);
					var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
					return chr[methodName]() + trailing;
				};
			}
			function createCompounder(callback) {
				return function(string) {
					return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
				};
			}
			function createCtor(Ctor) {
				return function() {
					var args = arguments;
					switch (args.length) {
						case 0: return new Ctor();
						case 1: return new Ctor(args[0]);
						case 2: return new Ctor(args[0], args[1]);
						case 3: return new Ctor(args[0], args[1], args[2]);
						case 4: return new Ctor(args[0], args[1], args[2], args[3]);
						case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
						case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
						case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
					}
					var thisBinding = baseCreate(Ctor.prototype), result$1 = Ctor.apply(thisBinding, args);
					return isObject$1(result$1) ? result$1 : thisBinding;
				};
			}
			function createCurry(func, bitmask, arity) {
				var Ctor = createCtor(func);
				function wrapper() {
					var length = arguments.length, args = Array$1(length), index = length, placeholder = getHolder(wrapper);
					while (index--) args[index] = arguments[index];
					var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
					length -= holders.length;
					if (length < arity) return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$1, args, holders, undefined$1, undefined$1, arity - length);
					return apply(this && this !== root && this instanceof wrapper ? Ctor : func, this, args);
				}
				return wrapper;
			}
			function createFind(findIndexFunc) {
				return function(collection, predicate, fromIndex) {
					var iterable = Object$1(collection);
					if (!isArrayLike(collection)) {
						var iteratee$1 = getIteratee(predicate, 3);
						collection = keys$1(collection);
						predicate = function(key) {
							return iteratee$1(iterable[key], key, iterable);
						};
					}
					var index = findIndexFunc(collection, predicate, fromIndex);
					return index > -1 ? iterable[iteratee$1 ? collection[index] : index] : undefined$1;
				};
			}
			function createFlow(fromRight) {
				return flatRest(function(funcs) {
					var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
					if (fromRight) funcs.reverse();
					while (index--) {
						var func = funcs[index];
						if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
						if (prereq && !wrapper && getFuncName(func) == "wrapper") var wrapper = new LodashWrapper([], true);
					}
					index = wrapper ? index : length;
					while (++index < length) {
						func = funcs[index];
						var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
						if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
						else wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
					}
					return function() {
						var args = arguments, value = args[0];
						if (wrapper && args.length == 1 && isArray$5(value)) return wrapper.plant(value).value();
						var index$1 = 0, result$1 = length ? funcs[index$1].apply(this, args) : value;
						while (++index$1 < length) result$1 = funcs[index$1].call(this, result$1);
						return result$1;
					};
				});
			}
			function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary$1, arity) {
				var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
				function wrapper() {
					var length = arguments.length, args = Array$1(length), index = length;
					while (index--) args[index] = arguments[index];
					if (isCurried) var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
					if (partials) args = composeArgs(args, partials, holders, isCurried);
					if (partialsRight) args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
					length -= holdersCount;
					if (isCurried && length < arity) {
						var newHolders = replaceHolders(args, placeholder);
						return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary$1, arity - length);
					}
					var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
					length = args.length;
					if (argPos) args = reorder(args, argPos);
					else if (isFlip && length > 1) args.reverse();
					if (isAry && ary$1 < length) args.length = ary$1;
					if (this && this !== root && this instanceof wrapper) fn = Ctor || createCtor(fn);
					return fn.apply(thisBinding, args);
				}
				return wrapper;
			}
			function createInverter(setter, toIteratee) {
				return function(object, iteratee$1) {
					return baseInverter(object, setter, toIteratee(iteratee$1), {});
				};
			}
			function createMathOperation(operator, defaultValue) {
				return function(value, other) {
					var result$1;
					if (value === undefined$1 && other === undefined$1) return defaultValue;
					if (value !== undefined$1) result$1 = value;
					if (other !== undefined$1) {
						if (result$1 === undefined$1) return other;
						if (typeof value == "string" || typeof other == "string") {
							value = baseToString(value);
							other = baseToString(other);
						} else {
							value = baseToNumber(value);
							other = baseToNumber(other);
						}
						result$1 = operator(value, other);
					}
					return result$1;
				};
			}
			function createOver(arrayFunc) {
				return flatRest(function(iteratees) {
					iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
					return baseRest(function(args) {
						var thisArg = this;
						return arrayFunc(iteratees, function(iteratee$1) {
							return apply(iteratee$1, thisArg, args);
						});
					});
				});
			}
			function createPadding(length, chars) {
				chars = chars === undefined$1 ? " " : baseToString(chars);
				var charsLength = chars.length;
				if (charsLength < 2) return charsLength ? baseRepeat(chars, length) : chars;
				var result$1 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
				return hasUnicode(chars) ? castSlice(stringToArray(result$1), 0, length).join("") : result$1.slice(0, length);
			}
			function createPartial(func, bitmask, thisArg, partials) {
				var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
				function wrapper() {
					var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array$1(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
					while (++leftIndex < leftLength) args[leftIndex] = partials[leftIndex];
					while (argsLength--) args[leftIndex++] = arguments[++argsIndex];
					return apply(fn, isBind ? thisArg : this, args);
				}
				return wrapper;
			}
			function createRange(fromRight) {
				return function(start, end, step) {
					if (step && typeof step != "number" && isIterateeCall(start, end, step)) end = step = undefined$1;
					start = toFinite(start);
					if (end === undefined$1) {
						end = start;
						start = 0;
					} else end = toFinite(end);
					step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
					return baseRange(start, end, step, fromRight);
				};
			}
			function createRelationalOperation(operator) {
				return function(value, other) {
					if (!(typeof value == "string" && typeof other == "string")) {
						value = toNumber(value);
						other = toNumber(other);
					}
					return operator(value, other);
				};
			}
			function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary$1, arity) {
				var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
				bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
				bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
				if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
				var newData = [
					func,
					bitmask,
					thisArg,
					newPartials,
					newHolders,
					newPartialsRight,
					newHoldersRight,
					argPos,
					ary$1,
					arity
				];
				var result$1 = wrapFunc.apply(undefined$1, newData);
				if (isLaziable(func)) setData(result$1, newData);
				result$1.placeholder = placeholder;
				return setWrapToString(result$1, func, bitmask);
			}
			function createRound(methodName) {
				var func = Math$1[methodName];
				return function(number, precision) {
					number = toNumber(number);
					precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
					if (precision && nativeIsFinite(number)) {
						var pair = (toString(number) + "e").split("e");
						pair = (toString(func(pair[0] + "e" + (+pair[1] + precision))) + "e").split("e");
						return +(pair[0] + "e" + (+pair[1] - precision));
					}
					return func(number);
				};
			}
			var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values$2) {
				return new Set(values$2);
			};
			function createToPairs(keysFunc) {
				return function(object) {
					var tag = getTag(object);
					if (tag == mapTag) return mapToArray(object);
					if (tag == setTag) return setToPairs(object);
					return baseToPairs(object, keysFunc(object));
				};
			}
			function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary$1, arity) {
				var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
				if (!isBindKey && typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				var length = partials ? partials.length : 0;
				if (!length) {
					bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
					partials = holders = undefined$1;
				}
				ary$1 = ary$1 === undefined$1 ? ary$1 : nativeMax(toInteger(ary$1), 0);
				arity = arity === undefined$1 ? arity : toInteger(arity);
				length -= holders ? holders.length : 0;
				if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
					var partialsRight = partials, holdersRight = holders;
					partials = holders = undefined$1;
				}
				var data = isBindKey ? undefined$1 : getData(func);
				var newData = [
					func,
					bitmask,
					thisArg,
					partials,
					holders,
					partialsRight,
					holdersRight,
					argPos,
					ary$1,
					arity
				];
				if (data) mergeData(newData, data);
				func = newData[0];
				bitmask = newData[1];
				thisArg = newData[2];
				partials = newData[3];
				holders = newData[4];
				arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
				if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
				if (!bitmask || bitmask == WRAP_BIND_FLAG) var result$1 = createBind(func, bitmask, thisArg);
				else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) result$1 = createCurry(func, bitmask, arity);
				else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) result$1 = createPartial(func, bitmask, thisArg, partials);
				else result$1 = createHybrid.apply(undefined$1, newData);
				return setWrapToString((data ? baseSetData : setData)(result$1, newData), func, bitmask);
			}
			function customDefaultsAssignIn(objValue, srcValue, key, object) {
				if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) return srcValue;
				return objValue;
			}
			function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
				if (isObject$1(objValue) && isObject$1(srcValue)) {
					stack.set(srcValue, objValue);
					baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
					stack["delete"](srcValue);
				}
				return objValue;
			}
			function customOmitClone(value) {
				return isPlainObject(value) ? undefined$1 : value;
			}
			function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
				var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
				if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
				var arrStacked = stack.get(array);
				var othStacked = stack.get(other);
				if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
				var index = -1, result$1 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
				stack.set(array, other);
				stack.set(other, array);
				while (++index < arrLength) {
					var arrValue = array[index], othValue = other[index];
					if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
					if (compared !== undefined$1) {
						if (compared) continue;
						result$1 = false;
						break;
					}
					if (seen) {
						if (!arraySome(other, function(othValue$1, othIndex) {
							if (!cacheHas(seen, othIndex) && (arrValue === othValue$1 || equalFunc(arrValue, othValue$1, bitmask, customizer, stack))) return seen.push(othIndex);
						})) {
							result$1 = false;
							break;
						}
					} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
						result$1 = false;
						break;
					}
				}
				stack["delete"](array);
				stack["delete"](other);
				return result$1;
			}
			function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
				switch (tag) {
					case dataViewTag:
						if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
						object = object.buffer;
						other = other.buffer;
					case arrayBufferTag:
						if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
						return true;
					case boolTag:
					case dateTag:
					case numberTag: return eq(+object, +other);
					case errorTag: return object.name == other.name && object.message == other.message;
					case regexpTag:
					case stringTag: return object == other + "";
					case mapTag: var convert = mapToArray;
					case setTag:
						var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
						convert || (convert = setToArray);
						if (object.size != other.size && !isPartial) return false;
						var stacked = stack.get(object);
						if (stacked) return stacked == other;
						bitmask |= COMPARE_UNORDERED_FLAG;
						stack.set(object, other);
						var result$1 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
						stack["delete"](object);
						return result$1;
					case symbolTag: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
				}
				return false;
			}
			function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
				var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length;
				if (objLength != getAllKeys(other).length && !isPartial) return false;
				var index = objLength;
				while (index--) {
					var key = objProps[index];
					if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
				}
				var objStacked = stack.get(object);
				var othStacked = stack.get(other);
				if (objStacked && othStacked) return objStacked == other && othStacked == object;
				var result$1 = true;
				stack.set(object, other);
				stack.set(other, object);
				var skipCtor = isPartial;
				while (++index < objLength) {
					key = objProps[index];
					var objValue = object[key], othValue = other[key];
					if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
					if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
						result$1 = false;
						break;
					}
					skipCtor || (skipCtor = key == "constructor");
				}
				if (result$1 && !skipCtor) {
					var objCtor = object.constructor, othCtor = other.constructor;
					if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result$1 = false;
				}
				stack["delete"](object);
				stack["delete"](other);
				return result$1;
			}
			function flatRest(func) {
				return setToString(overRest(func, undefined$1, flatten$1), func + "");
			}
			function getAllKeys(object) {
				return baseGetAllKeys(object, keys$1, getSymbols);
			}
			function getAllKeysIn(object) {
				return baseGetAllKeys(object, keysIn, getSymbolsIn);
			}
			var getData = !metaMap ? noop : function(func) {
				return metaMap.get(func);
			};
			function getFuncName(func) {
				var result$1 = func.name + "", array = realNames[result$1], length = hasOwnProperty.call(realNames, result$1) ? array.length : 0;
				while (length--) {
					var data = array[length], otherFunc = data.func;
					if (otherFunc == null || otherFunc == func) return data.name;
				}
				return result$1;
			}
			function getHolder(func) {
				return (hasOwnProperty.call(lodash, "placeholder") ? lodash : func).placeholder;
			}
			function getIteratee() {
				var result$1 = lodash.iteratee || iteratee;
				result$1 = result$1 === iteratee ? baseIteratee : result$1;
				return arguments.length ? result$1(arguments[0], arguments[1]) : result$1;
			}
			function getMapData(map$12, key) {
				var data = map$12.__data__;
				return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
			}
			function getMatchData(object) {
				var result$1 = keys$1(object), length = result$1.length;
				while (length--) {
					var key = result$1[length], value = object[key];
					result$1[length] = [
						key,
						value,
						isStrictComparable(value)
					];
				}
				return result$1;
			}
			function getNative(object, key) {
				var value = getValue(object, key);
				return baseIsNative(value) ? value : undefined$1;
			}
			function getRawTag(value) {
				var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
				try {
					value[symToStringTag] = undefined$1;
					var unmasked = true;
				} catch (e) {}
				var result$1 = nativeObjectToString.call(value);
				if (unmasked) if (isOwn) value[symToStringTag] = tag;
				else delete value[symToStringTag];
				return result$1;
			}
			var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
				if (object == null) return [];
				object = Object$1(object);
				return arrayFilter(nativeGetSymbols(object), function(symbol) {
					return propertyIsEnumerable.call(object, symbol);
				});
			};
			var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
				var result$1 = [];
				while (object) {
					arrayPush(result$1, getSymbols(object));
					object = getPrototype(object);
				}
				return result$1;
			};
			var getTag = baseGetTag;
			if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) getTag = function(value) {
				var result$1 = baseGetTag(value), Ctor = result$1 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
				if (ctorString) switch (ctorString) {
					case dataViewCtorString: return dataViewTag;
					case mapCtorString: return mapTag;
					case promiseCtorString: return promiseTag;
					case setCtorString: return setTag;
					case weakMapCtorString: return weakMapTag;
				}
				return result$1;
			};
			function getView(start, end, transforms) {
				var index = -1, length = transforms.length;
				while (++index < length) {
					var data = transforms[index], size$1 = data.size;
					switch (data.type) {
						case "drop":
							start += size$1;
							break;
						case "dropRight":
							end -= size$1;
							break;
						case "take":
							end = nativeMin(end, start + size$1);
							break;
						case "takeRight":
							start = nativeMax(start, end - size$1);
							break;
					}
				}
				return {
					"start": start,
					"end": end
				};
			}
			function getWrapDetails(source) {
				var match = source.match(reWrapDetails);
				return match ? match[1].split(reSplitDetails) : [];
			}
			function hasPath(object, path, hasFunc) {
				path = castPath(path, object);
				var index = -1, length = path.length, result$1 = false;
				while (++index < length) {
					var key = toKey(path[index]);
					if (!(result$1 = object != null && hasFunc(object, key))) break;
					object = object[key];
				}
				if (result$1 || ++index != length) return result$1;
				length = object == null ? 0 : object.length;
				return !!length && isLength(length) && isIndex(key, length) && (isArray$5(object) || isArguments(object));
			}
			function initCloneArray(array) {
				var length = array.length, result$1 = new array.constructor(length);
				if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
					result$1.index = array.index;
					result$1.input = array.input;
				}
				return result$1;
			}
			function initCloneObject(object) {
				return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
			}
			function initCloneByTag(object, tag, isDeep) {
				var Ctor = object.constructor;
				switch (tag) {
					case arrayBufferTag: return cloneArrayBuffer(object);
					case boolTag:
					case dateTag: return new Ctor(+object);
					case dataViewTag: return cloneDataView(object, isDeep);
					case float32Tag:
					case float64Tag:
					case int8Tag:
					case int16Tag:
					case int32Tag:
					case uint8Tag:
					case uint8ClampedTag:
					case uint16Tag:
					case uint32Tag: return cloneTypedArray(object, isDeep);
					case mapTag: return new Ctor();
					case numberTag:
					case stringTag: return new Ctor(object);
					case regexpTag: return cloneRegExp(object);
					case setTag: return new Ctor();
					case symbolTag: return cloneSymbol(object);
				}
			}
			function insertWrapDetails(source, details) {
				var length = details.length;
				if (!length) return source;
				var lastIndex = length - 1;
				details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
				details = details.join(length > 2 ? ", " : " ");
				return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
			}
			function isFlattenable(value) {
				return isArray$5(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
			}
			function isIndex(value, length) {
				var type = typeof value;
				length = length == null ? MAX_SAFE_INTEGER : length;
				return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
			}
			function isIterateeCall(value, index, object) {
				if (!isObject$1(object)) return false;
				var type = typeof index;
				if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
				return false;
			}
			function isKey(value, object) {
				if (isArray$5(value)) return false;
				var type = typeof value;
				if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
				return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object$1(object);
			}
			function isKeyable(value) {
				var type = typeof value;
				return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
			}
			function isLaziable(func) {
				var funcName = getFuncName(func), other = lodash[funcName];
				if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) return false;
				if (func === other) return true;
				var data = getData(other);
				return !!data && func === data[0];
			}
			function isMasked(func) {
				return !!maskSrcKey && maskSrcKey in func;
			}
			var isMaskable = coreJsData ? isFunction$2 : stubFalse;
			function isPrototype(value) {
				var Ctor = value && value.constructor;
				return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
			}
			function isStrictComparable(value) {
				return value === value && !isObject$1(value);
			}
			function matchesStrictComparable(key, srcValue) {
				return function(object) {
					if (object == null) return false;
					return object[key] === srcValue && (srcValue !== undefined$1 || key in Object$1(object));
				};
			}
			function memoizeCapped(func) {
				var result$1 = memoize(func, function(key) {
					if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
					return key;
				});
				var cache = result$1.cache;
				return result$1;
			}
			function mergeData(data, source) {
				var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
				var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
				if (!(isCommon || isCombo)) return data;
				if (srcBitmask & WRAP_BIND_FLAG) {
					data[2] = source[2];
					newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
				}
				var value = source[3];
				if (value) {
					var partials = data[3];
					data[3] = partials ? composeArgs(partials, value, source[4]) : value;
					data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
				}
				value = source[5];
				if (value) {
					partials = data[5];
					data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
					data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
				}
				value = source[7];
				if (value) data[7] = value;
				if (srcBitmask & WRAP_ARY_FLAG) data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
				if (data[9] == null) data[9] = source[9];
				data[0] = source[0];
				data[1] = newBitmask;
				return data;
			}
			function nativeKeysIn(object) {
				var result$1 = [];
				if (object != null) for (var key in Object$1(object)) result$1.push(key);
				return result$1;
			}
			function objectToString(value) {
				return nativeObjectToString.call(value);
			}
			function overRest(func, start, transform$1) {
				start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
				return function() {
					var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array$1(length);
					while (++index < length) array[index] = args[start + index];
					index = -1;
					var otherArgs = Array$1(start + 1);
					while (++index < start) otherArgs[index] = args[index];
					otherArgs[start] = transform$1(array);
					return apply(func, this, otherArgs);
				};
			}
			function parent(object, path) {
				return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
			}
			function reorder(array, indexes) {
				var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
				while (length--) {
					var index = indexes[length];
					array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
				}
				return array;
			}
			function safeGet(object, key) {
				if (key === "constructor" && typeof object[key] === "function") return;
				if (key == "__proto__") return;
				return object[key];
			}
			var setData = shortOut(baseSetData);
			var setTimeout = ctxSetTimeout || function(func, wait) {
				return root.setTimeout(func, wait);
			};
			var setToString = shortOut(baseSetToString);
			function setWrapToString(wrapper, reference, bitmask) {
				var source = reference + "";
				return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
			}
			function shortOut(func) {
				var count = 0, lastCalled = 0;
				return function() {
					var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
					lastCalled = stamp;
					if (remaining > 0) {
						if (++count >= HOT_COUNT) return arguments[0];
					} else count = 0;
					return func.apply(undefined$1, arguments);
				};
			}
			function shuffleSelf(array, size$1) {
				var index = -1, length = array.length, lastIndex = length - 1;
				size$1 = size$1 === undefined$1 ? length : size$1;
				while (++index < size$1) {
					var rand = baseRandom(index, lastIndex), value = array[rand];
					array[rand] = array[index];
					array[index] = value;
				}
				array.length = size$1;
				return array;
			}
			var stringToPath = memoizeCapped(function(string) {
				var result$1 = [];
				if (string.charCodeAt(0) === 46) result$1.push("");
				string.replace(rePropName, function(match, number, quote, subString) {
					result$1.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
				});
				return result$1;
			});
			function toKey(value) {
				if (typeof value == "string" || isSymbol(value)) return value;
				var result$1 = value + "";
				return result$1 == "0" && 1 / value == -INFINITY ? "-0" : result$1;
			}
			function toSource(func) {
				if (func != null) {
					try {
						return funcToString.call(func);
					} catch (e) {}
					try {
						return func + "";
					} catch (e) {}
				}
				return "";
			}
			function updateWrapDetails(details, bitmask) {
				arrayEach(wrapFlags, function(pair) {
					var value = "_." + pair[0];
					if (bitmask & pair[1] && !arrayIncludes(details, value)) details.push(value);
				});
				return details.sort();
			}
			function wrapperClone(wrapper) {
				if (wrapper instanceof LazyWrapper) return wrapper.clone();
				var result$1 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
				result$1.__actions__ = copyArray(wrapper.__actions__);
				result$1.__index__ = wrapper.__index__;
				result$1.__values__ = wrapper.__values__;
				return result$1;
			}
			function chunk(array, size$1, guard) {
				if (guard ? isIterateeCall(array, size$1, guard) : size$1 === undefined$1) size$1 = 1;
				else size$1 = nativeMax(toInteger(size$1), 0);
				var length = array == null ? 0 : array.length;
				if (!length || size$1 < 1) return [];
				var index = 0, resIndex = 0, result$1 = Array$1(nativeCeil(length / size$1));
				while (index < length) result$1[resIndex++] = baseSlice(array, index, index += size$1);
				return result$1;
			}
			function compact$1(array) {
				var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result$1 = [];
				while (++index < length) {
					var value = array[index];
					if (value) result$1[resIndex++] = value;
				}
				return result$1;
			}
			function concat() {
				var length = arguments.length;
				if (!length) return [];
				var args = Array$1(length - 1), array = arguments[0], index = length;
				while (index--) args[index - 1] = arguments[index];
				return arrayPush(isArray$5(array) ? copyArray(array) : [array], baseFlatten(args, 1));
			}
			var difference$5 = baseRest(function(array, values$2) {
				return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values$2, 1, isArrayLikeObject, true)) : [];
			});
			var differenceBy = baseRest(function(array, values$2) {
				var iteratee$1 = last$2(values$2);
				if (isArrayLikeObject(iteratee$1)) iteratee$1 = undefined$1;
				return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values$2, 1, isArrayLikeObject, true), getIteratee(iteratee$1, 2)) : [];
			});
			var differenceWith = baseRest(function(array, values$2) {
				var comparator = last$2(values$2);
				if (isArrayLikeObject(comparator)) comparator = undefined$1;
				return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values$2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
			});
			function drop$2(array, n, guard) {
				var length = array == null ? 0 : array.length;
				if (!length) return [];
				n = guard || n === undefined$1 ? 1 : toInteger(n);
				return baseSlice(array, n < 0 ? 0 : n, length);
			}
			function dropRight$1(array, n, guard) {
				var length = array == null ? 0 : array.length;
				if (!length) return [];
				n = guard || n === undefined$1 ? 1 : toInteger(n);
				n = length - n;
				return baseSlice(array, 0, n < 0 ? 0 : n);
			}
			function dropRightWhile(array, predicate) {
				return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
			}
			function dropWhile(array, predicate) {
				return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
			}
			function fill(array, value, start, end) {
				var length = array == null ? 0 : array.length;
				if (!length) return [];
				if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
					start = 0;
					end = length;
				}
				return baseFill(array, value, start, end);
			}
			function findIndex$1(array, predicate, fromIndex) {
				var length = array == null ? 0 : array.length;
				if (!length) return -1;
				var index = fromIndex == null ? 0 : toInteger(fromIndex);
				if (index < 0) index = nativeMax(length + index, 0);
				return baseFindIndex(array, getIteratee(predicate, 3), index);
			}
			function findLastIndex(array, predicate, fromIndex) {
				var length = array == null ? 0 : array.length;
				if (!length) return -1;
				var index = length - 1;
				if (fromIndex !== undefined$1) {
					index = toInteger(fromIndex);
					index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
				}
				return baseFindIndex(array, getIteratee(predicate, 3), index, true);
			}
			function flatten$1(array) {
				return (array == null ? 0 : array.length) ? baseFlatten(array, 1) : [];
			}
			function flattenDeep(array) {
				return (array == null ? 0 : array.length) ? baseFlatten(array, INFINITY) : [];
			}
			function flattenDepth(array, depth) {
				if (!(array == null ? 0 : array.length)) return [];
				depth = depth === undefined$1 ? 1 : toInteger(depth);
				return baseFlatten(array, depth);
			}
			function fromPairs(pairs) {
				var index = -1, length = pairs == null ? 0 : pairs.length, result$1 = {};
				while (++index < length) {
					var pair = pairs[index];
					result$1[pair[0]] = pair[1];
				}
				return result$1;
			}
			function head(array) {
				return array && array.length ? array[0] : undefined$1;
			}
			function indexOf$1(array, value, fromIndex) {
				var length = array == null ? 0 : array.length;
				if (!length) return -1;
				var index = fromIndex == null ? 0 : toInteger(fromIndex);
				if (index < 0) index = nativeMax(length + index, 0);
				return baseIndexOf(array, value, index);
			}
			function initial(array) {
				return (array == null ? 0 : array.length) ? baseSlice(array, 0, -1) : [];
			}
			var intersection = baseRest(function(arrays) {
				var mapped = arrayMap(arrays, castArrayLikeObject);
				return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
			});
			var intersectionBy = baseRest(function(arrays) {
				var iteratee$1 = last$2(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
				if (iteratee$1 === last$2(mapped)) iteratee$1 = undefined$1;
				else mapped.pop();
				return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee$1, 2)) : [];
			});
			var intersectionWith = baseRest(function(arrays) {
				var comparator = last$2(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
				comparator = typeof comparator == "function" ? comparator : undefined$1;
				if (comparator) mapped.pop();
				return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
			});
			function join(array, separator) {
				return array == null ? "" : nativeJoin.call(array, separator);
			}
			function last$2(array) {
				var length = array == null ? 0 : array.length;
				return length ? array[length - 1] : undefined$1;
			}
			function lastIndexOf(array, value, fromIndex) {
				var length = array == null ? 0 : array.length;
				if (!length) return -1;
				var index = length;
				if (fromIndex !== undefined$1) {
					index = toInteger(fromIndex);
					index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
				}
				return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
			}
			function nth(array, n) {
				return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
			}
			var pull = baseRest(pullAll);
			function pullAll(array, values$2) {
				return array && array.length && values$2 && values$2.length ? basePullAll(array, values$2) : array;
			}
			function pullAllBy(array, values$2, iteratee$1) {
				return array && array.length && values$2 && values$2.length ? basePullAll(array, values$2, getIteratee(iteratee$1, 2)) : array;
			}
			function pullAllWith(array, values$2, comparator) {
				return array && array.length && values$2 && values$2.length ? basePullAll(array, values$2, undefined$1, comparator) : array;
			}
			var pullAt = flatRest(function(array, indexes) {
				var length = array == null ? 0 : array.length, result$1 = baseAt(array, indexes);
				basePullAt(array, arrayMap(indexes, function(index) {
					return isIndex(index, length) ? +index : index;
				}).sort(compareAscending));
				return result$1;
			});
			function remove(array, predicate) {
				var result$1 = [];
				if (!(array && array.length)) return result$1;
				var index = -1, indexes = [], length = array.length;
				predicate = getIteratee(predicate, 3);
				while (++index < length) {
					var value = array[index];
					if (predicate(value, index, array)) {
						result$1.push(value);
						indexes.push(index);
					}
				}
				basePullAt(array, indexes);
				return result$1;
			}
			function reverse(array) {
				return array == null ? array : nativeReverse.call(array);
			}
			function slice(array, start, end) {
				var length = array == null ? 0 : array.length;
				if (!length) return [];
				if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
					start = 0;
					end = length;
				} else {
					start = start == null ? 0 : toInteger(start);
					end = end === undefined$1 ? length : toInteger(end);
				}
				return baseSlice(array, start, end);
			}
			function sortedIndex(array, value) {
				return baseSortedIndex(array, value);
			}
			function sortedIndexBy(array, value, iteratee$1) {
				return baseSortedIndexBy(array, value, getIteratee(iteratee$1, 2));
			}
			function sortedIndexOf(array, value) {
				var length = array == null ? 0 : array.length;
				if (length) {
					var index = baseSortedIndex(array, value);
					if (index < length && eq(array[index], value)) return index;
				}
				return -1;
			}
			function sortedLastIndex(array, value) {
				return baseSortedIndex(array, value, true);
			}
			function sortedLastIndexBy(array, value, iteratee$1) {
				return baseSortedIndexBy(array, value, getIteratee(iteratee$1, 2), true);
			}
			function sortedLastIndexOf(array, value) {
				if (array == null ? 0 : array.length) {
					var index = baseSortedIndex(array, value, true) - 1;
					if (eq(array[index], value)) return index;
				}
				return -1;
			}
			function sortedUniq(array) {
				return array && array.length ? baseSortedUniq(array) : [];
			}
			function sortedUniqBy(array, iteratee$1) {
				return array && array.length ? baseSortedUniq(array, getIteratee(iteratee$1, 2)) : [];
			}
			function tail(array) {
				var length = array == null ? 0 : array.length;
				return length ? baseSlice(array, 1, length) : [];
			}
			function take(array, n, guard) {
				if (!(array && array.length)) return [];
				n = guard || n === undefined$1 ? 1 : toInteger(n);
				return baseSlice(array, 0, n < 0 ? 0 : n);
			}
			function takeRight(array, n, guard) {
				var length = array == null ? 0 : array.length;
				if (!length) return [];
				n = guard || n === undefined$1 ? 1 : toInteger(n);
				n = length - n;
				return baseSlice(array, n < 0 ? 0 : n, length);
			}
			function takeRightWhile(array, predicate) {
				return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
			}
			function takeWhile(array, predicate) {
				return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
			}
			var union = baseRest(function(arrays) {
				return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
			});
			var unionBy = baseRest(function(arrays) {
				var iteratee$1 = last$2(arrays);
				if (isArrayLikeObject(iteratee$1)) iteratee$1 = undefined$1;
				return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee$1, 2));
			});
			var unionWith = baseRest(function(arrays) {
				var comparator = last$2(arrays);
				comparator = typeof comparator == "function" ? comparator : undefined$1;
				return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
			});
			function uniq$1(array) {
				return array && array.length ? baseUniq(array) : [];
			}
			function uniqBy(array, iteratee$1) {
				return array && array.length ? baseUniq(array, getIteratee(iteratee$1, 2)) : [];
			}
			function uniqWith(array, comparator) {
				comparator = typeof comparator == "function" ? comparator : undefined$1;
				return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
			}
			function unzip(array) {
				if (!(array && array.length)) return [];
				var length = 0;
				array = arrayFilter(array, function(group) {
					if (isArrayLikeObject(group)) {
						length = nativeMax(group.length, length);
						return true;
					}
				});
				return baseTimes(length, function(index) {
					return arrayMap(array, baseProperty(index));
				});
			}
			function unzipWith(array, iteratee$1) {
				if (!(array && array.length)) return [];
				var result$1 = unzip(array);
				if (iteratee$1 == null) return result$1;
				return arrayMap(result$1, function(group) {
					return apply(iteratee$1, undefined$1, group);
				});
			}
			var without = baseRest(function(array, values$2) {
				return isArrayLikeObject(array) ? baseDifference(array, values$2) : [];
			});
			var xor = baseRest(function(arrays) {
				return baseXor(arrayFilter(arrays, isArrayLikeObject));
			});
			var xorBy = baseRest(function(arrays) {
				var iteratee$1 = last$2(arrays);
				if (isArrayLikeObject(iteratee$1)) iteratee$1 = undefined$1;
				return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee$1, 2));
			});
			var xorWith = baseRest(function(arrays) {
				var comparator = last$2(arrays);
				comparator = typeof comparator == "function" ? comparator : undefined$1;
				return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
			});
			var zip = baseRest(unzip);
			function zipObject(props, values$2) {
				return baseZipObject(props || [], values$2 || [], assignValue);
			}
			function zipObjectDeep(props, values$2) {
				return baseZipObject(props || [], values$2 || [], baseSet);
			}
			var zipWith = baseRest(function(arrays) {
				var length = arrays.length, iteratee$1 = length > 1 ? arrays[length - 1] : undefined$1;
				iteratee$1 = typeof iteratee$1 == "function" ? (arrays.pop(), iteratee$1) : undefined$1;
				return unzipWith(arrays, iteratee$1);
			});
			function chain(value) {
				var result$1 = lodash(value);
				result$1.__chain__ = true;
				return result$1;
			}
			function tap(value, interceptor) {
				interceptor(value);
				return value;
			}
			function thru(value, interceptor) {
				return interceptor(value);
			}
			var wrapperAt = flatRest(function(paths) {
				var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
					return baseAt(object, paths);
				};
				if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) return this.thru(interceptor);
				value = value.slice(start, +start + (length ? 1 : 0));
				value.__actions__.push({
					"func": thru,
					"args": [interceptor],
					"thisArg": undefined$1
				});
				return new LodashWrapper(value, this.__chain__).thru(function(array) {
					if (length && !array.length) array.push(undefined$1);
					return array;
				});
			});
			function wrapperChain() {
				return chain(this);
			}
			function wrapperCommit() {
				return new LodashWrapper(this.value(), this.__chain__);
			}
			function wrapperNext() {
				if (this.__values__ === undefined$1) this.__values__ = toArray(this.value());
				var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
				return {
					"done": done,
					"value": value
				};
			}
			function wrapperToIterator() {
				return this;
			}
			function wrapperPlant(value) {
				var result$1, parent$1 = this;
				while (parent$1 instanceof baseLodash) {
					var clone$1 = wrapperClone(parent$1);
					clone$1.__index__ = 0;
					clone$1.__values__ = undefined$1;
					if (result$1) previous.__wrapped__ = clone$1;
					else result$1 = clone$1;
					var previous = clone$1;
					parent$1 = parent$1.__wrapped__;
				}
				previous.__wrapped__ = value;
				return result$1;
			}
			function wrapperReverse() {
				var value = this.__wrapped__;
				if (value instanceof LazyWrapper) {
					var wrapped = value;
					if (this.__actions__.length) wrapped = new LazyWrapper(this);
					wrapped = wrapped.reverse();
					wrapped.__actions__.push({
						"func": thru,
						"args": [reverse],
						"thisArg": undefined$1
					});
					return new LodashWrapper(wrapped, this.__chain__);
				}
				return this.thru(reverse);
			}
			function wrapperValue() {
				return baseWrapperValue(this.__wrapped__, this.__actions__);
			}
			var countBy = createAggregator(function(result$1, value, key) {
				if (hasOwnProperty.call(result$1, key)) ++result$1[key];
				else baseAssignValue(result$1, key, 1);
			});
			function every$1(collection, predicate, guard) {
				var func = isArray$5(collection) ? arrayEvery : baseEvery;
				if (guard && isIterateeCall(collection, predicate, guard)) predicate = undefined$1;
				return func(collection, getIteratee(predicate, 3));
			}
			function filter$6(collection, predicate) {
				return (isArray$5(collection) ? arrayFilter : baseFilter)(collection, getIteratee(predicate, 3));
			}
			var find$1 = createFind(findIndex$1);
			var findLast = createFind(findLastIndex);
			function flatMap$1(collection, iteratee$1) {
				return baseFlatten(map$11(collection, iteratee$1), 1);
			}
			function flatMapDeep(collection, iteratee$1) {
				return baseFlatten(map$11(collection, iteratee$1), INFINITY);
			}
			function flatMapDepth(collection, iteratee$1, depth) {
				depth = depth === undefined$1 ? 1 : toInteger(depth);
				return baseFlatten(map$11(collection, iteratee$1), depth);
			}
			function forEach$8(collection, iteratee$1) {
				return (isArray$5(collection) ? arrayEach : baseEach)(collection, getIteratee(iteratee$1, 3));
			}
			function forEachRight(collection, iteratee$1) {
				return (isArray$5(collection) ? arrayEachRight : baseEachRight)(collection, getIteratee(iteratee$1, 3));
			}
			var groupBy$3 = createAggregator(function(result$1, value, key) {
				if (hasOwnProperty.call(result$1, key)) result$1[key].push(value);
				else baseAssignValue(result$1, key, [value]);
			});
			function includes$4(collection, value, fromIndex, guard) {
				collection = isArrayLike(collection) ? collection : values$1(collection);
				fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
				var length = collection.length;
				if (fromIndex < 0) fromIndex = nativeMax(length + fromIndex, 0);
				return isString$1(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
			}
			var invokeMap = baseRest(function(collection, path, args) {
				var index = -1, isFunc = typeof path == "function", result$1 = isArrayLike(collection) ? Array$1(collection.length) : [];
				baseEach(collection, function(value) {
					result$1[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
				});
				return result$1;
			});
			var keyBy = createAggregator(function(result$1, value, key) {
				baseAssignValue(result$1, key, value);
			});
			function map$11(collection, iteratee$1) {
				return (isArray$5(collection) ? arrayMap : baseMap)(collection, getIteratee(iteratee$1, 3));
			}
			function orderBy(collection, iteratees, orders, guard) {
				if (collection == null) return [];
				if (!isArray$5(iteratees)) iteratees = iteratees == null ? [] : [iteratees];
				orders = guard ? undefined$1 : orders;
				if (!isArray$5(orders)) orders = orders == null ? [] : [orders];
				return baseOrderBy(collection, iteratees, orders);
			}
			var partition = createAggregator(function(result$1, value, key) {
				result$1[key ? 0 : 1].push(value);
			}, function() {
				return [[], []];
			});
			function reduce$4(collection, iteratee$1, accumulator) {
				var func = isArray$5(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
				return func(collection, getIteratee(iteratee$1, 4), accumulator, initAccum, baseEach);
			}
			function reduceRight(collection, iteratee$1, accumulator) {
				var func = isArray$5(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
				return func(collection, getIteratee(iteratee$1, 4), accumulator, initAccum, baseEachRight);
			}
			function reject$1(collection, predicate) {
				return (isArray$5(collection) ? arrayFilter : baseFilter)(collection, negate(getIteratee(predicate, 3)));
			}
			function sample(collection) {
				return (isArray$5(collection) ? arraySample : baseSample)(collection);
			}
			function sampleSize(collection, n, guard) {
				if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) n = 1;
				else n = toInteger(n);
				return (isArray$5(collection) ? arraySampleSize : baseSampleSize)(collection, n);
			}
			function shuffle(collection) {
				return (isArray$5(collection) ? arrayShuffle : baseShuffle)(collection);
			}
			function size(collection) {
				if (collection == null) return 0;
				if (isArrayLike(collection)) return isString$1(collection) ? stringSize(collection) : collection.length;
				var tag = getTag(collection);
				if (tag == mapTag || tag == setTag) return collection.size;
				return baseKeys(collection).length;
			}
			function some$1(collection, predicate, guard) {
				var func = isArray$5(collection) ? arraySome : baseSome;
				if (guard && isIterateeCall(collection, predicate, guard)) predicate = undefined$1;
				return func(collection, getIteratee(predicate, 3));
			}
			var sortBy$1 = baseRest(function(collection, iteratees) {
				if (collection == null) return [];
				var length = iteratees.length;
				if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) iteratees = [];
				else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) iteratees = [iteratees[0]];
				return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
			});
			var now = ctxNow || function() {
				return root.Date.now();
			};
			function after(n, func) {
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				n = toInteger(n);
				return function() {
					if (--n < 1) return func.apply(this, arguments);
				};
			}
			function ary(func, n, guard) {
				n = guard ? undefined$1 : n;
				n = func && n == null ? func.length : n;
				return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
			}
			function before(n, func) {
				var result$1;
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				n = toInteger(n);
				return function() {
					if (--n > 0) result$1 = func.apply(this, arguments);
					if (n <= 1) func = undefined$1;
					return result$1;
				};
			}
			var bind = baseRest(function(func, thisArg, partials) {
				var bitmask = WRAP_BIND_FLAG;
				if (partials.length) {
					var holders = replaceHolders(partials, getHolder(bind));
					bitmask |= WRAP_PARTIAL_FLAG;
				}
				return createWrap(func, bitmask, thisArg, partials, holders);
			});
			var bindKey = baseRest(function(object, key, partials) {
				var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
				if (partials.length) {
					var holders = replaceHolders(partials, getHolder(bindKey));
					bitmask |= WRAP_PARTIAL_FLAG;
				}
				return createWrap(key, bitmask, object, partials, holders);
			});
			function curry(func, arity, guard) {
				arity = guard ? undefined$1 : arity;
				var result$1 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
				result$1.placeholder = curry.placeholder;
				return result$1;
			}
			function curryRight(func, arity, guard) {
				arity = guard ? undefined$1 : arity;
				var result$1 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
				result$1.placeholder = curryRight.placeholder;
				return result$1;
			}
			function debounce(func, wait, options) {
				var lastArgs, lastThis, maxWait, result$1, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				wait = toNumber(wait) || 0;
				if (isObject$1(options)) {
					leading = !!options.leading;
					maxing = "maxWait" in options;
					maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
					trailing = "trailing" in options ? !!options.trailing : trailing;
				}
				function invokeFunc(time) {
					var args = lastArgs, thisArg = lastThis;
					lastArgs = lastThis = undefined$1;
					lastInvokeTime = time;
					result$1 = func.apply(thisArg, args);
					return result$1;
				}
				function leadingEdge(time) {
					lastInvokeTime = time;
					timerId = setTimeout(timerExpired, wait);
					return leading ? invokeFunc(time) : result$1;
				}
				function remainingWait(time) {
					var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
					return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
				}
				function shouldInvoke(time) {
					var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
					return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
				}
				function timerExpired() {
					var time = now();
					if (shouldInvoke(time)) return trailingEdge(time);
					timerId = setTimeout(timerExpired, remainingWait(time));
				}
				function trailingEdge(time) {
					timerId = undefined$1;
					if (trailing && lastArgs) return invokeFunc(time);
					lastArgs = lastThis = undefined$1;
					return result$1;
				}
				function cancel() {
					if (timerId !== undefined$1) clearTimeout(timerId);
					lastInvokeTime = 0;
					lastArgs = lastCallTime = lastThis = timerId = undefined$1;
				}
				function flush() {
					return timerId === undefined$1 ? result$1 : trailingEdge(now());
				}
				function debounced() {
					var time = now(), isInvoking = shouldInvoke(time);
					lastArgs = arguments;
					lastThis = this;
					lastCallTime = time;
					if (isInvoking) {
						if (timerId === undefined$1) return leadingEdge(lastCallTime);
						if (maxing) {
							clearTimeout(timerId);
							timerId = setTimeout(timerExpired, wait);
							return invokeFunc(lastCallTime);
						}
					}
					if (timerId === undefined$1) timerId = setTimeout(timerExpired, wait);
					return result$1;
				}
				debounced.cancel = cancel;
				debounced.flush = flush;
				return debounced;
			}
			var defer = baseRest(function(func, args) {
				return baseDelay(func, 1, args);
			});
			var delay = baseRest(function(func, wait, args) {
				return baseDelay(func, toNumber(wait) || 0, args);
			});
			function flip(func) {
				return createWrap(func, WRAP_FLIP_FLAG);
			}
			function memoize(func, resolver) {
				if (typeof func != "function" || resolver != null && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
				var memoized = function() {
					var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
					if (cache.has(key)) return cache.get(key);
					var result$1 = func.apply(this, args);
					memoized.cache = cache.set(key, result$1) || cache;
					return result$1;
				};
				memoized.cache = new (memoize.Cache || MapCache)();
				return memoized;
			}
			memoize.Cache = MapCache;
			function negate(predicate) {
				if (typeof predicate != "function") throw new TypeError(FUNC_ERROR_TEXT);
				return function() {
					var args = arguments;
					switch (args.length) {
						case 0: return !predicate.call(this);
						case 1: return !predicate.call(this, args[0]);
						case 2: return !predicate.call(this, args[0], args[1]);
						case 3: return !predicate.call(this, args[0], args[1], args[2]);
					}
					return !predicate.apply(this, args);
				};
			}
			function once(func) {
				return before(2, func);
			}
			var overArgs = castRest(function(func, transforms) {
				transforms = transforms.length == 1 && isArray$5(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
				var funcsLength = transforms.length;
				return baseRest(function(args) {
					var index = -1, length = nativeMin(args.length, funcsLength);
					while (++index < length) args[index] = transforms[index].call(this, args[index]);
					return apply(func, this, args);
				});
			});
			var partial = baseRest(function(func, partials) {
				return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, replaceHolders(partials, getHolder(partial)));
			});
			var partialRight = baseRest(function(func, partials) {
				return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, replaceHolders(partials, getHolder(partialRight)));
			});
			var rearg = flatRest(function(func, indexes) {
				return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
			});
			function rest(func, start) {
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				start = start === undefined$1 ? start : toInteger(start);
				return baseRest(func, start);
			}
			function spread(func, start) {
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				start = start == null ? 0 : nativeMax(toInteger(start), 0);
				return baseRest(function(args) {
					var array = args[start], otherArgs = castSlice(args, 0, start);
					if (array) arrayPush(otherArgs, array);
					return apply(func, this, otherArgs);
				});
			}
			function throttle(func, wait, options) {
				var leading = true, trailing = true;
				if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
				if (isObject$1(options)) {
					leading = "leading" in options ? !!options.leading : leading;
					trailing = "trailing" in options ? !!options.trailing : trailing;
				}
				return debounce(func, wait, {
					"leading": leading,
					"maxWait": wait,
					"trailing": trailing
				});
			}
			function unary(func) {
				return ary(func, 1);
			}
			function wrap(value, wrapper) {
				return partial(castFunction(wrapper), value);
			}
			function castArray() {
				if (!arguments.length) return [];
				var value = arguments[0];
				return isArray$5(value) ? value : [value];
			}
			function clone(value) {
				return baseClone(value, CLONE_SYMBOLS_FLAG);
			}
			function cloneWith(value, customizer) {
				customizer = typeof customizer == "function" ? customizer : undefined$1;
				return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
			}
			function cloneDeep(value) {
				return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
			}
			function cloneDeepWith(value, customizer) {
				customizer = typeof customizer == "function" ? customizer : undefined$1;
				return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
			}
			function conformsTo(object, source) {
				return source == null || baseConformsTo(object, source, keys$1(source));
			}
			function eq(value, other) {
				return value === other || value !== value && other !== other;
			}
			var gt = createRelationalOperation(baseGt);
			var gte = createRelationalOperation(function(value, other) {
				return value >= other;
			});
			var isArguments = baseIsArguments(function() {
				return arguments;
			}()) ? baseIsArguments : function(value) {
				return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
			};
			var isArray$5 = Array$1.isArray;
			var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
			function isArrayLike(value) {
				return value != null && isLength(value.length) && !isFunction$2(value);
			}
			function isArrayLikeObject(value) {
				return isObjectLike(value) && isArrayLike(value);
			}
			function isBoolean(value) {
				return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
			}
			var isBuffer = nativeIsBuffer || stubFalse;
			var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
			function isElement(value) {
				return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
			}
			function isEmpty$2(value) {
				if (value == null) return true;
				if (isArrayLike(value) && (isArray$5(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
				var tag = getTag(value);
				if (tag == mapTag || tag == setTag) return !value.size;
				if (isPrototype(value)) return !baseKeys(value).length;
				for (var key in value) if (hasOwnProperty.call(value, key)) return false;
				return true;
			}
			function isEqual(value, other) {
				return baseIsEqual(value, other);
			}
			function isEqualWith(value, other, customizer) {
				customizer = typeof customizer == "function" ? customizer : undefined$1;
				var result$1 = customizer ? customizer(value, other) : undefined$1;
				return result$1 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result$1;
			}
			function isError(value) {
				if (!isObjectLike(value)) return false;
				var tag = baseGetTag(value);
				return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
			}
			function isFinite(value) {
				return typeof value == "number" && nativeIsFinite(value);
			}
			function isFunction$2(value) {
				if (!isObject$1(value)) return false;
				var tag = baseGetTag(value);
				return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
			}
			function isInteger(value) {
				return typeof value == "number" && value == toInteger(value);
			}
			function isLength(value) {
				return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
			}
			function isObject$1(value) {
				var type = typeof value;
				return value != null && (type == "object" || type == "function");
			}
			function isObjectLike(value) {
				return value != null && typeof value == "object";
			}
			var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
			function isMatch(object, source) {
				return object === source || baseIsMatch(object, source, getMatchData(source));
			}
			function isMatchWith(object, source, customizer) {
				customizer = typeof customizer == "function" ? customizer : undefined$1;
				return baseIsMatch(object, source, getMatchData(source), customizer);
			}
			function isNaN$1(value) {
				return isNumber(value) && value != +value;
			}
			function isNative(value) {
				if (isMaskable(value)) throw new Error$1(CORE_ERROR_TEXT);
				return baseIsNative(value);
			}
			function isNull(value) {
				return value === null;
			}
			function isNil(value) {
				return value == null;
			}
			function isNumber(value) {
				return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
			}
			function isPlainObject(value) {
				if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
				var proto = getPrototype(value);
				if (proto === null) return true;
				var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
				return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
			}
			var isRegExp$3 = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
			function isSafeInteger(value) {
				return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
			}
			var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
			function isString$1(value) {
				return typeof value == "string" || !isArray$5(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
			}
			function isSymbol(value) {
				return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
			}
			var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
			function isUndefined$1(value) {
				return value === undefined$1;
			}
			function isWeakMap(value) {
				return isObjectLike(value) && getTag(value) == weakMapTag;
			}
			function isWeakSet(value) {
				return isObjectLike(value) && baseGetTag(value) == weakSetTag;
			}
			var lt = createRelationalOperation(baseLt);
			var lte = createRelationalOperation(function(value, other) {
				return value <= other;
			});
			function toArray(value) {
				if (!value) return [];
				if (isArrayLike(value)) return isString$1(value) ? stringToArray(value) : copyArray(value);
				if (symIterator && value[symIterator]) return iteratorToArray(value[symIterator]());
				var tag = getTag(value);
				return (tag == mapTag ? mapToArray : tag == setTag ? setToArray : values$1)(value);
			}
			function toFinite(value) {
				if (!value) return value === 0 ? value : 0;
				value = toNumber(value);
				if (value === INFINITY || value === -INFINITY) return (value < 0 ? -1 : 1) * MAX_INTEGER;
				return value === value ? value : 0;
			}
			function toInteger(value) {
				var result$1 = toFinite(value), remainder = result$1 % 1;
				return result$1 === result$1 ? remainder ? result$1 - remainder : result$1 : 0;
			}
			function toLength(value) {
				return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
			}
			function toNumber(value) {
				if (typeof value == "number") return value;
				if (isSymbol(value)) return NAN;
				if (isObject$1(value)) {
					var other = typeof value.valueOf == "function" ? value.valueOf() : value;
					value = isObject$1(other) ? other + "" : other;
				}
				if (typeof value != "string") return value === 0 ? value : +value;
				value = baseTrim(value);
				var isBinary = reIsBinary.test(value);
				return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
			}
			function toPlainObject(value) {
				return copyObject(value, keysIn(value));
			}
			function toSafeInteger(value) {
				return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
			}
			function toString(value) {
				return value == null ? "" : baseToString(value);
			}
			var assign$2 = createAssigner(function(object, source) {
				if (isPrototype(source) || isArrayLike(source)) {
					copyObject(source, keys$1(source), object);
					return;
				}
				for (var key in source) if (hasOwnProperty.call(source, key)) assignValue(object, key, source[key]);
			});
			var assignIn = createAssigner(function(object, source) {
				copyObject(source, keysIn(source), object);
			});
			var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
				copyObject(source, keysIn(source), object, customizer);
			});
			var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
				copyObject(source, keys$1(source), object, customizer);
			});
			var at = flatRest(baseAt);
			function create(prototype, properties) {
				var result$1 = baseCreate(prototype);
				return properties == null ? result$1 : baseAssign(result$1, properties);
			}
			var defaults$1 = baseRest(function(object, sources) {
				object = Object$1(object);
				var index = -1;
				var length = sources.length;
				var guard = length > 2 ? sources[2] : undefined$1;
				if (guard && isIterateeCall(sources[0], sources[1], guard)) length = 1;
				while (++index < length) {
					var source = sources[index];
					var props = keysIn(source);
					var propsIndex = -1;
					var propsLength = props.length;
					while (++propsIndex < propsLength) {
						var key = props[propsIndex];
						var value = object[key];
						if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) object[key] = source[key];
					}
				}
				return object;
			});
			var defaultsDeep$1 = baseRest(function(args) {
				args.push(undefined$1, customDefaultsMerge);
				return apply(mergeWith, undefined$1, args);
			});
			function findKey(object, predicate) {
				return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
			}
			function findLastKey(object, predicate) {
				return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
			}
			function forIn(object, iteratee$1) {
				return object == null ? object : baseFor(object, getIteratee(iteratee$1, 3), keysIn);
			}
			function forInRight(object, iteratee$1) {
				return object == null ? object : baseForRight(object, getIteratee(iteratee$1, 3), keysIn);
			}
			function forOwn(object, iteratee$1) {
				return object && baseForOwn(object, getIteratee(iteratee$1, 3));
			}
			function forOwnRight(object, iteratee$1) {
				return object && baseForOwnRight(object, getIteratee(iteratee$1, 3));
			}
			function functions(object) {
				return object == null ? [] : baseFunctions(object, keys$1(object));
			}
			function functionsIn(object) {
				return object == null ? [] : baseFunctions(object, keysIn(object));
			}
			function get(object, path, defaultValue) {
				var result$1 = object == null ? undefined$1 : baseGet(object, path);
				return result$1 === undefined$1 ? defaultValue : result$1;
			}
			function has$5(object, path) {
				return object != null && hasPath(object, path, baseHas);
			}
			function hasIn(object, path) {
				return object != null && hasPath(object, path, baseHasIn);
			}
			var invert = createInverter(function(result$1, value, key) {
				if (value != null && typeof value.toString != "function") value = nativeObjectToString.call(value);
				result$1[value] = key;
			}, constant(identity));
			var invertBy = createInverter(function(result$1, value, key) {
				if (value != null && typeof value.toString != "function") value = nativeObjectToString.call(value);
				if (hasOwnProperty.call(result$1, value)) result$1[value].push(key);
				else result$1[value] = [key];
			}, getIteratee);
			var invoke = baseRest(baseInvoke);
			function keys$1(object) {
				return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
			}
			function keysIn(object) {
				return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
			}
			function mapKeys(object, iteratee$1) {
				var result$1 = {};
				iteratee$1 = getIteratee(iteratee$1, 3);
				baseForOwn(object, function(value, key, object$1) {
					baseAssignValue(result$1, iteratee$1(value, key, object$1), value);
				});
				return result$1;
			}
			function mapValues$1(object, iteratee$1) {
				var result$1 = {};
				iteratee$1 = getIteratee(iteratee$1, 3);
				baseForOwn(object, function(value, key, object$1) {
					baseAssignValue(result$1, key, iteratee$1(value, key, object$1));
				});
				return result$1;
			}
			var merge$1 = createAssigner(function(object, source, srcIndex) {
				baseMerge(object, source, srcIndex);
			});
			var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
				baseMerge(object, source, srcIndex, customizer);
			});
			var omit = flatRest(function(object, paths) {
				var result$1 = {};
				if (object == null) return result$1;
				var isDeep = false;
				paths = arrayMap(paths, function(path) {
					path = castPath(path, object);
					isDeep || (isDeep = path.length > 1);
					return path;
				});
				copyObject(object, getAllKeysIn(object), result$1);
				if (isDeep) result$1 = baseClone(result$1, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
				var length = paths.length;
				while (length--) baseUnset(result$1, paths[length]);
				return result$1;
			});
			function omitBy(object, predicate) {
				return pickBy$2(object, negate(getIteratee(predicate)));
			}
			var pick$3 = flatRest(function(object, paths) {
				return object == null ? {} : basePick(object, paths);
			});
			function pickBy$2(object, predicate) {
				if (object == null) return {};
				var props = arrayMap(getAllKeysIn(object), function(prop) {
					return [prop];
				});
				predicate = getIteratee(predicate);
				return basePickBy(object, props, function(value, path) {
					return predicate(value, path[0]);
				});
			}
			function result(object, path, defaultValue) {
				path = castPath(path, object);
				var index = -1, length = path.length;
				if (!length) {
					length = 1;
					object = undefined$1;
				}
				while (++index < length) {
					var value = object == null ? undefined$1 : object[toKey(path[index])];
					if (value === undefined$1) {
						index = length;
						value = defaultValue;
					}
					object = isFunction$2(value) ? value.call(object) : value;
				}
				return object;
			}
			function set(object, path, value) {
				return object == null ? object : baseSet(object, path, value);
			}
			function setWith(object, path, value, customizer) {
				customizer = typeof customizer == "function" ? customizer : undefined$1;
				return object == null ? object : baseSet(object, path, value, customizer);
			}
			var toPairs = createToPairs(keys$1);
			var toPairsIn = createToPairs(keysIn);
			function transform(object, iteratee$1, accumulator) {
				var isArr = isArray$5(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
				iteratee$1 = getIteratee(iteratee$1, 4);
				if (accumulator == null) {
					var Ctor = object && object.constructor;
					if (isArrLike) accumulator = isArr ? new Ctor() : [];
					else if (isObject$1(object)) accumulator = isFunction$2(Ctor) ? baseCreate(getPrototype(object)) : {};
					else accumulator = {};
				}
				(isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object$1) {
					return iteratee$1(accumulator, value, index, object$1);
				});
				return accumulator;
			}
			function unset(object, path) {
				return object == null ? true : baseUnset(object, path);
			}
			function update(object, path, updater) {
				return object == null ? object : baseUpdate(object, path, castFunction(updater));
			}
			function updateWith(object, path, updater, customizer) {
				customizer = typeof customizer == "function" ? customizer : undefined$1;
				return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
			}
			function values$1(object) {
				return object == null ? [] : baseValues(object, keys$1(object));
			}
			function valuesIn(object) {
				return object == null ? [] : baseValues(object, keysIn(object));
			}
			function clamp(number, lower, upper) {
				if (upper === undefined$1) {
					upper = lower;
					lower = undefined$1;
				}
				if (upper !== undefined$1) {
					upper = toNumber(upper);
					upper = upper === upper ? upper : 0;
				}
				if (lower !== undefined$1) {
					lower = toNumber(lower);
					lower = lower === lower ? lower : 0;
				}
				return baseClamp(toNumber(number), lower, upper);
			}
			function inRange(number, start, end) {
				start = toFinite(start);
				if (end === undefined$1) {
					end = start;
					start = 0;
				} else end = toFinite(end);
				number = toNumber(number);
				return baseInRange(number, start, end);
			}
			function random(lower, upper, floating) {
				if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) upper = floating = undefined$1;
				if (floating === undefined$1) {
					if (typeof upper == "boolean") {
						floating = upper;
						upper = undefined$1;
					} else if (typeof lower == "boolean") {
						floating = lower;
						lower = undefined$1;
					}
				}
				if (lower === undefined$1 && upper === undefined$1) {
					lower = 0;
					upper = 1;
				} else {
					lower = toFinite(lower);
					if (upper === undefined$1) {
						upper = lower;
						lower = 0;
					} else upper = toFinite(upper);
				}
				if (lower > upper) {
					var temp = lower;
					lower = upper;
					upper = temp;
				}
				if (floating || lower % 1 || upper % 1) {
					var rand = nativeRandom();
					return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
				}
				return baseRandom(lower, upper);
			}
			var camelCase = createCompounder(function(result$1, word, index) {
				word = word.toLowerCase();
				return result$1 + (index ? capitalize(word) : word);
			});
			function capitalize(string) {
				return upperFirst(toString(string).toLowerCase());
			}
			function deburr(string) {
				string = toString(string);
				return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
			}
			function endsWith(string, target, position) {
				string = toString(string);
				target = baseToString(target);
				var length = string.length;
				position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
				var end = position;
				position -= target.length;
				return position >= 0 && string.slice(position, end) == target;
			}
			function escape(string) {
				string = toString(string);
				return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
			}
			function escapeRegExp(string) {
				string = toString(string);
				return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
			}
			var kebabCase = createCompounder(function(result$1, word, index) {
				return result$1 + (index ? "-" : "") + word.toLowerCase();
			});
			var lowerCase = createCompounder(function(result$1, word, index) {
				return result$1 + (index ? " " : "") + word.toLowerCase();
			});
			var lowerFirst = createCaseFirst("toLowerCase");
			function pad(string, length, chars) {
				string = toString(string);
				length = toInteger(length);
				var strLength = length ? stringSize(string) : 0;
				if (!length || strLength >= length) return string;
				var mid = (length - strLength) / 2;
				return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
			}
			function padEnd(string, length, chars) {
				string = toString(string);
				length = toInteger(length);
				var strLength = length ? stringSize(string) : 0;
				return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
			}
			function padStart(string, length, chars) {
				string = toString(string);
				length = toInteger(length);
				var strLength = length ? stringSize(string) : 0;
				return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
			}
			function parseInt$1(string, radix, guard) {
				if (guard || radix == null) radix = 0;
				else if (radix) radix = +radix;
				return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
			}
			function repeat(string, n, guard) {
				if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) n = 1;
				else n = toInteger(n);
				return baseRepeat(toString(string), n);
			}
			function replace() {
				var args = arguments, string = toString(args[0]);
				return args.length < 3 ? string : string.replace(args[1], args[2]);
			}
			var snakeCase = createCompounder(function(result$1, word, index) {
				return result$1 + (index ? "_" : "") + word.toLowerCase();
			});
			function split(string, separator, limit) {
				if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) separator = limit = undefined$1;
				limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
				if (!limit) return [];
				string = toString(string);
				if (string && (typeof separator == "string" || separator != null && !isRegExp$3(separator))) {
					separator = baseToString(separator);
					if (!separator && hasUnicode(string)) return castSlice(stringToArray(string), 0, limit);
				}
				return string.split(separator, limit);
			}
			var startCase = createCompounder(function(result$1, word, index) {
				return result$1 + (index ? " " : "") + upperFirst(word);
			});
			function startsWith(string, target, position) {
				string = toString(string);
				position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
				target = baseToString(target);
				return string.slice(position, position + target.length) == target;
			}
			function template(string, options, guard) {
				var settings = lodash.templateSettings;
				if (guard && isIterateeCall(string, options, guard)) options = undefined$1;
				string = toString(string);
				options = assignInWith({}, options, settings, customDefaultsAssignIn);
				var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys$1(imports), importsValues = baseValues(imports, importsKeys);
				var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
				var reDelimiters = RegExp$1((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
				var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
				string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
					interpolateValue || (interpolateValue = esTemplateValue);
					source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
					if (escapeValue) {
						isEscaping = true;
						source += "' +\n__e(" + escapeValue + ") +\n'";
					}
					if (evaluateValue) {
						isEvaluating = true;
						source += "';\n" + evaluateValue + ";\n__p += '";
					}
					if (interpolateValue) source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
					index = offset + match.length;
					return match;
				});
				source += "';\n";
				var variable = hasOwnProperty.call(options, "variable") && options.variable;
				if (!variable) source = "with (obj) {\n" + source + "\n}\n";
				else if (reForbiddenIdentifierChars.test(variable)) throw new Error$1(INVALID_TEMPL_VAR_ERROR_TEXT);
				source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
				source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
				var result$1 = attempt(function() {
					return Function$1(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
				});
				result$1.source = source;
				if (isError(result$1)) throw result$1;
				return result$1;
			}
			function toLower(value) {
				return toString(value).toLowerCase();
			}
			function toUpper(value) {
				return toString(value).toUpperCase();
			}
			function trim(string, chars, guard) {
				string = toString(string);
				if (string && (guard || chars === undefined$1)) return baseTrim(string);
				if (!string || !(chars = baseToString(chars))) return string;
				var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars);
				return castSlice(strSymbols, charsStartIndex(strSymbols, chrSymbols), charsEndIndex(strSymbols, chrSymbols) + 1).join("");
			}
			function trimEnd(string, chars, guard) {
				string = toString(string);
				if (string && (guard || chars === undefined$1)) return string.slice(0, trimmedEndIndex(string) + 1);
				if (!string || !(chars = baseToString(chars))) return string;
				var strSymbols = stringToArray(string);
				return castSlice(strSymbols, 0, charsEndIndex(strSymbols, stringToArray(chars)) + 1).join("");
			}
			function trimStart(string, chars, guard) {
				string = toString(string);
				if (string && (guard || chars === undefined$1)) return string.replace(reTrimStart, "");
				if (!string || !(chars = baseToString(chars))) return string;
				var strSymbols = stringToArray(string);
				return castSlice(strSymbols, charsStartIndex(strSymbols, stringToArray(chars))).join("");
			}
			function truncate(string, options) {
				var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
				if (isObject$1(options)) {
					var separator = "separator" in options ? options.separator : separator;
					length = "length" in options ? toInteger(options.length) : length;
					omission = "omission" in options ? baseToString(options.omission) : omission;
				}
				string = toString(string);
				var strLength = string.length;
				if (hasUnicode(string)) {
					var strSymbols = stringToArray(string);
					strLength = strSymbols.length;
				}
				if (length >= strLength) return string;
				var end = length - stringSize(omission);
				if (end < 1) return omission;
				var result$1 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
				if (separator === undefined$1) return result$1 + omission;
				if (strSymbols) end += result$1.length - end;
				if (isRegExp$3(separator)) {
					if (string.slice(end).search(separator)) {
						var match, substring = result$1;
						if (!separator.global) separator = RegExp$1(separator.source, toString(reFlags.exec(separator)) + "g");
						separator.lastIndex = 0;
						while (match = separator.exec(substring)) var newEnd = match.index;
						result$1 = result$1.slice(0, newEnd === undefined$1 ? end : newEnd);
					}
				} else if (string.indexOf(baseToString(separator), end) != end) {
					var index = result$1.lastIndexOf(separator);
					if (index > -1) result$1 = result$1.slice(0, index);
				}
				return result$1 + omission;
			}
			function unescape(string) {
				string = toString(string);
				return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
			}
			var upperCase = createCompounder(function(result$1, word, index) {
				return result$1 + (index ? " " : "") + word.toUpperCase();
			});
			var upperFirst = createCaseFirst("toUpperCase");
			function words(string, pattern, guard) {
				string = toString(string);
				pattern = guard ? undefined$1 : pattern;
				if (pattern === undefined$1) return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
				return string.match(pattern) || [];
			}
			var attempt = baseRest(function(func, args) {
				try {
					return apply(func, undefined$1, args);
				} catch (e) {
					return isError(e) ? e : new Error$1(e);
				}
			});
			var bindAll = flatRest(function(object, methodNames) {
				arrayEach(methodNames, function(key) {
					key = toKey(key);
					baseAssignValue(object, key, bind(object[key], object));
				});
				return object;
			});
			function cond(pairs) {
				var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
				pairs = !length ? [] : arrayMap(pairs, function(pair) {
					if (typeof pair[1] != "function") throw new TypeError(FUNC_ERROR_TEXT);
					return [toIteratee(pair[0]), pair[1]];
				});
				return baseRest(function(args) {
					var index = -1;
					while (++index < length) {
						var pair = pairs[index];
						if (apply(pair[0], this, args)) return apply(pair[1], this, args);
					}
				});
			}
			function conforms(source) {
				return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
			}
			function constant(value) {
				return function() {
					return value;
				};
			}
			function defaultTo(value, defaultValue) {
				return value == null || value !== value ? defaultValue : value;
			}
			var flow = createFlow();
			var flowRight = createFlow(true);
			function identity(value) {
				return value;
			}
			function iteratee(func) {
				return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
			}
			function matches(source) {
				return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
			}
			function matchesProperty(path, srcValue) {
				return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
			}
			var method = baseRest(function(path, args) {
				return function(object) {
					return baseInvoke(object, path, args);
				};
			});
			var methodOf = baseRest(function(object, args) {
				return function(path) {
					return baseInvoke(object, path, args);
				};
			});
			function mixin(object, source, options) {
				var props = keys$1(source), methodNames = baseFunctions(source, props);
				if (options == null && !(isObject$1(source) && (methodNames.length || !props.length))) {
					options = source;
					source = object;
					object = this;
					methodNames = baseFunctions(source, keys$1(source));
				}
				var chain$1 = !(isObject$1(options) && "chain" in options) || !!options.chain, isFunc = isFunction$2(object);
				arrayEach(methodNames, function(methodName) {
					var func = source[methodName];
					object[methodName] = func;
					if (isFunc) object.prototype[methodName] = function() {
						var chainAll = this.__chain__;
						if (chain$1 || chainAll) {
							var result$1 = object(this.__wrapped__);
							(result$1.__actions__ = copyArray(this.__actions__)).push({
								"func": func,
								"args": arguments,
								"thisArg": object
							});
							result$1.__chain__ = chainAll;
							return result$1;
						}
						return func.apply(object, arrayPush([this.value()], arguments));
					};
				});
				return object;
			}
			function noConflict() {
				if (root._ === this) root._ = oldDash;
				return this;
			}
			function noop() {}
			function nthArg(n) {
				n = toInteger(n);
				return baseRest(function(args) {
					return baseNth(args, n);
				});
			}
			var over = createOver(arrayMap);
			var overEvery = createOver(arrayEvery);
			var overSome = createOver(arraySome);
			function property(path) {
				return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
			}
			function propertyOf(object) {
				return function(path) {
					return object == null ? undefined$1 : baseGet(object, path);
				};
			}
			var range = createRange();
			var rangeRight = createRange(true);
			function stubArray() {
				return [];
			}
			function stubFalse() {
				return false;
			}
			function stubObject() {
				return {};
			}
			function stubString() {
				return "";
			}
			function stubTrue() {
				return true;
			}
			function times(n, iteratee$1) {
				n = toInteger(n);
				if (n < 1 || n > MAX_SAFE_INTEGER) return [];
				var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
				iteratee$1 = getIteratee(iteratee$1);
				n -= MAX_ARRAY_LENGTH;
				var result$1 = baseTimes(length, iteratee$1);
				while (++index < n) iteratee$1(index);
				return result$1;
			}
			function toPath(value) {
				if (isArray$5(value)) return arrayMap(value, toKey);
				return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
			}
			function uniqueId(prefix) {
				var id = ++idCounter;
				return toString(prefix) + id;
			}
			var add = createMathOperation(function(augend, addend) {
				return augend + addend;
			}, 0);
			var ceil = createRound("ceil");
			var divide = createMathOperation(function(dividend, divisor) {
				return dividend / divisor;
			}, 1);
			var floor = createRound("floor");
			function max(array) {
				return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
			}
			function maxBy(array, iteratee$1) {
				return array && array.length ? baseExtremum(array, getIteratee(iteratee$1, 2), baseGt) : undefined$1;
			}
			function mean(array) {
				return baseMean(array, identity);
			}
			function meanBy(array, iteratee$1) {
				return baseMean(array, getIteratee(iteratee$1, 2));
			}
			function min(array) {
				return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
			}
			function minBy(array, iteratee$1) {
				return array && array.length ? baseExtremum(array, getIteratee(iteratee$1, 2), baseLt) : undefined$1;
			}
			var multiply = createMathOperation(function(multiplier, multiplicand) {
				return multiplier * multiplicand;
			}, 1);
			var round = createRound("round");
			var subtract = createMathOperation(function(minuend, subtrahend) {
				return minuend - subtrahend;
			}, 0);
			function sum(array) {
				return array && array.length ? baseSum(array, identity) : 0;
			}
			function sumBy(array, iteratee$1) {
				return array && array.length ? baseSum(array, getIteratee(iteratee$1, 2)) : 0;
			}
			lodash.after = after;
			lodash.ary = ary;
			lodash.assign = assign$2;
			lodash.assignIn = assignIn;
			lodash.assignInWith = assignInWith;
			lodash.assignWith = assignWith;
			lodash.at = at;
			lodash.before = before;
			lodash.bind = bind;
			lodash.bindAll = bindAll;
			lodash.bindKey = bindKey;
			lodash.castArray = castArray;
			lodash.chain = chain;
			lodash.chunk = chunk;
			lodash.compact = compact$1;
			lodash.concat = concat;
			lodash.cond = cond;
			lodash.conforms = conforms;
			lodash.constant = constant;
			lodash.countBy = countBy;
			lodash.create = create;
			lodash.curry = curry;
			lodash.curryRight = curryRight;
			lodash.debounce = debounce;
			lodash.defaults = defaults$1;
			lodash.defaultsDeep = defaultsDeep$1;
			lodash.defer = defer;
			lodash.delay = delay;
			lodash.difference = difference$5;
			lodash.differenceBy = differenceBy;
			lodash.differenceWith = differenceWith;
			lodash.drop = drop$2;
			lodash.dropRight = dropRight$1;
			lodash.dropRightWhile = dropRightWhile;
			lodash.dropWhile = dropWhile;
			lodash.fill = fill;
			lodash.filter = filter$6;
			lodash.flatMap = flatMap$1;
			lodash.flatMapDeep = flatMapDeep;
			lodash.flatMapDepth = flatMapDepth;
			lodash.flatten = flatten$1;
			lodash.flattenDeep = flattenDeep;
			lodash.flattenDepth = flattenDepth;
			lodash.flip = flip;
			lodash.flow = flow;
			lodash.flowRight = flowRight;
			lodash.fromPairs = fromPairs;
			lodash.functions = functions;
			lodash.functionsIn = functionsIn;
			lodash.groupBy = groupBy$3;
			lodash.initial = initial;
			lodash.intersection = intersection;
			lodash.intersectionBy = intersectionBy;
			lodash.intersectionWith = intersectionWith;
			lodash.invert = invert;
			lodash.invertBy = invertBy;
			lodash.invokeMap = invokeMap;
			lodash.iteratee = iteratee;
			lodash.keyBy = keyBy;
			lodash.keys = keys$1;
			lodash.keysIn = keysIn;
			lodash.map = map$11;
			lodash.mapKeys = mapKeys;
			lodash.mapValues = mapValues$1;
			lodash.matches = matches;
			lodash.matchesProperty = matchesProperty;
			lodash.memoize = memoize;
			lodash.merge = merge$1;
			lodash.mergeWith = mergeWith;
			lodash.method = method;
			lodash.methodOf = methodOf;
			lodash.mixin = mixin;
			lodash.negate = negate;
			lodash.nthArg = nthArg;
			lodash.omit = omit;
			lodash.omitBy = omitBy;
			lodash.once = once;
			lodash.orderBy = orderBy;
			lodash.over = over;
			lodash.overArgs = overArgs;
			lodash.overEvery = overEvery;
			lodash.overSome = overSome;
			lodash.partial = partial;
			lodash.partialRight = partialRight;
			lodash.partition = partition;
			lodash.pick = pick$3;
			lodash.pickBy = pickBy$2;
			lodash.property = property;
			lodash.propertyOf = propertyOf;
			lodash.pull = pull;
			lodash.pullAll = pullAll;
			lodash.pullAllBy = pullAllBy;
			lodash.pullAllWith = pullAllWith;
			lodash.pullAt = pullAt;
			lodash.range = range;
			lodash.rangeRight = rangeRight;
			lodash.rearg = rearg;
			lodash.reject = reject$1;
			lodash.remove = remove;
			lodash.rest = rest;
			lodash.reverse = reverse;
			lodash.sampleSize = sampleSize;
			lodash.set = set;
			lodash.setWith = setWith;
			lodash.shuffle = shuffle;
			lodash.slice = slice;
			lodash.sortBy = sortBy$1;
			lodash.sortedUniq = sortedUniq;
			lodash.sortedUniqBy = sortedUniqBy;
			lodash.split = split;
			lodash.spread = spread;
			lodash.tail = tail;
			lodash.take = take;
			lodash.takeRight = takeRight;
			lodash.takeRightWhile = takeRightWhile;
			lodash.takeWhile = takeWhile;
			lodash.tap = tap;
			lodash.throttle = throttle;
			lodash.thru = thru;
			lodash.toArray = toArray;
			lodash.toPairs = toPairs;
			lodash.toPairsIn = toPairsIn;
			lodash.toPath = toPath;
			lodash.toPlainObject = toPlainObject;
			lodash.transform = transform;
			lodash.unary = unary;
			lodash.union = union;
			lodash.unionBy = unionBy;
			lodash.unionWith = unionWith;
			lodash.uniq = uniq$1;
			lodash.uniqBy = uniqBy;
			lodash.uniqWith = uniqWith;
			lodash.unset = unset;
			lodash.unzip = unzip;
			lodash.unzipWith = unzipWith;
			lodash.update = update;
			lodash.updateWith = updateWith;
			lodash.values = values$1;
			lodash.valuesIn = valuesIn;
			lodash.without = without;
			lodash.words = words;
			lodash.wrap = wrap;
			lodash.xor = xor;
			lodash.xorBy = xorBy;
			lodash.xorWith = xorWith;
			lodash.zip = zip;
			lodash.zipObject = zipObject;
			lodash.zipObjectDeep = zipObjectDeep;
			lodash.zipWith = zipWith;
			lodash.entries = toPairs;
			lodash.entriesIn = toPairsIn;
			lodash.extend = assignIn;
			lodash.extendWith = assignInWith;
			mixin(lodash, lodash);
			lodash.add = add;
			lodash.attempt = attempt;
			lodash.camelCase = camelCase;
			lodash.capitalize = capitalize;
			lodash.ceil = ceil;
			lodash.clamp = clamp;
			lodash.clone = clone;
			lodash.cloneDeep = cloneDeep;
			lodash.cloneDeepWith = cloneDeepWith;
			lodash.cloneWith = cloneWith;
			lodash.conformsTo = conformsTo;
			lodash.deburr = deburr;
			lodash.defaultTo = defaultTo;
			lodash.divide = divide;
			lodash.endsWith = endsWith;
			lodash.eq = eq;
			lodash.escape = escape;
			lodash.escapeRegExp = escapeRegExp;
			lodash.every = every$1;
			lodash.find = find$1;
			lodash.findIndex = findIndex$1;
			lodash.findKey = findKey;
			lodash.findLast = findLast;
			lodash.findLastIndex = findLastIndex;
			lodash.findLastKey = findLastKey;
			lodash.floor = floor;
			lodash.forEach = forEach$8;
			lodash.forEachRight = forEachRight;
			lodash.forIn = forIn;
			lodash.forInRight = forInRight;
			lodash.forOwn = forOwn;
			lodash.forOwnRight = forOwnRight;
			lodash.get = get;
			lodash.gt = gt;
			lodash.gte = gte;
			lodash.has = has$5;
			lodash.hasIn = hasIn;
			lodash.head = head;
			lodash.identity = identity;
			lodash.includes = includes$4;
			lodash.indexOf = indexOf$1;
			lodash.inRange = inRange;
			lodash.invoke = invoke;
			lodash.isArguments = isArguments;
			lodash.isArray = isArray$5;
			lodash.isArrayBuffer = isArrayBuffer;
			lodash.isArrayLike = isArrayLike;
			lodash.isArrayLikeObject = isArrayLikeObject;
			lodash.isBoolean = isBoolean;
			lodash.isBuffer = isBuffer;
			lodash.isDate = isDate;
			lodash.isElement = isElement;
			lodash.isEmpty = isEmpty$2;
			lodash.isEqual = isEqual;
			lodash.isEqualWith = isEqualWith;
			lodash.isError = isError;
			lodash.isFinite = isFinite;
			lodash.isFunction = isFunction$2;
			lodash.isInteger = isInteger;
			lodash.isLength = isLength;
			lodash.isMap = isMap;
			lodash.isMatch = isMatch;
			lodash.isMatchWith = isMatchWith;
			lodash.isNaN = isNaN$1;
			lodash.isNative = isNative;
			lodash.isNil = isNil;
			lodash.isNull = isNull;
			lodash.isNumber = isNumber;
			lodash.isObject = isObject$1;
			lodash.isObjectLike = isObjectLike;
			lodash.isPlainObject = isPlainObject;
			lodash.isRegExp = isRegExp$3;
			lodash.isSafeInteger = isSafeInteger;
			lodash.isSet = isSet;
			lodash.isString = isString$1;
			lodash.isSymbol = isSymbol;
			lodash.isTypedArray = isTypedArray;
			lodash.isUndefined = isUndefined$1;
			lodash.isWeakMap = isWeakMap;
			lodash.isWeakSet = isWeakSet;
			lodash.join = join;
			lodash.kebabCase = kebabCase;
			lodash.last = last$2;
			lodash.lastIndexOf = lastIndexOf;
			lodash.lowerCase = lowerCase;
			lodash.lowerFirst = lowerFirst;
			lodash.lt = lt;
			lodash.lte = lte;
			lodash.max = max;
			lodash.maxBy = maxBy;
			lodash.mean = mean;
			lodash.meanBy = meanBy;
			lodash.min = min;
			lodash.minBy = minBy;
			lodash.stubArray = stubArray;
			lodash.stubFalse = stubFalse;
			lodash.stubObject = stubObject;
			lodash.stubString = stubString;
			lodash.stubTrue = stubTrue;
			lodash.multiply = multiply;
			lodash.nth = nth;
			lodash.noConflict = noConflict;
			lodash.noop = noop;
			lodash.now = now;
			lodash.pad = pad;
			lodash.padEnd = padEnd;
			lodash.padStart = padStart;
			lodash.parseInt = parseInt$1;
			lodash.random = random;
			lodash.reduce = reduce$4;
			lodash.reduceRight = reduceRight;
			lodash.repeat = repeat;
			lodash.replace = replace;
			lodash.result = result;
			lodash.round = round;
			lodash.runInContext = runInContext;
			lodash.sample = sample;
			lodash.size = size;
			lodash.snakeCase = snakeCase;
			lodash.some = some$1;
			lodash.sortedIndex = sortedIndex;
			lodash.sortedIndexBy = sortedIndexBy;
			lodash.sortedIndexOf = sortedIndexOf;
			lodash.sortedLastIndex = sortedLastIndex;
			lodash.sortedLastIndexBy = sortedLastIndexBy;
			lodash.sortedLastIndexOf = sortedLastIndexOf;
			lodash.startCase = startCase;
			lodash.startsWith = startsWith;
			lodash.subtract = subtract;
			lodash.sum = sum;
			lodash.sumBy = sumBy;
			lodash.template = template;
			lodash.times = times;
			lodash.toFinite = toFinite;
			lodash.toInteger = toInteger;
			lodash.toLength = toLength;
			lodash.toLower = toLower;
			lodash.toNumber = toNumber;
			lodash.toSafeInteger = toSafeInteger;
			lodash.toString = toString;
			lodash.toUpper = toUpper;
			lodash.trim = trim;
			lodash.trimEnd = trimEnd;
			lodash.trimStart = trimStart;
			lodash.truncate = truncate;
			lodash.unescape = unescape;
			lodash.uniqueId = uniqueId;
			lodash.upperCase = upperCase;
			lodash.upperFirst = upperFirst;
			lodash.each = forEach$8;
			lodash.eachRight = forEachRight;
			lodash.first = head;
			mixin(lodash, function() {
				var source = {};
				baseForOwn(lodash, function(func, methodName) {
					if (!hasOwnProperty.call(lodash.prototype, methodName)) source[methodName] = func;
				});
				return source;
			}(), { "chain": false });
			lodash.VERSION = VERSION$2;
			arrayEach([
				"bind",
				"bindKey",
				"curry",
				"curryRight",
				"partial",
				"partialRight"
			], function(methodName) {
				lodash[methodName].placeholder = lodash;
			});
			arrayEach(["drop", "take"], function(methodName, index) {
				LazyWrapper.prototype[methodName] = function(n) {
					n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
					var result$1 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
					if (result$1.__filtered__) result$1.__takeCount__ = nativeMin(n, result$1.__takeCount__);
					else result$1.__views__.push({
						"size": nativeMin(n, MAX_ARRAY_LENGTH),
						"type": methodName + (result$1.__dir__ < 0 ? "Right" : "")
					});
					return result$1;
				};
				LazyWrapper.prototype[methodName + "Right"] = function(n) {
					return this.reverse()[methodName](n).reverse();
				};
			});
			arrayEach([
				"filter",
				"map",
				"takeWhile"
			], function(methodName, index) {
				var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
				LazyWrapper.prototype[methodName] = function(iteratee$1) {
					var result$1 = this.clone();
					result$1.__iteratees__.push({
						"iteratee": getIteratee(iteratee$1, 3),
						"type": type
					});
					result$1.__filtered__ = result$1.__filtered__ || isFilter;
					return result$1;
				};
			});
			arrayEach(["head", "last"], function(methodName, index) {
				var takeName = "take" + (index ? "Right" : "");
				LazyWrapper.prototype[methodName] = function() {
					return this[takeName](1).value()[0];
				};
			});
			arrayEach(["initial", "tail"], function(methodName, index) {
				var dropName = "drop" + (index ? "" : "Right");
				LazyWrapper.prototype[methodName] = function() {
					return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
				};
			});
			LazyWrapper.prototype.compact = function() {
				return this.filter(identity);
			};
			LazyWrapper.prototype.find = function(predicate) {
				return this.filter(predicate).head();
			};
			LazyWrapper.prototype.findLast = function(predicate) {
				return this.reverse().find(predicate);
			};
			LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
				if (typeof path == "function") return new LazyWrapper(this);
				return this.map(function(value) {
					return baseInvoke(value, path, args);
				});
			});
			LazyWrapper.prototype.reject = function(predicate) {
				return this.filter(negate(getIteratee(predicate)));
			};
			LazyWrapper.prototype.slice = function(start, end) {
				start = toInteger(start);
				var result$1 = this;
				if (result$1.__filtered__ && (start > 0 || end < 0)) return new LazyWrapper(result$1);
				if (start < 0) result$1 = result$1.takeRight(-start);
				else if (start) result$1 = result$1.drop(start);
				if (end !== undefined$1) {
					end = toInteger(end);
					result$1 = end < 0 ? result$1.dropRight(-end) : result$1.take(end - start);
				}
				return result$1;
			};
			LazyWrapper.prototype.takeRightWhile = function(predicate) {
				return this.reverse().takeWhile(predicate).reverse();
			};
			LazyWrapper.prototype.toArray = function() {
				return this.take(MAX_ARRAY_LENGTH);
			};
			baseForOwn(LazyWrapper.prototype, function(func, methodName) {
				var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
				if (!lodashFunc) return;
				lodash.prototype[methodName] = function() {
					var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee$1 = args[0], useLazy = isLazy || isArray$5(value);
					var interceptor = function(value$1) {
						var result$2 = lodashFunc.apply(lodash, arrayPush([value$1], args));
						return isTaker && chainAll ? result$2[0] : result$2;
					};
					if (useLazy && checkIteratee && typeof iteratee$1 == "function" && iteratee$1.length != 1) isLazy = useLazy = false;
					var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
					if (!retUnwrapped && useLazy) {
						value = onlyLazy ? value : new LazyWrapper(this);
						var result$1 = func.apply(value, args);
						result$1.__actions__.push({
							"func": thru,
							"args": [interceptor],
							"thisArg": undefined$1
						});
						return new LodashWrapper(result$1, chainAll);
					}
					if (isUnwrapped && onlyLazy) return func.apply(this, args);
					result$1 = this.thru(interceptor);
					return isUnwrapped ? isTaker ? result$1.value()[0] : result$1.value() : result$1;
				};
			});
			arrayEach([
				"pop",
				"push",
				"shift",
				"sort",
				"splice",
				"unshift"
			], function(methodName) {
				var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
				lodash.prototype[methodName] = function() {
					var args = arguments;
					if (retUnwrapped && !this.__chain__) {
						var value = this.value();
						return func.apply(isArray$5(value) ? value : [], args);
					}
					return this[chainName](function(value$1) {
						return func.apply(isArray$5(value$1) ? value$1 : [], args);
					});
				};
			});
			baseForOwn(LazyWrapper.prototype, function(func, methodName) {
				var lodashFunc = lodash[methodName];
				if (lodashFunc) {
					var key = lodashFunc.name + "";
					if (!hasOwnProperty.call(realNames, key)) realNames[key] = [];
					realNames[key].push({
						"name": methodName,
						"func": lodashFunc
					});
				}
			});
			realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
				"name": "wrapper",
				"func": undefined$1
			}];
			LazyWrapper.prototype.clone = lazyClone;
			LazyWrapper.prototype.reverse = lazyReverse;
			LazyWrapper.prototype.value = lazyValue;
			lodash.prototype.at = wrapperAt;
			lodash.prototype.chain = wrapperChain;
			lodash.prototype.commit = wrapperCommit;
			lodash.prototype.next = wrapperNext;
			lodash.prototype.plant = wrapperPlant;
			lodash.prototype.reverse = wrapperReverse;
			lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
			lodash.prototype.first = lodash.prototype.head;
			if (symIterator) lodash.prototype[symIterator] = wrapperToIterator;
			return lodash;
		})();
		if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
			root._ = _;
			define(function() {
				return _;
			});
		} else if (freeModule) {
			(freeModule.exports = _)._ = _;
			freeExports._ = _;
		} else root._ = _;
	}).call(exports);
}));
var require_find_next_textual_token = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { findIndex } = require_lodash();
	function findNextTextualToken$2(tokenVector, prevTokenEndOffset) {
		let nextTokenIdx = findIndex(tokenVector, (tok) => tok.endOffset === prevTokenEndOffset);
		let found = false;
		while (found === false) {
			nextTokenIdx++;
			const nextPossibleToken = tokenVector[nextTokenIdx];
			if (nextPossibleToken === void 0) return null;
			/* istanbul ignore next
			* I don't think this scenario can be created, however defensive coding never killed anyone...
			* Basically SEA_WS can only only appear in "OUTSIDE" mode, and we need a CLOSE/SLASH_CLOSE to get back to outside
			* mode, however if we had those  this function would never have been called...
			*/
			if (nextPossibleToken.tokenType.name === "SEA_WS") {} else return nextPossibleToken;
		}
	}
	module.exports = { findNextTextualToken: findNextTextualToken$2 };
}));
var require_xml_ns_key = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const namespaceRegex = /^xmlns(?<prefixWithColon>:(?<prefix>[^:]*))?$/;
	function isXMLNamespaceKey$3({ key, includeEmptyPrefix }) {
		if (typeof key !== "string") return false;
		const matchArr = key.match(namespaceRegex);
		if (matchArr === null) return false;
		return !!(includeEmptyPrefix === true || !matchArr.groups.prefixWithColon || matchArr.groups.prefix);
	}
	function getXMLNamespaceKeyPrefix$2(key) {
		if (typeof key !== "string") return;
		const matchArr = key.match(namespaceRegex);
		if (matchArr === null) return;
		return matchArr.groups && matchArr.groups.prefix || "";
	}
	module.exports = {
		isXMLNamespaceKey: isXMLNamespaceKey$3,
		getXMLNamespaceKeyPrefix: getXMLNamespaceKeyPrefix$2
	};
}));
var require_api$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { findNextTextualToken: findNextTextualToken$1 } = require_find_next_textual_token();
	const { isXMLNamespaceKey: isXMLNamespaceKey$2, getXMLNamespaceKeyPrefix: getXMLNamespaceKeyPrefix$1 } = require_xml_ns_key();
	module.exports = {
		findNextTextualToken: findNextTextualToken$1,
		isXMLNamespaceKey: isXMLNamespaceKey$2,
		getXMLNamespaceKeyPrefix: getXMLNamespaceKeyPrefix$1
	};
}));
var require_utils$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { reduce: reduce$2, has: has$3, isArray: isArray$3 } = require_lodash();
	function getAstChildrenReflective$2(astParent) {
		return reduce$2(astParent, (result, prop, name) => {
			if (name === "parent") {} else if (has$3(prop, "type")) result.push(prop);
			else if (isArray$3(prop) && prop.length > 0 && has$3(prop[0], "type")) result = result.concat(prop);
			return result;
		}, []);
	}
	module.exports = { getAstChildrenReflective: getAstChildrenReflective$2 };
}));
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = { DEFAULT_NS: "::DEFAULT" };
}));
var require_build_ast = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { BaseXmlCstVisitor } = require_api$5();
	const { last, forEach: forEach$6, reduce: reduce$1, map: map$9, pick: pick$1, sortBy, isEmpty, isArray: isArray$2, assign } = require_lodash();
	const { findNextTextualToken, isXMLNamespaceKey: isXMLNamespaceKey$1, getXMLNamespaceKeyPrefix } = require_api$4();
	const { getAstChildrenReflective: getAstChildrenReflective$1 } = require_utils$1();
	const { DEFAULT_NS: DEFAULT_NS$2 } = require_constants();
	function buildAst$2(docCst, tokenVector) {
		AstBuilder.setState({ tokenVector });
		const xmlDocAst = AstBuilder.visit(docCst);
		if (xmlDocAst.rootElement !== invalidSyntax) updateNamespaces(xmlDocAst.rootElement);
		return xmlDocAst;
	}
	var CstToAstVisitor = class extends BaseXmlCstVisitor {
		constructor() {
			super();
		}
		setState({ tokenVector }) {
			this.tokenVector = tokenVector;
		}
		visit(cstNode, params = {}) {
			return super.visit(cstNode, {
				location: cstNode.location,
				...params
			});
		}
		document(ctx, { location }) {
			const astNode = {
				type: "XMLDocument",
				rootElement: invalidSyntax,
				position: location
			};
			if (ctx.prolog !== void 0) astNode.prolog = this.visit(ctx.prolog[0]);
			if (ctx.element !== void 0 && isEmpty(ctx.element[0].children) === false) astNode.rootElement = this.visit(ctx.element[0]);
			setChildrenParent(astNode);
			return astNode;
		}
		prolog(ctx, { location }) {
			const astNode = {
				type: "XMLProlog",
				attributes: [],
				position: location
			};
			if (ctx.attribute !== void 0) astNode.attributes = map$9(ctx.attribute, (_) => this.visit(_, { isPrologParent: true }));
			setChildrenParent(astNode);
			return astNode;
		}
		/* istanbul ignore next - place holder*/
		docTypeDecl(ctx, astNode) {}
		/* istanbul ignore next - place holder*/
		externalID(ctx, astNode) {}
		content(ctx, { location }) {
			let elements = [];
			let textContents = [];
			if (ctx.element !== void 0) elements = map$9(ctx.element, this.visit.bind(this));
			if (ctx.chardata !== void 0) textContents = map$9(ctx.chardata, this.visit.bind(this));
			return {
				elements,
				textContents
			};
		}
		element(ctx, { location }) {
			const astNode = {
				type: "XMLElement",
				namespaces: Object.create(null),
				name: invalidSyntax,
				attributes: [],
				subElements: [],
				textContents: [],
				position: location,
				syntax: {}
			};
			if (ctx.attribute !== void 0) astNode.attributes = map$9(ctx.attribute, this.visit.bind(this));
			if (ctx.content !== void 0) {
				const { elements, textContents } = this.visit(ctx.content[0]);
				astNode.subElements = elements;
				astNode.textContents = textContents;
			}
			handleElementOpenCloseNameRanges(astNode, ctx);
			handleElementOpenCloseBodyRanges(astNode, ctx);
			handleElementAttributeRanges(astNode, ctx, this.tokenVector);
			setChildrenParent(astNode);
			return astNode;
		}
		/* istanbul ignore next - place holder*/
		reference(ctx, { location }) {}
		attribute(ctx, { location, isPrologParent }) {
			const astNode = {
				type: isPrologParent ? "XMLPrologAttribute" : "XMLAttribute",
				position: location,
				key: invalidSyntax,
				value: invalidSyntax,
				syntax: {}
			};
			/* istanbul ignore else - Defensive Coding, not actually possible else branch */
			if (ctx.Name !== void 0 && ctx.Name[0].isInsertedInRecovery !== true) {
				const keyToken = ctx.Name[0];
				astNode.key = keyToken.image;
				astNode.syntax.key = toXMLToken(keyToken);
			}
			if (ctx.STRING !== void 0 && ctx.STRING[0].isInsertedInRecovery !== true) {
				const valueToken = ctx.STRING[0];
				astNode.value = stripQuotes(valueToken.image);
				astNode.syntax.value = toXMLToken(valueToken);
			}
			setChildrenParent(astNode);
			return astNode;
		}
		chardata(ctx, { location }) {
			const astNode = {
				type: "XMLTextContent",
				position: location,
				text: invalidSyntax
			};
			let allTokens = [];
			if (ctx.SEA_WS !== void 0) allTokens = allTokens.concat(ctx.SEA_WS);
			if (ctx.TEXT !== void 0) allTokens = allTokens.concat(ctx.TEXT);
			astNode.text = map$9(sortBy(allTokens, ["startOffset"]), "image").join("");
			return astNode;
		}
		/* istanbul ignore next - place holder*/
		misc(ctx, { location }) {}
	};
	const AstBuilder = new CstToAstVisitor();
	function setChildrenParent(astParent) {
		forEach$6(getAstChildrenReflective$1(astParent), (child) => child.parent = astParent);
	}
	function updateNamespaces(element, prevNamespaces = []) {
		const currElemNamespaces = reduce$1(element.attributes, (result, attrib) => {
			/* istanbul ignore else - Defensive Coding, not actually possible branch */
			if (attrib.key !== invalidSyntax) {
				if (isXMLNamespaceKey$1({
					key: attrib.key,
					includeEmptyPrefix: false
				}) === true) {
					const prefix = getXMLNamespaceKeyPrefix(attrib.key);
					if (attrib.value) {
						const uri = attrib.value;
						if (prefix !== "") result[prefix] = uri;
						else result[DEFAULT_NS$2] = uri;
					}
				}
			}
			return result;
		}, {});
		element.namespaces = assign(Object.create(null), prevNamespaces, currElemNamespaces);
		forEach$6(element.subElements, (subElem) => updateNamespaces(subElem, element.namespaces));
	}
	function toXMLToken(token) {
		return pick$1(token, [
			"image",
			"startOffset",
			"endOffset",
			"startLine",
			"endLine",
			"startColumn",
			"endColumn"
		]);
	}
	function startOfXMLToken(token) {
		return pick$1(token, [
			"startOffset",
			"startLine",
			"startColumn"
		]);
	}
	function endOfXMLToken(token) {
		return pick$1(token, [
			"endOffset",
			"endLine",
			"endColumn"
		]);
	}
	function exists(tokArr) {
		return isArray$2(tokArr) && tokArr.length === 1 && tokArr[0].isInsertedInRecovery !== true;
	}
	function stripQuotes(quotedText) {
		return quotedText.substring(1, quotedText.length - 1);
	}
	function nsToParts(text) {
		const matchResult = /^([^:]+):([^:]+)$/.exec(text);
		if (matchResult === null) return null;
		return {
			ns: matchResult[1],
			name: matchResult[2]
		};
	}
	const invalidSyntax = null;
	function handleElementOpenCloseNameRanges(astNode, ctx) {
		if (ctx.Name !== void 0 && ctx.Name[0].isInsertedInRecovery !== true) {
			const openNameToken = ctx.Name[0];
			astNode.syntax.openName = toXMLToken(openNameToken);
			const nsParts = nsToParts(openNameToken.image);
			if (nsParts !== null) {
				astNode.ns = nsParts.ns;
				astNode.name = nsParts.name;
			} else astNode.name = openNameToken.image;
		}
		if (ctx.END_NAME !== void 0 && ctx.END_NAME[0].isInsertedInRecovery !== true) astNode.syntax.closeName = toXMLToken(ctx.END_NAME[0]);
	}
	function handleElementOpenCloseBodyRanges(astNode, ctx) {
		/* istanbul ignore else - Defensive Coding */
		if (exists(ctx.OPEN)) {
			let openBodyCloseTok = void 0;
			/* istanbul ignore else - Defensive Coding */
			if (exists(ctx.START_CLOSE)) {
				openBodyCloseTok = ctx.START_CLOSE[0];
				astNode.syntax.isSelfClosing = false;
			} else if (exists(ctx.SLASH_CLOSE)) {
				openBodyCloseTok = ctx.SLASH_CLOSE[0];
				astNode.syntax.isSelfClosing = true;
			}
			if (openBodyCloseTok !== void 0) astNode.syntax.openBody = {
				...startOfXMLToken(ctx.OPEN[0]),
				...endOfXMLToken(openBodyCloseTok)
			};
			if (exists(ctx.SLASH_OPEN) && exists(ctx.END)) astNode.syntax.closeBody = {
				...startOfXMLToken(ctx.SLASH_OPEN[0]),
				...endOfXMLToken(ctx.END[0])
			};
		}
	}
	function handleElementAttributeRanges(astNode, ctx, tokenVector) {
		if (exists(ctx.Name)) {
			const startOffset = ctx.Name[0].endOffset + 2;
			if (exists(ctx.START_CLOSE) || exists(ctx.SLASH_CLOSE)) {
				const endOffset = (exists(ctx.START_CLOSE) ? ctx.START_CLOSE[0].startOffset : ctx.SLASH_CLOSE[0].startOffset) - 1;
				astNode.syntax.attributesRange = {
					startOffset,
					endOffset
				};
			} else {
				const nextTextualToken = findNextTextualToken(tokenVector, isArray$2(ctx.attribute) ? last(ctx.attribute).location.endOffset : ctx.Name[0].endOffset);
				if (nextTextualToken !== null) astNode.syntax.guessedAttributesRange = {
					startOffset,
					endOffset: nextTextualToken.endOffset - 1
				};
			}
		}
	}
	module.exports = { buildAst: buildAst$2 };
}));
var require_visit_ast = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { forEach: forEach$5, isFunction } = require_lodash();
	const { getAstChildrenReflective } = require_utils$1();
	function accept$2(node, visitor) {
		switch (node.type) {
			case "XMLDocument":
				if (isFunction(visitor.visitXMLDocument)) visitor.visitXMLDocument(node);
				break;
			case "XMLProlog":
				if (isFunction(visitor.visitXMLProlog)) visitor.visitXMLProlog(node);
				break;
			case "XMLPrologAttribute":
				if (isFunction(visitor.visitXMLPrologAttribute)) visitor.visitXMLPrologAttribute(node);
				break;
			case "XMLElement":
				if (isFunction(visitor.visitXMLElement)) visitor.visitXMLElement(node);
				break;
			case "XMLAttribute":
				if (isFunction(visitor.visitXMLAttribute)) visitor.visitXMLAttribute(node);
				break;
			case "XMLTextContent":
				if (isFunction(visitor.visitXMLTextContent)) visitor.visitXMLTextContent(node);
				break;
			default: throw Error("None Exhaustive Match");
		}
		forEach$5(getAstChildrenReflective(node), (childNode) => {
			accept$2(childNode, visitor);
		});
	}
	module.exports = { accept: accept$2 };
}));
var require_api$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { buildAst: buildAst$1 } = require_build_ast();
	const { accept: accept$1 } = require_visit_ast();
	const { DEFAULT_NS: DEFAULT_NS$1 } = require_constants();
	module.exports = {
		buildAst: buildAst$1,
		accept: accept$1,
		DEFAULT_NS: DEFAULT_NS$1
	};
}));
var require_validate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { accept } = require_api$3();
	const { defaultsDeep, flatMap } = require_lodash();
	function validate$3(options) {
		const actualOptions = defaultsDeep(options, { validators: {
			attribute: [],
			element: []
		} });
		let issues = [];
		accept(actualOptions.doc, {
			visitXMLElement: function(node) {
				const newIssues = flatMap(actualOptions.validators.element, (validator) => validator(node));
				issues = issues.concat(newIssues);
			},
			visitXMLAttribute: function(node) {
				const newIssues = flatMap(actualOptions.validators.attribute, (validator) => validator(node));
				issues = issues.concat(newIssues);
			}
		});
		return issues;
	}
	module.exports = { validate: validate$3 };
}));
var require_api$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { validate: validate$2 } = require_validate();
	module.exports = { validate: validate$2 };
}));
var require_unique_attribute_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { groupBy: groupBy$1, pickBy: pickBy$1, reduce, map: map$8, filter: filter$4 } = require_lodash();
	function validateUniqueAttributeKeys$1(elem) {
		return map$8(reduce(pickBy$1(groupBy$1(filter$4(elem.attributes, (_) => _.key !== null), "key"), (_) => _.length > 1), (result, attribsGroup) => result.concat(attribsGroup), []), (_) => {
			const keyToken = _.syntax.key;
			return {
				msg: `duplicate attribute: "${_.key}"`,
				node: _,
				severity: "error",
				position: {
					startOffset: keyToken.startOffset,
					endOffset: keyToken.endOffset
				}
			};
		});
	}
	module.exports = { validateUniqueAttributeKeys: validateUniqueAttributeKeys$1 };
}));
var require_tag_closing_name_match = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function validateTagClosingNameMatch$1(elem) {
		const openTagToken = elem.syntax.openName;
		const closeTagToken = elem.syntax.closeName;
		if (!openTagToken || !closeTagToken) return [];
		if (openTagToken.image === closeTagToken.image) return [];
		else return [{
			msg: `tags mismatch: "${openTagToken.image}" must match closing tag: "${closeTagToken.image}"`,
			node: elem,
			severity: "error",
			position: {
				startOffset: openTagToken.startOffset,
				endOffset: openTagToken.endOffset
			}
		}, {
			msg: `tags mismatch: "${closeTagToken.image}" must match opening tag: "${openTagToken.image}"`,
			node: elem,
			severity: "error",
			position: {
				startOffset: closeTagToken.startOffset,
				endOffset: closeTagToken.endOffset
			}
		}];
	}
	module.exports = { validateTagClosingNameMatch: validateTagClosingNameMatch$1 };
}));
var require_api$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { validate: validate$1 } = require_api$2();
	const { validateUniqueAttributeKeys } = require_unique_attribute_keys();
	const { validateTagClosingNameMatch } = require_tag_closing_name_match();
	function checkConstraints$1(ast) {
		return validate$1({
			doc: ast,
			validators: { element: [validateTagClosingNameMatch, validateUniqueAttributeKeys] }
		});
	}
	module.exports = { checkConstraints: checkConstraints$1 };
}));
var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { pick } = require_lodash();
	function tokenToOffsetPosition$6(token) {
		return pick(token, ["startOffset", "endOffset"]);
	}
	module.exports = { tokenToOffsetPosition: tokenToOffsetPosition$6 };
}));
var require_attribute_value$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { isRegExp: isRegExp$1, isArray: isArray$1, includes: includes$3, has: has$2 } = require_lodash();
	const { tokenToOffsetPosition: tokenToOffsetPosition$5 } = require_utils();
	function validateAttributeValue$1(attributeNode, xssAttribute) {
		const issues = [];
		const valueDef = xssAttribute.value;
		if (has$2(xssAttribute, "value") === false) return issues;
		const actualValue = attributeNode.value;
		if (actualValue === null) return issues;
		const errPosition = tokenToOffsetPosition$5(attributeNode.syntax.value);
		/* istanbul ignore else  defensive programming */
		if (isRegExp$1(valueDef)) {
			if (valueDef.test(actualValue) === false) issues.push({
				msg: `Expecting Value matching <${valueDef.toString()}> but found <${actualValue}>`,
				node: attributeNode,
				severity: "error",
				position: errPosition
			});
		} else if (isArray$1(valueDef)) {
			if (includes$3(valueDef, actualValue) === false) issues.push({
				msg: `Expecting one of <${valueDef.toString()}> but found <${actualValue}>`,
				node: attributeNode,
				severity: "error",
				position: errPosition
			});
		} else
 /* istanbul ignore next  defensive programming */
		throw Error("None Exhaustive Match");
		return issues;
	}
	module.exports = { validateAttributeValue: validateAttributeValue$1 };
}));
var require_duplicate_sub_elements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { map: map$7, forEach: forEach$4, includes: includes$2, filter: filter$3, groupBy } = require_lodash();
	const { tokenToOffsetPosition: tokenToOffsetPosition$4 } = require_utils();
	function validateDuplicateSubElements$1(elem, schema) {
		const allowedDupElemNames = map$7(filter$3(schema.elements, (_) => _.cardinality === "many"), (_) => _.name);
		const actualSubElemByName = groupBy(elem.subElements, (_) => _.name);
		const issues = [];
		forEach$4(actualSubElemByName, (dupElements, dupElementsName) => {
			const allowedDup = includes$2(allowedDupElemNames, dupElementsName);
			const hasConfiguration = schema.elements[dupElementsName] !== void 0;
			const hasDuplicates = dupElements.length > 1;
			if (allowedDup === false && hasDuplicates && hasConfiguration) forEach$4(dupElements, (dupElem) => {
				issues.push({
					msg: `Duplicate Sub-Element: <${dupElem.name}> only a single occurrence of this Sub-Element is allowed here.`,
					node: dupElem,
					severity: "error",
					position: tokenToOffsetPosition$4(dupElem.syntax.openName)
				});
			});
		});
		return issues;
	}
	module.exports = { validateDuplicateSubElements: validateDuplicateSubElements$1 };
}));
var require_required_attributes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { map: map$6, filter: filter$2, difference: difference$3 } = require_lodash();
	const { tokenToOffsetPosition: tokenToOffsetPosition$3 } = require_utils();
	function validateRequiredAttributes$1(elem, schema) {
		const missingAttributesNames = difference$3(map$6(filter$2(schema.attributes, (_) => _.required === true), (_) => _.key), map$6(elem.attributes, (_) => _.key));
		const errPosition = tokenToOffsetPosition$3(elem.syntax.openName);
		return map$6(missingAttributesNames, (_) => {
			return {
				msg: `Missing Required Attribute: <${_}>`,
				node: elem,
				severity: "error",
				position: errPosition
			};
		});
	}
	module.exports = { validateRequiredAttributes: validateRequiredAttributes$1 };
}));
var require_required_sub_elements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { map: map$5, filter: filter$1, difference: difference$2 } = require_lodash();
	const { tokenToOffsetPosition: tokenToOffsetPosition$2 } = require_utils();
	function validateRequiredSubElements$1(elem, schema) {
		const missingSubElemNames = difference$2(map$5(filter$1(schema.elements, (_) => _.required === true), (_) => _.name), map$5(elem.subElements, (_) => _.name));
		const errPosition = tokenToOffsetPosition$2(elem.syntax.openName);
		return map$5(missingSubElemNames, (_) => {
			return {
				msg: `Missing Required Sub-Element: <${_}>`,
				node: elem,
				severity: "error",
				position: errPosition
			};
		});
	}
	module.exports = { validateRequiredSubElements: validateRequiredSubElements$1 };
}));
var require_unknown_attributes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { map: map$4, includes: includes$1, forEach: forEach$3 } = require_lodash();
	const { isXMLNamespaceKey } = require_api$4();
	const { tokenToOffsetPosition: tokenToOffsetPosition$1 } = require_utils();
	function validateUnknownAttributes$1(elem, schema) {
		if (schema.attributesType !== "closed") return [];
		const allowedAttribNames = map$4(schema.attributes, (_) => _.key);
		const issues = [];
		forEach$3(elem.attributes, (attrib) => {
			/* istanbul ignore else - Defensive programming, but cannot
			* reproduce this branch with current error recovery heuristics
			*/
			if (attrib.key !== null) {
				if (includes$1(allowedAttribNames, attrib.key) === false && isXMLNamespaceKey({
					key: attrib.key,
					includeEmptyPrefix: true
				}) === false) issues.push({
					msg: `Unknown Attribute: <${attrib.key}> only [${allowedAttribNames.toString()}] attributes are allowed`,
					node: attrib,
					severity: "error",
					position: tokenToOffsetPosition$1(attrib.syntax.key)
				});
			}
		});
		return issues;
	}
	module.exports = { validateUnknownAttributes: validateUnknownAttributes$1 };
}));
var require_unknown_sub_elements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { map: map$3, forEach: forEach$2, includes } = require_lodash();
	const { tokenToOffsetPosition } = require_utils();
	function validateUnknownSubElements$1(elem, schema) {
		if (schema.elementsType !== "closed") return [];
		const allowedElemNames = map$3(schema.elements, (_) => _.name);
		const issues = [];
		forEach$2(elem.subElements, (subElem) => {
			if (subElem.name !== null) {
				if (includes(allowedElemNames, subElem.name) === false) issues.push({
					msg: `Unknown Sub-Element: <${subElem.name}> only [${allowedElemNames.toString()}] Sub-Elements are allowed`,
					node: subElem,
					severity: "error",
					position: tokenToOffsetPosition(subElem.syntax.openName)
				});
			}
		});
		return issues;
	}
	module.exports = { validateUnknownSubElements: validateUnknownSubElements$1 };
}));
var require_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { drop, map: map$2, forEach: forEach$1, first } = require_lodash();
	function findAttributeXssDef$2(attribNode, schema) {
		const xssElement = findElementXssDef$2(attribNode.parent, schema);
		let xssAttribute = void 0;
		if (xssElement !== void 0) {
			const attributeName = attribNode.key;
			xssAttribute = xssElement.attributes[attributeName];
		}
		return xssAttribute;
	}
	function findElementXssDef$2(node, schema) {
		const elementsPath = map$2(getAstNodeAncestors(node), "name");
		if (first(elementsPath) !== schema.name) return;
		let xssElement = schema;
		forEach$1(drop(elementsPath), (elemName) => {
			xssElement = xssElement.elements[elemName];
			if (xssElement === void 0) return false;
		});
		return xssElement;
	}
	function getAstNodeAncestors(node) {
		const ancestors = [];
		ancestors.push(node);
		let currAncestor = node.parent;
		while (currAncestor !== void 0 && currAncestor.type !== "XMLDocument") {
			ancestors.push(currAncestor);
			currAncestor = currAncestor.parent;
		}
		ancestors.reverse();
		return ancestors;
	}
	module.exports = {
		findAttributeXssDef: findAttributeXssDef$2,
		findElementXssDef: findElementXssDef$2
	};
}));
var require_get_validators = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { validateAttributeValue } = require_attribute_value$1();
	const { validateDuplicateSubElements } = require_duplicate_sub_elements();
	const { validateRequiredAttributes } = require_required_attributes();
	const { validateRequiredSubElements } = require_required_sub_elements();
	const { validateUnknownAttributes } = require_unknown_attributes();
	const { validateUnknownSubElements } = require_unknown_sub_elements();
	const { findAttributeXssDef: findAttributeXssDef$1, findElementXssDef: findElementXssDef$1 } = require_path();
	function getSchemaValidators$2(schema) {
		return {
			attribute: buildAttributeValidator(schema),
			element: buildElementValidator(schema)
		};
	}
	function buildAttributeValidator(schema) {
		return (attributeNode) => {
			let issues = [];
			const xssAttributeDef = findAttributeXssDef$1(attributeNode, schema);
			if (xssAttributeDef !== void 0) {
				const attributeValueIssues = validateAttributeValue(attributeNode, xssAttributeDef);
				issues = issues.concat(attributeValueIssues);
			}
			return issues;
		};
	}
	function buildElementValidator(schema) {
		return (elementNode) => {
			let issues = [];
			const xssElementDef = findElementXssDef$1(elementNode, schema);
			if (xssElementDef !== void 0) {
				const duplicateElementsIssues = validateDuplicateSubElements(elementNode, xssElementDef);
				const requiredAttributesIssues = validateRequiredAttributes(elementNode, xssElementDef);
				const requiredSubElementsIssues = validateRequiredSubElements(elementNode, xssElementDef);
				const unknownAttributesIssues = validateUnknownAttributes(elementNode, xssElementDef);
				const unknownSubElementsIssues = validateUnknownSubElements(elementNode, xssElementDef);
				issues = issues.concat(duplicateElementsIssues, requiredAttributesIssues, requiredSubElementsIssues, unknownAttributesIssues, unknownSubElementsIssues);
			}
			return issues;
		};
	}
	module.exports = { getSchemaValidators: getSchemaValidators$2 };
}));
var require_attribute_name = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { difference: difference$1, map: map$1 } = require_lodash();
	function attributeNameCompletion$1(elementNode, xssElement) {
		return map$1(difference$1(map$1(xssElement.attributes, (_) => _.key), map$1(elementNode.attributes, (_) => _.key)), (_) => {
			return {
				text: _,
				label: _,
				commitCharacter: "="
			};
		});
	}
	module.exports = { attributeNameCompletion: attributeNameCompletion$1 };
}));
var require_attribute_value = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { has: has$1, isRegExp, forEach, isArray } = require_lodash();
	function attributeValueCompletion$1(attributeNode, xssAttribute, prefix = "") {
		if (has$1(xssAttribute, "value") === false) return [];
		const suggestions = [];
		const valueDef = xssAttribute.value;
		/* istanbul ignore else - defensive programming */
		if (isRegExp(valueDef)) {} else if (isArray(valueDef)) forEach(valueDef, (enumVal) => {
			if (enumVal.startsWith(prefix)) suggestions.push({
				text: enumVal.substring(prefix.length),
				label: enumVal
			});
		});
		else
 /* istanbul ignore next  defensive programming */
		throw Error("None Exhaustive Match");
		return suggestions;
	}
	module.exports = { attributeValueCompletion: attributeValueCompletion$1 };
}));
var require_element_name = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { difference, map, filter, has, pickBy } = require_lodash();
	const { DEFAULT_NS } = require_api$3();
	const NAMESPACE_PATTERN = /^(?:([^:]*):)?([^:]*)$/;
	function elementNameCompletion$1(elementNode, xssElement, prefix = "") {
		const match = prefix.match(NAMESPACE_PATTERN);
		if (match === null) return [];
		const namespacePrefix = match[1] ? match[1] : DEFAULT_NS;
		const elementNamespaceUri = elementNode.namespaces[namespacePrefix];
		const possibleElements = filter(xssElement.elements, (_) => has(_, "namespace") === false || _.namespace && _.namespace === elementNamespaceUri);
		const suggestions = map(applicableElements(xssElement.elements, elementNode.subElements, possibleElements), (_) => {
			return {
				text: _,
				label: _
			};
		});
		if (namespacePrefix === void 0 || namespacePrefix === DEFAULT_NS) return [...map(pickBy(pickBy(elementNode.namespaces, (uri, prefix$1) => prefix$1 !== DEFAULT_NS), (uri) => {
			const possibleElements$1 = filter(xssElement.elements, (element) => has(element, "namespace") === true && element.namespace === uri);
			return applicableElements(xssElement.elements, elementNode.subElements, possibleElements$1).length > 0;
		}), (uri, prefix$1) => ({
			text: prefix$1,
			label: prefix$1,
			commitCharacter: ":",
			isNamespace: true
		})), ...suggestions];
		return suggestions;
	}
	function applicableElements(xssElements, subElements, possibleElements) {
		const allPossibleSuggestions = map(possibleElements, (element) => element.name);
		const notSingularElemNames = map(filter(xssElements, (element) => element.cardinality === "many"), (element) => element.name);
		return difference(allPossibleSuggestions, difference(map(subElements, (element) => element.name), notSingularElemNames));
	}
	module.exports = { elementNameCompletion: elementNameCompletion$1 };
}));
var require_get_content_assist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { attributeNameCompletion } = require_attribute_name();
	const { attributeValueCompletion } = require_attribute_value();
	const { elementNameCompletion } = require_element_name();
	const { findElementXssDef, findAttributeXssDef } = require_path();
	function getSchemaSuggestionsProviders$1(schema) {
		const attributeNameProvider = buildAttributeNameProvider(schema);
		const attributeValueProvider = buildAttributeValueProvider(schema);
		return {
			schemaElementNameCompletion: buildElementNameProvider(schema),
			schemaAttributeNameCompletion: attributeNameProvider,
			schemaAttributeValueCompletion: attributeValueProvider
		};
	}
	function buildAttributeNameProvider(schema) {
		return ({ element, prefix }) => {
			const xssElementDef = findElementXssDef(element, schema);
			if (xssElementDef !== void 0) return attributeNameCompletion(element, xssElementDef, prefix);
			else return [];
		};
	}
	function buildElementNameProvider(schema) {
		return ({ element, prefix }) => {
			const xssElementDef = findElementXssDef(element.parent, schema);
			if (xssElementDef !== void 0) return elementNameCompletion(element.parent, xssElementDef, prefix);
			else return [];
		};
	}
	function buildAttributeValueProvider(schema) {
		return ({ attribute, prefix }) => {
			return attributeValueCompletion(attribute, findAttributeXssDef(attribute, schema), prefix);
		};
	}
	module.exports = { getSchemaSuggestionsProviders: getSchemaSuggestionsProviders$1 };
}));
var import_api$3 = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { getSchemaValidators: getSchemaValidators$1 } = require_get_validators();
	const { getSchemaSuggestionsProviders } = require_get_content_assist();
	module.exports = {
		getSchemaValidators: getSchemaValidators$1,
		getSchemaSuggestionsProviders
	};
})))();
var import_api$2 = require_api$1();
var import_api$4 = require_api$2();
var import_api$1 = require_api$3();
var import_api = require_api$5();
var import_main = require_main();
function lexingErrorsToDiagnostic(errors, document, filterErrors) {
	return CommonConverter.excludeByErrorMessage(errors, filterErrors.errorMessagesToIgnore).map((el) => {
		return {
			message: el.message,
			range: import_main.Range.create(document.positionAt(el.offset), document.positionAt(el.offset + el.length)),
			severity: determineDiagnosticSeverity(el.message, filterErrors, el.severity)
		};
	});
}
function parsingErrorsToDiagnostic(errors, document, filterErrors) {
	return CommonConverter.excludeByErrorMessage(errors, filterErrors.errorMessagesToIgnore).map((el) => {
		return {
			message: el.message,
			range: import_main.Range.create(document.positionAt(el.token.startOffset), document.positionAt(el.token.endOffset ?? 0)),
			severity: determineDiagnosticSeverity(el.message, filterErrors, el.severity)
		};
	});
}
function issuesToDiagnostic(errors, document, filterErrors) {
	return CommonConverter.excludeByErrorMessage(errors, filterErrors.errorMessagesToIgnore, "msg").map((el) => {
		return {
			message: el.msg,
			range: {
				start: document.positionAt(el.position.startOffset),
				end: document.positionAt(el.position.endOffset + 1)
			},
			severity: determineDiagnosticSeverity(el.msg, filterErrors, el.severity)
		};
	});
}
function toDiagnosticSeverity(issueSeverity) {
	if (!issueSeverity) return import_main.DiagnosticSeverity.Error;
	switch (issueSeverity) {
		case "error": return import_main.DiagnosticSeverity.Error;
		case "warning": return import_main.DiagnosticSeverity.Warning;
		case "info":
		default: return import_main.DiagnosticSeverity.Information;
	}
}
function determineDiagnosticSeverity(message, filterErrors, issueSeverity) {
	let severity;
	if (checkValueAgainstRegexpArray(message, filterErrors.errorMessagesToTreatAsWarning)) severity = import_main.DiagnosticSeverity.Warning;
	else if (checkValueAgainstRegexpArray(message, filterErrors.errorMessagesToTreatAsInfo)) severity = import_main.DiagnosticSeverity.Information;
	else severity = toDiagnosticSeverity(issueSeverity);
	return severity;
}
var XmlService = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.schemas = {};
		this.serviceCapabilities = { diagnosticProvider: {
			interFileDependencies: true,
			workspaceDiagnostics: true
		} };
	}
	addDocument(document) {
		super.addDocument(document);
		this.$configureService(document.uri);
	}
	$getXmlSchemaUri(sessionID) {
		return this.getOption(sessionID, "schemaUri");
	}
	$configureService(sessionID) {
		this.getOption(sessionID, "schemas")?.forEach((el) => {
			if (el.uri === this.$getXmlSchemaUri(sessionID)) {
				el.fileMatch ??= [];
				el.fileMatch.push(sessionID);
			}
			let schema = el.schema ?? this.schemas[el.uri];
			if (schema) this.schemas[el.uri] = schema;
			el.schema = void 0;
		});
	}
	$getSchema(sessionId) {
		let schemaId = this.$getXmlSchemaUri(sessionId);
		if (schemaId && this.schemas[schemaId]) return JSON.parse(this.schemas[schemaId]);
	}
	async doValidation(document) {
		let fullDocument = this.getDocument(document.uri);
		if (!fullDocument) return [];
		const { cst, tokenVector, lexErrors, parseErrors } = (0, import_api.parse)(fullDocument.getText());
		const xmlDoc = (0, import_api$1.buildAst)(cst, tokenVector);
		const constraintsIssues = (0, import_api$2.checkConstraints)(xmlDoc);
		let schema = this.$getSchema(document.uri);
		let schemaIssues = [];
		if (schema) {
			const schemaValidators = (0, import_api$3.getSchemaValidators)(schema);
			schemaIssues = (0, import_api$4.validate)({
				doc: xmlDoc,
				validators: {
					attribute: [schemaValidators.attribute],
					element: [schemaValidators.element]
				}
			});
		}
		return [
			...lexingErrorsToDiagnostic(lexErrors, fullDocument, this.optionsToFilterDiagnostics),
			...parsingErrorsToDiagnostic(parseErrors, fullDocument, this.optionsToFilterDiagnostics),
			...issuesToDiagnostic(constraintsIssues, fullDocument, this.optionsToFilterDiagnostics),
			...issuesToDiagnostic(schemaIssues, fullDocument, this.optionsToFilterDiagnostics)
		];
	}
};
export { XmlService };
