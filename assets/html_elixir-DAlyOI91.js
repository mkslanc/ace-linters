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
import "./coffee-BH30Aew3.js";
import "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import { t as require_javascript } from "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import { t as require_css } from "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import { t as require_html } from "./html-DDElvV2C.js";
import { n as require_elixir_highlight_rules, t as require_elixir } from "./elixir-D_aZ-rXy.js";
//#region node_modules/ace-code/src/mode/html_elixir_highlight_rules.js
var require_html_elixir_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var ElixirHighlightRules = require_elixir_highlight_rules().ElixirHighlightRules;
	var HtmlElixirHighlightRules = function() {
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
	oop.inherits(HtmlElixirHighlightRules, HtmlHighlightRules);
	exports.HtmlElixirHighlightRules = HtmlElixirHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/html_elixir.js
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
//#endregion
export default require_html_elixir();
