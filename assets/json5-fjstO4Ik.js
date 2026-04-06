import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BSN6387q.js";
import { t as require_json_highlight_rules } from "./json_highlight_rules-B3SIFUe2.js";
//#region node_modules/ace-code/src/mode/json5_highlight_rules.js
var require_json5_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JsonHighlightRules = require_json_highlight_rules().JsonHighlightRules;
	var Json5HighlightRules = function() {
		JsonHighlightRules.call(this);
		var startRules = [
			{
				token: "variable",
				regex: /[a-zA-Z$_\u00a1-\uffff][\w$\u00a1-\uffff]*\s*(?=:)/
			},
			{
				token: "variable",
				regex: /['](?:(?:\\.)|(?:[^'\\]))*?[']\s*(?=:)/
			},
			{
				token: "constant.language.boolean",
				regex: /(?:null)\b/
			},
			{
				token: "string",
				regex: /'/,
				next: [
					{
						token: "constant.language.escape",
						regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,
						consumeLineEnd: true
					},
					{
						token: "string",
						regex: /'|$/,
						next: "start"
					},
					{ defaultToken: "string" }
				]
			},
			{
				token: "string",
				regex: /"(?![^"]*":)/,
				next: [
					{
						token: "constant.language.escape",
						regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,
						consumeLineEnd: true
					},
					{
						token: "string",
						regex: /"|$/,
						next: "start"
					},
					{ defaultToken: "string" }
				]
			},
			{
				token: "constant.numeric",
				regex: /[+-]?(?:Infinity|NaN)\b/
			}
		];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.normalizeRules();
	};
	oop.inherits(Json5HighlightRules, JsonHighlightRules);
	exports.Json5HighlightRules = Json5HighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/json5.js
var require_json5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_json5_highlight_rules().Json5HighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/json5";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_json5();
