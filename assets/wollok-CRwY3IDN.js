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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./cstyle-C6ktp4d4.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
import "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
var require_wollok_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var WollokHighlightRules$1 = function() {
		var keywords = "test|describe|package|inherits|false|import|else|or|class|and|not|native|override|program|self|try|const|var|catch|object|super|throw|if|null|return|true|new|constructor|method|mixin";
		var buildinConstants = "null|assert|console";
		var langClasses = "Object|Pair|String|Boolean|Number|Integer|Double|Collection|Set|List|Exception|Range|StackTraceElement";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "self",
			"keyword": keywords,
			"constant.language": buildinConstants,
			"support.function": langClasses
		}, "identifier");
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
					next: "comment"
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "constant.numeric",
					regex: /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.numeric",
					regex: /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "===|&&|\\*=|\\.\\.|\\*\\*|#|!|%|\\*|\\?:|\\+|\\/|,|\\+=|\\-|\\.\\.<|!==|:|\\/=|\\?\\.|\\+\\+|>|=|<|>=|=>|==|\\]|\\[|\\-=|\\->|\\||\\-\\-|<>|!=|%=|\\|"
				},
				{
					token: "lparen",
					regex: "[[({]"
				},
				{
					token: "rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"comment": [{
				token: "comment",
				regex: ".*?\\*\\/",
				next: "start"
			}, {
				token: "comment",
				regex: ".+"
			}]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop$1.inherits(WollokHighlightRules$1, TextHighlightRules);
	exports.WollokHighlightRules = WollokHighlightRules$1;
}));
var require_wollok = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptMode = require_javascript().Mode;
	var WollokHighlightRules = require_wollok_highlight_rules().WollokHighlightRules;
	var Mode = function() {
		JavaScriptMode.call(this);
		this.HighlightRules = WollokHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, JavaScriptMode);
	(function() {
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/wollok";
		this.snippetFileId = "ace/snippets/wollok";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_wollok();
