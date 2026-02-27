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
var require_mixal_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var MixalHighlightRules$1 = function() {
		var isValidSymbol = function(string) {
			return string && string.search(/^[A-Z\u0394\u03a0\u03a30-9]{1,10}$/) > -1 && string.search(/[A-Z\u0394\u03a0\u03a3]/) > -1;
		};
		var isValidOp = function(op) {
			return op && [
				"NOP",
				"ADD",
				"FADD",
				"SUB",
				"FSUB",
				"MUL",
				"FMUL",
				"DIV",
				"FDIV",
				"NUM",
				"CHAR",
				"HLT",
				"SLA",
				"SRA",
				"SLAX",
				"SRAX",
				"SLC",
				"SRC",
				"MOVE",
				"LDA",
				"LD1",
				"LD2",
				"LD3",
				"LD4",
				"LD5",
				"LD6",
				"LDX",
				"LDAN",
				"LD1N",
				"LD2N",
				"LD3N",
				"LD4N",
				"LD5N",
				"LD6N",
				"LDXN",
				"STA",
				"ST1",
				"ST2",
				"ST3",
				"ST4",
				"ST5",
				"ST6",
				"STX",
				"STJ",
				"STZ",
				"JBUS",
				"IOC",
				"IN",
				"OUT",
				"JRED",
				"JMP",
				"JSJ",
				"JOV",
				"JNOV",
				"JL",
				"JE",
				"JG",
				"JGE",
				"JNE",
				"JLE",
				"JAN",
				"JAZ",
				"JAP",
				"JANN",
				"JANZ",
				"JANP",
				"J1N",
				"J1Z",
				"J1P",
				"J1NN",
				"J1NZ",
				"J1NP",
				"J2N",
				"J2Z",
				"J2P",
				"J2NN",
				"J2NZ",
				"J2NP",
				"J3N",
				"J3Z",
				"J3P",
				"J3NN",
				"J3NZ",
				"J3NP",
				"J4N",
				"J4Z",
				"J4P",
				"J4NN",
				"J4NZ",
				"J4NP",
				"J5N",
				"J5Z",
				"J5P",
				"J5NN",
				"J5NZ",
				"J5NP",
				"J6N",
				"J6Z",
				"J6P",
				"J6NN",
				"J6NZ",
				"J6NP",
				"JXN",
				"JXZ",
				"JXP",
				"JXNN",
				"JXNZ",
				"JXNP",
				"INCA",
				"DECA",
				"ENTA",
				"ENNA",
				"INC1",
				"DEC1",
				"ENT1",
				"ENN1",
				"INC2",
				"DEC2",
				"ENT2",
				"ENN2",
				"INC3",
				"DEC3",
				"ENT3",
				"ENN3",
				"INC4",
				"DEC4",
				"ENT4",
				"ENN4",
				"INC5",
				"DEC5",
				"ENT5",
				"ENN5",
				"INC6",
				"DEC6",
				"ENT6",
				"ENN6",
				"INCX",
				"DECX",
				"ENTX",
				"ENNX",
				"CMPA",
				"FCMP",
				"CMP1",
				"CMP2",
				"CMP3",
				"CMP4",
				"CMP5",
				"CMP6",
				"CMPX",
				"EQU",
				"ORIG",
				"CON",
				"ALF",
				"END"
			].indexOf(op) > -1;
		};
		var containsOnlySupportedCharacters = function(string) {
			return string && string.search(/[^ A-Z\u0394\u03a0\u03a30-9.,()+*/=$<>@;:'-]/) == -1;
		};
		this.$rules = { "start": [
			{
				token: "comment.line.character",
				regex: /^ *\*.*$/
			},
			{
				token: function(label, space0, keyword, space1, literal, comment) {
					return [
						isValidSymbol(label) ? "variable.other" : "invalid.illegal",
						"text",
						"keyword.control",
						"text",
						containsOnlySupportedCharacters(literal) ? "text" : "invalid.illegal",
						"comment.line.character"
					];
				},
				regex: /^(\S+)?( +)(ALF)(  )(.{5})(\s+.*)?$/
			},
			{
				token: function(label, space0, keyword, space1, literal, comment) {
					return [
						isValidSymbol(label) ? "variable.other" : "invalid.illegal",
						"text",
						"keyword.control",
						"text",
						containsOnlySupportedCharacters(literal) ? "text" : "invalid.illegal",
						"comment.line.character"
					];
				},
				regex: /^(\S+)?( +)(ALF)( )(\S.{4})(\s+.*)?$/
			},
			{
				token: function(label, space0, op, comment) {
					return [
						isValidSymbol(label) ? "variable.other" : "invalid.illegal",
						"text",
						isValidOp(op) ? "keyword.control" : "invalid.illegal",
						"comment.line.character"
					];
				},
				regex: /^(\S+)?( +)(\S+)(?:\s*)$/
			},
			{
				token: function(label, space0, op, space1, address, comment) {
					return [
						isValidSymbol(label) ? "variable.other" : "invalid.illegal",
						"text",
						isValidOp(op) ? "keyword.control" : "invalid.illegal",
						"text",
						containsOnlySupportedCharacters(address) ? "text" : "invalid.illegal",
						"comment.line.character"
					];
				},
				regex: /^(\S+)?( +)(\S+)( +)(\S+)(\s+.*)?$/
			},
			{ defaultToken: "text" }
		] };
	};
	oop$1.inherits(MixalHighlightRules$1, TextHighlightRules);
	exports.MixalHighlightRules = MixalHighlightRules$1;
}));
var require_mixal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var MixalHighlightRules = require_mixal_highlight_rules().MixalHighlightRules;
	var Mode = function() {
		this.HighlightRules = MixalHighlightRules;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/mixal";
		this.lineCommentStart = "*";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_mixal();
