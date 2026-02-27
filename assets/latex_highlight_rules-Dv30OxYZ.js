import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
var require_latex_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LatexHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "%.*$"
				},
				{
					token: [
						"keyword",
						"lparen",
						"variable.parameter",
						"rparen",
						"lparen",
						"storage.type",
						"rparen"
					],
					regex: "(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})"
				},
				{
					token: [
						"keyword",
						"lparen",
						"variable.parameter",
						"rparen"
					],
					regex: "(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?"
				},
				{
					token: [
						"storage.type",
						"lparen",
						"variable.parameter",
						"rparen"
					],
					regex: "(\\\\begin)({)(verbatim)(})",
					next: "verbatim"
				},
				{
					token: [
						"storage.type",
						"lparen",
						"variable.parameter",
						"rparen"
					],
					regex: "(\\\\begin)({)(lstlisting)(})",
					next: "lstlisting"
				},
				{
					token: [
						"storage.type",
						"lparen",
						"variable.parameter",
						"rparen"
					],
					regex: "(\\\\(?:begin|end))({)([\\w*]*)(})"
				},
				{
					token: "storage.type",
					regex: /\\verb\b\*?/,
					next: [{
						token: [
							"keyword.operator",
							"string",
							"keyword.operator"
						],
						regex: "(.)(.*?)(\\1|$)|",
						next: "start"
					}]
				},
				{
					token: "storage.type",
					regex: "\\\\[a-zA-Z]+"
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
					token: "constant.character.escape",
					regex: "\\\\[^a-zA-Z]?"
				},
				{
					token: "string",
					regex: "\\${1,2}",
					next: "equation"
				}
			],
			"equation": [
				{
					token: "comment",
					regex: "%.*$"
				},
				{
					token: "string",
					regex: "\\${1,2}",
					next: "start"
				},
				{
					token: "constant.character.escape",
					regex: "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
				},
				{
					token: "error",
					regex: "^\\s*$",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"verbatim": [{
				token: [
					"storage.type",
					"lparen",
					"variable.parameter",
					"rparen"
				],
				regex: "(\\\\end)({)(verbatim)(})",
				next: "start"
			}, { defaultToken: "text" }],
			"lstlisting": [{
				token: [
					"storage.type",
					"lparen",
					"variable.parameter",
					"rparen"
				],
				regex: "(\\\\end)({)(lstlisting)(})",
				next: "start"
			}, { defaultToken: "text" }]
		};
		this.normalizeRules();
	};
	oop.inherits(LatexHighlightRules, TextHighlightRules);
	exports.LatexHighlightRules = LatexHighlightRules;
}));
export { require_latex_highlight_rules as t };
