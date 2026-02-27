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
import { t as require_ini } from "./ini-Cu3ia76a.js";
var require_toml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TomlHighlightRules$1 = function() {
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
	oop$1.inherits(TomlHighlightRules$1, TextHighlightRules);
	exports.TomlHighlightRules = TomlHighlightRules$1;
}));
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
export default require_toml();
