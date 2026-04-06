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
import "./cstyle-C7DhJywu.js";
import { t as require_sql } from "./sql-DKGFCp5Z.js";
//#region node_modules/ace-code/src/mode/plsql_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_plsql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var plsqlHighlightRules = function() {
		var keywords = "all|alter|and|any|array|arrow|as|asc|at|begin|between|by|case|check|clusters|cluster|colauth|columns|compress|connect|crash|create|cross|current|database|declare|default|delete|desc|distinct|drop|else|end|exception|exclusive|exists|fetch|form|for|foreign|from|goto|grant|group|having|identified|if|in|inner|indexes|index|insert|intersect|into|is|join|key|left|like|lock|minus|mode|natural|nocompress|not|nowait|null|of|on|option|or|order|overlaps|outer|primary|prior|procedure|public|qualify|range|record|references|resource|revoke|right|select|share|size|sql|start|subtype|tabauth|table|then|to|type|union|unique|update|use|values|view|views|when|where|with";
		var builtinConstants = "true|false";
		var builtinFunctions = "abs|acos|add_months|ascii|asciistr|asin|atan|atan2|avg|bfilename|bin_to_num|bitand|cardinality|case|cast|ceil|chartorowid|chr|coalesce|compose|concat|convert|corr|cos|cosh|count|covar_pop|covar_samp|cume_dist|current_date|current_timestamp|dbtimezone|decode|decompose|dense_rank|dump|empty_blob|empty_clob|exp|extract|first_value|floor|from_tz|greatest|group_id|hextoraw|initcap|instr|instr2|instr4|instrb|instrc|lag|last_day|last_value|lead|least|length|length2|length4|lengthb|lengthc|listagg|ln|lnnvl|localtimestamp|log|lower|lpad|ltrim|max|median|min|mod|months_between|nanvl|nchr|new_time|next_day|nth_value|nullif|numtodsinterval|numtoyminterval|nvl|nvl2|power|rank|rawtohex|regexp_count|regexp_instr|regexp_replace|regexp_substr|remainder|replace|round|row_number|rownum|rpad|rtrim|sessiontimezone|sign|sin|sinh|soundex|sqrt|stddev|substr|sum|sys_context|sysdate|systimestamp|tan|tanh|to_char|to_clob|to_date|to_dsinterval|to_lob|to_multi_byte|to_nclob|to_number|to_single_byte|to_timestamp|to_timestamp_tz|to_yminterval|translate|trim|trunc|tz_offset|uid|upper|user|userenv|var_pop|var_samp|variance|vsize";
		var dataTypes = "char|nchar|nvarchar2|varchar2|long|raw|number|numeric|float|dec|decimal|integer|int|smallint|real|double|precision|date|timestamp|interval|year|day|bfile|blob|clob|nclob|rowid|urowid";
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
	oop.inherits(plsqlHighlightRules, TextHighlightRules);
	exports.plsqlHighlightRules = plsqlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/plsql.js
var require_plsql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PLSqlHighlightRules = require_plsql_highlight_rules().plsqlHighlightRules;
	var FoldMode = require_sql().FoldMode;
	var Mode = function() {
		this.HighlightRules = PLSqlHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/plsql";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_plsql();
