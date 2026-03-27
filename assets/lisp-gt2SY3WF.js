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
//#region node_modules/ace-code/src/mode/lisp_highlight_rules.js
var require_lisp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LispHighlightRules = function() {
		var keywordControl = "case|do|let|loop|if|else|when";
		var keywordOperator = "eq|neq|and|or";
		var constantLanguage = "null|nil";
		var supportFunctions = "cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn";
		var keywordMapper = this.createKeywordMapper({
			"keyword.control": keywordControl,
			"keyword.operator": keywordOperator,
			"constant.language": constantLanguage,
			"support.function": supportFunctions
		}, "identifier", true);
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: ";.*$"
				},
				{
					token: [
						"storage.type.function-type.lisp",
						"text",
						"entity.name.function.lisp"
					],
					regex: "(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
				},
				{
					token: ["punctuation.definition.constant.character.lisp", "constant.character.lisp"],
					regex: "(#)((?:\\w|[\\\\+-=<>'\"&#])+)"
				},
				{
					token: [
						"punctuation.definition.variable.lisp",
						"variable.other.global.lisp",
						"punctuation.definition.variable.lisp"
					],
					regex: "(\\*)(\\S*)(\\*)"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "qqstring"
				}
			],
			"qqstring": [
				{
					token: "constant.character.escape.lisp",
					regex: "\\\\."
				},
				{
					token: "string",
					regex: "[^\"\\\\]+"
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring"
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start"
				}
			]
		};
	};
	oop.inherits(LispHighlightRules, TextHighlightRules);
	exports.LispHighlightRules = LispHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/lisp.js
var require_lisp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var LispHighlightRules = require_lisp_highlight_rules().LispHighlightRules;
	var Mode = function() {
		this.HighlightRules = LispHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ";";
		this.$id = "ace/mode/lisp";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_lisp();
