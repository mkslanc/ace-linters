import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import { t as require_css_completions } from "./css_completions-C1qupuMi.js";
import { t as require_css } from "./css-B6QOS37f.js";
import { t as require_scss_highlight_rules } from "./scss_highlight_rules-B88XfZOg.js";
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
