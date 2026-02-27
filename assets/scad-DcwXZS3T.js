import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
var require_scad_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	require_lang();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var scadHighlightRules$1 = function() {
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"keyword": "module|if|else|for",
			"constant.language": "NULL"
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("start"),
				{
					token: "comment",
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: "[\"].*\\\\$",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "string",
					regex: "['].*\\\\$",
					next: "qstring"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: "constant",
					regex: "<[a-zA-Z0-9.]+>"
				},
				{
					token: "keyword",
					regex: "(?:use|include)"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"
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
					token: "text",
					regex: "\\s+"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"qqstring": [{
				token: "string",
				regex: "(?:(?:\\\\.)|(?:[^\"\\\\]))*?\"",
				next: "start"
			}, {
				token: "string",
				regex: ".+"
			}],
			"qstring": [{
				token: "string",
				regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
				next: "start"
			}, {
				token: "string",
				regex: ".+"
			}]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop$1.inherits(scadHighlightRules$1, TextHighlightRules);
	exports.scadHighlightRules = scadHighlightRules$1;
}));
var require_scad = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var scadHighlightRules = require_scad_highlight_rules().scadHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = scadHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
			var tokens = tokenizedLine.tokens;
			var endState = tokenizedLine.state;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				var match = line.match(/^.*[\{\(\[]\s*$/);
				if (match) indent += tab;
			} else if (state == "doc-start") {
				if (endState == "start") return "";
				var match = line.match(/^\s*(\/?)\*/);
				if (match) {
					if (match[1]) indent += " ";
					indent += "* ";
				}
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/scad";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_scad();
