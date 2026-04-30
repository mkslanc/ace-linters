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
import "./cstyle-DxkoJQhq.js";
import "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import { t as require_javascript } from "./javascript-CtbB98r6.js";
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
