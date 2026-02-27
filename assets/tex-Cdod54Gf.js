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
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import { t as require_tex_highlight_rules } from "./tex_highlight_rules-BHVpFqT6.js";
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
