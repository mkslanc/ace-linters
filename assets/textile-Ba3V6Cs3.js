import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
//#region node_modules/ace-code/src/mode/textile_highlight_rules.js
var require_textile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TextileHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: function(value) {
						if (value.charAt(0) == "h") return "markup.heading." + value.charAt(1);
						else return "markup.heading";
					},
					regex: "h1|h2|h3|h4|h5|h6|bq|p|bc|pre",
					next: "blocktag"
				},
				{
					token: "keyword",
					regex: "[\\*]+|[#]+"
				},
				{
					token: "text",
					regex: ".+"
				}
			],
			"blocktag": [{
				token: "keyword",
				regex: "\\. ",
				next: "start"
			}, {
				token: "keyword",
				regex: "\\(",
				next: "blocktagproperties"
			}],
			"blocktagproperties": [
				{
					token: "keyword",
					regex: "\\)",
					next: "blocktag"
				},
				{
					token: "string",
					regex: "[a-zA-Z0-9\\-_]+"
				},
				{
					token: "keyword",
					regex: "#"
				}
			]
		};
	};
	oop.inherits(TextileHighlightRules, TextHighlightRules);
	exports.TextileHighlightRules = TextileHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/textile.js
var require_textile = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TextileHighlightRules = require_textile_highlight_rules().TextileHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		this.HighlightRules = TextileHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.type = "text";
		this.getNextLineIndent = function(state, line, tab) {
			if (state == "intag") return tab;
			return "";
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/textile";
		this.snippetFileId = "ace/snippets/textile";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_textile();
