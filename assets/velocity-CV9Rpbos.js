import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
var require_velocity_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var lang = require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var VelocityHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		var builtinConstants = lang.arrayToMap("true|false|null".split("|"));
		var builtinFunctions = lang.arrayToMap("_DateTool|_DisplayTool|_EscapeTool|_FieldTool|_MathTool|_NumberTool|_SerializerTool|_SortTool|_StringTool|_XPathTool".split("|"));
		var builtinVariables = lang.arrayToMap("$contentRoot|$foreach".split("|"));
		var keywords = lang.arrayToMap("#set|#macro|#include|#parse|#if|#elseif|#else|#foreach|#break|#end|#stop".split("|"));
		this.$rules.start.push({
			token: "comment",
			regex: "##.*$"
		}, {
			token: "comment.block",
			regex: "#\\*",
			next: "vm_comment"
		}, {
			token: "string.regexp",
			regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
		}, {
			token: "string",
			regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
		}, {
			token: "string",
			regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
		}, {
			token: "constant.numeric",
			regex: "0[xX][0-9a-fA-F]+\\b"
		}, {
			token: "constant.numeric",
			regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
		}, {
			token: "constant.language.boolean",
			regex: "(?:true|false)\\b"
		}, {
			token: function(value) {
				if (keywords.hasOwnProperty(value)) return "keyword";
				else if (builtinConstants.hasOwnProperty(value)) return "constant.language";
				else if (builtinVariables.hasOwnProperty(value)) return "variable.language";
				else if (builtinFunctions.hasOwnProperty(value) || builtinFunctions.hasOwnProperty(value.substring(1))) return "support.function";
				else if (value == "debugger") return "invalid.deprecated";
				else if (value.match(/^(\$[a-zA-Z_][a-zA-Z0-9_]*)$/)) return "variable";
				return "identifier";
			},
			regex: "[a-zA-Z$#][a-zA-Z0-9_]*\\b"
		}, {
			token: "keyword.operator",
			regex: "!|&|\\*|\\-|\\+|=|!=|<=|>=|<|>|&&|\\|\\|"
		}, {
			token: "lparen",
			regex: "[[({]"
		}, {
			token: "rparen",
			regex: "[\\])}]"
		}, {
			token: "text",
			regex: "\\s+"
		});
		this.$rules["vm_comment"] = [{
			token: "comment",
			regex: "\\*#|-->",
			next: "start"
		}, { defaultToken: "comment" }];
		this.$rules["vm_start"] = [
			{
				token: "variable",
				regex: "}",
				next: "pop"
			},
			{
				token: "string.regexp",
				regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
			},
			{
				token: "string",
				regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
			},
			{
				token: "string",
				regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
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
				token: function(value) {
					if (keywords.hasOwnProperty(value)) return "keyword";
					else if (builtinConstants.hasOwnProperty(value)) return "constant.language";
					else if (builtinVariables.hasOwnProperty(value)) return "variable.language";
					else if (builtinFunctions.hasOwnProperty(value) || builtinFunctions.hasOwnProperty(value.substring(1))) return "support.function";
					else if (value == "debugger") return "invalid.deprecated";
					else if (value.match(/^(\$[a-zA-Z_$][a-zA-Z0-9_]*)$/)) return "variable";
					return "identifier";
				},
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator",
				regex: "!|&|\\*|\\-|\\+|=|!=|<=|>=|<|>|&&|\\|\\|"
			},
			{
				token: "lparen",
				regex: "[[({]"
			},
			{
				token: "rparen",
				regex: "[\\])}]"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		];
		for (var i in this.$rules) this.$rules[i].unshift({
			token: "variable",
			regex: "\\${",
			push: "vm_start"
		});
		this.normalizeRules();
	};
	oop$2.inherits(VelocityHighlightRules$1, TextHighlightRules);
	exports.VelocityHighlightRules = VelocityHighlightRules$1;
}));
var require_velocity$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var FoldMode$1 = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode$1, BaseFoldMode);
	(function() {
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var range = this.indentationBlock(session, row);
			if (range) return range;
			var re = /\S/;
			var line = session.getLine(row);
			var startLevel = line.search(re);
			if (startLevel == -1 || line[startLevel] != "##") return;
			var startColumn = line.length;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			while (++row < maxRow) {
				line = session.getLine(row);
				var level = line.search(re);
				if (level == -1) continue;
				if (line[level] != "##") break;
				endRow = row;
			}
			if (endRow > startRow) {
				var endColumn = session.getLine(endRow).length;
				return new Range(startRow, startColumn, endRow, endColumn);
			}
		};
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var indent = line.search(/\S/);
			var next = session.getLine(row + 1);
			var prev = session.getLine(row - 1);
			var prevIndent = prev.search(/\S/);
			var nextIndent = next.search(/\S/);
			if (indent == -1) {
				session.foldWidgets[row - 1] = prevIndent != -1 && prevIndent < nextIndent ? "start" : "";
				return "";
			}
			if (prevIndent == -1) {
				if (indent == nextIndent && line[indent] == "##" && next[indent] == "##") {
					session.foldWidgets[row - 1] = "";
					session.foldWidgets[row + 1] = "";
					return "start";
				}
			} else if (prevIndent == indent && line[indent] == "##" && prev[indent] == "##") {
				if (session.getLine(row - 2).search(/\S/) == -1) {
					session.foldWidgets[row - 1] = "start";
					session.foldWidgets[row + 1] = "";
					return "";
				}
			}
			if (prevIndent != -1 && prevIndent < indent) session.foldWidgets[row - 1] = "start";
			else session.foldWidgets[row - 1] = "";
			if (indent < nextIndent) return "start";
			else return "";
		};
	}).call(FoldMode$1.prototype);
}));
var require_velocity = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var VelocityHighlightRules = require_velocity_highlight_rules().VelocityHighlightRules;
	var FoldMode = require_velocity$1().FoldMode;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = VelocityHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.lineCommentStart = "##";
		this.blockComment = {
			start: "#*",
			end: "*#"
		};
		this.$id = "ace/mode/velocity";
		this.snippetFileId = "ace/snippets/velocity";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_velocity();
