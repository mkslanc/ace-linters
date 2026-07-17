import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_javascript } from "./javascript-BoOSq_P_.js";
import { t as require_css } from "./css-QL5fNZBW.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-BTglbrVB.js";
import { t as require_html } from "./html-NZG1gGtk.js";
import { n as require_elixir_highlight_rules, t as require_elixir } from "./elixir-BfbiFeFI.js";
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
