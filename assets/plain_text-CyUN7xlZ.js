import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, i as require_behaviour, t as require_text } from "./text-SKNm_D_P.js";
// node_modules/ace-code/src/mode/plain_text.js
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
