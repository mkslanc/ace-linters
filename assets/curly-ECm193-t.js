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
import "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import { r as require_html$1, t as require_html } from "./html-DDElvV2C.js";
//#region node_modules/ace-code/src/mode/curly_highlight_rules.js
var require_curly_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var CurlyHighlightRules = function() {
		HtmlHighlightRules.call(this);
		this.$rules["start"].unshift({
			token: "variable",
			regex: "{{",
			push: "curly-start"
		});
		this.$rules["curly-start"] = [{
			token: "variable",
			regex: "}}",
			next: "pop"
		}];
		this.normalizeRules();
	};
	oop.inherits(CurlyHighlightRules, HtmlHighlightRules);
	exports.CurlyHighlightRules = CurlyHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/curly.js
var require_curly = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var HtmlFoldMode = require_html$1().FoldMode;
	var CurlyHighlightRules = require_curly_highlight_rules().CurlyHighlightRules;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = CurlyHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new HtmlFoldMode();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/curly";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_curly();
