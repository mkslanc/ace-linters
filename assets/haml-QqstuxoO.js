import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_coffee } from "./coffee-CKmePRUu.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-D1frpKFg.js";
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
