import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_coffee } from "./coffee-sZUKS119.js";
import { t as require_sass_highlight_rules } from "./sass_highlight_rules-BRjn7vWq.js";
//#region node_modules/ace-code/src/mode/sass.js
var require_sass = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var SassHighlightRules = require_sass_highlight_rules().SassHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = SassHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/sass";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_sass();
export { require_sass as t };
