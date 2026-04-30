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
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DZzo6_DD.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import { t as require_javascript } from "./javascript-CtbB98r6.js";
//#region node_modules/ace-code/src/mode/sjs_highlight_rules.js
var require_sjs_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SJSHighlightRules = function() {
		var parent = new JavaScriptHighlightRules({ noES6: true });
		var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
		var contextAware = function(f) {
			f.isContextAware = true;
			return f;
		};
		var ctxBegin = function(opts) {
			return {
				token: opts.token,
				regex: opts.regex,
				next: contextAware(function(currentState, stack) {
					if (stack.length === 0) stack.unshift(currentState);
					stack.unshift(opts.next);
					return opts.next;
				})
			};
		};
		var ctxEnd = function(opts) {
			return {
				token: opts.token,
				regex: opts.regex,
				next: contextAware(function(currentState, stack) {
					stack.shift();
					return stack[0] || "start";
				})
			};
		};
		this.$rules = parent.$rules;
		this.$rules.no_regex = [
			{
				token: "keyword",
				regex: "(waitfor|or|and|collapse|spawn|retract)\\b"
			},
			{
				token: "keyword.operator",
				regex: "(->|=>|\\.\\.)"
			},
			{
				token: "variable.language",
				regex: "(hold|default)\\b"
			},
			ctxBegin({
				token: "string",
				regex: "`",
				next: "bstring"
			}),
			ctxBegin({
				token: "string",
				regex: "\"",
				next: "qqstring"
			}),
			ctxBegin({
				token: "string",
				regex: "\"",
				next: "qqstring"
			}),
			{
				token: [
					"paren.lparen",
					"text",
					"paren.rparen"
				],
				regex: "(\\{)(\\s*)(\\|)",
				next: "block_arguments"
			}
		].concat(this.$rules.no_regex);
		this.$rules.block_arguments = [{
			token: "paren.rparen",
			regex: "\\|",
			next: "no_regex"
		}].concat(this.$rules.function_arguments);
		this.$rules.bstring = [
			{
				token: "constant.language.escape",
				regex: escapedRe
			},
			{
				token: "string",
				regex: "\\\\$",
				next: "bstring"
			},
			ctxBegin({
				token: "paren.lparen",
				regex: "\\$\\{",
				next: "string_interp"
			}),
			ctxBegin({
				token: "paren.lparen",
				regex: "\\$",
				next: "bstring_interp_single"
			}),
			ctxEnd({
				token: "string",
				regex: "`"
			}),
			{ defaultToken: "string" }
		];
		this.$rules.qqstring = [
			{
				token: "constant.language.escape",
				regex: escapedRe
			},
			{
				token: "string",
				regex: "\\\\$",
				next: "qqstring"
			},
			ctxBegin({
				token: "paren.lparen",
				regex: "#\\{",
				next: "string_interp"
			}),
			ctxEnd({
				token: "string",
				regex: "\""
			}),
			{ defaultToken: "string" }
		];
		var embeddableRules = [];
		for (var i = 0; i < this.$rules.no_regex.length; i++) {
			var rule = this.$rules.no_regex[i];
			if (String(rule.token).indexOf("paren") == -1 && (!rule.next || rule.next.isContextAware)) embeddableRules.push(rule);
		}
		this.$rules.string_interp = [ctxEnd({
			token: "paren.rparen",
			regex: "\\}"
		}), ctxBegin({
			token: "paren.lparen",
			regex: "{",
			next: "string_interp"
		})].concat(embeddableRules);
		this.$rules.bstring_interp_single = [{
			token: ["identifier", "paren.lparen"],
			regex: "(\\w+)(\\()",
			next: "bstring_interp_single_call"
		}, ctxEnd({
			token: "identifier",
			regex: "\\w*"
		})];
		this.$rules.bstring_interp_single_call = [ctxBegin({
			token: "paren.lparen",
			regex: "\\(",
			next: "bstring_interp_single_call"
		}), ctxEnd({
			token: "paren.rparen",
			regex: "\\)"
		})].concat(embeddableRules);
	};
	oop.inherits(SJSHighlightRules, TextHighlightRules);
	exports.SJSHighlightRules = SJSHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/sjs.js
var require_sjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JSMode = require_javascript().Mode;
	var SJSHighlightRules = require_sjs_highlight_rules().SJSHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = SJSHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, JSMode);
	(function() {
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/sjs";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_sjs();
