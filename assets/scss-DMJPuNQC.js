import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
import "./css_highlight_rules-_E_vcaY_.js";
import { t as require_css_completions } from "./css_completions-C2GxC1IS.js";
import { t as require_css } from "./css-BIWs6ZVC.js";
import { t as require_scss_highlight_rules } from "./scss_highlight_rules-oX4dDtC1.js";
//#region node_modules/ace-code/src/mode/scss.js
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
//#endregion
export default require_scss();
export { require_scss as t };
