import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { n as require_javascript$1, r as require_javascript } from "./javascript-BoOSq_P_.js";
import { t as require_typescript } from "./typescript-DKd7bwVb.js";
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
