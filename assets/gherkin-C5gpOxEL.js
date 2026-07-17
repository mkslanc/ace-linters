import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
//#region node_modules/ace-code/src/mode/gherkin_highlight_rules.js
var require_gherkin_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
	var GherkinHighlightRules = function() {
		var languages = [{
			name: "en",
			labels: "Feature|Background|Scenario(?: Outline)?|Examples",
			keywords: "Given|When|Then|And|But"
		}];
		var labels = languages.map(function(l) {
			return l.labels;
		}).join("|");
		var keywords = languages.map(function(l) {
			return l.keywords;
		}).join("|");
		this.$rules = {
			start: [
				{
					token: "constant.numeric",
					regex: "(?:(?:[1-9]\\d*)|(?:0))"
				},
				{
					token: "comment",
					regex: "#.*$"
				},
				{
					token: "keyword",
					regex: "(?:" + labels + "):|(?:" + keywords + ")\\b"
				},
				{
					token: "keyword",
					regex: "\\*"
				},
				{
					token: "string",
					regex: "\"{3}",
					next: "qqstring3"
				},
				{
					token: "string",
					regex: "\"",
					next: "qqstring"
				},
				{
					token: "text",
					regex: "^\\s*(?=@[\\w])",
					next: [
						{
							token: "text",
							regex: "\\s+"
						},
						{
							token: "variable.parameter",
							regex: "@[\\w]+"
						},
						{
							token: "empty",
							regex: "",
							next: "start"
						}
					]
				},
				{
					token: "comment",
					regex: "<[^>]+>"
				},
				{
					token: "comment",
					regex: "\\|(?=.)",
					next: "table-item"
				},
				{
					token: "comment",
					regex: "\\|$",
					next: "start"
				}
			],
			"qqstring3": [
				{
					token: "constant.language.escape",
					regex: stringEscape
				},
				{
					token: "string",
					regex: "\"{3}",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"qqstring": [
				{
					token: "constant.language.escape",
					regex: stringEscape
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"table-item": [
				{
					token: "comment",
					regex: /$/,
					next: "start"
				},
				{
					token: "comment",
					regex: /\|/
				},
				{
					token: "string",
					regex: /\\./
				},
				{ defaultToken: "string" }
			]
		};
		this.normalizeRules();
	};
	oop.inherits(GherkinHighlightRules, TextHighlightRules);
	exports.GherkinHighlightRules = GherkinHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/gherkin.js
var require_gherkin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var GherkinHighlightRules = require_gherkin_highlight_rules().GherkinHighlightRules;
	var Mode = function() {
		this.HighlightRules = GherkinHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/gherkin";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var space2 = "  ";
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (line.match("[ ]*\\|")) indent += "| ";
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match("Scenario:|Feature:|Scenario Outline:|Background:")) indent += space2;
				else if (line.match("(Given|Then).+(:)$|Examples:")) indent += space2;
				else if (line.match("\\*.+")) indent += "* ";
			}
			return indent;
		};
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_gherkin();
