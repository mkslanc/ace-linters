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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import { t as require_xml } from "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
import { t as require_xml_highlight_rules } from "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_mixed } from "./mixed-Cyzulx9L.js";
import { t as require_xml$1 } from "./xml-BKWB4Xvu.js";
var require_svg_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var XmlHighlightRules = require_xml_highlight_rules().XmlHighlightRules;
	var SvgHighlightRules$1 = function() {
		XmlHighlightRules.call(this);
		this.embedTagRules(JavaScriptHighlightRules, "js-", "script");
		this.normalizeRules();
	};
	oop$1.inherits(SvgHighlightRules$1, XmlHighlightRules);
	exports.SvgHighlightRules = SvgHighlightRules$1;
}));
var require_svg = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var XmlMode = require_xml$1().Mode;
	var JavaScriptMode = require_javascript().Mode;
	var SvgHighlightRules = require_svg_highlight_rules().SvgHighlightRules;
	var MixedFoldMode = require_mixed().FoldMode;
	var XmlFoldMode = require_xml().FoldMode;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		XmlMode.call(this);
		this.HighlightRules = SvgHighlightRules;
		this.createModeDelegates({ "js-": JavaScriptMode });
		this.foldingRules = new MixedFoldMode(new XmlFoldMode(), { "js-": new CStyleFoldMode() });
	};
	oop.inherits(Mode, XmlMode);
	(function() {
		this.getNextLineIndent = function(state, line, tab) {
			return this.$getIndent(line);
		};
		this.$id = "ace/mode/svg";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_svg();
