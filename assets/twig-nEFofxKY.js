import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import { t as require_lang } from "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
//#region node_modules/ace-code/src/mode/twig_highlight_rules.js
var require_twig_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	require_lang();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TwigHighlightRules = function() {
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
	oop.inherits(TwigHighlightRules, TextHighlightRules);
	exports.TwigHighlightRules = TwigHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/twig.js
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
//#endregion
export default require_twig();
