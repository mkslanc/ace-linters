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
import "./tex_highlight_rules-ByXFX-Ur.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-PZaWz5uu.js";
//#region node_modules/ace-code/src/mode/rhtml_highlight_rules.js
var require_rhtml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var RHighlightRules = require_r_highlight_rules().RHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var RHtmlHighlightRules = function() {
		HtmlHighlightRules.call(this);
		this.$rules["start"].unshift({
			token: "support.function.codebegin",
			regex: "^<!--\\s*begin.rcode\\s*(?:.*)",
			next: "r-start"
		});
		this.embedRules(RHighlightRules, "r-", [{
			token: "support.function.codeend",
			regex: "^\\s*end.rcode\\s*-->",
			next: "start"
		}], ["start"]);
		this.normalizeRules();
	};
	oop.inherits(RHtmlHighlightRules, TextHighlightRules);
	exports.RHtmlHighlightRules = RHtmlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/rhtml.js
var require_rhtml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var RHtmlHighlightRules = require_rhtml_highlight_rules().RHtmlHighlightRules;
	var Mode = function(doc, session) {
		HtmlMode.call(this);
		this.$session = session;
		this.HighlightRules = RHtmlHighlightRules;
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.insertChunkInfo = {
			value: "<!--begin.rcode\n\nend.rcode-->\n",
			position: {
				row: 0,
				column: 15
			}
		};
		this.getLanguageMode = function(position) {
			return this.$session.getState(position.row).match(/^r-/) ? "R" : "HTML";
		};
		this.$id = "ace/mode/rhtml";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_rhtml();
