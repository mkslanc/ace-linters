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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DN609jMc.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import { t as require_javascript } from "./javascript-CApcTAmC.js";
var require_sjs_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SJSHighlightRules$1 = function() {
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
	oop$1.inherits(SJSHighlightRules$1, TextHighlightRules);
	exports.SJSHighlightRules = SJSHighlightRules$1;
}));
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
export default require_sjs();
