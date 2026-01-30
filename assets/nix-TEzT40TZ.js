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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
import "./doc_comment_highlight_rules-DUGnT9qY.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./c_cpp_highlight_rules-Cn7c1flo.js";
import { t as require_c_cpp } from "./c_cpp-f48qf5uK.js";
var require_nix_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var NixHighlightRules$1 = function() {
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
	oop$1.inherits(NixHighlightRules$1, TextHighlightRules);
	exports.NixHighlightRules = NixHighlightRules$1;
}));
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
export default require_nix();
