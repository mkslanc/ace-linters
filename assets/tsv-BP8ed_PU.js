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
import { a as require_text_highlight_rules } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import { t as require_csv } from "./csv-B9enOfji.js";
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
