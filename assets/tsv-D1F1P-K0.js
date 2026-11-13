import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_csv } from "./csv-D67m7fHB.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules } from "./text-SKNm_D_P.js";
// node_modules/ace-code/src/mode/tsv_highlight_rules.js
var require_tsv_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TsvHighlightRules = function() {
		TextHighlightRules.call(this);
	};
	oop.inherits(TsvHighlightRules, TextHighlightRules);
	exports.TsvHighlightRules = TsvHighlightRules;
}));
// node_modules/ace-code/src/mode/tsv.js
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
export default require_tsv();
