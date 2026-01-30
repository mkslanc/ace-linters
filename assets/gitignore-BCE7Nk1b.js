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
var require_gitignore_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GitignoreHighlightRules$1 = function() {
		this.$rules = { "start": [{
			token: "comment",
			regex: /^\s*#.*$/
		}, {
			token: "keyword",
			regex: /^\s*!.*$/
		}] };
		this.normalizeRules();
	};
	GitignoreHighlightRules$1.metaData = {
		fileTypes: ["gitignore"],
		name: "Gitignore"
	};
	oop$1.inherits(GitignoreHighlightRules$1, TextHighlightRules);
	exports.GitignoreHighlightRules = GitignoreHighlightRules$1;
}));
var require_gitignore = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var GitignoreHighlightRules = require_gitignore_highlight_rules().GitignoreHighlightRules;
	var Mode = function() {
		this.HighlightRules = GitignoreHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/gitignore";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_gitignore();
