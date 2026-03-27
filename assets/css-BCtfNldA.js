import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import { t as require_text } from "./text-x9TxHOMd.js";
import { t as require_worker_client } from "./worker_client-Do40RNma.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BrA4daTy.js";
import { t as require_css_completions } from "./css_completions-j9TDmcq8.js";
import { t as require_css$1 } from "./css-DLrW6Pji.js";
//#region node_modules/ace-code/src/mode/css.js
var require_css = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CssHighlightRules = require_css_highlight_rules().CssHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var WorkerClient = require_worker_client().WorkerClient;
	var CssCompletions = require_css_completions().CssCompletions;
	var CssBehaviour = require_css$1().CssBehaviour;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = CssHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = new CssBehaviour();
		this.$completer = new CssCompletions();
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.foldingRules = "cStyle";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (line.match(/^.*\{\s*$/)) indent += tab;
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.getCompletions = function(state, session, pos, prefix) {
			return this.$completer.getCompletions(state, session, pos, prefix);
		};
		this.createWorker = function(session) {
			var worker = new WorkerClient(["ace"], "ace/mode/css_worker", "Worker");
			worker.attachToDocument(session.getDocument());
			worker.on("annotate", function(e) {
				session.setAnnotations(e.data);
			});
			worker.on("terminate", function() {
				session.clearAnnotations();
			});
			return worker;
		};
		this.$id = "ace/mode/css";
		this.snippetFileId = "ace/snippets/css";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export { require_css as t };
