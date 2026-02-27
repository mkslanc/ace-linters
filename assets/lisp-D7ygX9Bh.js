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
var require_lisp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LispHighlightRules$1 = function() {
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
	oop$1.inherits(LispHighlightRules$1, TextHighlightRules);
	exports.LispHighlightRules = LispHighlightRules$1;
}));
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
export default require_lisp();
