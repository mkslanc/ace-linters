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
//#region node_modules/ace-code/src/mode/eiffel_highlight_rules.js
var require_eiffel_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var EiffelHighlightRules = function() {
		var keywords = "across|agent|alias|all|attached|as|assign|attribute|check|class|convert|create|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|Precursor|redefine|rename|require|rescue|retry|select|separate|some|then|undefine|until|variant|when";
		var operatorKeywords = "and|implies|or|xor";
		var languageConstants = "Void";
		var booleanConstants = "True|False";
		var languageVariables = "Current|Result";
		var keywordMapper = this.createKeywordMapper({
			"constant.language": languageConstants,
			"constant.language.boolean": booleanConstants,
			"variable.language": languageVariables,
			"keyword.operator": operatorKeywords,
			"keyword": keywords
		}, "identifier", true);
		var simpleString = /(?:[^"%\b\f\v]|%[A-DFHLNQR-V%'"()<>]|%\/(?:0[xX][\da-fA-F](?:_*[\da-fA-F])*|0[cC][0-7](?:_*[0-7])*|0[bB][01](?:_*[01])*|\d(?:_*\d)*)\/)+?/;
		this.$rules = {
			"start": [
				{
					token: "string.quoted.other",
					regex: /"\[/,
					next: "aligned_verbatim_string"
				},
				{
					token: "string.quoted.other",
					regex: /"\{/,
					next: "non-aligned_verbatim_string"
				},
				{
					token: "string.quoted.double",
					regex: /"(?:[^%\b\f\n\r\v]|%[A-DFHLNQR-V%'"()<>]|%\/(?:0[xX][\da-fA-F](?:_*[\da-fA-F])*|0[cC][0-7](?:_*[0-7])*|0[bB][01](?:_*[01])*|\d(?:_*\d)*)\/)*?"/
				},
				{
					token: "comment.line.double-dash",
					regex: /--.*/
				},
				{
					token: "constant.character",
					regex: /'(?:[^%\b\f\n\r\t\v]|%[A-DFHLNQR-V%'"()<>]|%\/(?:0[xX][\da-fA-F](?:_*[\da-fA-F])*|0[cC][0-7](?:_*[0-7])*|0[bB][01](?:_*[01])*|\d(?:_*\d)*)\/)'/
				},
				{
					token: "constant.numeric",
					regex: /\b0(?:[xX][\da-fA-F](?:_*[\da-fA-F])*|[cC][0-7](?:_*[0-7])*|[bB][01](?:_*[01])*)\b/
				},
				{
					token: "constant.numeric",
					regex: /(?:\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?[eE][+-]?)?\d(?:_*\d)*|\d(?:_*\d)*\.?/
				},
				{
					token: "paren.lparen",
					regex: /[\[({]|<<|\|\(/
				},
				{
					token: "paren.rparen",
					regex: /[\])}]|>>|\|\)/
				},
				{
					token: "keyword.operator",
					regex: /:=|->|\.(?=\w)|[;,:?]/
				},
				{
					token: "keyword.operator",
					regex: /\\\\|\|\.\.\||\.\.|\/[~\/]?|[><\/]=?|[-+*^=~]/
				},
				{
					token: function(v) {
						var result = keywordMapper(v);
						if (result === "identifier" && v === v.toUpperCase()) result = "entity.name.type";
						return result;
					},
					regex: /[a-zA-Z][a-zA-Z\d_]*\b/
				},
				{
					token: "text",
					regex: /\s+/
				}
			],
			"aligned_verbatim_string": [{
				token: "string",
				regex: /]"/,
				next: "start"
			}, {
				token: "string",
				regex: simpleString
			}],
			"non-aligned_verbatim_string": [{
				token: "string.quoted.other",
				regex: /}"/,
				next: "start"
			}, {
				token: "string.quoted.other",
				regex: simpleString
			}]
		};
	};
	oop.inherits(EiffelHighlightRules, TextHighlightRules);
	exports.EiffelHighlightRules = EiffelHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/eiffel.js
var require_eiffel = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var EiffelHighlightRules = require_eiffel_highlight_rules().EiffelHighlightRules;
	var Mode = function() {
		this.HighlightRules = EiffelHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.$id = "ace/mode/eiffel";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_eiffel();
