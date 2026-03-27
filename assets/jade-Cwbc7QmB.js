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
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import "./html_highlight_rules-C5s9oMLE.js";
import "./coffee_highlight_rules-D8KEDJjA.js";
import "./markdown_highlight_rules-_xQ3EKon.js";
import "./scss_highlight_rules-DqufTyGx.js";
import "./less_highlight_rules-w8Nad9q_.js";
import { t as require_jade_highlight_rules } from "./jade_highlight_rules-CFP-vNTu.js";
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
