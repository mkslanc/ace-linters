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
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import { n as require_javascript$1, r as require_javascript } from "./javascript-CNVEwPsW.js";
import "./typescript_highlight_rules-BQicJo4u.js";
import { t as require_typescript } from "./typescript-DOPpxO1K.js";
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
