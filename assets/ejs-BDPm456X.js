import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DbXny5W0.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-KfNyKui_.js";
import { t as require_html } from "./html-BxtkmDuE.js";
import { t as require_javascript } from "./javascript-wJ-ElQIV.js";
import { t as require_css } from "./css-Dr_4Vo6o.js";
import { t as require_ruby } from "./ruby-aDMfYyrj.js";
// node_modules/ace-code/src/mode/ejs.js
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
export default require_ejs();
