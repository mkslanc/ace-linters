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
//#region node_modules/ace-code/src/mode/lucene_highlight_rules.js
var require_lucene_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LuceneHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "constant.language.escape",
					regex: /\\[\-+&|!(){}\[\]^"~*?:\\]/
				},
				{
					token: "constant.character.negation",
					regex: "\\-"
				},
				{
					token: "constant.character.interro",
					regex: "\\?"
				},
				{
					token: "constant.character.required",
					regex: "\\+"
				},
				{
					token: "constant.character.asterisk",
					regex: "\\*"
				},
				{
					token: "constant.character.proximity",
					regex: "~(?:0\\.[0-9]+|[0-9]+)?"
				},
				{
					token: "keyword.operator",
					regex: "(AND|OR|NOT|TO)\\b"
				},
				{
					token: "paren.lparen",
					regex: "[\\(\\{\\[]"
				},
				{
					token: "paren.rparen",
					regex: "[\\)\\}\\]]"
				},
				{
					token: "keyword.operator",
					regex: /[><=^]/
				},
				{
					token: "constant.numeric",
					regex: /\d[\d.-]*/
				},
				{
					token: "string",
					regex: /"(?:\\"|[^"])*"/
				},
				{
					token: "keyword",
					regex: /(?:\\.|[^\s\-+&|!(){}\[\]^"~*?:\\])+:/,
					next: "maybeRegex"
				},
				{
					token: "term",
					regex: /\w+/
				},
				{
					token: "text",
					regex: /\s+/
				}
			],
			"maybeRegex": [
				{
					token: "text",
					regex: /\s+/
				},
				{
					token: "string.regexp.start",
					regex: "/",
					next: "regex"
				},
				{
					regex: "",
					next: "start"
				}
			],
			"regex": [
				{
					token: "regexp.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
				},
				{
					token: "string.regexp.end",
					regex: "/[sxngimy]*",
					next: "start"
				},
				{
					token: "invalid",
					regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
				},
				{
					token: "constant.language.escape",
					regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
				},
				{
					token: "constant.language.escape",
					regex: "<d+-d+>|[~&@]"
				},
				{
					token: "constant.language.delimiter",
					regex: /\|/
				},
				{
					token: "constant.language.escape",
					regex: /\[\^?/,
					next: "regex_character_class"
				},
				{
					token: "empty",
					regex: "$",
					next: "start"
				},
				{ defaultToken: "string.regexp" }
			],
			"regex_character_class": [
				{
					token: "regexp.charclass.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
				},
				{
					token: "constant.language.escape",
					regex: "]",
					next: "regex"
				},
				{
					token: "constant.language.escape",
					regex: "-"
				},
				{
					token: "empty",
					regex: "$",
					next: "start"
				},
				{ defaultToken: "string.regexp.characterclass" }
			]
		};
	};
	oop.inherits(LuceneHighlightRules, TextHighlightRules);
	exports.LuceneHighlightRules = LuceneHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/lucene.js
var require_lucene = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var LuceneHighlightRules = require_lucene_highlight_rules().LuceneHighlightRules;
	var Mode = function() {
		this.HighlightRules = LuceneHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/lucene";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_lucene();
