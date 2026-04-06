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
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import { t as require_javascript } from "./javascript-loi8Unzt.js";
import { t as require_typescript_highlight_rules } from "./typescript_highlight_rules-jHOKE87X.js";
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
