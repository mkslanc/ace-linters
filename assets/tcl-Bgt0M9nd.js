import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
//#region node_modules/ace-code/src/mode/tcl_highlight_rules.js
var require_tcl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TclHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "#.*\\\\$",
					next: "commentfollow"
				},
				{
					token: "comment",
					regex: "#.*$"
				},
				{
					token: "support.function",
					regex: "[\\\\]$",
					next: "splitlineStart"
				},
				{
					token: "text",
					regex: /\\(?:["{}\[\]$\\])/
				},
				{
					token: "text",
					regex: "^|[^{][;][^}]|[/\r/]",
					next: "commandItem"
				},
				{
					token: "string",
					regex: "[ ]*[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: "[ ]*[\"]",
					next: "qqstring"
				},
				{
					token: "variable.instance",
					regex: "[$]",
					next: "variable"
				},
				{
					token: "support.function",
					regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|{\\*}|;|::"
				},
				{
					token: "identifier",
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "paren.lparen",
					regex: "[[{]",
					next: "commandItem"
				},
				{
					token: "paren.lparen",
					regex: "[(]"
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
			"commandItem": [
				{
					token: "comment",
					regex: "#.*\\\\$",
					next: "commentfollow"
				},
				{
					token: "comment",
					regex: "#.*$",
					next: "start"
				},
				{
					token: "string",
					regex: "[ ]*[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "variable.instance",
					regex: "[$]",
					next: "variable"
				},
				{
					token: "support.function",
					regex: "(?:[:][:])[a-zA-Z0-9_/]+(?:[:][:])",
					next: "commandItem"
				},
				{
					token: "support.function",
					regex: "[a-zA-Z0-9_/]+(?:[:][:])",
					next: "commandItem"
				},
				{
					token: "support.function",
					regex: "(?:[:][:])",
					next: "commandItem"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "support.function",
					regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|{\\*}|;|::"
				},
				{
					token: "keyword",
					regex: "[a-zA-Z0-9_/]+",
					next: "start"
				}
			],
			"commentfollow": [{
				token: "comment",
				regex: ".*\\\\$",
				next: "commentfollow"
			}, {
				token: "comment",
				regex: ".+",
				next: "start"
			}],
			"splitlineStart": [{
				token: "text",
				regex: "^.",
				next: "start"
			}],
			"variable": [{
				token: "variable.instance",
				regex: "[a-zA-Z_\\d]+(?:[(][a-zA-Z_\\d]+[)])?",
				next: "start"
			}, {
				token: "variable.instance",
				regex: "{?[a-zA-Z_\\d]+}?",
				next: "start"
			}],
			"qqstring": [{
				token: "string",
				regex: "(?:[^\\\\]|\\\\.)*?[\"]",
				next: "start"
			}, {
				token: "string",
				regex: ".+"
			}]
		};
	};
	oop.inherits(TclHighlightRules, TextHighlightRules);
	exports.TclHighlightRules = TclHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/tcl.js
var require_tcl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var TclHighlightRules = require_tcl_highlight_rules().TclHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	require_range().Range;
	var Mode = function() {
		this.HighlightRules = TclHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new CStyleFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/tcl";
		this.snippetFileId = "ace/snippets/tcl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_tcl();
