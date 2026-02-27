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
import "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import "./javascript-Bgq9ZLIq.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./css_completions-C1qupuMi.js";
import "./css-B6QOS37f.js";
import "./css-ds7EYb5W.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import "./mixed-Cyzulx9L.js";
import { r as require_html$1, t as require_html } from "./html-CZivRBj1.js";
import { t as require_html$2 } from "./html-CjV2CxGy.js";
var require_handlebars_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	function pop2(currentState, stack) {
		stack.splice(0, 3);
		return stack.shift() || "start";
	}
	var HandlebarsHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		var hbs = {
			regex: "(?={{)",
			push: "handlebars"
		};
		for (var key in this.$rules) this.$rules[key].unshift(hbs);
		this.$rules.handlebars = [
			{
				token: "comment.start",
				regex: "{{!--",
				push: [{
					token: "comment.end",
					regex: "--}}",
					next: pop2
				}, { defaultToken: "comment" }]
			},
			{
				token: "comment.start",
				regex: "{{!",
				push: [{
					token: "comment.end",
					regex: "}}",
					next: pop2
				}, { defaultToken: "comment" }]
			},
			{
				token: "support.function",
				regex: "{{{",
				push: [{
					token: "support.function",
					regex: "}}}",
					next: pop2
				}, {
					token: "variable.parameter",
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*"
				}]
			},
			{
				token: "storage.type.start",
				regex: "{{[#\\^/&]?",
				push: [{
					token: "storage.type.end",
					regex: "}}",
					next: pop2
				}, {
					token: "variable.parameter",
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*"
				}]
			}
		];
		this.normalizeRules();
	};
	oop$1.inherits(HandlebarsHighlightRules$1, HtmlHighlightRules);
	exports.HandlebarsHighlightRules = HandlebarsHighlightRules$1;
}));
var require_handlebars = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var HandlebarsHighlightRules = require_handlebars_highlight_rules().HandlebarsHighlightRules;
	var HtmlBehaviour = require_html$2().HtmlBehaviour;
	require_html$1().FoldMode;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = HandlebarsHighlightRules;
		this.$behaviour = new HtmlBehaviour();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.blockComment = {
			start: "{{!--",
			end: "--}}"
		};
		this.$id = "ace/mode/handlebars";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_handlebars();
