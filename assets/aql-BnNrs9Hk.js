import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
//#region node_modules/ace-code/src/mode/aql_highlight_rules.js
var require_aql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AqlHighlightRules = function() {
		var keywords = "for|return|filter|search|sort|limit|let|collect|asc|desc|in|into|insert|update|remove|replace|upsert|options|with|and|or|not|distinct|graph|shortest_path|outbound|inbound|any|all|none|at least|aggregate|like|k_shortest_paths|k_paths|all_shortest_paths|prune|window";
		var builtinConstants = "true|false";
		var builtinFunctions = "to_bool|to_number|to_string|to_array|to_list|is_null|is_bool|is_number|is_string|is_array|is_list|is_object|is_document|is_datestring|typename|json_stringify|json_parse|concat|concat_separator|char_length|lower|upper|substring|left|right|trim|reverse|contains|log|log2|log10|exp|exp2|sin|cos|tan|asin|acos|atan|atan2|radians|degrees|pi|regex_test|regex_replace|like|floor|ceil|round|abs|rand|sqrt|pow|length|count|min|max|average|avg|sum|product|median|variance_population|variance_sample|variance|percentile|bit_and|bit_or|bit_xor|bit_negate|bit_test|bit_popcount|bit_shift_left|bit_shift_right|bit_construct|bit_deconstruct|bit_to_string|bit_from_string|first|last|unique|outersection|interleave|in_range|jaccard|matches|merge|merge_recursive|has|attributes|keys|values|unset|unset_recursive|keep|keep_recursive|near|within|within_rectangle|is_in_polygon|distance|fulltext|stddev_sample|stddev_population|stddev|slice|nth|position|contains_array|translate|zip|call|apply|push|append|pop|shift|unshift|remove_value|remove_values|remove_nth|replace_nth|date_now|date_timestamp|date_iso8601|date_dayofweek|date_year|date_month|date_day|date_hour|date_minute|date_second|date_millisecond|date_dayofyear|date_isoweek|date_isoweekyear|date_leapyear|date_quarter|date_days_in_month|date_trunc|date_round|date_add|date_subtract|date_diff|date_compare|date_format|date_utctolocal|date_localtoutc|date_timezone|date_timezones|fail|passthru|v8|sleep|schema_get|schema_validate|shard_id|call_greenspun|version|noopt|noeval|not_null|first_list|first_document|parse_identifier|current_user|current_database|collection_count|pregel_result|collections|document|decode_rev|range|union|union_distinct|minus|intersection|flatten|is_same_collection|check_document|ltrim|rtrim|find_first|find_last|split|substitute|ipv4_to_number|ipv4_from_number|is_ipv4|md5|sha1|sha512|crc32|fnv64|hash|random_token|to_base64|to_hex|encode_uri_component|soundex|assert|warn|is_key|sorted|sorted_unique|count_distinct|count_unique|levenshtein_distance|levenshtein_match|regex_matches|regex_split|ngram_match|ngram_similarity|ngram_positional_similarity|uuid|tokens|exists|starts_with|phrase|min_match|bm25|tfidf|boost|analyzer|cosine_similarity|decay_exp|decay_gauss|decay_linear|l1_distance|l2_distance|minhash|minhash_count|minhash_error|minhash_match|geo_point|geo_multipoint|geo_polygon|geo_multipolygon|geo_linestring|geo_multilinestring|geo_contains|geo_intersects|geo_equals|geo_distance|geo_area|geo_in_range";
		var keywordMapper = this.createKeywordMapper({
			"support.function": builtinFunctions,
			"keyword": keywords,
			"constant.language": builtinConstants
		}, "identifier", true);
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "//.*$"
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
	oop.inherits(AqlHighlightRules, TextHighlightRules);
	exports.AqlHighlightRules = AqlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/aql.js
var require_aql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var AqlHighlightRules = require_aql_highlight_rules().AqlHighlightRules;
	var Mode = function() {
		this.HighlightRules = AqlHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/aql";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_aql();
