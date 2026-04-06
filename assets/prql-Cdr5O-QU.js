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
//#region node_modules/ace-code/src/mode/prql_highlight_rules.js
var require_prql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PrqlHighlightRules = function() {
		var builtinFunctions = "min|max|sum|average|stddev|every|any|concat_array|count|lag|lead|first|last|rank|rank_dense|row_number|round|as|in|tuple_every|tuple_map|tuple_zip|_eq|_is_null|from_text|lower|upper|read_parquet|read_csv";
		var builtinTypes = [
			"bool",
			"int",
			"int8",
			"int16",
			"int32",
			"int64",
			"int128",
			"float",
			"text",
			"timestamp",
			"set"
		].join("|");
		var keywordMapper = this.createKeywordMapper({
			"constant.language": "null",
			"constant.language.boolean": "true|false",
			"keyword": "let|into|case|prql|type|module|internal",
			"storage.type": "let|func",
			"support.function": builtinFunctions,
			"support.type": builtinTypes,
			"variable.language": "date|math"
		}, "identifier");
		var escapeRe = /\\(\d+|['"\\&bfnrt]|u\{[0-9a-fA-F]{1,6}\}|x[0-9a-fA-F]{2})/;
		var identifierRe = /[A-Za-z_][a-z_A-Z0-9]/.source;
		var numRe = /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/.source;
		var bidi = "[\\u202A\\u202B\\u202D\\u202E\\u2066\\u2067\\u2068\\u202C\\u2069]";
		this.$rules = {
			start: [
				{
					token: "string.start",
					regex: "s?\"",
					next: "string"
				},
				{
					token: "string.start",
					regex: "f\"",
					next: "fstring"
				},
				{
					token: "string.start",
					regex: "r\"",
					next: "rstring"
				},
				{
					token: "string.single",
					start: "'",
					end: "'"
				},
				{
					token: "string.character",
					regex: "'(?:" + escapeRe.source + "|.)'?"
				},
				{
					token: "constant.language",
					regex: "^" + identifierRe + "*"
				},
				{
					token: ["constant.numeric", "keyword"],
					regex: "(" + numRe + ")(years|months|weeks|days|hours|minutes|seconds|milliseconds|microseconds)"
				},
				{
					token: "constant.numeric",
					regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
				},
				{
					token: "constant.numeric",
					regex: numRe
				},
				{
					token: "comment.block.documentation",
					regex: "#!.*"
				},
				{
					token: "comment.line.number-sign",
					regex: "#.*"
				},
				{
					token: "keyword.operator",
					regex: /\|\s*/,
					next: "pipe"
				},
				{
					token: "keyword.operator",
					regex: /->|=>|==|!=|>=|<=|~=|&&|\|\||\?\?|\/\/|@/
				},
				{
					token: "invalid.illegal",
					regex: bidi
				},
				{
					token: "punctuation.operator",
					regex: /[,`]/
				},
				{
					token: keywordMapper,
					regex: "[\\w\\xff-\\u218e\\u2455-\\uffff]+\\b"
				},
				{
					token: "paren.lparen",
					regex: /[\[({]/
				},
				{
					token: "paren.rparen",
					regex: /[\])}]/
				}
			],
			pipe: [{
				token: "constant.language",
				regex: identifierRe + "*",
				next: "pop"
			}, {
				token: "error",
				regex: "",
				next: "pop"
			}],
			string: [
				{
					token: "constant.character.escape",
					regex: escapeRe
				},
				{
					token: "text",
					regex: /\\(\s|$)/,
					next: "stringGap"
				},
				{
					token: "string.end",
					regex: "\"",
					next: "start"
				},
				{
					token: "invalid.illegal",
					regex: bidi
				},
				{ defaultToken: "string.double" }
			],
			stringGap: [{
				token: "text",
				regex: /\\/,
				next: "string"
			}, {
				token: "error",
				regex: "",
				next: "start"
			}],
			fstring: [
				{
					token: "constant.character.escape",
					regex: escapeRe
				},
				{
					token: "string.end",
					regex: "\"",
					next: "start"
				},
				{
					token: "invalid.illegal",
					regex: bidi
				},
				{
					token: "paren.lparen",
					regex: "{",
					push: "fstringParenRules"
				},
				{
					token: "invalid.illegal",
					regex: bidi
				},
				{ defaultToken: "string" }
			],
			fstringParenRules: [{
				token: "constant.language",
				regex: "^" + identifierRe + "*"
			}, {
				token: "paren.rparen",
				regex: "}",
				next: "pop"
			}],
			rstring: [
				{
					token: "string.end",
					regex: "\"",
					next: "start"
				},
				{
					token: "invalid.illegal",
					regex: bidi
				},
				{ defaultToken: "string" }
			]
		};
		this.normalizeRules();
	};
	oop.inherits(PrqlHighlightRules, TextHighlightRules);
	exports.PrqlHighlightRules = PrqlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/prql.js
var require_prql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_prql_highlight_rules().PrqlHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/prql";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_prql();
