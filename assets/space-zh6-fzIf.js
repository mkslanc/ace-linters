import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_coffee } from "./coffee-sZUKS119.js";
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
