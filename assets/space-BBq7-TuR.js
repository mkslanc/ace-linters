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
import "./fold_mode-D1xG2KFM.js";
import { t as require_coffee } from "./coffee-DtCgMn7G.js";
var require_space_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SpaceHighlightRules$1 = function() {
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
	oop$1.inherits(SpaceHighlightRules$1, TextHighlightRules);
	exports.SpaceHighlightRules = SpaceHighlightRules$1;
}));
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
export default require_space();
