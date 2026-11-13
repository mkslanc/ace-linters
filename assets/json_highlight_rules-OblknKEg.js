import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules } from "./text-SKNm_D_P.js";
// node_modules/ace-code/src/mode/json_highlight_rules.js
var require_json_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JsonHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "variable",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]\\s*(?=:)"
				},
				{
					token: "string",
					regex: "\"",
					next: "string"
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
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				},
				{
					token: "text",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				{
					token: "comment.start",
					regex: "\\/\\*",
					next: "comment"
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
					token: "punctuation.operator",
					regex: /[,]/
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"string": [
				{
					token: "constant.language.escape",
					regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"comment": [{
				token: "comment.end",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }]
		};
	};
	oop.inherits(JsonHighlightRules, TextHighlightRules);
	exports.JsonHighlightRules = JsonHighlightRules;
}));
export { require_json_highlight_rules as t };
