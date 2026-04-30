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
import "./fold_mode-D_StAfa6.js";
import { t as require_python_highlight_rules } from "./python_highlight_rules-Cd-6y8_R.js";
import { t as require_pythonic } from "./pythonic-kplunm5I.js";
//#region node_modules/ace-code/src/mode/python.js
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
//#endregion
export default require_python();
