import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-BN2AN0ZM.js";
import { t as require_css_completions } from "./css_completions-C1qupuMi.js";
import { t as require_css$1 } from "./css-B6QOS37f.js";
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
export { require_css as t };
