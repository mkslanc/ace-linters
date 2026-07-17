import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
//#region node_modules/ace-code/src/mode/jssm_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_jssm_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JSSMHighlightRules = function() {
		this.$rules = { start: [
			{
				token: "punctuation.definition.comment.mn",
				regex: /\/\*/,
				push: [{
					token: "punctuation.definition.comment.mn",
					regex: /\*\//,
					next: "pop"
				}, { defaultToken: "comment.block.jssm" }],
				comment: "block comment"
			},
			{
				token: "comment.line.jssm",
				regex: /\/\//,
				push: [{
					token: "comment.line.jssm",
					regex: /$/,
					next: "pop"
				}, { defaultToken: "comment.line.jssm" }],
				comment: "block comment"
			},
			{
				token: "entity.name.function",
				regex: /\${/,
				push: [{
					token: "entity.name.function",
					regex: /}/,
					next: "pop"
				}, { defaultToken: "keyword.other" }],
				comment: "js outcalls"
			},
			{
				token: "constant.numeric",
				regex: /[0-9]*\.[0-9]*\.[0-9]*/,
				comment: "semver"
			},
			{
				token: "constant.language.jssmLanguage",
				regex: /graph_layout\s*:/,
				comment: "jssm language tokens"
			},
			{
				token: "constant.language.jssmLanguage",
				regex: /machine_name\s*:/,
				comment: "jssm language tokens"
			},
			{
				token: "constant.language.jssmLanguage",
				regex: /machine_version\s*:/,
				comment: "jssm language tokens"
			},
			{
				token: "constant.language.jssmLanguage",
				regex: /jssm_version\s*:/,
				comment: "jssm language tokens"
			},
			{
				token: "keyword.control.transition.jssmArrow.legal_legal",
				regex: /<->/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.legal_none",
				regex: /<-/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.none_legal",
				regex: /->/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.main_main",
				regex: /<=>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.none_main",
				regex: /=>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.main_none",
				regex: /<=/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.forced_forced",
				regex: /<~>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.none_forced",
				regex: /~>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.forced_none",
				regex: /<~/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.legal_main",
				regex: /<-=>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.main_legal",
				regex: /<=->/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.legal_forced",
				regex: /<-~>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.forced_legal",
				regex: /<~->/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.main_forced",
				regex: /<=~>/,
				comment: "transitions"
			},
			{
				token: "keyword.control.transition.jssmArrow.forced_main",
				regex: /<~=>/,
				comment: "transitions"
			},
			{
				token: "constant.numeric.jssmProbability",
				regex: /[0-9]+%/,
				comment: "edge probability annotation"
			},
			{
				token: "constant.character.jssmAction",
				regex: /\'[^']*\'/,
				comment: "action annotation"
			},
			{
				token: "entity.name.tag.jssmLabel.doublequoted",
				regex: /\"[^"]*\"/,
				comment: "jssm label annotation"
			},
			{
				token: "entity.name.tag.jssmLabel.atom",
				regex: /[a-zA-Z0-9_.+&()#@!?,]/,
				comment: "jssm label annotation"
			}
		] };
		this.normalizeRules();
	};
	JSSMHighlightRules.metaData = {
		fileTypes: ["jssm", "jssm_state"],
		name: "JSSM",
		scopeName: "source.jssm"
	};
	oop.inherits(JSSMHighlightRules, TextHighlightRules);
	exports.JSSMHighlightRules = JSSMHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/jssm.js
var require_jssm = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var JSSMHighlightRules = require_jssm_highlight_rules().JSSMHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = JSSMHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/jssm";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_jssm();
