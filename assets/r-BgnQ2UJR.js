import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, n as require_unicode, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
import "./tex_highlight_rules-CVLZ_rhl.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-CLRbuQ5A.js";
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
