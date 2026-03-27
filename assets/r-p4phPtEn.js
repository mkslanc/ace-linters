import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import { t as require_range } from "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, n as require_unicode, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import "./tex_highlight_rules-vESq5CIl.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-DZMF0zA9.js";
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
