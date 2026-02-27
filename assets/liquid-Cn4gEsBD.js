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
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BN2AN0ZM.js";
import "./css_completions-C1qupuMi.js";
import "./css-B6QOS37f.js";
import { t as require_css } from "./css-ds7EYb5W.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import "./mixed-Cyzulx9L.js";
import { t as require_html } from "./html-CZivRBj1.js";
import { t as require_json_highlight_rules } from "./json_highlight_rules-CkMIKoEi.js";
import { t as require_json } from "./json-CSjoF_iy.js";
var require_liquid_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CssHighlightRules = require_css_highlight_rules().CssHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var JsonHighlightRules = require_json_highlight_rules().JsonHighlightRules;
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var LiquidHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		function onMatchEmbedded(name) {
			const length = name.length;
			return function(value) {
				const idx = value.indexOf(name);
				return [
					{
						type: "meta.tag.punctuation.tag-open",
						value: "{%"
					},
					{
						type: "text",
						value: value.slice(2, idx)
					},
					{
						type: "keyword.tag" + name + ".tag-name",
						value: value.slice(idx, idx + length)
					},
					{
						type: "text",
						value: value.slice(idx + length, value.indexOf("%}"))
					},
					{
						type: "meta.tag.punctuation.tag-close",
						value: "%}"
					}
				];
			};
		}
		for (var rule in this.$rules) this.$rules[rule].unshift({
			token: "comment.block",
			regex: /{%-?\s*comment\s*-?%}/,
			next: [{
				token: "comment.block",
				regex: /{%-?\s*endcomment\s*-?%}/,
				next: "pop"
			}, {
				defaultToken: "comment",
				caseInsensitive: false
			}]
		}, {
			token: "comment.line",
			regex: /{%-?\s*#/,
			next: [{
				token: "comment.line",
				regex: /-?%}/,
				next: "pop"
			}, {
				defaultToken: "comment",
				caseInsensitive: false
			}]
		}, {
			token: "style.embedded.start",
			regex: /({%-?\s*\bstyle\b\s*-?%})/,
			next: "style-start",
			onMatch: onMatchEmbedded("style")
		}, {
			regex: /({%-?\s*\bstylesheet\b\s*-?%})/,
			next: "stylesheet-start",
			onMatch: onMatchEmbedded("stylesheet")
		}, {
			regex: /({%-?\s*\bschema\b\s*-?%})/,
			next: "schema-start",
			onMatch: onMatchEmbedded("schema")
		}, {
			regex: /({%-?\s*\bjavascript\b\s*-?%})/,
			next: "javascript-start",
			onMatch: onMatchEmbedded("javascript")
		}, {
			token: "meta.tag.punctuation.tag-open",
			regex: /({%)/,
			next: [{
				token: "keyword.block",
				regex: /-?\s*[a-zA-Z_$][a-zA-Z0-9_$]+\b/,
				next: "liquid-start"
			}, {
				token: "meta.tag.punctuation.tag-close",
				regex: /(-?)(%})/,
				next: "pop"
			}]
		}, {
			token: "meta.tag.punctuation.ouput-open",
			regex: /({{)/,
			push: "liquid-start"
		});
		this.embedRules(JsonHighlightRules, "schema-", [{
			token: "schema-start",
			next: "pop",
			regex: /({%-?\s*\bendschema\b\s*-?%})/,
			onMatch: onMatchEmbedded("endschema")
		}]);
		this.embedRules(JavaScriptHighlightRules, "javascript-", [{
			token: "javascript-start",
			next: "pop",
			regex: /({%-?\s*\bendjavascript\b\s*-?%})/,
			onMatch: onMatchEmbedded("endjavascript")
		}]);
		this.embedRules(CssHighlightRules, "style-", [{
			token: "style-start",
			next: "pop",
			regex: /({%-?\s*\bendstyle\b\s*-?%})/,
			onMatch: onMatchEmbedded("endstyle")
		}]);
		this.embedRules(CssHighlightRules, "stylesheet-", [{
			token: "stylesheet-start",
			next: "pop",
			regex: /({%-?\s*\bendstylesheet\b\s*-?%})/,
			onMatch: onMatchEmbedded("endstylesheet")
		}]);
		this.addRules({ "liquid-start": [
			{
				token: "meta.tag.punctuation.ouput-close",
				regex: /}}/,
				next: "pop"
			},
			{
				token: "meta.tag.punctuation.tag-close",
				regex: /%}/,
				next: "pop"
			},
			{
				token: "string",
				regex: /['](?:(?:\\.)|(?:[^'\\]))*?[']/
			},
			{
				token: "string",
				regex: /["](?:(?:\\.)|(?:[^'\\]))*?["]/
			},
			{
				token: "constant.numeric",
				regex: /0[xX][0-9a-fA-F]+\b/
			},
			{
				token: "constant.numeric",
				regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
			},
			{
				token: "keyword.operator",
				regex: /\*|\-|\+|=|!=|\?\|\:/
			},
			{
				token: "constant.language.boolean",
				regex: /(?:true|false|nil|empty)\b/
			},
			{
				token: "keyword.operator",
				regex: /\s+(?:and|contains|in|with)\b\s+/
			},
			{
				token: ["keyword.operator", "support.function"],
				regex: /(\|\s*)([a-zA-Z_]+)/
			},
			{
				token: "support.function",
				regex: /\s*([a-zA-Z_]+\b)(?=:)/
			},
			{
				token: "keyword.operator",
				regex: /(:)\s*(?=[a-zA-Z_])/
			},
			{
				token: [
					"support.class",
					"keyword.operator",
					"support.object",
					"keyword.operator",
					"variable.parameter"
				],
				regex: /(\w+)(\.)(\w+)(\.)?(\w+)?/
			},
			{
				token: "variable.parameter",
				regex: /\.([a-zA-Z_$][a-zA-Z0-9_$]*\b)$/
			},
			{
				token: "support.class",
				regex: /(?:additional_checkout_buttons|content_for_additional_checkout_buttons)\b/
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
				regex: /\s+/
			}
		] });
		this.normalizeRules();
	};
	oop$1.inherits(LiquidHighlightRules$1, TextHighlightRules);
	exports.LiquidHighlightRules = LiquidHighlightRules$1;
}));
var require_liquid = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HtmlMode = require_html().Mode;
	var JavascriptMode = require_javascript().Mode;
	var JsonMode = require_json().Mode;
	var CssMode = require_css().Mode;
	var LiquidHighlightRules = require_liquid_highlight_rules().LiquidHighlightRules;
	require_matching_brace_outdent().MatchingBraceOutdent;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		JsonMode.call(this);
		HtmlMode.call(this);
		CssMode.call(this);
		JavascriptMode.call(this);
		this.HighlightRules = LiquidHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.blockComment = {
			start: "<!--",
			end: "-->"
		};
		this.voidElements = new HtmlMode().voidElements;
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
		this.$id = "ace/mode/liquid";
		this.snippetFileId = "ace/snippets/liquid";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_liquid();
