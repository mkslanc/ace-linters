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
import "./fold_mode-DLWDk-fx.js";
import { t as require_coffee } from "./coffee-CKmePRUu.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./scss_highlight_rules-DqufTyGx.js";
import { t as require_sass_highlight_rules } from "./sass_highlight_rules-CHM7eNJL.js";
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
