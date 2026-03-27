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
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
//#region node_modules/ace-code/src/mode/cuttlefish_highlight_rules.js
var require_cuttlefish_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CuttlefishHighlightRules = function() {
		this.$rules = { start: [
			{
				token: ["text", "comment"],
				regex: /^([ \t]*)(#.*)$/
			},
			{
				token: [
					"text",
					"keyword",
					"text",
					"string",
					"text",
					"comment"
				],
				regex: /^([ \t]*)(include)([ \t]*)([A-Za-z0-9-\_\.\*\/]+)([ \t]*)(#.*)?$/
			},
			{
				token: [
					"text",
					"keyword",
					"text",
					"operator",
					"text",
					"string",
					"text",
					"comment"
				],
				regex: /^([ \t]*)([A-Za-z0-9-_]+(?:\.[A-Za-z0-9-_]+)*)([ \t]*)(=)([ \t]*)([^ \t#][^#]*?)([ \t]*)(#.*)?$/
			},
			{ defaultToken: "invalid" }
		] };
		this.normalizeRules();
	};
	CuttlefishHighlightRules.metaData = {
		fileTypes: ["conf"],
		keyEquivalent: "^~C",
		name: "Cuttlefish",
		scopeName: "source.conf"
	};
	oop.inherits(CuttlefishHighlightRules, TextHighlightRules);
	exports.CuttlefishHighlightRules = CuttlefishHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/cuttlefish.js
var require_cuttlefish = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CuttlefishHighlightRules = require_cuttlefish_highlight_rules().CuttlefishHighlightRules;
	var Mode = function() {
		this.HighlightRules = CuttlefishHighlightRules;
		this.foldingRules = null;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.blockComment = null;
		this.$id = "ace/mode/cuttlefish";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_cuttlefish();
