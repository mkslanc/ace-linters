import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./csound_score_highlight_rules-CfnljHgO.js";
import "./lua_highlight_rules-VYSrUGTK.js";
import "./python_highlight_rules-C3tTV4Ry.js";
import { t as require_csound_orchestra_highlight_rules } from "./csound_orchestra_highlight_rules-C8c_iixf.js";
//#region node_modules/ace-code/src/mode/csound_orchestra.js
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
//#endregion
export default require_csound_orchestra();
