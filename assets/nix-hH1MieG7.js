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
import { a as require_text_highlight_rules } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import "./doc_comment_highlight_rules-Csht38Fi.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./c_cpp_highlight_rules-D6Yv1qPu.js";
import { t as require_c_cpp } from "./c_cpp-DHIZzEy0.js";
//#region node_modules/ace-code/src/mode/nix_highlight_rules.js
var require_nix_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var NixHighlightRules = function() {
		var constantLanguage = "true|false";
		var keywordControl = "with|import|if|else|then|inherit";
		var keywordDeclaration = "let|in|rec";
		var keywordMapper = this.createKeywordMapper({
			"constant.language.nix": constantLanguage,
			"keyword.control.nix": keywordControl,
			"keyword.declaration.nix": keywordDeclaration
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: /#.*$/
				},
				{
					token: "comment",
					regex: /\/\*/,
					next: "comment"
				},
				{
					token: "constant",
					regex: "<[^>]+>"
				},
				{
					regex: "(==|!=|<=?|>=?)",
					token: ["keyword.operator.comparison.nix"]
				},
				{
					regex: "((?:[+*/%-]|\\~)=)",
					token: ["keyword.operator.assignment.arithmetic.nix"]
				},
				{
					regex: "=",
					token: "keyword.operator.assignment.nix"
				},
				{
					token: "string",
					regex: "''",
					next: "qqdoc"
				},
				{
					token: "string",
					regex: "'",
					next: "qstring"
				},
				{
					token: "string",
					regex: "\"",
					push: "qqstring"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					regex: "}",
					token: function(val, start, stack) {
						return stack[1] && stack[1].charAt(0) == "q" ? "constant.language.escape" : "text";
					},
					next: "pop"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"qqdoc": [
				{
					token: "constant.language.escape",
					regex: /\$\{/,
					push: "start"
				},
				{
					token: "string",
					regex: "''",
					next: "pop"
				},
				{ defaultToken: "string" }
			],
			"qqstring": [
				{
					token: "constant.language.escape",
					regex: /\$\{/,
					push: "start"
				},
				{
					token: "string",
					regex: "\"",
					next: "pop"
				},
				{ defaultToken: "string" }
			],
			"qstring": [
				{
					token: "constant.language.escape",
					regex: /\$\{/,
					push: "start"
				},
				{
					token: "string",
					regex: "'",
					next: "pop"
				},
				{ defaultToken: "string" }
			]
		};
		this.normalizeRules();
	};
	oop.inherits(NixHighlightRules, TextHighlightRules);
	exports.NixHighlightRules = NixHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/nix.js
var require_nix = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CMode = require_c_cpp().Mode;
	var NixHighlightRules = require_nix_highlight_rules().NixHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		CMode.call(this);
		this.HighlightRules = NixHighlightRules;
		this.foldingRules = new CStyleFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, CMode);
	(function() {
		this.lineCommentStart = "#";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/nix";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_nix();
