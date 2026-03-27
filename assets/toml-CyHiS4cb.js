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
import { t as require_ini } from "./ini-BFemWhMN.js";
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
