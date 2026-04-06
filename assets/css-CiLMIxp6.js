import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_text } from "./text-D8sm5DzM.js";
import { t as require_worker_client } from "./worker_client-acjDQ1bE.js";
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
import { t as require_css_highlight_rules } from "./css_highlight_rules-WBsyWStl.js";
import { t as require_css_completions } from "./css_completions-azoDzKVn.js";
import { t as require_css$1 } from "./css-DZv-rZU-.js";
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
