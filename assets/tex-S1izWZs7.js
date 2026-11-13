import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_tex_highlight_rules } from "./tex_highlight_rules-CpkMS9CX.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
// node_modules/ace-code/src/mode/tex.js
var require_tex = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TexHighlightRules = require_tex_highlight_rules().TexHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function(suppressHighlighting) {
		if (suppressHighlighting) this.HighlightRules = TextHighlightRules;
		else this.HighlightRules = TexHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "%";
		this.getNextLineIndent = function(state, line, tab) {
			return this.$getIndent(line);
		};
		this.allowAutoInsert = function() {
			return false;
		};
		this.$id = "ace/mode/tex";
		this.snippetFileId = "ace/snippets/tex";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_tex();
