import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
//#region node_modules/ace-code/src/mode/cedarschema_highlight_rules.js
var require_cedarschema_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CedarSchemaHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "comment.line.double-slash",
					regex: /\/\/.*$/
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.namespace"
					],
					regex: /(namespace)(\s+)([_a-zA-Z][_a-zA-Z0-9]*(?:::[_a-zA-Z][_a-zA-Z0-9]*)*)/
				},
				{
					token: "keyword",
					regex: /^\s*(?:type|entity|action)(?=\s+)/
				},
				{
					token: "keyword",
					regex: /\b(appliesTo)\b/
				},
				{
					token: [
						"keyword",
						"text",
						"paren.lparen"
					],
					regex: /\b(enum|in)(\s*)(\[)/
				},
				{
					token: [
						"paren.rparen",
						"text",
						"keyword"
					],
					regex: /(\})(\s*)(tags)\b/
				},
				{
					token: "variable.other.property",
					regex: /\b[_a-zA-Z][_a-zA-Z0-9]*(?=[?]?:(?!:))/
				},
				{
					token: "string.quoted.double",
					regex: "\"",
					next: "schema-string"
				},
				{
					token: "entity.name.type",
					regex: /[_a-zA-Z][_a-zA-Z0-9]*(?:::[_a-zA-Z][_a-zA-Z0-9]*)+/
				},
				{
					token: "punctuation.operator",
					regex: /::/
				},
				{
					token: "paren.lparen",
					regex: /[\[({]/
				},
				{
					token: "paren.rparen",
					regex: /[\])}]/
				},
				{
					token: "punctuation.operator",
					regex: /[,;?:]/
				},
				{
					token: "identifier",
					regex: /[a-zA-Z_][a-zA-Z0-9_]*\b/
				},
				{
					token: "text",
					regex: /\s+/
				}
			],
			"schema-string": [
				{
					token: "constant.character.escape",
					regex: /\\./
				},
				{
					token: "string.quoted.double",
					regex: "\"",
					next: "start"
				},
				{ defaultToken: "string.quoted.double" }
			]
		};
	};
	oop.inherits(CedarSchemaHighlightRules, TextHighlightRules);
	exports.CedarSchemaHighlightRules = CedarSchemaHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/cedarschema.js
var require_cedarschema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CedarSchemaHighlightRules = require_cedarschema_highlight_rules().CedarSchemaHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = CedarSchemaHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/cedarschema";
		this.snippetFileId = "ace/snippets/cedarschema";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			if (/[\{\[]\s*$/.test(line)) indent += tab;
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_cedarschema();
