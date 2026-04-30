import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, i as require_behaviour, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
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
