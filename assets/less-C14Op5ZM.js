import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
import { t as require_css_completions } from "./css_completions-BkEhkNFl.js";
import { t as require_css } from "./css-BghXUIDF.js";
import { t as require_less_highlight_rules } from "./less_highlight_rules-Dz7ew2dd.js";
//#region node_modules/ace-code/src/mode/less.js
var require_less = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var LessHighlightRules = require_less_highlight_rules().LessHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CssBehaviour = require_css().CssBehaviour;
	var CssCompletions = require_css_completions().CssCompletions;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = LessHighlightRules;
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
			return this.$completer.getCompletions("ruleset", session, pos, prefix);
		};
		this.$id = "ace/mode/less";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_less();
export { require_less as t };
