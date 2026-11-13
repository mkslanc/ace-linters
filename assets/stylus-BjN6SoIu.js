import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_stylus_highlight_rules } from "./stylus_highlight_rules-Ly1vyyRJ.js";
import { t as require_coffee } from "./coffee-DhR7ZFHU.js";
// node_modules/ace-code/src/mode/stylus.js
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
export default require_stylus();
