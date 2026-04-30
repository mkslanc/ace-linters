import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-Crv5ZBqX.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
//#region node_modules/ace-code/src/mode/odin_highlight_rules.js
var require_odin_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var OdinHighlightRules = function() {
		var keywords = "using|transmute|cast|distinct|opaque|where|struct|enum|union|bit_field|bit_set|if|when|else|do|switch|case|break|fallthrough|size_of|offset_of|type_info_if|typeid_of|type_of|align_of|or_return|or_else|inline|no_inline|import|package|foreign|defer|auto_cast|map|matrix|proc|for|continue|not_in|in";
		const cartesian = (...a) => a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat()))).map((parts) => parts.join(""));
		var builtinTypes = [
			"int",
			"uint",
			"uintptr",
			"typeid",
			"rawptr",
			"string",
			"cstring",
			"i8",
			"u8",
			"any",
			"byte",
			"rune",
			"bool",
			"b8",
			"b16",
			"b32",
			"b64",
			...cartesian(["i", "u"], [
				"16",
				"32",
				"64",
				"128"
			], [
				"",
				"le",
				"be"
			]),
			...cartesian(["f"], [
				"16",
				"32",
				"64"
			], [
				"",
				"le",
				"be"
			]),
			...cartesian(["complex"], [
				"32",
				"64",
				"128"
			]),
			...cartesian(["quaternion"], [
				"64",
				"128",
				"256"
			])
		].join("|");
		var operators = [
			"\\*",
			"/",
			"%",
			"%%",
			"<<",
			">>",
			"&",
			"&~",
			"\\+",
			"\\-",
			"~",
			"\\|",
			">",
			"<",
			"<=",
			">=",
			"==",
			"!="
		].concat(":").map((operator) => operator + "=").concat("=", ":=", "::", "->", "\\^", "&", ":").join("|");
		var builtinFunctions = "new|cap|copy|panic|len|make|delete|append|free";
		var builtinConstants = "nil|true|false";
		var keywordMapper = this.createKeywordMapper({
			keyword: keywords,
			"constant.language": builtinConstants,
			"support.function": builtinFunctions,
			"support.type": builtinTypes
		}, "");
		var stringEscapeRe = "\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv'\"\\\\])".replace(/\\h/g, "[a-fA-F\\d]");
		this.$rules = {
			start: [
				{
					token: "comment",
					regex: /\/\/.*$/
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
					token: "support.constant",
					regex: /#[a-z_]+/
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
						"entity.name.function",
						"text",
						"keyword.operator",
						"text",
						"keyword"
					],
					regex: "([a-zA-Z_$][a-zA-Z0-9_$]*)(\\s+)(::)(\\s+)(proc)\\b"
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
					regex: operators
				},
				{
					token: "punctuation.operator",
					regex: "\\?|\\,|\\;|\\."
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
			comment: [{
				token: "comment.end",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			bqstring: [{
				token: "string",
				regex: "`",
				next: "start"
			}, { defaultToken: "string" }]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop.inherits(OdinHighlightRules, TextHighlightRules);
	exports.OdinHighlightRules = OdinHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/odin.js
var require_odin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var OdinHighlightRules = require_odin_highlight_rules().OdinHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = OdinHighlightRules;
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
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[:]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/odin";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_odin();
