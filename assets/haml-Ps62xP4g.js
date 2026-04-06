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
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_coffee } from "./coffee-BH30Aew3.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DnZSqR6j.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-DIa6HJxn.js";
//#region node_modules/ace-code/src/mode/haml_highlight_rules.js
var require_haml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var RubyExports = require_ruby_highlight_rules();
	var RubyHighlightRules = RubyExports.RubyHighlightRules;
	var HamlHighlightRules = function() {
		HtmlHighlightRules.call(this);
		this.$rules = {
			"start": [
				{
					token: "comment.block",
					regex: /^\/$/,
					next: "comment"
				},
				{
					token: "comment.block",
					regex: /^\-#$/,
					next: "comment"
				},
				{
					token: "comment.line",
					regex: /\/\s*.*/
				},
				{
					token: "comment.line",
					regex: /-#\s*.*/
				},
				{
					token: "keyword.other.doctype",
					regex: "^!!!\\s*(?:[a-zA-Z0-9-_]+)?"
				},
				RubyExports.qString,
				RubyExports.qqString,
				RubyExports.tString,
				{
					token: "meta.tag.haml",
					regex: /(%[\w:\-]+)/
				},
				{
					token: "keyword.attribute-name.class.haml",
					regex: /\.[\w-]+/
				},
				{
					token: "keyword.attribute-name.id.haml",
					regex: /#[\w-]+/,
					next: "element_class"
				},
				RubyExports.constantNumericHex,
				RubyExports.constantNumericFloat,
				RubyExports.constantOtherSymbol,
				{
					token: "text",
					regex: /=|-|~/,
					next: "embedded_ruby"
				}
			],
			"element_class": [
				{
					token: "keyword.attribute-name.class.haml",
					regex: /\.[\w-]+/
				},
				{
					token: "punctuation.section",
					regex: /\{/,
					next: "element_attributes"
				},
				RubyExports.constantOtherSymbol,
				{
					token: "empty",
					regex: "$|(?!\\.|#|\\{|\\[|=|-|~|\\/])",
					next: "start"
				}
			],
			"element_attributes": [
				RubyExports.constantOtherSymbol,
				RubyExports.qString,
				RubyExports.qqString,
				RubyExports.tString,
				RubyExports.constantNumericHex,
				RubyExports.constantNumericFloat,
				{
					token: "punctuation.section",
					regex: /$|\}/,
					next: "start"
				}
			],
			"embedded_ruby": [
				RubyExports.constantNumericHex,
				RubyExports.constantNumericFloat,
				RubyExports.instanceVariable,
				RubyExports.qString,
				RubyExports.qqString,
				RubyExports.tString,
				{
					token: "support.class",
					regex: "[A-Z][a-zA-Z_\\d]+"
				},
				{
					token: new RubyHighlightRules().getKeywords(),
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: [
						"keyword",
						"text",
						"text"
					],
					regex: "(?:do|\\{)(?: \\|[^|]+\\|)?$",
					next: "start"
				},
				{
					token: ["text"],
					regex: "^$",
					next: "start"
				},
				{
					token: ["text"],
					regex: "^(?!.*\\|\\s*$)",
					next: "start"
				}
			],
			"comment": [{
				token: "comment.block",
				regex: /^$/,
				next: "start"
			}, {
				token: "comment.block",
				regex: /\s+.*/
			}]
		};
		this.normalizeRules();
	};
	oop.inherits(HamlHighlightRules, HtmlHighlightRules);
	exports.HamlHighlightRules = HamlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/haml.js
var require_haml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HamlHighlightRules = require_haml_highlight_rules().HamlHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = HamlHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/haml";
		this.snippetFileId = "ace/snippets/haml";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_haml();
