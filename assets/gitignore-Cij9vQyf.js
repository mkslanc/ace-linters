import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
// node_modules/ace-code/src/mode/gitignore_highlight_rules.js
var require_gitignore_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GitignoreHighlightRules = function() {
		this.$rules = { "start": [{
			token: "comment",
			regex: /^\s*#.*$/
		}, {
			token: "keyword",
			regex: /^\s*!.*$/
		}] };
		this.normalizeRules();
	};
	GitignoreHighlightRules.metaData = {
		fileTypes: ["gitignore"],
		name: "Gitignore"
	};
	oop.inherits(GitignoreHighlightRules, TextHighlightRules);
	exports.GitignoreHighlightRules = GitignoreHighlightRules;
}));
// node_modules/ace-code/src/mode/gitignore.js
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
