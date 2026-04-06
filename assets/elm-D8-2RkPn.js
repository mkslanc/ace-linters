import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
//#region node_modules/ace-code/src/mode/elm_highlight_rules.js
var require_elm_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ElmHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({ "keyword": "as|case|class|data|default|deriving|do|else|export|foreign|hiding|jsevent|if|import|in|infix|infixl|infixr|instance|let|module|newtype|of|open|then|type|where|_|port|λ" }, "identifier");
		var escapeRe = /\\(\d+|['"\\&trnbvf])/;
		var smallRe = /[a-z_]/.source;
		var largeRe = /[A-Z]/.source;
		var idRe = /[a-z_A-Z0-9']/.source;
		this.$rules = {
			start: [
				{
					token: "string.start",
					regex: "\"",
					next: "string"
				},
				{
					token: "string.character",
					regex: "'(?:" + escapeRe.source + "|.)'?"
				},
				{
					regex: /0(?:[xX][0-9A-Fa-f]+|[oO][0-7]+)|\d+(\.\d+)?([eE][-+]?\d*)?/,
					token: "constant.numeric"
				},
				{
					token: "comment",
					regex: "--.*"
				},
				{
					token: "keyword",
					regex: /\.\.|\||:|=|\\|"|->|<-|\u2192/
				},
				{
					token: "keyword.operator",
					regex: /[-!#$%&*+.\/<=>?@\\^|~:\u03BB\u2192]+/
				},
				{
					token: "operator.punctuation",
					regex: /[,;`]/
				},
				{
					regex: largeRe + idRe + "+\\.?",
					token: function(value) {
						if (value[value.length - 1] == ".") return "entity.name.function";
						return "constant.language";
					}
				},
				{
					regex: "^" + smallRe + idRe + "+",
					token: function(value) {
						return "constant.language";
					}
				},
				{
					token: keywordMapper,
					regex: "[\\w\\xff-\\u218e\\u2455-\\uffff]+\\b"
				},
				{
					regex: "{-#?",
					token: "comment.start",
					onMatch: function(value, currentState, stack) {
						this.next = value.length == 2 ? "blockComment" : "docComment";
						return this.token;
					}
				},
				{
					token: "variable.language",
					regex: /\[markdown\|/,
					next: "markdown"
				},
				{
					token: "paren.lparen",
					regex: /[\[({]/
				},
				{
					token: "paren.rparen",
					regex: /[\])}]/
				}
			],
			markdown: [{
				regex: /\|\]/,
				next: "start"
			}, { defaultToken: "string" }],
			blockComment: [
				{
					regex: "{-",
					token: "comment.start",
					push: "blockComment"
				},
				{
					regex: "-}",
					token: "comment.end",
					next: "pop"
				},
				{ defaultToken: "comment" }
			],
			docComment: [
				{
					regex: "{-",
					token: "comment.start",
					push: "docComment"
				},
				{
					regex: "-}",
					token: "comment.end",
					next: "pop"
				},
				{ defaultToken: "doc.comment" }
			],
			string: [
				{
					token: "constant.language.escape",
					regex: escapeRe
				},
				{
					token: "text",
					regex: /\\(\s|$)/,
					next: "stringGap"
				},
				{
					token: "string.end",
					regex: "\"",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			stringGap: [{
				token: "text",
				regex: /\\/,
				next: "string"
			}, {
				token: "error",
				regex: "",
				next: "start"
			}]
		};
		this.normalizeRules();
	};
	oop.inherits(ElmHighlightRules, TextHighlightRules);
	exports.ElmHighlightRules = ElmHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/elm.js
var require_elm = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_elm_highlight_rules().ElmHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "{-",
			end: "-}",
			nestable: true
		};
		this.$id = "ace/mode/elm";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_elm();
