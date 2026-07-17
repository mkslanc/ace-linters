import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_ini$1 } from "./ini-B3D2umK1.js";
//#region node_modules/ace-code/src/mode/ini_highlight_rules.js
var require_ini_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var escapeRe = "\\\\(?:[\\\\0abtrn;#=:]|x[a-fA-F\\d]{4})";
	var IniHighlightRules = function() {
		this.$rules = { start: [
			{
				token: "punctuation.definition.comment.ini",
				regex: "#.*",
				push_: [{
					token: "comment.line.number-sign.ini",
					regex: "$|^",
					next: "pop"
				}, { defaultToken: "comment.line.number-sign.ini" }]
			},
			{
				token: "punctuation.definition.comment.ini",
				regex: ";.*",
				push_: [{
					token: "comment.line.semicolon.ini",
					regex: "$|^",
					next: "pop"
				}, { defaultToken: "comment.line.semicolon.ini" }]
			},
			{
				token: [
					"keyword.other.definition.ini",
					"text",
					"punctuation.separator.key-value.ini"
				],
				regex: "\\b([a-zA-Z0-9_.-]+)\\b(\\s*)(=)"
			},
			{
				token: [
					"punctuation.definition.entity.ini",
					"constant.section.group-title.ini",
					"punctuation.definition.entity.ini"
				],
				regex: "^(\\[)(.*?)(\\])"
			},
			{
				token: "punctuation.definition.string.begin.ini",
				regex: "'",
				push: [
					{
						token: "punctuation.definition.string.end.ini",
						regex: "'",
						next: "pop"
					},
					{
						token: "constant.language.escape",
						regex: escapeRe
					},
					{ defaultToken: "string.quoted.single.ini" }
				]
			},
			{
				token: "punctuation.definition.string.begin.ini",
				regex: "\"",
				push: [
					{
						token: "constant.language.escape",
						regex: escapeRe
					},
					{
						token: "punctuation.definition.string.end.ini",
						regex: "\"",
						next: "pop"
					},
					{ defaultToken: "string.quoted.double.ini" }
				]
			}
		] };
		this.normalizeRules();
	};
	IniHighlightRules.metaData = {
		fileTypes: ["ini", "conf"],
		keyEquivalent: "^~I",
		name: "Ini",
		scopeName: "source.ini"
	};
	oop.inherits(IniHighlightRules, TextHighlightRules);
	exports.IniHighlightRules = IniHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/ini.js
var require_ini = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var IniHighlightRules = require_ini_highlight_rules().IniHighlightRules;
	var FoldMode = require_ini$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = IniHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ";";
		this.blockComment = null;
		this.$id = "ace/mode/ini";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_ini();
