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
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
//#region node_modules/ace-code/src/mode/io_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_io_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var IoHighlightRules = function() {
		this.$rules = { start: [
			{
				token: "keyword.control.io",
				regex: "\\b(?:if|ifTrue|ifFalse|ifTrueIfFalse|for|loop|reverseForeach|foreach|map|continue|break|while|do|return)\\b"
			},
			{
				token: "punctuation.definition.comment.io",
				regex: "/\\*",
				push: [{
					token: "punctuation.definition.comment.io",
					regex: "\\*/",
					next: "pop"
				}, { defaultToken: "comment.block.io" }]
			},
			{
				token: "punctuation.definition.comment.io",
				regex: "//",
				push: [{
					token: "comment.line.double-slash.io",
					regex: "$",
					next: "pop"
				}, { defaultToken: "comment.line.double-slash.io" }]
			},
			{
				token: "punctuation.definition.comment.io",
				regex: "#",
				push: [{
					token: "comment.line.number-sign.io",
					regex: "$",
					next: "pop"
				}, { defaultToken: "comment.line.number-sign.io" }]
			},
			{
				token: "variable.language.io",
				regex: "\\b(?:self|sender|target|proto|protos|parent)\\b",
				comment: "I wonder if some of this isn't variable.other.language? --Allan; scoping this as variable.language to match Objective-C's handling of 'self', which is inconsistent with C++'s handling of 'this' but perhaps intentionally so -- Rob"
			},
			{
				token: "keyword.operator.io",
				regex: "<=|>=|=|:=|\\*|\\||\\|\\||\\+|-|/|&|&&|>|<|\\?|@|@@|\\b(?:and|or)\\b"
			},
			{
				token: "constant.other.io",
				regex: "\\bGL[\\w_]+\\b"
			},
			{
				token: "support.class.io",
				regex: "\\b[A-Z](?:\\w+)?\\b"
			},
			{
				token: "support.function.io",
				regex: "\\b(?:clone|call|init|method|list|vector|block|\\w+(?=\\s*\\())\\b"
			},
			{
				token: "support.function.open-gl.io",
				regex: "\\bgl(?:u|ut)?[A-Z]\\w+\\b"
			},
			{
				token: "punctuation.definition.string.begin.io",
				regex: "\"\"\"",
				push: [
					{
						token: "punctuation.definition.string.end.io",
						regex: "\"\"\"",
						next: "pop"
					},
					{
						token: "constant.character.escape.io",
						regex: "\\\\."
					},
					{ defaultToken: "string.quoted.triple.io" }
				]
			},
			{
				token: "punctuation.definition.string.begin.io",
				regex: "\"",
				push: [
					{
						token: "punctuation.definition.string.end.io",
						regex: "\"",
						next: "pop"
					},
					{
						token: "constant.character.escape.io",
						regex: "\\\\."
					},
					{ defaultToken: "string.quoted.double.io" }
				]
			},
			{
				token: "constant.numeric.io",
				regex: "\\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"
			},
			{
				token: "variable.other.global.io",
				regex: "Lobby\\b"
			},
			{
				token: "constant.language.io",
				regex: "\\b(?:TRUE|true|FALSE|false|NULL|null|Null|Nil|nil|YES|NO)\\b"
			}
		] };
		this.normalizeRules();
	};
	IoHighlightRules.metaData = {
		fileTypes: ["io"],
		keyEquivalent: "^~I",
		name: "Io",
		scopeName: "source.io"
	};
	oop.inherits(IoHighlightRules, TextHighlightRules);
	exports.IoHighlightRules = IoHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/io.js
var require_io = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var IoHighlightRules = require_io_highlight_rules().IoHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = IoHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/io";
		this.snippetFileId = "ace/snippets/io";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_io();
