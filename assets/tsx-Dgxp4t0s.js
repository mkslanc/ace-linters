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
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { n as require_javascript$1, r as require_javascript } from "./javascript-Bgq9ZLIq.js";
import "./typescript_highlight_rules-B15BrNWF.js";
import { t as require_typescript } from "./typescript-B1zWujbG.js";
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
export default require_tsx();
