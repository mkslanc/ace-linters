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
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_coffee } from "./coffee-BH30Aew3.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import "./html_highlight_rules-DnZSqR6j.js";
import "./coffee_highlight_rules-DuSbsLj-.js";
import "./markdown_highlight_rules-D5Pze0S2.js";
import "./scss_highlight_rules-C9Mtc7NS.js";
import "./less_highlight_rules-BP6cyH91.js";
import { t as require_jade_highlight_rules } from "./jade_highlight_rules-C85JQs8t.js";
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
