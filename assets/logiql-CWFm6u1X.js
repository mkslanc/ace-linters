import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import { t as require_range } from "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import { t as require_token_iterator } from "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_coffee } from "./coffee-CKmePRUu.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
//#region node_modules/ace-code/src/mode/logiql_highlight_rules.js
var require_logiql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LogiQLHighlightRules = function() {
		this.$rules = { start: [
			{
				token: "comment.block",
				regex: "/\\*",
				push: [{
					token: "comment.block",
					regex: "\\*/",
					next: "pop"
				}, { defaultToken: "comment.block" }]
			},
			{
				token: "comment.single",
				regex: "//.*"
			},
			{
				token: "constant.numeric",
				regex: "\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?"
			},
			{
				token: "string",
				regex: "\"",
				push: [{
					token: "string",
					regex: "\"",
					next: "pop"
				}, { defaultToken: "string" }]
			},
			{
				token: "constant.language",
				regex: "\\b(true|false)\\b"
			},
			{
				token: "entity.name.type.logicblox",
				regex: "`[a-zA-Z_:]+(\\d|\\a)*\\b"
			},
			{
				token: "keyword.start",
				regex: "->",
				comment: "Constraint"
			},
			{
				token: "keyword.start",
				regex: "-->",
				comment: "Level 1 Constraint"
			},
			{
				token: "keyword.start",
				regex: "<-",
				comment: "Rule"
			},
			{
				token: "keyword.start",
				regex: "<--",
				comment: "Level 1 Rule"
			},
			{
				token: "keyword.end",
				regex: "\\.",
				comment: "Terminator"
			},
			{
				token: "keyword.other",
				regex: "!",
				comment: "Negation"
			},
			{
				token: "keyword.other",
				regex: ",",
				comment: "Conjunction"
			},
			{
				token: "keyword.other",
				regex: ";",
				comment: "Disjunction"
			},
			{
				token: "keyword.operator",
				regex: "<=|>=|!=|<|>",
				comment: "Equality"
			},
			{
				token: "keyword.other",
				regex: "@",
				comment: "Equality"
			},
			{
				token: "keyword.operator",
				regex: "\\+|-|\\*|/",
				comment: "Arithmetic operations"
			},
			{
				token: "keyword",
				regex: "::",
				comment: "Colon colon"
			},
			{
				token: "support.function",
				regex: "\\b(agg\\s*<<)",
				push: [{ include: "$self" }, {
					token: "support.function",
					regex: ">>",
					next: "pop"
				}]
			},
			{
				token: "storage.modifier",
				regex: "\\b(lang:[\\w:]*)"
			},
			{
				token: ["storage.type", "text"],
				regex: "(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)"
			},
			{
				token: "entity.name",
				regex: "[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"
			},
			{
				token: "variable.parameter",
				regex: "([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"
			}
		] };
		this.normalizeRules();
	};
	oop.inherits(LogiQLHighlightRules, TextHighlightRules);
	exports.LogiQLHighlightRules = LogiQLHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/logiql.js
var require_logiql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var LogiQLHighlightRules = require_logiql_highlight_rules().LogiQLHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var TokenIterator = require_token_iterator().TokenIterator;
	var Range = require_range().Range;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		this.HighlightRules = LogiQLHighlightRules;
		this.foldingRules = new FoldMode();
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
			var tokens = tokenizedLine.tokens;
			var endState = tokenizedLine.state;
			if (/comment|string/.test(endState)) return indent;
			if (tokens.length && tokens[tokens.length - 1].type == "comment.single") return indent;
			line.match();
			if (/(-->|<--|<-|->|{)\s*$/.test(line)) indent += tab;
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			if (this.$outdent.checkOutdent(line, input)) return true;
			if (input !== "\n" && input !== "\r\n") return false;
			if (!/^\s+/.test(line)) return false;
			return true;
		};
		this.autoOutdent = function(state, doc, row) {
			if (this.$outdent.autoOutdent(doc, row)) return;
			var prevLine = doc.getLine(row);
			var match = prevLine.match(/^\s+/);
			var column = prevLine.lastIndexOf(".") + 1;
			if (!match || !row || !column) return 0;
			doc.getLine(row + 1);
			var startRange = this.getMatching(doc, {
				row,
				column
			});
			if (!startRange || startRange.start.row == row) return 0;
			column = match[0].length;
			var indent = this.$getIndent(doc.getLine(startRange.start.row));
			doc.replace(new Range(row + 1, 0, row + 1, column), indent);
		};
		this.getMatching = function(session, row, column) {
			if (row == void 0) row = session.selection.lead;
			if (typeof row == "object") {
				column = row.column;
				row = row.row;
			}
			var startToken = session.getTokenAt(row, column);
			var KW_START = "keyword.start", KW_END = "keyword.end";
			var tok;
			if (!startToken) return;
			if (startToken.type == KW_START) {
				var it = new TokenIterator(session, row, column);
				it.step = it.stepForward;
			} else if (startToken.type == KW_END) {
				var it = new TokenIterator(session, row, column);
				it.step = it.stepBackward;
			} else return;
			while (tok = it.step()) if (tok.type == KW_START || tok.type == KW_END) break;
			if (!tok || tok.type == startToken.type) return;
			var col = it.getCurrentTokenColumn();
			var row = it.getCurrentTokenRow();
			return new Range(row, col, row, col + tok.value.length);
		};
		this.$id = "ace/mode/logiql";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_logiql();
