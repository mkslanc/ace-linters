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
var require_cirru_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CirruHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{
					token: "constant.numeric",
					regex: /[\d\.]+/
				},
				{
					token: "comment.line.double-dash",
					regex: /--/,
					next: "comment"
				},
				{
					token: "storage.modifier",
					regex: /\(/
				},
				{
					token: "storage.modifier",
					regex: /,/,
					next: "line"
				},
				{
					token: "support.function",
					regex: /[^\(\)"\s{}\[\]]+/,
					next: "line"
				},
				{
					token: "string.quoted.double",
					regex: /"/,
					next: "string"
				},
				{
					token: "storage.modifier",
					regex: /\)/
				}
			],
			comment: [{
				token: "comment.line.double-dash",
				regex: / +[^\n]+/,
				next: "start"
			}],
			string: [
				{
					token: "string.quoted.double",
					regex: /"/,
					next: "line"
				},
				{
					token: "constant.character.escape",
					regex: /\\/,
					next: "escape"
				},
				{
					token: "string.quoted.double",
					regex: /[^\\"]+/
				}
			],
			escape: [{
				token: "constant.character.escape",
				regex: /./,
				next: "string"
			}],
			line: [
				{
					token: "constant.numeric",
					regex: /[\d\.]+/
				},
				{
					token: "markup.raw",
					regex: /^\s*/,
					next: "start"
				},
				{
					token: "storage.modifier",
					regex: /\$/,
					next: "start"
				},
				{
					token: "variable.parameter",
					regex: /[^\(\)"\s{}\[\]]+/
				},
				{
					token: "storage.modifier",
					regex: /\(/,
					next: "start"
				},
				{
					token: "storage.modifier",
					regex: /\)/
				},
				{
					token: "markup.raw",
					regex: /^ */,
					next: "start"
				},
				{
					token: "string.quoted.double",
					regex: /"/,
					next: "string"
				}
			]
		};
	};
	oop$1.inherits(CirruHighlightRules$1, TextHighlightRules);
	exports.CirruHighlightRules = CirruHighlightRules$1;
}));
var require_cirru = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CirruHighlightRules = require_cirru_highlight_rules().CirruHighlightRules;
	var CoffeeFoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = CirruHighlightRules;
		this.foldingRules = new CoffeeFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.$id = "ace/mode/cirru";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_cirru();
