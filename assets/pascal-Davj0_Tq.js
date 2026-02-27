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
import { t as require_coffee } from "./coffee-DPgCu_13.js";
var require_pascal_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PascalHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				caseInsensitive: true,
				token: [
					"variable",
					"text",
					"storage.type.prototype",
					"entity.name.function.prototype"
				],
				regex: "\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?(?=(?:\\(.*?\\))?;\\s*(?:attribute|forward|external))"
			},
			{
				caseInsensitive: true,
				token: [
					"variable",
					"text",
					"storage.type.function",
					"entity.name.function"
				],
				regex: "\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?"
			},
			{
				caseInsensitive: true,
				token: this.createKeywordMapper({ "keyword.control": "absolute|abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|do|else|end|except|export|exports|external|far|file|finalization|finally|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|try|type|unit|until|uses|value|var|view|virtual|while|with|xor" }, "identifier", true),
				regex: /\b[a-z_]+\b/
			},
			{
				token: "constant.numeric",
				regex: "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
			},
			{
				token: "punctuation.definition.comment",
				regex: "--.*$"
			},
			{
				token: "punctuation.definition.comment",
				regex: "//.*$"
			},
			{
				token: "punctuation.definition.comment",
				regex: "\\(\\*",
				push: [{
					token: "punctuation.definition.comment",
					regex: "\\*\\)",
					next: "pop"
				}, { defaultToken: "comment.block.one" }]
			},
			{
				token: "punctuation.definition.comment",
				regex: "\\{",
				push: [{
					token: "punctuation.definition.comment",
					regex: "\\}",
					next: "pop"
				}, { defaultToken: "comment.block.two" }]
			},
			{
				token: "punctuation.definition.string.begin",
				regex: "\"",
				push: [
					{
						token: "constant.character.escape",
						regex: "\\\\."
					},
					{
						token: "punctuation.definition.string.end",
						regex: "\"",
						next: "pop"
					},
					{ defaultToken: "string.quoted.double" }
				]
			},
			{
				token: "punctuation.definition.string.begin",
				regex: "'",
				push: [
					{
						token: "constant.character.escape.apostrophe",
						regex: "''"
					},
					{
						token: "punctuation.definition.string.end",
						regex: "'",
						next: "pop"
					},
					{ defaultToken: "string.quoted.single" }
				]
			},
			{
				token: "keyword.operator",
				regex: "[+\\-;,/*%]|:=|="
			}
		] };
		this.normalizeRules();
	};
	oop$1.inherits(PascalHighlightRules$1, TextHighlightRules);
	exports.PascalHighlightRules = PascalHighlightRules$1;
}));
var require_pascal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PascalHighlightRules = require_pascal_highlight_rules().PascalHighlightRules;
	var FoldMode = require_coffee().FoldMode;
	var Mode = function() {
		this.HighlightRules = PascalHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["--", "//"];
		this.blockComment = [{
			start: "(*",
			end: "*)"
		}, {
			start: "{",
			end: "}"
		}];
		this.$id = "ace/mode/pascal";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_pascal();
