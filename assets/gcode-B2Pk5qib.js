import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
var require_gcode_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GcodeHighlightRules$1 = function() {
		var keywords = "IF|DO|WHILE|ENDWHILE|CALL|ENDIF|SUB|ENDSUB|GOTO|REPEAT|ENDREPEAT|CALL";
		var builtinConstants = "PI";
		var builtinFunctions = "ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN";
		var keywordMapper = this.createKeywordMapper({
			"support.function": builtinFunctions,
			"keyword": keywords,
			"constant.language": builtinConstants
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
	oop$1.inherits(GcodeHighlightRules$1, TextHighlightRules);
	exports.GcodeHighlightRules = GcodeHighlightRules$1;
}));
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
