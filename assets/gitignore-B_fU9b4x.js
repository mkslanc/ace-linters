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
