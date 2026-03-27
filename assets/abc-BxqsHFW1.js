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
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
//#region node_modules/ace-code/src/mode/abc_highlight_rules.js
var require_abc_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ABCHighlightRules = function() {
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
	ABCHighlightRules.metaData = {
		fileTypes: ["abc"],
		name: "ABC",
		scopeName: "text.abcnotation"
	};
	oop.inherits(ABCHighlightRules, TextHighlightRules);
	exports.ABCHighlightRules = ABCHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/abc.js
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
//#endregion
export default require_abc();
