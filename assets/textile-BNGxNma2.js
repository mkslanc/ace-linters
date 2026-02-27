import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
var require_textile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TextileHighlightRules$1 = function() {
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
	oop$1.inherits(TextileHighlightRules$1, TextHighlightRules);
	exports.TextileHighlightRules = TextileHighlightRules$1;
}));
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
export default require_textile();
