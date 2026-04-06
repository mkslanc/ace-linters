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
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_ini } from "./ini-jC2z5KEy.js";
//#region node_modules/ace-code/src/mode/toml_highlight_rules.js
var require_toml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TomlHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({ "constant.language.boolean": "true|false" }, "identifier");
		var identifierRe = "[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b";
		this.$rules = {
			"start": [
				{
					token: "comment.toml",
					regex: /#.*$/
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "qqstring"
				},
				{
					token: ["variable.keygroup.toml"],
					regex: "(?:^\\s*)(\\[\\[([^\\]]+)\\]\\])"
				},
				{
					token: ["variable.keygroup.toml"],
					regex: "(?:^\\s*)(\\[([^\\]]+)\\])"
				},
				{
					token: keywordMapper,
					regex: identifierRe
				},
				{
					token: "support.date.toml",
					regex: "\\d{4}-\\d{2}-\\d{2}(T)\\d{2}:\\d{2}:\\d{2}(Z)"
				},
				{
					token: "constant.numeric.toml",
					regex: "-?\\d+(\\.?\\d+)?"
				}
			],
			"qqstring": [
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring"
				},
				{
					token: "constant.language.escape",
					regex: "\\\\[0tnr\"\\\\]"
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start"
				},
				{ defaultToken: "string" }
			]
		};
	};
	oop.inherits(TomlHighlightRules, TextHighlightRules);
	exports.TomlHighlightRules = TomlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/toml.js
var require_toml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TomlHighlightRules = require_toml_highlight_rules().TomlHighlightRules;
	var FoldMode = require_ini().FoldMode;
	var Mode = function() {
		this.HighlightRules = TomlHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/toml";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_toml();
