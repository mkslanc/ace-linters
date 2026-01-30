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
import { t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./csound_score_highlight_rules-Df0fZNRe.js";
import "./lua_highlight_rules-DHDFL7Fu.js";
import "./python_highlight_rules-BC2vRb4t.js";
import { t as require_csound_orchestra_highlight_rules } from "./csound_orchestra_highlight_rules-CL3Zfehc.js";
var require_csound_orchestra = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CsoundOrchestraHighlightRules = require_csound_orchestra_highlight_rules().CsoundOrchestraHighlightRules;
	var Mode = function() {
		this.HighlightRules = CsoundOrchestraHighlightRules;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ";";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/csound_orchestra";
		this.snippetFileId = "ace/snippets/csound_orchestra";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_csound_orchestra();
