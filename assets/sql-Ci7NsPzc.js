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
import "./cstyle-C6ktp4d4.js";
import { t as require_sql$1 } from "./sql-DPvFgpCq.js";
var require_sql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SqlHighlightRules$1 = function() {
		var keywords = "select|insert|update|delete|from|where|and|or|group|by|order|limit|offset|having|as|case|when|then|else|end|type|left|right|join|on|outer|desc|asc|union|create|table|primary|key|if|foreign|not|references|default|null|inner|cross|natural|database|drop|grant|distinct|is|in|all|alter|any|array|at|authorization|between|both|cast|check|collate|column|commit|constraint|cube|current|current_date|current_time|current_timestamp|current_user|describe|escape|except|exists|external|extract|fetch|filter|for|full|function|global|grouping|intersect|interval|into|leading|like|local|no|of|only|out|overlaps|partition|position|range|revoke|rollback|rollup|row|rows|session_user|set|some|start|tablesample|time|to|trailing|truncate|unique|unknown|user|using|values|window|with";
		var builtinConstants = "true|false";
		var builtinFunctions = "avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|format|coalesce|ifnull|isnull|nvl";
		var dataTypes = "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|money|real|number|integer|string";
		var keywordMapper = this.createKeywordMapper({
			"support.function": builtinFunctions,
			"keyword": keywords,
			"constant.language": builtinConstants,
			"storage.type": dataTypes
		}, "identifier", true);
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "--.*$"
			},
			{
				token: "comment",
				start: "/\\*",
				end: "\\*/"
			},
			{
				token: "string",
				regex: "\".*?\""
			},
			{
				token: "string",
				regex: "'.*?'"
			},
			{
				token: "string",
				regex: "`.*?`"
			},
			{
				token: "constant.numeric",
				regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator",
				regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
			},
			{
				token: "paren.lparen",
				regex: "[\\(]"
			},
			{
				token: "paren.rparen",
				regex: "[\\)]"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		] };
		this.normalizeRules();
	};
	oop$1.inherits(SqlHighlightRules$1, TextHighlightRules);
	exports.SqlHighlightRules = SqlHighlightRules$1;
}));
var require_sql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var SqlHighlightRules = require_sql_highlight_rules().SqlHighlightRules;
	var SqlFoldMode = require_sql$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = SqlHighlightRules;
		this.foldingRules = new SqlFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/sql";
		this.snippetFileId = "ace/snippets/sql";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_sql();
