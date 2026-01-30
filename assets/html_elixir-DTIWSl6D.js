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
import "./coffee-DtCgMn7G.js";
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
import { n as require_elixir_highlight_rules, t as require_elixir } from "./elixir-DVH9L3d7.js";
var require_html_elixir_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var ElixirHighlightRules = require_elixir_highlight_rules().ElixirHighlightRules;
	var HtmlElixirHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		var startRules = [
			{
				regex: "<%%|%%>",
				token: "constant.language.escape"
			},
			{
				token: "comment.start.eex",
				regex: "<%#",
				push: [{
					token: "comment.end.eex",
					regex: "%>",
					next: "pop",
					defaultToken: "comment"
				}]
			},
			{
				token: "support.elixir_tag",
				regex: "<%+(?!>)[-=]?",
				push: "elixir-start"
			}
		];
		var endRules = [{
			token: "support.elixir_tag",
			regex: "%>",
			next: "pop"
		}, {
			token: "comment",
			regex: "#(?:[^%]|%[^>])*"
		}];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.embedRules(ElixirHighlightRules, "elixir-", endRules, ["start"]);
		this.normalizeRules();
	};
	oop$1.inherits(HtmlElixirHighlightRules$1, HtmlHighlightRules);
	exports.HtmlElixirHighlightRules = HtmlElixirHighlightRules$1;
}));
var require_html_elixir = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlElixirHighlightRules = require_html_elixir_highlight_rules().HtmlElixirHighlightRules;
	var HtmlMode = require_html().Mode;
	var JavaScriptMode = require_javascript().Mode;
	var CssMode = require_css().Mode;
	var ElixirMode = require_elixir().Mode;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = HtmlElixirHighlightRules;
		this.createModeDelegates({
			"js-": JavaScriptMode,
			"css-": CssMode,
			"elixir-": ElixirMode
		});
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/html_elixir";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_html_elixir();
