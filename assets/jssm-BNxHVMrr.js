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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_jssm_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var JSSMHighlightRules$1 = function() {
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
	JSSMHighlightRules$1.metaData = {
		fileTypes: ["jssm", "jssm_state"],
		name: "JSSM",
		scopeName: "source.jssm"
	};
	oop$1.inherits(JSSMHighlightRules$1, TextHighlightRules);
	exports.JSSMHighlightRules = JSSMHighlightRules$1;
}));
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
export default require_jssm();
