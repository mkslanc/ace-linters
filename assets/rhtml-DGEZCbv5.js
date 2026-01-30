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
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
import "./tex_highlight_rules-CVLZ_rhl.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-CLRbuQ5A.js";
var require_rhtml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var RHighlightRules = require_r_highlight_rules().RHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var RHtmlHighlightRules$1 = function() {
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
	oop$1.inherits(RHtmlHighlightRules$1, TextHighlightRules);
	exports.RHtmlHighlightRules = RHtmlHighlightRules$1;
}));
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
export default require_rhtml();
