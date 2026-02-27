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
var require_julia_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JuliaHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{ include: "#function_decl" },
				{ include: "#function_call" },
				{ include: "#type_decl" },
				{ include: "#keyword" },
				{ include: "#operator" },
				{ include: "#number" },
				{ include: "#string" },
				{ include: "#comment" }
			],
			"#bracket": [{
				token: "keyword.bracket.julia",
				regex: "\\(|\\)|\\[|\\]|\\{|\\}|,"
			}],
			"#comment": [{
				token: ["punctuation.definition.comment.julia", "comment.line.number-sign.julia"],
				regex: "(#)(?!\\{)(.*$)"
			}],
			"#function_call": [{
				token: ["support.function.julia", "text"],
				regex: "([a-zA-Z0-9_]+!?)([\\w\\xff-\\u218e\\u2455-\\uffff]*\\()"
			}],
			"#function_decl": [{
				token: [
					"keyword.other.julia",
					"meta.function.julia",
					"entity.name.function.julia",
					"meta.function.julia",
					"text"
				],
				regex: "(function|macro)(\\s*)([a-zA-Z0-9_\\{]+!?)([\\w\\xff-\\u218e\\u2455-\\uffff]*)([(\\\\{])"
			}],
			"#keyword": [
				{
					token: "keyword.other.julia",
					regex: "\\b(?:function|type|immutable|macro|quote|abstract|bitstype|typealias|module|baremodule|new)\\b"
				},
				{
					token: "keyword.control.julia",
					regex: "\\b(?:if|else|elseif|while|for|in|begin|let|end|do|try|catch|finally|return|break|continue)\\b"
				},
				{
					token: "storage.modifier.variable.julia",
					regex: "\\b(?:global|local|const|export|import|importall|using)\\b"
				},
				{
					token: "variable.macro.julia",
					regex: "@[\\w\\xff-\\u218e\\u2455-\\uffff]+\\b"
				}
			],
			"#number": [{
				token: "constant.numeric.julia",
				regex: "\\b0(?:x|X)[0-9a-fA-F]*|(?:\\b[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]*)?(?:im)?|\\bInf(?:32)?\\b|\\bNaN(?:32)?\\b|\\btrue\\b|\\bfalse\\b"
			}],
			"#operator": [
				{
					token: "keyword.operator.update.julia",
					regex: "=|:=|\\+=|-=|\\*=|/=|//=|\\.//=|\\.\\*=|\\\\=|\\.\\\\=|^=|\\.^=|%=|\\|=|&=|\\$=|<<=|>>="
				},
				{
					token: "keyword.operator.ternary.julia",
					regex: "\\?|:"
				},
				{
					token: "keyword.operator.boolean.julia",
					regex: "\\|\\||&&|!"
				},
				{
					token: "keyword.operator.arrow.julia",
					regex: "->|<-|-->"
				},
				{
					token: "keyword.operator.relation.julia",
					regex: ">|<|>=|<=|==|!=|\\.>|\\.<|\\.>=|\\.>=|\\.==|\\.!=|\\.=|\\.!|<:|:>"
				},
				{
					token: "keyword.operator.range.julia",
					regex: ":"
				},
				{
					token: "keyword.operator.shift.julia",
					regex: "<<|>>"
				},
				{
					token: "keyword.operator.bitwise.julia",
					regex: "\\||\\&|~"
				},
				{
					token: "keyword.operator.arithmetic.julia",
					regex: "\\+|-|\\*|\\.\\*|/|\\./|//|\\.//|%|\\.%|\\\\|\\.\\\\|\\^|\\.\\^"
				},
				{
					token: "keyword.operator.isa.julia",
					regex: "::"
				},
				{
					token: "keyword.operator.dots.julia",
					regex: "\\.(?=[a-zA-Z])|\\.\\.+"
				},
				{
					token: "keyword.operator.interpolation.julia",
					regex: "\\$#?(?=.)"
				},
				{
					token: ["variable", "keyword.operator.transposed-variable.julia"],
					regex: "([\\w\\xff-\\u218e\\u2455-\\uffff]+)((?:'|\\.')*\\.?')"
				},
				{
					token: "text",
					regex: "\\[|\\("
				},
				{
					token: ["text", "keyword.operator.transposed-matrix.julia"],
					regex: "([\\]\\)])((?:'|\\.')*\\.?')"
				}
			],
			"#string": [
				{
					token: "punctuation.definition.string.begin.julia",
					regex: "'",
					push: [
						{
							token: "punctuation.definition.string.end.julia",
							regex: "'",
							next: "pop"
						},
						{ include: "#string_escaped_char" },
						{ defaultToken: "string.quoted.single.julia" }
					]
				},
				{
					token: "punctuation.definition.string.begin.julia",
					regex: "\"",
					push: [
						{
							token: "punctuation.definition.string.end.julia",
							regex: "\"",
							next: "pop"
						},
						{ include: "#string_escaped_char" },
						{ defaultToken: "string.quoted.double.julia" }
					]
				},
				{
					token: "punctuation.definition.string.begin.julia",
					regex: "\\b[\\w\\xff-\\u218e\\u2455-\\uffff]+\"",
					push: [
						{
							token: "punctuation.definition.string.end.julia",
							regex: "\"[\\w\\xff-\\u218e\\u2455-\\uffff]*",
							next: "pop"
						},
						{ include: "#string_custom_escaped_char" },
						{ defaultToken: "string.quoted.custom-double.julia" }
					]
				},
				{
					token: "punctuation.definition.string.begin.julia",
					regex: "`",
					push: [
						{
							token: "punctuation.definition.string.end.julia",
							regex: "`",
							next: "pop"
						},
						{ include: "#string_escaped_char" },
						{ defaultToken: "string.quoted.backtick.julia" }
					]
				}
			],
			"#string_custom_escaped_char": [{
				token: "constant.character.escape.julia",
				regex: "\\\\\""
			}],
			"#string_escaped_char": [{
				token: "constant.character.escape.julia",
				regex: "\\\\(?:\\\\|[0-3]\\d{,2}|[4-7]\\d?|x[a-fA-F0-9]{,2}|u[a-fA-F0-9]{,4}|U[a-fA-F0-9]{,8}|.)"
			}],
			"#type_decl": [{
				token: [
					"keyword.control.type.julia",
					"meta.type.julia",
					"entity.name.type.julia",
					"entity.other.inherited-class.julia",
					"punctuation.separator.inheritance.julia",
					"entity.other.inherited-class.julia"
				],
				regex: "(type|immutable)(\\s+)([a-zA-Z0-9_]+)(?:(\\s*)(<:)(\\s*[.a-zA-Z0-9_:]+))?"
			}, {
				token: ["other.typed-variable.julia", "support.type.julia"],
				regex: "([a-zA-Z0-9_]+)(::[a-zA-Z0-9_{}]+)"
			}]
		};
		this.normalizeRules();
	};
	JuliaHighlightRules$1.metaData = {
		fileTypes: ["jl"],
		firstLineMatch: "^#!.*\\bjulia\\s*$",
		foldingStartMarker: "^\\s*(?:if|while|for|begin|function|macro|module|baremodule|type|immutable|let)\\b(?!.*\\bend\\b).*$",
		foldingStopMarker: "^\\s*(?:end)\\b.*$",
		name: "Julia",
		scopeName: "source.julia"
	};
	oop$1.inherits(JuliaHighlightRules$1, TextHighlightRules);
	exports.JuliaHighlightRules = JuliaHighlightRules$1;
}));
var require_julia = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var JuliaHighlightRules = require_julia_highlight_rules().JuliaHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = JuliaHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.blockComment = "";
		this.$id = "ace/mode/julia";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_julia();
