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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_csv } from "./csv-PRY9Mgeh.js";
var require_tsv_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TsvHighlightRules$1 = function() {
		TextHighlightRules.call(this);
	};
	oop.inherits(TsvHighlightRules$1, TextHighlightRules);
	exports.TsvHighlightRules = TsvHighlightRules$1;
}));
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
