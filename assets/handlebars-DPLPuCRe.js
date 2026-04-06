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
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import { r as require_html$1, t as require_html } from "./html-DDElvV2C.js";
import { t as require_html$2 } from "./html-Cji_fKSF.js";
//#region node_modules/ace-code/src/mode/handlebars_highlight_rules.js
var require_handlebars_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	function pop2(currentState, stack) {
		stack.splice(0, 3);
		return stack.shift() || "start";
	}
	var HandlebarsHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var hbs = {
			regex: "(?={{)",
			push: "handlebars"
		};
		for (var key in this.$rules) this.$rules[key].unshift(hbs);
		this.$rules.handlebars = [
			{
				token: "comment.start",
				regex: "{{!--",
				push: [{
					token: "comment.end",
					regex: "--}}",
					next: pop2
				}, { defaultToken: "comment" }]
			},
			{
				token: "comment.start",
				regex: "{{!",
				push: [{
					token: "comment.end",
					regex: "}}",
					next: pop2
				}, { defaultToken: "comment" }]
			},
			{
				token: "support.function",
				regex: "{{{",
				push: [{
					token: "support.function",
					regex: "}}}",
					next: pop2
				}, {
					token: "variable.parameter",
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*"
				}]
			},
			{
				token: "storage.type.start",
				regex: "{{[#\\^/&]?",
				push: [{
					token: "storage.type.end",
					regex: "}}",
					next: pop2
				}, {
					token: "variable.parameter",
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*"
				}]
			}
		];
		this.normalizeRules();
	};
	oop.inherits(HandlebarsHighlightRules, HtmlHighlightRules);
	exports.HandlebarsHighlightRules = HandlebarsHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/handlebars.js
var require_handlebars = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var HandlebarsHighlightRules = require_handlebars_highlight_rules().HandlebarsHighlightRules;
	var HtmlBehaviour = require_html$2().HtmlBehaviour;
	require_html$1().FoldMode;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = HandlebarsHighlightRules;
		this.$behaviour = new HtmlBehaviour();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.blockComment = {
			start: "{{!--",
			end: "--}}"
		};
		this.$id = "ace/mode/handlebars";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_handlebars();
