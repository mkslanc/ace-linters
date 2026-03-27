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
import { a as require_text_highlight_rules, i as require_behaviour, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
//#region node_modules/ace-code/src/mode/plain_text.js
var require_plain_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var Behaviour = require_behaviour().Behaviour;
	var Mode = function() {
		this.HighlightRules = TextHighlightRules;
		this.$behaviour = new Behaviour();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.type = "text";
		this.getNextLineIndent = function(state, line, tab) {
			return "";
		};
		this.$id = "ace/mode/plain_text";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_plain_text();
