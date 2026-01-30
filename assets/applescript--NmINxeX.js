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
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
var require_applescript_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AppleScriptHighlightRules$1 = function() {
		var keywords = "about|above|after|against|and|around|as|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without";
		var builtinConstants = "AppleScript|false|linefeed|return|pi|quote|result|space|tab|true";
		var builtinFunctions = "activate|beep|count|delay|launch|log|offset|read|round|run|say|summarize|write";
		var builtinTypes = "alias|application|boolean|class|constant|date|file|integer|list|number|real|record|string|text|character|characters|contents|day|frontmost|id|item|length|month|name|paragraph|paragraphs|rest|reverse|running|time|version|weekday|word|words|year";
		var keywordMapper = this.createKeywordMapper({
			"support.function": builtinFunctions,
			"constant.language": builtinConstants,
			"support.type": builtinTypes,
			"keyword": keywords
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "--.*$"
				},
				{
					token: "comment",
					regex: "\\(\\*",
					next: "comment"
				},
				{
					token: "string",
					regex: "\".*?\""
				},
				{
					token: "support.type",
					regex: "\\b(POSIX file|POSIX path|(date|time) string|quoted form)\\b"
				},
				{
					token: "support.function",
					regex: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
				},
				{
					token: "constant.language",
					regex: "\\b(text item delimiters|current application|missing value)\\b"
				},
				{
					token: "keyword",
					regex: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z][a-zA-Z0-9_]*\\b"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\)",
				next: "start"
			}, { defaultToken: "comment" }]
		};
		this.normalizeRules();
	};
	oop$1.inherits(AppleScriptHighlightRules$1, TextHighlightRules);
	exports.AppleScriptHighlightRules = AppleScriptHighlightRules$1;
}));
var require_applescript = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var AppleScriptHighlightRules = require_applescript_highlight_rules().AppleScriptHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = AppleScriptHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "(*",
			end: "*)"
		};
		this.$id = "ace/mode/applescript";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_applescript();
