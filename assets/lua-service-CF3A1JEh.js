import { D as __commonJSMin, j as __toESM, t as BaseService } from "./base-service-CtWdb5FQ.js";
import "./common-converters-C49IefJv.js";
import { t as filterDiagnostics } from "./lsp-converters-DheYKvMP.js";
var import_luaparse = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, name, factory) {
		"use strict";
		var objectTypes = {
			"function": true,
			"object": true
		}, freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports, freeModule = objectTypes[typeof module] && module && !module.nodeType && module, freeGlobal = freeExports && freeModule && typeof global === "object" && global, moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
		/* istanbul ignore else */
		if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) root = freeGlobal;
		/* istanbul ignore if */
		if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
			define(["exports"], factory);
			if (freeExports && moduleExports) factory(freeModule.exports);
		} else if (freeExports && freeModule)
 /* istanbul ignore else */
		if (moduleExports) factory(freeModule.exports);
		else factory(freeExports);
		else factory(root[name] = {});
	})(exports, "luaparse", function(exports$1) {
		"use strict";
		exports$1.version = "0.3.1";
		var input, options, length, features, encodingMode;
		var defaultOptions = exports$1.defaultOptions = {
			wait: false,
			comments: true,
			scope: false,
			locations: false,
			ranges: false,
			onCreateNode: null,
			onCreateScope: null,
			onDestroyScope: null,
			onLocalDeclaration: null,
			luaVersion: "5.1",
			encodingMode: "none"
		};
		function encodeUTF8(codepoint, highMask) {
			highMask = highMask || 0;
			if (codepoint < 128) return String.fromCharCode(codepoint);
			else if (codepoint < 2048) return String.fromCharCode(highMask | 192 | codepoint >> 6, highMask | 128 | codepoint & 63);
			else if (codepoint < 65536) return String.fromCharCode(highMask | 224 | codepoint >> 12, highMask | 128 | codepoint >> 6 & 63, highMask | 128 | codepoint & 63);
			else if (codepoint < 1114112) return String.fromCharCode(highMask | 240 | codepoint >> 18, highMask | 128 | codepoint >> 12 & 63, highMask | 128 | codepoint >> 6 & 63, highMask | 128 | codepoint & 63);
			else return null;
		}
		function toHex(num, digits) {
			var result = num.toString(16);
			while (result.length < digits) result = "0" + result;
			return result;
		}
		function checkChars(rx) {
			return function(s) {
				var m = rx.exec(s);
				if (!m) return s;
				raise(null, errors.invalidCodeUnit, toHex(m[0].charCodeAt(0), 4).toUpperCase());
			};
		}
		var encodingModes = {
			"pseudo-latin1": {
				fixup: checkChars(/[^\x00-\xff]/),
				encodeByte: function(value) {
					if (value === null) return "";
					return String.fromCharCode(value);
				},
				encodeUTF8: function(codepoint) {
					return encodeUTF8(codepoint);
				}
			},
			"x-user-defined": {
				fixup: checkChars(/[^\x00-\x7f\uf780-\uf7ff]/),
				encodeByte: function(value) {
					if (value === null) return "";
					if (value >= 128) return String.fromCharCode(value | 63232);
					return String.fromCharCode(value);
				},
				encodeUTF8: function(codepoint) {
					return encodeUTF8(codepoint, 63232);
				}
			},
			"none": {
				discardStrings: true,
				fixup: function(s) {
					return s;
				},
				encodeByte: function(value) {
					return "";
				},
				encodeUTF8: function(codepoint) {
					return "";
				}
			}
		};
		var EOF = 1, StringLiteral = 2, Keyword = 4, Identifier = 8, NumericLiteral = 16, Punctuator = 32, BooleanLiteral = 64, NilLiteral = 128, VarargLiteral = 256;
		exports$1.tokenTypes = {
			EOF,
			StringLiteral,
			Keyword,
			Identifier,
			NumericLiteral,
			Punctuator,
			BooleanLiteral,
			NilLiteral,
			VarargLiteral
		};
		var errors = exports$1.errors = {
			unexpected: "unexpected %1 '%2' near '%3'",
			unexpectedEOF: "unexpected symbol near '<eof>'",
			expected: "'%1' expected near '%2'",
			expectedToken: "%1 expected near '%2'",
			unfinishedString: "unfinished string near '%1'",
			malformedNumber: "malformed number near '%1'",
			decimalEscapeTooLarge: "decimal escape too large near '%1'",
			invalidEscape: "invalid escape sequence near '%1'",
			hexadecimalDigitExpected: "hexadecimal digit expected near '%1'",
			braceExpected: "missing '%1' near '%2'",
			tooLargeCodepoint: "UTF-8 value too large near '%1'",
			unfinishedLongString: "unfinished long string (starting at line %1) near '%2'",
			unfinishedLongComment: "unfinished long comment (starting at line %1) near '%2'",
			ambiguousSyntax: "ambiguous syntax (function call x new statement) near '%1'",
			noLoopToBreak: "no loop to break near '%1'",
			labelAlreadyDefined: "label '%1' already defined on line %2",
			labelNotVisible: "no visible label '%1' for <goto>",
			gotoJumpInLocalScope: "<goto %1> jumps into the scope of local '%2'",
			cannotUseVararg: "cannot use '...' outside a vararg function near '%1'",
			invalidCodeUnit: "code unit U+%1 is not allowed in the current encoding mode"
		};
		var ast = exports$1.ast = {
			labelStatement: function(label) {
				return {
					type: "LabelStatement",
					label
				};
			},
			breakStatement: function() {
				return { type: "BreakStatement" };
			},
			gotoStatement: function(label) {
				return {
					type: "GotoStatement",
					label
				};
			},
			returnStatement: function(args) {
				return {
					type: "ReturnStatement",
					"arguments": args
				};
			},
			ifStatement: function(clauses) {
				return {
					type: "IfStatement",
					clauses
				};
			},
			ifClause: function(condition, body) {
				return {
					type: "IfClause",
					condition,
					body
				};
			},
			elseifClause: function(condition, body) {
				return {
					type: "ElseifClause",
					condition,
					body
				};
			},
			elseClause: function(body) {
				return {
					type: "ElseClause",
					body
				};
			},
			whileStatement: function(condition, body) {
				return {
					type: "WhileStatement",
					condition,
					body
				};
			},
			doStatement: function(body) {
				return {
					type: "DoStatement",
					body
				};
			},
			repeatStatement: function(condition, body) {
				return {
					type: "RepeatStatement",
					condition,
					body
				};
			},
			localStatement: function(variables, init) {
				return {
					type: "LocalStatement",
					variables,
					init
				};
			},
			assignmentStatement: function(variables, init) {
				return {
					type: "AssignmentStatement",
					variables,
					init
				};
			},
			callStatement: function(expression) {
				return {
					type: "CallStatement",
					expression
				};
			},
			functionStatement: function(identifier, parameters, isLocal, body) {
				return {
					type: "FunctionDeclaration",
					identifier,
					isLocal,
					parameters,
					body
				};
			},
			forNumericStatement: function(variable, start, end$1, step, body) {
				return {
					type: "ForNumericStatement",
					variable,
					start,
					end: end$1,
					step,
					body
				};
			},
			forGenericStatement: function(variables, iterators, body) {
				return {
					type: "ForGenericStatement",
					variables,
					iterators,
					body
				};
			},
			chunk: function(body) {
				return {
					type: "Chunk",
					body
				};
			},
			identifier: function(name) {
				return {
					type: "Identifier",
					name
				};
			},
			literal: function(type, value, raw) {
				type = type === StringLiteral ? "StringLiteral" : type === NumericLiteral ? "NumericLiteral" : type === BooleanLiteral ? "BooleanLiteral" : type === NilLiteral ? "NilLiteral" : "VarargLiteral";
				return {
					type,
					value,
					raw
				};
			},
			tableKey: function(key, value) {
				return {
					type: "TableKey",
					key,
					value
				};
			},
			tableKeyString: function(key, value) {
				return {
					type: "TableKeyString",
					key,
					value
				};
			},
			tableValue: function(value) {
				return {
					type: "TableValue",
					value
				};
			},
			tableConstructorExpression: function(fields) {
				return {
					type: "TableConstructorExpression",
					fields
				};
			},
			binaryExpression: function(operator, left, right) {
				return {
					type: "and" === operator || "or" === operator ? "LogicalExpression" : "BinaryExpression",
					operator,
					left,
					right
				};
			},
			unaryExpression: function(operator, argument) {
				return {
					type: "UnaryExpression",
					operator,
					argument
				};
			},
			memberExpression: function(base, indexer, identifier) {
				return {
					type: "MemberExpression",
					indexer,
					identifier,
					base
				};
			},
			indexExpression: function(base, index$1) {
				return {
					type: "IndexExpression",
					base,
					index: index$1
				};
			},
			callExpression: function(base, args) {
				return {
					type: "CallExpression",
					base,
					"arguments": args
				};
			},
			tableCallExpression: function(base, args) {
				return {
					type: "TableCallExpression",
					base,
					"arguments": args
				};
			},
			stringCallExpression: function(base, argument) {
				return {
					type: "StringCallExpression",
					base,
					argument
				};
			},
			comment: function(value, raw) {
				return {
					type: "Comment",
					value,
					raw
				};
			}
		};
		function finishNode(node) {
			if (trackLocations) {
				var location = locations.pop();
				location.complete();
				location.bless(node);
			}
			if (options.onCreateNode) options.onCreateNode(node);
			return node;
		}
		var slice = Array.prototype.slice;
		Object.prototype.toString;
		var indexOf = function(array, element) {
			for (var i = 0, length$1 = array.length; i < length$1; ++i) if (array[i] === element) return i;
			return -1;
		};
		/* istanbul ignore else */
		if (Array.prototype.indexOf) indexOf = function(array, element) {
			return array.indexOf(element);
		};
		function indexOfObject(array, property, element) {
			for (var i = 0, length$1 = array.length; i < length$1; ++i) if (array[i][property] === element) return i;
			return -1;
		}
		function sprintf(format) {
			var args = slice.call(arguments, 1);
			format = format.replace(/%(\d)/g, function(match, index$1) {
				return "" + args[index$1 - 1] || "";
			});
			return format;
		}
		var assign = function(dest) {
			var args = slice.call(arguments, 1), src, prop;
			for (var i = 0, length$1 = args.length; i < length$1; ++i) {
				src = args[i];
				for (prop in src)
 /* istanbul ignore else */
				if (Object.prototype.hasOwnProperty.call(src, prop)) dest[prop] = src[prop];
			}
			return dest;
		};
		/* istanbul ignore else */
		if (Object.assign) assign = Object.assign;
		exports$1.SyntaxError = SyntaxError;
		function fixupError(e) {
			/* istanbul ignore if */
			if (!Object.create) return e;
			return Object.create(e, {
				"line": {
					"writable": true,
					value: e.line
				},
				"index": {
					"writable": true,
					value: e.index
				},
				"column": {
					"writable": true,
					value: e.column
				}
			});
		}
		function raise(token$1) {
			var message = sprintf.apply(null, slice.call(arguments, 1)), error, col;
			if (token$1 === null || typeof token$1.line === "undefined") {
				col = index - lineStart + 1;
				error = fixupError(new SyntaxError(sprintf("[%1:%2] %3", line, col, message)));
				error.index = index;
				error.line = line;
				error.column = col;
			} else {
				col = token$1.range[0] - token$1.lineStart;
				error = fixupError(new SyntaxError(sprintf("[%1:%2] %3", token$1.line, col, message)));
				error.line = token$1.line;
				error.index = token$1.range[0];
				error.column = col;
			}
			throw error;
		}
		function tokenValue(token$1) {
			var raw = input.slice(token$1.range[0], token$1.range[1]);
			if (raw) return raw;
			return token$1.value;
		}
		function raiseUnexpectedToken(type, token$1) {
			raise(token$1, errors.expectedToken, type, tokenValue(token$1));
		}
		function unexpected(found) {
			var near = tokenValue(lookahead);
			if ("undefined" !== typeof found.type) {
				var type;
				switch (found.type) {
					case StringLiteral:
						type = "string";
						break;
					case Keyword:
						type = "keyword";
						break;
					case Identifier:
						type = "identifier";
						break;
					case NumericLiteral:
						type = "number";
						break;
					case Punctuator:
						type = "symbol";
						break;
					case BooleanLiteral:
						type = "boolean";
						break;
					case NilLiteral: return raise(found, errors.unexpected, "symbol", "nil", near);
					case EOF: return raise(found, errors.unexpectedEOF);
				}
				return raise(found, errors.unexpected, type, tokenValue(found), near);
			}
			return raise(found, errors.unexpected, "symbol", found, near);
		}
		var index, token, previousToken, lookahead, comments, tokenStart, line, lineStart;
		exports$1.lex = lex;
		function lex() {
			skipWhiteSpace();
			while (45 === input.charCodeAt(index) && 45 === input.charCodeAt(index + 1)) {
				scanComment();
				skipWhiteSpace();
			}
			if (index >= length) return {
				type: EOF,
				value: "<eof>",
				line,
				lineStart,
				range: [index, index]
			};
			var charCode = input.charCodeAt(index), next$1 = input.charCodeAt(index + 1);
			tokenStart = index;
			if (isIdentifierStart(charCode)) return scanIdentifierOrKeyword();
			switch (charCode) {
				case 39:
				case 34: return scanStringLiteral();
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: return scanNumericLiteral();
				case 46:
					if (isDecDigit(next$1)) return scanNumericLiteral();
					if (46 === next$1) {
						if (46 === input.charCodeAt(index + 2)) return scanVarargLiteral();
						return scanPunctuator("..");
					}
					return scanPunctuator(".");
				case 61:
					if (61 === next$1) return scanPunctuator("==");
					return scanPunctuator("=");
				case 62:
					if (features.bitwiseOperators) {
						if (62 === next$1) return scanPunctuator(">>");
					}
					if (61 === next$1) return scanPunctuator(">=");
					return scanPunctuator(">");
				case 60:
					if (features.bitwiseOperators) {
						if (60 === next$1) return scanPunctuator("<<");
					}
					if (61 === next$1) return scanPunctuator("<=");
					return scanPunctuator("<");
				case 126:
					if (61 === next$1) return scanPunctuator("~=");
					if (!features.bitwiseOperators) break;
					return scanPunctuator("~");
				case 58:
					if (features.labels) {
						if (58 === next$1) return scanPunctuator("::");
					}
					return scanPunctuator(":");
				case 91:
					if (91 === next$1 || 61 === next$1) return scanLongStringLiteral();
					return scanPunctuator("[");
				case 47:
					if (features.integerDivision) {
						if (47 === next$1) return scanPunctuator("//");
					}
					return scanPunctuator("/");
				case 38:
				case 124: if (!features.bitwiseOperators) break;
				case 42:
				case 94:
				case 37:
				case 44:
				case 123:
				case 125:
				case 93:
				case 40:
				case 41:
				case 59:
				case 35:
				case 45:
				case 43: return scanPunctuator(input.charAt(index));
			}
			return unexpected(input.charAt(index));
		}
		function consumeEOL() {
			var charCode = input.charCodeAt(index), peekCharCode = input.charCodeAt(index + 1);
			if (isLineTerminator(charCode)) {
				if (10 === charCode && 13 === peekCharCode) ++index;
				if (13 === charCode && 10 === peekCharCode) ++index;
				++line;
				lineStart = ++index;
				return true;
			}
			return false;
		}
		function skipWhiteSpace() {
			while (index < length) if (isWhiteSpace(input.charCodeAt(index))) ++index;
			else if (!consumeEOL()) break;
		}
		function scanIdentifierOrKeyword() {
			var value, type;
			while (isIdentifierPart(input.charCodeAt(++index)));
			value = encodingMode.fixup(input.slice(tokenStart, index));
			if (isKeyword(value)) type = Keyword;
			else if ("true" === value || "false" === value) {
				type = BooleanLiteral;
				value = "true" === value;
			} else if ("nil" === value) {
				type = NilLiteral;
				value = null;
			} else type = Identifier;
			return {
				type,
				value,
				line,
				lineStart,
				range: [tokenStart, index]
			};
		}
		function scanPunctuator(value) {
			index += value.length;
			return {
				type: Punctuator,
				value,
				line,
				lineStart,
				range: [tokenStart, index]
			};
		}
		function scanVarargLiteral() {
			index += 3;
			return {
				type: VarargLiteral,
				value: "...",
				line,
				lineStart,
				range: [tokenStart, index]
			};
		}
		function scanStringLiteral() {
			var delimiter = input.charCodeAt(index++), beginLine = line, beginLineStart = lineStart, stringStart = index, string = encodingMode.discardStrings ? null : "", charCode;
			for (;;) {
				charCode = input.charCodeAt(index++);
				if (delimiter === charCode) break;
				if (index > length || isLineTerminator(charCode)) {
					string += input.slice(stringStart, index - 1);
					raise(null, errors.unfinishedString, input.slice(tokenStart, index - 1));
				}
				if (92 === charCode) {
					if (!encodingMode.discardStrings) {
						var beforeEscape = input.slice(stringStart, index - 1);
						string += encodingMode.fixup(beforeEscape);
					}
					var escapeValue = readEscapeSequence();
					if (!encodingMode.discardStrings) string += escapeValue;
					stringStart = index;
				}
			}
			if (!encodingMode.discardStrings) {
				string += encodingMode.encodeByte(null);
				string += encodingMode.fixup(input.slice(stringStart, index - 1));
			}
			return {
				type: StringLiteral,
				value: string,
				line: beginLine,
				lineStart: beginLineStart,
				lastLine: line,
				lastLineStart: lineStart,
				range: [tokenStart, index]
			};
		}
		function scanLongStringLiteral() {
			var beginLine = line, beginLineStart = lineStart, string = readLongString(false);
			if (false === string) raise(token, errors.expected, "[", tokenValue(token));
			return {
				type: StringLiteral,
				value: encodingMode.discardStrings ? null : encodingMode.fixup(string),
				line: beginLine,
				lineStart: beginLineStart,
				lastLine: line,
				lastLineStart: lineStart,
				range: [tokenStart, index]
			};
		}
		function scanNumericLiteral() {
			var character = input.charAt(index), next$1 = input.charAt(index + 1);
			var literal = "0" === character && "xX".indexOf(next$1 || null) >= 0 ? readHexLiteral() : readDecLiteral();
			var foundImaginaryUnit = readImaginaryUnitSuffix();
			if (readInt64Suffix() && (foundImaginaryUnit || literal.hasFractionPart)) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
			return {
				type: NumericLiteral,
				value: literal.value,
				line,
				lineStart,
				range: [tokenStart, index]
			};
		}
		function readImaginaryUnitSuffix() {
			if (!features.imaginaryNumbers) return;
			if ("iI".indexOf(input.charAt(index) || null) >= 0) {
				++index;
				return true;
			} else return false;
		}
		function readInt64Suffix() {
			if (!features.integerSuffixes) return;
			if ("uU".indexOf(input.charAt(index) || null) >= 0) {
				++index;
				if ("lL".indexOf(input.charAt(index) || null) >= 0) {
					++index;
					if ("lL".indexOf(input.charAt(index) || null) >= 0) {
						++index;
						return "ULL";
					} else raise(null, errors.malformedNumber, input.slice(tokenStart, index));
				} else raise(null, errors.malformedNumber, input.slice(tokenStart, index));
			} else if ("lL".indexOf(input.charAt(index) || null) >= 0) {
				++index;
				if ("lL".indexOf(input.charAt(index) || null) >= 0) {
					++index;
					return "LL";
				} else raise(null, errors.malformedNumber, input.slice(tokenStart, index));
			}
		}
		function readHexLiteral() {
			var fraction = 0, binaryExponent = 1, binarySign = 1, digit, fractionStart, exponentStart, digitStart = index += 2;
			if (!isHexDigit(input.charCodeAt(index))) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
			while (isHexDigit(input.charCodeAt(index))) ++index;
			digit = parseInt(input.slice(digitStart, index), 16);
			var foundFraction = false;
			if ("." === input.charAt(index)) {
				foundFraction = true;
				fractionStart = ++index;
				while (isHexDigit(input.charCodeAt(index))) ++index;
				fraction = input.slice(fractionStart, index);
				fraction = fractionStart === index ? 0 : parseInt(fraction, 16) / Math.pow(16, index - fractionStart);
			}
			var foundBinaryExponent = false;
			if ("pP".indexOf(input.charAt(index) || null) >= 0) {
				foundBinaryExponent = true;
				++index;
				if ("+-".indexOf(input.charAt(index) || null) >= 0) binarySign = "+" === input.charAt(index++) ? 1 : -1;
				exponentStart = index;
				if (!isDecDigit(input.charCodeAt(index))) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
				while (isDecDigit(input.charCodeAt(index))) ++index;
				binaryExponent = input.slice(exponentStart, index);
				binaryExponent = Math.pow(2, binaryExponent * binarySign);
			}
			return {
				value: (digit + fraction) * binaryExponent,
				hasFractionPart: foundFraction || foundBinaryExponent
			};
		}
		function readDecLiteral() {
			while (isDecDigit(input.charCodeAt(index))) ++index;
			var foundFraction = false;
			if ("." === input.charAt(index)) {
				foundFraction = true;
				++index;
				while (isDecDigit(input.charCodeAt(index))) ++index;
			}
			var foundExponent = false;
			if ("eE".indexOf(input.charAt(index) || null) >= 0) {
				foundExponent = true;
				++index;
				if ("+-".indexOf(input.charAt(index) || null) >= 0) ++index;
				if (!isDecDigit(input.charCodeAt(index))) raise(null, errors.malformedNumber, input.slice(tokenStart, index));
				while (isDecDigit(input.charCodeAt(index))) ++index;
			}
			return {
				value: parseFloat(input.slice(tokenStart, index)),
				hasFractionPart: foundFraction || foundExponent
			};
		}
		function readUnicodeEscapeSequence() {
			var sequenceStart = index++;
			if (input.charAt(index++) !== "{") raise(null, errors.braceExpected, "{", "\\" + input.slice(sequenceStart, index));
			if (!isHexDigit(input.charCodeAt(index))) raise(null, errors.hexadecimalDigitExpected, "\\" + input.slice(sequenceStart, index));
			while (input.charCodeAt(index) === 48) ++index;
			var escStart = index;
			while (isHexDigit(input.charCodeAt(index))) {
				++index;
				if (index - escStart > 6) raise(null, errors.tooLargeCodepoint, "\\" + input.slice(sequenceStart, index));
			}
			var b = input.charAt(index++);
			if (b !== "}") if (b === "\"" || b === "'") raise(null, errors.braceExpected, "}", "\\" + input.slice(sequenceStart, index--));
			else raise(null, errors.hexadecimalDigitExpected, "\\" + input.slice(sequenceStart, index));
			var codepoint = parseInt(input.slice(escStart, index - 1) || "0", 16);
			var frag = "\\" + input.slice(sequenceStart, index);
			if (codepoint > 1114111) raise(null, errors.tooLargeCodepoint, frag);
			return encodingMode.encodeUTF8(codepoint, frag);
		}
		function readEscapeSequence() {
			var sequenceStart = index;
			switch (input.charAt(index)) {
				case "a":
					++index;
					return "\x07";
				case "n":
					++index;
					return "\n";
				case "r":
					++index;
					return "\r";
				case "t":
					++index;
					return "	";
				case "v":
					++index;
					return "\v";
				case "b":
					++index;
					return "\b";
				case "f":
					++index;
					return "\f";
				case "\r":
				case "\n":
					consumeEOL();
					return "\n";
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					while (isDecDigit(input.charCodeAt(index)) && index - sequenceStart < 3) ++index;
					var frag = input.slice(sequenceStart, index);
					var ddd = parseInt(frag, 10);
					if (ddd > 255) raise(null, errors.decimalEscapeTooLarge, "\\" + ddd);
					return encodingMode.encodeByte(ddd, "\\" + frag);
				case "z":
					if (features.skipWhitespaceEscape) {
						++index;
						skipWhiteSpace();
						return "";
					}
					break;
				case "x":
					if (features.hexEscapes) {
						if (isHexDigit(input.charCodeAt(index + 1)) && isHexDigit(input.charCodeAt(index + 2))) {
							index += 3;
							return encodingMode.encodeByte(parseInt(input.slice(sequenceStart + 1, index), 16), "\\" + input.slice(sequenceStart, index));
						}
						raise(null, errors.hexadecimalDigitExpected, "\\" + input.slice(sequenceStart, index + 2));
					}
					break;
				case "u":
					if (features.unicodeEscapes) return readUnicodeEscapeSequence();
					break;
				case "\\":
				case "\"":
				case "'": return input.charAt(index++);
			}
			if (features.strictEscapes) raise(null, errors.invalidEscape, "\\" + input.slice(sequenceStart, index + 1));
			return input.charAt(index++);
		}
		function scanComment() {
			tokenStart = index;
			index += 2;
			var character = input.charAt(index), content = "", isLong = false, commentStart = index, lineStartComment = lineStart, lineComment = line;
			if ("[" === character) {
				content = readLongString(true);
				if (false === content) content = character;
				else isLong = true;
			}
			if (!isLong) {
				while (index < length) {
					if (isLineTerminator(input.charCodeAt(index))) break;
					++index;
				}
				if (options.comments) content = input.slice(commentStart, index);
			}
			if (options.comments) {
				var node = ast.comment(content, input.slice(tokenStart, index));
				if (options.locations) node.loc = {
					start: {
						line: lineComment,
						column: tokenStart - lineStartComment
					},
					end: {
						line,
						column: index - lineStart
					}
				};
				if (options.ranges) node.range = [tokenStart, index];
				if (options.onCreateNode) options.onCreateNode(node);
				comments.push(node);
			}
		}
		function readLongString(isComment) {
			var level = 0, content = "", terminator = false, character, stringStart, firstLine = line;
			++index;
			while ("=" === input.charAt(index + level)) ++level;
			if ("[" !== input.charAt(index + level)) return false;
			index += level + 1;
			if (isLineTerminator(input.charCodeAt(index))) consumeEOL();
			stringStart = index;
			while (index < length) {
				while (isLineTerminator(input.charCodeAt(index))) consumeEOL();
				character = input.charAt(index++);
				if ("]" === character) {
					terminator = true;
					for (var i = 0; i < level; ++i) if ("=" !== input.charAt(index + i)) terminator = false;
					if ("]" !== input.charAt(index + level)) terminator = false;
				}
				if (terminator) {
					content += input.slice(stringStart, index - 1);
					index += level + 1;
					return content;
				}
			}
			raise(null, isComment ? errors.unfinishedLongComment : errors.unfinishedLongString, firstLine, "<eof>");
		}
		function next() {
			previousToken = token;
			token = lookahead;
			lookahead = lex();
		}
		function consume(value) {
			if (value === token.value) {
				next();
				return true;
			}
			return false;
		}
		function expect(value) {
			if (value === token.value) next();
			else raise(token, errors.expected, value, tokenValue(token));
		}
		function isWhiteSpace(charCode) {
			return 9 === charCode || 32 === charCode || 11 === charCode || 12 === charCode;
		}
		function isLineTerminator(charCode) {
			return 10 === charCode || 13 === charCode;
		}
		function isDecDigit(charCode) {
			return charCode >= 48 && charCode <= 57;
		}
		function isHexDigit(charCode) {
			return charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70;
		}
		function isIdentifierStart(charCode) {
			if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || 95 === charCode) return true;
			if (features.extendedIdentifiers && charCode >= 128) return true;
			return false;
		}
		function isIdentifierPart(charCode) {
			if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || 95 === charCode || charCode >= 48 && charCode <= 57) return true;
			if (features.extendedIdentifiers && charCode >= 128) return true;
			return false;
		}
		function isKeyword(id) {
			switch (id.length) {
				case 2: return "do" === id || "if" === id || "in" === id || "or" === id;
				case 3: return "and" === id || "end" === id || "for" === id || "not" === id;
				case 4:
					if ("else" === id || "then" === id) return true;
					if (features.labels && !features.contextualGoto) return "goto" === id;
					return false;
				case 5: return "break" === id || "local" === id || "until" === id || "while" === id;
				case 6: return "elseif" === id || "repeat" === id || "return" === id;
				case 8: return "function" === id;
			}
			return false;
		}
		function isUnary(token$1) {
			if (Punctuator === token$1.type) return "#-~".indexOf(token$1.value) >= 0;
			if (Keyword === token$1.type) return "not" === token$1.value;
			return false;
		}
		function isBlockFollow(token$1) {
			if (EOF === token$1.type) return true;
			if (Keyword !== token$1.type) return false;
			switch (token$1.value) {
				case "else":
				case "elseif":
				case "end":
				case "until": return true;
				default: return false;
			}
		}
		var scopes, scopeDepth, globals;
		function createScope() {
			var scope = scopes[scopeDepth++].slice();
			scopes.push(scope);
			if (options.onCreateScope) options.onCreateScope();
		}
		function destroyScope() {
			scopes.pop();
			--scopeDepth;
			if (options.onDestroyScope) options.onDestroyScope();
		}
		function scopeIdentifierName(name) {
			if (options.onLocalDeclaration) options.onLocalDeclaration(name);
			if (-1 !== indexOf(scopes[scopeDepth], name)) return;
			scopes[scopeDepth].push(name);
		}
		function scopeIdentifier(node) {
			scopeIdentifierName(node.name);
			attachScope(node, true);
		}
		function attachScope(node, isLocal) {
			if (!isLocal && -1 === indexOfObject(globals, "name", node.name)) globals.push(node);
			node.isLocal = isLocal;
		}
		function scopeHasName(name) {
			return -1 !== indexOf(scopes[scopeDepth], name);
		}
		var locations = [], trackLocations;
		function createLocationMarker() {
			return new Marker(token);
		}
		function Marker(token$1) {
			if (options.locations) this.loc = {
				start: {
					line: token$1.line,
					column: token$1.range[0] - token$1.lineStart
				},
				end: {
					line: 0,
					column: 0
				}
			};
			if (options.ranges) this.range = [token$1.range[0], 0];
		}
		Marker.prototype.complete = function() {
			if (options.locations) {
				this.loc.end.line = previousToken.lastLine || previousToken.line;
				this.loc.end.column = previousToken.range[1] - (previousToken.lastLineStart || previousToken.lineStart);
			}
			if (options.ranges) this.range[1] = previousToken.range[1];
		};
		Marker.prototype.bless = function(node) {
			if (this.loc) {
				var loc = this.loc;
				node.loc = {
					start: {
						line: loc.start.line,
						column: loc.start.column
					},
					end: {
						line: loc.end.line,
						column: loc.end.column
					}
				};
			}
			if (this.range) node.range = [this.range[0], this.range[1]];
		};
		function markLocation() {
			if (trackLocations) locations.push(createLocationMarker());
		}
		function pushLocation(marker) {
			if (trackLocations) locations.push(marker);
		}
		function FullFlowContext() {
			this.scopes = [];
			this.pendingGotos = [];
		}
		FullFlowContext.prototype.isInLoop = function() {
			var i = this.scopes.length;
			while (i-- > 0) if (this.scopes[i].isLoop) return true;
			return false;
		};
		FullFlowContext.prototype.pushScope = function(isLoop) {
			var scope = {
				labels: {},
				locals: [],
				deferredGotos: [],
				isLoop: !!isLoop
			};
			this.scopes.push(scope);
		};
		FullFlowContext.prototype.popScope = function() {
			for (var i = 0; i < this.pendingGotos.length; ++i) {
				var theGoto = this.pendingGotos[i];
				if (theGoto.maxDepth >= this.scopes.length) {
					if (--theGoto.maxDepth <= 0) raise(theGoto.token, errors.labelNotVisible, theGoto.target);
				}
			}
			this.scopes.pop();
		};
		FullFlowContext.prototype.addGoto = function(target, token$1) {
			var localCounts = [];
			for (var i = 0; i < this.scopes.length; ++i) {
				var scope = this.scopes[i];
				localCounts.push(scope.locals.length);
				if (Object.prototype.hasOwnProperty.call(scope.labels, target)) return;
			}
			this.pendingGotos.push({
				maxDepth: this.scopes.length,
				target,
				token: token$1,
				localCounts
			});
		};
		FullFlowContext.prototype.addLabel = function(name, token$1) {
			var scope = this.currentScope();
			if (Object.prototype.hasOwnProperty.call(scope.labels, name)) raise(token$1, errors.labelAlreadyDefined, name, scope.labels[name].line);
			else {
				var newGotos = [];
				for (var i = 0; i < this.pendingGotos.length; ++i) {
					var theGoto = this.pendingGotos[i];
					if (theGoto.maxDepth >= this.scopes.length && theGoto.target === name) {
						if (theGoto.localCounts[this.scopes.length - 1] < scope.locals.length) scope.deferredGotos.push(theGoto);
						continue;
					}
					newGotos.push(theGoto);
				}
				this.pendingGotos = newGotos;
			}
			scope.labels[name] = {
				localCount: scope.locals.length,
				line: token$1.line
			};
		};
		FullFlowContext.prototype.addLocal = function(name, token$1) {
			this.currentScope().locals.push({
				name,
				token: token$1
			});
		};
		FullFlowContext.prototype.currentScope = function() {
			return this.scopes[this.scopes.length - 1];
		};
		FullFlowContext.prototype.raiseDeferredErrors = function() {
			var scope = this.currentScope();
			var bads = scope.deferredGotos;
			for (var i = 0; i < bads.length; ++i) {
				var theGoto = bads[i];
				raise(theGoto.token, errors.gotoJumpInLocalScope, theGoto.target, scope.locals[theGoto.localCounts[this.scopes.length - 1]].name);
			}
		};
		function LoopFlowContext() {
			this.level = 0;
			this.loopLevels = [];
		}
		LoopFlowContext.prototype.isInLoop = function() {
			return !!this.loopLevels.length;
		};
		LoopFlowContext.prototype.pushScope = function(isLoop) {
			++this.level;
			if (isLoop) this.loopLevels.push(this.level);
		};
		LoopFlowContext.prototype.popScope = function() {
			var levels = this.loopLevels;
			var levlen = levels.length;
			if (levlen) {
				if (levels[levlen - 1] === this.level) levels.pop();
			}
			--this.level;
		};
		LoopFlowContext.prototype.addGoto = LoopFlowContext.prototype.addLabel = function() {
			throw new Error("This should never happen");
		};
		LoopFlowContext.prototype.addLocal = LoopFlowContext.prototype.raiseDeferredErrors = function() {};
		function makeFlowContext() {
			return features.labels ? new FullFlowContext() : new LoopFlowContext();
		}
		function parseChunk() {
			next();
			markLocation();
			if (options.scope) createScope();
			var flowContext = makeFlowContext();
			flowContext.allowVararg = true;
			flowContext.pushScope();
			var body = parseBlock(flowContext);
			flowContext.popScope();
			if (options.scope) destroyScope();
			if (EOF !== token.type) unexpected(token);
			if (trackLocations && !body.length) previousToken = token;
			return finishNode(ast.chunk(body));
		}
		function parseBlock(flowContext) {
			var block = [], statement;
			while (!isBlockFollow(token)) {
				if ("return" === token.value || !features.relaxedBreak && "break" === token.value) {
					block.push(parseStatement(flowContext));
					break;
				}
				statement = parseStatement(flowContext);
				consume(";");
				if (statement) block.push(statement);
			}
			return block;
		}
		function parseStatement(flowContext) {
			markLocation();
			if (Punctuator === token.type) {
				if (consume("::")) return parseLabelStatement(flowContext);
			}
			if (features.emptyStatement) {
				if (consume(";")) {
					if (trackLocations) locations.pop();
					return;
				}
			}
			flowContext.raiseDeferredErrors();
			if (Keyword === token.type) switch (token.value) {
				case "local":
					next();
					return parseLocalStatement(flowContext);
				case "if":
					next();
					return parseIfStatement(flowContext);
				case "return":
					next();
					return parseReturnStatement(flowContext);
				case "function":
					next();
					return parseFunctionDeclaration(parseFunctionName());
				case "while":
					next();
					return parseWhileStatement(flowContext);
				case "for":
					next();
					return parseForStatement(flowContext);
				case "repeat":
					next();
					return parseRepeatStatement(flowContext);
				case "break":
					next();
					if (!flowContext.isInLoop()) raise(token, errors.noLoopToBreak, token.value);
					return parseBreakStatement();
				case "do":
					next();
					return parseDoStatement(flowContext);
				case "goto":
					next();
					return parseGotoStatement(flowContext);
			}
			if (features.contextualGoto && token.type === Identifier && token.value === "goto" && lookahead.type === Identifier && lookahead.value !== "goto") {
				next();
				return parseGotoStatement(flowContext);
			}
			if (trackLocations) locations.pop();
			return parseAssignmentOrCallStatement(flowContext);
		}
		function parseLabelStatement(flowContext) {
			var nameToken = token, label = parseIdentifier();
			if (options.scope) {
				scopeIdentifierName("::" + nameToken.value + "::");
				attachScope(label, true);
			}
			expect("::");
			flowContext.addLabel(nameToken.value, nameToken);
			return finishNode(ast.labelStatement(label));
		}
		function parseBreakStatement() {
			return finishNode(ast.breakStatement());
		}
		function parseGotoStatement(flowContext) {
			var name = token.value, gotoToken = previousToken, label = parseIdentifier();
			flowContext.addGoto(name, gotoToken);
			return finishNode(ast.gotoStatement(label));
		}
		function parseDoStatement(flowContext) {
			if (options.scope) createScope();
			flowContext.pushScope();
			var body = parseBlock(flowContext);
			flowContext.popScope();
			if (options.scope) destroyScope();
			expect("end");
			return finishNode(ast.doStatement(body));
		}
		function parseWhileStatement(flowContext) {
			var condition = parseExpectedExpression(flowContext);
			expect("do");
			if (options.scope) createScope();
			flowContext.pushScope(true);
			var body = parseBlock(flowContext);
			flowContext.popScope();
			if (options.scope) destroyScope();
			expect("end");
			return finishNode(ast.whileStatement(condition, body));
		}
		function parseRepeatStatement(flowContext) {
			if (options.scope) createScope();
			flowContext.pushScope(true);
			var body = parseBlock(flowContext);
			expect("until");
			flowContext.raiseDeferredErrors();
			var condition = parseExpectedExpression(flowContext);
			flowContext.popScope();
			if (options.scope) destroyScope();
			return finishNode(ast.repeatStatement(condition, body));
		}
		function parseReturnStatement(flowContext) {
			var expressions = [];
			if ("end" !== token.value) {
				var expression = parseExpression(flowContext);
				if (null != expression) expressions.push(expression);
				while (consume(",")) {
					expression = parseExpectedExpression(flowContext);
					expressions.push(expression);
				}
				consume(";");
			}
			return finishNode(ast.returnStatement(expressions));
		}
		function parseIfStatement(flowContext) {
			var clauses = [], condition, body, marker;
			if (trackLocations) {
				marker = locations[locations.length - 1];
				locations.push(marker);
			}
			condition = parseExpectedExpression(flowContext);
			expect("then");
			if (options.scope) createScope();
			flowContext.pushScope();
			body = parseBlock(flowContext);
			flowContext.popScope();
			if (options.scope) destroyScope();
			clauses.push(finishNode(ast.ifClause(condition, body)));
			if (trackLocations) marker = createLocationMarker();
			while (consume("elseif")) {
				pushLocation(marker);
				condition = parseExpectedExpression(flowContext);
				expect("then");
				if (options.scope) createScope();
				flowContext.pushScope();
				body = parseBlock(flowContext);
				flowContext.popScope();
				if (options.scope) destroyScope();
				clauses.push(finishNode(ast.elseifClause(condition, body)));
				if (trackLocations) marker = createLocationMarker();
			}
			if (consume("else")) {
				if (trackLocations) {
					marker = new Marker(previousToken);
					locations.push(marker);
				}
				if (options.scope) createScope();
				flowContext.pushScope();
				body = parseBlock(flowContext);
				flowContext.popScope();
				if (options.scope) destroyScope();
				clauses.push(finishNode(ast.elseClause(body)));
			}
			expect("end");
			return finishNode(ast.ifStatement(clauses));
		}
		function parseForStatement(flowContext) {
			var variable = parseIdentifier(), body;
			if (options.scope) {
				createScope();
				scopeIdentifier(variable);
			}
			if (consume("=")) {
				var start = parseExpectedExpression(flowContext);
				expect(",");
				var end$1 = parseExpectedExpression(flowContext);
				var step = consume(",") ? parseExpectedExpression(flowContext) : null;
				expect("do");
				flowContext.pushScope(true);
				body = parseBlock(flowContext);
				flowContext.popScope();
				expect("end");
				if (options.scope) destroyScope();
				return finishNode(ast.forNumericStatement(variable, start, end$1, step, body));
			} else {
				var variables = [variable];
				while (consume(",")) {
					variable = parseIdentifier();
					if (options.scope) scopeIdentifier(variable);
					variables.push(variable);
				}
				expect("in");
				var iterators = [];
				do {
					var expression = parseExpectedExpression(flowContext);
					iterators.push(expression);
				} while (consume(","));
				expect("do");
				flowContext.pushScope(true);
				body = parseBlock(flowContext);
				flowContext.popScope();
				expect("end");
				if (options.scope) destroyScope();
				return finishNode(ast.forGenericStatement(variables, iterators, body));
			}
		}
		function parseLocalStatement(flowContext) {
			var name, declToken = previousToken;
			if (Identifier === token.type) {
				var variables = [], init = [];
				do {
					name = parseIdentifier();
					variables.push(name);
					flowContext.addLocal(name.name, declToken);
				} while (consume(","));
				if (consume("=")) do {
					var expression = parseExpectedExpression(flowContext);
					init.push(expression);
				} while (consume(","));
				if (options.scope) for (var i = 0, l = variables.length; i < l; ++i) scopeIdentifier(variables[i]);
				return finishNode(ast.localStatement(variables, init));
			}
			if (consume("function")) {
				name = parseIdentifier();
				flowContext.addLocal(name.name, declToken);
				if (options.scope) {
					scopeIdentifier(name);
					createScope();
				}
				return parseFunctionDeclaration(name, true);
			} else raiseUnexpectedToken("<name>", token);
		}
		function parseAssignmentOrCallStatement(flowContext) {
			var marker, startMarker;
			var lvalue, base, name;
			var targets = [];
			if (trackLocations) startMarker = createLocationMarker();
			do {
				if (trackLocations) marker = createLocationMarker();
				if (Identifier === token.type) {
					name = token.value;
					base = parseIdentifier();
					if (options.scope) attachScope(base, scopeHasName(name));
					lvalue = true;
				} else if ("(" === token.value) {
					next();
					base = parseExpectedExpression(flowContext);
					expect(")");
					lvalue = false;
				} else return unexpected(token);
				both: for (;;) {
					switch (StringLiteral === token.type ? "\"" : token.value) {
						case ".":
						case "[":
							lvalue = true;
							break;
						case ":":
						case "(":
						case "{":
						case "\"":
							lvalue = null;
							break;
						default: break both;
					}
					base = parsePrefixExpressionPart(base, marker, flowContext);
				}
				targets.push(base);
				if ("," !== token.value) break;
				if (!lvalue) return unexpected(token);
				next();
			} while (true);
			if (targets.length === 1 && lvalue === null) {
				pushLocation(marker);
				return finishNode(ast.callStatement(targets[0]));
			} else if (!lvalue) return unexpected(token);
			expect("=");
			var values = [];
			do
				values.push(parseExpectedExpression(flowContext));
			while (consume(","));
			pushLocation(startMarker);
			return finishNode(ast.assignmentStatement(targets, values));
		}
		function parseIdentifier() {
			markLocation();
			var identifier = token.value;
			if (Identifier !== token.type) raiseUnexpectedToken("<name>", token);
			next();
			return finishNode(ast.identifier(identifier));
		}
		function parseFunctionDeclaration(name, isLocal) {
			var flowContext = makeFlowContext();
			flowContext.pushScope();
			var parameters = [];
			expect("(");
			if (!consume(")")) while (true) {
				if (Identifier === token.type) {
					var parameter = parseIdentifier();
					if (options.scope) scopeIdentifier(parameter);
					parameters.push(parameter);
					if (consume(",")) continue;
				} else if (VarargLiteral === token.type) {
					flowContext.allowVararg = true;
					parameters.push(parsePrimaryExpression(flowContext));
				} else raiseUnexpectedToken("<name> or '...'", token);
				expect(")");
				break;
			}
			var body = parseBlock(flowContext);
			flowContext.popScope();
			expect("end");
			if (options.scope) destroyScope();
			isLocal = isLocal || false;
			return finishNode(ast.functionStatement(name, parameters, isLocal, body));
		}
		function parseFunctionName() {
			var base, name, marker;
			if (trackLocations) marker = createLocationMarker();
			base = parseIdentifier();
			if (options.scope) {
				attachScope(base, scopeHasName(base.name));
				createScope();
			}
			while (consume(".")) {
				pushLocation(marker);
				name = parseIdentifier();
				base = finishNode(ast.memberExpression(base, ".", name));
			}
			if (consume(":")) {
				pushLocation(marker);
				name = parseIdentifier();
				base = finishNode(ast.memberExpression(base, ":", name));
				if (options.scope) scopeIdentifierName("self");
			}
			return base;
		}
		function parseTableConstructor(flowContext) {
			var fields = [], key, value;
			while (true) {
				markLocation();
				if (Punctuator === token.type && consume("[")) {
					key = parseExpectedExpression(flowContext);
					expect("]");
					expect("=");
					value = parseExpectedExpression(flowContext);
					fields.push(finishNode(ast.tableKey(key, value)));
				} else if (Identifier === token.type) if ("=" === lookahead.value) {
					key = parseIdentifier();
					next();
					value = parseExpectedExpression(flowContext);
					fields.push(finishNode(ast.tableKeyString(key, value)));
				} else {
					value = parseExpectedExpression(flowContext);
					fields.push(finishNode(ast.tableValue(value)));
				}
				else {
					if (null == (value = parseExpression(flowContext))) {
						locations.pop();
						break;
					}
					fields.push(finishNode(ast.tableValue(value)));
				}
				if (",;".indexOf(token.value) >= 0) {
					next();
					continue;
				}
				break;
			}
			expect("}");
			return finishNode(ast.tableConstructorExpression(fields));
		}
		function parseExpression(flowContext) {
			return parseSubExpression(0, flowContext);
		}
		function parseExpectedExpression(flowContext) {
			var expression = parseExpression(flowContext);
			if (null == expression) raiseUnexpectedToken("<expression>", token);
			else return expression;
		}
		function binaryPrecedence(operator) {
			var charCode = operator.charCodeAt(0), length$1 = operator.length;
			if (1 === length$1) switch (charCode) {
				case 94: return 12;
				case 42:
				case 47:
				case 37: return 10;
				case 43:
				case 45: return 9;
				case 38: return 6;
				case 126: return 5;
				case 124: return 4;
				case 60:
				case 62: return 3;
			}
			else if (2 === length$1) switch (charCode) {
				case 47: return 10;
				case 46: return 8;
				case 60:
				case 62:
					if ("<<" === operator || ">>" === operator) return 7;
					return 3;
				case 61:
				case 126: return 3;
				case 111: return 1;
			}
			else if (97 === charCode && "and" === operator) return 2;
			return 0;
		}
		function parseSubExpression(minPrecedence, flowContext) {
			var operator = token.value, expression, marker;
			if (trackLocations) marker = createLocationMarker();
			if (isUnary(token)) {
				markLocation();
				next();
				var argument = parseSubExpression(10, flowContext);
				if (argument == null) raiseUnexpectedToken("<expression>", token);
				expression = finishNode(ast.unaryExpression(operator, argument));
			}
			if (null == expression) {
				expression = parsePrimaryExpression(flowContext);
				if (null == expression) expression = parsePrefixExpression(flowContext);
			}
			if (null == expression) return null;
			var precedence;
			while (true) {
				operator = token.value;
				precedence = Punctuator === token.type || Keyword === token.type ? binaryPrecedence(operator) : 0;
				if (precedence === 0 || precedence <= minPrecedence) break;
				if ("^" === operator || ".." === operator) --precedence;
				next();
				var right = parseSubExpression(precedence, flowContext);
				if (null == right) raiseUnexpectedToken("<expression>", token);
				if (trackLocations) locations.push(marker);
				expression = finishNode(ast.binaryExpression(operator, expression, right));
			}
			return expression;
		}
		function parsePrefixExpressionPart(base, marker, flowContext) {
			var expression, identifier;
			if (Punctuator === token.type) switch (token.value) {
				case "[":
					pushLocation(marker);
					next();
					expression = parseExpectedExpression(flowContext);
					expect("]");
					return finishNode(ast.indexExpression(base, expression));
				case ".":
					pushLocation(marker);
					next();
					identifier = parseIdentifier();
					return finishNode(ast.memberExpression(base, ".", identifier));
				case ":":
					pushLocation(marker);
					next();
					identifier = parseIdentifier();
					base = finishNode(ast.memberExpression(base, ":", identifier));
					pushLocation(marker);
					return parseCallExpression(base, flowContext);
				case "(":
				case "{":
					pushLocation(marker);
					return parseCallExpression(base, flowContext);
			}
			else if (StringLiteral === token.type) {
				pushLocation(marker);
				return parseCallExpression(base, flowContext);
			}
			return null;
		}
		function parsePrefixExpression(flowContext) {
			var base, name, marker;
			if (trackLocations) marker = createLocationMarker();
			if (Identifier === token.type) {
				name = token.value;
				base = parseIdentifier();
				if (options.scope) attachScope(base, scopeHasName(name));
			} else if (consume("(")) {
				base = parseExpectedExpression(flowContext);
				expect(")");
			} else return null;
			for (;;) {
				var newBase = parsePrefixExpressionPart(base, marker, flowContext);
				if (newBase === null) break;
				base = newBase;
			}
			return base;
		}
		function parseCallExpression(base, flowContext) {
			if (Punctuator === token.type) switch (token.value) {
				case "(":
					if (!features.emptyStatement) {
						if (token.line !== previousToken.line) raise(null, errors.ambiguousSyntax, token.value);
					}
					next();
					var expressions = [];
					var expression = parseExpression(flowContext);
					if (null != expression) expressions.push(expression);
					while (consume(",")) {
						expression = parseExpectedExpression(flowContext);
						expressions.push(expression);
					}
					expect(")");
					return finishNode(ast.callExpression(base, expressions));
				case "{":
					markLocation();
					next();
					var table = parseTableConstructor(flowContext);
					return finishNode(ast.tableCallExpression(base, table));
			}
			else if (StringLiteral === token.type) return finishNode(ast.stringCallExpression(base, parsePrimaryExpression(flowContext)));
			raiseUnexpectedToken("function arguments", token);
		}
		function parsePrimaryExpression(flowContext) {
			var literals = StringLiteral | NumericLiteral | BooleanLiteral | NilLiteral | VarargLiteral, value = token.value, type = token.type, marker;
			if (trackLocations) marker = createLocationMarker();
			if (type === VarargLiteral && !flowContext.allowVararg) raise(token, errors.cannotUseVararg, token.value);
			if (type & literals) {
				pushLocation(marker);
				var raw = input.slice(token.range[0], token.range[1]);
				next();
				return finishNode(ast.literal(type, value, raw));
			} else if (Keyword === type && "function" === value) {
				pushLocation(marker);
				next();
				if (options.scope) createScope();
				return parseFunctionDeclaration(null);
			} else if (consume("{")) {
				pushLocation(marker);
				return parseTableConstructor(flowContext);
			}
		}
		exports$1.parse = parse;
		var versionFeatures = {
			"5.1": {},
			"5.2": {
				labels: true,
				emptyStatement: true,
				hexEscapes: true,
				skipWhitespaceEscape: true,
				strictEscapes: true,
				relaxedBreak: true
			},
			"5.3": {
				labels: true,
				emptyStatement: true,
				hexEscapes: true,
				skipWhitespaceEscape: true,
				strictEscapes: true,
				unicodeEscapes: true,
				bitwiseOperators: true,
				integerDivision: true,
				relaxedBreak: true
			},
			"LuaJIT": {
				labels: true,
				contextualGoto: true,
				hexEscapes: true,
				skipWhitespaceEscape: true,
				strictEscapes: true,
				unicodeEscapes: true,
				imaginaryNumbers: true,
				integerSuffixes: true
			}
		};
		function parse(_input, _options) {
			if ("undefined" === typeof _options && "object" === typeof _input) {
				_options = _input;
				_input = void 0;
			}
			if (!_options) _options = {};
			input = _input || "";
			options = assign({}, defaultOptions, _options);
			index = 0;
			line = 1;
			lineStart = 0;
			length = input.length;
			scopes = [[]];
			scopeDepth = 0;
			globals = [];
			locations = [];
			if (!Object.prototype.hasOwnProperty.call(versionFeatures, options.luaVersion)) throw new Error(sprintf("Lua version '%1' not supported", options.luaVersion));
			features = assign({}, versionFeatures[options.luaVersion]);
			if (options.extendedIdentifiers !== void 0) features.extendedIdentifiers = !!options.extendedIdentifiers;
			if (!Object.prototype.hasOwnProperty.call(encodingModes, options.encodingMode)) throw new Error(sprintf("Encoding mode '%1' not supported", options.encodingMode));
			encodingMode = encodingModes[options.encodingMode];
			if (options.comments) comments = [];
			if (!options.wait) return end();
			return exports$1;
		}
		exports$1.write = write;
		function write(_input) {
			input += String(_input);
			length = input.length;
			return exports$1;
		}
		exports$1.end = end;
		function end(_input) {
			if ("undefined" !== typeof _input) write(_input);
			if (input && input.substr(0, 2) === "#!") input = input.replace(/^.*/, function(line$1) {
				return line$1.replace(/./g, " ");
			});
			length = input.length;
			trackLocations = options.locations || options.ranges;
			lookahead = lex();
			var chunk = parseChunk();
			if (options.comments) chunk.comments = comments;
			if (options.scope) chunk.globals = globals;
			/* istanbul ignore if */
			if (locations.length > 0) throw new Error("Location tracking failed. This is most likely a bug in luaparse");
			return chunk;
		}
	});
})))());
var LuaService = class extends BaseService {
	constructor(mode) {
		super(mode);
		this.serviceCapabilities = { diagnosticProvider: {
			interFileDependencies: true,
			workspaceDiagnostics: true
		} };
		this.$service = import_luaparse;
	}
	async doValidation(document) {
		let value = this.getDocumentValue(document.uri);
		if (!value) return [];
		let errors = [];
		try {
			this.$service.parse(value);
		} catch (e) {
			if (e instanceof this.$service.SyntaxError) errors.push({
				range: {
					start: {
						line: e.line - 1,
						character: e.column
					},
					end: {
						line: e.line - 1,
						character: e.column
					}
				},
				message: e.message,
				severity: 1
			});
		}
		return filterDiagnostics(errors, this.optionsToFilterDiagnostics);
	}
};
export { LuaService };
