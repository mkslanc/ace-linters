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
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_ini$1 } from "./ini-BmclKMj9.js";
var require_ini_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var escapeRe = "\\\\(?:[\\\\0abtrn;#=:]|x[a-fA-F\\d]{4})";
	var IniHighlightRules$1 = function() {
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
	IniHighlightRules$1.metaData = {
		fileTypes: ["ini", "conf"],
		keyEquivalent: "^~I",
		name: "Ini",
		scopeName: "source.ini"
	};
	oop$1.inherits(IniHighlightRules$1, TextHighlightRules);
	exports.IniHighlightRules = IniHighlightRules$1;
}));
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
export default require_ini();
