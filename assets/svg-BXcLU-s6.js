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
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import { t as require_xml } from "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import { t as require_xml_highlight_rules } from "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_mixed } from "./mixed-sNoniz_T.js";
import { t as require_xml$1 } from "./xml-yrgHcdIT.js";
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
