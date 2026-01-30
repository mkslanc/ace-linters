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
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
var require_nim_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var NimHighlightRules$1 = function() {
		var keywordMapper = this.createKeywordMapper({
			"variable": "var|let|const",
			"keyword": "assert|parallel|spawn|export|include|from|template|mixin|bind|import|concept|raise|defer|try|finally|except|converter|proc|func|macro|method|and|or|not|xor|shl|shr|div|mod|in|notin|is|isnot|of|static|if|elif|else|case|of|discard|when|return|yield|block|break|while|echo|continue|asm|using|cast|addr|unsafeAddr|type|ref|ptr|do|declared|defined|definedInScope|compiles|sizeOf|is|shallowCopy|getAst|astToStr|spawn|procCall|for|iterator|as",
			"storage.type": "newSeq|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|char|bool|string|set|pointer|float32|float64|enum|object|cstring|array|seq|openArray|varargs|UncheckedArray|tuple|set|distinct|void|auto|openarray|range",
			"support.function": "lock|ze|toU8|toU16|toU32|ord|low|len|high|add|pop|contains|card|incl|excl|dealloc|inc",
			"constant.language": "nil|true|false"
		}, "identifier");
		var hexNumber = "(?:0[xX][\\dA-Fa-f][\\dA-Fa-f_]*)";
		var decNumber = "(?:[0-9][\\d_]*)";
		var octNumber = "(?:0o[0-7][0-7_]*)";
		var binNumber = "(?:0[bB][01][01_]*)";
		var intNumber = "(?:" + hexNumber + "|" + decNumber + "|" + octNumber + "|" + binNumber + ")(?:'?[iIuU](?:8|16|32|64)|u)?\\b";
		var exponent = "(?:[eE][+-]?[\\d][\\d_]*)";
		var floatNumber = "(?:[\\d][\\d_]*(?:[.][\\d](?:[\\d_]*)" + exponent + "?)|" + exponent + ")";
		var floatNumberExt = "(?:" + hexNumber + "(?:'(?:(?:[fF](?:32|64)?)|[dD])))|(?:" + floatNumber + "|" + decNumber + "|" + octNumber + "|" + binNumber + ")(?:'(?:(?:[fF](?:32|64)?)|[dD]))";
		var stringEscape = "\\\\([abeprcnlftv\\\"']|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
		var identifier = "[a-zA-Z][a-zA-Z0-9_]*";
		this.$rules = {
			"start": [
				{
					token: [
						"identifier",
						"keyword.operator",
						"support.function"
					],
					regex: "(" + identifier + ")([.]{1})(" + identifier + ")(?=\\()"
				},
				{
					token: "paren.lparen",
					regex: "(\\{\\.)",
					next: [
						{
							token: "paren.rparen",
							regex: "(\\.\\}|\\})",
							next: "start"
						},
						{ include: "methods" },
						{
							token: "identifier",
							regex: identifier
						},
						{
							token: "punctuation",
							regex: /[,]/
						},
						{
							token: "keyword.operator",
							regex: /[=:.]/
						},
						{
							token: "paren.lparen",
							regex: /[[(]/
						},
						{
							token: "paren.rparen",
							regex: /[\])]/
						},
						{ include: "math" },
						{ include: "strings" },
						{ defaultToken: "text" }
					]
				},
				{
					token: "comment.doc.start",
					regex: /##\[(?!])/,
					push: "docBlockComment"
				},
				{
					token: "comment.start",
					regex: /#\[(?!])/,
					push: "blockComment"
				},
				{
					token: "comment.doc",
					regex: "##.*$"
				},
				{
					token: "comment",
					regex: "#.*$"
				},
				{ include: "strings" },
				{
					token: "string",
					regex: "'(?:\\\\(?:[abercnlftv]|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})|.{1})?'"
				},
				{ include: "methods" },
				{
					token: keywordMapper,
					regex: "[a-zA-Z][a-zA-Z0-9_]*\\b"
				},
				{
					token: [
						"keyword.operator",
						"text",
						"storage.type"
					],
					regex: "([:])(\\s+)(" + identifier + ")(?=$|\\)|\\[|,|\\s+=|;|\\s+\\{)"
				},
				{
					token: "paren.lparen",
					regex: /\[\.|{\||\(\.|\[:|[[({`]/
				},
				{
					token: "paren.rparen",
					regex: /\.\)|\|}|\.]|[\])}]/
				},
				{
					token: "keyword.operator",
					regex: /[=+\-*\/<>@$~&%|!?^.:\\]/
				},
				{
					token: "punctuation",
					regex: /[,;]/
				},
				{ include: "math" }
			],
			blockComment: [
				{
					regex: /#\[]/,
					token: "comment"
				},
				{
					regex: /#\[(?!])/,
					token: "comment.start",
					push: "blockComment"
				},
				{
					regex: /]#/,
					token: "comment.end",
					next: "pop"
				},
				{ defaultToken: "comment" }
			],
			docBlockComment: [
				{
					regex: /##\[]/,
					token: "comment.doc"
				},
				{
					regex: /##\[(?!])/,
					token: "comment.doc.start",
					push: "docBlockComment"
				},
				{
					regex: /]##/,
					token: "comment.doc.end",
					next: "pop"
				},
				{ defaultToken: "comment.doc" }
			],
			math: [
				{
					token: "constant.float",
					regex: floatNumberExt
				},
				{
					token: "constant.float",
					regex: floatNumber
				},
				{
					token: "constant.integer",
					regex: intNumber
				}
			],
			methods: [{
				token: "support.function",
				regex: "(\\w+)(?=\\()"
			}],
			strings: [
				{
					token: "string",
					regex: "(\\b" + identifier + ")?\"\"\"",
					push: [{
						token: "string",
						regex: "\"\"\"",
						next: "pop"
					}, { defaultToken: "string" }]
				},
				{
					token: "string",
					regex: "\\b" + identifier + "\"(?=.)",
					push: [{
						token: "string",
						regex: "\"|$",
						next: "pop"
					}, { defaultToken: "string" }]
				},
				{
					token: "string",
					regex: "\"",
					push: [
						{
							token: "string",
							regex: "\"|$",
							next: "pop"
						},
						{
							token: "constant.language.escape",
							regex: stringEscape
						},
						{ defaultToken: "string" }
					]
				}
			]
		};
		this.normalizeRules();
	};
	oop$1.inherits(NimHighlightRules$1, TextHighlightRules);
	exports.NimHighlightRules = NimHighlightRules$1;
}));
var require_nim = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var NimHighlightRules = require_nim_highlight_rules().NimHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		TextMode.call(this);
		this.HighlightRules = NimHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.blockComment = {
			start: "#[",
			end: "]#",
			nestable: true
		};
		this.$id = "ace/mode/nim";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_nim();
