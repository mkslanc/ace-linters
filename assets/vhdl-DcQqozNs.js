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
var require_vhdl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var VHDLHighlightRules$1 = function() {
		var keywords = "access|after|alias|all|architecture|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|context|disconnect|downto|else|elsif|end|entity|exit|file|for|force|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|of|on|or|open|others|out|package|parameter|port|postponed|procedure|process|protected|pure|range|record|register|reject|release|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with";
		var storageType = "bit|bit_vector|boolean|character|integer|line|natural|positive|real|register|signed|std_logic|std_logic_vector|string||text|time|unsigned";
		var storageModifiers = "array|constant";
		var keywordOperators = "abs|and|mod|nand|nor|not|rem|rol|ror|sla|sll|srasrl|xnor|xor";
		var builtinConstants = "true|false|null";
		var keywordMapper = this.createKeywordMapper({
			"keyword.operator": keywordOperators,
			"keyword": keywords,
			"constant.language": builtinConstants,
			"storage.modifier": storageModifiers,
			"storage.type": storageType
		}, "identifier", true);
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "--.*$"
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
				token: "keyword",
				regex: "\\s*(?:library|package|use)\\b"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator",
				regex: "&|\\*|\\+|\\-|\\/|<|=|>|\\||=>|\\*\\*|:=|\\/=|>=|<=|<>"
			},
			{
				token: "punctuation.operator",
				regex: "\\'|\\:|\\,|\\;|\\."
			},
			{
				token: "paren.lparen",
				regex: "[[(]"
			},
			{
				token: "paren.rparen",
				regex: "[\\])]"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		] };
	};
	oop$1.inherits(VHDLHighlightRules$1, TextHighlightRules);
	exports.VHDLHighlightRules = VHDLHighlightRules$1;
}));
var require_vhdl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var VHDLHighlightRules = require_vhdl_highlight_rules().VHDLHighlightRules;
	var Mode = function() {
		this.HighlightRules = VHDLHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.$id = "ace/mode/vhdl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_vhdl();
