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
//#region node_modules/ace-code/src/mode/bibtex_highlight_rules.js
var require_bibtex_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var BibTeXHighlightRules = function() {
		this.$rules = {
			start: [
				{
					token: "comment",
					regex: /@Comment\{/,
					stateName: "bibtexComment",
					push: [
						{
							token: "comment",
							regex: /}/,
							next: "pop"
						},
						{
							token: "comment",
							regex: /\{/,
							push: "bibtexComment"
						},
						{ defaultToken: "comment" }
					]
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen",
						"text",
						"variable",
						"text",
						"keyword.operator"
					],
					regex: /(@String)(\s*)(\{)(\s*)([a-zA-Z]*)(\s*)(=)/,
					push: [
						{
							token: "paren.rparen",
							regex: /\}/,
							next: "pop"
						},
						{ include: "#misc" },
						{ defaultToken: "text" }
					]
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen",
						"text",
						"variable",
						"text",
						"keyword.operator"
					],
					regex: /(@String)(\s*)(\()(\s*)([a-zA-Z]*)(\s*)(=)/,
					push: [
						{
							token: "paren.rparen",
							regex: /\)/,
							next: "pop"
						},
						{ include: "#misc" },
						{ defaultToken: "text" }
					]
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen"
					],
					regex: /(@preamble)(\s*)(\()/,
					push: [
						{
							token: "paren.rparen",
							regex: /\)/,
							next: "pop"
						},
						{ include: "#misc" },
						{ defaultToken: "text" }
					]
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen"
					],
					regex: /(@preamble)(\s*)(\{)/,
					push: [
						{
							token: "paren.rparen",
							regex: /\}/,
							next: "pop"
						},
						{ include: "#misc" },
						{ defaultToken: "text" }
					]
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen",
						"text",
						"support.class"
					],
					regex: /(@[a-zA-Z]+)(\s*)(\{)(\s*)([\w-]+)/,
					push: [
						{
							token: "paren.rparen",
							regex: /\}/,
							next: "pop"
						},
						{
							token: [
								"variable",
								"text",
								"keyword.operator"
							],
							regex: /([a-zA-Z0-9\!\$\&\*\+\-\.\/\:\;\<\>\?\[\]\^\_\`\|]+)(\s*)(=)/,
							push: [
								{
									token: "text",
									regex: /(?=[,}])/,
									next: "pop"
								},
								{ include: "#misc" },
								{ include: "#integer" },
								{ defaultToken: "text" }
							]
						},
						{
							token: "punctuation",
							regex: /,/
						},
						{ defaultToken: "text" }
					]
				},
				{ defaultToken: "comment" }
			],
			"#integer": [{
				token: "constant.numeric.bibtex",
				regex: /\d+/
			}],
			"#misc": [
				{
					token: "string",
					regex: /"/,
					push: "#string_quotes"
				},
				{
					token: "paren.lparen",
					regex: /\{/,
					push: "#string_braces"
				},
				{
					token: "keyword.operator",
					regex: /#/
				}
			],
			"#string_braces": [
				{
					token: "paren.rparen",
					regex: /\}/,
					next: "pop"
				},
				{
					token: "invalid.illegal",
					regex: /@/
				},
				{ include: "#misc" },
				{ defaultToken: "string" }
			],
			"#string_quotes": [
				{
					token: "string",
					regex: /"/,
					next: "pop"
				},
				{ include: "#misc" },
				{ defaultToken: "string" }
			]
		};
		this.normalizeRules();
	};
	oop.inherits(BibTeXHighlightRules, TextHighlightRules);
	exports.BibTeXHighlightRules = BibTeXHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/bibtex.js
var require_bibtex = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var BibTeXHighlightRules = require_bibtex_highlight_rules().BibTeXHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = BibTeXHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/bibtex";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_bibtex();
