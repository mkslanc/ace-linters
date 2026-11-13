import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_scss_highlight_rules } from "./scss_highlight_rules-CWfhM-2f.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
import { t as require_css } from "./css-CXiSSoCg.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
import { t as require_css_completions } from "./css_completions-BfHufaR4.js";
// node_modules/ace-code/src/mode/scss.js
var require_scss = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ScssHighlightRules = require_scss_highlight_rules().ScssHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CssBehaviour = require_css().CssBehaviour;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var CssCompletions = require_css_completions().CssCompletions;
	var Mode = function() {
		this.HighlightRules = ScssHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = new CssBehaviour();
		this.$completer = new CssCompletions();
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
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
		this.$id = "ace/mode/scss";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_scss();
export { require_scss as t };
