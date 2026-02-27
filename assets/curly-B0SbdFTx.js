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
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
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
