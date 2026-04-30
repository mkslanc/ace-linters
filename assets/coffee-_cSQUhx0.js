import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import { t as require_worker_client } from "./worker_client-acjDQ1bE.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_coffee$1 } from "./coffee-DSl0AWcz.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
import { t as require_coffee_highlight_rules } from "./coffee_highlight_rules-CQ0mFdxP.js";
//#region node_modules/ace-code/src/mode/coffee.js
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
//#endregion
export default require_coffee();
export { require_coffee as t };
