import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules } from "./text-BG8jWbzl.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-Bc55qS5K.js";
import { t as require_javascript } from "./javascript-BoOSq_P_.js";
//#region node_modules/ace-code/src/mode/wollok_highlight_rules.js
var require_wollok_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var WollokHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "self",
			"keyword": "test|describe|package|inherits|false|import|else|or|class|and|not|native|override|program|self|try|const|var|catch|object|super|throw|if|null|return|true|new|constructor|method|mixin",
			"constant.language": "null|assert|console",
			"support.function": "Object|Pair|String|Boolean|Number|Integer|Double|Collection|Set|List|Exception|Range|StackTraceElement"
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
	oop.inherits(WollokHighlightRules, TextHighlightRules);
	exports.WollokHighlightRules = WollokHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/wollok.js
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
//#endregion
export default require_wollok();
