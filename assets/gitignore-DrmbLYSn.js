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
//#region node_modules/ace-code/src/mode/gitignore_highlight_rules.js
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
//#endregion
//#region node_modules/ace-code/src/mode/gitignore.js
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
//#endregion
export default require_gitignore();
