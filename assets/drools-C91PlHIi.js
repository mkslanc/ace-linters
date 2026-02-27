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
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
import { t as require_java_highlight_rules } from "./java_highlight_rules-D1nUKnFA.js";
var require_drools_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JavaHighlightRules = require_java_highlight_rules().JavaHighlightRules;
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var identifierRe = "[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*";
	var packageIdentifierRe = "[a-zA-Z\\$_¡-￿][\\.a-zA-Z\\d\\$_¡-￿]*";
	var DroolsHighlightRules$1 = function() {
		var keywords = "date|effective|expires|lock|on|active|no|loop|auto|focus|activation|group|agenda|ruleflow|duration|timer|calendars|refract|direct|dialect|salience|enabled|attributes|extends|template|function|contains|matches|eval|excludes|soundslike|memberof|not|in|or|and|exists|forall|over|from|entry|point|accumulate|acc|collect|action|reverse|result|end|init|instanceof|extends|super|boolean|char|byte|short|int|long|float|double|this|void|class|new|case|final|if|else|for|while|do|default|try|catch|finally|switch|synchronized|return|throw|break|continue|assert|modify|static|public|protected|private|abstract|native|transient|volatile|strictfp|throws|interface|enum|implements|type|window|trait|no-loop|str";
		var langClasses = "AbstractMethodError|AssertionError|ClassCircularityError|ClassFormatError|Deprecated|EnumConstantNotPresentException|ExceptionInInitializerError|IllegalAccessError|IllegalThreadStateException|InstantiationError|InternalError|NegativeArraySizeException|NoSuchFieldError|Override|Process|ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|SuppressWarnings|TypeNotPresentException|UnknownError|UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|InstantiationException|IndexOutOfBoundsException|ArrayIndexOutOfBoundsException|CloneNotSupportedException|NoSuchFieldException|IllegalArgumentException|NumberFormatException|SecurityException|Void|InheritableThreadLocal|IllegalStateException|InterruptedException|NoSuchMethodException|IllegalAccessException|UnsupportedOperationException|Enum|StrictMath|Package|Compiler|Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|Character|Boolean|StackTraceElement|Appendable|StringBuffer|Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|StackOverflowError|OutOfMemoryError|VirtualMachineError|ArrayStoreException|ClassCastException|LinkageError|NoClassDefFoundError|ClassNotFoundException|RuntimeException|Exception|ThreadDeath|Error|Throwable|System|ClassLoader|Cloneable|Class|CharSequence|Comparable|String|Object";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"keyword": keywords,
			"constant.language": "null",
			"support.class": langClasses,
			"support.function": "retract|update|modify|insert"
		}, "identifier");
		var stringRules = function() {
			return [{
				token: "string",
				regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
			}, {
				token: "string",
				regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
			}];
		};
		var basicPreRules = function(blockCommentRules$1) {
			return [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: "\\/\\*",
					next: blockCommentRules$1
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
				}
			];
		};
		var blockCommentRules = function(returnRule) {
			return [{
				token: "comment.block",
				regex: "\\*\\/",
				next: returnRule
			}, { defaultToken: "comment.block" }];
		};
		var basicPostRules = function() {
			return [
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
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
			];
		};
		this.$rules = {
			"start": [].concat(basicPreRules("block.comment"), [
				{
					token: "entity.name.type",
					regex: "@[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.type"
					],
					regex: "(package)(\\s+)(" + packageIdentifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"keyword",
						"text",
						"entity.name.type"
					],
					regex: "(import)(\\s+)(function)(\\s+)(" + packageIdentifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.type"
					],
					regex: "(import)(\\s+)(" + packageIdentifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.type",
						"text",
						"variable"
					],
					regex: "(global)(\\s+)(" + packageIdentifierRe + ")(\\s+)(" + identifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"keyword",
						"text",
						"entity.name.type"
					],
					regex: "(declare)(\\s+)(trait)(\\s+)(" + identifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.type"
					],
					regex: "(declare)(\\s+)(" + identifierRe + ")"
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.type"
					],
					regex: "(extends)(\\s+)(" + packageIdentifierRe + ")"
				},
				{
					token: ["keyword", "text"],
					regex: "(rule)(\\s+)",
					next: "asset.name"
				}
			], stringRules(), [
				{
					token: [
						"variable.other",
						"text",
						"text"
					],
					regex: "(" + identifierRe + ")(\\s*)(:)"
				},
				{
					token: ["keyword", "text"],
					regex: "(query)(\\s+)",
					next: "asset.name"
				},
				{
					token: ["keyword", "text"],
					regex: "(when)(\\s*)"
				},
				{
					token: ["keyword", "text"],
					regex: "(then)(\\s*)",
					next: "java-start"
				},
				{
					token: "paren.lparen",
					regex: /[\[({]/
				},
				{
					token: "paren.rparen",
					regex: /[\])}]/
				}
			], basicPostRules()),
			"block.comment": blockCommentRules("start"),
			"asset.name": [
				{
					token: "entity.name",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "entity.name",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "entity.name",
					regex: identifierRe
				},
				{
					regex: "",
					token: "empty",
					next: "start"
				}
			]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
		this.embedRules(JavaHighlightRules, "java-", [{
			token: "support.function",
			regex: "\\b(insert|modify|retract|update)\\b"
		}, {
			token: "keyword",
			regex: "\\bend\\b",
			next: "start"
		}]);
	};
	oop$2.inherits(DroolsHighlightRules$1, TextHighlightRules);
	exports.DroolsHighlightRules = DroolsHighlightRules$1;
}));
var require_drools$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var Range = require_range().Range;
	var BaseFoldMode = require_fold_mode().FoldMode;
	var TokenIterator = require_token_iterator().TokenIterator;
	var FoldMode = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.foldingStartMarker = /\b(rule|declare|query|when|then)\b/;
		this.foldingStopMarker = /\bend\b/;
		this.importRegex = /^import /;
		this.globalRegex = /^global /;
		this.getBaseFoldWidget = this.getFoldWidget;
		this.getFoldWidget = function(session, foldStyle, row) {
			if (foldStyle === "markbegin") {
				var line = session.getLine(row);
				if (this.importRegex.test(line)) {
					if (row === 0 || !this.importRegex.test(session.getLine(row - 1))) return "start";
				}
				if (this.globalRegex.test(line)) {
					if (row === 0 || !this.globalRegex.test(session.getLine(row - 1))) return "start";
				}
			}
			return this.getBaseFoldWidget(session, foldStyle, row);
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var match = line.match(this.foldingStartMarker);
			if (match) {
				if (match[1]) {
					var position = {
						row,
						column: line.length
					};
					var iterator = new TokenIterator(session, position.row, position.column);
					var seek = "end";
					var token = iterator.getCurrentToken();
					if (token.value == "when") seek = "then";
					while (token) {
						if (token.value == seek) return Range.fromPoints(position, {
							row: iterator.getCurrentTokenRow(),
							column: iterator.getCurrentTokenColumn()
						});
						token = iterator.stepForward();
					}
				}
			}
			match = line.match(this.importRegex);
			if (match) return getMatchedFoldRange(session, this.importRegex, match, row);
			match = line.match(this.globalRegex);
			if (match) return getMatchedFoldRange(session, this.globalRegex, match, row);
		};
	}).call(FoldMode.prototype);
	function getMatchedFoldRange(session, regex, match, row) {
		let startColumn = match[0].length;
		let maxRow = session.getLength();
		let startRow = row;
		let endRow = row;
		while (++row < maxRow) {
			let line = session.getLine(row);
			if (line.match(/^\s*$/)) continue;
			if (!line.match(regex)) break;
			endRow = row;
		}
		if (endRow > startRow) {
			let endColumn = session.getLine(endRow).length;
			return new Range(startRow, startColumn, endRow, endColumn);
		}
	}
}));
var require_drools = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var DroolsHighlightRules = require_drools_highlight_rules().DroolsHighlightRules;
	var DroolsFoldMode = require_drools$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = DroolsHighlightRules;
		this.foldingRules = new DroolsFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/drools";
		this.snippetFileId = "ace/snippets/drools";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_drools();
