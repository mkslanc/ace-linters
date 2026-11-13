import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_json_highlight_rules } from "./json_highlight_rules-OblknKEg.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/json5_highlight_rules.js
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
// node_modules/ace-code/src/mode/json5.js
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
export default require_json5();
