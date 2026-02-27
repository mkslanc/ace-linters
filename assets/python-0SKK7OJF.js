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
import "./fold_mode-D1xG2KFM.js";
import { t as require_python_highlight_rules } from "./python_highlight_rules-CioM30Se.js";
import { t as require_pythonic } from "./pythonic-CYXDnFBC.js";
var require_python = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PythonHighlightRules = require_python_highlight_rules().PythonHighlightRules;
	var PythonFoldMode = require_pythonic().FoldMode;
	var Range = require_range().Range;
	var Mode = function() {
		this.HighlightRules = PythonHighlightRules;
		this.foldingRules = new PythonFoldMode("\\:");
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$pairQuotesAfter = {
			"'": /[ruf]/i,
			"\"": /[ruf]/i
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[:]\s*$/)) indent += tab;
			}
			return indent;
		};
		var outdents = {
			"pass": 1,
			"return": 1,
			"raise": 1,
			"break": 1,
			"continue": 1
		};
		this.checkOutdent = function(state, line, input) {
			if (input !== "\r\n" && input !== "\r" && input !== "\n") return false;
			var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
			if (!tokens) return false;
			do
				var last = tokens.pop();
			while (last && (last.type == "comment" || last.type == "text" && last.value.match(/^\s+$/)));
			if (!last) return false;
			return last.type == "keyword" && outdents[last.value];
		};
		this.autoOutdent = function(state, doc, row) {
			row += 1;
			var indent = this.$getIndent(doc.getLine(row));
			var tab = doc.getTabString();
			if (indent.slice(-tab.length) == tab) doc.remove(new Range(row, indent.length - tab.length, row, indent.length));
		};
		this.$id = "ace/mode/python";
		this.snippetFileId = "ace/snippets/python";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_python();
