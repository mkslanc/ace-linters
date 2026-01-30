import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-DUGnT9qY.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
var require_golang_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GolangHighlightRules$1 = function() {
		var keywords = "else|break|case|return|goto|if|const|select|continue|struct|default|switch|for|range|func|import|package|chan|defer|fallthrough|go|interface|map|range|select|type|var";
		var builtinTypes = "string|uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|complex64|complex128|byte|rune|uint|int|uintptr|bool|error";
		var builtinFunctions = "new|close|cap|copy|panic|panicln|print|println|len|make|delete|real|recover|imag|append";
		var builtinConstants = "nil|true|false|iota";
		var keywordMapper = this.createKeywordMapper({
			"keyword": keywords,
			"constant.language": builtinConstants,
			"support.function": builtinFunctions,
			"support.type": builtinTypes
		}, "");
		var stringEscapeRe = "\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv'\"\\\\])".replace(/\\h/g, "[a-fA-F\\d]");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment.start",
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: "string",
					regex: /"(?:[^"\\]|\\.)*?"/
				},
				{
					token: "string",
					regex: "`",
					next: "bqstring"
				},
				{
					token: "constant.numeric",
					regex: "'(?:[^\\'\ud800-\udbff]|[\ud800-\udbff][\udc00-\udfff]|" + stringEscapeRe.replace("\"", "") + ")'"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.function"
					],
					regex: "(func)(\\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)\\b"
				},
				{
					token: function(val) {
						if (val[val.length - 1] == "(") return [{
							type: keywordMapper(val.slice(0, -1)) || "support.function",
							value: val.slice(0, -1)
						}, {
							type: "paren.lparen",
							value: val.slice(-1)
						}];
						return keywordMapper(val) || "identifier";
					},
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b\\(?"
				},
				{
					token: "keyword.operator",
					regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^="
				},
				{
					token: "punctuation.operator",
					regex: "\\?|\\:|\\,|\\;|\\."
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"comment": [{
				token: "comment.end",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"bqstring": [{
				token: "string",
				regex: "`",
				next: "start"
			}, { defaultToken: "string" }]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop$1.inherits(GolangHighlightRules$1, TextHighlightRules);
	exports.GolangHighlightRules = GolangHighlightRules$1;
}));
var require_golang = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var GolangHighlightRules = require_golang_highlight_rules().GolangHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = GolangHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new CStyleFoldMode();
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
			tokenizedLine.state;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/golang";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_golang();
