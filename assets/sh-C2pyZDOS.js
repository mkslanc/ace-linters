import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-H6mwzxLp.js";
var require_sh = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ShHighlightRules = require_sh_highlight_rules().ShHighlightRules;
	var Range = require_range().Range;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = ShHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
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
		this.$id = "ace/mode/sh";
		this.snippetFileId = "ace/snippets/sh";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export { require_sh as t };
