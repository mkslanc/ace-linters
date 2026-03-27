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
import "./fold_mode-DLWDk-fx.js";
import { t as require_coffee } from "./coffee-CKmePRUu.js";
//#region node_modules/ace-code/src/mode/cirru_highlight_rules.js
var require_cirru_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CirruHighlightRules = function() {
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
	oop.inherits(CirruHighlightRules, TextHighlightRules);
	exports.CirruHighlightRules = CirruHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/cirru.js
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
//#endregion
export default require_cirru();
