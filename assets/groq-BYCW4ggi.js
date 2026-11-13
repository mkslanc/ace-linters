import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/groq_highlight_rules.js
var require_groq_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var KNOWN_FUNCTIONS = "after|before|boost|coalesce|count|dateTime|defined|identity|length|lower|now|order|path|references|round|score|select|string|upper";
	var KEYWORD_OPERATORS = "in|match|asc|desc";
	var GroqHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "comment.line",
					regex: /\/\/.*$/
				},
				{
					token: "string.quoted.double",
					regex: /"/,
					next: "string_double"
				},
				{
					token: "string.quoted.single",
					regex: /'/,
					next: "string_single"
				},
				{
					token: "constant.numeric",
					regex: /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?(?!\w)/
				},
				{
					token: "constant.language",
					regex: /\b(?:true|false|null)\b/
				},
				{
					token: "keyword.control",
					regex: new RegExp("\\b(?:" + KEYWORD_OPERATORS + ")\\b")
				},
				{
					token: [
						"entity.name.tag",
						"punctuation.namespace",
						"support.function"
					],
					regex: /(\b[a-zA-Z_]\w*)(::)([a-zA-Z_]\w*(?=\s*\())/
				},
				{
					token: "support.function",
					regex: new RegExp("\\b(?:" + KNOWN_FUNCTIONS + ")\\b(?=\\s*\\()")
				},
				{
					token: "variable",
					regex: /\$[a-zA-Z_]\w*/
				},
				{
					token: "variable.language",
					regex: /@|\^+/
				},
				{
					token: "constant.language.wildcard",
					regex: /\*(?=\s*[\[{|)\],}]|\s*$)/
				},
				{
					token: "keyword.operator.spread",
					regex: /\.\.\./
				},
				{
					token: "keyword.operator.dereference",
					regex: /->/
				},
				{
					token: "keyword.operator.range",
					regex: /\.\.(?!\.)/
				},
				{
					token: "keyword.operator.pipe",
					regex: /\|(?!\|)/
				},
				{
					token: "keyword.operator.arrow",
					regex: /=>/
				},
				{
					token: "keyword.operator",
					regex: /[!=<>]=|&&|\|\||[!+\-*/%]|\*\*/
				},
				{
					token: "punctuation.accessor",
					regex: /\.(?!\.)/
				},
				{
					token: "paren.lparen",
					regex: /[\[{(]/
				},
				{
					token: "paren.rparen",
					regex: /[\]})]/
				},
				{
					token: "punctuation",
					regex: /[,:;]/
				},
				{
					token: "identifier",
					regex: /[a-zA-Z_]\w*/
				}
			],
			"string_double": [
				{
					token: "constant.character.escape",
					regex: /\\(?:[\\/"'bfnrt]|u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\})/
				},
				{
					token: "string.quoted.double",
					regex: /"/,
					next: "start"
				},
				{ defaultToken: "string.quoted.double" }
			],
			"string_single": [
				{
					token: "constant.character.escape",
					regex: /\\(?:[\\/"'bfnrt]|u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\})/
				},
				{
					token: "string.quoted.single",
					regex: /'/,
					next: "start"
				},
				{ defaultToken: "string.quoted.single" }
			]
		};
		this.normalizeRules();
	};
	oop.inherits(GroqHighlightRules, TextHighlightRules);
	exports.GroqHighlightRules = GroqHighlightRules;
}));
// node_modules/ace-code/src/mode/groq.js
var require_groq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_groq_highlight_rules().GroqHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/groq";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_groq();
