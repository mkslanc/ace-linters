import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_range } from "./range-DJd8bsIh.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { l as require_fold_mode } from "./utils-B-ki7ewn.js";
//#region node_modules/ace-code/src/mode/diff_highlight_rules.js
var require_diff_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DiffHighlightRules = function() {
		this.$rules = { "start": [
			{
				regex: "^(?:\\*{15}|={67}|-{3}|\\+{3})$",
				token: "punctuation.definition.separator.diff",
				"name": "keyword"
			},
			{
				regex: "^(@@)(\\s*.+?\\s*)(@@)(.*)$",
				token: [
					"constant",
					"constant.numeric",
					"constant",
					"comment.doc.tag"
				]
			},
			{
				regex: "^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",
				token: [
					"constant.numeric",
					"punctuation.definition.range.diff",
					"constant.function",
					"constant.numeric",
					"punctuation.definition.range.diff",
					"invalid"
				],
				"name": "meta."
			},
			{
				regex: "^(\\-{3}|\\+{3}|\\*{3})( .+)$",
				token: ["constant.numeric", "meta.tag"]
			},
			{
				regex: "^([!+>])(.*?)(\\s*)$",
				token: [
					"support.constant",
					"text",
					"invalid"
				]
			},
			{
				regex: "^([<\\-])(.*?)(\\s*)$",
				token: [
					"support.function",
					"string",
					"invalid"
				]
			},
			{
				regex: "^(diff)(\\s+--\\w+)?(.+?)( .+)?$",
				token: [
					"variable",
					"variable",
					"keyword",
					"variable"
				]
			},
			{
				regex: "^Index.+$",
				token: "variable"
			},
			{
				regex: "^\\s+$",
				token: "text"
			},
			{
				regex: "\\s*$",
				token: "invalid"
			},
			{
				defaultToken: "invisible",
				caseInsensitive: true
			}
		] };
	};
	oop.inherits(DiffHighlightRules, TextHighlightRules);
	exports.DiffHighlightRules = DiffHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/folding/diff.js
var require_diff$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var FoldMode = exports.FoldMode = function(levels, flag) {
		this.regExpList = levels;
		this.flag = flag;
		this.foldingStartMarker = RegExp("^(" + levels.join("|") + ")", this.flag);
	};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var start = {
				row,
				column: line.length
			};
			var regList = this.regExpList;
			for (var i = 1; i <= regList.length; i++) {
				var re = RegExp("^(" + regList.slice(0, i).join("|") + ")", this.flag);
				if (re.test(line)) break;
			}
			for (var l = session.getLength(); ++row < l;) {
				line = session.getLine(row);
				if (re.test(line)) break;
			}
			if (row == start.row + 1) return;
			return new Range(start.row, start.column, row - 1, line.length);
		};
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/diff.js
var require_diff = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_diff_highlight_rules().DiffHighlightRules;
	var FoldMode = require_diff$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.foldingRules = new FoldMode(["diff", "@@|\\*{5}"], "i");
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/diff";
		this.snippetFileId = "ace/snippets/diff";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_diff();
