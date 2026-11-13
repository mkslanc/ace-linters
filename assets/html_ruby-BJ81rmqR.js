import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DbXny5W0.js";
import { t as require_ruby_highlight_rules } from "./ruby_highlight_rules-CuauTYdm.js";
import { t as require_html } from "./html-BxtkmDuE.js";
import { t as require_javascript } from "./javascript-wJ-ElQIV.js";
import { t as require_css } from "./css-Dr_4Vo6o.js";
import { t as require_ruby } from "./ruby-aDMfYyrj.js";
// node_modules/ace-code/src/mode/html_ruby_highlight_rules.js
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
// node_modules/ace-code/src/mode/html_ruby.js
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
