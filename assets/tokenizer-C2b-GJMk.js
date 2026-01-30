import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_report_error } from "./report_error-DwxiVKH7.js";
var require_tokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var reportError = require_report_error().reportError;
	var MAX_TOKEN_COUNT = 2e3;
	var Tokenizer = class {
		constructor(rules) {
			this.splitRegex;
			this.states = rules;
			this.regExps = {};
			this.matchMappings = {};
			for (var key in this.states) {
				var state = this.states[key];
				var ruleRegExps = [];
				var matchTotal = 0;
				var mapping = this.matchMappings[key] = { defaultToken: "text" };
				var flag = "g";
				var splitterRurles = [];
				for (var i = 0; i < state.length; i++) {
					var rule = state[i];
					if (rule.defaultToken) mapping.defaultToken = rule.defaultToken;
					if (rule.caseInsensitive && flag.indexOf("i") === -1) flag += "i";
					if (rule.unicode && flag.indexOf("u") === -1) flag += "u";
					if (rule.regex == null) continue;
					if (rule.regex instanceof RegExp) rule.regex = rule.regex.toString().slice(1, -1);
					var adjustedregex = rule.regex;
					var matchcount = (/* @__PURE__ */ new RegExp("(?:(" + adjustedregex + ")|(.))")).exec("a").length - 2;
					if (Array.isArray(rule.token)) if (rule.token.length == 1 || matchcount == 1) rule.token = rule.token[0];
					else if (matchcount - 1 != rule.token.length) {
						this.reportError("number of classes and regexp groups doesn't match", {
							rule,
							groupCount: matchcount - 1
						});
						rule.token = rule.token[0];
					} else {
						rule.tokenArray = rule.token;
						rule.token = null;
						rule.onMatch = this.$arrayTokens;
					}
					else if (typeof rule.token == "function" && !rule.onMatch) if (matchcount > 1) rule.onMatch = this.$applyToken;
					else rule.onMatch = rule.token;
					if (matchcount > 1) {
						if (/\\\d/.test(rule.regex)) adjustedregex = rule.regex.replace(/\\([0-9]+)/g, function(match, digit) {
							return "\\" + (parseInt(digit, 10) + matchTotal + 1);
						});
						else {
							matchcount = 1;
							adjustedregex = this.removeCapturingGroups(rule.regex);
						}
						if (!rule.splitRegex && typeof rule.token != "string") splitterRurles.push(rule);
					}
					mapping[matchTotal] = i;
					matchTotal += matchcount;
					ruleRegExps.push(adjustedregex);
					if (!rule.onMatch) rule.onMatch = null;
				}
				if (!ruleRegExps.length) {
					mapping[0] = 0;
					ruleRegExps.push("$");
				}
				splitterRurles.forEach(function(rule$1) {
					rule$1.splitRegex = this.createSplitterRegexp(rule$1.regex, flag);
				}, this);
				this.regExps[key] = new RegExp("(" + ruleRegExps.join(")|(") + ")|($)", flag);
			}
		}
		$setMaxTokenCount(m) {
			MAX_TOKEN_COUNT = m | 0;
		}
		$applyToken(str) {
			var values = this.splitRegex.exec(str).slice(1);
			var types = this.token.apply(this, values);
			if (typeof types === "string") return [{
				type: types,
				value: str
			}];
			var tokens = [];
			for (var i = 0, l = types.length; i < l; i++) if (values[i]) tokens[tokens.length] = {
				type: types[i],
				value: values[i]
			};
			return tokens;
		}
		$arrayTokens(str) {
			if (!str) return [];
			var values = this.splitRegex.exec(str);
			if (!values) return "text";
			var tokens = [];
			var types = this.tokenArray;
			for (var i = 0, l = types.length; i < l; i++) if (values[i + 1]) tokens[tokens.length] = {
				type: types[i],
				value: values[i + 1]
			};
			return tokens;
		}
		removeCapturingGroups(src) {
			return src.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!<]|(\()/g, function(x, y) {
				return y ? "(?:" : x;
			});
		}
		createSplitterRegexp(src, flag) {
			if (src.indexOf("(?=") != -1) {
				var stack = 0;
				var inChClass = false;
				var lastCapture = {};
				src.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(m, esc, parenOpen, parenClose, square, index) {
					if (inChClass) inChClass = square != "]";
					else if (square) inChClass = true;
					else if (parenClose) {
						if (stack == lastCapture.stack) {
							lastCapture.end = index + 1;
							lastCapture.stack = -1;
						}
						stack--;
					} else if (parenOpen) {
						stack++;
						if (parenOpen.length != 1) {
							lastCapture.stack = stack;
							lastCapture.start = index;
						}
					}
					return m;
				});
				if (lastCapture.end != null && /^\)*$/.test(src.substr(lastCapture.end))) src = src.substring(0, lastCapture.start) + src.substr(lastCapture.end);
			}
			if (src.charAt(0) != "^") src = "^" + src;
			if (src.charAt(src.length - 1) != "$") src += "$";
			return new RegExp(src, (flag || "").replace("g", ""));
		}
		getLineTokens(line, startState) {
			if (startState && typeof startState != "string") {
				var stack = startState.slice(0);
				startState = stack[0];
				if (startState === "#tmp") {
					stack.shift();
					startState = stack.shift();
				}
			} else var stack = [];
			var currentState = startState || "start";
			var state = this.states[currentState];
			if (!state) {
				currentState = "start";
				state = this.states[currentState];
			}
			var mapping = this.matchMappings[currentState];
			var re = this.regExps[currentState];
			re.lastIndex = 0;
			var match, tokens = [];
			var lastIndex = 0;
			var matchAttempts = 0;
			var token = {
				type: null,
				value: ""
			};
			while (match = re.exec(line)) {
				var type = mapping.defaultToken;
				var rule = null;
				var value = match[0];
				var index = re.lastIndex;
				if (index - value.length > lastIndex) {
					var skipped = line.substring(lastIndex, index - value.length);
					if (token.type == type) token.value += skipped;
					else {
						if (token.type) tokens.push(token);
						token = {
							type,
							value: skipped
						};
					}
				}
				for (var i = 0; i < match.length - 2; i++) {
					if (match[i + 1] === void 0) continue;
					rule = state[mapping[i]];
					if (rule.onMatch) type = rule.onMatch(value, currentState, stack, line);
					else type = rule.token;
					if (rule.next) {
						if (typeof rule.next == "string") currentState = rule.next;
						else currentState = rule.next(currentState, stack);
						state = this.states[currentState];
						if (!state) {
							this.reportError("state doesn't exist", currentState);
							currentState = "start";
							state = this.states[currentState];
						}
						mapping = this.matchMappings[currentState];
						lastIndex = index;
						re = this.regExps[currentState];
						re.lastIndex = index;
					}
					if (rule.consumeLineEnd) lastIndex = index;
					break;
				}
				if (value) {
					if (typeof type === "string") if ((!rule || rule.merge !== false) && token.type === type) token.value += value;
					else {
						if (token.type) tokens.push(token);
						token = {
							type,
							value
						};
					}
					else if (type) {
						if (token.type) tokens.push(token);
						token = {
							type: null,
							value: ""
						};
						for (var i = 0; i < type.length; i++) tokens.push(type[i]);
					}
				}
				if (lastIndex == line.length) break;
				lastIndex = index;
				if (matchAttempts++ > MAX_TOKEN_COUNT) {
					if (matchAttempts > 2 * line.length) this.reportError("infinite loop with in ace tokenizer", {
						startState,
						line
					});
					while (lastIndex < line.length) {
						if (token.type) tokens.push(token);
						token = {
							value: line.substring(lastIndex, lastIndex += 500),
							type: "overflow"
						};
					}
					currentState = "start";
					stack = [];
					break;
				}
			}
			if (token.type) tokens.push(token);
			if (stack.length > 1) {
				if (stack[0] !== currentState) stack.unshift("#tmp", currentState);
			}
			return {
				tokens,
				state: stack.length ? stack : currentState
			};
		}
	};
	Tokenizer.prototype.reportError = reportError;
	exports.Tokenizer = Tokenizer;
}));
export { require_tokenizer as t };
