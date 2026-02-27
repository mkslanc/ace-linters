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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_prolog_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PrologHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{ include: "#comment" },
				{ include: "#basic_fact" },
				{ include: "#rule" },
				{ include: "#directive" },
				{ include: "#fact" }
			],
			"#atom": [
				{
					token: "constant.other.atom.prolog",
					regex: "\\b[a-z][a-zA-Z0-9_]*\\b"
				},
				{
					token: "constant.numeric.prolog",
					regex: "-?\\d+(?:\\.\\d+)?"
				},
				{ include: "#string" }
			],
			"#basic_elem": [
				{ include: "#comment" },
				{ include: "#statement" },
				{ include: "#constants" },
				{ include: "#operators" },
				{ include: "#builtins" },
				{ include: "#list" },
				{ include: "#atom" },
				{ include: "#variable" }
			],
			"#basic_fact": [{
				token: ["entity.name.function.fact.basic.prolog", "punctuation.end.fact.basic.prolog"],
				regex: "([a-z]\\w*)(\\.)"
			}],
			"#builtins": [{
				token: "support.function.builtin.prolog",
				regex: "\\b(?:abolish|abort|ancestors|arg|ascii|assert[az]|atom(?:ic)?|body|char|close|conc|concat|consult|define|definition|dynamic|dump|fail|file|free|free_proc|functor|getc|goal|halt|head|head|integer|length|listing|match_args|member|next_clause|nl|nonvar|nth|number|cvars|nvars|offset|op|print?|prompt|putc|quoted|ratom|read|redefine|rename|retract(?:all)?|see|seeing|seen|skip|spy|statistics|system|tab|tell|telling|term|time|told|univ|unlink_clause|unspy_predicate|var|write)\\b"
			}],
			"#comment": [{
				token: ["punctuation.definition.comment.prolog", "comment.line.percentage.prolog"],
				regex: "(%)(.*$)"
			}, {
				token: "punctuation.definition.comment.prolog",
				regex: "/\\*",
				push: [{
					token: "punctuation.definition.comment.prolog",
					regex: "\\*/",
					next: "pop"
				}, { defaultToken: "comment.block.prolog" }]
			}],
			"#constants": [{
				token: "constant.language.prolog",
				regex: "\\b(?:true|false|yes|no)\\b"
			}],
			"#directive": [{
				token: "keyword.operator.directive.prolog",
				regex: ":-",
				push: [
					{
						token: "meta.directive.prolog",
						regex: "\\.",
						next: "pop"
					},
					{ include: "#comment" },
					{ include: "#statement" },
					{ defaultToken: "meta.directive.prolog" }
				]
			}],
			"#expr": [
				{ include: "#comments" },
				{
					token: "meta.expression.prolog",
					regex: "\\(",
					push: [
						{
							token: "meta.expression.prolog",
							regex: "\\)",
							next: "pop"
						},
						{ include: "#expr" },
						{ defaultToken: "meta.expression.prolog" }
					]
				},
				{
					token: "keyword.control.cutoff.prolog",
					regex: "!"
				},
				{
					token: "punctuation.control.and.prolog",
					regex: ","
				},
				{
					token: "punctuation.control.or.prolog",
					regex: ";"
				},
				{ include: "#basic_elem" }
			],
			"#fact": [{
				token: ["entity.name.function.fact.prolog", "punctuation.begin.fact.parameters.prolog"],
				regex: "([a-z]\\w*)(\\()(?!.*:-)",
				push: [
					{
						token: ["punctuation.end.fact.parameters.prolog", "punctuation.end.fact.prolog"],
						regex: "(\\))(\\.?)",
						next: "pop"
					},
					{ include: "#parameter" },
					{ defaultToken: "meta.fact.prolog" }
				]
			}],
			"#list": [{
				token: "punctuation.begin.list.prolog",
				regex: "\\[(?=.*\\])",
				push: [
					{
						token: "punctuation.end.list.prolog",
						regex: "\\]",
						next: "pop"
					},
					{ include: "#comment" },
					{
						token: "punctuation.separator.list.prolog",
						regex: ","
					},
					{
						token: "punctuation.concat.list.prolog",
						regex: "\\|",
						push: [
							{
								token: "meta.list.concat.prolog",
								regex: "(?=\\s*\\])",
								next: "pop"
							},
							{ include: "#basic_elem" },
							{ defaultToken: "meta.list.concat.prolog" }
						]
					},
					{ include: "#basic_elem" },
					{ defaultToken: "meta.list.prolog" }
				]
			}],
			"#operators": [{
				token: "keyword.operator.prolog",
				regex: "\\\\\\+|\\bnot\\b|\\bis\\b|->|[><]|[><\\\\:=]?=|(?:=\\\\|\\\\=)="
			}],
			"#parameter": [
				{
					token: "variable.language.anonymous.prolog",
					regex: "\\b_\\b"
				},
				{
					token: "variable.parameter.prolog",
					regex: "\\b[A-Z_]\\w*\\b"
				},
				{
					token: "punctuation.separator.parameters.prolog",
					regex: ","
				},
				{ include: "#basic_elem" },
				{
					token: "text",
					regex: "[^\\s]"
				}
			],
			"#rule": [{
				token: "meta.rule.prolog",
				regex: "(?=[a-z]\\w*.*:-)",
				push: [
					{
						token: "punctuation.rule.end.prolog",
						regex: "\\.",
						next: "pop"
					},
					{
						token: "meta.rule.signature.prolog",
						regex: "(?=[a-z]\\w*.*:-)",
						push: [
							{
								token: "meta.rule.signature.prolog",
								regex: "(?=:-)",
								next: "pop"
							},
							{
								token: "entity.name.function.rule.prolog",
								regex: "[a-z]\\w*(?=\\(|\\s*:-)"
							},
							{
								token: "punctuation.rule.parameters.begin.prolog",
								regex: "\\(",
								push: [
									{
										token: "punctuation.rule.parameters.end.prolog",
										regex: "\\)",
										next: "pop"
									},
									{ include: "#parameter" },
									{ defaultToken: "meta.rule.parameters.prolog" }
								]
							},
							{ defaultToken: "meta.rule.signature.prolog" }
						]
					},
					{
						token: "keyword.operator.definition.prolog",
						regex: ":-",
						push: [
							{
								token: "meta.rule.definition.prolog",
								regex: "(?=\\.)",
								next: "pop"
							},
							{ include: "#comment" },
							{ include: "#expr" },
							{ defaultToken: "meta.rule.definition.prolog" }
						]
					},
					{ defaultToken: "meta.rule.prolog" }
				]
			}],
			"#statement": [{
				token: "meta.statement.prolog",
				regex: "(?=[a-z]\\w*\\()",
				push: [
					{
						token: "punctuation.end.statement.parameters.prolog",
						regex: "\\)",
						next: "pop"
					},
					{ include: "#builtins" },
					{ include: "#atom" },
					{
						token: "punctuation.begin.statement.parameters.prolog",
						regex: "\\(",
						push: [
							{
								token: "meta.statement.parameters.prolog",
								regex: "(?=\\))",
								next: "pop"
							},
							{
								token: "punctuation.separator.statement.prolog",
								regex: ","
							},
							{ include: "#basic_elem" },
							{ defaultToken: "meta.statement.parameters.prolog" }
						]
					},
					{ defaultToken: "meta.statement.prolog" }
				]
			}],
			"#string": [{
				token: "punctuation.definition.string.begin.prolog",
				regex: "'",
				push: [
					{
						token: "punctuation.definition.string.end.prolog",
						regex: "'",
						next: "pop"
					},
					{
						token: "constant.character.escape.prolog",
						regex: "\\\\."
					},
					{
						token: "constant.character.escape.quote.prolog",
						regex: "''"
					},
					{ defaultToken: "string.quoted.single.prolog" }
				]
			}],
			"#variable": [{
				token: "variable.language.anonymous.prolog",
				regex: "\\b_\\b"
			}, {
				token: "variable.other.prolog",
				regex: "\\b[A-Z_][a-zA-Z0-9_]*\\b"
			}]
		};
		this.normalizeRules();
	};
	PrologHighlightRules$1.metaData = {
		fileTypes: ["plg", "prolog"],
		foldingStartMarker: "(%\\s*region \\w*)|([a-z]\\w*.*:- ?)",
		foldingStopMarker: "(%\\s*end(\\s*region)?)|(?=\\.)",
		keyEquivalent: "^~P",
		name: "Prolog",
		scopeName: "source.prolog"
	};
	oop$1.inherits(PrologHighlightRules$1, TextHighlightRules);
	exports.PrologHighlightRules = PrologHighlightRules$1;
}));
var require_prolog = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PrologHighlightRules = require_prolog_highlight_rules().PrologHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = PrologHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "%";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/prolog";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_prolog();
