import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { r as require_cstyle, t as require_text } from "./text-B9A1mx6l.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import { t as require_cstyle$1 } from "./cstyle-C6ktp4d4.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import { n as require_xml, t as require_xml$1 } from "./xml-CQieR9ap.js";
var require_javascript$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var { TokenIterator } = require_token_iterator();
	var CstyleBehaviour = require_cstyle().CstyleBehaviour;
	var XmlBehaviour = require_xml().XmlBehaviour;
	var JavaScriptBehaviour$1 = function() {
		var xmlBehaviours = new XmlBehaviour({ closeCurlyBraces: true }).getBehaviours();
		this.addBehaviours(xmlBehaviours);
		this.inherit(CstyleBehaviour);
		this.add("autoclosing-fragment", "insertion", function(state, action, editor, session, text) {
			if (text == ">") {
				var position = editor.getSelectionRange().start;
				var iterator = new TokenIterator(session, position.row, position.column);
				var token = iterator.getCurrentToken() || iterator.stepBackward();
				if (!token) return;
				if (token.value == "<") return {
					text: "></>",
					selection: [1, 1]
				};
			}
		});
	};
	oop$2.inherits(JavaScriptBehaviour$1, CstyleBehaviour);
	exports.JavaScriptBehaviour = JavaScriptBehaviour$1;
}));
var require_javascript$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var XmlFoldMode = require_xml$1().FoldMode;
	var CFoldMode = require_cstyle$1().FoldMode;
	var FoldMode = exports.FoldMode = function(commentRegex) {
		if (commentRegex) {
			this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start));
			this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end));
		}
		this.xmlFoldMode = new XmlFoldMode();
	};
	oop$1.inherits(FoldMode, CFoldMode);
	(function() {
		this.getFoldWidgetRangeBase = this.getFoldWidgetRange;
		this.getFoldWidgetBase = this.getFoldWidget;
		this.getFoldWidget = function(session, foldStyle, row) {
			var fw = this.getFoldWidgetBase(session, foldStyle, row);
			if (!fw) return this.xmlFoldMode.getFoldWidget(session, foldStyle, row);
			return fw;
		};
		this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
			var range = this.getFoldWidgetRangeBase(session, foldStyle, row, forceMultiline);
			if (range) return range;
			return this.xmlFoldMode.getFoldWidgetRange(session, foldStyle, row);
		};
	}).call(FoldMode.prototype);
}));
var require_javascript = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var WorkerClient = require_worker_client().WorkerClient;
	var JavaScriptBehaviour = require_javascript$2().JavaScriptBehaviour;
	var JavaScriptFoldMode = require_javascript$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = JavaScriptHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = new JavaScriptBehaviour();
		this.foldingRules = new JavaScriptFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$quotes = {
			"\"": "\"",
			"'": "'",
			"`": "`"
		};
		this.$pairQuotesAfter = { "`": /\w/ };
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
			var tokens = tokenizedLine.tokens;
			var endState = tokenizedLine.state;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start" || state == "no_regex") {
				if (line.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/)) indent += tab;
			} else if (state == "doc-start") {
				if (endState == "start" || endState == "no_regex") return "";
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.createWorker = function(session) {
			var worker = new WorkerClient(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
			worker.attachToDocument(session.getDocument());
			worker.on("annotate", function(results) {
				session.setAnnotations(results.data);
			});
			worker.on("terminate", function() {
				session.clearAnnotations();
			});
			return worker;
		};
		this.$id = "ace/mode/javascript";
		this.snippetFileId = "ace/snippets/javascript";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export { require_javascript$1 as n, require_javascript$2 as r, require_javascript as t };
