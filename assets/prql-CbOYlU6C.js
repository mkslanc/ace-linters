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
var require_prql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
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
	oop$1.inherits(PrqlHighlightRules, TextHighlightRules);
	exports.PrqlHighlightRules = PrqlHighlightRules;
}));
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
export default require_prql();
