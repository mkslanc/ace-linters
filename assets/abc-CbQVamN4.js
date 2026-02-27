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
var require_abc_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ABCHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				token: [
					"zupfnoter.information.comment.line.percentage",
					"information.keyword",
					"in formation.keyword.embedded"
				],
				regex: "(%%%%)(hn\\.[a-z]*)(.*)",
				comment: "Instruction Comment"
			},
			{
				token: ["information.comment.line.percentage", "information.keyword.embedded"],
				regex: "(%%)(.*)",
				comment: "Instruction Comment"
			},
			{
				token: "comment.line.percentage",
				regex: "%.*",
				comment: "Comments"
			},
			{
				token: "barline.keyword.operator",
				regex: "[\\[:]*[|:][|\\]:]*(?:\\[?[0-9]+)?|\\[[0-9]+",
				comment: "Bar lines"
			},
			{
				token: ["information.keyword.embedded", "information.argument.string.unquoted"],
				regex: "(\\[[A-Za-z]:)([^\\]]*\\])",
				comment: "embedded Header lines"
			},
			{
				token: ["information.keyword", "information.argument.string.unquoted"],
				regex: "^([A-Za-z]:)([^%\\\\]*)",
				comment: "Header lines"
			},
			{
				token: [
					"text",
					"entity.name.function",
					"string.unquoted",
					"text"
				],
				regex: "(\\[)([A-Z]:)(.*?)(\\])",
				comment: "Inline fields"
			},
			{
				token: [
					"accent.constant.language",
					"pitch.constant.numeric",
					"duration.constant.numeric"
				],
				regex: "([\\^=_]*)([A-Ga-gz][,']*)([0-9]*/*[><0-9]*)",
				comment: "Notes"
			},
			{
				token: "zupfnoter.jumptarget.string.quoted",
				regex: "[\\\"!]\\^\\:.*?[\\\"!]",
				comment: "Zupfnoter jumptarget"
			},
			{
				token: "zupfnoter.goto.string.quoted",
				regex: "[\\\"!]\\^\\@.*?[\\\"!]",
				comment: "Zupfnoter goto"
			},
			{
				token: "zupfnoter.annotation.string.quoted",
				regex: "[\\\"!]\\^\\!.*?[\\\"!]",
				comment: "Zupfnoter annoation"
			},
			{
				token: "zupfnoter.annotationref.string.quoted",
				regex: "[\\\"!]\\^\\#.*?[\\\"!]",
				comment: "Zupfnoter annotation reference"
			},
			{
				token: "chordname.string.quoted",
				regex: "[\\\"!]\\^.*?[\\\"!]",
				comment: "abc chord"
			},
			{
				token: "string.quoted",
				regex: "[\\\"!].*?[\\\"!]",
				comment: "abc annotation"
			}
		] };
		this.normalizeRules();
	};
	ABCHighlightRules$1.metaData = {
		fileTypes: ["abc"],
		name: "ABC",
		scopeName: "text.abcnotation"
	};
	oop$1.inherits(ABCHighlightRules$1, TextHighlightRules);
	exports.ABCHighlightRules = ABCHighlightRules$1;
}));
var require_abc = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ABCHighlightRules = require_abc_highlight_rules().ABCHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = ABCHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "%";
		this.$id = "ace/mode/abc";
		this.snippetFileId = "ace/snippets/abc";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_abc();
