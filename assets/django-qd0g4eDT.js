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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
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
import { t as require_html } from "./html-CZivRBj1.js";
var require_django = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DjangoHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "string",
					regex: "\".*?\""
				},
				{
					token: "string",
					regex: "'.*?'"
				},
				{
					token: "constant",
					regex: "[0-9]+"
				},
				{
					token: "variable",
					regex: "[-_a-zA-Z0-9:]+"
				}
			],
			"tag": [{
				token: "entity.name.function",
				regex: "[a-zA-Z][_a-zA-Z0-9]*",
				next: "start"
			}]
		};
	};
	oop.inherits(DjangoHighlightRules, TextHighlightRules);
	var DjangoHtmlHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var startRules = [
			{
				token: "comment.line",
				regex: "\\{#.*?#\\}"
			},
			{
				token: "comment.block",
				regex: "\\{\\%\\s*comment\\s*\\%\\}",
				push: [{
					token: "comment.block",
					regex: "\\{\\%\\s*endcomment\\s*\\%\\}",
					next: "pop"
				}, { defaultToken: "comment.block" }]
			},
			{
				token: "constant.language",
				regex: "\\{\\{",
				push: "django-start"
			},
			{
				token: "constant.language",
				regex: "\\{\\%",
				push: "django-tag"
			}
		];
		var endRules = [{
			token: "constant.language",
			regex: "\\%\\}",
			next: "pop"
		}, {
			token: "constant.language",
			regex: "\\}\\}",
			next: "pop"
		}];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.embedRules(DjangoHighlightRules, "django-", endRules, ["start"]);
		this.normalizeRules();
	};
	oop.inherits(DjangoHtmlHighlightRules, HtmlHighlightRules);
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = DjangoHtmlHighlightRules;
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/django";
		this.snippetFileId = "ace/snippets/django";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_django();
