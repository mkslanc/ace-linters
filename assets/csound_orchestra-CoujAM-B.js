import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_csound_orchestra_highlight_rules } from "./csound_orchestra_highlight_rules-BLOgM4H1.js";
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
