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
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import { t as require_xml } from "./xml-MVkSt0S-.js";
import { t as require_javascript } from "./javascript-CtbB98r6.js";
import { t as require_xml_highlight_rules } from "./xml_highlight_rules-DkcOGcVi.js";
import { t as require_mixed } from "./mixed-CB1dzpdX.js";
import { t as require_xml$1 } from "./xml-B7YH8_Al.js";
//#region node_modules/ace-code/src/mode/svg_highlight_rules.js
var require_svg_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var XmlHighlightRules = require_xml_highlight_rules().XmlHighlightRules;
	var SvgHighlightRules = function() {
		XmlHighlightRules.call(this);
		this.embedTagRules(JavaScriptHighlightRules, "js-", "script");
		this.normalizeRules();
	};
	oop.inherits(SvgHighlightRules, XmlHighlightRules);
	exports.SvgHighlightRules = SvgHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/svg.js
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
//#endregion
export default require_svg();
