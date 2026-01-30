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
import { t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_coffee } from "./coffee-DtCgMn7G.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-Qe-ihOA3.js";
var require_haml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var RubyExports = require_ruby_highlight_rules();
	var RubyHighlightRules = RubyExports.RubyHighlightRules;
	var HamlHighlightRules$1 = function() {
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
	oop$1.inherits(HamlHighlightRules$1, HtmlHighlightRules);
	exports.HamlHighlightRules = HamlHighlightRules$1;
}));
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
export default require_haml();
