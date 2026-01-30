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
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
var require_latte_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LatteHighlightRules$1 = function() {
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
	oop$1.inherits(LatteHighlightRules$1, TextHighlightRules);
	exports.LatteHighlightRules = LatteHighlightRules$1;
}));
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
export default require_latte();
