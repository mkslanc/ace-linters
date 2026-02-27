import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
var require_markdown_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var modes = require_config().$modes;
	var oop = require_oop();
	var lang = require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var escaped = function(ch) {
		return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
	};
	var MarkdownHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var codeBlockStartRule = {
			token: "support.function",
			regex: /^\s*(```+[^`]*|~~~+[^~]*)$/,
			onMatch: function(value, state, stack, line) {
				var m = value.match(/^(\s*)([`~]+)(.*)/);
				var language = /[\w-]+|$/.exec(m[3])[0];
				if (!modes[language]) language = "";
				stack.unshift("githubblock", [], [
					m[1],
					m[2],
					language
				], state);
				return this.token;
			},
			next: "githubblock"
		};
		var codeBlockRules = [{
			token: "support.function",
			regex: ".*",
			onMatch: function(value, state, stack, line) {
				var embedState = stack[1];
				var indent = stack[2][0];
				var endMarker = stack[2][1];
				var language = stack[2][2];
				var m = /^(\s*)(`+|~+)\s*$/.exec(value);
				if (m && m[1].length < indent.length + 3 && m[2].length >= endMarker.length && m[2][0] == endMarker[0]) {
					stack.splice(0, 3);
					this.next = stack.shift();
					return this.token;
				}
				this.next = "";
				if (language && modes[language]) {
					var data = modes[language].getTokenizer().getLineTokens(value, embedState.slice(0));
					stack[1] = data.state;
					return data.tokens;
				}
				return this.token;
			}
		}];
		this.$rules["start"].unshift({
			token: "empty_line",
			regex: "^$",
			next: "allowBlock"
		}, {
			token: "markup.heading.1",
			regex: "^=+(?=\\s*$)"
		}, {
			token: "markup.heading.2",
			regex: "^\\-+(?=\\s*$)"
		}, {
			token: function(value) {
				return "markup.heading." + value.length;
			},
			regex: /^#{1,6}(?=\s|$)/,
			next: "header"
		}, codeBlockStartRule, {
			token: "string.blockquote",
			regex: "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
			next: "blockquote"
		}, {
			token: "constant",
			regex: "^ {0,3}(?:(?:\\* ?){3,}|(?:\\- ?){3,}|(?:\\_ ?){3,})\\s*$",
			next: "allowBlock"
		}, {
			token: "markup.list",
			regex: "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
			next: "listblock-start"
		}, { include: "basic" });
		this.addRules({
			"basic": [
				{
					token: "constant.language.escape",
					regex: /\\[\\`*_{}\[\]()#+\-.!]/
				},
				{
					token: "support.function",
					regex: "(`+)(.*?[^`])(\\1)"
				},
				{
					token: [
						"text",
						"constant",
						"text",
						"url",
						"string",
						"text"
					],
					regex: "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
				},
				{
					token: [
						"text",
						"string",
						"text",
						"constant",
						"text"
					],
					regex: "(\\[)(" + escaped("]") + ")(\\]\\s*\\[)(" + escaped("]") + ")(\\])"
				},
				{
					token: [
						"text",
						"string",
						"text",
						"markup.underline",
						"string",
						"text"
					],
					regex: "(\\!?\\[)(" + escaped("]") + ")(\\]\\()((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^\"]))*)(\\s*\"" + escaped("\"") + "\"\\s*)?(\\))"
				},
				{
					token: "string.strong",
					regex: "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
				},
				{
					token: "string.emphasis",
					regex: "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
				},
				{
					token: [
						"text",
						"url",
						"text"
					],
					regex: "(<)((?:https?|ftp|dict):[^'\">\\s]+|(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+)(>)"
				}
			],
			"allowBlock": [
				{
					token: "support.function",
					regex: "^ {4}.+",
					next: "allowBlock"
				},
				{
					token: "empty_line",
					regex: "^$",
					next: "allowBlock"
				},
				{
					token: "empty",
					regex: "",
					next: "start"
				}
			],
			"header": [
				{
					regex: "$",
					next: "start"
				},
				{ include: "basic" },
				{ defaultToken: "heading" }
			],
			"listblock-start": [{
				token: "support.variable",
				regex: /(?:\[[ x]\])?/,
				next: "listblock"
			}],
			"listblock": [
				{
					token: "empty_line",
					regex: "^$",
					next: "start"
				},
				{
					token: "markup.list",
					regex: "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
					next: "listblock-start"
				},
				{
					include: "basic",
					noEscape: true
				},
				codeBlockStartRule,
				{ defaultToken: "list" }
			],
			"blockquote": [
				{
					token: "empty_line",
					regex: "^\\s*$",
					next: "start"
				},
				{
					token: "string.blockquote",
					regex: "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
					next: "blockquote"
				},
				{
					include: "basic",
					noEscape: true
				},
				{ defaultToken: "string.blockquote" }
			],
			"githubblock": codeBlockRules
		});
		this.normalizeRules();
	};
	oop.inherits(MarkdownHighlightRules, TextHighlightRules);
	exports.MarkdownHighlightRules = MarkdownHighlightRules;
}));
export { require_markdown_highlight_rules as t };
