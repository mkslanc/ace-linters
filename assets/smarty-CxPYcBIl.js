import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
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
