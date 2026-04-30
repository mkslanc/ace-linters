import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-Crv5ZBqX.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./c_cpp_highlight_rules-DRFUTc9O.js";
import { t as require_c_cpp } from "./c_cpp-C3N_qWse.js";
//#region node_modules/ace-code/src/mode/dart_highlight_rules.js
var require_dart_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DartHighlightRules = function() {
		var constantLanguage = "true|false|null";
		var variableLanguage = "this|super";
		var keywordControl = "try|catch|finally|throw|rethrow|assert|break|case|continue|default|do|else|for|if|in|return|switch|while|new|deferred|async|await";
		var keywordDeclaration = "abstract|class|extends|external|factory|implements|get|native|operator|set|typedef|with|enum";
		var storageModifier = "static|final|const";
		var storageType = "void|bool|num|int|double|dynamic|var|String";
		var keywordMapper = this.createKeywordMapper({
			"constant.language.dart": constantLanguage,
			"variable.language.dart": variableLanguage,
			"keyword.control.dart": keywordControl,
			"keyword.declaration.dart": keywordDeclaration,
			"storage.modifier.dart": storageModifier,
			"storage.type.primitive.dart": storageType
		}, "identifier");
		var stringfill = [
			{
				token: "constant.language.escape",
				regex: /\\./
			},
			{
				token: "text",
				regex: /\$(?:\w+|{[^"'}]+})?/
			},
			{ defaultToken: "string" }
		];
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: /\/\/.*$/
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: /\/\*/,
					next: "comment"
				},
				{
					token: ["meta.preprocessor.script.dart"],
					regex: "^(#!.*)$"
				},
				{
					token: "keyword.other.import.dart",
					regex: "(?:\\b)(?:library|import|export|part|of|show|hide)(?:\\b)"
				},
				{
					token: ["keyword.other.import.dart", "text"],
					regex: "(?:\\b)(prefix)(\\s*:)"
				},
				{
					regex: "\\bas\\b",
					token: "keyword.cast.dart"
				},
				{
					regex: "\\?|:",
					token: "keyword.control.ternary.dart"
				},
				{
					regex: "(?:\\b)(is\\!?)(?:\\b)",
					token: ["keyword.operator.dart"]
				},
				{
					regex: "(<<|>>>?|~|\\^|\\||&)",
					token: ["keyword.operator.bitwise.dart"]
				},
				{
					regex: "((?:&|\\^|\\||<<|>>>?)=)",
					token: ["keyword.operator.assignment.bitwise.dart"]
				},
				{
					regex: "(===?|!==?|<=?|>=?)",
					token: ["keyword.operator.comparison.dart"]
				},
				{
					regex: "((?:[+*/%-]|\\~)=)",
					token: ["keyword.operator.assignment.arithmetic.dart"]
				},
				{
					regex: "=",
					token: "keyword.operator.assignment.dart"
				},
				{
					token: "string",
					regex: "'''",
					next: "qdoc"
				},
				{
					token: "string",
					regex: "\"\"\"",
					next: "qqdoc"
				},
				{
					token: "string",
					regex: "'",
					next: "qstring"
				},
				{
					token: "string",
					regex: "\"",
					next: "qqstring"
				},
				{
					regex: "(\\-\\-|\\+\\+)",
					token: ["keyword.operator.increment-decrement.dart"]
				},
				{
					regex: "(\\-|\\+|\\*|\\/|\\~\\/|%)",
					token: ["keyword.operator.arithmetic.dart"]
				},
				{
					regex: "(!|&&|\\|\\|)",
					token: ["keyword.operator.logical.dart"]
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
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"qdoc": [{
				token: "string",
				regex: "'''",
				next: "start"
			}].concat(stringfill),
			"qqdoc": [{
				token: "string",
				regex: "\"\"\"",
				next: "start"
			}].concat(stringfill),
			"qstring": [{
				token: "string",
				regex: "'|$",
				next: "start"
			}].concat(stringfill),
			"qqstring": [{
				token: "string",
				regex: "\"|$",
				next: "start"
			}].concat(stringfill)
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop.inherits(DartHighlightRules, TextHighlightRules);
	exports.DartHighlightRules = DartHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/dart.js
var require_dart = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CMode = require_c_cpp().Mode;
	var DartHighlightRules = require_dart_highlight_rules().DartHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		CMode.call(this);
		this.HighlightRules = DartHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, CMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/dart";
		this.snippetFileId = "ace/snippets/dart";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_dart();
