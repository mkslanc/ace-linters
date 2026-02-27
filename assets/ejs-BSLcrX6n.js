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
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./cstyle-C6ktp4d4.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./css_completions-C1qupuMi.js";
import "./css-B6QOS37f.js";
import { t as require_css } from "./css-ds7EYb5W.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import "./mixed-Cyzulx9L.js";
import { t as require_html } from "./html-CZivRBj1.js";
import "./ruby_highlight_rules-Bo0T10Ak.js";
import { t as require_ruby } from "./ruby-xuUWj_Pz.js";
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
