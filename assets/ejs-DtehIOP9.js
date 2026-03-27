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
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import { t as require_css } from "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
import "./ruby_highlight_rules-D1frpKFg.js";
import { t as require_ruby } from "./ruby-DJNrBrpS.js";
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
