import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/bibtex_highlight_rules.js
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
// node_modules/ace-code/src/mode/bibtex.js
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
export default require_bibtex();
