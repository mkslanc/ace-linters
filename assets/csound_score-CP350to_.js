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
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import { t as require_csound_score_highlight_rules } from "./csound_score_highlight_rules-DboaYEqI.js";
//#region node_modules/ace-code/src/mode/csound_score.js
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
//#endregion
export default require_csound_score();
