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
//#region node_modules/ace-code/src/mode/snippets.js
var require_snippets = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var SnippetHighlightRules = function() {
		var builtins = "SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";
		this.$rules = {
			"start": [
				{
					token: "constant.language.escape",
					regex: /\\[\$}`\\]/
				},
				{
					token: "keyword",
					regex: "\\$(?:TM_)?(?:" + builtins + ")\\b"
				},
				{
					token: "variable",
					regex: "\\$\\w+"
				},
				{
					onMatch: function(value, state, stack) {
						if (stack[1]) stack[1]++;
						else stack.unshift(state, 1);
						return this.tokenName;
					},
					tokenName: "markup.list",
					regex: "\\${",
					next: "varDecl"
				},
				{
					onMatch: function(value, state, stack) {
						if (!stack[1]) return "text";
						stack[1]--;
						if (!stack[1]) stack.splice(0, 2);
						return this.tokenName;
					},
					tokenName: "markup.list",
					regex: "}"
				},
				{
					token: "doc.comment",
					regex: /^\${2}-{5,}$/
				}
			],
			"varDecl": [
				{
					regex: /\d+\b/,
					token: "constant.numeric"
				},
				{
					token: "keyword",
					regex: "(?:TM_)?(?:" + builtins + ")\\b"
				},
				{
					token: "variable",
					regex: "\\w+"
				},
				{
					regex: /:/,
					token: "punctuation.operator",
					next: "start"
				},
				{
					regex: /\//,
					token: "string.regex",
					next: "regexp"
				},
				{
					regex: "",
					next: "start"
				}
			],
			"regexp": [
				{
					regex: /\\./,
					token: "escape"
				},
				{
					regex: /\[/,
					token: "regex.start",
					next: "charClass"
				},
				{
					regex: "/",
					token: "string.regex",
					next: "format"
				},
				{
					"token": "string.regex",
					regex: "."
				}
			],
			charClass: [
				{
					regex: "\\.",
					token: "escape"
				},
				{
					regex: "\\]",
					token: "regex.end",
					next: "regexp"
				},
				{
					"token": "string.regex",
					regex: "."
				}
			],
			"format": [
				{
					regex: /\\[ulULE]/,
					token: "keyword"
				},
				{
					regex: /\$\d+/,
					token: "variable"
				},
				{
					regex: "/[gim]*:?",
					token: "string.regex",
					next: "start"
				},
				{
					"token": "string",
					regex: "."
				}
			]
		};
	};
	oop.inherits(SnippetHighlightRules, TextHighlightRules);
	exports.SnippetHighlightRules = SnippetHighlightRules;
	var SnippetGroupHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: "text",
					regex: "^\\t",
					next: "sn-start"
				},
				{
					token: "invalid",
					regex: /^ \s*/
				},
				{
					token: "comment",
					regex: /^#.*/
				},
				{
					token: "constant.language.escape",
					regex: "^regex ",
					next: "regex"
				},
				{
					token: "constant.language.escape",
					regex: "^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"
				}
			],
			"regex": [
				{
					token: "text",
					regex: "\\."
				},
				{
					token: "keyword",
					regex: "/"
				},
				{
					token: "empty",
					regex: "$",
					next: "start"
				}
			]
		};
		this.embedRules(SnippetHighlightRules, "sn-", [{
			token: "text",
			regex: "^\\t",
			next: "sn-start"
		}, {
			onMatch: function(value, state, stack) {
				stack.splice(stack.length);
				return this.tokenName;
			},
			tokenName: "text",
			regex: "^(?!	)",
			next: "start"
		}]);
	};
	oop.inherits(SnippetGroupHighlightRules, TextHighlightRules);
	exports.SnippetGroupHighlightRules = SnippetGroupHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = SnippetGroupHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$indentWithTabs = true;
		this.lineCommentStart = "#";
		this.$id = "ace/mode/snippets";
		this.snippetFileId = "ace/snippets/snippets";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_snippets();
