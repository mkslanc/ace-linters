import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_sass_highlight_rules } from "./sass_highlight_rules-_PnAciZj.js";
import { t as require_coffee } from "./coffee-DhR7ZFHU.js";
// node_modules/ace-code/src/mode/sass.js
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
export default require_sass();
export { require_sass as t };
