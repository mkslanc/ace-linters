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
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import { n as require_xml } from "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { r as require_html$1, t as require_html } from "./html-nEATR_ID.js";
var require_visualforce_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
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
	var VisualforceHighlightRules$1 = function() {
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
	oop$1.inherits(VisualforceHighlightRules$1, HtmlHighlightRules);
	exports.VisualforceHighlightRules = VisualforceHighlightRules$1;
}));
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
export default require_visualforce();
