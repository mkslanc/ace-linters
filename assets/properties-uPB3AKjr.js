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
var require_properties_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PropertiesHighlightRules$1 = function() {
		var escapeRe = /\\u[0-9a-fA-F]{4}|\\/;
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: /[!#].*$/
				},
				{
					token: "keyword",
					regex: /[=:]$/
				},
				{
					token: "keyword",
					regex: /[=:]/,
					next: "value"
				},
				{
					token: "constant.language.escape",
					regex: escapeRe
				},
				{ defaultToken: "variable" }
			],
			"value": [
				{
					regex: /\\$/,
					token: "string",
					next: "value"
				},
				{
					regex: /$/,
					token: "string",
					next: "start"
				},
				{
					token: "constant.language.escape",
					regex: escapeRe
				},
				{ defaultToken: "string" }
			]
		};
	};
	oop$1.inherits(PropertiesHighlightRules$1, TextHighlightRules);
	exports.PropertiesHighlightRules = PropertiesHighlightRules$1;
}));
var require_properties = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PropertiesHighlightRules = require_properties_highlight_rules().PropertiesHighlightRules;
	var Mode = function() {
		this.HighlightRules = PropertiesHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/properties";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_properties();
