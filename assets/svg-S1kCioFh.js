import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-BBrDICLL.js";
import { t as require_xml } from "./xml-D-DvYe9N.js";
import { t as require_javascript } from "./javascript-BoOSq_P_.js";
import { t as require_xml_highlight_rules } from "./xml_highlight_rules-CmmLZ3I5.js";
import { t as require_mixed } from "./mixed-BZcRyH47.js";
import { t as require_xml$1 } from "./xml-DPvmnmjs.js";
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
