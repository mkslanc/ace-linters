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
//#region node_modules/ace-code/src/mode/properties_highlight_rules.js
var require_properties_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PropertiesHighlightRules = function() {
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
	oop.inherits(PropertiesHighlightRules, TextHighlightRules);
	exports.PropertiesHighlightRules = PropertiesHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/properties.js
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
//#endregion
export default require_properties();
