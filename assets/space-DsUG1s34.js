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
import "./fold_mode-D_StAfa6.js";
import { t as require_coffee } from "./coffee-BH30Aew3.js";
//#region node_modules/ace-code/src/mode/space_highlight_rules.js
var require_space_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SpaceHighlightRules = function() {
		this.$rules = {
			"start": [{
				token: "empty_line",
				regex: / */,
				next: "key"
			}, {
				token: "empty_line",
				regex: /$/,
				next: "key"
			}],
			"key": [
				{
					token: "variable",
					regex: /\S+/
				},
				{
					token: "empty_line",
					regex: /$/,
					next: "start"
				},
				{
					token: "keyword.operator",
					regex: / /,
					next: "value"
				}
			],
			"value": [{
				token: "keyword.operator",
				regex: /$/,
				next: "start"
			}, {
				token: "string",
				regex: /[^$]/
			}]
		};
	};
	oop.inherits(SpaceHighlightRules, TextHighlightRules);
	exports.SpaceHighlightRules = SpaceHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/space.js
var require_space = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var FoldMode = require_coffee().FoldMode;
	var SpaceHighlightRules = require_space_highlight_rules().SpaceHighlightRules;
	var Mode = function() {
		this.HighlightRules = SpaceHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/space";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_space();
