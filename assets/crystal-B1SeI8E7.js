import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
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
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
var require_crystal_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CrystalHighlightRules$1 = function() {
		var builtinFunctions = "puts|initialize|previous_def|typeof|as|pointerof|sizeof|instance_sizeof";
		var keywords = "if|end|else|elsif|unless|case|when|break|while|next|until|def|return|class|new|getter|setter|property|lib|fun|do|struct|private|protected|public|module|super|abstract|include|extend|begin|enum|raise|yield|with|alias|rescue|ensure|macro|uninitialized|union|type|require";
		var buildinConstants = "true|TRUE|false|FALSE|nil|NIL|__LINE__|__END_LINE__|__FILE__|__DIR__";
		var builtinVariables = "$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|root_url|flash|session|cookies|params|request|response|logger|self";
		var keywordMapper = this.$keywords = this.createKeywordMapper({
			"keyword": keywords,
			"constant.language": buildinConstants,
			"variable.language": builtinVariables,
			"support.function": builtinFunctions
		}, "identifier");
		var intNumber = "(?:[+-]?)(?:(?:0[xX][\\dA-Fa-f]+)|(?:[0-9][\\d_]*)|(?:0o[0-7][0-7]*)|(?:0[bB][01]+))(?:_?[iIuU](?:8|16|32|64))?\\b";
		var escapeExpression = /\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}})/;
		var extEscapeExspresssion = /\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}}|u{(:?[\da-fA-F]{2}\s)*[\da-fA-F]{2}})/;
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "#.*$"
			},
			{
				token: "string.regexp",
				regex: "[/]",
				push: [
					{
						token: "constant.language.escape",
						regex: extEscapeExspresssion
					},
					{
						token: "string.regexp",
						regex: "[/][imx]*(?=[).,;\\s]|$)",
						next: "pop"
					},
					{ defaultToken: "string.regexp" }
				]
			},
			[
				{
					regex: "[{}]",
					onMatch: function(val, state, stack) {
						this.next = val == "{" ? this.nextState : "";
						if (val == "{" && stack.length) {
							stack.unshift("start", state);
							return "paren.lparen";
						}
						if (val == "}" && stack.length) {
							stack.shift();
							this.next = stack.shift();
							if (this.next.indexOf("string") != -1) return "paren.end";
						}
						return val == "{" ? "paren.lparen" : "paren.rparen";
					},
					nextState: "start"
				},
				{
					token: "string.start",
					regex: /"/,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string",
							regex: /\\#{/
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{
							token: "string.end",
							regex: /"/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "string.start",
					regex: /`/,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string",
							regex: /\\#{/
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{
							token: "string.end",
							regex: /`/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "rpstring",
					token: "string.start",
					regex: /%[Qx]?\(/,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string.start",
							regex: /\(/,
							push: "rpstring"
						},
						{
							token: "string.end",
							regex: /\)/,
							next: "pop"
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "spstring",
					token: "string.start",
					regex: /%[Qx]?\[/,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string.start",
							regex: /\[/,
							push: "spstring"
						},
						{
							token: "string.end",
							regex: /]/,
							next: "pop"
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "fpstring",
					token: "string.start",
					regex: /%[Qx]?{/,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string.start",
							regex: /{/,
							push: "fpstring"
						},
						{
							token: "string.end",
							regex: /}/,
							next: "pop"
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "tpstring",
					token: "string.start",
					regex: /%[Qx]?</,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string.start",
							regex: /</,
							push: "tpstring"
						},
						{
							token: "string.end",
							regex: />/,
							next: "pop"
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "ppstring",
					token: "string.start",
					regex: /%[Qx]?\|/,
					push: [
						{
							token: "constant.language.escape",
							regex: extEscapeExspresssion
						},
						{
							token: "string.end",
							regex: /\|/,
							next: "pop"
						},
						{
							token: "paren.start",
							regex: /#{/,
							push: "start"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "rpqstring",
					token: "string.start",
					regex: /%[qwir]\(/,
					push: [
						{
							token: "string.start",
							regex: /\(/,
							push: "rpqstring"
						},
						{
							token: "string.end",
							regex: /\)/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "spqstring",
					token: "string.start",
					regex: /%[qwir]\[/,
					push: [
						{
							token: "string.start",
							regex: /\[/,
							push: "spqstring"
						},
						{
							token: "string.end",
							regex: /]/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "fpqstring",
					token: "string.start",
					regex: /%[qwir]{/,
					push: [
						{
							token: "string.start",
							regex: /{/,
							push: "fpqstring"
						},
						{
							token: "string.end",
							regex: /}/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "tpqstring",
					token: "string.start",
					regex: /%[qwir]</,
					push: [
						{
							token: "string.start",
							regex: /</,
							push: "tpqstring"
						},
						{
							token: "string.end",
							regex: />/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					stateName: "ppqstring",
					token: "string.start",
					regex: /%[qwir]\|/,
					push: [{
						token: "string.end",
						regex: /\|/,
						next: "pop"
					}, { defaultToken: "string" }]
				},
				{
					token: "string.start",
					regex: /'/,
					push: [
						{
							token: "constant.language.escape",
							regex: escapeExpression
						},
						{
							token: "string.end",
							regex: /'|$/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				}
			],
			{
				token: "text",
				regex: "::"
			},
			{
				token: "variable.instance",
				regex: "@{1,2}[a-zA-Z_\\d]+"
			},
			{
				token: "variable.fresh",
				regex: "%[a-zA-Z_\\d]+"
			},
			{
				token: "support.class",
				regex: "[A-Z][a-zA-Z_\\d]+"
			},
			{
				token: "constant.other.symbol",
				regex: "[:](?:(?:===|<=>|\\[]\\?|\\[]=|\\[]|>>|\\*\\*|<<|==|!=|>=|<=|!~|=~|<|\\+|-|\\*|\\/|%|&|\\||\\^|>|!|~)|(?:(?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?))"
			},
			{
				token: "constant.numeric",
				regex: "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?(?:_?[fF](?:32|64))?\\b"
			},
			{
				token: "constant.numeric",
				regex: intNumber
			},
			{
				token: "constant.other.symbol",
				regex: ":\"",
				push: [
					{
						token: "constant.language.escape",
						regex: extEscapeExspresssion
					},
					{
						token: "constant.other.symbol",
						regex: "\"",
						next: "pop"
					},
					{ defaultToken: "constant.other.symbol" }
				]
			},
			{
				token: "constant.language.boolean",
				regex: "(?:true|false)\\b"
			},
			{
				token: "support.function",
				regex: "(?:is_a\\?|nil\\?|responds_to\\?|as\\?)"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$!?]*\\b"
			},
			{
				token: "variable.system",
				regex: "\\$\\!|\\$\\?"
			},
			{
				token: "punctuation.separator.key-value",
				regex: "=>"
			},
			{
				stateName: "heredoc",
				onMatch: function(value, currentState, stack) {
					var next = "heredoc";
					var tokens = value.split(this.splitRegex);
					stack.push(next, tokens[3]);
					return [
						{
							type: "constant",
							value: tokens[1]
						},
						{
							type: "string",
							value: tokens[2]
						},
						{
							type: "support.class",
							value: tokens[3]
						},
						{
							type: "string",
							value: tokens[4]
						}
					];
				},
				regex: "(<<-)([']?)([\\w]+)([']?)",
				rules: { heredoc: [{
					token: "string",
					regex: "^ +"
				}, {
					onMatch: function(value, currentState, stack) {
						if (value === stack[1]) {
							stack.shift();
							stack.shift();
							this.next = stack[0] || "start";
							return "support.class";
						}
						this.next = "";
						return "string";
					},
					regex: ".*$",
					next: "start"
				}] }
			},
			{
				regex: "$",
				token: "empty",
				next: function(currentState, stack) {
					if (stack[0] === "heredoc") return stack[0];
					return currentState;
				}
			},
			{
				token: "punctuation.operator",
				regex: /[.]\s*(?![.])/,
				push: [
					{
						token: "punctuation.operator",
						regex: /[.]\s*(?![.])/
					},
					{
						token: "support.function",
						regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
					},
					{
						regex: "",
						token: "empty",
						next: "pop"
					}
				]
			},
			{
				token: "keyword.operator",
				regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|\\?|\\:|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\^|\\|"
			},
			{
				token: "punctuation.operator",
				regex: /[?:,;.]/
			},
			{
				token: "paren.lparen",
				regex: "[[({]"
			},
			{
				token: "paren.rparen",
				regex: "[\\])}]"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		] };
		this.normalizeRules();
	};
	oop$1.inherits(CrystalHighlightRules$1, TextHighlightRules);
	exports.CrystalHighlightRules = CrystalHighlightRules$1;
}));
var require_crystal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CrystalHighlightRules = require_crystal_highlight_rules().CrystalHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Range = require_range().Range;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = CrystalHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				var match = line.match(/^.*[\{\(\[]\s*$/);
				var startingClassOrMethod = line.match(/^\s*(class|def|module)\s.*$/);
				var startingDoBlock = line.match(/.*do(\s*|\s+\|.*\|\s*)$/);
				var startingConditional = line.match(/^\s*(if|else|when)\s*/);
				if (match || startingClassOrMethod || startingDoBlock || startingConditional) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return /^\s+(end|else)$/.test(line + input) || this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, session, row) {
			var line = session.getLine(row);
			if (/}/.test(line)) return this.$outdent.autoOutdent(session, row);
			var indent = this.$getIndent(line);
			var prevLine = session.getLine(row - 1);
			var prevIndent = this.$getIndent(prevLine);
			var tab = session.getTabString();
			if (prevIndent.length <= indent.length) {
				if (indent.slice(-tab.length) == tab) session.remove(new Range(row, indent.length - tab.length, row, indent.length));
			}
		};
		this.$id = "ace/mode/crystal";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_crystal();
