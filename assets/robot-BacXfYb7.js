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
import { t as require_pythonic } from "./pythonic-53OX1bGv.js";
var require_robot_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var RobotHighlightRules$1 = function() {
		var builtinConstantsRegex = /* @__PURE__ */ new RegExp(/\$\{CURDIR\}|\$\{TEMPDIR\}|\$\{EXECDIR\}|\$\{\/\}|\$\{\:\}|\$\{\\n\}|\$\{true\}|\$\{false\}|\$\{none\}|\$\{null\}|\$\{space(?:\s*\*\s+[0-9]+)?\}|\$\{empty\}|&\{empty\}|@\{empty\}|\$\{TEST NAME\}|@\{TEST[\s_]TAGS\}|\$\{TEST[\s_]DOCUMENTATION\}|\$\{TEST[\s_]STATUS\}|\$\{TEST[\s_]MESSAGE\}|\$\{PREV[\s_]TEST[\s_]NAME\}|\$\{PREV[\s_]TEST[\s_]STATUS\}|\$\{PREV[\s_]TEST[\s_]MESSAGE\}|\$\{SUITE[\s_]NAME\}|\$\{SUITE[\s_]SOURCE\}|\$\{SUITE[\s_]DOCUMENTATION\}|&\{SUITE[\s_]METADATA\}|\$\{SUITE[\s_]STATUS\}|\$\{SUITE[\s_]MESSAGE\}|\$\{KEYWORD[\s_]STATUS\}|\$\{KEYWORD[\s_]MESSAGE\}|\$\{LOG[\s_]LEVEL\}|\$\{OUTPUT[\s_]FILE\}|\$\{LOG[\s_]FILE\}|\$\{REPORT[\s_]FILE\}|\$\{DEBUG[\s_]FILE\}|\$\{OUTPUT[\s_]DIR\}/);
		this.$rules = { "start": [
			{
				token: "string.robot.header",
				regex: /^\*{3}\s+(?:settings?|metadata|(?:user )?keywords?|test ?cases?|tasks?|variables?)/,
				caseInsensitive: true,
				push: [{
					token: "string.robot.header",
					regex: /$/,
					next: "pop"
				}, { defaultToken: "string.robot.header" }],
				comment: "start of a table"
			},
			{
				token: "comment.robot",
				regex: /(?:^|\s{2,}|\t|\|\s{1,})(?=[^\\])#/,
				push: [{
					token: "comment.robot",
					regex: /$/,
					next: "pop"
				}, { defaultToken: "comment.robot" }]
			},
			{
				token: "comment",
				regex: /^\s*\[?Documentation\]?/,
				caseInsensitive: true,
				push: [{
					token: "comment",
					regex: /^(?!\s*\.\.\.)/,
					next: "pop"
				}, { defaultToken: "comment" }]
			},
			{
				token: "storage.type.method.robot",
				regex: /\[(?:Arguments|Setup|Teardown|Precondition|Postcondition|Template|Return|Timeout)\]/,
				caseInsensitive: true,
				comment: "testcase settings"
			},
			{
				token: "storage.type.method.robot",
				regex: /\[Tags\]/,
				caseInsensitive: true,
				push: [
					{
						token: "storage.type.method.robot",
						regex: /^(?!\s*\.\.\.)/,
						next: "pop"
					},
					{
						token: "comment",
						regex: /^\s*\.\.\./
					},
					{ defaultToken: "storage.type.method.robot" }
				],
				comment: "test tags"
			},
			{
				token: "constant.language",
				regex: builtinConstantsRegex,
				caseInsensitive: true
			},
			{
				token: "entity.name.variable.wrapper",
				regex: /[$@&%]\{\{?/,
				push: [
					{
						token: "entity.name.variable.wrapper",
						regex: /\}\}?(\s?=)?/,
						next: "pop"
					},
					{ include: "$self" },
					{
						token: "entity.name.variable",
						regex: /./
					},
					{ defaultToken: "entity.name.variable" }
				]
			},
			{
				token: "keyword.control.robot",
				regex: /^[^\s\t*$|]+|(?=^\|)\s+[^\s\t*$|]+/,
				push: [{
					token: "keyword.control.robot",
					regex: /(?=\s{2})|\t|$|\s+(?=\|)/,
					next: "pop"
				}, { defaultToken: "keyword.control.robot" }]
			},
			{
				token: "constant.numeric.robot",
				regex: /\b[0-9]+(?:\.[0-9]+)?\b/
			},
			{
				token: "keyword",
				regex: /\s{2,}(for|in range|in|end|else if|if|else|with name)(\s{2,}|$)/,
				caseInsensitive: true
			},
			{
				token: "storage.type.function",
				regex: /^(?:\s{2,}\s+)[^ \t*$@&%[.|]+/,
				push: [{
					token: "storage.type.function",
					regex: /(?=\s{2})|\t|$|\s+(?=\|)/,
					next: "pop"
				}, { defaultToken: "storage.type.function" }]
			}
		] };
		this.normalizeRules();
	};
	RobotHighlightRules$1.metadata = {
		fileTypes: ["robot"],
		name: "Robot",
		scopeName: "source.robot"
	};
	oop$1.inherits(RobotHighlightRules$1, TextHighlightRules);
	exports.RobotHighlightRules = RobotHighlightRules$1;
}));
var require_robot = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var RobotHighlightRules = require_robot_highlight_rules().RobotHighlightRules;
	var FoldMode = require_pythonic().FoldMode;
	var Mode = function() {
		this.HighlightRules = RobotHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/robot";
		this.snippetFileId = "ace/snippets/robot";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_robot();
