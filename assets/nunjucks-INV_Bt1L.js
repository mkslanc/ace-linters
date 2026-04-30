import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_lang } from "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import { t as require_token_iterator } from "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./cstyle-DxkoJQhq.js";
import "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import "./javascript-CtbB98r6.js";
import "./css_highlight_rules-_E_vcaY_.js";
import "./css_completions-C2GxC1IS.js";
import "./css-BIWs6ZVC.js";
import "./css-C0jKnsYY.js";
import "./xml_highlight_rules-DkcOGcVi.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DFgdMIml.js";
import { t as require_mixed } from "./mixed-CB1dzpdX.js";
import { r as require_html, t as require_html$1 } from "./html-DaEx_Icq.js";
//#region node_modules/ace-code/src/mode/folding/nunjucks.js
var require_nunjucks$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var { FoldMode: MixedFoldMode } = require_mixed();
	var HtmlFoldMode = require_html().FoldMode;
	var Range = require_range().Range;
	var TokenIterator = require_token_iterator().TokenIterator;
	var FoldMode = exports.FoldMode = function(voidElements, optionalTags) {
		HtmlFoldMode.call(this, voidElements, optionalTags);
	};
	oop.inherits(FoldMode, HtmlFoldMode);
	(function() {
		this.getFoldWidgetRangeBase = this.getFoldWidgetRange;
		this.getFoldWidgetBase = this.getFoldWidget;
		this.indentKeywords = {
			"block": 1,
			"if": 1,
			"for": 1,
			"asyncEach": 1,
			"asyncAll": 1,
			"macro": 1,
			"filter": 1,
			"call": 1,
			"else": 0,
			"elif": 0,
			"set": 1,
			"endblock": -1,
			"endif": -1,
			"endfor": -1,
			"endeach": -1,
			"endall": -1,
			"endmacro": -1,
			"endfilter": -1,
			"endcall": -1,
			"endset": -1
		};
		this.foldingStartMarkerNunjucks = /(?:\{%-?\s*)(?:(block|if|else|elif|for|asyncEach|asyncAll|macro|filter|call)\b.*)|(?:\bset(?:[^=]*))(?=%})/i;
		this.foldingStopMarkerNunjucks = /(?:\{%-?\s*)(endblock|endif|endfor|endeach|endall|endmacro|endfilter|endcall|endset)\b.*(?=%})/i;
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.doc.getLine(row);
			let offset = calculateOffset(this.foldingStartMarkerNunjucks, line);
			if (offset) return this.nunjucksBlock(session, row, offset);
			offset = calculateOffset(this.foldingStopMarkerNunjucks, line);
			if (offset) return this.nunjucksBlock(session, row, offset);
			return this.getFoldWidgetRangeBase(session, foldStyle, row);
		};
		/**
		*
		* @param {RegExp} regExp
		* @param line
		* @return {*}
		*/
		function calculateOffset(regExp, line) {
			var match = regExp.exec(line);
			if (match) {
				var keyword = match[0].includes("set") ? "set" : match[1].toLowerCase();
				if (keyword) {
					var offsetInMatch = match[0].toLowerCase().indexOf(keyword);
					return match.index + offsetInMatch + 1;
				}
			}
		}
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var isStart = this.foldingStartMarkerNunjucks.test(line);
			var isEnd = this.foldingStopMarkerNunjucks.test(line);
			if (isStart && !isEnd) {
				var offset = calculateOffset(this.foldingStartMarkerNunjucks, line);
				if (offset) {
					var type = session.getTokenAt(row, offset).type;
					if (type === "keyword.control") return "start";
				}
			}
			if (isEnd && !isStart && foldStyle === "markbeginend") {
				var offset = calculateOffset(this.foldingStopMarkerNunjucks, line);
				if (offset) {
					var type = session.getTokenAt(row, offset).type;
					if (type === "keyword.control") return "end";
				}
			}
			return this.getFoldWidgetBase(session, foldStyle, row);
		};
		/**
		*
		* @param {TokenIterator} stream
		*/
		function getTokenPosition(stream, findStart) {
			let token;
			const currentIndex = stream.$tokenIndex;
			const type = findStart ? "punctuation.begin" : "punctuation.end";
			stream.step = findStart ? stream.stepBackward : stream.stepForward;
			while (token = stream.step()) {
				if (token.type !== type) continue;
				break;
			}
			if (!token) return;
			let pos = stream.getCurrentTokenPosition();
			if (!findStart) pos.column = pos.column + token.value.length;
			stream.$tokenIndex = currentIndex;
			return pos;
		}
		this.nunjucksBlock = function(session, row, column) {
			var stream = new TokenIterator(session, row, column);
			var token = stream.getCurrentToken();
			if (!token || token.type != "keyword.control") return;
			var val = token.value;
			var stack = [val];
			var dir = this.indentKeywords[val];
			if (val === "else" || val === "elif") dir = 1;
			if (!dir) return;
			var start = getTokenPosition(stream, dir === -1);
			if (!token) return;
			stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
			while (token = stream.step()) {
				if (token.type !== "keyword.control") continue;
				var level = dir * this.indentKeywords[token.value];
				if (token.value === "set") {
					var tokenPos = stream.getCurrentTokenPosition();
					var line = session.getLine(tokenPos.row).substring(tokenPos.column);
					if (!/^[^=]*%}/.test(line)) continue;
				}
				if (level > 0) stack.unshift(token.value);
				else if (level <= 0) {
					stack.shift();
					if (!stack.length) break;
					if (level === 0) stack.unshift(token.value);
				}
			}
			if (!token) return null;
			var end = getTokenPosition(stream, dir === 1);
			return dir === 1 ? Range.fromPoints(start, end) : Range.fromPoints(end, start);
		};
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/nunjucks_highlight_rules.js
var require_nunjucks_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var NunjucksHighlightRules = function() {
		HtmlHighlightRules.call(this);
		this.$rules["start"].unshift({
			token: "punctuation.begin",
			regex: /{{-?/,
			push: [{
				token: "punctuation.end",
				regex: /-?}}/,
				next: "pop"
			}, { include: "expression" }]
		}, {
			token: "punctuation.begin",
			regex: /{%-?/,
			push: [
				{
					token: "punctuation.end",
					regex: /-?%}/,
					next: "pop"
				},
				{
					token: "constant.language.escape",
					regex: /\b(r\/.*\/[gimy]?)\b/
				},
				{ include: "statement" }
			]
		}, {
			token: "comment.begin",
			regex: /{#/,
			push: [{
				token: "comment.end",
				regex: /#}/,
				next: "pop"
			}, { defaultToken: "comment" }]
		});
		this.addRules({
			attribute_value: [{
				token: "string.attribute-value.xml",
				regex: "'",
				push: [
					{
						token: "string.attribute-value.xml",
						regex: "'",
						next: "pop"
					},
					{
						token: "punctuation.begin",
						regex: /{{-?/,
						push: [{
							token: "punctuation.end",
							regex: /-?}}/,
							next: "pop"
						}, { include: "expression" }]
					},
					{ include: "attr_reference" },
					{ defaultToken: "string.attribute-value.xml" }
				]
			}, {
				token: "string.attribute-value.xml",
				regex: "\"",
				push: [
					{
						token: "string.attribute-value.xml",
						regex: "\"",
						next: "pop"
					},
					{
						token: "punctuation.begin",
						regex: /{{-?/,
						push: [{
							token: "punctuation.end",
							regex: /-?}}/,
							next: "pop"
						}, { include: "expression" }]
					},
					{ include: "attr_reference" },
					{ defaultToken: "string.attribute-value.xml" }
				]
			}],
			"statement": [{
				token: "keyword.control",
				regex: /\b(block|endblock|extends|endif|elif|for|endfor|asyncEach|endeach|include|asyncAll|endall|macro|endmacro|set|endset|ignore missing|as|from|raw|verbatim|filter|endfilter)\b/
			}, { include: "expression" }],
			"expression": [
				{
					token: "constant.language",
					regex: /\b(true|false|none)\b/
				},
				{
					token: "string",
					regex: /"/,
					push: [
						{
							token: "string",
							regex: /"/,
							next: "pop"
						},
						{ include: "escapeStrings" },
						{ defaultToken: "string" }
					]
				},
				{
					token: "string",
					regex: /'/,
					push: [
						{
							token: "string",
							regex: /'/,
							next: "pop"
						},
						{ include: "escapeStrings" },
						{ defaultToken: "string" }
					]
				},
				{
					token: "constant.numeric",
					regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
				},
				{
					token: "constant.numeric",
					regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
				},
				{
					token: "keyword.operator",
					regex: /\+|-|\/\/|\/|%|\*\*|\*|===|==|!==|!=|>=|>|<=|</
				},
				{
					token: "keyword.control",
					regex: /\b(and|else|if|in|import|not|or)\b/
				},
				{
					token: "support.function",
					regex: /[a-zA-Z_]+(?=\()/
				},
				{
					token: "paren.lpar",
					regex: /[(\[{]/
				},
				{
					token: "paren.rpar",
					regex: /[)\]}]/
				},
				{
					token: "punctuation",
					regex: /[,]/
				},
				{
					token: ["punctuation", "support.function"],
					regex: /(\.)([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/
				},
				{
					token: ["punctuation", "variable.parameter"],
					regex: /(\.)([a-zA-Z_][a-zA-Z0-9_]*)/
				},
				{
					token: [
						"punctuation",
						"text",
						"support.other"
					],
					regex: /(\|)(\s)*([a-zA-Z_][a-zA-Z0-9_]*)/
				},
				{
					token: "variable",
					regex: /[a-zA-Z_][a-zA-Z0-9_]*/
				}
			],
			"escapeStrings": [{
				token: "constant.language.escape",
				regex: /(\\\\n)|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/
			}, {
				token: "constant.language.escape",
				regex: /\\(?:x[0-9A-F]{2}|(?:U[0-9A-Fa-f]{8})|(?:u[0-9A-Fa-f]{4})|(?:N{[a-zA-Z ]+}))/
			}]
		});
		this.normalizeRules();
	};
	oop.inherits(NunjucksHighlightRules, TextHighlightRules);
	exports.NunjucksHighlightRules = NunjucksHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/nunjucks.js
var require_nunjucks = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var NunjucksFoldMode = require_nunjucks$1().FoldMode;
	var lang = require_lang();
	var HtmlMode = require_html$1().Mode;
	var NunjucksHighlightRules = require_nunjucks_highlight_rules().NunjucksHighlightRules;
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
		this.HighlightRules = NunjucksHighlightRules;
		this.foldingRules = new NunjucksFoldMode(this.voidElements, lang.arrayToMap(optionalEndTags));
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/nunjucks";
		this.voidElements = lang.arrayToMap(voidElements);
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_nunjucks();
