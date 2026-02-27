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
var require_fsharp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var FSharpHighlightRules$1 = function() {
		var keywordMapper = this.createKeywordMapper({
			"variable": "this",
			"keyword": "abstract|assert|base|begin|class|default|delegate|done|downcast|downto|elif|else|exception|extern|false|finally|function|global|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|open|or|override|private|public|rec|return|return!|select|static|struct|then|to|true|try|typeof|upcast|use|use!|val|void|when|while|with|yield|yield!|__SOURCE_DIRECTORY__|as|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile|and|do|end|for|fun|if|in|let|let!|new|not|null|of|endif",
			"constant": "true|false"
		}, "identifier");
		var floatNumber = "(?:(?:(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.))|(?:\\d+))(?:[eE][+-]?\\d+))|(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))";
		this.$rules = {
			"start": [
				{
					token: "variable.classes",
					regex: "\\[\\<[.]*\\>\\]"
				},
				{
					token: "comment",
					regex: "//.*$"
				},
				{
					token: "comment.start",
					regex: /\(\*(?!\))/,
					push: "blockComment"
				},
				{
					token: "string",
					regex: "'.'"
				},
				{
					token: "string",
					regex: "\"\"\"",
					next: [
						{
							token: "constant.language.escape",
							regex: /\\./,
							next: "qqstring"
						},
						{
							token: "string",
							regex: "\"\"\"",
							next: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "string",
					regex: "\"",
					next: [
						{
							token: "constant.language.escape",
							regex: /\\./,
							next: "qqstring"
						},
						{
							token: "string",
							regex: "\"",
							next: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: ["verbatim.string", "string"],
					regex: "(@?)(\")",
					stateName: "qqstring",
					next: [
						{
							token: "constant.language.escape",
							regex: "\"\""
						},
						{
							token: "string",
							regex: "\"",
							next: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "constant.float",
					regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
				},
				{
					token: "constant.float",
					regex: floatNumber
				},
				{
					token: "constant.integer",
					regex: "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))\\b"
				},
				{
					token: ["keyword.type", "variable"],
					regex: "(type\\s)([a-zA-Z0-9_$-]*\\b)"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|\\(\\*\\)"
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				}
			],
			blockComment: [
				{
					regex: /\(\*\)/,
					token: "comment"
				},
				{
					regex: /\(\*(?!\))/,
					token: "comment.start",
					push: "blockComment"
				},
				{
					regex: /\*\)/,
					token: "comment.end",
					next: "pop"
				},
				{ defaultToken: "comment" }
			]
		};
		this.normalizeRules();
	};
	oop$1.inherits(FSharpHighlightRules$1, TextHighlightRules);
	exports.FSharpHighlightRules = FSharpHighlightRules$1;
}));
var require_fsharp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var FSharpHighlightRules = require_fsharp_highlight_rules().FSharpHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		TextMode.call(this);
		this.HighlightRules = FSharpHighlightRules;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "(*",
			end: "*)",
			nestable: true
		};
		this.$id = "ace/mode/fsharp";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_fsharp();
