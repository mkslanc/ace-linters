import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_csound_score_highlight_rules } from "./csound_score_highlight_rules-DM2FCUNw.js";
// node_modules/ace-code/src/mode/csound_score.js
var require_csound_score = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CsoundScoreHighlightRules = require_csound_score_highlight_rules().CsoundScoreHighlightRules;
	var Mode = function() {
		this.HighlightRules = CsoundScoreHighlightRules;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ";";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/csound_score";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_csound_score();
