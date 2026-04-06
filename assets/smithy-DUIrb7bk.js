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
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
//#region node_modules/ace-code/src/mode/smithy_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_smithy_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SmithyHighlightRules = function() {
		this.$rules = {
			start: [
				{ include: "#comment" },
				{
					token: [
						"meta.keyword.statement.smithy",
						"variable.other.smithy",
						"text",
						"keyword.operator.smithy"
					],
					regex: /^(\$)(\s+.+)(\s*)(=)/
				},
				{
					token: [
						"keyword.statement.smithy",
						"text",
						"entity.name.type.namespace.smithy"
					],
					regex: /^(namespace)(\s+)([A-Z-a-z0-9_\.#$-]+)/
				},
				{
					token: [
						"keyword.statement.smithy",
						"text",
						"keyword.statement.smithy",
						"text",
						"entity.name.type.smithy"
					],
					regex: /^(use)(\s+)(shape|trait)(\s+)([A-Z-a-z0-9_\.#$-]+)\b/
				},
				{
					token: [
						"keyword.statement.smithy",
						"variable.other.smithy",
						"text",
						"keyword.operator.smithy"
					],
					regex: /^(metadata)(\s+.+)(\s*)(=)/
				},
				{
					token: [
						"keyword.statement.smithy",
						"text",
						"entity.name.type.smithy"
					],
					regex: /^(apply|byte|short|integer|long|float|double|bigInteger|bigDecimal|boolean|blob|string|timestamp|service|resource|trait|list|map|set|structure|union|document)(\s+)([A-Z-a-z0-9_\.#$-]+)\b/
				},
				{
					token: [
						"keyword.operator.smithy",
						"text",
						"entity.name.type.smithy",
						"text",
						"text",
						"support.function.smithy",
						"text",
						"text",
						"support.function.smithy"
					],
					regex: /^(operation)(\s+)([A-Z-a-z0-9_\.#$-]+)(\(.*\))(?:(\s*)(->)(\s*[A-Z-a-z0-9_\.#$-]+))?(?:(\s+)(errors))?/
				},
				{ include: "#trait" },
				{
					token: ["support.type.property-name.smithy", "punctuation.separator.dictionary.pair.smithy"],
					regex: /([A-Z-a-z0-9_\.#$-]+)(:)/
				},
				{ include: "#value" },
				{
					token: "keyword.other.smithy",
					regex: /\->/
				}
			],
			"#comment": [{ include: "#doc_comment" }, { include: "#line_comment" }],
			"#doc_comment": [{
				token: "comment.block.documentation.smithy",
				regex: /\/\/\/.*/
			}],
			"#line_comment": [{
				token: "comment.line.double-slash.smithy",
				regex: /\/\/.*/
			}],
			"#trait": [{
				token: ["punctuation.definition.annotation.smithy", "storage.type.annotation.smithy"],
				regex: /(@)([0-9a-zA-Z\.#-]+)/
			}, {
				token: [
					"punctuation.definition.annotation.smithy",
					"punctuation.definition.object.end.smithy",
					"meta.structure.smithy"
				],
				regex: /(@)([0-9a-zA-Z\.#-]+)(\()/,
				push: [
					{
						token: "punctuation.definition.object.end.smithy",
						regex: /\)/,
						next: "pop"
					},
					{ include: "#value" },
					{ include: "#object_inner" },
					{ defaultToken: "meta.structure.smithy" }
				]
			}],
			"#value": [
				{ include: "#constant" },
				{ include: "#number" },
				{ include: "#string" },
				{ include: "#array" },
				{ include: "#object" }
			],
			"#array": [{
				token: "punctuation.definition.array.begin.smithy",
				regex: /\[/,
				push: [
					{
						token: "punctuation.definition.array.end.smithy",
						regex: /\]/,
						next: "pop"
					},
					{ include: "#comment" },
					{ include: "#value" },
					{
						token: "punctuation.separator.array.smithy",
						regex: /,/
					},
					{
						token: "invalid.illegal.expected-array-separator.smithy",
						regex: /[^\s\]]/
					},
					{ defaultToken: "meta.structure.array.smithy" }
				]
			}],
			"#constant": [{
				token: "constant.language.smithy",
				regex: /\b(?:true|false|null)\b/
			}],
			"#number": [{
				token: "constant.numeric.smithy",
				regex: /-?(?:0|[1-9]\d*)(?:(?:\.\d+)?(?:[eE][+-]?\d+)?)?/
			}],
			"#object": [{
				token: "punctuation.definition.dictionary.begin.smithy",
				regex: /\{/,
				push: [
					{
						token: "punctuation.definition.dictionary.end.smithy",
						regex: /\}/,
						next: "pop"
					},
					{ include: "#trait" },
					{ include: "#object_inner" },
					{ defaultToken: "meta.structure.dictionary.smithy" }
				]
			}],
			"#object_inner": [
				{ include: "#comment" },
				{ include: "#string_key" },
				{
					token: "punctuation.separator.dictionary.key-value.smithy",
					regex: /:/,
					push: [
						{
							token: "punctuation.separator.dictionary.pair.smithy",
							regex: /,|(?=\})/,
							next: "pop"
						},
						{ include: "#value" },
						{
							token: "invalid.illegal.expected-dictionary-separator.smithy",
							regex: /[^\s,]/
						},
						{ defaultToken: "meta.structure.dictionary.value.smithy" }
					]
				},
				{
					token: "invalid.illegal.expected-dictionary-separator.smithy",
					regex: /[^\s\}]/
				}
			],
			"#string_key": [
				{ include: "#identifier_key" },
				{ include: "#dquote_key" },
				{ include: "#squote_key" }
			],
			"#identifier_key": [{
				token: "support.type.property-name.smithy",
				regex: /[A-Z-a-z0-9_\.#$-]+/
			}],
			"#dquote_key": [{ include: "#dquote" }],
			"#squote_key": [{ include: "#squote" }],
			"#string": [
				{ include: "#textblock" },
				{ include: "#dquote" },
				{ include: "#squote" },
				{ include: "#identifier" }
			],
			"#textblock": [{
				token: "punctuation.definition.string.begin.smithy",
				regex: /"""/,
				push: [
					{
						token: "punctuation.definition.string.end.smithy",
						regex: /"""/,
						next: "pop"
					},
					{
						token: "constant.character.escape.smithy",
						regex: /\\./
					},
					{ defaultToken: "string.quoted.double.smithy" }
				]
			}],
			"#dquote": [{
				token: "punctuation.definition.string.begin.smithy",
				regex: /"/,
				push: [
					{
						token: "punctuation.definition.string.end.smithy",
						regex: /"/,
						next: "pop"
					},
					{
						token: "constant.character.escape.smithy",
						regex: /\\./
					},
					{ defaultToken: "string.quoted.double.smithy" }
				]
			}],
			"#squote": [{
				token: "punctuation.definition.string.begin.smithy",
				regex: /'/,
				push: [
					{
						token: "punctuation.definition.string.end.smithy",
						regex: /'/,
						next: "pop"
					},
					{
						token: "constant.character.escape.smithy",
						regex: /\\./
					},
					{ defaultToken: "string.quoted.single.smithy" }
				]
			}],
			"#identifier": [{
				token: "storage.type.smithy",
				regex: /[A-Z-a-z_][A-Z-a-z0-9_\.#$-]*/
			}]
		};
		this.normalizeRules();
	};
	SmithyHighlightRules.metaData = {
		name: "Smithy",
		fileTypes: ["smithy"],
		scopeName: "source.smithy",
		foldingStartMarker: "(\\{|\\[)\\s*",
		foldingStopMarker: "\\s*(\\}|\\])"
	};
	oop.inherits(SmithyHighlightRules, TextHighlightRules);
	exports.SmithyHighlightRules = SmithyHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/smithy.js
var require_smithy = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var SmithyHighlightRules = require_smithy_highlight_rules().SmithyHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = SmithyHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$quotes = { "\"": "\"" };
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/smithy";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_smithy();
