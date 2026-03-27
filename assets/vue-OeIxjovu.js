import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import { t as require_lang } from "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import { t as require_tokenizer } from "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import { n as require_xml } from "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { n as require_html_completions, r as require_html, t as require_html$1 } from "./html-B8wEf2Cx.js";
import { t as require_coffee_highlight_rules } from "./coffee_highlight_rules-D8KEDJjA.js";
import "./markdown_highlight_rules-_xQ3EKon.js";
import { t as require_scss_highlight_rules } from "./scss_highlight_rules-DqufTyGx.js";
import { t as require_less_highlight_rules } from "./less_highlight_rules-w8Nad9q_.js";
import { t as require_jade_highlight_rules } from "./jade_highlight_rules-CFP-vNTu.js";
import { t as require_sass_highlight_rules } from "./sass_highlight_rules-CHM7eNJL.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-kVot3bnV.js";
import { t as require_stylus_highlight_rules } from "./stylus_highlight_rules-DOaWlkFb.js";
import { t as require_typescript_highlight_rules } from "./typescript_highlight_rules-BQicJo4u.js";
//#region node_modules/ace-code/src/mode/vue_highlight_rules.js
var require_vue_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var { CssHighlightRules } = require_css_highlight_rules();
	var { TypeScriptHighlightRules } = require_typescript_highlight_rules();
	var { CoffeeHighlightRules } = require_coffee_highlight_rules();
	var { HtmlHighlightRules } = require_html_highlight_rules();
	var { JavaScriptHighlightRules } = require_javascript_highlight_rules();
	var { StylusHighlightRules } = require_stylus_highlight_rules();
	var { SassHighlightRules } = require_sass_highlight_rules();
	var { ScssHighlightRules } = require_scss_highlight_rules();
	var { LessHighlightRules } = require_less_highlight_rules();
	var { Tokenizer } = require_tokenizer();
	var { SlimHighlightRules } = require_slim_highlight_rules();
	var { JadeHighlightRules } = require_jade_highlight_rules();
	var JavaScriptMode = require_javascript().Mode;
	var VueHighlightRules = function(options) {
		/**
		* @param {{new(): Ace.HighlightRules}|Ace.HighlightRulesMap} HighlightRules
		* @param {string} tag
		* @param {string} value
		* @param {string} [attribute]
		*/
		this.embedLangRules = function(HighlightRules, tag, value, attribute) {
			var condition = attribute ? "(?=[^>]*" + attribute + "\\s*=\\s*['\"]" + value + "['\"]))" : "(?=\\s|>|$))";
			this.$rules.start.unshift({
				token: ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
				regex: "(<)(" + tag + condition,
				next: [{
					token: "meta.tag.punctuation.tag-close." + tag + ".xml",
					regex: "/?>",
					next: value + "-start"
				}, { include: "attributes" }]
			});
			this.$rules[tag + "-end"] = [{ include: "attributes" }, {
				token: "meta.tag.punctuation.tag-close.xml",
				regex: "/?>",
				next: "start",
				onMatch: function(value, currentState, stack) {
					stack.splice(0);
					return this.token;
				}
			}];
			this.embedRules(HighlightRules, value + "-", [
				{
					token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
					regex: "(</)(" + tag + "(?=\\s|>|$))",
					next: tag + "-end"
				},
				{
					token: "string.cdata.xml",
					regex: "<\\!\\[CDATA\\["
				},
				{
					token: "string.cdata.xml",
					regex: "\\]\\]>"
				}
			]);
		};
		var vueRules = [{ include: "vue-interpolations" }];
		var VueRules = new HtmlHighlightRules().getRules();
		VueRules.start = vueRules.concat(VueRules.start);
		VueRules["vue-interpolations"] = [{
			token: "punctuation",
			regex: /\{\{\{?/,
			next: "js-interpolation-start"
		}];
		var self = this;
		VueRules.tag_stuff.unshift({
			token: "string",
			regex: /(?:\b(v-)|(:|@))(\[?[a-zA-Z\-.]+\]?)(?:(\:\[?[a-zA-Z\-]+\]?))?((?:\.[a-zA-Z\-]+)*)(\s*)(=)(\s*)(["'])/,
			onMatch: function(value, currentState, stack) {
				var quote = value[value.length - 1];
				stack.unshift(quote, currentState);
				var values = new RegExp(this.regex).exec(value);
				if (!values) return "text";
				var tokens = [];
				var types = [
					"entity.other.attribute-name.xml",
					"punctuation.separator.key-value.xml",
					"entity.other.attribute-name.xml",
					"entity.other.attribute-name.xml",
					"entity.other.attribute-name.xml",
					"text",
					"punctuation.separator.key-value.xml",
					"text",
					"string"
				];
				for (var i = 0, l = types.length; i < l; i++) if (values[i + 1]) tokens[tokens.length] = {
					type: types[i],
					value: values[i + 1]
				};
				return tokens;
			},
			next: [{
				token: "string",
				regex: /$/,
				next: "tag_stuff"
			}, {
				token: "string",
				regex: /.*/,
				onMatch: function(value, currentState, stack, line) {
					var quote = stack[0];
					var parts = value.split(quote);
					let text = parts[0];
					this.next = "";
					if (parts.length > 1) {
						stack.shift();
						var nextState = stack.shift();
						var currentData = new Tokenizer(self.$rules).getLineTokens(parts.slice(1).join(quote), nextState);
						currentData.tokens.unshift({
							type: "string",
							value: quote
						});
						this.next = Array.isArray(currentData.state) ? currentData.state[currentData.state.length - 1] : currentData.state;
					}
					var tokens = new JavaScriptMode().getTokenizer().getLineTokens(text, "start").tokens;
					if (currentData) tokens.push(...currentData.tokens);
					return tokens;
				}
			}]
		}, {
			token: "string",
			regex: "\"",
			next: [
				{
					token: "string",
					regex: "\"|$",
					next: "tag_stuff"
				},
				{ include: "vue-interpolations" },
				{ defaultToken: "string" }
			]
		}, {
			token: "string",
			regex: "'",
			next: [
				{
					token: "string",
					regex: "'|$",
					next: "tag_stuff"
				},
				{ include: "vue-interpolations" },
				{ defaultToken: "string" }
			]
		});
		this.$rules = VueRules;
		this.embedRules(JavaScriptHighlightRules, "js-interpolation-", [{
			token: "punctuation",
			regex: /\}\}\}?/,
			next: "start"
		}]);
		this.embedLangRules(CssHighlightRules, "style", "css");
		this.embedLangRules(StylusHighlightRules, "style", "stylus", "lang");
		this.embedLangRules(SassHighlightRules, "style", "sass", "lang");
		this.embedLangRules(ScssHighlightRules, "style", "scss", "lang");
		this.embedLangRules(LessHighlightRules, "style", "less", "lang");
		this.embedLangRules(TypeScriptHighlightRules, "script", "ts", "lang");
		this.embedLangRules(CoffeeHighlightRules, "script", "coffee", "lang");
		this.embedLangRules(SlimHighlightRules, "template", "slm", "lang");
		this.embedLangRules(JadeHighlightRules, "template", "jade", "lang");
		this.embedLangRules(StylusHighlightRules, "template", "stylus", "lang");
		this.normalizeRules();
	};
	oop.inherits(VueHighlightRules, HtmlHighlightRules);
	exports.VueHighlightRules = VueHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/vue.js
var require_vue = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var { FoldMode: HtmlFoldMode } = require_html();
	var lang = require_lang();
	var { XmlBehaviour } = require_xml();
	var { HtmlCompletions } = require_html_completions();
	var HTMLMode = require_html$1().Mode;
	var VueHighlightRules = require_vue_highlight_rules().VueHighlightRules;
	var voidElements = [
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"keygen",
		"link",
		"meta",
		"menuitem",
		"param",
		"source",
		"track",
		"wbr"
	];
	var optionalEndTags = [
		"li",
		"dt",
		"dd",
		"p",
		"rt",
		"rp",
		"optgroup",
		"option",
		"colgroup",
		"td",
		"th"
	];
	var Mode = function() {
		this.HighlightRules = VueHighlightRules;
		this.foldingRules = new HtmlFoldMode(this.voidElements, lang.arrayToMap(optionalEndTags));
		this.$behaviour = new XmlBehaviour();
		this.$completer = new HtmlCompletions();
	};
	oop.inherits(Mode, HTMLMode);
	(function() {
		this.blockComment = {
			start: "<!--",
			end: "-->"
		};
		this.voidElements = lang.arrayToMap(voidElements);
		this.getCompletions = function(state, session, pos, prefix) {
			return this.$completer.getCompletions(state, session, pos, prefix);
		};
		this.$id = "ace/mode/vue";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_vue();
