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
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
var require_bibtex_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var BibTeXHighlightRules$1 = function() {
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
	oop$1.inherits(BibTeXHighlightRules$1, TextHighlightRules);
	exports.BibTeXHighlightRules = BibTeXHighlightRules$1;
}));
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
