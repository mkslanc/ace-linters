import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import { t as require_tex_highlight_rules } from "./tex_highlight_rules-vESq5CIl.js";
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
