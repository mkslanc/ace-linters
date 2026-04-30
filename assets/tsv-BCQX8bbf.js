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
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import { t as require_csv } from "./csv-Cs8ZLvsU.js";
//#region node_modules/ace-code/src/mode/tsv_highlight_rules.js
var require_tsv_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TsvHighlightRules = function() {
		TextHighlightRules.call(this);
	};
	oop.inherits(TsvHighlightRules, TextHighlightRules);
	exports.TsvHighlightRules = TsvHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/tsv.js
var require_tsv = /* @__PURE__ */ __commonJSMin(((exports) => {
	var CSVMode = require_csv().Mode;
	var TsvHighlightRules = require_tsv_highlight_rules().TsvHighlightRules;
	var Mode = function(options) {
		var mode = new CSVMode({
			splitter: "	",
			quote: "\""
		});
		mode.HighlightRules = TsvHighlightRules;
		mode.$id = "ace/mode/tsv";
		return mode;
	};
	exports.Mode = Mode;
}));
//#endregion
export default require_tsv();
