import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
//#region node_modules/ace-code/src/mode/applescript_highlight_rules.js
var require_applescript_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AppleScriptHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"support.function": "activate|beep|count|delay|launch|log|offset|read|round|run|say|summarize|write",
			"constant.language": "AppleScript|false|linefeed|return|pi|quote|result|space|tab|true",
			"support.type": "alias|application|boolean|class|constant|date|file|integer|list|number|real|record|string|text|character|characters|contents|day|frontmost|id|item|length|month|name|paragraph|paragraphs|rest|reverse|running|time|version|weekday|word|words|year",
			"keyword": "about|above|after|against|and|around|as|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without"
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
	oop.inherits(AppleScriptHighlightRules, TextHighlightRules);
	exports.AppleScriptHighlightRules = AppleScriptHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/applescript.js
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
//#endregion
export default require_applescript();
