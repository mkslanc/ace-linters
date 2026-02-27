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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./cstyle-C6ktp4d4.js";
import "./javascript_highlight_rules-DP2X209F.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import "./javascript-Bgq9ZLIq.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./css_completions-C1qupuMi.js";
import "./css-B6QOS37f.js";
import "./css-ds7EYb5W.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import "./mixed-Cyzulx9L.js";
import { t as require_html } from "./html-CZivRBj1.js";
var require_twig_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	require_lang();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TwigHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		var tags = "autoescape|block|do|embed|extends|filter|flush|for|from|if|import|include|macro|sandbox|set|spaceless|use|verbatim";
		tags = tags + "|end" + tags.replace(/\|/g, "|end");
		var filters = "abs|batch|capitalize|convert_encoding|date|date_modify|default|e|escape|first|format|join|json_encode|keys|last|length|lower|merge|nl2br|number_format|raw|replace|reverse|slice|sort|split|striptags|title|trim|upper|url_encode";
		var functions = "attribute|constant|cycle|date|dump|parent|random|range|template_from_string";
		var tests = "constant|divisibleby|sameas|defined|empty|even|iterable|odd";
		var constants = "null|none|true|false";
		var operators = "b-and|b-xor|b-or|in|is|and|or|not";
		var keywordMapper = this.createKeywordMapper({
			"keyword.control.twig": tags,
			"support.function.twig": [
				filters,
				functions,
				tests
			].join("|"),
			"keyword.operator.twig": operators,
			"constant.language.twig": constants
		}, "identifier");
		for (var rule in this.$rules) this.$rules[rule].unshift({
			token: "variable.other.readwrite.local.twig",
			regex: "\\{\\{-?",
			push: "twig-start"
		}, {
			token: "meta.tag.twig",
			regex: "\\{%-?",
			push: "twig-start"
		}, {
			token: "comment.block.twig",
			regex: "\\{#-?",
			push: "twig-comment"
		});
		this.$rules["twig-comment"] = [{
			token: "comment.block.twig",
			regex: ".*-?#\\}",
			next: "pop"
		}];
		this.$rules["twig-start"] = [
			{
				token: "variable.other.readwrite.local.twig",
				regex: "-?\\}\\}",
				next: "pop"
			},
			{
				token: "meta.tag.twig",
				regex: "-?%\\}",
				next: "pop"
			},
			{
				token: "string",
				regex: "'",
				next: "twig-qstring"
			},
			{
				token: "string",
				regex: "\"",
				next: "twig-qqstring"
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
				token: "constant.language.boolean",
				regex: "(?:true|false)\\b"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator.assignment",
				regex: "=|~"
			},
			{
				token: "keyword.operator.comparison",
				regex: "==|!=|<|>|>=|<=|==="
			},
			{
				token: "keyword.operator.arithmetic",
				regex: "\\+|-|/|%|//|\\*|\\*\\*"
			},
			{
				token: "keyword.operator.other",
				regex: "\\.\\.|\\|"
			},
			{
				token: "punctuation.operator",
				regex: /\?|:|,|;|\./
			},
			{
				token: "paren.lparen",
				regex: /[\[\({]/
			},
			{
				token: "paren.rparen",
				regex: /[\])}]/
			},
			{
				token: "text",
				regex: "\\s+"
			}
		];
		this.$rules["twig-qqstring"] = [
			{
				token: "constant.language.escape",
				regex: /\\[\\"$#ntr]|#{[^"}]*}/
			},
			{
				token: "string",
				regex: "\"",
				next: "twig-start"
			},
			{ defaultToken: "string" }
		];
		this.$rules["twig-qstring"] = [
			{
				token: "constant.language.escape",
				regex: /\\[\\'ntr]}/
			},
			{
				token: "string",
				regex: "'",
				next: "twig-start"
			},
			{ defaultToken: "string" }
		];
		this.normalizeRules();
	};
	oop$1.inherits(TwigHighlightRules$1, TextHighlightRules);
	exports.TwigHighlightRules = TwigHighlightRules$1;
}));
var require_twig = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var TwigHighlightRules = require_twig_highlight_rules().TwigHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = TwigHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.blockComment = {
			start: "{#",
			end: "#}"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
			var tokens = tokenizedLine.tokens;
			tokenizedLine.state;
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
		this.$id = "ace/mode/twig";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_twig();
