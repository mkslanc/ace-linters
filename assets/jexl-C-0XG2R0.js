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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_jexl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JexlHighlightRules$1 = function() {
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
	oop$1.inherits(JexlHighlightRules$1, TextHighlightRules);
	exports.JexlHighlightRules = JexlHighlightRules$1;
}));
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
export default require_jexl();
