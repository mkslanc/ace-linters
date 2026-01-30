import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-DUGnT9qY.js";
var require_java_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JavaHighlightRules = function() {
		var identifierRe = "[a-zA-Z_$][a-zA-Z0-9_$]*";
		var keywords = "abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|yield|when|record|var|permits|(?:non\\-)?sealed";
		var buildinConstants = "null|Infinity|NaN|undefined";
		var langClasses = "AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"constant.language": buildinConstants,
			"support.function": langClasses
		}, "identifier");
		this.$rules = {
			"start": [
				{ include: "comments" },
				{ include: "multiline-strings" },
				{ include: "strings" },
				{ include: "constants" },
				{
					regex: "(open(?:\\s+))?module(?=\\s*\\w)",
					token: "keyword",
					next: [
						{
							regex: "{",
							token: "paren.lparen",
							push: [
								{
									regex: "}",
									token: "paren.rparen",
									next: "pop"
								},
								{ include: "comments" },
								{
									regex: "\\b(requires|transitive|exports|opens|to|uses|provides|with)\\b",
									token: "keyword"
								}
							]
						},
						{
							token: "text",
							regex: "\\s+"
						},
						{
							token: "identifier",
							regex: "\\w+"
						},
						{
							token: "punctuation.operator",
							regex: "."
						},
						{
							token: "text",
							regex: "\\s+"
						},
						{
							regex: "",
							next: "start"
						}
					]
				},
				{ include: "statements" }
			],
			"comments": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				{
					token: "comment.doc",
					regex: /\/\*\*(?!\/)/,
					push: "doc-start"
				},
				{
					token: "comment",
					regex: "\\/\\*",
					push: [{
						token: "comment",
						regex: "\\*\\/",
						next: "pop"
					}, { defaultToken: "comment" }]
				}
			],
			"strings": [
				{
					token: ["punctuation", "string"],
					regex: /(\.)(")/,
					push: [
						{
							token: "lparen",
							regex: /\\\{/,
							push: [
								{
									token: "text",
									regex: /$/,
									next: "start"
								},
								{
									token: "rparen",
									regex: /}/,
									next: "pop"
								},
								{ include: "strings" },
								{ include: "constants" },
								{ include: "statements" }
							]
						},
						{
							token: "string",
							regex: /"/,
							next: "pop"
						},
						{ defaultToken: "string" }
					]
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				}
			],
			"multiline-strings": [{
				token: ["punctuation", "string"],
				regex: /(\.)(""")/,
				push: [
					{
						token: "string",
						regex: "\"\"\"",
						next: "pop"
					},
					{
						token: "lparen",
						regex: /\\\{/,
						push: [
							{
								token: "text",
								regex: /$/,
								next: "start"
							},
							{
								token: "rparen",
								regex: /}/,
								next: "pop"
							},
							{ include: "multiline-strings" },
							{ include: "strings" },
							{ include: "constants" },
							{ include: "statements" }
						]
					},
					{
						token: "constant.language.escape",
						regex: /\\./
					},
					{ defaultToken: "string" }
				]
			}, {
				token: "string",
				regex: "\"\"\"",
				push: [
					{
						token: "string",
						regex: "\"\"\"",
						next: "pop"
					},
					{
						token: "constant.language.escape",
						regex: /\\./
					},
					{ defaultToken: "string" }
				]
			}],
			"constants": [
				{
					token: "constant.numeric",
					regex: /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.numeric",
					regex: /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				}
			],
			"statements": [
				{
					token: [
						"keyword",
						"text",
						"identifier"
					],
					regex: "(record)(\\s+)(" + identifierRe + ")\\b"
				},
				{
					token: "keyword",
					regex: "(?:" + keywords + ")\\b"
				},
				{
					token: "storage.type.annotation",
					regex: "@" + identifierRe + "\\b"
				},
				{
					token: "entity.name.function",
					regex: identifierRe + "(?=\\()"
				},
				{
					token: keywordMapper,
					regex: identifierRe + "\\b"
				},
				{
					token: "keyword.operator",
					regex: "!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
				},
				{
					token: "lparen",
					regex: "[[({]"
				},
				{
					token: "rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("pop")]);
		this.normalizeRules();
	};
	oop.inherits(JavaHighlightRules, TextHighlightRules);
	exports.JavaHighlightRules = JavaHighlightRules;
}));
export { require_java_highlight_rules as t };
