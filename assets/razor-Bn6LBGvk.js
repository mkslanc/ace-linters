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
import "./text-D8sm5DzM.js";
import { t as require_token_iterator } from "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./cstyle-C7DhJywu.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-DaZtgjLZ.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import { n as require_html_completions, t as require_html } from "./html-DDElvV2C.js";
import { t as require_csharp_highlight_rules } from "./csharp_highlight_rules-BPJFGati.js";
//#region node_modules/ace-code/src/mode/razor_highlight_rules.js
var require_razor_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var lang = require_lang();
	require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var CSharpHighlightRules = require_csharp_highlight_rules().CSharpHighlightRules;
	var RazorLangHighlightRules = function() {
		CSharpHighlightRules.call(this);
		var processPotentialCallback = function(value, stackItem) {
			if (typeof stackItem === "function") return stackItem(value);
			return stackItem;
		};
		var inBraces = "in-braces";
		this.$rules.start.unshift({
			regex: "[\\[({]",
			onMatch: function(value, state, stack) {
				var prefix = /razor-[^\-]+-/.exec(state)[0];
				stack.unshift(value);
				stack.unshift(prefix + inBraces);
				this.next = prefix + inBraces;
				return "paren.lparen";
			}
		}, {
			start: "@\\*",
			end: "\\*@",
			token: "comment"
		});
		var parentCloseMap = {
			"{": "}",
			"[": "]",
			"(": ")"
		};
		this.$rules[inBraces] = lang.deepCopy(this.$rules.start);
		this.$rules[inBraces].unshift({
			regex: "[\\])}]",
			onMatch: function(value, state, stack) {
				if (parentCloseMap[stack[1]] !== value) return "invalid.illegal";
				stack.shift();
				stack.shift();
				this.next = processPotentialCallback(value, stack[0]) || "start";
				return "paren.rparen";
			}
		});
	};
	oop.inherits(RazorLangHighlightRules, CSharpHighlightRules);
	var RazorHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var blockStartRule = {
			regex: "@[({]|@functions{|@code ?{",
			onMatch: function(value, state, stack) {
				stack.unshift(value);
				stack.unshift("razor-block-start");
				this.next = "razor-block-start";
				return "punctuation.block.razor";
			}
		};
		var blockEndMap = {
			"@{": "}",
			"@(": ")",
			"@functions{": "}",
			"@code {": "}",
			"@code{": "}"
		};
		var blockEndRule = {
			regex: "[})]",
			onMatch: function(value, state, stack) {
				if (blockEndMap[stack[1]] !== value) return "invalid.illegal";
				stack.shift();
				stack.shift();
				this.next = stack.shift() || "start";
				return "punctuation.block.razor";
			}
		};
		var shortStartRule = {
			regex: "@(?![{(])",
			onMatch: function(value, state, stack) {
				stack.unshift("razor-short-start");
				this.next = "razor-short-start";
				return "punctuation.short.razor";
			}
		};
		var shortEndRule = {
			token: "",
			regex: "(?=[^A-Za-z_\\.()\\[\\]])",
			next: "pop"
		};
		var razorStartRules = [
			{
				start: "@\\*",
				end: "\\*@",
				token: "comment"
			},
			{
				token: [
					"meta.directive.razor",
					"text",
					"identifier"
				],
				regex: "^(\\s*@(?:model|inject|inherits|implements|attribute|layout|namespace|rendermode|using))(\\s+)(.+)$"
			},
			{
				token: [
					"meta.directive.razor",
					"text",
					"string"
				],
				regex: "^(\\s*@page)(\\s+)(.*)$"
			},
			blockStartRule,
			shortStartRule
		];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], razorStartRules);
		this.embedRules(RazorLangHighlightRules, "razor-block-", [blockEndRule], ["start"]);
		this.embedRules(RazorLangHighlightRules, "razor-short-", [shortEndRule], ["start"]);
		this.normalizeRules();
	};
	oop.inherits(RazorHighlightRules, HtmlHighlightRules);
	exports.RazorHighlightRules = RazorHighlightRules;
	exports.RazorLangHighlightRules = RazorLangHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/razor_completions.js
var require_razor_completions = /* @__PURE__ */ __commonJSMin(((exports) => {
	require_token_iterator().TokenIterator;
	var keywords = [
		"abstract",
		"as",
		"base",
		"bool",
		"break",
		"byte",
		"case",
		"catch",
		"char",
		"checked",
		"class",
		"const",
		"continue",
		"decimal",
		"default",
		"delegate",
		"do",
		"double",
		"else",
		"enum",
		"event",
		"explicit",
		"extern",
		"false",
		"finally",
		"fixed",
		"float",
		"for",
		"foreach",
		"goto",
		"if",
		"implicit",
		"in",
		"int",
		"interface",
		"internal",
		"is",
		"lock",
		"long",
		"namespace",
		"new",
		"null",
		"object",
		"operator",
		"out",
		"override",
		"params",
		"private",
		"protected",
		"public",
		"readonly",
		"ref",
		"return",
		"sbyte",
		"sealed",
		"short",
		"sizeof",
		"stackalloc",
		"static",
		"string",
		"struct",
		"switch",
		"this",
		"throw",
		"true",
		"try",
		"typeof",
		"uint",
		"ulong",
		"unchecked",
		"unsafe",
		"ushort",
		"using",
		"var",
		"virtual",
		"void",
		"volatile",
		"while"
	];
	var shortHands = [
		"Html",
		"Model",
		"Url",
		"Layout"
	];
	var RazorCompletions = function() {};
	(function() {
		this.getCompletions = function(state, session, pos, prefix) {
			if (state.lastIndexOf("razor-short-start") == -1 && state.lastIndexOf("razor-block-start") == -1) return [];
			if (!session.getTokenAt(pos.row, pos.column)) return [];
			if (state.lastIndexOf("razor-short-start") != -1) return this.getShortStartCompletions(state, session, pos, prefix);
			if (state.lastIndexOf("razor-block-start") != -1) return this.getKeywordCompletions(state, session, pos, prefix);
		};
		this.getShortStartCompletions = function(state, session, pos, prefix) {
			return shortHands.map(function(element) {
				return {
					value: element,
					meta: "keyword",
					score: 1e6
				};
			});
		};
		this.getKeywordCompletions = function(state, session, pos, prefix) {
			return shortHands.concat(keywords).map(function(element) {
				return {
					value: element,
					meta: "keyword",
					score: 1e6
				};
			});
		};
	}).call(RazorCompletions.prototype);
	exports.RazorCompletions = RazorCompletions;
}));
//#endregion
//#region node_modules/ace-code/src/mode/razor.js
var require_razor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var RazorHighlightRules = require_razor_highlight_rules().RazorHighlightRules;
	var RazorCompletions = require_razor_completions().RazorCompletions;
	var HtmlCompletions = require_html_completions().HtmlCompletions;
	var Mode = function() {
		HtmlMode.call(this);
		this.$highlightRules = new RazorHighlightRules();
		this.$completer = new RazorCompletions();
		this.$htmlCompleter = new HtmlCompletions();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.getCompletions = function(state, session, pos, prefix) {
			var razorToken = this.$completer.getCompletions(state, session, pos, prefix);
			var htmlToken = this.$htmlCompleter.getCompletions(state, session, pos, prefix);
			return razorToken.concat(htmlToken);
		};
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/razor";
		this.snippetFileId = "ace/snippets/razor";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_razor();
