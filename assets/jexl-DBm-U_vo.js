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
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
//#region node_modules/ace-code/src/mode/jexl_highlight_rules.js
var require_jexl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JexlHighlightRules = function() {
		var keywords = "return|var|function|and|or|not|if|for|while|do|continue|break";
		var buildinConstants = "null";
		var supportFunc = "empty|size|new";
		var keywordMapper = this.createKeywordMapper({
			"keyword": keywords,
			"constant.language": buildinConstants,
			"support.function": supportFunc
		}, "identifier");
		var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}||.)";
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				{
					token: "comment",
					regex: "##.*$"
				},
				{
					token: "comment",
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: ["comment", "text"],
					regex: "(#pragma)(\\s.*$)"
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "string",
					regex: "`",
					push: [
						{
							token: "constant.language.escape",
							regex: escapedRe
						},
						{
							token: "string",
							regex: "`",
							next: "pop"
						},
						{
							token: "lparen",
							regex: "\\${",
							push: [{
								token: "rparen",
								regex: "}",
								next: "pop"
							}, { include: "start" }]
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "constant.numeric",
					regex: /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.numeric",
					regex: /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				},
				{
					token: "string.regexp",
					regex: "~/",
					push: [
						{
							token: "constant.language.escape",
							regex: "\\\\/"
						},
						{
							token: "string.regexp",
							regex: "$|/",
							next: "pop"
						},
						{ defaultToken: "string.regexp" }
					]
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "&&|\\|\\||!|&|\\||\\^|~|\\?|:|\\?\\?|==|!=|<|<=|>|>=|=~|!~|=\\^|=\\$|!\\$|\\+|\\-|\\*|%|\\/|="
				},
				{
					token: "lparen",
					regex: "[[({]"
				},
				{
					token: "rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				},
				{
					token: "punctuation",
					regex: "[,.]"
				},
				{
					token: "storage.type.annotation",
					regex: "@[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }]
		};
		this.normalizeRules();
	};
	oop.inherits(JexlHighlightRules, TextHighlightRules);
	exports.JexlHighlightRules = JexlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/jexl.js
var require_jexl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JexlHighlightRules = require_jexl_highlight_rules().JexlHighlightRules;
	var TextMode = require_text().Mode;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = JexlHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["//", "##"];
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/jexl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_jexl();
