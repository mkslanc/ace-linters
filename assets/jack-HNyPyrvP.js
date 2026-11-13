import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/jack_highlight_rules.js
var require_jack_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JackHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "string",
					regex: "\"",
					next: "string2"
				},
				{
					token: "string",
					regex: "'",
					next: "string1"
				},
				{
					token: "constant.numeric",
					regex: "-?0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "(?:0|[-+]?[1-9][0-9]*)\\b"
				},
				{
					token: "constant.binary",
					regex: "<[0-9A-Fa-f][0-9A-Fa-f](\\s+[0-9A-Fa-f][0-9A-Fa-f])*>"
				},
				{
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				},
				{
					token: "constant.language.null",
					regex: "null\\b"
				},
				{
					token: "storage.type",
					regex: "(?:Integer|Boolean|Null|String|Buffer|Tuple|List|Object|Function|Coroutine|Form)\\b"
				},
				{
					token: "keyword",
					regex: "(?:return|abort|vars|for|delete|in|is|escape|exec|split|and|if|elif|else|while)\\b"
				},
				{
					token: "language.builtin",
					regex: "(?:lines|source|parse|read-stream|interval|substr|parseint|write|print|range|rand|inspect|bind|i-values|i-pairs|i-map|i-filter|i-chunk|i-all\\?|i-any\\?|i-collect|i-zip|i-merge|i-each)\\b"
				},
				{
					token: "comment",
					regex: "--.*$"
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
					token: "storage.form",
					regex: "@[a-z]+"
				},
				{
					token: "constant.other.symbol",
					regex: ":+[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"
				},
				{
					token: "variable",
					regex: "[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"
				},
				{
					token: "keyword.operator",
					regex: "\\|\\||\\^\\^|&&|!=|==|<=|<|>=|>|\\+|-|\\*|\\/|\\^|\\%|\\#|\\!"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"string1": [
				{
					token: "constant.language.escape",
					regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\\/bfnrt])/
				},
				{
					token: "string",
					regex: "[^'\\\\]+"
				},
				{
					token: "string",
					regex: "'",
					next: "start"
				},
				{
					token: "string",
					regex: "",
					next: "start"
				}
			],
			"string2": [
				{
					token: "constant.language.escape",
					regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\\/bfnrt])/
				},
				{
					token: "string",
					regex: "[^\"\\\\]+"
				},
				{
					token: "string",
					regex: "\"",
					next: "start"
				},
				{
					token: "string",
					regex: "",
					next: "start"
				}
			]
		};
	};
	oop.inherits(JackHighlightRules, TextHighlightRules);
	exports.JackHighlightRules = JackHighlightRules;
}));
// node_modules/ace-code/src/mode/jack.js
var require_jack = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_jack_highlight_rules().JackHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
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
		this.$id = "ace/mode/jack";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_jack();
