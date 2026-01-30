import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { n as require_deep_copy, t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_tokenizer } from "./tokenizer-C2b-GJMk.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
var require_text_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var deepCopy = require_deep_copy().deepCopy;
	var TextHighlightRules$1 = function() {
		this.$rules = { "start": [{
			token: "empty_line",
			regex: "^$"
		}, { defaultToken: "text" }] };
	};
	(function() {
		this.addRules = function(rules, prefix) {
			if (!prefix) {
				for (var key in rules) this.$rules[key] = rules[key];
				return;
			}
			for (var key in rules) {
				var state = rules[key];
				for (var i$1 = 0; i$1 < state.length; i$1++) {
					var rule = state[i$1];
					if (rule.next || rule.onMatch) {
						if (typeof rule.next == "string") {
							if (rule.next.indexOf(prefix) !== 0) rule.next = prefix + rule.next;
						}
						if (rule.nextState && rule.nextState.indexOf(prefix) !== 0) rule.nextState = prefix + rule.nextState;
					}
				}
				this.$rules[prefix + key] = state;
			}
		};
		this.getRules = function() {
			return this.$rules;
		};
		this.embedRules = function(HighlightRules, prefix, escapeRules, states, append) {
			var embedRules = typeof HighlightRules == "function" ? new HighlightRules().getRules() : HighlightRules;
			if (states) for (var i$1 = 0; i$1 < states.length; i$1++) states[i$1] = prefix + states[i$1];
			else {
				states = [];
				for (var key in embedRules) states.push(prefix + key);
			}
			this.addRules(embedRules, prefix);
			if (escapeRules) {
				var addRules = Array.prototype[append ? "push" : "unshift"];
				for (var i$1 = 0; i$1 < states.length; i$1++) addRules.apply(this.$rules[states[i$1]], deepCopy(escapeRules));
			}
			if (!this.$embeds) this.$embeds = [];
			this.$embeds.push(prefix);
		};
		this.getEmbeds = function() {
			return this.$embeds;
		};
		var pushState = function(currentState, stack) {
			if (currentState != "start" || stack.length) stack.unshift(this.nextState, currentState);
			return this.nextState;
		};
		var popState = function(currentState, stack) {
			stack.shift();
			return stack.shift() || "start";
		};
		this.normalizeRules = function() {
			var id = 0;
			var rules = this.$rules;
			function processState(key) {
				var state = rules[key];
				state["processed"] = true;
				for (var i$1 = 0; i$1 < state.length; i$1++) {
					var rule = state[i$1];
					var toInsert = null;
					if (Array.isArray(rule)) {
						toInsert = rule;
						rule = {};
					}
					if (!rule.regex && rule.start) {
						rule.regex = rule.start;
						if (!rule.next) rule.next = [];
						rule.next.push({ defaultToken: rule.token }, {
							token: rule.token + ".end",
							regex: rule.end || rule.start,
							next: "pop"
						});
						rule.token = rule.token + ".start";
						rule.push = true;
					}
					var next = rule.next || rule.push;
					if (next && Array.isArray(next)) {
						var stateName = rule.stateName;
						if (!stateName) {
							stateName = rule.token;
							if (typeof stateName != "string") stateName = stateName[0] || "";
							if (rules[stateName]) stateName += id++;
						}
						rules[stateName] = next;
						rule.next = stateName;
						processState(stateName);
					} else if (next == "pop") rule.next = popState;
					if (rule.push) {
						rule.nextState = rule.next || rule.push;
						rule.next = pushState;
						delete rule.push;
					}
					if (rule.rules) for (var r in rule.rules) if (rules[r]) {
						if (rules[r].push) rules[r].push.apply(rules[r], rule.rules[r]);
					} else rules[r] = rule.rules[r];
					var includeName = typeof rule == "string" ? rule : rule.include;
					if (includeName) {
						if (includeName === "$self") includeName = "start";
						if (Array.isArray(includeName)) toInsert = includeName.map(function(x) {
							return rules[x];
						});
						else toInsert = rules[includeName];
					}
					if (toInsert) {
						var args = [i$1, 1].concat(toInsert);
						if (rule.noEscape) args = args.filter(function(x) {
							return !x.next;
						});
						state.splice.apply(state, args);
						i$1--;
					}
					if (rule.keywordMap) {
						rule.token = this.createKeywordMapper(rule.keywordMap, rule.defaultToken || "text", rule.caseInsensitive);
						delete rule.defaultToken;
					}
				}
			}
			Object.keys(rules).forEach(processState, this);
		};
		this.createKeywordMapper = function(map, defaultToken, ignoreCase, splitChar) {
			var keywords = Object.create(null);
			this.$keywordList = [];
			Object.keys(map).forEach(function(className) {
				var list = map[className].split(splitChar || "|");
				for (var i$1 = list.length; i$1--;) {
					var word = list[i$1];
					this.$keywordList.push(word);
					if (ignoreCase) word = word.toLowerCase();
					keywords[word] = className;
				}
			}, this);
			map = null;
			return ignoreCase ? function(value) {
				return keywords[value.toLowerCase()] || defaultToken;
			} : function(value) {
				return keywords[value] || defaultToken;
			};
		};
		this.getKeywords = function() {
			return this.$keywords;
		};
	}).call(TextHighlightRules$1.prototype);
	exports.TextHighlightRules = TextHighlightRules$1;
}));
var require_behaviour = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Behaviour$1 = function() {
		this.$behaviours = {};
	};
	(function() {
		this.add = function(name, action, callback) {
			switch (void 0) {
				case this.$behaviours: this.$behaviours = {};
				case this.$behaviours[name]: this.$behaviours[name] = {};
			}
			this.$behaviours[name][action] = callback;
		};
		this.addBehaviours = function(behaviours) {
			for (var key in behaviours) for (var action in behaviours[key]) this.add(key, action, behaviours[key][action]);
		};
		this.remove = function(name) {
			if (this.$behaviours && this.$behaviours[name]) delete this.$behaviours[name];
		};
		this.inherit = function(mode, filter) {
			if (typeof mode === "function") var behaviours = new mode().getBehaviours(filter);
			else var behaviours = mode.getBehaviours(filter);
			this.addBehaviours(behaviours);
		};
		this.getBehaviours = function(filter) {
			if (!filter) return this.$behaviours;
			else {
				var ret = {};
				for (var i$1 = 0; i$1 < filter.length; i$1++) if (this.$behaviours[filter[i$1]]) ret[filter[i$1]] = this.$behaviours[filter[i$1]];
				return ret;
			}
		};
	}).call(Behaviour$1.prototype);
	exports.Behaviour = Behaviour$1;
}));
var require_cstyle = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var Behaviour = require_behaviour().Behaviour;
	var TokenIterator$1 = require_token_iterator().TokenIterator;
	var lang$1 = require_lang();
	var SAFE_INSERT_IN_TOKENS = [
		"text",
		"paren.rparen",
		"rparen",
		"paren",
		"punctuation.operator"
	];
	var SAFE_INSERT_BEFORE_TOKENS = [
		"text",
		"paren.rparen",
		"rparen",
		"paren",
		"punctuation.operator",
		"comment"
	];
	var context;
	var contextCache = {};
	var defaultQuotes = {
		"\"": "\"",
		"'": "'"
	};
	var initContext = function(editor) {
		var id = -1;
		if (editor.multiSelect) {
			id = editor.selection.index;
			if (contextCache.rangeCount != editor.multiSelect.rangeCount) contextCache = { rangeCount: editor.multiSelect.rangeCount };
		}
		if (contextCache[id]) return context = contextCache[id];
		context = contextCache[id] = {
			autoInsertedBrackets: 0,
			autoInsertedRow: -1,
			autoInsertedLineEnd: "",
			maybeInsertedBrackets: 0,
			maybeInsertedRow: -1,
			maybeInsertedLineStart: "",
			maybeInsertedLineEnd: ""
		};
	};
	var getWrapped = function(selection, selected, opening, closing) {
		var rowDiff = selection.end.row - selection.start.row;
		return {
			text: opening + selected + closing,
			selection: [
				0,
				selection.start.column + 1,
				rowDiff,
				selection.end.column + (rowDiff ? 0 : 1)
			]
		};
	};
	var CstyleBehaviour$1 = function(options) {
		options = options || {};
		this.add("braces", "insertion", function(state, action, editor, session, text) {
			var cursor = editor.getCursorPosition();
			var line = session.doc.getLine(cursor.row);
			if (text == "{") {
				initContext(editor);
				var selection = editor.getSelectionRange();
				var selected = session.doc.getTextRange(selection);
				var token = session.getTokenAt(cursor.row, cursor.column);
				if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) return getWrapped(selection, selected, "{", "}");
				else if (token && /(?:string)\.quasi|\.xml/.test(token.type)) {
					if ([/tag\-(?:open|name)/, /attribute\-name/].some((el) => el.test(token.type)) || /(string)\.quasi/.test(token.type) && token.value[cursor.column - token.start - 1] !== "$") return;
					CstyleBehaviour$1.recordAutoInsert(editor, session, "}");
					return {
						text: "{}",
						selection: [1, 1]
					};
				} else if (CstyleBehaviour$1.isSaneInsertion(editor, session)) if (/[\]\}\)]/.test(line[cursor.column]) || editor.inMultiSelectMode || options.braces) {
					CstyleBehaviour$1.recordAutoInsert(editor, session, "}");
					return {
						text: "{}",
						selection: [1, 1]
					};
				} else {
					CstyleBehaviour$1.recordMaybeInsert(editor, session, "{");
					return {
						text: "{",
						selection: [1, 1]
					};
				}
			} else if (text == "}") {
				initContext(editor);
				var rightChar = line.substring(cursor.column, cursor.column + 1);
				if (rightChar == "}") {
					if (session.$findOpeningBracket("}", {
						column: cursor.column + 1,
						row: cursor.row
					}) !== null && CstyleBehaviour$1.isAutoInsertedClosing(cursor, line, text)) {
						CstyleBehaviour$1.popAutoInsertedClosing();
						return {
							text: "",
							selection: [1, 1]
						};
					}
				}
			} else if (text == "\n" || text == "\r\n") {
				initContext(editor);
				var closing = "";
				if (CstyleBehaviour$1.isMaybeInsertedClosing(cursor, line)) {
					closing = lang$1.stringRepeat("}", context.maybeInsertedBrackets);
					CstyleBehaviour$1.clearMaybeInsertedClosing();
				}
				var rightChar = line.substring(cursor.column, cursor.column + 1);
				if (rightChar === "}") {
					var openBracePos = session.findMatchingBracket({
						row: cursor.row,
						column: cursor.column + 1
					}, "}");
					if (!openBracePos) return null;
					var next_indent = this.$getIndent(session.getLine(openBracePos.row));
				} else if (closing) var next_indent = this.$getIndent(line);
				else {
					CstyleBehaviour$1.clearMaybeInsertedClosing();
					return;
				}
				var indent = next_indent + session.getTabString();
				return {
					text: "\n" + indent + "\n" + next_indent + closing,
					selection: [
						1,
						indent.length,
						1,
						indent.length
					]
				};
			} else CstyleBehaviour$1.clearMaybeInsertedClosing();
		});
		this.add("braces", "deletion", function(state, action, editor, session, range) {
			var selected = session.doc.getTextRange(range);
			if (!range.isMultiLine() && selected == "{") {
				initContext(editor);
				if (session.doc.getLine(range.start.row).substring(range.end.column, range.end.column + 1) == "}") {
					range.end.column++;
					return range;
				} else context.maybeInsertedBrackets--;
			}
		});
		this.add("parens", "insertion", function(state, action, editor, session, text) {
			if (text == "(") {
				initContext(editor);
				var selection = editor.getSelectionRange();
				var selected = session.doc.getTextRange(selection);
				if (selected !== "" && editor.getWrapBehavioursEnabled()) return getWrapped(selection, selected, "(", ")");
				else if (CstyleBehaviour$1.isSaneInsertion(editor, session)) {
					CstyleBehaviour$1.recordAutoInsert(editor, session, ")");
					return {
						text: "()",
						selection: [1, 1]
					};
				}
			} else if (text == ")") {
				initContext(editor);
				var cursor = editor.getCursorPosition();
				var line = session.doc.getLine(cursor.row);
				if (line.substring(cursor.column, cursor.column + 1) == ")") {
					if (session.$findOpeningBracket(")", {
						column: cursor.column + 1,
						row: cursor.row
					}) !== null && CstyleBehaviour$1.isAutoInsertedClosing(cursor, line, text)) {
						CstyleBehaviour$1.popAutoInsertedClosing();
						return {
							text: "",
							selection: [1, 1]
						};
					}
				}
			}
		});
		this.add("parens", "deletion", function(state, action, editor, session, range) {
			var selected = session.doc.getTextRange(range);
			if (!range.isMultiLine() && selected == "(") {
				initContext(editor);
				if (session.doc.getLine(range.start.row).substring(range.start.column + 1, range.start.column + 2) == ")") {
					range.end.column++;
					return range;
				}
			}
		});
		this.add("brackets", "insertion", function(state, action, editor, session, text) {
			if (text == "[") {
				initContext(editor);
				var selection = editor.getSelectionRange();
				var selected = session.doc.getTextRange(selection);
				if (selected !== "" && editor.getWrapBehavioursEnabled()) return getWrapped(selection, selected, "[", "]");
				else if (CstyleBehaviour$1.isSaneInsertion(editor, session)) {
					CstyleBehaviour$1.recordAutoInsert(editor, session, "]");
					return {
						text: "[]",
						selection: [1, 1]
					};
				}
			} else if (text == "]") {
				initContext(editor);
				var cursor = editor.getCursorPosition();
				var line = session.doc.getLine(cursor.row);
				if (line.substring(cursor.column, cursor.column + 1) == "]") {
					if (session.$findOpeningBracket("]", {
						column: cursor.column + 1,
						row: cursor.row
					}) !== null && CstyleBehaviour$1.isAutoInsertedClosing(cursor, line, text)) {
						CstyleBehaviour$1.popAutoInsertedClosing();
						return {
							text: "",
							selection: [1, 1]
						};
					}
				}
			}
		});
		this.add("brackets", "deletion", function(state, action, editor, session, range) {
			var selected = session.doc.getTextRange(range);
			if (!range.isMultiLine() && selected == "[") {
				initContext(editor);
				if (session.doc.getLine(range.start.row).substring(range.start.column + 1, range.start.column + 2) == "]") {
					range.end.column++;
					return range;
				}
			}
		});
		this.add("string_dquotes", "insertion", function(state, action, editor, session, text) {
			var quotes = session.$mode.$quotes || defaultQuotes;
			if (text.length == 1 && quotes[text]) {
				if (this.lineCommentStart && this.lineCommentStart.indexOf(text) != -1) return;
				initContext(editor);
				var quote = text;
				var selection = editor.getSelectionRange();
				var selected = session.doc.getTextRange(selection);
				if (selected !== "" && (selected.length != 1 || !quotes[selected]) && editor.getWrapBehavioursEnabled()) return getWrapped(selection, selected, quote, quote);
				else if (!selected) {
					var cursor = editor.getCursorPosition();
					var line = session.doc.getLine(cursor.row);
					var leftChar = line.substring(cursor.column - 1, cursor.column);
					var rightChar = line.substring(cursor.column, cursor.column + 1);
					var token = session.getTokenAt(cursor.row, cursor.column);
					var rightToken = session.getTokenAt(cursor.row, cursor.column + 1);
					if (leftChar == "\\" && token && /escape/.test(token.type)) return null;
					var stringBefore = token && /string|escape/.test(token.type);
					var stringAfter = !rightToken || /string|escape/.test(rightToken.type);
					var pair;
					if (rightChar == quote) {
						pair = stringBefore !== stringAfter;
						if (pair && /string\.end/.test(rightToken.type)) pair = false;
					} else {
						if (stringBefore && !stringAfter) return null;
						if (stringBefore && stringAfter) return null;
						var wordRe = session.$mode.tokenRe;
						wordRe.lastIndex = 0;
						var isWordBefore = wordRe.test(leftChar);
						wordRe.lastIndex = 0;
						var isWordAfter = wordRe.test(rightChar);
						var pairQuotesAfter = session.$mode.$pairQuotesAfter;
						if (!(pairQuotesAfter && pairQuotesAfter[quote] && pairQuotesAfter[quote].test(leftChar)) && isWordBefore || isWordAfter) return null;
						if (rightChar && !/[\s;,.})\]\\]/.test(rightChar)) return null;
						var charBefore = line[cursor.column - 2];
						if (leftChar == quote && (charBefore == quote || wordRe.test(charBefore))) return null;
						pair = true;
					}
					return {
						text: pair ? quote + quote : "",
						selection: [1, 1]
					};
				}
			}
		});
		this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
			var quotes = session.$mode.$quotes || defaultQuotes;
			var selected = session.doc.getTextRange(range);
			if (!range.isMultiLine() && quotes.hasOwnProperty(selected)) {
				initContext(editor);
				if (session.doc.getLine(range.start.row).substring(range.start.column + 1, range.start.column + 2) == selected) {
					range.end.column++;
					return range;
				}
			}
		});
		if (options.closeDocComment !== false) this.add("doc comment end", "insertion", function(state, action, editor, session, text) {
			if (state === "doc-start" && (text === "\n" || text === "\r\n") && editor.selection.isEmpty()) {
				var cursor = editor.getCursorPosition();
				if (cursor.column === 0) return;
				var line = session.doc.getLine(cursor.row);
				var nextLine = session.doc.getLine(cursor.row + 1);
				var tokens = session.getTokens(cursor.row);
				var index = 0;
				for (var i$1 = 0; i$1 < tokens.length; i$1++) {
					index += tokens[i$1].value.length;
					var currentToken = tokens[i$1];
					if (index >= cursor.column) {
						if (index === cursor.column) {
							if (!/\.doc/.test(currentToken.type)) return;
							if (/\*\//.test(currentToken.value)) {
								var nextToken = tokens[i$1 + 1];
								if (!nextToken || !/\.doc/.test(nextToken.type)) return;
							}
						}
						var cursorPosInToken = cursor.column - (index - currentToken.value.length);
						var closeDocPos = currentToken.value.indexOf("*/");
						var openDocPos = currentToken.value.indexOf("/**", closeDocPos > -1 ? closeDocPos + 2 : 0);
						if (openDocPos !== -1 && cursorPosInToken > openDocPos && cursorPosInToken < openDocPos + 3) return;
						if (closeDocPos !== -1 && openDocPos !== -1 && cursorPosInToken >= closeDocPos && cursorPosInToken <= openDocPos || !/\.doc/.test(currentToken.type)) return;
						break;
					}
				}
				var indent = this.$getIndent(line);
				if (/\s*\*/.test(nextLine)) if (/^\s*\*/.test(line)) return {
					text: text + indent + "* ",
					selection: [
						1,
						2 + indent.length,
						1,
						2 + indent.length
					]
				};
				else return {
					text: text + indent + " * ",
					selection: [
						1,
						3 + indent.length,
						1,
						3 + indent.length
					]
				};
				if (/\/\*\*/.test(line.substring(0, cursor.column))) return {
					text: text + indent + " * " + text + " " + indent + "*/",
					selection: [
						1,
						4 + indent.length,
						1,
						4 + indent.length
					]
				};
			}
		});
	};
	CstyleBehaviour$1.isSaneInsertion = function(editor, session) {
		var cursor = editor.getCursorPosition();
		var iterator = new TokenIterator$1(session, cursor.row, cursor.column);
		if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
			if (/[)}\]]/.test(editor.session.getLine(cursor.row)[cursor.column])) return true;
			var iterator2 = new TokenIterator$1(session, cursor.row, cursor.column + 1);
			if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) return false;
		}
		iterator.stepForward();
		return iterator.getCurrentTokenRow() !== cursor.row || this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
	};
	CstyleBehaviour$1["$matchTokenType"] = function(token, types) {
		return types.indexOf(token.type || token) > -1;
	};
	CstyleBehaviour$1["recordAutoInsert"] = function(editor, session, bracket) {
		var cursor = editor.getCursorPosition();
		var line = session.doc.getLine(cursor.row);
		if (!this["isAutoInsertedClosing"](cursor, line, context.autoInsertedLineEnd[0])) context.autoInsertedBrackets = 0;
		context.autoInsertedRow = cursor.row;
		context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
		context.autoInsertedBrackets++;
	};
	CstyleBehaviour$1["recordMaybeInsert"] = function(editor, session, bracket) {
		var cursor = editor.getCursorPosition();
		var line = session.doc.getLine(cursor.row);
		if (!this["isMaybeInsertedClosing"](cursor, line)) context.maybeInsertedBrackets = 0;
		context.maybeInsertedRow = cursor.row;
		context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
		context.maybeInsertedLineEnd = line.substr(cursor.column);
		context.maybeInsertedBrackets++;
	};
	CstyleBehaviour$1["isAutoInsertedClosing"] = function(cursor, line, bracket) {
		return context.autoInsertedBrackets > 0 && cursor.row === context.autoInsertedRow && bracket === context.autoInsertedLineEnd[0] && line.substr(cursor.column) === context.autoInsertedLineEnd;
	};
	CstyleBehaviour$1["isMaybeInsertedClosing"] = function(cursor, line) {
		return context.maybeInsertedBrackets > 0 && cursor.row === context.maybeInsertedRow && line.substr(cursor.column) === context.maybeInsertedLineEnd && line.substr(0, cursor.column) == context.maybeInsertedLineStart;
	};
	CstyleBehaviour$1["popAutoInsertedClosing"] = function() {
		context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
		context.autoInsertedBrackets--;
	};
	CstyleBehaviour$1["clearMaybeInsertedClosing"] = function() {
		if (context) {
			context.maybeInsertedBrackets = 0;
			context.maybeInsertedRow = -1;
		}
	};
	oop.inherits(CstyleBehaviour$1, Behaviour);
	exports.CstyleBehaviour = CstyleBehaviour$1;
}));
var require_unicode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var wordChars = [
		48,
		9,
		8,
		25,
		5,
		0,
		2,
		25,
		48,
		0,
		11,
		0,
		5,
		0,
		6,
		22,
		2,
		30,
		2,
		457,
		5,
		11,
		15,
		4,
		8,
		0,
		2,
		0,
		18,
		116,
		2,
		1,
		3,
		3,
		9,
		0,
		2,
		2,
		2,
		0,
		2,
		19,
		2,
		82,
		2,
		138,
		2,
		4,
		3,
		155,
		12,
		37,
		3,
		0,
		8,
		38,
		10,
		44,
		2,
		0,
		2,
		1,
		2,
		1,
		2,
		0,
		9,
		26,
		6,
		2,
		30,
		10,
		7,
		61,
		2,
		9,
		5,
		101,
		2,
		7,
		3,
		9,
		2,
		18,
		3,
		0,
		17,
		58,
		3,
		100,
		15,
		53,
		5,
		0,
		6,
		45,
		211,
		57,
		3,
		18,
		2,
		5,
		3,
		11,
		3,
		9,
		2,
		1,
		7,
		6,
		2,
		2,
		2,
		7,
		3,
		1,
		3,
		21,
		2,
		6,
		2,
		0,
		4,
		3,
		3,
		8,
		3,
		1,
		3,
		3,
		9,
		0,
		5,
		1,
		2,
		4,
		3,
		11,
		16,
		2,
		2,
		5,
		5,
		1,
		3,
		21,
		2,
		6,
		2,
		1,
		2,
		1,
		2,
		1,
		3,
		0,
		2,
		4,
		5,
		1,
		3,
		2,
		4,
		0,
		8,
		3,
		2,
		0,
		8,
		15,
		12,
		2,
		2,
		8,
		2,
		2,
		2,
		21,
		2,
		6,
		2,
		1,
		2,
		4,
		3,
		9,
		2,
		2,
		2,
		2,
		3,
		0,
		16,
		3,
		3,
		9,
		18,
		2,
		2,
		7,
		3,
		1,
		3,
		21,
		2,
		6,
		2,
		1,
		2,
		4,
		3,
		8,
		3,
		1,
		3,
		2,
		9,
		1,
		5,
		1,
		2,
		4,
		3,
		9,
		2,
		0,
		17,
		1,
		2,
		5,
		4,
		2,
		2,
		3,
		4,
		1,
		2,
		0,
		2,
		1,
		4,
		1,
		4,
		2,
		4,
		11,
		5,
		4,
		4,
		2,
		2,
		3,
		3,
		0,
		7,
		0,
		15,
		9,
		18,
		2,
		2,
		7,
		2,
		2,
		2,
		22,
		2,
		9,
		2,
		4,
		4,
		7,
		2,
		2,
		2,
		3,
		8,
		1,
		2,
		1,
		7,
		3,
		3,
		9,
		19,
		1,
		2,
		7,
		2,
		2,
		2,
		22,
		2,
		9,
		2,
		4,
		3,
		8,
		2,
		2,
		2,
		3,
		8,
		1,
		8,
		0,
		2,
		3,
		3,
		9,
		19,
		1,
		2,
		7,
		2,
		2,
		2,
		22,
		2,
		15,
		4,
		7,
		2,
		2,
		2,
		3,
		10,
		0,
		9,
		3,
		3,
		9,
		11,
		5,
		3,
		1,
		2,
		17,
		4,
		23,
		2,
		8,
		2,
		0,
		3,
		6,
		4,
		0,
		5,
		5,
		2,
		0,
		2,
		7,
		19,
		1,
		14,
		57,
		6,
		14,
		2,
		9,
		40,
		1,
		2,
		0,
		3,
		1,
		2,
		0,
		3,
		0,
		7,
		3,
		2,
		6,
		2,
		2,
		2,
		0,
		2,
		0,
		3,
		1,
		2,
		12,
		2,
		2,
		3,
		4,
		2,
		0,
		2,
		5,
		3,
		9,
		3,
		1,
		35,
		0,
		24,
		1,
		7,
		9,
		12,
		0,
		2,
		0,
		2,
		0,
		5,
		9,
		2,
		35,
		5,
		19,
		2,
		5,
		5,
		7,
		2,
		35,
		10,
		0,
		58,
		73,
		7,
		77,
		3,
		37,
		11,
		42,
		2,
		0,
		4,
		328,
		2,
		3,
		3,
		6,
		2,
		0,
		2,
		3,
		3,
		40,
		2,
		3,
		3,
		32,
		2,
		3,
		3,
		6,
		2,
		0,
		2,
		3,
		3,
		14,
		2,
		56,
		2,
		3,
		3,
		66,
		5,
		0,
		33,
		15,
		17,
		84,
		13,
		619,
		3,
		16,
		2,
		25,
		6,
		74,
		22,
		12,
		2,
		6,
		12,
		20,
		12,
		19,
		13,
		12,
		2,
		2,
		2,
		1,
		13,
		51,
		3,
		29,
		4,
		0,
		5,
		1,
		3,
		9,
		34,
		2,
		3,
		9,
		7,
		87,
		9,
		42,
		6,
		69,
		11,
		28,
		4,
		11,
		5,
		11,
		11,
		39,
		3,
		4,
		12,
		43,
		5,
		25,
		7,
		10,
		38,
		27,
		5,
		62,
		2,
		28,
		3,
		10,
		7,
		9,
		14,
		0,
		89,
		75,
		5,
		9,
		18,
		8,
		13,
		42,
		4,
		11,
		71,
		55,
		9,
		9,
		4,
		48,
		83,
		2,
		2,
		30,
		14,
		230,
		23,
		280,
		3,
		5,
		3,
		37,
		3,
		5,
		3,
		7,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		30,
		3,
		52,
		2,
		6,
		2,
		0,
		4,
		2,
		2,
		6,
		4,
		3,
		3,
		5,
		5,
		12,
		6,
		2,
		2,
		6,
		67,
		1,
		20,
		0,
		29,
		0,
		14,
		0,
		17,
		4,
		60,
		12,
		5,
		0,
		4,
		11,
		18,
		0,
		5,
		0,
		3,
		9,
		2,
		0,
		4,
		4,
		7,
		0,
		2,
		0,
		2,
		0,
		2,
		3,
		2,
		10,
		3,
		3,
		6,
		4,
		5,
		0,
		53,
		1,
		2684,
		46,
		2,
		46,
		2,
		132,
		7,
		6,
		15,
		37,
		11,
		53,
		10,
		0,
		17,
		22,
		10,
		6,
		2,
		6,
		2,
		6,
		2,
		6,
		2,
		6,
		2,
		6,
		2,
		6,
		2,
		6,
		2,
		31,
		48,
		0,
		470,
		1,
		36,
		5,
		2,
		4,
		6,
		1,
		5,
		85,
		3,
		1,
		3,
		2,
		2,
		89,
		2,
		3,
		6,
		40,
		4,
		93,
		18,
		23,
		57,
		15,
		513,
		6581,
		75,
		20939,
		53,
		1164,
		68,
		45,
		3,
		268,
		4,
		27,
		21,
		31,
		3,
		13,
		13,
		1,
		2,
		24,
		9,
		69,
		11,
		1,
		38,
		8,
		3,
		102,
		3,
		1,
		111,
		44,
		25,
		51,
		13,
		68,
		12,
		9,
		7,
		23,
		4,
		0,
		5,
		45,
		3,
		35,
		13,
		28,
		4,
		64,
		15,
		10,
		39,
		54,
		10,
		13,
		3,
		9,
		7,
		22,
		4,
		1,
		5,
		66,
		25,
		2,
		227,
		42,
		2,
		1,
		3,
		9,
		7,
		11171,
		13,
		22,
		5,
		48,
		8453,
		301,
		3,
		61,
		3,
		105,
		39,
		6,
		13,
		4,
		6,
		11,
		2,
		12,
		2,
		4,
		2,
		0,
		2,
		1,
		2,
		1,
		2,
		107,
		34,
		362,
		19,
		63,
		3,
		53,
		41,
		11,
		5,
		15,
		17,
		6,
		13,
		1,
		25,
		2,
		33,
		4,
		2,
		134,
		20,
		9,
		8,
		25,
		5,
		0,
		2,
		25,
		12,
		88,
		4,
		5,
		3,
		5,
		3,
		5,
		3,
		2
	];
	var code = 0;
	var str = [];
	for (var i = 0; i < wordChars.length; i += 2) {
		str.push(code += wordChars[i]);
		if (wordChars[i + 1]) str.push(45, code += wordChars[i + 1]);
	}
	exports.wordChars = String.fromCharCode.apply(null, str);
}));
var require_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	var config = require_config();
	var Tokenizer = require_tokenizer().Tokenizer;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CstyleBehaviour = require_cstyle().CstyleBehaviour;
	var unicode = require_unicode();
	var lang = require_lang();
	var TokenIterator = require_token_iterator().TokenIterator;
	var Range = require_range().Range;
	var Mode = function() {
		this.HighlightRules = TextHighlightRules;
	};
	(function() {
		this.$defaultBehaviour = new CstyleBehaviour();
		this.tokenRe = new RegExp("^[" + unicode.wordChars + "\\$_]+", "g");
		this.nonTokenRe = new RegExp("^(?:[^" + unicode.wordChars + "\\$_]|\\s])+", "g");
		this.getTokenizer = function() {
			if (!this.$tokenizer) {
				this.$highlightRules = this.$highlightRules || new this.HighlightRules(this.$highlightRuleConfig);
				this.$tokenizer = new Tokenizer(this.$highlightRules.getRules());
			}
			return this.$tokenizer;
		};
		this.lineCommentStart = "";
		this.blockComment = "";
		this.toggleCommentLines = function(state, session, startRow, endRow) {
			var doc = session.doc;
			var ignoreBlankLines = true;
			var shouldRemove = true;
			var minIndent = Infinity;
			var tabSize = session.getTabSize();
			var insertAtTabStop = false;
			if (!this.lineCommentStart) {
				if (!this.blockComment) return false;
				var lineCommentStart = this.blockComment.start;
				var lineCommentEnd = this.blockComment.end;
				var regexpStart = /* @__PURE__ */ new RegExp("^(\\s*)(?:" + lang.escapeRegExp(lineCommentStart) + ")");
				var regexpEnd = /* @__PURE__ */ new RegExp("(?:" + lang.escapeRegExp(lineCommentEnd) + ")\\s*$");
				var comment = function(line, i$1) {
					if (testRemove(line, i$1)) return;
					if (!ignoreBlankLines || /\S/.test(line)) {
						doc.insertInLine({
							row: i$1,
							column: line.length
						}, lineCommentEnd);
						doc.insertInLine({
							row: i$1,
							column: minIndent
						}, lineCommentStart);
					}
				};
				var uncomment = function(line, i$1) {
					var m;
					if (m = line.match(regexpEnd)) doc.removeInLine(i$1, line.length - m[0].length, line.length);
					if (m = line.match(regexpStart)) doc.removeInLine(i$1, m[1].length, m[0].length);
				};
				var testRemove = function(line, row) {
					if (regexpStart.test(line)) return true;
					var tokens = session.getTokens(row);
					for (var i$1 = 0; i$1 < tokens.length; i$1++) if (tokens[i$1].type === "comment") return true;
				};
			} else {
				if (Array.isArray(this.lineCommentStart)) {
					var regexpStart = this.lineCommentStart.map(lang.escapeRegExp).join("|");
					var lineCommentStart = this.lineCommentStart[0];
				} else {
					var regexpStart = lang.escapeRegExp(this.lineCommentStart);
					var lineCommentStart = this.lineCommentStart;
				}
				regexpStart = /* @__PURE__ */ new RegExp("^(\\s*)(?:" + regexpStart + ") ?");
				insertAtTabStop = session.getUseSoftTabs();
				var uncomment = function(line, i$1) {
					var m = line.match(regexpStart);
					if (!m) return;
					var start = m[1].length, end = m[0].length;
					if (!shouldInsertSpace(line, start, end) && m[0][end - 1] == " ") end--;
					doc.removeInLine(i$1, start, end);
				};
				var commentWithSpace = lineCommentStart + " ";
				var comment = function(line, i$1) {
					if (!ignoreBlankLines || /\S/.test(line)) if (shouldInsertSpace(line, minIndent, minIndent)) doc.insertInLine({
						row: i$1,
						column: minIndent
					}, commentWithSpace);
					else doc.insertInLine({
						row: i$1,
						column: minIndent
					}, lineCommentStart);
				};
				var testRemove = function(line, i$1) {
					return regexpStart.test(line);
				};
				var shouldInsertSpace = function(line, before, after) {
					var spaces = 0;
					while (before-- && line.charAt(before) == " ") spaces++;
					if (spaces % tabSize != 0) return false;
					var spaces = 0;
					while (line.charAt(after++) == " ") spaces++;
					if (tabSize > 2) return spaces % tabSize != tabSize - 1;
					else return spaces % tabSize == 0;
				};
			}
			function iter(fun) {
				for (var i$1 = startRow; i$1 <= endRow; i$1++) fun(doc.getLine(i$1), i$1);
			}
			var minEmptyLength = Infinity;
			iter(function(line, i$1) {
				var indent = line.search(/\S/);
				if (indent !== -1) {
					if (indent < minIndent) minIndent = indent;
					if (shouldRemove && !testRemove(line, i$1)) shouldRemove = false;
				} else if (minEmptyLength > line.length) minEmptyLength = line.length;
			});
			if (minIndent == Infinity) {
				minIndent = minEmptyLength;
				ignoreBlankLines = false;
				shouldRemove = false;
			}
			if (insertAtTabStop && minIndent % tabSize != 0) minIndent = Math.floor(minIndent / tabSize) * tabSize;
			iter(shouldRemove ? uncomment : comment);
		};
		this.toggleBlockComment = function(state, session, range, cursor) {
			var comment = this.blockComment;
			if (!comment) return;
			if (!comment.start && comment[0]) comment = comment[0];
			var iterator = new TokenIterator(session, cursor.row, cursor.column);
			var token = iterator.getCurrentToken();
			session.selection;
			var initialRange = session.selection.toOrientedRange();
			var startRow, colDiff;
			if (token && /comment/.test(token.type)) {
				var startRange, endRange;
				while (token && /comment/.test(token.type)) {
					var i$1 = token.value.indexOf(comment.start);
					if (i$1 != -1) {
						var row = iterator.getCurrentTokenRow();
						var column = iterator.getCurrentTokenColumn() + i$1;
						startRange = new Range(row, column, row, column + comment.start.length);
						break;
					}
					token = iterator.stepBackward();
				}
				var iterator = new TokenIterator(session, cursor.row, cursor.column);
				var token = iterator.getCurrentToken();
				while (token && /comment/.test(token.type)) {
					var i$1 = token.value.indexOf(comment.end);
					if (i$1 != -1) {
						var row = iterator.getCurrentTokenRow();
						var column = iterator.getCurrentTokenColumn() + i$1;
						endRange = new Range(row, column, row, column + comment.end.length);
						break;
					}
					token = iterator.stepForward();
				}
				if (endRange) session.remove(endRange);
				if (startRange) {
					session.remove(startRange);
					startRow = startRange.start.row;
					colDiff = -comment.start.length;
				}
			} else {
				colDiff = comment.start.length;
				startRow = range.start.row;
				session.insert(range.end, comment.end);
				session.insert(range.start, comment.start);
			}
			if (initialRange.start.row == startRow) initialRange.start.column += colDiff;
			if (initialRange.end.row == startRow) initialRange.end.column += colDiff;
			session.selection.fromOrientedRange(initialRange);
		};
		this.getNextLineIndent = function(state, line, tab) {
			return this.$getIndent(line);
		};
		this.checkOutdent = function(state, line, input) {
			return false;
		};
		this.autoOutdent = function(state, doc, row) {};
		this.$getIndent = function(line) {
			return line.match(/^\s*/)[0];
		};
		this.createWorker = function(session) {
			return null;
		};
		this.createModeDelegates = function(mapping) {
			this.$embeds = [];
			this.$modes = {};
			for (let i$1 in mapping) if (mapping[i$1]) {
				var Mode$1 = mapping[i$1];
				var id = Mode$1.prototype.$id;
				var mode = config.$modes[id];
				if (!mode) config.$modes[id] = mode = new Mode$1();
				if (!config.$modes[i$1]) config.$modes[i$1] = mode;
				this.$embeds.push(i$1);
				this.$modes[i$1] = mode;
			}
			var delegations = [
				"toggleBlockComment",
				"toggleCommentLines",
				"getNextLineIndent",
				"checkOutdent",
				"autoOutdent",
				"transformAction",
				"getCompletions"
			];
			for (let i$1 = 0; i$1 < delegations.length; i$1++) (function(scope) {
				var functionName = delegations[i$1];
				var defaultHandler = scope[functionName];
				scope[delegations[i$1]] = function() {
					return this.$delegator(functionName, arguments, defaultHandler);
				};
			})(this);
		};
		this.$delegator = function(method, args, defaultHandler) {
			var state = args[0] || "start";
			if (typeof state != "string") {
				if (Array.isArray(state[2])) {
					var language = state[2][state[2].length - 1];
					var mode = this.$modes[language];
					if (mode) return mode[method].apply(mode, [state[1]].concat([].slice.call(args, 1)));
				}
				state = state[0] || "start";
			}
			for (var i$1 = 0; i$1 < this.$embeds.length; i$1++) {
				if (!this.$modes[this.$embeds[i$1]]) continue;
				var split = state.split(this.$embeds[i$1]);
				if (!split[0] && split[1]) {
					args[0] = split[1];
					var mode = this.$modes[this.$embeds[i$1]];
					return mode[method].apply(mode, args);
				}
			}
			var ret = defaultHandler.apply(this, args);
			return defaultHandler ? ret : void 0;
		};
		this.transformAction = function(state, action, editor, session, param) {
			if (this.$behaviour) {
				var behaviours = this.$behaviour.getBehaviours();
				for (var key in behaviours) if (behaviours[key][action]) {
					var ret = behaviours[key][action].apply(this, arguments);
					if (ret) return ret;
				}
			}
		};
		this.getKeywords = function(append) {
			if (!this.completionKeywords) {
				var rules = this.$tokenizer["rules"];
				var completionKeywords = [];
				for (var rule in rules) {
					var ruleItr = rules[rule];
					for (var r = 0, l = ruleItr.length; r < l; r++) if (typeof ruleItr[r].token === "string") {
						if (/keyword|support|storage/.test(ruleItr[r].token)) completionKeywords.push(ruleItr[r].regex);
					} else if (typeof ruleItr[r].token === "object") {
						for (var a = 0, aLength = ruleItr[r].token.length; a < aLength; a++) if (/keyword|support|storage/.test(ruleItr[r].token[a])) {
							var rule = ruleItr[r].regex.match(/\(.+?\)/g)[a];
							completionKeywords.push(rule.substr(1, rule.length - 2));
						}
					}
				}
				this.completionKeywords = completionKeywords;
			}
			if (!append) return this.$keywordList;
			return completionKeywords.concat(this.$keywordList || []);
		};
		this.$createKeywordList = function() {
			if (!this.$highlightRules) this.getTokenizer();
			return this.$keywordList = this.$highlightRules.$keywordList || [];
		};
		this.getCompletions = function(state, session, pos, prefix) {
			return (this.$keywordList || this.$createKeywordList()).map(function(word) {
				return {
					name: word,
					value: word,
					score: 0,
					meta: "keyword"
				};
			});
		};
		this.$id = "ace/mode/text";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export { require_text_highlight_rules as a, require_behaviour as i, require_unicode as n, require_cstyle as r, require_text as t };
