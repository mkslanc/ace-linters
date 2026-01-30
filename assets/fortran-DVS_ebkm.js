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
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
var require_fortran_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var FortranHighlightRules$1 = function() {
		var keywords = "call|case|contains|continue|cycle|do|else|elseif|end|enddo|endif|function|if|implicit|in|include|inout|intent|module|none|only|out|print|program|return|select|status|stop|subroutine|return|then|use|while|write|CALL|CASE|CONTAINS|CONTINUE|CYCLE|DO|ELSE|ELSEIF|END|ENDDO|ENDIF|FUNCTION|IF|IMPLICIT|IN|INCLUDE|INOUT|INTENT|MODULE|NONE|ONLY|OUT|PRINT|PROGRAM|RETURN|SELECT|STATUS|STOP|SUBROUTINE|RETURN|THEN|USE|WHILE|WRITE";
		var keywordOperators = "and|or|not|eq|ne|gt|ge|lt|le|AND|OR|NOT|EQ|NE|GT|GE|LT|LE";
		var builtinConstants = "true|false|TRUE|FALSE";
		var builtinFunctions = "abs|achar|acos|acosh|adjustl|adjustr|aimag|aint|all|allocate|anint|any|asin|asinh|associated|atan|atan2|atanh|bessel_j0|bessel_j1|bessel_jn|bessel_y0|bessel_y1|bessel_yn|bge|bgt|bit_size|ble|blt|btest|ceiling|char|cmplx|conjg|cos|cosh|count|cpu_time|cshift|date_and_time|dble|deallocate|digits|dim|dot_product|dprod|dshiftl|dshiftr|dsqrt|eoshift|epsilon|erf|erfc|erfc_scaled|exp|float|floor|format|fraction|gamma|input|len|lge|lgt|lle|llt|log|log10|maskl|maskr|matmul|max|maxloc|maxval|merge|min|minloc|minval|mod|modulo|nint|not|norm2|null|nullify|pack|parity|popcnt|poppar|precision|present|product|radix|random_number|random_seed|range|repeat|reshape|round|rrspacing|same_type_as|scale|scan|selected_char_kind|selected_int_kind|selected_real_kind|set_exponent|shape|shifta|shiftl|shiftr|sign|sin|sinh|size|sngl|spacing|spread|sqrt|sum|system_clock|tan|tanh|tiny|trailz|transfer|transpose|trim|ubound|unpack|verify|ABS|ACHAR|ACOS|ACOSH|ADJUSTL|ADJUSTR|AIMAG|AINT|ALL|ALLOCATE|ANINT|ANY|ASIN|ASINH|ASSOCIATED|ATAN|ATAN2|ATANH|BESSEL_J0|BESSEL_J1|BESSEL_JN|BESSEL_Y0|BESSEL_Y1|BESSEL_YN|BGE|BGT|BIT_SIZE|BLE|BLT|BTEST|CEILING|CHAR|CMPLX|CONJG|COS|COSH|COUNT|CPU_TIME|CSHIFT|DATE_AND_TIME|DBLE|DEALLOCATE|DIGITS|DIM|DOT_PRODUCT|DPROD|DSHIFTL|DSHIFTR|DSQRT|EOSHIFT|EPSILON|ERF|ERFC|ERFC_SCALED|EXP|FLOAT|FLOOR|FORMAT|FRACTION|GAMMA|INPUT|LEN|LGE|LGT|LLE|LLT|LOG|LOG10|MASKL|MASKR|MATMUL|MAX|MAXLOC|MAXVAL|MERGE|MIN|MINLOC|MINVAL|MOD|MODULO|NINT|NOT|NORM2|NULL|NULLIFY|PACK|PARITY|POPCNT|POPPAR|PRECISION|PRESENT|PRODUCT|RADIX|RANDOM_NUMBER|RANDOM_SEED|RANGE|REPEAT|RESHAPE|ROUND|RRSPACING|SAME_TYPE_AS|SCALE|SCAN|SELECTED_CHAR_KIND|SELECTED_INT_KIND|SELECTED_REAL_KIND|SET_EXPONENT|SHAPE|SHIFTA|SHIFTL|SHIFTR|SIGN|SIN|SINH|SIZE|SNGL|SPACING|SPREAD|SQRT|SUM|SYSTEM_CLOCK|TAN|TANH|TINY|TRAILZ|TRANSFER|TRANSPOSE|TRIM|UBOUND|UNPACK|VERIFY";
		var storageType = "logical|character|integer|real|type|LOGICAL|CHARACTER|INTEGER|REAL|TYPE";
		var storageModifiers = "allocatable|dimension|intent|parameter|pointer|target|private|public|ALLOCATABLE|DIMENSION|INTENT|PARAMETER|POINTER|TARGET|PRIVATE|PUBLIC";
		var keywordMapper = this.createKeywordMapper({
			"invalid.deprecated": "debugger",
			"support.function": builtinFunctions,
			"constant.language": builtinConstants,
			"keyword": keywords,
			"keyword.operator": keywordOperators,
			"storage.type": storageType,
			"storage.modifier": storageModifiers
		}, "identifier");
		var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";
		var integer = "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))";
		var exponent = "(?:[eE][+-]?\\d+)";
		var fraction = "(?:\\.\\d+)";
		var intPart = "(?:\\d+)";
		var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
		var floatNumber = "(?:" + ("(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")") + "|" + pointFloat + ")";
		var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "!.*$"
				},
				{
					token: "string",
					regex: strPre + "\"{3}",
					next: "qqstring3"
				},
				{
					token: "string",
					regex: strPre + "\"(?=.)",
					next: "qqstring"
				},
				{
					token: "string",
					regex: strPre + "'{3}",
					next: "qstring3"
				},
				{
					token: "string",
					regex: strPre + "'(?=.)",
					next: "qstring"
				},
				{
					token: "constant.numeric",
					regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
				},
				{
					token: "constant.numeric",
					regex: floatNumber
				},
				{
					token: "constant.numeric",
					regex: integer + "[lL]\\b"
				},
				{
					token: "constant.numeric",
					regex: integer + "\\b"
				},
				{
					token: "keyword",
					regex: "#\\s*(?:include|import|define|undef|INCLUDE|IMPORT|DEFINE|UNDEF)\\b"
				},
				{
					token: "keyword",
					regex: "#\\s*(?:endif|ifdef|else|elseif|ifndef|ENDIF|IFDEF|ELSE|ELSEIF|IFNDEF)\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
				},
				{
					token: "paren.lparen",
					regex: "[\\[\\(\\{]"
				},
				{
					token: "paren.rparen",
					regex: "[\\]\\)\\}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"qqstring3": [
				{
					token: "constant.language.escape",
					regex: stringEscape
				},
				{
					token: "string",
					regex: "\"{3}",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"qstring3": [
				{
					token: "constant.language.escape",
					regex: stringEscape
				},
				{
					token: "string",
					regex: "\"{3}",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"qqstring": [
				{
					token: "constant.language.escape",
					regex: stringEscape
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"qstring": [
				{
					token: "constant.language.escape",
					regex: stringEscape
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qstring"
				},
				{
					token: "string",
					regex: "'|$",
					next: "start"
				},
				{ defaultToken: "string" }
			]
		};
	};
	oop$1.inherits(FortranHighlightRules$1, TextHighlightRules);
	exports.FortranHighlightRules = FortranHighlightRules$1;
}));
var require_fortran = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var FortranHighlightRules = require_fortran_highlight_rules().FortranHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Range = require_range().Range;
	var Mode = function() {
		this.HighlightRules = FortranHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "!";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[:]\s*$/)) indent += tab;
			}
			return indent;
		};
		var outdents = {
			"return": 1,
			"break": 1,
			"continue": 1,
			"RETURN": 1,
			"BREAK": 1,
			"CONTINUE": 1
		};
		this.checkOutdent = function(state, line, input) {
			if (input !== "\r\n" && input !== "\r" && input !== "\n") return false;
			var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
			if (!tokens) return false;
			do
				var last = tokens.pop();
			while (last && (last.type == "comment" || last.type == "text" && last.value.match(/^\s+$/)));
			if (!last) return false;
			return last.type == "keyword" && outdents[last.value];
		};
		this.autoOutdent = function(state, doc, row) {
			row += 1;
			var indent = this.$getIndent(doc.getLine(row));
			var tab = doc.getTabString();
			if (indent.slice(-tab.length) == tab) doc.remove(new Range(row, indent.length - tab.length, row, indent.length));
		};
		this.$id = "ace/mode/fortran";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_fortran();
