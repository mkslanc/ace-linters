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
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import { t as require_html } from "./html-DDElvV2C.js";
//#region node_modules/ace-code/src/mode/django.js
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
//#endregion
export default require_django();
