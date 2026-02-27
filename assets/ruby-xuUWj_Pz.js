import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-Bo0T10Ak.js";
var require_ruby$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range$1 = require_range().Range;
	var TokenIterator = require_token_iterator().TokenIterator;
	var FoldMode$1 = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode$1, BaseFoldMode);
	(function() {
		this.indentKeywords = {
			"class": 1,
			"def": 1,
			"module": 1,
			"do": 1,
			"unless": 1,
			"if": 1,
			"while": 1,
			"for": 1,
			"until": 1,
			"begin": 1,
			"else": 0,
			"elsif": 0,
			"rescue": 0,
			"ensure": 0,
			"when": 0,
			"end": -1,
			"case": 1,
			"=begin": 1,
			"=end": -1
		};
		this.foldingStartMarker = /(?:\s|^)(def|do|while|class|unless|module|if|for|until|begin|else|elsif|case|rescue|ensure|when)\b|({\s*$)|(=begin)/;
		this.foldingStopMarker = /(=end(?=$|\s.*$))|(^\s*})|\b(end)\b/;
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var isStart = this.foldingStartMarker.test(line);
			var isEnd = this.foldingStopMarker.test(line);
			if (isStart && !isEnd) {
				var match = line.match(this.foldingStartMarker);
				if (match[1]) {
					if (match[1] == "if" || match[1] == "else" || match[1] == "while" || match[1] == "until" || match[1] == "unless") {
						if (match[1] == "else" && /^\s*else\s*$/.test(line) === false) return;
						if (/^\s*(?:if|else|while|until|unless)\s*/.test(line) === false) return;
					}
					if (match[1] == "when") {
						if (/\sthen\s/.test(line) === true) return;
					}
					if (session.getTokenAt(row, match.index + 2).type === "keyword") return "start";
				} else if (match[3]) {
					if (session.getTokenAt(row, match.index + 1).type === "comment.multiline") return "start";
				} else return "start";
			}
			if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd) return "";
			var match = line.match(this.foldingStopMarker);
			if (match[3] === "end") {
				if (session.getTokenAt(row, match.index + 1).type === "keyword") return "end";
			} else if (match[1]) {
				if (session.getTokenAt(row, match.index + 1).type === "comment.multiline") return "end";
			} else return "end";
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.doc.getLine(row);
			var match = this.foldingStartMarker.exec(line);
			if (match) {
				if (match[1] || match[3]) return this.rubyBlock(session, row, match.index + 2);
				return this.openingBracketBlock(session, "{", row, match.index);
			}
			var match = this.foldingStopMarker.exec(line);
			if (match) {
				if (match[3] === "end") {
					if (session.getTokenAt(row, match.index + 1).type === "keyword") return this.rubyBlock(session, row, match.index + 1);
				}
				if (match[1] === "=end") {
					if (session.getTokenAt(row, match.index + 1).type === "comment.multiline") return this.rubyBlock(session, row, match.index + 1);
				}
				return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
			}
		};
		this.rubyBlock = function(session, row, column, tokenRange) {
			var stream = new TokenIterator(session, row, column);
			var token = stream.getCurrentToken();
			if (!token || token.type != "keyword" && token.type != "comment.multiline") return;
			var val = token.value;
			var line = session.getLine(row);
			switch (token.value) {
				case "if":
				case "unless":
				case "while":
				case "until":
					var checkToken = /* @__PURE__ */ new RegExp("^\\s*" + token.value);
					if (!checkToken.test(line)) return;
					var dir = this.indentKeywords[val];
					break;
				case "when": if (/\sthen\s/.test(line)) return;
				case "elsif":
				case "rescue":
				case "ensure":
					var dir = 1;
					break;
				case "else":
					var checkToken = /* @__PURE__ */ new RegExp("^\\s*" + token.value + "\\s*$");
					if (!checkToken.test(line)) return;
					var dir = 1;
					break;
				default:
					var dir = this.indentKeywords[val];
					break;
			}
			var stack = [val];
			if (!dir) return;
			var startColumn = dir === -1 ? session.getLine(row - 1).length : session.getLine(row).length;
			var startRow = row;
			var ranges = [];
			ranges.push(stream.getCurrentTokenRange());
			stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
			if (token.type == "comment.multiline") while (token = stream.step()) {
				if (token.type !== "comment.multiline") continue;
				if (dir == 1) {
					startColumn = 6;
					if (token.value == "=end") break;
				} else if (token.value == "=begin") break;
			}
			else while (token = stream.step()) {
				var ignore = false;
				if (token.type !== "keyword") continue;
				var level = dir * this.indentKeywords[token.value];
				line = session.getLine(stream.getCurrentTokenRow());
				switch (token.value) {
					case "do":
						for (var i = stream.$tokenIndex - 1; i >= 0; i--) {
							var prevToken = stream.$rowTokens[i];
							if (prevToken && (prevToken.value == "while" || prevToken.value == "until" || prevToken.value == "for")) {
								level = 0;
								break;
							}
						}
						break;
					case "else":
						var checkToken = /* @__PURE__ */ new RegExp("^\\s*" + token.value + "\\s*$");
						if (!checkToken.test(line) || val == "case") {
							level = 0;
							ignore = true;
						}
						break;
					case "if":
					case "unless":
					case "while":
					case "until":
						var checkToken = /* @__PURE__ */ new RegExp("^\\s*" + token.value);
						if (!checkToken.test(line)) {
							level = 0;
							ignore = true;
						}
						break;
					case "when":
						if (/\sthen\s/.test(line) || val == "case") {
							level = 0;
							ignore = true;
						}
						break;
				}
				if (level > 0) stack.unshift(token.value);
				else if (level <= 0 && ignore === false) {
					stack.shift();
					if (!stack.length) {
						if ((val == "while" || val == "until" || val == "for") && token.value != "do") break;
						if (token.value == "do" && dir == -1 && level != 0) break;
						if (token.value != "do") break;
					}
					if (level === 0) stack.unshift(token.value);
				}
			}
			if (!token) return null;
			if (tokenRange) {
				ranges.push(stream.getCurrentTokenRange());
				return ranges;
			}
			var row = stream.getCurrentTokenRow();
			if (dir === -1) {
				if (token.type === "comment.multiline") var endColumn = 6;
				else var endColumn = session.getLine(row).length;
				return new Range$1(row, endColumn, startRow - 1, startColumn);
			} else return new Range$1(startRow, startColumn, row - 1, session.getLine(row - 1).length);
		};
	}).call(FoldMode$1.prototype);
}));
var require_ruby = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var RubyHighlightRules = require_ruby_highlight_rules().RubyHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Range = require_range().Range;
	var FoldMode = require_ruby$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = RubyHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new FoldMode();
		this.indentKeywords = this.foldingRules.indentKeywords;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				var match = line.match(/^.*[\{\(\[]\s*$/);
				var startingClassOrMethod = line.match(/^\s*(class|def|module)\s.*$/);
				var startingDoBlock = line.match(/.*do(\s*|\s+\|.*\|\s*)$/);
				var startingConditional = line.match(/^\s*(if|else|when|elsif|unless|while|for|begin|rescue|ensure)\s*/);
				if (match || startingClassOrMethod || startingDoBlock || startingConditional) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return /^\s+(end|else|rescue|ensure)$/.test(line + input) || this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, session, row) {
			var line = session.getLine(row);
			if (/}/.test(line)) return this.$outdent.autoOutdent(session, row);
			var indent = this.$getIndent(line);
			var prevLine = session.getLine(row - 1);
			var prevIndent = this.$getIndent(prevLine);
			var tab = session.getTabString();
			if (prevIndent.length <= indent.length) {
				if (indent.slice(-tab.length) == tab) session.remove(new Range(row, indent.length - tab.length, row, indent.length));
			}
		};
		this.getMatching = function(session, row, column) {
			if (row == void 0) {
				var pos = session.selection.lead;
				column = pos.column;
				row = pos.row;
			}
			var startToken = session.getTokenAt(row, column);
			if (startToken && startToken.value in this.indentKeywords) return this.foldingRules.rubyBlock(session, row, column, true);
		};
		this.$id = "ace/mode/ruby";
		this.snippetFileId = "ace/snippets/ruby";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_ruby();
export { require_ruby as t };
