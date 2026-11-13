import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_csound_orchestra_highlight_rules } from "./csound_orchestra_highlight_rules-BWjzamsg.js";
// node_modules/ace-code/src/mode/csound_orchestra.js
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
