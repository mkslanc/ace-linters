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
import "./fold_mode-D_StAfa6.js";
import { t as require_coffee } from "./coffee-BH30Aew3.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-DUsqYDK2.js";
//#region node_modules/ace-code/src/mode/makefile_highlight_rules.js
var require_makefile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ShHighlightFile = require_sh_highlight_rules();
	var MakefileHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"keyword": ShHighlightFile.reservedKeywords,
			"support.function.builtin": ShHighlightFile.languageConstructs,
			"invalid.deprecated": "debugger"
		}, "string");
		this.$rules = {
			"start": [
				{
					token: "string.interpolated.backtick.makefile",
					regex: "`",
					next: "shell-start"
				},
				{
					token: "punctuation.definition.comment.makefile",
					regex: /#(?=.)/,
					next: "comment"
				},
				{
					token: ["keyword.control.makefile"],
					regex: "^(?:\\s*\\b)(\\-??include|ifeq|ifneq|ifdef|ifndef|else|endif|vpath|export|unexport|define|endef|override)(?:\\b)"
				},
				{
					token: ["entity.name.function.makefile", "text"],
					regex: "^([^\\t ]+(?:\\s[^\\t ]+)*:)(\\s*.*)"
				}
			],
			"comment": [{
				token: "punctuation.definition.comment.makefile",
				regex: /.+\\/
			}, {
				token: "punctuation.definition.comment.makefile",
				regex: ".+",
				next: "start"
			}],
			"shell-start": [
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "string",
					regex: "\\w+"
				},
				{
					token: "string.interpolated.backtick.makefile",
					regex: "`",
					next: "start"
				}
			]
		};
	};
	oop.inherits(MakefileHighlightRules, TextHighlightRules);
	exports.MakefileHighlightRules = MakefileHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/makefile.js
var require_makefile = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var MakefileHighlightRules = require_makefile_highlight_rules().MakefileHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = MakefileHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$indentWithTabs = true;
		this.$id = "ace/mode/makefile";
		this.snippetFileId = "ace/snippets/makefile";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_makefile();
