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
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-Bq39j4o6.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import { t as require_css } from "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
import { t as require_json_highlight_rules } from "./json_highlight_rules--XSMI9Id.js";
import { t as require_json } from "./json-BF5SY2bl.js";
//#region node_modules/ace-code/src/mode/liquid_highlight_rules.js
var require_liquid_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CssHighlightRules = require_css_highlight_rules().CssHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var JsonHighlightRules = require_json_highlight_rules().JsonHighlightRules;
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var LiquidHighlightRules = function() {
		HtmlHighlightRules.call(this);
		/**
		* Embedded Matches
		*
		* Handles `onMatch` tokens and correct parses the
		* inner contents of the tag.
		*/
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
	oop.inherits(LiquidHighlightRules, TextHighlightRules);
	exports.LiquidHighlightRules = LiquidHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/liquid.js
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
//#endregion
export default require_liquid();
