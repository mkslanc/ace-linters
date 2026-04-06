import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
//#region node_modules/ace-code/src/mode/verilog_highlight_rules.js
var require_verilog_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var VerilogHighlightRules = function() {
		var keywords = "always|and|assign|automatic|begin|buf|bufif0|bufif1|case|casex|casez|cell|cmos|config|deassign|default|defparam|design|disable|edge|else|end|endcase|endconfig|endfunction|endgenerate|endmodule|endprimitive|endspecify|endtable|endtask|event|for|force|forever|fork|function|generate|genvar|highz0|highz1|if|ifnone|incdir|include|initial|inout|input|instance|integer|join|large|liblist|library|localparam|macromodule|medium|module|nand|negedge|nmos|nor|noshowcancelled|not|notif0|notif1|or|output|parameter|pmos|posedge|primitive|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|rcmos|real|realtime|reg|release|repeat|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|showcancelled|signed|small|specify|specparam|strong0|strong1|supply0|supply1|table|task|time|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|unsigned|use|vectored|wait|wand|weak0|weak1|while|wire|wor|xnor|xorbegin|bufif0|bufif1|case|casex|casez|config|else|end|endcase|endconfig|endfunction|endgenerate|endmodule|endprimitive|endspecify|endtable|endtask|for|forever|function|generate|if|ifnone|macromodule|module|primitive|repeat|specify|table|task|while";
		var builtinConstants = "true|false|null";
		var builtinFunctions = "count|min|max|avg|sum|rank|now|coalesce|main";
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
				token: "comment.start",
				regex: "/\\*",
				next: [{
					token: "comment.end",
					regex: "\\*/",
					next: "start"
				}, { defaultToken: "comment" }]
			},
			{
				token: "string.start",
				regex: "\"",
				next: [
					{
						token: "constant.language.escape",
						regex: /\\(?:[ntvfa\\"]|[0-7]{1,3}|\x[a-fA-F\d]{1,2}|)/,
						consumeLineEnd: true
					},
					{
						token: "string.end",
						regex: "\"|$",
						next: "start"
					},
					{ defaultToken: "string" }
				]
			},
			{
				token: "string",
				regex: "'^[']'"
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
	oop.inherits(VerilogHighlightRules, TextHighlightRules);
	exports.VerilogHighlightRules = VerilogHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/verilog.js
var require_verilog = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var VerilogHighlightRules = require_verilog_highlight_rules().VerilogHighlightRules;
	require_range().Range;
	var Mode = function() {
		this.HighlightRules = VerilogHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$quotes = { "\"": "\"" };
		this.$id = "ace/mode/verilog";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_verilog();
