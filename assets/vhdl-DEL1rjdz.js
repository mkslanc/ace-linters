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
//#region node_modules/ace-code/src/mode/vhdl_highlight_rules.js
var require_vhdl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var VHDLHighlightRules = function() {
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
	oop.inherits(VHDLHighlightRules, TextHighlightRules);
	exports.VHDLHighlightRules = VHDLHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/vhdl.js
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
//#endregion
export default require_vhdl();
