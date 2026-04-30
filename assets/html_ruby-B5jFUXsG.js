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
import "./cstyle-DxkoJQhq.js";
import "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import { t as require_javascript } from "./javascript-CtbB98r6.js";
import "./css_highlight_rules-_E_vcaY_.js";
import "./css_completions-C2GxC1IS.js";
import "./css-BIWs6ZVC.js";
import { t as require_css } from "./css-C0jKnsYY.js";
import "./xml_highlight_rules-DkcOGcVi.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DFgdMIml.js";
import "./mixed-CB1dzpdX.js";
import { t as require_html } from "./html-DaEx_Icq.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-Bn9h6Xux.js";
import { t as require_ruby } from "./ruby-Cymn5Lyk.js";
//#region node_modules/ace-code/src/mode/html_ruby_highlight_rules.js
var require_html_ruby_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var RubyHighlightRules = require_ruby_highlight_rules().RubyHighlightRules;
	var HtmlRubyHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var startRules = [
			{
				regex: "<%%|%%>",
				token: "constant.language.escape"
			},
			{
				token: "comment.start.erb",
				regex: "<%#",
				push: [{
					token: "comment.end.erb",
					regex: "%>",
					next: "pop",
					defaultToken: "comment"
				}]
			},
			{
				token: "support.ruby_tag",
				regex: "<%+(?!>)[-=]?",
				push: "ruby-start"
			}
		];
		var endRules = [{
			token: "support.ruby_tag",
			regex: "%>",
			next: "pop"
		}, {
			token: "comment",
			regex: "#(?:[^%]|%[^>])*"
		}];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.embedRules(RubyHighlightRules, "ruby-", endRules, ["start"]);
		this.normalizeRules();
	};
	oop.inherits(HtmlRubyHighlightRules, HtmlHighlightRules);
	exports.HtmlRubyHighlightRules = HtmlRubyHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/html_ruby.js
var require_html_ruby = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlRubyHighlightRules = require_html_ruby_highlight_rules().HtmlRubyHighlightRules;
	var HtmlMode = require_html().Mode;
	var JavaScriptMode = require_javascript().Mode;
	var CssMode = require_css().Mode;
	var RubyMode = require_ruby().Mode;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = HtmlRubyHighlightRules;
		this.createModeDelegates({
			"js-": JavaScriptMode,
			"css-": CssMode,
			"ruby-": RubyMode
		});
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/html_ruby";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_html_ruby();
