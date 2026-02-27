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
var require_batchfile_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var BatchFileHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{
					token: "keyword.command.dosbatch",
					regex: "\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b",
					caseInsensitive: true
				},
				{
					token: "keyword.control.statement.dosbatch",
					regex: "\\b(?:goto|call|exit)\\b",
					caseInsensitive: true
				},
				{
					token: "keyword.control.conditional.if.dosbatch",
					regex: "\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b",
					caseInsensitive: true
				},
				{
					token: "keyword.control.conditional.dosbatch",
					regex: "\\b(?:if|else)\\b",
					caseInsensitive: true
				},
				{
					token: "keyword.control.repeat.dosbatch",
					regex: "\\bfor\\b",
					caseInsensitive: true
				},
				{
					token: "keyword.operator.dosbatch",
					regex: "\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b"
				},
				{
					token: ["doc.comment", "comment"],
					regex: "(?:^|\\b)(rem)($|\\s.*$)",
					caseInsensitive: true
				},
				{
					token: "comment.line.colons.dosbatch",
					regex: "::.*$"
				},
				{ include: "variable" },
				{
					token: "punctuation.definition.string.begin.shell",
					regex: "\"",
					push: [
						{
							token: "punctuation.definition.string.end.shell",
							regex: "\"",
							next: "pop"
						},
						{ include: "variable" },
						{ defaultToken: "string.quoted.double.dosbatch" }
					]
				},
				{
					token: "keyword.operator.pipe.dosbatch",
					regex: "[|]"
				},
				{
					token: "keyword.operator.redirect.shell",
					regex: "&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>"
				}
			],
			variable: [
				{
					token: "constant.numeric",
					regex: "%%\\w+|%[*\\d]|%\\w+%"
				},
				{
					token: "constant.numeric",
					regex: "%~\\d+"
				},
				{
					token: [
						"markup.list",
						"constant.other",
						"markup.list"
					],
					regex: "(%)(\\w+)(%?)"
				}
			]
		};
		this.normalizeRules();
	};
	BatchFileHighlightRules$1.metaData = {
		name: "Batch File",
		scopeName: "source.dosbatch",
		fileTypes: ["bat"]
	};
	oop$1.inherits(BatchFileHighlightRules$1, TextHighlightRules);
	exports.BatchFileHighlightRules = BatchFileHighlightRules$1;
}));
var require_batchfile = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var BatchFileHighlightRules = require_batchfile_highlight_rules().BatchFileHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = BatchFileHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "::";
		this.blockComment = "";
		this.$id = "ace/mode/batchfile";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_batchfile();
