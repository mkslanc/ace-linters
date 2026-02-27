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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_mips_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var MIPSHighlightRules$1 = function() {
		var escapeRe = /\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source;
		this.$rules = { start: [
			{
				token: "storage.modifier.mips",
				regex: /\.\b(?:align|ascii|asciiz|byte|double|extern|float|globl|space|word)\b/,
				comment: "Assembler directives for data storage"
			},
			{
				token: "entity.name.section.mips",
				regex: /\.\b(?:data|text|kdata|ktext|)\b/,
				comment: "Segements: .data .text"
			},
			{
				token: "variable.parameter.mips",
				regex: /\$(?:(?:3[01]|[12]?[0-9]|[0-9])|zero|at|v[01]|a[0-3]|s[0-7]|t[0-9]|k[01]|gp|sp|fp|ra)/,
				comment: "Registers by id $1, $2, ..."
			},
			{
				token: "variable.parameter.mips",
				regex: /\$f(?:[0-9]|[1-2][0-9]|3[0-1])/,
				comment: "Floating point registers"
			},
			{
				token: "support.function.source.mips",
				regex: /\b(?:(?:add|sub|div|l|mov|mult|neg|s|c\.eq|c\.le|c\.lt)\.[ds]|cvt\.s\.[dw]|cvt\.d\.[sw]|cvt\.w\.[ds]|bc1[tf])\b/,
				comment: "The MIPS floating-point instruction set"
			},
			{
				token: "support.function.source.mips",
				regex: /\b(?:add|addu|addi|addiu|sub|subu|and|andi|or|not|ori|nor|xor|xori|slt|sltu|slti|sltiu|sll|sllv|rol|srl|sra|srlv|ror|j|jr|jal|beq|bne|lw|sw|lb|sb|lui|move|mfhi|mflo|mthi|mtlo)\b/,
				comment: "Just the hardcoded instructions provided by the MIPS assembly language"
			},
			{
				token: "support.function.other.mips",
				regex: /\b(?:abs|b|beqz|bge|bgt|bgtu|ble|bleu|blt|bltu|bnez|div|divu|la|li|move|mul|neg|not|rem|remu|seq|sge|sgt|sle|sne)\b/,
				comment: "Pseudo instructions"
			},
			{
				token: "entity.name.function.mips",
				regex: /\bsyscall\b/,
				comment: "Other"
			},
			{
				token: "string",
				regex: "(?:'\")(?:" + escapeRe + "|.)?(?:'\")"
			},
			{
				token: "string.start",
				regex: "'",
				stateName: "qstring",
				next: [
					{
						token: "string",
						regex: /\\\s*$/,
						next: "qqstring"
					},
					{
						token: "constant.language.escape",
						regex: escapeRe
					},
					{
						token: "string.end",
						regex: "'|$",
						next: "start"
					},
					{ defaultToken: "string" }
				]
			},
			{
				token: "string.start",
				regex: "\"",
				stateName: "qqstring",
				next: [
					{
						token: "string",
						regex: /\\\s*$/,
						next: "qqstring"
					},
					{
						token: "constant.language.escape",
						regex: escapeRe
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
				token: "constant.numeric.mips",
				regex: /\b(?:\d+|0(?:x|X)[a-fA-F0-9]+)\b/,
				comment: "Numbers like +12, -3, 55, 0x3F"
			},
			{
				token: "entity.name.tag.mips",
				regex: /\b[\w]+\b:/,
				comment: "Labels at line start: begin_repeat: add ..."
			},
			{
				token: "comment.assembly",
				regex: /#.*$/,
				comment: "Single line comments"
			}
		] };
		this.normalizeRules();
	};
	MIPSHighlightRules$1.metaData = {
		fileTypes: ["s", "asm"],
		name: "MIPS",
		scopeName: "source.mips"
	};
	oop$1.inherits(MIPSHighlightRules$1, TextHighlightRules);
	exports.MIPSHighlightRules = MIPSHighlightRules$1;
}));
var require_mips = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var MIPSHighlightRules = require_mips_highlight_rules().MIPSHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = MIPSHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["#"];
		this.$id = "ace/mode/mips";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_mips();
