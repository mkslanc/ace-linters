import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
var require_swift_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var lang = require_lang();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SwiftHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "",
			"keyword": "__COLUMN__|__FILE__|__FUNCTION__|__LINE__|as|associativity|break|case|class|continue|default|deinit|didSet|do|dynamicType|else|enum|extension|fallthrough|for|func|get|if|import|in|infix|init|inout|is|left|let|let|mutating|new|none|nonmutating|operator|override|postfix|precedence|prefix|protocol|return|right|safe|Self|self|set|struct|subscript|switch|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|convenience|dynamic|final|infix|lazy|mutating|nonmutating|optional|override|postfix|prefix|required|static|guard|defer",
			"storage.type": "bool|double|Double|extension|float|Float|int|Int|open|internal|fileprivate|private|public|string|String",
			"constant.language": "false|Infinity|NaN|nil|no|null|null|off|on|super|this|true|undefined|yes",
			"support.function": ""
		}, "identifier");
		function string(start, options) {
			var nestable = options.nestable || options.interpolation;
			var interpStart = options.interpolation && options.interpolation.nextState || "start";
			var mainRule = {
				regex: start + (options.multiline ? "" : "(?=.)"),
				token: "string.start"
			};
			var nextState = [
				options.escape && {
					regex: options.escape,
					token: "character.escape"
				},
				options.interpolation && {
					token: "paren.quasi.start",
					regex: lang.escapeRegExp(options.interpolation.lead + options.interpolation.open),
					push: interpStart
				},
				options.error && {
					regex: options.error,
					token: "error.invalid"
				},
				{
					regex: start + (options.multiline ? "" : "|$"),
					token: "string.end",
					next: nestable ? "pop" : "start"
				},
				{ defaultToken: "string" }
			].filter(Boolean);
			if (nestable) mainRule.push = nextState;
			else mainRule.next = nextState;
			if (!options.interpolation) return mainRule;
			var open = options.interpolation.open;
			var close = options.interpolation.close;
			return [{
				regex: "[" + lang.escapeRegExp(open + close) + "]",
				onMatch: function(val, state, stack) {
					this.next = val == open ? this.nextState : "";
					if (val == open && stack.length) {
						stack.unshift("start", state);
						return "paren";
					}
					if (val == close && stack.length) {
						stack.shift();
						this.next = stack.shift();
						if (this.next.indexOf("string") != -1) return "paren.quasi.end";
					}
					return val == open ? "paren.lparen" : "paren.rparen";
				},
				nextState: interpStart
			}, mainRule];
		}
		function comments() {
			return [
				{
					token: "comment",
					regex: /\/\//,
					next: [
						DocCommentHighlightRules.getTagRule(),
						{
							token: "comment",
							regex: "$|^",
							next: "start"
						},
						{
							defaultToken: "comment",
							caseInsensitive: true
						}
					]
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment.start",
					regex: /\/\*/,
					stateName: "nested_comment",
					push: [
						DocCommentHighlightRules.getTagRule(),
						{
							token: "comment.start",
							regex: /\/\*/,
							push: "nested_comment"
						},
						{
							token: "comment.end",
							regex: "\\*\\/",
							next: "pop"
						},
						{
							defaultToken: "comment",
							caseInsensitive: true
						}
					]
				}
			];
		}
		this.$rules = { start: [
			string("\"\"\"", {
				escape: /\\(?:[0\\tnr"']|u{[a-fA-F1-9]{0,8}})/,
				interpolation: {
					lead: "\\",
					open: "(",
					close: ")"
				},
				error: /\\./,
				multiline: true
			}),
			string("\"", {
				escape: /\\(?:[0\\tnr"']|u{[a-fA-F1-9]{0,8}})/,
				interpolation: {
					lead: "\\",
					open: "(",
					close: ")"
				},
				error: /\\./,
				multiline: false
			}),
			comments(),
			{
				regex: /@[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
				token: "variable.parameter"
			},
			{
				regex: /[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
				token: keywordMapper
			},
			{
				token: "constant.numeric",
				regex: /[+-]?(?:0(?:b[01]+|o[0-7]+|x[\da-fA-F])|\d+(?:(?:\.\d*)?(?:[PpEe][+-]?\d+)?)\b)/
			},
			{
				token: "keyword.operator",
				regex: /--|\+\+|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
				next: "start"
			},
			{
				token: "punctuation.operator",
				regex: /[?:,;.]/,
				next: "start"
			},
			{
				token: "paren.lparen",
				regex: /[\[({]/,
				next: "start"
			},
			{
				token: "paren.rparen",
				regex: /[\])}]/
			}
		] };
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
		this.normalizeRules();
	};
	oop$1.inherits(SwiftHighlightRules, TextHighlightRules);
	exports.HighlightRules = SwiftHighlightRules;
	exports.SwiftHighlightRules = SwiftHighlightRules;
}));
var require_swift = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_swift_highlight_rules().HighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/",
			nestable: true
		};
		this.$id = "ace/mode/swift";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_swift();
