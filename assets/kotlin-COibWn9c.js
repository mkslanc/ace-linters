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
var require_kotlin_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var KotlinHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{ include: "#comments" },
				{
					token: [
						"text",
						"keyword.other.kotlin",
						"text",
						"entity.name.package.kotlin",
						"text"
					],
					regex: /^(\s*)(package)\b(?:(\s*)([^ ;$]+)(\s*))?/
				},
				{
					token: "comment",
					regex: /^\s*#!.*$/
				},
				{ include: "#imports" },
				{ include: "#expressions" },
				{
					token: "string",
					regex: /@[a-zA-Z][a-zA-Z:]*\b/
				},
				{
					token: [
						"keyword.other.kotlin",
						"text",
						"entity.name.variable.kotlin"
					],
					regex: /\b(var|val)(\s+)([a-zA-Z_][\w]*)\b/
				},
				{
					token: [
						"keyword.other.kotlin",
						"text",
						"entity.name.variable.kotlin",
						"paren.lparen"
					],
					regex: /(fun)(\s+)(\w+)(\()/,
					push: [
						{
							token: [
								"variable.parameter.function.kotlin",
								"text",
								"keyword.operator"
							],
							regex: /(\w+)(\s*)(:)/
						},
						{
							token: "paren.rparen",
							regex: /\)/,
							next: "pop"
						},
						{ include: "#comments" },
						{ include: "#types" },
						{ include: "#expressions" }
					]
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"identifier"
					],
					regex: /^(\s*)(class)(\s*)([a-zA-Z]+)/,
					next: "#classes"
				},
				{
					token: ["identifier", "punctuaction"],
					regex: /([a-zA-Z_][\w]*)(<)/,
					push: [
						{ include: "#generics" },
						{ include: "#defaultTypes" },
						{
							token: "punctuation",
							regex: />/,
							next: "pop"
						}
					]
				},
				{
					token: this.$keywords = this.createKeywordMapper({
						"storage.modifier.kotlin": "var|val|public|private|protected|abstract|final|enum|open|attribute|annotation|override|inline|var|val|vararg|lazy|in|out|internal|data|tailrec|operator|infix|const|yield|typealias|typeof|sealed|inner|value|lateinit|external|suspend|noinline|crossinline|reified|expect|actual",
						"keyword": "companion|class|object|interface|namespace|type|fun|constructor|if|else|while|for|do|return|when|where|break|continue|try|catch|finally|throw|in|is|as|assert|constructor",
						"constant.language.kotlin": "true|false|null|this|super",
						"entity.name.function.kotlin": "get|set"
					}, "identifier"),
					regex: /[a-zA-Z_][\w]*\b/
				},
				{
					token: "paren.lparen",
					regex: /[{(\[]/
				},
				{
					token: "paren.rparen",
					regex: /[})\]]/
				}
			],
			"#comments": [{
				token: "comment",
				regex: /\/\*/,
				push: [{
					token: "comment",
					regex: /\*\//,
					next: "pop"
				}, { defaultToken: "comment" }]
			}, {
				token: ["text", "comment"],
				regex: /(\s*)(\/\/.*$)/
			}],
			"#constants": [{
				token: "constant.numeric.kotlin",
				regex: /\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDd]|UL|ul)?\b/
			}, {
				token: "constant.other.kotlin",
				regex: /\b[A-Z][A-Z0-9_]+\b/
			}],
			"#expressions": [
				{ include: "#strings" },
				{ include: "#constants" },
				{ include: "#keywords" }
			],
			"#imports": [{
				token: [
					"text",
					"keyword.other.kotlin",
					"text",
					"keyword.other.kotlin"
				],
				regex: /^(\s*)(import)(\s+[^ $]+\s+)((?:as)?)/
			}],
			"#generics": [{
				token: "punctuation",
				regex: /</,
				push: [
					{
						token: "punctuation",
						regex: />/,
						next: "pop"
					},
					{
						token: "storage.type.generic.kotlin",
						regex: /\w+/
					},
					{
						token: "keyword.operator",
						regex: /:/
					},
					{
						token: "punctuation",
						regex: /,/
					},
					{ include: "#generics" }
				]
			}],
			"#classes": [
				{ include: "#generics" },
				{
					token: "keyword",
					regex: /public|private|constructor/
				},
				{
					token: "string",
					regex: /@[a-zA-Z][a-zA-Z:]*\b/
				},
				{
					token: "text",
					regex: /(?=$|\(|{)/,
					next: "start"
				}
			],
			"#keywords": [
				{
					token: "keyword.operator.kotlin",
					regex: /==|!=|===|!==|<=|>=|<|>|=>|->|::|\?:/
				},
				{
					token: "keyword.operator.assignment.kotlin",
					regex: /=/
				},
				{
					token: "keyword.operator.declaration.kotlin",
					regex: /:/,
					push: [{
						token: "text",
						regex: /(?=$|{|=|,)/,
						next: "pop"
					}, { include: "#types" }]
				},
				{
					token: "keyword.operator.dot.kotlin",
					regex: /\./
				},
				{
					token: "keyword.operator.increment-decrement.kotlin",
					regex: /\-\-|\+\+/
				},
				{
					token: "keyword.operator.arithmetic.kotlin",
					regex: /\-|\+|\*|\/|%/
				},
				{
					token: "keyword.operator.arithmetic.assign.kotlin",
					regex: /\+=|\-=|\*=|\/=/
				},
				{
					token: "keyword.operator.logical.kotlin",
					regex: /!|&&|\|\|/
				},
				{
					token: "keyword.operator.range.kotlin",
					regex: /\.\./
				},
				{
					token: "punctuation.kotlin",
					regex: /[;,]/
				}
			],
			"#types": [
				{ include: "#defaultTypes" },
				{
					token: "paren.lparen",
					regex: /\(/,
					push: [
						{
							token: "paren.rparen",
							regex: /\)/,
							next: "pop"
						},
						{ include: "#defaultTypes" },
						{
							token: "punctuation",
							regex: /,/
						}
					]
				},
				{ include: "#generics" },
				{
					token: "keyword.operator.declaration.kotlin",
					regex: /->/
				},
				{
					token: "paren.rparen",
					regex: /\)/
				},
				{
					token: "keyword.operator.declaration.kotlin",
					regex: /:/,
					push: [{
						token: "text",
						regex: /(?=$|{|=|,)/,
						next: "pop"
					}, { include: "#types" }]
				}
			],
			"#defaultTypes": [{
				token: "storage.type.buildin.kotlin",
				regex: /\b(Any|Unit|String|Int|Boolean|Char|Long|Double|Float|Short|Byte|dynamic|IntArray|BooleanArray|CharArray|LongArray|DoubleArray|FloatArray|ShortArray|ByteArray|Array|List|Map|Nothing|Enum|Throwable|Comparable)\b/
			}],
			"#strings": [
				{
					token: "string",
					regex: /"""/,
					push: [
						{
							token: "string",
							regex: /"""/,
							next: "pop"
						},
						{
							token: "variable.parameter.template.kotlin",
							regex: /\$\w+|\${[^}]+}/
						},
						{
							token: "constant.character.escape.kotlin",
							regex: /\\./
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "string",
					regex: /"/,
					push: [
						{
							token: "string",
							regex: /"/,
							next: "pop"
						},
						{
							token: "variable.parameter.template.kotlin",
							regex: /\$\w+|\$\{[^\}]+\}/
						},
						{
							token: "constant.character.escape.kotlin",
							regex: /\\./
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "string",
					regex: /'/,
					push: [
						{
							token: "string",
							regex: /'/,
							next: "pop"
						},
						{
							token: "constant.character.escape.kotlin",
							regex: /\\./
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "string",
					regex: /`/,
					push: [{
						token: "string",
						regex: /`/,
						next: "pop"
					}, { defaultToken: "string" }]
				}
			]
		};
		this.normalizeRules();
	};
	KotlinHighlightRules$1.metaData = {
		fileTypes: ["kt", "kts"],
		name: "Kotlin",
		scopeName: "source.Kotlin"
	};
	oop$1.inherits(KotlinHighlightRules$1, TextHighlightRules);
	exports.KotlinHighlightRules = KotlinHighlightRules$1;
}));
var require_kotlin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var KotlinHighlightRules = require_kotlin_highlight_rules().KotlinHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = KotlinHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/kotlin";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_kotlin();
