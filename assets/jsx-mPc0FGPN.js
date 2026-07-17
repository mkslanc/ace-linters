import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_javascript } from "./javascript-BoOSq_P_.js";
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
