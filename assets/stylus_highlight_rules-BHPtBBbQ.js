import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BLT2K-CI.js";
var require_stylus_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CssHighlightRules = require_css_highlight_rules();
	var StylusHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"support.type": CssHighlightRules.supportType,
			"support.function": CssHighlightRules.supportFunction,
			"support.constant": CssHighlightRules.supportConstant,
			"support.constant.color": CssHighlightRules.supportConstantColor,
			"support.constant.fonts": CssHighlightRules.supportConstantFonts
		}, "text", true);
		this.$rules = {
			start: [
				{
					token: "comment",
					regex: /\/\/.*$/
				},
				{
					token: "comment",
					regex: /\/\*/,
					next: "comment"
				},
				{
					token: ["entity.name.function.stylus", "text"],
					regex: "^([-a-zA-Z_][-\\w]*)?(\\()"
				},
				{
					token: ["entity.other.attribute-name.class.stylus"],
					regex: "\\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*"
				},
				{
					token: ["entity.language.stylus"],
					regex: "^ *&"
				},
				{
					token: ["variable.language.stylus"],
					regex: "(arguments)"
				},
				{
					token: ["keyword.stylus"],
					regex: "@[-\\w]+"
				},
				{
					token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
					regex: CssHighlightRules.pseudoElements
				},
				{
					token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
					regex: CssHighlightRules.pseudoClasses
				},
				{
					token: ["entity.name.tag.stylus"],
					regex: "(?:\\b)(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|eventsource|fieldset|figure|figcaption|footer|form|frame|frameset|(?:h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)(?:\\b)"
				},
				{
					token: "constant.numeric",
					regex: "#[a-fA-F0-9]{6}"
				},
				{
					token: "constant.numeric",
					regex: "#[a-fA-F0-9]{3}"
				},
				{
					token: ["punctuation.definition.entity.stylus", "entity.other.attribute-name.id.stylus"],
					regex: "(#)([a-zA-Z][a-zA-Z0-9_-]*)"
				},
				{
					token: "meta.vendor-prefix.stylus",
					regex: "-webkit-|-moz\\-|-ms-|-o-"
				},
				{
					token: "keyword.control.stylus",
					regex: "(?:!important|for|in|return|true|false|null|if|else|unless|return)\\b"
				},
				{
					token: "keyword.operator.stylus",
					regex: "!|~|\\+|-|(?:\\*)?\\*|\\/|%|(?:\\.)\\.\\.|<|>|(?:=|:|\\?|\\+|-|\\*|\\/|%|<|>)?=|!="
				},
				{
					token: "keyword.operator.stylus",
					regex: "(?:in|is(?:nt)?|not)\\b"
				},
				{
					token: "string",
					regex: "'(?=.)",
					next: "qstring"
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "qqstring"
				},
				{
					token: "constant.numeric",
					regex: CssHighlightRules.numRe
				},
				{
					token: "keyword",
					regex: "(?:ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)\\b"
				},
				{
					token: keywordMapper,
					regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"qqstring": [
				{
					token: "string",
					regex: "[^\"\\\\]+"
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start"
				}
			],
			"qstring": [
				{
					token: "string",
					regex: "[^'\\\\]+"
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qstring"
				},
				{
					token: "string",
					regex: "'|$",
					next: "start"
				}
			]
		};
	};
	oop.inherits(StylusHighlightRules, TextHighlightRules);
	exports.StylusHighlightRules = StylusHighlightRules;
}));
export { require_stylus_highlight_rules as t };
