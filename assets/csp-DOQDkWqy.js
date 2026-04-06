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
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
//#region node_modules/ace-code/src/mode/csp_highlight_rules.js
var require_csp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CspHighlightRules = function() {
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
	oop.inherits(CspHighlightRules, TextHighlightRules);
	exports.CspHighlightRules = CspHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/csp.js
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
//#endregion
export default require_csp();
