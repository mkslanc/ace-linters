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
import "./fold_mode-D1xG2KFM.js";
import { t as require_coffee } from "./coffee-DPgCu_13.js";
import { t as require_sh_highlight_rules } from "./sh_highlight_rules-H6mwzxLp.js";
var require_makefile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ShHighlightFile = require_sh_highlight_rules();
	var MakefileHighlightRules$1 = function() {
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
	oop$1.inherits(MakefileHighlightRules$1, TextHighlightRules);
	exports.MakefileHighlightRules = MakefileHighlightRules$1;
}));
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
export default require_makefile();
