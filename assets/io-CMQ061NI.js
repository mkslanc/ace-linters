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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_io_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var IoHighlightRules$1 = function() {
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
	IoHighlightRules$1.metaData = {
		fileTypes: ["io"],
		keyEquivalent: "^~I",
		name: "Io",
		scopeName: "source.io"
	};
	oop$1.inherits(IoHighlightRules$1, TextHighlightRules);
	exports.IoHighlightRules = IoHighlightRules$1;
}));
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
export default require_io();
