import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, n as require_unicode, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
import "./tex_highlight_rules-CImhErta.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-DHyhHLoi.js";
//#region node_modules/ace-code/src/mode/r.js
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
//#endregion
export default require_r();
