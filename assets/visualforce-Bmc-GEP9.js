import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { n as require_xml } from "./xml-D-DvYe9N.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-BTglbrVB.js";
import { r as require_html$1, t as require_html } from "./html-NZG1gGtk.js";
//#region node_modules/ace-code/src/mode/visualforce_highlight_rules.js
var require_visualforce_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	function string(options) {
		return {
			token: options.token + ".start",
			regex: options.start,
			push: [
				{
					token: "constant.language.escape",
					regex: options.escape
				},
				{
					token: options.token + ".end",
					regex: options.start,
					next: "pop"
				},
				{ defaultToken: options.token }
			]
		};
	}
	var VisualforceHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "$Action|$Api|$Component|$ComponentLabel|$CurrentPage|$FieldSet|$Label|$Label|$ObjectType|$Organization|$Page|$Permission|$Profile|$Resource|$SControl|$Setup|$Site|$System.OriginDateTime|$User|$UserRole|Site|UITheme|UIThemeDisplayed",
			"keyword": "",
			"storage.type": "",
			"constant.language": "true|false|null|TRUE|FALSE|NULL",
			"support.function": "DATE|DATEVALUE|DATETIMEVALUE|DAY|MONTH|NOW|TODAY|YEAR|BLANKVALUE|ISBLANK|NULLVALUE|PRIORVALUE|AND|CASE|IF|ISCHANGED|ISNEW|ISNUMBER|NOT|OR|ABS|CEILING|EXP|FLOOR|LN|LOG|MAX|MIN|MOD|ROUND|SQRT|BEGINS|BR|CASESAFEID|CONTAINS|FIND|GETSESSIONID|HTMLENCODE|ISPICKVAL|JSENCODE|JSINHTMLENCODE|LEFT|LEN|LOWER|LPAD|MID|RIGHT|RPAD|SUBSTITUTE|TEXT|TRIM|UPPER|URLENCODE|VALUE|GETRECORDIDS|INCLUDE|LINKTO|REGEX|REQUIRESCRIPT|URLFOR|VLOOKUP|HTMLENCODE|JSENCODE|JSINHTMLENCODE|URLENCODE"
		}, "identifier");
		HtmlHighlightRules.call(this);
		var hbs = {
			token: "keyword.start",
			regex: "{!",
			push: "Visualforce"
		};
		for (var key in this.$rules) this.$rules[key].unshift(hbs);
		this.$rules.Visualforce = [
			string({
				start: "\"",
				escape: /\\[btnfr"'\\]/,
				token: "string",
				multiline: true
			}),
			string({
				start: "'",
				escape: /\\[btnfr"'\\]/,
				token: "string",
				multiline: true
			}),
			{
				token: "comment.start",
				regex: "\\/\\*",
				push: [{
					token: "comment.end",
					regex: "\\*\\/|(?=})",
					next: "pop"
				}, {
					defaultToken: "comment",
					caseInsensitive: true
				}]
			},
			{
				token: "keyword.end",
				regex: "}",
				next: "pop"
			},
			{
				token: keywordMapper,
				regex: /[a-zA-Z$_\u00a1-\uffff][a-zA-Z\d$_\u00a1-\uffff]*\b/
			},
			{
				token: "keyword.operator",
				regex: /==|<>|!=|<=|>=|&&|\|\||[+\-*/^()=<>&]/
			},
			{
				token: "punctuation.operator",
				regex: /[?:,;.]/
			},
			{
				token: "paren.lparen",
				regex: /[\[({]/
			},
			{
				token: "paren.rparen",
				regex: /[\])}]/
			}
		];
		this.normalizeRules();
	};
	oop.inherits(VisualforceHighlightRules, HtmlHighlightRules);
	exports.VisualforceHighlightRules = VisualforceHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/visualforce.js
var require_visualforce = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var VisualforceHighlightRules = require_visualforce_highlight_rules().VisualforceHighlightRules;
	var XmlBehaviour = require_xml().XmlBehaviour;
	var HtmlFoldMode = require_html$1().FoldMode;
	function VisualforceMode() {
		HtmlMode.call(this);
		this.HighlightRules = VisualforceHighlightRules;
		this.foldingRules = new HtmlFoldMode();
		this.$behaviour = new XmlBehaviour();
	}
	oop.inherits(VisualforceMode, HtmlMode);
	VisualforceMode.prototype.emmetConfig = { profile: "xhtml" };
	exports.Mode = VisualforceMode;
}));
//#endregion
export default require_visualforce();
