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
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
var require_d_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DHighlightRules$1 = function() {
		var keywords = "this|super|import|module|body|mixin|__traits|invariant|alias|asm|delete|typeof|typeid|sizeof|cast|new|in|is|typedef|__vector|__parameters";
		var keywordControls = "break|case|continue|default|do|else|for|foreach|foreach_reverse|goto|if|return|switch|while|catch|try|throw|finally|version|assert|unittest|with";
		var types = "auto|bool|char|dchar|wchar|byte|ubyte|float|double|real|cfloat|creal|cdouble|cent|ifloat|ireal|idouble|int|long|short|void|uint|ulong|ushort|ucent|function|delegate|string|wstring|dstring|size_t|ptrdiff_t|hash_t|Object";
		var modifiers = "abstract|align|debug|deprecated|export|extern|const|final|in|inout|out|ref|immutable|lazy|nothrow|override|package|pragma|private|protected|public|pure|scope|shared|__gshared|synchronized|static|volatile";
		var storages = "class|struct|union|template|interface|enum|macro";
		var stringEscapesSeq = {
			token: "constant.language.escape",
			regex: "\\\\(?:(?:x[0-9A-F]{2})|(?:[0-7]{1,3})|(?:['\"\\?0abfnrtv\\\\])|(?:u[0-9a-fA-F]{4})|(?:U[0-9a-fA-F]{8}))"
		};
		var builtinConstants = "null|true|false|__DATE__|__EOF__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|__FILE__|__MODULE__|__LINE__|__FUNCTION__|__PRETTY_FUNCTION__";
		var operators = "/|/\\=|&|&\\=|&&|\\|\\|\\=|\\|\\||\\-|\\-\\=|\\-\\-|\\+|\\+\\=|\\+\\+|\\<|\\<\\=|\\<\\<|\\<\\<\\=|\\<\\>|\\<\\>\\=|\\>|\\>\\=|\\>\\>\\=|\\>\\>\\>\\=|\\>\\>|\\>\\>\\>|\\!|\\!\\=|\\!\\<\\>|\\!\\<\\>\\=|\\!\\<|\\!\\<\\=|\\!\\>|\\!\\>\\=|\\?|\\$|\\=|\\=\\=|\\*|\\*\\=|%|%\\=|\\^|\\^\\=|\\^\\^|\\^\\^\\=|~|~\\=|\\=\\>|#";
		var keywordMapper = this.$keywords = this.createKeywordMapper({
			"keyword.modifier": modifiers,
			"keyword.control": keywordControls,
			"keyword.type": types,
			"keyword": keywords,
			"keyword.storage": storages,
			"punctation": "\\.|\\,|;|\\.\\.|\\.\\.\\.",
			"keyword.operator": operators,
			"constant.language": builtinConstants
		}, "identifier");
		var identifierRe = "[a-zA-Z_¡-￿][a-zA-Z\\d_¡-￿]*\\b";
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: "\\/\\*",
					next: "star-comment"
				},
				{
					token: "comment.shebang",
					regex: "^\\s*#!.*"
				},
				{
					token: "comment",
					regex: "\\/\\+",
					next: "plus-comment"
				},
				{
					onMatch: function(value, currentState, state) {
						state.unshift(this.next, value.substr(2));
						return "string";
					},
					regex: "q\"(?:[\\[\\(\\{\\<]+)",
					next: "operator-heredoc-string"
				},
				{
					onMatch: function(value, currentState, state) {
						state.unshift(this.next, value.substr(2));
						return "string";
					},
					regex: "q\"(?:[a-zA-Z_]+)$",
					next: "identifier-heredoc-string"
				},
				{
					token: "string",
					regex: "[xr]?\"",
					next: "quote-string"
				},
				{
					token: "string",
					regex: "[xr]?`",
					next: "backtick-string"
				},
				{
					token: "string",
					regex: "[xr]?['](?:(?:\\\\.)|(?:[^'\\\\]))*?['][cdw]?"
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen"
					],
					regex: /(asm)(\s*)({)/,
					next: "d-asm"
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen",
						"constant.language"
					],
					regex: "(__traits)(\\s*)(\\()(" + identifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"variable.module"
					],
					regex: "(import|module)(\\s+)((?:" + identifierRe + "\\.?)*)"
				},
				{
					token: [
						"keyword.storage",
						"text",
						"entity.name.type"
					],
					regex: "(" + storages + ")(\\s*)(" + identifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"variable.storage",
						"text"
					],
					regex: "(alias|typedef)(\\s*)(" + identifierRe + ")(\\s*)"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F_]+(l|ul|u|f|F|L|U|UL)?\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d[\\d_]*(?:(?:\\.[\\d_]*)?(?:[eE][+-]?[\\d_]+)?)?(l|ul|u|f|F|L|U|UL)?\\b"
				},
				{
					token: "entity.other.attribute-name",
					regex: "@" + identifierRe
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_][a-zA-Z0-9_]*\\b"
				},
				{
					token: "keyword.operator",
					regex: operators
				},
				{
					token: "punctuation.operator",
					regex: "\\?|\\:|\\,|\\;|\\.|\\:"
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"star-comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"plus-comment": [{
				token: "comment",
				regex: "\\+\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"quote-string": [
				stringEscapesSeq,
				{
					token: "string",
					regex: "\"[cdw]?",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"backtick-string": [
				stringEscapesSeq,
				{
					token: "string",
					regex: "`[cdw]?",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"operator-heredoc-string": [{
				onMatch: function(value, currentState, state) {
					value = value.substring(value.length - 2, value.length - 1);
					var map = {
						">": "<",
						"]": "[",
						")": "(",
						"}": "{"
					};
					if (Object.keys(map).indexOf(value) != -1) value = map[value];
					if (value != state[1]) return "string";
					state.shift();
					state.shift();
					return "string";
				},
				regex: "(?:[\\]\\)}>]+)\"",
				next: "start"
			}, {
				token: "string",
				regex: "[^\\]\\)}>]+"
			}],
			"identifier-heredoc-string": [{
				onMatch: function(value, currentState, state) {
					value = value.substring(0, value.length - 1);
					if (value != state[1]) return "string";
					state.shift();
					state.shift();
					return "string";
				},
				regex: "^(?:[A-Za-z_][a-zA-Z0-9]+)\"",
				next: "start"
			}, {
				token: "string",
				regex: "[^\\]\\)}>]+"
			}],
			"d-asm": [
				{
					token: "paren.rparen",
					regex: "\\}",
					next: "start"
				},
				{
					token: "keyword.instruction",
					regex: "[a-zA-Z]+",
					next: "d-asm-instruction"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"d-asm-instruction": [
				{
					token: "constant.language",
					regex: /AL|AH|AX|EAX|BL|BH|BX|EBX|CL|CH|CX|ECX|DL|DH|DX|EDX|BP|EBP|SP|ESP|DI|EDI|SI|ESI/i
				},
				{
					token: "identifier",
					regex: "[a-zA-Z]+"
				},
				{
					token: "string",
					regex: "\"[^\"]*\""
				},
				{
					token: "comment",
					regex: "//.*$"
				},
				{
					token: "constant.numeric",
					regex: "[0-9.xA-F]+"
				},
				{
					token: "punctuation.operator",
					regex: "\\,"
				},
				{
					token: "punctuation.operator",
					regex: ";",
					next: "d-asm"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	DHighlightRules$1.metaData = {
		comment: "D language",
		fileTypes: ["d", "di"],
		firstLineMatch: "^#!.*\\b[glr]?dmd\\b.",
		foldingStartMarker: "(?x)/\\*\\*(?!\\*)|^(?![^{]*?//|[^{]*?/\\*(?!.*?\\*/.*?\\{)).*?\\{\\s*($|//|/\\*(?!.*?\\*/.*\\S))",
		foldingStopMarker: "(?<!\\*)\\*\\*/|^\\s*\\}",
		keyEquivalent: "^~D",
		name: "D",
		scopeName: "source.d"
	};
	oop$1.inherits(DHighlightRules$1, TextHighlightRules);
	exports.DHighlightRules = DHighlightRules$1;
}));
var require_d = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var DHighlightRules = require_d_highlight_rules().DHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = DHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/d";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_d();
