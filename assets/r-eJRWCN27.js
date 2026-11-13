import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { a as require_text_highlight_rules, n as require_unicode, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_range } from "./range-Di2RGtqB.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-C6Yu1gaB.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
// node_modules/ace-code/src/mode/r.js
var require_r = /* @__PURE__ */ __commonJSMin(((exports) => {
	var unicode = require_unicode();
	require_range().Range;
	var oop = require_oop();
	var TextMode = require_text().Mode;
	require_text_highlight_rules().TextHighlightRules;
	var RHighlightRules = require_r_highlight_rules().RHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		this.HighlightRules = RHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.tokenRe = new RegExp("^[" + unicode.wordChars + "._]+", "g");
		this.nonTokenRe = new RegExp("^(?:[^" + unicode.wordChars + "._]|s])+", "g");
		this.$id = "ace/mode/r";
		this.snippetFileId = "ace/snippets/r";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_r();
