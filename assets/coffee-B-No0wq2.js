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
import { t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_coffee$1 } from "./coffee-DPgCu_13.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import { t as require_coffee_highlight_rules } from "./coffee_highlight_rules-DQ5cxQvG.js";
var require_coffee = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Rules = require_coffee_highlight_rules().CoffeeHighlightRules;
	var Outdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var FoldMode = require_coffee$1().FoldMode;
	require_range().Range;
	var TextMode = require_text().Mode;
	var WorkerClient = require_worker_client().WorkerClient;
	var oop = require_oop();
	function Mode() {
		this.HighlightRules = Rules;
		this.$outdent = new Outdent();
		this.foldingRules = new FoldMode();
	}
	oop.inherits(Mode, TextMode);
	(function() {
		var indenter = /(?:[({[=:]|[-=]>|\b(?:else|try|(?:swi|ca)tch(?:\s+[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$|^\s*(else\b\s*)?(?:if|for|while|loop)\b(?!.*\bthen\b)/;
		this.lineCommentStart = "#";
		this.blockComment = {
			start: "###",
			end: "###"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (!(tokens.length && tokens[tokens.length - 1].type === "comment") && state === "start" && indenter.test(line)) indent += tab;
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.createWorker = function(session) {
			var worker = new WorkerClient(["ace"], "ace/mode/coffee_worker", "Worker");
			worker.attachToDocument(session.getDocument());
			worker.on("annotate", function(e) {
				session.setAnnotations(e.data);
			});
			worker.on("terminate", function() {
				session.clearAnnotations();
			});
			return worker;
		};
		this.$id = "ace/mode/coffee";
		this.snippetFileId = "ace/snippets/coffee";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_coffee();
export { require_coffee as t };
