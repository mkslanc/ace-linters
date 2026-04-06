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
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
import { t as require_tex_highlight_rules } from "./tex_highlight_rules-ByXFX-Ur.js";
//#region node_modules/ace-code/src/mode/tex.js
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
//#endregion
export default require_tex();
