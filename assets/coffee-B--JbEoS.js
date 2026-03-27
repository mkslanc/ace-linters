import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import { t as require_range } from "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import { t as require_worker_client } from "./worker_client-Do40RNma.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_coffee$1 } from "./coffee-CKmePRUu.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import { t as require_coffee_highlight_rules } from "./coffee_highlight_rules-D8KEDJjA.js";
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
