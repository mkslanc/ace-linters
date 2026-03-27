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
import "./fold_mode-DLWDk-fx.js";
import { t as require_coffee } from "./coffee-CKmePRUu.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-Ch1u_TpC.js";
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
