import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
//#region node_modules/ace-code/src/mode/cedar_highlight_rules.js
var require_cedar_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CedarHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"keyword": "permit|forbid|when|unless|in|has|like|if|then|else|is",
			"variable.other.constant": "principal|action|resource|context",
			"constant.language.boolean": "true|false",
			"support.function": "ip|decimal|datetime|duration"
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment.line.double-slash",
					regex: /\/\/.*$/
				},
				{
					token: ["meta.decorator", "paren.lparen"],
					regex: /(@[_a-zA-Z][_a-zA-Z0-9]*)([\(])/
				},
				{
					token: "variable.other",
					regex: /\?(principal|resource)\b/
				},
				{
					token: "string.quoted.double",
					regex: "\"",
					next: "cedar-string"
				},
				{
					token: "entity.name.type",
					regex: /[_a-zA-Z][_a-zA-Z0-9]*(?:::[_a-zA-Z][_a-zA-Z0-9]*)*(?=::")/
				},
				{
					token: "entity.name.type",
					regex: /[_a-zA-Z][_a-zA-Z0-9]*(?:::[_a-zA-Z][_a-zA-Z0-9]*)+/
				},
				{
					token: [
						"punctuation.operator",
						"entity.name.function.member",
						"paren.lparen"
					],
					regex: /(\.)(contains|containsAll|containsAny|isEmpty|getTag|hasTag|isIpv4|isIpv6|isLoopback|isMulticast|isInRange|lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual|offset|durationSince|toDate|toTime|toMilliseconds|toSeconds|toMinutes|toHours|toDays)(\()/
				},
				{
					token: ["support.function", "paren.lparen"],
					regex: /(ip|decimal|datetime|duration)(\()/
				},
				{
					token: "constant.numeric",
					regex: /[1-9][0-9]*|0\b/
				},
				{
					token: keywordMapper,
					regex: /[a-zA-Z_][a-zA-Z0-9_]*\b/
				},
				{
					token: "punctuation.operator",
					regex: /::/
				},
				{
					token: "keyword.operator",
					regex: /==|!=|<=|>=|<|>|&&|\|\||!/
				},
				{
					token: "keyword.operator",
					regex: /[+\-*]/
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
					regex: /[,;.]/
				},
				{
					token: "text",
					regex: /\s+/
				}
			],
			"cedar-string": [
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
	oop.inherits(CedarHighlightRules, TextHighlightRules);
	exports.CedarHighlightRules = CedarHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/cedar.js
var require_cedar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CedarHighlightRules = require_cedar_highlight_rules().CedarHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = CedarHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/cedar";
		this.snippetFileId = "ace/snippets/cedar";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			if (/[\{\(]\s*$/.test(line)) indent += tab;
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
export default require_cedar();
