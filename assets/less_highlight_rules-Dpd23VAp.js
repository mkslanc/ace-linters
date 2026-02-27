import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BN2AN0ZM.js";
var require_less_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CssHighlightRules = require_css_highlight_rules();
	var LessHighlightRules = function() {
		var keywordList = "@import|@media|@font-face|@keyframes|@-webkit-keyframes|@supports|@charset|@plugin|@namespace|@document|@page|@viewport|@-ms-viewport|or|and|when|not";
		var keywords = keywordList.split("|");
		var properties = CssHighlightRules.supportType.split("|");
		var keywordMapper = this.createKeywordMapper({
			"support.constant": CssHighlightRules.supportConstant,
			"keyword": keywordList,
			"support.constant.color": CssHighlightRules.supportConstantColor,
			"support.constant.fonts": CssHighlightRules.supportConstantFonts
		}, "identifier", true);
		var numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				{
					token: "comment",
					regex: "\\/\\*",
					next: "comment"
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
					token: ["constant.numeric", "keyword"],
					regex: "(" + numRe + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
				},
				{
					token: "constant.numeric",
					regex: "#[a-f0-9]{6}"
				},
				{
					token: "constant.numeric",
					regex: "#[a-f0-9]{3}"
				},
				{
					token: "constant.numeric",
					regex: numRe
				},
				{
					token: [
						"support.function",
						"paren.lparen",
						"string",
						"paren.rparen"
					],
					regex: "(url)(\\()(.*)(\\))"
				},
				{
					token: ["support.function", "paren.lparen"],
					regex: "(:extend|[a-z0-9_\\-]+)(\\()"
				},
				{
					token: function(value) {
						if (keywords.indexOf(value.toLowerCase()) > -1) return "keyword";
						else return "variable";
					},
					regex: "[@\\$][a-z0-9_\\-@\\$]*\\b"
				},
				{
					token: "variable",
					regex: "[@\\$]\\{[a-z0-9_\\-@\\$]*\\}"
				},
				{
					token: function(first, second) {
						if (properties.indexOf(first.toLowerCase()) > -1) return ["support.type.property", "text"];
						else return ["support.type.unknownProperty", "text"];
					},
					regex: "([a-z0-9-_]+)(\\s*:)"
				},
				{
					token: "keyword",
					regex: "&"
				},
				{
					token: keywordMapper,
					regex: "\\-?[@a-z_][@a-z0-9_\\-]*"
				},
				{
					token: "variable.language",
					regex: "#[a-z0-9-_]+"
				},
				{
					token: "variable.language",
					regex: "\\.[a-z0-9-_]+"
				},
				{
					token: "variable.language",
					regex: ":[a-z_][a-z0-9-_]*"
				},
				{
					token: "constant",
					regex: "[a-z0-9-_]+"
				},
				{
					token: "keyword.operator",
					regex: "<|>|<=|>=|=|!=|-|%|\\+|\\*"
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
				},
				{ caseInsensitive: true }
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }]
		};
		this.normalizeRules();
	};
	oop.inherits(LessHighlightRules, TextHighlightRules);
	exports.LessHighlightRules = LessHighlightRules;
}));
export { require_less_highlight_rules as t };
