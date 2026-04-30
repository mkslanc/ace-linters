import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_lang } from "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
import { t as require_latex_highlight_rules } from "./latex_highlight_rules-sc92RXKB.js";
//#region node_modules/ace-code/src/mode/rdoc_highlight_rules.js
var require_rdoc_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	require_latex_highlight_rules();
	var RDocHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "%.*$"
				},
				{
					token: "text",
					regex: "\\\\[$&%#\\{\\}]"
				},
				{
					token: "keyword",
					regex: "\\\\(?:name|alias|method|S3method|S4method|item|code|preformatted|kbd|pkg|var|env|option|command|author|email|url|source|cite|acronym|href|code|preformatted|link|eqn|deqn|keyword|usage|examples|dontrun|dontshow|figure|if|ifelse|Sexpr|RdOpts|inputencoding|usepackage)\\b",
					next: "nospell"
				},
				{
					token: "keyword",
					regex: "\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])"
				},
				{
					token: "paren.keyword.operator",
					regex: "[[({]"
				},
				{
					token: "paren.keyword.operator",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"nospell": [
				{
					token: "comment",
					regex: "%.*$",
					next: "start"
				},
				{
					token: "nospell.text",
					regex: "\\\\[$&%#\\{\\}]"
				},
				{
					token: "keyword",
					regex: "\\\\(?:name|alias|method|S3method|S4method|item|code|preformatted|kbd|pkg|var|env|option|command|author|email|url|source|cite|acronym|href|code|preformatted|link|eqn|deqn|keyword|usage|examples|dontrun|dontshow|figure|if|ifelse|Sexpr|RdOpts|inputencoding|usepackage)\\b"
				},
				{
					token: "keyword",
					regex: "\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])",
					next: "start"
				},
				{
					token: "paren.keyword.operator",
					regex: "[[({]"
				},
				{
					token: "paren.keyword.operator",
					regex: "[\\])]"
				},
				{
					token: "paren.keyword.operator",
					regex: "}",
					next: "start"
				},
				{
					token: "nospell.text",
					regex: "\\s+"
				},
				{
					token: "nospell.text",
					regex: "\\w+"
				}
			]
		};
	};
	oop.inherits(RDocHighlightRules, TextHighlightRules);
	exports.RDocHighlightRules = RDocHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/rdoc.js
var require_rdoc = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var RDocHighlightRules = require_rdoc_highlight_rules().RDocHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function(suppressHighlighting) {
		this.HighlightRules = RDocHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.getNextLineIndent = function(state, line, tab) {
			return this.$getIndent(line);
		};
		this.$id = "ace/mode/rdoc";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_rdoc();
