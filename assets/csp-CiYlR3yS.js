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
var require_csp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CspHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				token: "string.link",
				regex: /https?:[^;\s]*/
			},
			{
				token: "operator.punctuation",
				regex: /;/
			},
			{
				token: this.createKeywordMapper({
					"constant.language": "child-src|connect-src|default-src|font-src|frame-src|img-src|manifest-src|media-src|object-src|script-src|style-src|worker-src|base-uri|plugin-types|sandbox|disown-opener|form-action|frame-ancestors|report-uri|report-to|upgrade-insecure-requests|block-all-mixed-content|require-sri-for|reflected-xss|referrer|policy-uri",
					"variable": "'none'|'self'|'unsafe-inline'|'unsafe-eval'|'strict-dynamic'|'unsafe-hashed-attributes'"
				}, "identifier", true),
				regex: /[^\s;]+/
			}
		] };
	};
	oop$1.inherits(CspHighlightRules$1, TextHighlightRules);
	exports.CspHighlightRules = CspHighlightRules$1;
}));
var require_csp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var TextMode = require_text().Mode;
	var CspHighlightRules = require_csp_highlight_rules().CspHighlightRules;
	var oop = require_oop();
	var Mode = function() {
		this.HighlightRules = CspHighlightRules;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/csp";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_csp();
