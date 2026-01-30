import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
var require_tex_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TexHighlightRules = function(textClass) {
		if (!textClass) textClass = "text";
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "%.*$"
				},
				{
					token: textClass,
					regex: "\\\\[$&%#\\{\\}]"
				},
				{
					token: "keyword",
					regex: "\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",
					next: "nospell"
				},
				{
					token: "keyword",
					regex: "\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])"
				},
				{
					token: "paren.keyword.operator",
					regex: "[[({]"
				},
				{
					token: "paren.keyword.operator",
					regex: "[\\])}]"
				},
				{
					token: textClass,
					regex: "\\s+"
				}
			],
			"nospell": [
				{
					token: "comment",
					regex: "%.*$",
					next: "start"
				},
				{
					token: "nospell." + textClass,
					regex: "\\\\[$&%#\\{\\}]"
				},
				{
					token: "keyword",
					regex: "\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"
				},
				{
					token: "keyword",
					regex: "\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])",
					next: "start"
				},
				{
					token: "paren.keyword.operator",
					regex: "[[({]"
				},
				{
					token: "paren.keyword.operator",
					regex: "[\\])]"
				},
				{
					token: "paren.keyword.operator",
					regex: "}",
					next: "start"
				},
				{
					token: "nospell." + textClass,
					regex: "\\s+"
				},
				{
					token: "nospell." + textClass,
					regex: "\\w+"
				}
			]
		};
	};
	oop.inherits(TexHighlightRules, TextHighlightRules);
	exports.TexHighlightRules = TexHighlightRules;
}));
export { require_tex_highlight_rules as t };
