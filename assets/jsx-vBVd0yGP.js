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
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
//#region node_modules/ace-code/src/mode/jsx.js
var require_jsx = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var jsMode = require_javascript().Mode;
	function Mode() {
		jsMode.call(this);
		this.$highlightRuleConfig = { jsx: true };
	}
	oop.inherits(Mode, jsMode);
	(function() {
		this.createWorker = function() {
			return null;
		};
		this.$id = "ace/mode/jsx";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_jsx();
