import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_coffee } from "./coffee-sZUKS119.js";
import { t as require_jade_highlight_rules } from "./jade_highlight_rules-DdwgkPNS.js";
//#region node_modules/ace-code/src/mode/jade.js
var require_jade = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var JadeHighlightRules = require_jade_highlight_rules().JadeHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = JadeHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/jade";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_jade();
