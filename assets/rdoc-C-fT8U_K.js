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
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
import { t as require_latex_highlight_rules } from "./latex_highlight_rules-BpnTM3_s.js";
var require_rdoc_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	require_latex_highlight_rules();
	var RDocHighlightRules$1 = function() {
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
	oop$1.inherits(RDocHighlightRules$1, TextHighlightRules);
	exports.RDocHighlightRules = RDocHighlightRules$1;
}));
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
export default require_rdoc();
