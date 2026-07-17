import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
import { t as require_javascript } from "./javascript-BoOSq_P_.js";
import { t as require_typescript_highlight_rules } from "./typescript_highlight_rules-6FEUQMcR.js";
//#region node_modules/ace-code/src/mode/typescript.js
var require_typescript = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var jsMode = require_javascript().Mode;
	var TypeScriptHighlightRules = require_typescript_highlight_rules().TypeScriptHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		this.HighlightRules = TypeScriptHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, jsMode);
	(function() {
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/typescript";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_typescript();
export { require_typescript as t };
