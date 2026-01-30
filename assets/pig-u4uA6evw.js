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
var require_pig_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PigHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				token: "comment.block.pig",
				regex: /\/\*/,
				push: [{
					token: "comment.block.pig",
					regex: /\*\//,
					next: "pop"
				}, { defaultToken: "comment.block.pig" }]
			},
			{
				token: "comment.line.double-dash.asciidoc",
				regex: /--.*$/
			},
			{
				token: "keyword.control.pig",
				regex: /\b(?:ASSERT|LOAD|STORE|DUMP|FILTER|DISTINCT|FOREACH|GENERATE|STREAM|JOIN|COGROUP|GROUP|CROSS|ORDER|LIMIT|UNION|SPLIT|DESCRIBE|EXPLAIN|ILLUSTRATE|AS|BY|INTO|USING|LIMIT|PARALLEL|OUTER|INNER|DEFAULT|LEFT|SAMPLE|RANK|CUBE|ALL|KILL|QUIT|MAPREDUCE|ASC|DESC|THROUGH|SHIP|CACHE|DECLARE|CASE|WHEN|THEN|END|IN|PARTITION|FULL|IMPORT|IF|ONSCHEMA|INPUT|OUTPUT)\b/,
				caseInsensitive: true
			},
			{
				token: "storage.datatypes.pig",
				regex: /\b(?:int|long|float|double|chararray|bytearray|boolean|datetime|biginteger|bigdecimal|tuple|bag|map)\b/,
				caseInsensitive: true
			},
			{
				token: "support.function.storage.pig",
				regex: /\b(?:PigStorage|BinStorage|BinaryStorage|PigDump|HBaseStorage|JsonLoader|JsonStorage|AvroStorage|TextLoader|PigStreaming|TrevniStorage|AccumuloStorage)\b/
			},
			{
				token: "support.function.udf.pig",
				regex: /\b(?:DIFF|TOBAG|TOMAP|TOP|TOTUPLE|RANDOM|FLATTEN|flatten|CUBE|ROLLUP|IsEmpty|ARITY|PluckTuple|SUBTRACT|BagToString)\b/
			},
			{
				token: "support.function.udf.math.pig",
				regex: /\b(?:ABS|ACOS|ASIN|ATAN|CBRT|CEIL|COS|COSH|EXP|FLOOR|LOG|LOG10|ROUND|ROUND_TO|SIN|SINH|SQRT|TAN|TANH|AVG|COUNT|COUNT_STAR|MAX|MIN|SUM|COR|COV)\b/
			},
			{
				token: "support.function.udf.string.pig",
				regex: /\b(?:CONCAT|INDEXOF|LAST_INDEX_OF|LCFIRST|LOWER|REGEX_EXTRACT|REGEX_EXTRACT_ALL|REPLACE|SIZE|STRSPLIT|SUBSTRING|TOKENIZE|TRIM|UCFIRST|UPPER|LTRIM|RTRIM|ENDSWITH|STARTSWITH|TRIM)\b/
			},
			{
				token: "support.function.udf.datetime.pig",
				regex: /\b(?:AddDuration|CurrentTime|DaysBetween|GetDay|GetHour|GetMilliSecond|GetMinute|GetMonth|GetSecond|GetWeek|GetWeekYear|GetYear|HoursBetween|MilliSecondsBetween|MinutesBetween|MonthsBetween|SecondsBetween|SubtractDuration|ToDate|WeeksBetween|YearsBetween|ToMilliSeconds|ToString|ToUnixTime)\b/
			},
			{
				token: "support.function.command.pig",
				regex: /\b(?:cat|cd|copyFromLocal|copyToLocal|cp|ls|mkdir|mv|pwd|rm)\b/
			},
			{
				token: "variable.pig",
				regex: /\$[a_zA-Z0-9_]+/
			},
			{
				token: "constant.language.pig",
				regex: /\b(?:NULL|true|false|stdin|stdout|stderr)\b/,
				caseInsensitive: true
			},
			{
				token: "constant.numeric.pig",
				regex: /\b\d+(?:\.\d+)?\b/
			},
			{
				token: "keyword.operator.comparison.pig",
				regex: /!=|==|<|>|<=|>=|\b(?:MATCHES|IS|OR|AND|NOT)\b/,
				caseInsensitive: true
			},
			{
				token: "keyword.operator.arithmetic.pig",
				regex: /\+|\-|\*|\/|\%|\?|:|::|\.\.|#/
			},
			{
				token: "string.quoted.double.pig",
				regex: /"/,
				push: [
					{
						token: "string.quoted.double.pig",
						regex: /"/,
						next: "pop"
					},
					{
						token: "constant.character.escape.pig",
						regex: /\\./
					},
					{ defaultToken: "string.quoted.double.pig" }
				]
			},
			{
				token: "string.quoted.single.pig",
				regex: /'/,
				push: [
					{
						token: "string.quoted.single.pig",
						regex: /'/,
						next: "pop"
					},
					{
						token: "constant.character.escape.pig",
						regex: /\\./
					},
					{ defaultToken: "string.quoted.single.pig" }
				]
			},
			{ todo: {
				token: [
					"text",
					"keyword.parameter.pig",
					"text",
					"storage.type.parameter.pig"
				],
				regex: /^(\s*)(set)(\s+)(\S+)/,
				caseInsensitive: true,
				push: [{
					token: "text",
					regex: /$/,
					next: "pop"
				}, { include: "$self" }]
			} },
			{
				token: [
					"text",
					"keyword.alias.pig",
					"text",
					"storage.type.alias.pig"
				],
				regex: /(\s*)(DEFINE|DECLARE|REGISTER)(\s+)(\S+)/,
				caseInsensitive: true,
				push: [{
					token: "text",
					regex: /;?$/,
					next: "pop"
				}]
			}
		] };
		this.normalizeRules();
	};
	PigHighlightRules$1.metaData = {
		fileTypes: ["pig"],
		name: "Pig",
		scopeName: "source.pig"
	};
	oop$1.inherits(PigHighlightRules$1, TextHighlightRules);
	exports.PigHighlightRules = PigHighlightRules$1;
}));
var require_pig = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PigHighlightRules = require_pig_highlight_rules().PigHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = PigHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/pig";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_pig();
