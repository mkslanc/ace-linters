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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import "./javascript_highlight_rules-DP2X209F.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
import { t as require_typescript_highlight_rules } from "./typescript_highlight_rules-B15BrNWF.js";
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
export default require_typescript();
export { require_typescript as t };
