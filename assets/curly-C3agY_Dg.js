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
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { r as require_html$1, t as require_html } from "./html-nEATR_ID.js";
var require_curly_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var CurlyHighlightRules$1 = function() {
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
	oop$1.inherits(CurlyHighlightRules$1, HtmlHighlightRules);
	exports.CurlyHighlightRules = CurlyHighlightRules$1;
}));
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
export default require_curly();
