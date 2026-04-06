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
