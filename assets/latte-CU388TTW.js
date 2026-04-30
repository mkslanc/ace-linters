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
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./cstyle-DxkoJQhq.js";
import "./javascript_highlight_rules-DZzo6_DD.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import "./javascript-CtbB98r6.js";
import "./css_highlight_rules-_E_vcaY_.js";
import "./css_completions-C2GxC1IS.js";
import "./css-BIWs6ZVC.js";
import "./css-C0jKnsYY.js";
import "./xml_highlight_rules-DkcOGcVi.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DFgdMIml.js";
import "./mixed-CB1dzpdX.js";
import { t as require_html } from "./html-DaEx_Icq.js";
//#region node_modules/ace-code/src/mode/latte_highlight_rules.js
var require_latte_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LatteHighlightRules = function() {
		HtmlHighlightRules.call(this);
		for (var rule in this.$rules) this.$rules[rule].unshift({
			token: "comment.start.latte",
			regex: "\\{\\*",
			push: [{
				token: "comment.end.latte",
				regex: ".*\\*\\}",
				next: "pop"
			}, { defaultToken: "comment" }]
		}, {
			token: "meta.tag.punctuation.tag-open.latte",
			regex: "\\{(?![\\s'\"{}]|$)/?",
			push: [{
				token: "meta.tag.latte",
				regex: "(?:_|=|[a-z]\\w*(?:[.:-]\\w+)*)?",
				next: [{
					token: "meta.tag.punctuation.tag-close.latte",
					regex: "\\}",
					next: "pop"
				}, { include: "latte-content" }]
			}]
		});
		this.$rules["tag_stuff"].unshift({
			token: "meta.attribute.latte",
			regex: "n:[\\w-]+",
			next: [
				{ include: "tag_whitespace" },
				{
					token: "keyword.operator.attribute-equals.xml",
					regex: "=",
					next: [
						{
							token: "string.attribute-value.xml",
							regex: "'",
							next: [{
								token: "string.attribute-value.xml",
								regex: "'",
								next: "tag_stuff"
							}, { include: "latte-content" }]
						},
						{
							token: "string.attribute-value.xml",
							regex: "\"",
							next: [{
								token: "string.attribute-value.xml",
								regex: "\"",
								next: "tag_stuff"
							}, { include: "latte-content" }]
						},
						{
							token: "text.tag-whitespace.xml",
							regex: "\\s",
							next: "tag_stuff"
						},
						{
							token: "meta.tag.punctuation.tag-close.xml",
							regex: "/?>",
							next: "tag_stuff"
						},
						{ include: "latte-content" }
					]
				},
				{
					token: "empty",
					regex: "",
					next: "tag_stuff"
				}
			]
		});
		this.$rules["latte-content"] = [
			{
				token: "comment.start.latte",
				regex: "\\/\\*",
				push: [{
					token: "comment.end.latte",
					regex: "\\*\\/",
					next: "pop"
				}, { defaultToken: "comment" }]
			},
			{
				token: "string.start",
				regex: "\"",
				push: [
					{
						token: "constant.language.escape",
						regex: "\\\\(?:[nrtvef\\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})"
					},
					{
						token: "variable",
						regex: /\$[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
					},
					{
						token: "variable",
						regex: /\$\{[^"\}]+\}?/
					},
					{
						token: "string.end",
						regex: "\"",
						next: "pop"
					},
					{ defaultToken: "string" }
				]
			},
			{
				token: "string.start",
				regex: "'",
				push: [
					{
						token: "constant.language.escape",
						regex: /\\['\\]/
					},
					{
						token: "string.end",
						regex: "'",
						next: "pop"
					},
					{ defaultToken: "string" }
				]
			},
			{
				token: "keyword.control",
				regex: "\\b(?:INF|NAN|and|or|xor|AND|OR|XOR|clone|new|instanceof|return|continue|break|as)\\b"
			},
			{
				token: "constant.language",
				regex: "\\b(?:true|false|null|TRUE|FALSE|NULL)\\b"
			},
			{
				token: "variable",
				regex: /\$\w+/
			},
			{
				token: "constant.numeric",
				regex: "[+-]?[0-9]+(?:\\.[0-9]+)?(?:e[0-9]+)?"
			},
			{
				token: ["support.class", "keyword.operator"],
				regex: "\\b(\\w+)(::)"
			},
			{
				token: "constant.language",
				regex: "\\b(?:[A-Z0-9_]+)\\b"
			},
			{
				token: "string.unquoted",
				regex: "\\w+(?:-+\\w+)*"
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
				token: "keyword.operator",
				regex: "::|=>|->|\\?->|\\?\\?->|\\+\\+|--|<<|>>|<=>|<=|>=|===|!==|==|!=|<>|&&|\\|\\||\\?\\?|\\?>|\\*\\*|\\.\\.\\.|[^'\"]"
			}
		];
		this.normalizeRules();
	};
	oop.inherits(LatteHighlightRules, TextHighlightRules);
	exports.LatteHighlightRules = LatteHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/latte.js
var require_latte = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var LatteHighlightRules = require_latte_highlight_rules().LatteHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = LatteHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.blockComment = {
			start: "{*",
			end: "*}"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			if (state == "start") {
				if (line.match(/^.*\{(?:if|else|elseif|ifset|elseifset|ifchanged|switch|case|foreach|iterateWhile|for|while|first|last|sep|try|capture|spaceless|snippet|block|define|embed|snippetArea)\b[^{]*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return /^\s+\{\/$/.test(line + input);
		};
		this.autoOutdent = function(state, doc, row) {};
		this.$id = "ace/mode/latte";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_latte();
