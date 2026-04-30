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
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DZzo6_DD.js";
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
import "./ruby_highlight_rules-Bn9h6Xux.js";
import { t as require_ruby } from "./ruby-Cymn5Lyk.js";
//#region node_modules/ace-code/src/mode/ejs.js
var require_ejs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var EjsHighlightRules = function(start, end) {
		HtmlHighlightRules.call(this);
		if (!start) start = "(?:<%|<\\?|{{)";
		if (!end) end = "(?:%>|\\?>|}})";
		for (var i in this.$rules) this.$rules[i].unshift({
			token: "markup.list.meta.tag",
			regex: start + "(?![>}])[-=]?",
			push: "ejs-start"
		});
		this.embedRules(new JavaScriptHighlightRules({ jsx: false }).getRules(), "ejs-", [{
			token: "markup.list.meta.tag",
			regex: "-?" + end,
			next: "pop"
		}, {
			token: "comment",
			regex: "//.*?" + end,
			next: "pop"
		}]);
		this.normalizeRules();
	};
	oop.inherits(EjsHighlightRules, HtmlHighlightRules);
	exports.EjsHighlightRules = EjsHighlightRules;
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var JavaScriptMode = require_javascript().Mode;
	var CssMode = require_css().Mode;
	require_ruby().Mode;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = EjsHighlightRules;
		this.createModeDelegates({
			"js-": JavaScriptMode,
			"css-": CssMode,
			"ejs-": JavaScriptMode
		});
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/ejs";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_ejs();
