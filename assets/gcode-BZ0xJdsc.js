import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_range } from "./range-Di2RGtqB.js";
// node_modules/ace-code/src/mode/gcode_highlight_rules.js
var require_gcode_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GcodeHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"support.function": "ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN",
			"keyword": "IF|DO|WHILE|ENDWHILE|CALL|ENDIF|SUB|ENDSUB|GOTO|REPEAT|ENDREPEAT|CALL",
			"constant.language": "PI"
		}, "identifier", true);
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "\\(.*\\)"
			},
			{
				token: "comment",
				regex: "([N])([0-9]+)"
			},
			{
				token: "string",
				regex: "([G])([0-9]+\\.?[0-9]?)"
			},
			{
				token: "string",
				regex: "([M])([0-9]+\\.?[0-9]?)"
			},
			{
				token: "constant.numeric",
				regex: "([-+]?([0-9]*\\.?[0-9]+\\.?))|(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"
			},
			{
				token: keywordMapper,
				regex: "[A-Z]"
			},
			{
				token: "keyword.operator",
				regex: "EQ|LT|GT|NE|GE|LE|OR|XOR"
			},
			{
				token: "paren.lparen",
				regex: "[\\[]"
			},
			{
				token: "paren.rparen",
				regex: "[\\]]"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		] };
	};
	oop.inherits(GcodeHighlightRules, TextHighlightRules);
	exports.GcodeHighlightRules = GcodeHighlightRules;
}));
// node_modules/ace-code/src/mode/gcode.js
var require_gcode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var GcodeHighlightRules = require_gcode_highlight_rules().GcodeHighlightRules;
	require_range().Range;
	var Mode = function() {
		this.HighlightRules = GcodeHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/gcode";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_gcode();
