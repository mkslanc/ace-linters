import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
import "./tex_highlight_rules-vESq5CIl.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-DZMF0zA9.js";
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
