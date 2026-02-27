import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
import { t as require_coffee_highlight_rules } from "./coffee_highlight_rules-DQ5cxQvG.js";
import { t as require_markdown_highlight_rules } from "./markdown_highlight_rules-D1Ull-mW.js";
import { t as require_scss_highlight_rules } from "./scss_highlight_rules-B88XfZOg.js";
import { t as require_less_highlight_rules } from "./less_highlight_rules-Dpd23VAp.js";
var require_jade_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	require_markdown_highlight_rules().MarkdownHighlightRules;
	require_scss_highlight_rules().ScssHighlightRules;
	require_less_highlight_rules().LessHighlightRules;
	require_coffee_highlight_rules().CoffeeHighlightRules;
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	function mixin_embed(tag, prefix) {
		return {
			token: "entity.name.function.jade",
			regex: "^\\s*\\:" + tag,
			next: prefix + "start"
		};
	}
	var JadeHighlightRules = function() {
		var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
		this.$rules = {
			"start": [
				{
					token: "keyword.control.import.include.jade",
					regex: "\\s*\\binclude\\b"
				},
				{
					token: "keyword.other.doctype.jade",
					regex: "^!!!\\s*(?:[a-zA-Z0-9-_]+)?"
				},
				{
					onMatch: function(value, currentState, stack) {
						stack.unshift(this.next, value.length - 2, currentState);
						return "comment";
					},
					regex: /^\s*\/\//,
					next: "comment_block"
				},
				mixin_embed("markdown", "markdown-"),
				mixin_embed("sass", "sass-"),
				mixin_embed("less", "less-"),
				mixin_embed("coffee", "coffee-"),
				{
					token: [
						"storage.type.function.jade",
						"entity.name.function.jade",
						"punctuation.definition.parameters.begin.jade",
						"variable.parameter.function.jade",
						"punctuation.definition.parameters.end.jade"
					],
					regex: "^(\\s*mixin)( [\\w\\-]+)(\\s*\\()(.*?)(\\))"
				},
				{
					token: ["storage.type.function.jade", "entity.name.function.jade"],
					regex: "^(\\s*mixin)( [\\w\\-]+)"
				},
				{
					token: "source.js.embedded.jade",
					regex: "^\\s*(?:-|=|!=)",
					next: "js-start"
				},
				{
					token: "string.interpolated.jade",
					regex: "[#!]\\{[^\\}]+\\}"
				},
				{
					token: "meta.tag.any.jade",
					regex: /^\s*(?!\w+:)(?:[\w-]+|(?=\.|#)])/,
					next: "tag_single"
				},
				{
					token: "suport.type.attribute.id.jade",
					regex: "#\\w+"
				},
				{
					token: "suport.type.attribute.class.jade",
					regex: "\\.\\w+"
				},
				{
					token: "punctuation",
					regex: "\\s*(?:\\()",
					next: "tag_attributes"
				}
			],
			"comment_block": [{
				regex: /^\s*(?:\/\/)?/,
				onMatch: function(value, currentState, stack) {
					if (value.length <= stack[1]) {
						if (value.slice(-1) == "/") {
							stack[1] = value.length - 2;
							this.next = "";
							return "comment";
						}
						stack.shift();
						stack.shift();
						this.next = stack.shift();
						return "text";
					} else {
						this.next = "";
						return "comment";
					}
				},
				next: "start"
			}, { defaultToken: "comment" }],
			"tag_single": [
				{
					token: "entity.other.attribute-name.class.jade",
					regex: "\\.[\\w-]+"
				},
				{
					token: "entity.other.attribute-name.id.jade",
					regex: "#[\\w-]+"
				},
				{
					token: ["text", "punctuation"],
					regex: "($)|((?!\\.|#|=|-))",
					next: "start"
				}
			],
			"tag_attributes": [
				{
					token: "string",
					regex: "'(?=.)",
					next: "qstring"
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "qqstring"
				},
				{
					token: ["entity.other.attribute-name.jade", "punctuation"],
					regex: "([a-zA-Z:\\.-]+)(=)?",
					next: "attribute_strings"
				},
				{
					token: "punctuation",
					regex: "\\)",
					next: "start"
				}
			],
			"attribute_strings": [
				{
					token: "string",
					regex: "'(?=.)",
					next: "qstring"
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "(?=\\S)",
					next: "tag_attributes"
				}
			],
			"qqstring": [
				{
					token: "constant.language.escape",
					regex: escapedRe
				},
				{
					token: "string",
					regex: "[^\"\\\\]+"
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "\"|$",
					next: "tag_attributes"
				}
			],
			"qstring": [
				{
					token: "constant.language.escape",
					regex: escapedRe
				},
				{
					token: "string",
					regex: "[^'\\\\]+"
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qstring"
				},
				{
					token: "string",
					regex: "'|$",
					next: "tag_attributes"
				}
			]
		};
		this.embedRules(JavaScriptHighlightRules, "js-", [{
			token: "text",
			regex: ".$",
			next: "start"
		}]);
	};
	oop.inherits(JadeHighlightRules, TextHighlightRules);
	exports.JadeHighlightRules = JadeHighlightRules;
}));
export { require_jade_highlight_rules as t };
