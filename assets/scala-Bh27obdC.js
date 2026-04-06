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
import "./cstyle-C7DhJywu.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-DaZtgjLZ.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import { t as require_javascript } from "./javascript-loi8Unzt.js";
//#region node_modules/ace-code/src/mode/scala_highlight_rules.js
var require_scala_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ScalaHighlightRules = function() {
		var keywords = "case|default|do|else|for|if|match|while|throw|return|try|trye|catch|finally|yield|abstract|class|def|extends|final|forSome|implicit|implicits|import|lazy|new|object|null|override|package|private|protected|sealed|super|this|trait|type|val|var|with|assert|assume|require|print|println|printf|readLine|readBoolean|readByte|readShort|readChar|readInt|readLong|readFloat|readDouble";
		var buildinConstants = "true|false";
		var langClasses = "AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object|Unit|Any|AnyVal|AnyRef|Null|ScalaObject|Singleton|Seq|Iterable|List|Option|Array|Char|Byte|Int|Long|Nothing|App|Application|BufferedIterator|BigDecimal|BigInt|Console|Either|Enumeration|Equiv|Fractional|Function|IndexedSeq|Integral|Iterator|Map|Numeric|Nil|NotNull|Ordered|Ordering|PartialFunction|PartialOrdering|Product|Proxy|Range|Responder|Seq|Serializable|Set|Specializable|Stream|StringContext|Symbol|Traversable|TraversableOnce|Tuple|Vector|Pair|Triple";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"keyword": keywords,
			"support.function": langClasses,
			"constant.language": buildinConstants
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: "string.regexp",
					regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
				},
				{
					token: "string",
					regex: "\"\"\"",
					next: "tstring"
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "string"
				},
				{
					token: "symbol.constant",
					regex: "'[\\w\\d_]+"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
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
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"string": [
				{
					token: "escape",
					regex: "\\\\\""
				},
				{
					token: "string",
					regex: "\"",
					next: "start"
				},
				{
					token: "string.invalid",
					regex: "[^\"\\\\]*$",
					next: "start"
				},
				{
					token: "string",
					regex: "[^\"\\\\]+"
				}
			],
			"tstring": [{
				token: "string",
				regex: "\"{3,5}",
				next: "start"
			}, { defaultToken: "string" }]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	oop.inherits(ScalaHighlightRules, TextHighlightRules);
	exports.ScalaHighlightRules = ScalaHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/scala.js
var require_scala = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptMode = require_javascript().Mode;
	var ScalaHighlightRules = require_scala_highlight_rules().ScalaHighlightRules;
	var Mode = function() {
		JavaScriptMode.call(this);
		this.HighlightRules = ScalaHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, JavaScriptMode);
	(function() {
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/scala";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_scala();
