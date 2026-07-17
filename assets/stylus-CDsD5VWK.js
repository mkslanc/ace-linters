import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_coffee } from "./coffee-sZUKS119.js";
import { t as require_stylus_highlight_rules } from "./stylus_highlight_rules-BIjeac-B.js";
//#region node_modules/ace-code/src/mode/stylus.js
var require_stylus = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var StylusHighlightRules = require_stylus_highlight_rules().StylusHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = StylusHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/stylus";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_stylus();
