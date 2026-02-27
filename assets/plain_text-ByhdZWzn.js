import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, i as require_behaviour, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
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
export default require_plain_text();
