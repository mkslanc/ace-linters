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
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
var require_cuttlefish_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CuttlefishHighlightRules$1 = function() {
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
	CuttlefishHighlightRules$1.metaData = {
		fileTypes: ["conf"],
		keyEquivalent: "^~C",
		name: "Cuttlefish",
		scopeName: "source.conf"
	};
	oop$1.inherits(CuttlefishHighlightRules$1, TextHighlightRules);
	exports.CuttlefishHighlightRules = CuttlefishHighlightRules$1;
}));
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
export default require_cuttlefish();
