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
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import { n as require_javascript$1, r as require_javascript } from "./javascript-loi8Unzt.js";
import "./typescript_highlight_rules-jHOKE87X.js";
import { t as require_typescript } from "./typescript-DFQPlqNE.js";
//#region node_modules/ace-code/src/mode/tsx.js
var require_tsx = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptBehaviour = require_javascript().JavaScriptBehaviour;
	var JavaScriptFoldMode = require_javascript$1().FoldMode;
	var tsMode = require_typescript().Mode;
	var Mode = function() {
		tsMode.call(this);
		this.$highlightRuleConfig = { jsx: true };
		this.foldingRules = new JavaScriptFoldMode();
		this.$behaviour = new JavaScriptBehaviour();
	};
	oop.inherits(Mode, tsMode);
	(function() {
		this.$id = "ace/mode/tsx";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_tsx();
