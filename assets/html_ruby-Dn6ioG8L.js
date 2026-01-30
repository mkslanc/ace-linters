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
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import { t as require_javascript } from "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import { t as require_css } from "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-Qe-ihOA3.js";
import { t as require_ruby } from "./ruby-Cny99MUE.js";
var require_html_ruby_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var RubyHighlightRules = require_ruby_highlight_rules().RubyHighlightRules;
	var HtmlRubyHighlightRules$1 = function() {
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
	oop$1.inherits(HtmlRubyHighlightRules$1, HtmlHighlightRules);
	exports.HtmlRubyHighlightRules = HtmlRubyHighlightRules$1;
}));
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
export default require_html_ruby();
