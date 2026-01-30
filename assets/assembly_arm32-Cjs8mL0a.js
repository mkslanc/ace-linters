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
import { t as require_coffee } from "./coffee-DtCgMn7G.js";
var require_assembly_arm32_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AssemblyARM32HighlightRules$1 = function() {
		this.$rules = {
			start: [
				{
					token: "keyword.control.assembly",
					regex: "\\b(?:cpsid|cpsie|cps|setend|(?:srs|rfe)(?:ia|ib|da|db|fd|ed|fa|ea)|bkpt|nop|pld|cdp2|mrc2|mrrc2|mcr2|mcrr2|ldc2|stc2|(?:add|adc|sub|sbc|rsb|rsc|mul|mla|umull|umlal|smull|smlal|mvn|and|eor|orr|bic)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?s?|(?:(?:q|qd)?(?:add|sub)|umaal|smul(?:b|t)(?:b|t)|smulw(?:b|t)|smla(?:b|t)(?:b|t)|smlaw(?:b|t)|smlal(?:b|t)(?:b|t)|smuadx?|smladx?|smlaldx?|smusdx?|smlsdx?|smlsldx?|smmulr?|smmlar?|smmlsr?|mia|miaph|mia(?:b|t)(?:b|t)|clz|(?:s|q|sh|u|uq|uh)(?:add16|sub16|add8|sub8|addsubx|subaddx)|usad8|usada8|mrs|msr|mra|mar|cpy|tst|teq|cmp|cmn|ssat|ssat16|usat|usat16|pkhbt|pkhtb|sxth|sxtb16|sxtb|uxth|uxtb16|uxtb|sxtah|sxtab16|sxtab|uxtah|uxtab16|uxtab|rev|rev16|revsh|sel|b|bl|bx|blx|bxj|swi|svc|ldrex|strex|cdp|mrc|mrrc|mcr|mcrr|ldc|stc)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?|ldr(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?(?:t|b|bt|sb|h|sh|d)?|str(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?(?:t|b|bt|h|d)?|(?:ldm|stm)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?(?:ia|ib|da|db|fd|ed|fa|ea)|swp(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?b?|mov(?:t|w)?)\\b",
					caseInsensitive: true
				},
				{
					token: "variable.parameter.register.assembly",
					regex: "\\b(?:r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|r12|r13|r14|r15|fp|ip|sp|lr|pc|cpsr|spsr|c|f|s|x|lsl|lsr|asr|ror|rrx)\\b",
					caseInsensitive: true
				},
				{
					token: "constant.character.hexadecimal.assembly",
					regex: "#0x[A-F0-9]+",
					caseInsensitive: true
				},
				{
					token: "constant.character.decimal.assembly",
					regex: "#[0-9]+"
				},
				{
					token: "string.assembly",
					regex: /'([^\\']|\\.)*'/
				},
				{
					token: "string.assembly",
					regex: /"([^\\"]|\\.)*"/
				},
				{
					token: "support.function.directive.assembly",
					regex: "(?:.section|.global|.text|.asciz|.asciiz|.ascii|.align|.byte|.end|.data|.equ|.extern|.include)"
				},
				{
					token: "entity.name.function.assembly",
					regex: "^\\s*%%[\\w.]+?:$"
				},
				{
					token: "entity.name.function.assembly",
					regex: "^\\s*%\\$[\\w.]+?:$"
				},
				{
					token: "entity.name.function.assembly",
					regex: "^[\\w.]+?:"
				},
				{
					token: "entity.name.function.assembly",
					regex: "^[\\w.]+?\\b"
				},
				{
					token: "comment.assembly",
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: "comment.assembly",
					regex: "(?:;|//|@).*$"
				}
			],
			comment: [{
				token: "comment.assembly",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }]
		};
		this.normalizeRules();
	};
	AssemblyARM32HighlightRules$1.metaData = {
		fileTypes: ["s"],
		name: "Assembly ARM32",
		scopeName: "source.assembly"
	};
	oop$1.inherits(AssemblyARM32HighlightRules$1, TextHighlightRules);
	exports.AssemblyARM32HighlightRules = AssemblyARM32HighlightRules$1;
}));
var require_assembly_arm32 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var AssemblyARM32HighlightRules = require_assembly_arm32_highlight_rules().AssemblyARM32HighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = AssemblyARM32HighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = [";"];
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/assembly_arm32";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_assembly_arm32();
