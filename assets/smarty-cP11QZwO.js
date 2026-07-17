import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-BTglbrVB.js";
import { t as require_html } from "./html-NZG1gGtk.js";
//#region node_modules/ace-code/src/mode/smarty_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_smarty_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var SmartyHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var smartyRules = {
			start: [{ include: "#comments" }, { include: "#blocks" }],
			"#blocks": [{
				token: "punctuation.section.embedded.begin.smarty",
				regex: "\\{%?",
				push: [
					{
						token: "punctuation.section.embedded.end.smarty",
						regex: "%?\\}",
						next: "pop"
					},
					{ include: "#strings" },
					{ include: "#variables" },
					{ include: "#lang" },
					{ defaultToken: "source.smarty" }
				]
			}],
			"#comments": [{
				token: ["punctuation.definition.comment.smarty", "comment.block.smarty"],
				regex: "(\\{%?)(\\*)",
				push: [{
					token: "comment.block.smarty",
					regex: "\\*%?\\}",
					next: "pop"
				}, { defaultToken: "comment.block.smarty" }]
			}],
			"#lang": [
				{
					token: "keyword.operator.smarty",
					regex: "(?:!=|!|<=|>=|<|>|===|==|%|&&|\\|\\|)|\\b(?:and|or|eq|neq|ne|gte|gt|ge|lte|lt|le|not|mod)\\b"
				},
				{
					token: "constant.language.smarty",
					regex: "\\b(?:TRUE|FALSE|true|false)\\b"
				},
				{
					token: "keyword.control.smarty",
					regex: "\\b(?:if|else|elseif|foreach|foreachelse|section|switch|case|break|default)\\b"
				},
				{
					token: "variable.parameter.smarty",
					regex: "\\b[a-zA-Z]+="
				},
				{
					token: "support.function.built-in.smarty",
					regex: "\\b(?:capture|config_load|counter|cycle|debug|eval|fetch|include_php|include|insert|literal|math|strip|rdelim|ldelim|assign|constant|block|html_[a-z_]*)\\b"
				},
				{
					token: "support.function.variable-modifier.smarty",
					regex: "\\|(?:capitalize|cat|count_characters|count_paragraphs|count_sentences|count_words|date_format|default|escape|indent|lower|nl2br|regex_replace|replace|spacify|string_format|strip_tags|strip|truncate|upper|wordwrap)"
				}
			],
			"#strings": [{
				token: "punctuation.definition.string.begin.smarty",
				regex: "'",
				push: [
					{
						token: "punctuation.definition.string.end.smarty",
						regex: "'",
						next: "pop"
					},
					{
						token: "constant.character.escape.smarty",
						regex: "\\\\."
					},
					{ defaultToken: "string.quoted.single.smarty" }
				]
			}, {
				token: "punctuation.definition.string.begin.smarty",
				regex: "\"",
				push: [
					{
						token: "punctuation.definition.string.end.smarty",
						regex: "\"",
						next: "pop"
					},
					{
						token: "constant.character.escape.smarty",
						regex: "\\\\."
					},
					{ defaultToken: "string.quoted.double.smarty" }
				]
			}],
			"#variables": [
				{
					token: ["punctuation.definition.variable.smarty", "variable.other.global.smarty"],
					regex: "\\b(\\$)(Smarty\\.)"
				},
				{
					token: ["punctuation.definition.variable.smarty", "variable.other.smarty"],
					regex: "(\\$)([a-zA-Z_][a-zA-Z0-9_]*)\\b"
				},
				{
					token: ["keyword.operator.smarty", "variable.other.property.smarty"],
					regex: "(->)([a-zA-Z_][a-zA-Z0-9_]*)\\b"
				},
				{
					token: [
						"keyword.operator.smarty",
						"meta.function-call.object.smarty",
						"punctuation.definition.variable.smarty",
						"variable.other.smarty",
						"punctuation.definition.variable.smarty"
					],
					regex: "(->)([a-zA-Z_][a-zA-Z0-9_]*)(\\()(.*?)(\\))"
				}
			]
		};
		var smartyStart = smartyRules.start;
		for (var rule in this.$rules) this.$rules[rule].unshift.apply(this.$rules[rule], smartyStart);
		Object.keys(smartyRules).forEach(function(x) {
			if (!this.$rules[x]) this.$rules[x] = smartyRules[x];
		}, this);
		this.normalizeRules();
	};
	SmartyHighlightRules.metaData = {
		fileTypes: ["tpl"],
		foldingStartMarker: "\\{%?",
		foldingStopMarker: "%?\\}",
		name: "Smarty",
		scopeName: "text.html.smarty"
	};
	oop.inherits(SmartyHighlightRules, HtmlHighlightRules);
	exports.SmartyHighlightRules = SmartyHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/smarty.js
var require_smarty = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var SmartyHighlightRules = require_smarty_highlight_rules().SmartyHighlightRules;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = SmartyHighlightRules;
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/smarty";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_smarty();
