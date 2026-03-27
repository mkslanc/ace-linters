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
import { t as require_pythonic } from "./pythonic-CHhF0n7c.js";
//#region node_modules/ace-code/src/mode/robot_highlight_rules.js
var require_robot_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var RobotHighlightRules = function() {
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
	RobotHighlightRules.metadata = {
		fileTypes: ["robot"],
		name: "Robot",
		scopeName: "source.robot"
	};
	oop.inherits(RobotHighlightRules, TextHighlightRules);
	exports.RobotHighlightRules = RobotHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/robot.js
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
//#endregion
export default require_robot();
