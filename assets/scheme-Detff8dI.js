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
import { t as require_matching_parens_outdent } from "./matching_parens_outdent-CFLr8-4w.js";
var require_scheme_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SchemeHighlightRules$1 = function() {
		var keywordControl = "case|do|let|loop|if|else|when";
		var keywordOperator = "eq?|eqv?|equal?|and|or|not|null?";
		var constantLanguage = "#t|#f";
		var supportFunctions = "cons|car|cdr|cond|lambda|lambda*|syntax-rules|format|set!|quote|eval|append|list|list?|member?|load";
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
					"token": [
						"storage.type.function-type.scheme",
						"text",
						"entity.name.function.scheme"
					],
					"regex": "(?:\\b(?:(define|define-syntax|define-macro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
				},
				{
					"token": "punctuation.definition.constant.character.scheme",
					"regex": "#:\\S+"
				},
				{
					"token": [
						"punctuation.definition.variable.scheme",
						"variable.other.global.scheme",
						"punctuation.definition.variable.scheme"
					],
					"regex": "(\\*)(\\S*)(\\*)"
				},
				{
					"token": "constant.numeric",
					"regex": "#[xXoObB][0-9a-fA-F]+"
				},
				{
					"token": "constant.numeric",
					"regex": "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?"
				},
				{
					"token": keywordMapper,
					"regex": "[a-zA-Z_#][a-zA-Z0-9_\\-\\?\\!\\*]*"
				},
				{
					"token": "string",
					"regex": "\"(?=.)",
					"next": "qqstring"
				}
			],
			"qqstring": [
				{
					"token": "constant.character.escape.scheme",
					"regex": "\\\\."
				},
				{
					"token": "string",
					"regex": "[^\"\\\\]+",
					"merge": true
				},
				{
					"token": "string",
					"regex": "\\\\$",
					"next": "qqstring",
					"merge": true
				},
				{
					"token": "string",
					"regex": "\"|$",
					"next": "start",
					"merge": true
				}
			]
		};
	};
	oop$1.inherits(SchemeHighlightRules$1, TextHighlightRules);
	exports.SchemeHighlightRules = SchemeHighlightRules$1;
}));
var require_scheme = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var SchemeHighlightRules = require_scheme_highlight_rules().SchemeHighlightRules;
	var MatchingParensOutdent = require_matching_parens_outdent().MatchingParensOutdent;
	var Mode = function() {
		this.HighlightRules = SchemeHighlightRules;
		this.$outdent = new MatchingParensOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ";";
		this.minorIndentFunctions = [
			"define",
			"lambda",
			"define-macro",
			"define-syntax",
			"syntax-rules",
			"define-record-type",
			"define-structure"
		];
		this.$toIndent = function(str) {
			return str.split("").map(function(ch) {
				if (/\s/.exec(ch)) return ch;
				else return " ";
			}).join("");
		};
		this.$calculateIndent = function(line, tab) {
			var baseIndent = this.$getIndent(line);
			var delta = 0;
			var isParen, ch;
			for (var i = line.length - 1; i >= 0; i--) {
				ch = line[i];
				if (ch === "(") {
					delta--;
					isParen = true;
				} else if (ch === "(" || ch === "[" || ch === "{") {
					delta--;
					isParen = false;
				} else if (ch === ")" || ch === "]" || ch === "}") delta++;
				if (delta < 0) break;
			}
			if (delta < 0 && isParen) {
				i += 1;
				var iBefore = i;
				var fn = "";
				while (true) {
					ch = line[i];
					if (ch === " " || ch === "	") if (this.minorIndentFunctions.indexOf(fn) !== -1) return this.$toIndent(line.substring(0, iBefore - 1) + tab);
					else return this.$toIndent(line.substring(0, i + 1));
					else if (ch === void 0) return this.$toIndent(line.substring(0, iBefore - 1) + tab);
					fn += line[i];
					i++;
				}
			} else if (delta < 0 && !isParen) return this.$toIndent(line.substring(0, i + 1));
			else if (delta > 0) {
				baseIndent = baseIndent.substring(0, baseIndent.length - tab.length);
				return baseIndent;
			} else return baseIndent;
		};
		this.getNextLineIndent = function(state, line, tab) {
			return this.$calculateIndent(line, tab);
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/scheme";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_scheme();
