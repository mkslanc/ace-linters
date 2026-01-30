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
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DN609jMc.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BLT2K-CI.js";
import { t as require_css } from "./css-RWozyC1g.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import { t as require_markdown_highlight_rules } from "./markdown_highlight_rules-B3gJqP7-.js";
var require_mask_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.MaskHighlightRules = MaskHighlightRules$1;
	var oop$1 = require_oop();
	var lang = require_lang();
	var TextRules = require_text_highlight_rules().TextHighlightRules;
	var JSRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var CssRules = require_css_highlight_rules().CssHighlightRules;
	var MDRules = require_markdown_highlight_rules().MarkdownHighlightRules;
	var HTMLRules = require_html_highlight_rules().HtmlHighlightRules;
	var token_TAG = "keyword.support.constant.language", token_COMPO = "support.function.markup.bold", token_KEYWORD = "keyword", token_LANG = "constant.language", token_UTIL = "keyword.control.markup.italic", token_ATTR = "support.variable.class", token_PUNKT = "keyword.operator", token_ITALIC = "markup.italic", token_BOLD = "markup.bold", token_LPARE = "paren.lparen", token_RPARE = "paren.rparen";
	var const_FUNCTIONS, const_KEYWORDS, const_CONST, const_TAGS;
	(function() {
		const_FUNCTIONS = lang.arrayToMap("log".split("|"));
		const_CONST = lang.arrayToMap(":dualbind|:bind|:import|slot|event|style|html|markdown|md".split("|"));
		const_KEYWORDS = lang.arrayToMap("debugger|define|var|if|each|for|of|else|switch|case|with|visible|+if|+each|+for|+switch|+with|+visible|include|import".split("|"));
		const_TAGS = lang.arrayToMap("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp".split("|"));
	})();
	function MaskHighlightRules$1() {
		this.$rules = { "start": [
			Token("comment", "\\/\\/.*$"),
			Token("comment", "\\/\\*", [Token("comment", ".*?\\*\\/", "start"), Token("comment", ".+")]),
			Blocks.string("'''"),
			Blocks.string("\"\"\""),
			Blocks.string("\""),
			Blocks.string("'"),
			Blocks.syntax(/(markdown|md)\b/, "md-multiline", "multiline"),
			Blocks.syntax(/html\b/, "html-multiline", "multiline"),
			Blocks.syntax(/(slot|event)\b/, "js-block", "block"),
			Blocks.syntax(/style\b/, "css-block", "block"),
			Blocks.syntax(/var\b/, "js-statement", "attr"),
			Blocks.tag(),
			Token(token_LPARE, "[[({>]"),
			Token(token_RPARE, "[\\])};]", "start"),
			{ caseInsensitive: true }
		] };
		var rules = this;
		addJavaScript("interpolation", /\]/, token_RPARE + "." + token_ITALIC);
		addJavaScript("statement", /\)|}|;/);
		addJavaScript("block", /\}/);
		addCss();
		addMarkdown();
		addHtml();
		function addJavaScript(name, escape, closeType) {
			add(JSRules, "js-" + name + "-", escape, name === "block" ? ["start"] : ["start", "no_regex"], closeType);
		}
		function addCss() {
			add(CssRules, "css-block-", /\}/);
		}
		function addMarkdown() {
			add(MDRules, "md-multiline-", /("""|''')/, []);
		}
		function addHtml() {
			add(HTMLRules, "html-multiline-", /("""|''')/);
		}
		function add(Rules, strPrfx, rgxEnd, rootTokens, closeType) {
			var next = "pop";
			var tokens = rootTokens || ["start"];
			if (tokens.length === 0) tokens = null;
			if (/block|multiline/.test(strPrfx)) {
				next = strPrfx + "end";
				rules.$rules[next] = [Token("empty", "", "start")];
			}
			rules.embedRules(Rules, strPrfx, [Token(closeType || token_RPARE, rgxEnd, next)], tokens, tokens == null ? true : false);
		}
		this.normalizeRules();
	}
	oop$1.inherits(MaskHighlightRules$1, TextRules);
	var Blocks = {
		string: function(str, next) {
			var token = Token("string.start", str, [
				Token(token_LPARE + "." + token_ITALIC, /~\[/, Blocks.interpolation()),
				Token("string.end", str, "pop"),
				{ defaultToken: "string" }
			], next);
			if (str.length === 1) {
				var escaped = Token("string.escape", "\\\\" + str);
				token.push.unshift(escaped);
			}
			return token;
		},
		interpolation: function() {
			return [Token(token_UTIL, /\s*\w*\s*:/), "js-interpolation-start"];
		},
		tagHead: function(rgx) {
			return Token(token_ATTR, rgx, [
				Token(token_ATTR, /[\w\-_]+/),
				Token(token_LPARE + "." + token_ITALIC, /~\[/, Blocks.interpolation()),
				Blocks.goUp()
			]);
		},
		tag: function() {
			return {
				token: "tag",
				onMatch: function(value) {
					if (void 0 !== const_KEYWORDS[value]) return token_KEYWORD;
					if (void 0 !== const_CONST[value]) return token_LANG;
					if (void 0 !== const_FUNCTIONS[value]) return "support.function";
					if (void 0 !== const_TAGS[value.toLowerCase()]) return token_TAG;
					return token_COMPO;
				},
				regex: /([@\w\-_:+]+)|((^|\s)(?=\s*(\.|#)))/,
				push: [
					Blocks.tagHead(/\./),
					Blocks.tagHead(/#/),
					Blocks.expression(),
					Blocks.attribute(),
					Token(token_LPARE, /[;>{]/, "pop")
				]
			};
		},
		syntax: function(rgx, next, type) {
			return {
				token: token_LANG,
				regex: rgx,
				push: {
					"attr": [next + "-start", Token(token_PUNKT, /;/, "start")],
					"multiline": [
						Blocks.tagHead(/\./),
						Blocks.tagHead(/#/),
						Blocks.attribute(),
						Blocks.expression(),
						Token(token_LPARE, /[>\{]/),
						Token(token_PUNKT, /;/, "start"),
						Token(token_LPARE, /'''|"""/, [next + "-start"])
					],
					"block": [
						Blocks.tagHead(/\./),
						Blocks.tagHead(/#/),
						Blocks.attribute(),
						Blocks.expression(),
						Token(token_LPARE, /\{/, [next + "-start"])
					]
				}[type]
			};
		},
		attribute: function() {
			return Token(function(value) {
				return /^x\-/.test(value) ? token_ATTR + "." + token_BOLD : token_ATTR;
			}, /[\w_-]+/, [Token(token_PUNKT, /\s*=\s*/, [
				Blocks.string("\""),
				Blocks.string("'"),
				Blocks.word(),
				Blocks.goUp()
			]), Blocks.goUp()]);
		},
		expression: function() {
			return Token(token_LPARE, /\(/, ["js-statement-start"]);
		},
		word: function() {
			return Token("string", /[\w-_]+/);
		},
		goUp: function() {
			return Token("text", "", "pop");
		},
		goStart: function() {
			return Token("text", "", "start");
		}
	};
	function Token(token, rgx, mix) {
		var push, next, onMatch;
		if (arguments.length === 4) {
			push = mix;
			next = arguments[3];
		} else if (typeof mix === "string") next = mix;
		else push = mix;
		if (typeof token === "function") {
			onMatch = token;
			token = "empty";
		}
		return {
			token,
			regex: rgx,
			push,
			next,
			onMatch
		};
	}
}));
var require_mask = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var MaskHighlightRules = require_mask_highlight_rules().MaskHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CssBehaviour = require_css().CssBehaviour;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = MaskHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = new CssBehaviour();
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
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (line.match(/^.*\{\s*$/)) indent += tab;
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/mask";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_mask();
